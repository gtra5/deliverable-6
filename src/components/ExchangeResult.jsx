const fmt = (val) =>
  new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(val);

export default function ExchangeResult({
  loading,
  error,
  amount,
  from,
  to,
  rate,
  lastUpdated,
}) {
  const base =
    "mt-7 min-h-[110px] flex flex-col justify-center items-center text-center rounded-[14px] border px-5 py-5";

  if (loading) {
    return (
      <div className={`${base} border-white/[0.06] bg-slate-900/70 text-slate-400`}>
        <div className="w-7 h-7 mb-2.5 rounded-full border-[3px] border-slate-600 border-t-sky-400 animate-spin" />
        <p className="text-sm">Fetching latest rates…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${base} border-red-400/40 bg-red-400/[0.08]`}>
        <p className="text-sm text-slate-400 mb-1">Something went wrong</p>
        <p className="text-sm text-red-300">{error}</p>
      </div>
    );
  }

  if (rate == null) {
    return (
      <div className={`${base} border-white/[0.06] bg-slate-900/70 text-slate-500`}>
        <p className="text-sm">
          Enter an amount and hit Convert to see live exchange rates.
        </p>
      </div>
    );
  }

  const converted = Number(amount) * rate;

  return (
    <div className={`${base} border-white/[0.06] bg-slate-900/70`}>
      <p className="text-sm text-slate-400 mb-1">
        {fmt(Number(amount))} {from} =
      </p>
      <p className="text-[2rem] font-bold tracking-tight text-slate-100">
        {fmt(converted)}{" "}
        <span className="text-lg font-medium text-teal-300 ml-1">{to}</span>
      </p>
      <p className="mt-1.5 text-sm text-slate-400">
        1 {from} = {fmt(rate)} {to}
      </p>
      {lastUpdated && (
        <p className="mt-2 text-[0.72rem] text-slate-500">Updated {lastUpdated}</p>
      )}
    </div>
  );
}