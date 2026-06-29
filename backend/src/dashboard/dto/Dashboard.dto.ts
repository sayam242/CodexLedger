export interface DashboardSubmissionDto {

    submissionId: string;

    status: string;

    language: string;

    submittedAt: Date;

}

export interface DashboardProblemDto {

    problemId: string;

    problemNumber?: string;

    title: string;

    difficulty: string;

    latestStatus: string;

    latestSubmissionAt: Date;

    submissions: DashboardSubmissionDto[];

}

export interface DashboardStats {

    totalSolved: number;
    
}