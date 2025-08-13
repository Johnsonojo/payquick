import { useSelector } from "react-redux";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import ProtectedRoute from "./components/layout/ProtectedRoute.jsx";
import LoginPage from "./features/auth/pages/LoginPage.jsx";
import DashboardPage from "./features/transactions/pages/DashboardPage.jsx";

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Login route */}
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <LoginPage />
              )
            }
          />

          {/* Protected dashboard route */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          {/* Default redirect */}
          <Route
            path="/"
            element={
              <Navigate
                to={isAuthenticated ? "/dashboard" : "/login"}
                replace
              />
            }
          />

          {/* Catch all - redirect based on auth status */}
          <Route
            path="*"
            element={
              <Navigate
                to={isAuthenticated ? "/dashboard" : "/login"}
                replace
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
