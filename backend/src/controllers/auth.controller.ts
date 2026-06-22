import {Request, Response} from "express";
import {loginUser,getCurrentUser} from "../services/auth.service";
import cookieParser from "cookie-parser";
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
        sameSite:"lax",
        secure: false,
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
  console.log("Cookies received:", req.cookies);
  const sessionToken =
    req.cookies.codexLedger_session;

  const user =
    await getCurrentUser(
      sessionToken
    );
  console.log("User from refresh token:", user);
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
  console.log("New token generated:", token);
  return res
    .status(200)
    .json({

      token

    });

}