import { signInWithGoogle }
from "./services/authService";

import { useAuth }
from "./hooks/useAuth";

function App() {

  const {
    user,
    loading,
  } = useAuth();

  async function handleLogin() {

    try {

      await signInWithGoogle();

    } catch (error) {

      console.error(error);

    }
  }

  if (loading) {

    return (
      <h1>
        Checking Session...
      </h1>
    );
  }

  return (
    <div>

      <h1>
        CodexLedger
      </h1>

      {user ? (

        <>
          <h2>
            Welcome {user.displayName}
          </h2>

          <p>
            {user.email}
          </p>
        </>

      ) : (

        <button
          onClick={handleLogin}
        >
          Login With Google
        </button>

      )}

    </div>
  );
}

export default App;