const CURRENCIES = ["USD", "GBP", "EUR", "NGN", "CAD"];

const fmt = (val) =>
  new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(val);

export default function ConverterForm({
  amount, from, to, loading,
  onAmountChange, onFromChange, onToChange,
  onSubmit, onSwap,
  converted, rate, error, lastUpdated,
  displayFrom, displayTo,
}) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="flex flex-col gap-5">

      {/* Input row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-4">

        {/* You Have */}
        <div className="flex-1 min-w-0">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
            You Have
          </label>
          <div className="flex items-end gap-3 border-b-2 border-gray-200 pb-1 focus-within:border-[#1DA462] transition-colors">
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              value={amount}
              onChange={(e) => onAmountChange(e.target.value)}
              placeholder="0.00"
              required
              className="flex-1 min-w-0 text-2xl sm:text-3xl font-semibold text-gray-900 bg-transparent focus:outline-none"
            />
            <select
              value={from}
              onChange={(e) => onFromChange(e.target.value)}
              className="text-base font-medium text-gray-600 bg-transparent focus:outline-none cursor-pointer pb-0.5"
            >
              {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Swap */}
        <button
          type="button"
          onClick={onSwap}
          aria-label="Swap currencies"
          className="self-center sm:self-end w-10 h-10 shrink-0 rounded-full border border-[#1DA462]/30 flex items-center justify-center text-[#1DA462] hover:bg-[#1DA462]/10 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 10h14l-4-4" />
            <path d="M17 14H3l4 4" />
          </svg>
        </button>

        {/* You Get */}
        <div className="flex-1 min-w-0">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
            You Get
          </label>
          <div className="flex items-end gap-3 border-b-2 border-gray-200 pb-1">
            <div className="flex-1 min-w-0 text-2xl sm:text-3xl font-semibold text-gray-900 min-h-[2.5rem] flex items-center">
              {loading ? (
                <span className="text-gray-300 text-lg">Converting…</span>
              ) : converted != null ? (
                fmt(converted)
              ) : (
                <span className="text-gray-300">—</span>
              )}
            </div>
            <select
              value={to}
              onChange={(e) => onToChange(e.target.value)}
              className="text-base font-medium text-gray-600 bg-transparent focus:outline-none cursor-pointer pb-0.5"
            >
              {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Convert button */}
        <button
          type="submit"
          disabled={loading}
          className="shrink-0 w-full sm:w-auto px-7 py-3 bg-[#1DA462] text-white rounded-xl font-semibold text-sm hover:bg-[#189954] active:translate-y-px transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? "Converting…" : "Convert"}
        </button>
      </div>

      {/* Rate info */}
      {rate != null && !error && (
        <div className="text-sm text-gray-500 space-y-0.5">
          <p>1 {displayFrom} = {fmt(rate)} {displayTo}</p>
          <p>1 {displayTo} = {fmt(1 / rate)} {displayFrom}</p>
          {lastUpdated && (
            <p className="text-xs text-gray-400 mt-1">Updated {lastUpdated}</p>
          )}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* Disclaimer */}
      <div className="bg-gray-50 rounded-xl px-4 py-3 flex items-start gap-3">
        <span className="text-gray-400 text-sm shrink-0">ⓘ</span>
        <p className="text-xs text-gray-500 leading-relaxed">
          We use the mid-market rate for our Converter. This is for informational
          purposes only. You won't receive this rate when sending money.
        </p>
      </div>

    </form>
  );
}
