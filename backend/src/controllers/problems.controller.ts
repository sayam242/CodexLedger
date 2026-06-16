import {Request, Response} from 'express';
export function getAllProblems(req: Request, res: Response) {
    // Mock data for problems
    const problems = [
        { id: 1, title: "Two Sum", difficulty: "Easy" },
        { id: 2, title: "Add Two Numbers", difficulty: "Medium" },
        { id: 3, title: "Longest Substring Without Repeating Characters", difficulty: "Hard" }
    ];
    res.json(problems);
}