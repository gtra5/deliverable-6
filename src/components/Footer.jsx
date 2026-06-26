export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#111] text-slate-400 px-4 sm:px-6 lg:px-12 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Top row */}
        <div className="flex flex-col sm:flex-row justify-between gap-8 mb-8">

          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2 text-white font-bold text-lg mb-2">
              <span className="w-7 h-7 rounded-full bg-[#1DA462] flex items-center justify-center">
                <span className="text-white text-xs font-black">FX</span>
              </span>
              RatePulse
            </div>
            <p className="text-sm leading-relaxed">
              Live mid-market exchange rates, zero markups. Know what your money is really worth.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-12 gap-y-6 text-sm">
            <div className="flex flex-col gap-2">
              <span className="text-white font-semibold text-xs uppercase tracking-wider mb-1">Product</span>
              <a href="#" className="hover:text-white transition-colors">Converter</a>
              <a href="#" className="hover:text-white transition-colors">Live Rates</a>
              <a href="#" className="hover:text-white transition-colors">API Docs</a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-white font-semibold text-xs uppercase tracking-wider mb-1">Company</span>
              <a href="#" className="hover:text-white transition-colors">About</a>
              <a href="#" className="hover:text-white transition-colors">Blog</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-white font-semibold text-xs uppercase tracking-wider mb-1">Legal</span>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p>© {year} RatePulse. All rights reserved.</p>
          <p className="text-slate-500">
            Rates sourced from{" "}
            <a href="https://www.exchangerate-api.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors underline underline-offset-2">
              ExchangeRate-API
            </a>
            . For informational use only.
          </p>
        </div>
      </div>
    </footer>
  );
}
