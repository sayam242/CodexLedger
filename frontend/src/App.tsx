import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useAuth } from "./auth/hooks/useAuth";

import LoginPage from "./auth/pages/LoginPage";
import DashboardPage from "./dashboard/pages/DashboardPage";
import ConnectExtensionPage from "./auth/pages/ConnectExtenssionPage";
import APPLayout from "./shared/layout/AppLayout";

function App() {

  const {
    user,
    loading,
  } = useAuth();

  if (loading) {

    return (
      <h1>
        Checking Session...
      </h1>
    );

  }

  return (

    <BrowserRouter>

      <Routes>
        <Route
          path="/connect-extension"
          element={
            <ConnectExtensionPage />
          }
        />
        <Route
          path="/login"
          element={
            user
              ? (
                  <Navigate
                    to="/dashboard"
                  />
                )
              : (
                  <LoginPage />
                )
          }
        />

        <Route
          path="/dashboard"
          element={
            user
              ? (
                  <DashboardPage />
                )
              : (
                  <Navigate
                    to="/login"
                  />
                )
          }
        />

        <Route
          path="*"
          element={
            <Navigate
              to={
                user
                  ? "/dashboard"
                  : "/login"
              }
            />
          }
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;