import { signInWithGoogle }
from "../services/authService";
import { useAuthContext }
from "../context/AuthContext";

export default function LoginPage() {
  const { setLoginInProgress } = useAuthContext();

  async function handleLogin() {

    try {

      await signInWithGoogle(setLoginInProgress);

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