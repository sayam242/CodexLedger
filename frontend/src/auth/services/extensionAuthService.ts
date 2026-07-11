export async function sendTokenToExtension(
  token: string
) {
  if (
    typeof chrome === "undefined" ||
    !chrome.runtime
  ) {

    console.log(
      "Extension not installed"
    );

    return;

  }

  chrome.runtime.sendMessage(

    import.meta.env.VITE_EXTENSION_ID,

    {

      type: "LOGIN_SUCCESS",

      token

    },



  );

}