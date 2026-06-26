// Async fetch helper for ExchangeRate-API.
// Get a free key at https://www.exchangerate-api.com/ and either:
//   1) paste it directly into API_KEY below, or
//   2) define VITE_EXCHANGE_API_KEY in your env file.

const API_KEY = import.meta.env.VITE_EXCHANGE_API_KEY || "YOUR_API_KEY";

/**
 * Fetches latest conversion rates for a base currency.
 * Demonstrates async/await, Promises, try/catch, JSON parsing.
 */
export async function fetchRates(baseCurrency) {
  const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${baseCurrency}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Network error: ${response.status} ${response.statusText}`);
  }

  // Parse the JSON payload returned by the API.
  const data = await response.json();

  if (data.result !== "success") {
    throw new Error(`API error: ${data["error-type"] || "unknown"}`);
  }

  return data;
}
