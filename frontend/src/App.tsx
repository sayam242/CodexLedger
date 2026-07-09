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
import ProblemsPage from "./problems/pages/ProblemsPage";
import ProblemDetailPage from "./detailedProblem/pages/ProblemDetailPage";
import LandingPage from "./landing/pages/LandingPage";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl font-medium text-muted-foreground">
          Checking Session...
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/connect-extension" element={<ConnectExtensionPage />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : <LoginPage />}
        />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={user ? <DashboardPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/problems"
          element={user ? <ProblemsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/problems/:problemId"
          element={user ? <ProblemDetailPage /> : <Navigate to="/login" />}
        />

        {/* Catch all - landing for visitors, dashboard for users */}
        <Route
          path="*"
          element={<Navigate to={user ? "/dashboard" : "/"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
