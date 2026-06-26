import { useState, useMemo } from "react";
import ConverterForm from "./conversionForm";
import { fetchRates } from "../lib/exchange";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function Calendar() {
  const [viewDate, setViewDate] = useState(new Date());
  const today = new Date();

  const calendarDays = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = Array(firstDay).fill(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  }, [viewDate]);

  const isToday = (day) =>
    day &&
    day === today.getDate() &&
    viewDate.getMonth() === today.getMonth() &&
    viewDate.getFullYear() === today.getFullYear();

  return (
    <div className="w-full sm:w-[300px] shrink-0 rounded-2xl border border-white/10 p-4 bg-white shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))}
          className="p-1.5 rounded-full hover:bg-gray-100 transition-colors text-gray-700"
          aria-label="Previous month"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="text-sm font-semibold text-gray-800">
          {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
        </span>
        <button
          onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))}
          className="p-1.5 rounded-full hover:bg-gray-100 transition-colors text-gray-700"
          aria-label="Next month"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-7 mb-1">
        {WEEKDAYS.map((d) => (
          <div key={d} className="text-center text-[10px] font-medium text-gray-400 uppercase py-1">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-0.5">
        {calendarDays.map((day, idx) => (
          <div key={idx} className="flex items-center justify-center">
            {day ? (
              <div className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-medium transition-colors
                ${isToday(day) ? "bg-[#1DA462] text-white shadow-md" : "text-gray-700 hover:bg-gray-100 cursor-default"}`}
              >
                {day}
              </div>
            ) : (
              <div className="w-7 h-7" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("100");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("NGN");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rate, setRate] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [snapshot, setSnapshot] = useState(null);

  async function handleConvert() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchRates(from);
      const targetRate = data.conversion_rates[to];
      if (typeof targetRate !== "number") throw new Error(`No rate found for ${to}.`);
      setRate(targetRate);
      setLastUpdated(data.time_last_update_utc || null);
      setSnapshot({ from, to, amount });
    } catch (err) {
      setError(err.message || "Something went wrong.");
      setRate(null);
    } finally {
      setLoading(false);
    }
  }

  function handleSwap() {
    setFrom(to);
    setTo(from);
  }

  const displayFrom = snapshot ? snapshot.from : from;
  const displayTo = snapshot ? snapshot.to : to;
  const displayAmount = snapshot ? snapshot.amount : amount;
  const converted = rate != null ? Number(displayAmount) * rate : null;

  return (
    <div className="w-full bg-[#1DA462] px-4 sm:px-6 lg:px-12 py-10 lg:py-16">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">

        {/* Hero + Calendar */}
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
          <div className="flex-1 min-w-0">
            <h2
              className="text-[#111] text-5xl sm:text-6xl lg:text-7xl font-black leading-none tracking-tight uppercase"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Real Rates.<br />
              <span className="italic" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6em", fontWeight: 900 }}>
                &
              </span>{" "}
              Zero Hidden Fees.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-black/60 max-w-md leading-relaxed">
              No markups. No stale data. Every conversion pulls live mid-market
              rates so you know exactly what your money is worth — whether
              you're sending $10 or $10,000.
            </p>
          </div>

          <Calendar />
        </div>

        {/* Converter Card */}
        <div className="w-full rounded-2xl bg-white shadow-2xl p-5 sm:p-8">
          <ConverterForm
            amount={amount}
            from={from}
            to={to}
            loading={loading}
            onAmountChange={setAmount}
            onFromChange={setFrom}
            onToChange={setTo}
            onSubmit={handleConvert}
            onSwap={handleSwap}
            converted={converted}
            rate={rate}
            error={error}
            lastUpdated={lastUpdated}
            displayFrom={displayFrom}
            displayTo={displayTo}
          />
        </div>

      </div>
    </div>
  );
}
