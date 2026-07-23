-- Phase 1: Shared Problems Migration (idempotent - safe to re-run)

-- ============================================================
-- STEP 1: Add userId column to Submission (skip if exists)
-- ============================================================
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Submission' AND column_name = 'userId'
  ) THEN
    ALTER TABLE "Submission" ADD COLUMN "userId" TEXT;
  END IF;
END $$;

-- ============================================================
-- STEP 2: Populate Submission.userId from Problem.userId
-- ============================================================
UPDATE "Submission" s
SET "userId" = p."userId"
FROM "Problem" p
WHERE s."problemId" = p."id"
AND (s."userId" IS NULL OR s."userId" = '');

-- ============================================================
-- STEP 3: Add userId column to ProblemNote (skip if exists)
-- ============================================================
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'ProblemNote' AND column_name = 'userId'
  ) THEN
    ALTER TABLE "ProblemNote" ADD COLUMN "userId" TEXT;
  END IF;
END $$;

-- ============================================================
-- STEP 4: Populate ProblemNote.userId
-- ============================================================
UPDATE "ProblemNote" pn
SET "userId" = (
  SELECT s."userId"
  FROM "Submission" s
  WHERE s."problemId" = pn."problemId"
  AND s."userId" IS NOT NULL
  LIMIT 1
)
WHERE pn."userId" IS NULL;

UPDATE "ProblemNote" pn
SET "userId" = p."userId"
FROM "Problem" p
WHERE pn."problemId" = p."id"
AND pn."userId" IS NULL;

-- ============================================================
-- STEP 5: Create mapping table for deduplication
-- ============================================================
CREATE TEMPORARY TABLE IF NOT EXISTS canonical_problems AS
WITH ranked AS (
  SELECT
    id,
    "problemNumber",
    title,
    COALESCE("problemNumber", title) as dedup_key,
    ROW_NUMBER() OVER (
      PARTITION BY COALESCE("problemNumber", title)
      ORDER BY "createdAt" ASC
    ) as rn
  FROM "Problem"
)
SELECT id as canonical_id, dedup_key
FROM ranked
WHERE rn = 1;

CREATE TEMPORARY TABLE IF NOT EXISTS problem_id_mapping AS
SELECT
  p.id as old_id,
  cp.canonical_id as new_id
FROM "Problem" p
JOIN canonical_problems cp ON (
  COALESCE(p."problemNumber", p.title) = cp.dedup_key
);

-- ============================================================
-- STEP 6: Update all foreign keys to point to canonical problem
-- ============================================================

-- Delete duplicate ProblemContent rows BEFORE updating
DELETE FROM "ProblemContent" pc
WHERE pc."problemId" IN (
  SELECT m.old_id FROM problem_id_mapping m
  WHERE m.old_id != m.new_id
)
AND EXISTS (
  SELECT 1 FROM "ProblemContent" pc2
  WHERE pc2."problemId" = (
    SELECT m.new_id FROM problem_id_mapping m WHERE m.old_id = pc."problemId"
  )
);

-- Update ProblemContent.problemId
UPDATE "ProblemContent" pc
SET "problemId" = m.new_id
FROM problem_id_mapping m
WHERE pc."problemId" = m.old_id
AND pc."problemId" != m.new_id;

-- Delete duplicate submissions that would conflict
DELETE FROM "Submission" s
WHERE s."problemId" IN (
  SELECT m.old_id FROM problem_id_mapping m
  WHERE m.old_id != m.new_id
)
AND EXISTS (
  SELECT 1 FROM "Submission" s2
  WHERE s2."problemId" = (
    SELECT m.new_id FROM problem_id_mapping m WHERE m.old_id = s."problemId"
  )
  AND s2."userId" = s."userId"
  AND s2."submittedAt" = s."submittedAt"
);

-- Update Submission.problemId
UPDATE "Submission" s
SET "problemId" = m.new_id
FROM problem_id_mapping m
WHERE s."problemId" = m.old_id
AND s."problemId" != m.new_id;

-- Delete duplicate topics that would conflict
DELETE FROM "ProblemTopic" pt
WHERE pt."problemId" IN (
  SELECT m.old_id FROM problem_id_mapping m
  WHERE m.old_id != m.new_id
)
AND EXISTS (
  SELECT 1 FROM "ProblemTopic" pt2
  WHERE pt2."problemId" = (
    SELECT m.new_id FROM problem_id_mapping m WHERE m.old_id = pt."problemId"
  )
  AND pt2."topicId" = pt."topicId"
);

-- Update ProblemTopic.problemId
UPDATE "ProblemTopic" pt
SET "problemId" = m.new_id
FROM problem_id_mapping m
WHERE pt."problemId" = m.old_id
AND pt."problemId" != m.new_id;

