export async function sendTokenToExtension(
  token: string
) {
  console.log("Sending token:", token);
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

    "cimlcfmopngdhodadhebdmdjjmmbgddf",

    {

      type: "LOGIN_SUCCESS",

      token

    },

    (response) => {

      console.log(
        response
      );
    console.log(
      chrome.runtime.lastError
    );
    }

  );

}