import { CreditCard, LogOut } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../shared/hooks/useAuth.js";
import { useTransactions } from "../../../shared/hooks/useTransactions.js";
import StatsCards from "../components/StatsCards.jsx";
import TransactionTable from "../components/TransactionTable.jsx";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const {
    transactions,
    isLoading,
    hasError,
    error,
    fetchTransactions,
    clearAllTransactions,
    refreshTransactions,
  } = useTransactions();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate("/login");
      return;
    }

    // Fetch transactions for the current user
    fetchTransactions(user.id);

    // Cleanup function to clear transactions when leaving
    return () => {
      clearAllTransactions();
    };
  }, [
    user,
    isAuthenticated,
    navigate,
    fetchTransactions,
    clearAllTransactions,
  ]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleRetryTransactions = () => {
    refreshTransactions();
  };

  const LoadingScreen = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading your dashboard...</p>
      </div>
    </div>
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 sm:h-16">
            <div className="flex items-center mb-4 sm:mb-0">
              <CreditCard className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">PayQuick</h1>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {user?.name}
                </p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center btn-secondary text-sm font-medium"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <StatsCards transactions={transactions} />

        {/* Transactions Table */}
        <TransactionTable
          transactions={transactions}
          error={hasError ? error : null}
          onRetry={handleRetryTransactions}
        />
      </main>
    </div>
  );
};

export default Dashboard;