-- Delete duplicate explanations that would conflict
DELETE FROM "ProblemExplanation" pe
WHERE pe."problemId" IN (
  SELECT m.old_id FROM problem_id_mapping m
  WHERE m.old_id != m.new_id
)
AND EXISTS (
  SELECT 1 FROM "ProblemExplanation" pe2
  WHERE pe2."problemId" = (
    SELECT m.new_id FROM problem_id_mapping m WHERE m.old_id = pe."problemId"
  )
);

-- Update ProblemExplanation.problemId
UPDATE "ProblemExplanation" pe
SET "problemId" = m.new_id
FROM problem_id_mapping m
WHERE pe."problemId" = m.old_id
AND pe."problemId" != m.new_id;

-- Delete duplicate notes that would conflict
DELETE FROM "ProblemNote" pn
WHERE pn."problemId" IN (
  SELECT m.old_id FROM problem_id_mapping m
  WHERE m.old_id != m.new_id
)
AND EXISTS (
  SELECT 1 FROM "ProblemNote" pn2
  WHERE pn2."problemId" = (
    SELECT m.new_id FROM problem_id_mapping m WHERE m.old_id = pn."problemId"
  )
  AND pn2."userId" = pn."userId"
);

-- Update ProblemNote.problemId
UPDATE "ProblemNote" pn
SET "problemId" = m.new_id
FROM problem_id_mapping m
WHERE pn."problemId" = m.old_id
AND pn."problemId" != m.new_id;

-- ============================================================
-- STEP 7: Delete duplicate Problem rows
-- ============================================================
DELETE FROM "Problem"
WHERE "id" NOT IN (SELECT canonical_id FROM canonical_problems);

-- ============================================================
-- STEP 8: Remove old columns and constraints from Problem
-- ============================================================
ALTER TABLE "Problem" DROP COLUMN IF EXISTS "solved";
ALTER TABLE "Problem" DROP COLUMN IF EXISTS "userId";
ALTER TABLE "Problem" DROP CONSTRAINT IF EXISTS "Problem_userId_problemNumber_key";
DROP INDEX IF EXISTS "Problem_userId_idx";

-- ============================================================
-- STEP 9: Make new columns NOT NULL (skip if already)
-- ============================================================
DO $$
BEGIN
  -- Check if Submission.userId allows nulls
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Submission' AND column_name = 'userId'
    AND is_nullable = 'YES'
  ) THEN
    ALTER TABLE "Submission" ALTER COLUMN "userId" SET NOT NULL;
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'ProblemNote' AND column_name = 'userId'
    AND is_nullable = 'YES'
  ) THEN
    ALTER TABLE "ProblemNote" ALTER COLUMN "userId" SET NOT NULL;
  END IF;
END $$;

-- ============================================================
-- STEP 10: Update unique constraints
-- ============================================================
ALTER TABLE "Submission" DROP CONSTRAINT IF EXISTS "ProblemId_submittedAt_key";
ALTER TABLE "ProblemNote" DROP CONSTRAINT IF EXISTS "ProblemNote_problemId_key";

-- Add new composite unique constraints required by Prisma
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'Problem_problemNumber_key'
  ) THEN
    ALTER TABLE "Problem" ADD CONSTRAINT "Problem_problemNumber_key" UNIQUE ("problemNumber");
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'Problem_title_key'
  ) THEN
    ALTER TABLE "Problem" ADD CONSTRAINT "Problem_title_key" UNIQUE ("title");
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'Submission_problemId_userId_submittedAt_key'
  ) THEN
    ALTER TABLE "Submission" ADD CONSTRAINT "Submission_problemId_userId_submittedAt_key" UNIQUE ("problemId", "userId", "submittedAt");
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'ProblemNote_problemId_userId_key'
  ) THEN
    ALTER TABLE "ProblemNote" ADD CONSTRAINT "ProblemNote_problemId_userId_key" UNIQUE ("problemId", "userId");
  END IF;
END $$;

-- ============================================================
-- STEP 11: Add foreign key constraints (skip if exists)
-- ============================================================
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'Submission_userId_fkey'
  ) THEN
    ALTER TABLE "Submission" ADD CONSTRAINT "Submission_userId_fkey"
      FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'ProblemNote_userId_fkey'
  ) THEN
    ALTER TABLE "ProblemNote" ADD CONSTRAINT "ProblemNote_userId_fkey"
      FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE;
  END IF;
END $$;

-- ============================================================
-- STEP 12: Add indexes (skip if exists)
-- ============================================================
CREATE INDEX IF NOT EXISTS "Submission_userId_idx" ON "Submission"("userId");
CREATE INDEX IF NOT EXISTS "ProblemNote_userId_idx" ON "ProblemNote"("userId");

-- ============================================================
-- STEP 13: Clean up
-- ============================================================
DROP TABLE IF EXISTS canonical_problems;
DROP TABLE IF EXISTS problem_id_mapping;
