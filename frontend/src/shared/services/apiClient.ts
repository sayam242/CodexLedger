export async function apiFetch<T>(
  url: string
): Promise<T> {

  const response =
    await fetch(
      url,
      {
        credentials: "include"
      }
    );

  if (!response.ok) {

    throw new Error(
      "API request failed"
    );

  }

  return response.json();

}