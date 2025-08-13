import {
  formatCurrency,
  formatDate,
} from "../../../shared/utils/formatters.js";

const TransactionTable = ({ transactions, onRetry, error }) => {
  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Transactions
          </h2>
        </div>
        <div className="p-6">
          <div className="rounded-md bg-red-50 p-4">
            <h3 className="font-semibold text-red-800 mb-2">
              Error loading transactions
            </h3>
            <p className="text-sm text-red-800 mb-2">{error}</p>
            <button
              onClick={onRetry}
              className="mt-3 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Transactions
          </h2>
        </div>
        <div className="p-6 text-center">
          <p className="text-gray-500 mb-2">No transactions found</p>
          <button
            onClick={onRetry}
            className="mt-2 px-3 py-1 btn-primary text-sm"
          >
            Refresh Transactions
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          Recent Transactions
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction) => {
              const { amount, isNegative, colorClass } = formatCurrency(
                transaction.amount
              );

              return (
                <tr
                  key={transaction.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(transaction.date, "short")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div
                        className={`p-1 rounded-full mr-3 ${
                          isNegative ? "bg-red-100" : "bg-green-100"
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${
                            isNegative ? "bg-red-500" : "bg-green-500"
                          }`}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {transaction.description}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <span className={colorClass}>
                      {isNegative ? "-" : "+"}
                      {amount}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
