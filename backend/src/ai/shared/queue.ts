import { Queue } from "bullmq";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

const explanationQueue = new Queue("explanation", {
  connection: {
    url: REDIS_URL,
  },
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 5000,
    },
    removeOnComplete: true,
    removeOnFail: false,
  },
});

export default explanationQueue;
