import { CreditCard, DollarSign, TrendingUp } from "lucide-react";
import { formatSimpleCurrency } from "../../../shared/utils/formatters.js";

const StatsCards = ({ transactions }) => {
  const calculateBalance = () => {
    return transactions.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );
  };

  const calculateIncome = () => {
    return transactions
      .filter((t) => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const calculateExpenses = () => {
    return Math.abs(
      transactions
        .filter((t) => t.amount < 0)
        .reduce((sum, t) => sum + t.amount, 0)
    );
  };

  const totalBalance = calculateBalance();
  const totalIncome = calculateIncome();
  const totalExpenses = calculateExpenses();

  const statsData = [
    {
      id: "balance",
      title: "Total Balance",
      value: totalBalance,
      icon: DollarSign,
      iconBgColor: "bg-green-100",
      iconColor: "text-green-600",
      valueColor: "text-gray-900",
    },
    {
      id: "income",
      title: "Income",
      value: totalIncome,
      icon: TrendingUp,
      iconBgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      valueColor: "text-green-600",
    },
    {
      id: "expenses",
      title: "Expenses",
      value: totalExpenses,
      icon: CreditCard,
      iconBgColor: "bg-red-100",
      iconColor: "text-red-600",
      valueColor: "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {statsData.map((stat) => {
        const IconComponent = stat.icon;
        return (
          <div
            key={stat.id}
            className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center min-w-0">
              <div
                className={`p-2 ${stat.iconBgColor} rounded-lg flex-shrink-0`}
              >
                <IconComponent className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
              <div className="ml-4 min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>
                <p
                  className={`text-xl sm:text-2xl font-bold ${stat.valueColor} break-words`}
                >
                  {formatSimpleCurrency(stat.value)}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
