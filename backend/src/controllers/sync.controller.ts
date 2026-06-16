import {Request, Response} from "express";
import {saveProblem} from "../services/sync.service";


export async function syncProblem(req: Request, res: Response) {
    try{
        const {userId, problem} = req.body;
        await saveProblem(problem, userId);
        res.status(200).json({
            success: true,
        });
    }catch(error){
        console.log("Error syncing problem:", error);
        res.status(500).json({
            success: false,
        });
    }
}