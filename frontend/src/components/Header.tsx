import { User } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-14 z-30 bg-[#07080a]/90 border-b border-white/[0.04] flex items-center justify-between px-8 transition-all duration-300">
      {/* Brand logo */}
      <div className="flex items-center gap-3 select-none">
        <div className="h-5 w-5 rounded bg-gradient-to-tr from-clinicalCyan to-clinicalBlue flex items-center justify-center p-[1px]">
          <div className="h-full w-full bg-black rounded-[3px] flex items-center justify-center font-semibold text-[8px] text-clinicalCyan">
            Ω
          </div>
        </div>
        <span className="font-bold text-xs tracking-wider text-white">
          ONCOSIGHT <span className="text-clinicalCyan font-light">AI</span>
        </span>
      </div>

      {/* Diagnostics status */}
      <div className="hidden md:flex items-center gap-2 rounded border border-white/5 bg-[#0c0d10] px-3.5 py-1 text-[9px] font-semibold text-gray-400">
        <span className="h-1.5 w-1.5 rounded-full bg-clinicalCyan animate-pulse" />
        SYSTEM STATUS: ONLINE
      </div>

      {/* Control center */}
      <div className="flex items-center gap-4">
        {/* User profile */}
        <div className="flex items-center gap-2.5 border-l border-white/10 pl-4 h-7">
          <div className="text-right hidden sm:block">
            <div className="text-[10px] font-bold text-white tracking-wide">Dr. Fawaz</div>
            <div className="text-[7px] font-mono text-gray-500 uppercase tracking-widest">Oncology Dept</div>
          </div>
          <div className="h-7 w-7 rounded bg-charcoal-700 border border-white/5 flex items-center justify-center text-clinicalCyan select-none">
            <User className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>
    </header>
  );
}
