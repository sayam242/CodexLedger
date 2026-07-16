import { signOut } from "@/auth/services/authService";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

async function handleUnauthorized() {
  try {
    await signOut();
  } catch {
    // sign out even if firebase errors
  }
  window.location.href = "/login";
}

export async function apiFetch<T>(
  url: string
): Promise<T> {
  const fullUrl = `${API_BASE_URL}${url}`;

  const response =
    await fetch(
      fullUrl,
      {
        credentials: "include"
      }
    );

  if (response.status === 401) {
    await handleUnauthorized();
    throw new Error("Session expired");
  }

  if (!response.ok) {
    console.error(`API Error: ${response.status} - ${response.statusText}`, {
      url: fullUrl,
      status: response.status
    });

    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json();

}

export async function apiPost<T>(
  url: string,
  body?: unknown
): Promise<T> {
  const fullUrl = `${API_BASE_URL}${url}`;

  const response = await fetch(fullUrl, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (response.status === 401) {
    await handleUnauthorized();
    throw new Error("Session expired");
  }

  if (!response.ok) {
    console.error(`API Error: ${response.status} - ${response.statusText}`, {
      url: fullUrl,
      status: response.status,
    });

    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

export async function apiDelete<T>(
  url: string
): Promise<T> {
  const fullUrl = `${API_BASE_URL}${url}`;

  const response = await fetch(fullUrl, {
    method: "DELETE",
    credentials: "include",
  });

  if (response.status === 401) {
    await handleUnauthorized();
    throw new Error("Session expired");
  }

  if (!response.ok) {
    console.error(`API Error: ${response.status} - ${response.statusText}`, {
      url: fullUrl,
      status: response.status,
    });

    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}