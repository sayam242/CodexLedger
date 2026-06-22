import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebase/firebase";
import { loginUser } from "../../api/auth.api";
import { sendTokenToExtension } from "../services/extensionAuthService";

export default function ConnectExtensionPage() {
console.log(
    "ConnectExtensionPage rendered"
  );

const navigate = useNavigate();

const [status, setStatus] =
useState(
"Checking session..."
);

useEffect(() => {
console.log("ConnectExtensionPage mounted, checking auth state...");
const unsubscribe =
  onAuthStateChanged(

    auth,

    async (user) => {

      try {

        if (!user) {

          navigate(
            "/login"
          );

          return;

        }

        setStatus(
          "Recovering session..."
        );

        const token =
          await loginUser({

            id:
              user.uid,

            name:
              user.displayName ?? "",

            email:
              user.email ?? "",

            photoUrl:
              user.photoURL ?? ""

          });

        setStatus(
          "Connecting extension..."
        );

        await sendTokenToExtension(
          token
        );

        setStatus(
          "Session restored successfully."
        );

        setTimeout(
          () => {

            window.close();

          },

          1500
        );

      }

      catch (error) {

        console.error(
          error
        );

        setStatus(
          "Failed to connect extension."
        );

      }

    }

  );

return () => {

  unsubscribe();

};

}, [navigate]);

return (

<div
    style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "16px"
    }}
    >

    <h1>
        CodexLedger
    </h1>

    <p>
        {status}
    </p>

</div>


);

}
