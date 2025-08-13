import { CURRENCY } from "../constants/app.js";

/**
 * Format currency amount with proper sign and color indication
 * @param {number} amount - The amount to format
 * @param {string} currency - Currency code (default: USD)
 * @returns {object} Object with formatted amount and styling info
 */
export const formatCurrency = (amount, currency = CURRENCY.DEFAULT) => {
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);

  const formattedAmount = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: CURRENCY.DECIMAL_PLACES,
    maximumFractionDigits: CURRENCY.DECIMAL_PLACES,
  }).format(absAmount);

  return {
    amount: formattedAmount,
    isNegative,
    sign: isNegative ? "-" : "+",
    colorClass: isNegative ? "text-red-600" : "text-green-600",
    displayAmount: `${isNegative ? "-" : "+"}${formattedAmount}`,
  };
};

/**
 * Format a simple number as currency without sign indicators
 * @param {number} amount - The amount to format
 * @param {string} currency - Currency code (default: USD)
 * @returns {string} Formatted currency string
 */
export const formatSimpleCurrency = (amount, currency = CURRENCY.DEFAULT) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: CURRENCY.DECIMAL_PLACES,
    maximumFractionDigits: CURRENCY.DECIMAL_PLACES,
  }).format(amount);
};

/**
 * Format date for display
 * @param {string|Date} date - Date to format
 * @param {string} format - Format type ('short', 'long', 'medium')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = "short") => {
  const dateObj = new Date(date);

  if (isNaN(dateObj.getTime())) {
    return "Invalid Date";
  }

  const options = {
    short: {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
    medium: {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
    long: {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  };

  return dateObj.toLocaleDateString("en-US", options[format] || options.short);
};
