# deliverable-6

## RatePulse — Currency Converter

A live currency converter built with React and Vite. It pulls real-time mid-market exchange rates from [ExchangeRate-API](https://www.exchangerate-api.com/) and lets you convert between USD, GBP, EUR, NGN, and CAD instantly.

---

## What It Does

- Enter an amount, pick a source currency and a target currency, and hit **Convert**
- The result and the reverse rate (e.g. 1 NGN = x USD) appear immediately below
- Swap button flips the two currencies in one click
- An interactive calendar widget sits in the hero section showing the current month with today highlighted
- Fully responsive — works on mobile, tablet, and desktop

---

## Project Structure

```
src/
├── main.jsx                  # App entry point, mounts React into the DOM
├── App.jsx                   # Root layout — Header, main content, Footer
├── index.css                 # Tailwind CSS import
│
├── components/
│   ├── Header.jsx            # Top nav with logo, links, and mobile hamburger menu
│   ├── Footer.jsx            # Bottom section with links and attribution
│   ├── currencyConverter.jsx # Main page section — owns all state, renders Calendar + ConverterForm
│   ├── conversionForm.jsx    # The actual form inputs (amount, from/to selectors, swap, submit)
│   └── ExchangeResult.jsx    # Displays loading, error, or the conversion result
│
└── lib/
    └── exchange.js           # fetch() wrapper that calls the ExchangeRate-API
```

---

## How the Code Works

### `main.jsx`

Entry point. Creates the React root and renders `<App />` inside `StrictMode`.

### `App.jsx`

The top-level layout shell. Stacks `Header`, `CurrencyConverter`, and `Footer` in a full-height flex column so the footer always sits at the bottom.

### `Header.jsx`

A responsive navigation bar. On desktop it shows nav links and a "Get started" CTA. On mobile it collapses into a hamburger menu toggled with a `useState` boolean.

### `currencyConverter.jsx`

The core of the app. It holds all the state:

| State                  | What it tracks                                                                                                             |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `amount`, `from`, `to` | Current form values                                                                                                        |
| `loading`              | Whether a fetch is in progress                                                                                             |
| `error`                | Any error message from a failed request                                                                                    |
| `rate`, `lastUpdated`  | Data returned from the API                                                                                                 |
| `snapshot`             | A frozen copy of `from`, `to`, `amount` at the moment Convert was clicked, so the result always matches what was submitted |

`handleConvert` is an `async` function — it `await`s `fetchRates`, extracts the rate from `conversion_rates[to]`, and updates state. If anything goes wrong (network failure, bad API key, missing currency) the `catch` block sets the error message instead.

It also renders the `Calendar` component, which uses `useMemo` to compute which days to display for the visible month, and highlights today's date.

### `conversionForm.jsx`

A fully controlled form. It receives all values and change handlers as props — it owns no state itself. The "You Get" side displays the computed `converted` value passed down from the parent rather than having its own input, keeping the conversion logic in one place.

### `ExchangeResult.jsx`

A presentational component (currently not used in the active layout — the result is shown inline in `conversionForm`). Handles three display states: loading spinner, error message, or the formatted result.

### `lib/exchange.js`

A thin `fetch` wrapper. Reads `VITE_EXCHANGE_API_KEY` from the environment, builds the API URL, and throws a descriptive error if the HTTP response or the API result field indicates failure. Returns the parsed JSON so the caller can pull out whatever it needs.

---

## Getting Started

**1. Clone and install**

```bash
npm install
```

**2. Add your API key**

Get a free key from [exchangerate-api.com](https://www.exchangerate-api.com/) and add it to `.env`:

```
VITE_EXCHANGE_API_KEY=your_key_here
```

**3. Run the dev server**

```bash
npm run dev
```

**4. Build for production**

```bash
npm run build
```

---

## Tech Stack

| Tool             | Version | Purpose                     |
| ---------------- | ------- | --------------------------- |
| React            | 19      | UI components and state     |
| Vite             | 8       | Dev server and bundler      |
| Tailwind CSS     | 4       | Styling via utility classes |
| Lucide React     | latest  | Calendar chevron icons      |
| ExchangeRate-API | v6      | Live exchange rate data     |

---

## Environment Variables

| Variable                | Required | Description               |
| ----------------------- | -------- | ------------------------- |
| `VITE_EXCHANGE_API_KEY` | Yes      | Your ExchangeRate-API key |

Without a valid key the app will throw an API error when you try to convert.
