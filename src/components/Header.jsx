import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-[#1DA462] px-4 sm:px-6 lg:px-12 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <a href="/" className="flex items-center gap-2 text-white font-bold text-xl tracking-tight">
          <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
            <span className="text-[#1DA462] text-sm font-black">FX</span>
          </span>
          RatePulse
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/80">
          <a href="#" className="hover:text-white transition-colors">Converter</a>
          <a href="#" className="hover:text-white transition-colors">Rates</a>
          <a href="#" className="hover:text-white transition-colors">About</a>
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href="#" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
            Sign in
          </a>
          <a href="#" className="text-sm font-semibold bg-white text-[#1DA462] px-4 py-2 rounded-lg hover:bg-white/90 transition-colors">
            Get started
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white p-1"
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 pb-2 flex flex-col gap-3 border-t border-white/20 pt-4">
          <a href="#" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Converter</a>
          <a href="#" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Rates</a>
          <a href="#" className="text-sm font-medium text-white/80 hover:text-white transition-colors">About</a>
          <hr className="border-white/20" />
          <a href="#" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Sign in</a>
          <a href="#" className="text-sm font-semibold bg-white text-[#1DA462] px-4 py-2 rounded-lg text-center hover:bg-white/90 transition-colors">
            Get started
          </a>
        </div>
      )}
    </header>
  );
}
