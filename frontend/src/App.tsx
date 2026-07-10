import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider } from "./auth/context/AuthContext";
import { ProtectedRoute, PublicRoute } from "./auth/components/ProtectedRoute";

import LoginPage from "./auth/pages/LoginPage";
import DashboardPage from "./dashboard/pages/DashboardPage";
import ConnectExtensionPage from "./auth/pages/ConnectExtenssionPage";
import ProblemsPage from "./problems/pages/ProblemsPage";
import ProblemDetailPage from "./detailedProblem/pages/ProblemDetailPage";
import LandingPage from "./landing/pages/LandingPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes - accessible only when NOT logged in */}
          <Route element={<PublicRoute />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>

          {/* Semi-public route - accessible to everyone */}
          <Route path="/connect-extension" element={<ConnectExtensionPage />} />

          {/* Protected routes - accessible only when logged in */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/problems" element={<ProblemsPage />} />
            <Route path="/problems/:problemId" element={<ProblemDetailPage />} />
          </Route>

          {/* Catch all - redirect to appropriate page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
