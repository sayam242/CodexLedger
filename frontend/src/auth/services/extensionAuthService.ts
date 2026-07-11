export async function sendTokenToExtension(
  token: string
) {
  try {
    if (
      typeof chrome === "undefined" ||
      !chrome.runtime ||
      !chrome.runtime.sendMessage
    ) {
      return;
    }

    chrome.runtime.sendMessage(
      import.meta.env.VITE_EXTENSION_ID,
      {
        type: "LOGIN_SUCCESS",
        token
      }
    );
  } catch {
    // Extension not installed or not accessible
  }
}