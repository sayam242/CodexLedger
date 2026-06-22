import prisma from "../lib/prisma";
import {LoginRequestDto} from "../types/dto/loginRequest.types";
import jwt from "jsonwebtoken"

export async function loginUser(
  user: LoginRequestDto
) {

  const savedUser= await prisma.user.upsert({

    where: {
      id: user.id
    },

    update: {
      name: user.name,
      email: user.email,
      photoUrl: user.photoUrl
    },

    create: {
      id: user.id,
      name: user.name,
      email: user.email,
      photoUrl: user.photoUrl
    }

  });

  const token = jwt.sign(
    {
        uid: savedUser.id,
    },
    process.env.JWT_SECRET!,

    {
        expiresIn: "30d",
    }
    );
  return token;
}


export async function getCurrentUser(
  token?: string
) {
  if (!token) {
    return null;
  }  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { uid: string };
    
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.uid
      }
    });
    return user;
  } catch (error) {
    return null;
  }
}