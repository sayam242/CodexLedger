import { type LoginRequestDto } from "../types/dto/loginRequest.types";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function loginUser(
  user: LoginRequestDto
): Promise<string> {

  const response = await fetch(
    `${API_BASE_URL}/api/auth/login`,
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