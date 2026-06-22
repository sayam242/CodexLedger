import { type LoginRequestDto } from "../types/dto/loginRequest.types";

export async function loginUser(
  user: LoginRequestDto
): Promise<string> {

  const response = await fetch(
    "http://localhost:5000/api/auth/login",
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(user)
    }
  );

  if (!response.ok) {

    throw new Error(
      "Login failed"
    );

  }
  const data = await response.json();
  return data.token;

}