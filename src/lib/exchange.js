// Fetch exchange rates through the app's local API endpoint so the
// browser does not need to call the third-party provider directly.
export async function fetchRates(baseCurrency) {
  const response = await fetch(
    `/api/rates?base=${encodeURIComponent(baseCurrency)}`,
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Network error: ${response.status}`);
  }

  const data = await response.json();

  if (data.result !== "success") {
    throw new Error(`API error: ${data["error-type"] || "unknown"}`);
  }

  return data;
}
