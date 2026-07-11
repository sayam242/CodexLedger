import {Request, Response} from "express";
import {loginUser,getCurrentUser} from "../services/auth.service";
import jwt from "jsonwebtoken";


export async function login(
  req: Request,
  res: Response
) {
  const token = await loginUser(
    req.body
  );

  res.cookie(
  "codexLedger_session",
    token,
    {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60 * 1000,
    }
  );
  res.status(200).json({
    success: true,
    token
  });

}

export async function getMe(
  req: Request,
  res: Response
) { 
    const authHeader =req.headers.authorization;
    const token =authHeader?.split(" ")[1];
    const user=await getCurrentUser(token);
    if(!user){
        return res
        .status(401)
        .json({
            authenticated:false,
        });
    }
    return res.status(200).json({
        authenticated:true,
        user
    });
}



export async function refreshToken(
  req: Request,
  res: Response
) {
  console.log("Refresh token endpoint hit");
  
  const sessionToken =
    req.cookies.codexLedger_session;

  const user =
    await getCurrentUser(
      sessionToken
    );
  
  if (!user) {

    return res
      .status(401)
      .json({
        success: false
      });

  }

  const token =
    jwt.sign(

      {
        uid: user.id
      },

      process.env.JWT_SECRET!,

      {
        expiresIn: "30d"
      }

    );
  return res
    .status(200)
    .json({

      token

    });

}