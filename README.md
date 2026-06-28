# RatePulse — Currency Converter

A live currency converter built with React and Vite. Converts between USD, GBP, EUR, NGN, and CAD using real-time mid-market rates from [ExchangeRate-API](https://www.exchangerate-api.com/). The API key never touches the browser — all requests go through a serverless function that runs on Vercel.

---

## What It Does

- Type an amount, choose a source and target currency, hit **Convert**
- Shows the converted amount and both directions of the rate (e.g. 1 USD = x NGN and 1 NGN = x USD)
- Swap button flips the two currencies instantly
- Interactive calendar in the hero section highlights today's date and lets you browse months
- Fully responsive across mobile, tablet, and desktop

---

## Project Structure

```
├── api/
│   └── rates.js              # Vercel serverless function — fetches from ExchangeRate-API server-side
│
├── src/
│   ├── main.jsx              # Entry point, mounts React into the DOM
│   ├── App.jsx               # Root layout — Header, CurrencyConverter, Footer
│   ├── index.css             # Tailwind CSS v4 import
│   │
│   ├── components/
│   │   ├── Header.jsx        # Nav bar with logo, links, mobile hamburger menu
│   │   ├── Footer.jsx        # Footer with links and API attribution
│   │   ├── currencyConverter.jsx  # Main section — owns all state, renders Calendar + ConverterForm
│   │   ├── conversionForm.jsx     # Form inputs: amount, currency selectors, swap, submit
│   │   └── ExchangeResult.jsx    # Standalone result display (loading / error / success states)
│   │
│   └── lib/
│       └── exchange.js       # Calls /api/rates and returns parsed JSON to the component
│
├── vercel.json               # Routing rules for Vercel deployment
└── vite.config.js            # Vite config with Tailwind plugin and dev proxy for /api
```

---

## How the Code Works

### `main.jsx`
Entry point. Calls `createRoot` and renders `<App />` wrapped in `StrictMode`.

### `App.jsx`
The layout shell. Uses a flex column so `Header` sticks to the top, the main converter fills the middle, and `Footer` sits at the bottom regardless of content height.

### `Header.jsx`
Responsive nav bar. Desktop shows links and a "Get started" button. On mobile everything collapses behind a hamburger icon — toggled with a `useState` boolean that swaps between open/close SVG paths.

### `currencyConverter.jsx`
The stateful core of the app. Everything the user interacts with lives here.

| State | What it tracks |
|---|---|
| `amount`, `from`, `to` | Live form values as the user types/selects |
| `loading` | True while the API request is in flight |
| `error` | Error string if the request fails for any reason |
| `rate`, `lastUpdated` | Rate value and timestamp returned from the API |
| `snapshot` | Copy of `from`, `to`, `amount` taken at submit time — keeps the displayed result in sync with what was actually converted |

`handleConvert` is `async`. It calls `fetchRates(from)`, pulls `conversion_rates[to]` out of the response, and saves it to state. Any failure — network error, bad key, unknown currency — is caught and shown as an error message.

The `Calendar` sub-component uses `useMemo` to build the grid of days for the visible month. It highlights today with a green circle and lets you step forward/back through months with chevron buttons.

### `conversionForm.jsx`
A fully controlled form — no internal state. The parent passes down all values and all change handlers as props. The "You Get" field shows the `converted` value computed in the parent rather than being an input, so the calculation always happens in one place.

### `ExchangeResult.jsx`
A standalone presentational component with three render paths: a spinner while loading, an error block if something went wrong, or the formatted result with rate info. Currently the result is shown inline in `conversionForm`, but this component is available if the layout changes.

### `lib/exchange.js`
Calls the app's own `/api/rates?base=USD` endpoint (not the third-party API directly). This keeps the API key out of the browser bundle entirely. Throws a descriptive error if the HTTP status is not OK or if the API returns a non-success result field.

### `api/rates.js`
Vercel serverless function. Reads `EXCHANGE_API_KEY` from the server environment, forwards the request to ExchangeRate-API, and proxies the response back. If the key is missing it returns a 500 with a clear message. The browser never sees the key.

---

## Getting Started

**1. Install dependencies**
```bash
npm install
```

**2. Add your API key to `.env`**

Get a free key at [exchangerate-api.com](https://www.exchangerate-api.com/):
```
EXCHANGE_API_KEY=your_key_here
```

**3. Start the dev server**
```bash
npm run dev
```

> The Vite dev proxy forwards `/api` requests to `localhost:3000`. For local serverless function testing, use the [Vercel CLI](https://vercel.com/docs/cli): `vercel dev`

**4. Build for production**
```bash
npm run build
```

---

## Deploying to Vercel

1. Push to GitHub — Vercel picks up changes automatically
2. In your Vercel project go to **Settings → Environment Variables**
3. Add `EXCHANGE_API_KEY` with your key value, select all environments
4. Redeploy

The `vercel.json` file handles routing so `/api/*` goes to the serverless function and everything else serves `index.html`.

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| React | 19 | UI components and state management |
| Vite | 8 | Dev server and production bundler |
| Tailwind CSS | 4 | Utility-first styling |
| Lucide React | latest | Calendar navigation icons |
| ExchangeRate-API | v6 | Live mid-market exchange rate data |

---

## Environment Variables

| Variable | Where | Description |
|---|---|---|
| `EXCHANGE_API_KEY` | Vercel / server only | Your ExchangeRate-API key — never exposed to the browser |

> Do not prefix this with `VITE_`. Vite inlines `VITE_` variables into the client bundle, which would expose your key publicly. The serverless function reads it from `process.env` on the server side only.
