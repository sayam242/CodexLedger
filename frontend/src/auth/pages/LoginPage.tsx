import { signInWithGoogle }
from "../services/authService";

export default function LoginPage() {

  async function handleLogin() {

    try {

      await signInWithGoogle();

    }
    catch (error) {

      console.error(error);

    }

  }

  return (

    <div>

      <h1>
        CodexLedger
      </h1>

      <p>
        Track and analyze your coding journey.
      </p>

      <button
        onClick={handleLogin}
      >
        Continue with Google
      </button>

    </div>

  );

}