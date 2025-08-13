import { Navigate, useLocation } from "react-router-dom";
import { useProtectedRoute } from "../../shared/hooks/useAuth.js";

const ProtectedRoute = ({ children }) => {
  const { isRouteAccessible } = useProtectedRoute();
  const location = useLocation();

  // Check if user is authenticated and route is accessible
  if (!isRouteAccessible()) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
