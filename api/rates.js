export default async function handler(req, res) {
  const baseCurrency = req.query.base || "USD";
  const apiKey =
    process.env.EXCHANGE_API_KEY || process.env.VITE_EXCHANGE_API_KEY;

  if (!apiKey || apiKey === "YOUR_API_KEY") {
    res.status(500).json({
      error:
        "Missing Exchange API key. Set EXCHANGE_API_KEY in your hosting platform.",
    });
    return;
  }

  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${String(baseCurrency).toUpperCase()}`,
    );

    const data = await response.json();

    if (!response.ok || data.result !== "success") {
      res.status(response.status || 502).json({
        error: data["error-type"] || "Unable to fetch exchange rates",
      });
      return;
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(502).json({
      error: error.message || "Unable to reach exchange rate provider",
    });
  }
}
