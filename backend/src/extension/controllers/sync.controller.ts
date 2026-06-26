import {Request, Response} from "express";
import {saveProblem} from "../services/sync.service";
import { AuthRequest } from "../../types/auth.types";


export async function syncProblem(req: AuthRequest, res: Response) {
    console.log("Sync problem endpoint hit");
    try{
        if (!req.user) {

            return res
                .status(401)
                .json({

                success: false,

                message:
                    "Unauthorized"

                });

        }
        const userId =req.user.id;

        const { problem }= req.body;
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