import React from 'react';
import { ThemeTokens } from '../types';
import { Sparkles, Cpu, Play } from 'lucide-react';

interface FloatingDynamicPillProps {
  theme: ThemeTokens;
  lowRamMode: boolean;
  activePlayingTitle?: string | null;
  onPillClick?: () => void;
}

export const FloatingDynamicPill: React.FC<FloatingDynamicPillProps> = ({
  theme,
  lowRamMode,
  activePlayingTitle,
  onPillClick,
}) => {
  return (
    <button
      onClick={onPillClick}
      className={`px-2.5 py-0.5 rounded-full flex items-center gap-1.5 text-[9px] font-semibold border shadow-md transition-all duration-300 hover:scale-105 active:scale-95 ${
        lowRamMode
          ? 'bg-[#121D17] border-white/10 text-slate-200'
          : 'bg-black/90 backdrop-blur-md border-white/15 text-white'
      }`}
      style={{
        borderColor: theme.borderAccent,
        boxShadow: `0 2px 8px ${theme.primaryGlow}`,
      }}
      title="Dynamic Island Status - Klik untuk membuka Cetak Biru Arsitektur"
      aria-label="Dynamic Island Status"
    >
      {/* Camera punch dot */}
      <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-white/20 shrink-0 flex items-center justify-center">
        <div className="w-1 h-1 rounded-full bg-emerald-500/80" />
      </div>

      {activePlayingTitle ? (
        <>
          <Play size={8} className="fill-current" style={{ color: theme.primary }} />
          <span className="truncate max-w-[90px] text-slate-200">
            {activePlayingTitle}
          </span>
        </>
      ) : (
        <>
          <span className="font-bold tracking-tight" style={{ color: theme.primary }}>
            PeTaNi
          </span>
          <span className="text-[8px] text-slate-400 border-l border-white/15 pl-1 flex items-center gap-0.5">
            {lowRamMode ? (
              <>
                <Cpu size={8} className="text-amber-400" />
                <span className="text-amber-300 font-mono">4GB</span>
              </>
            ) : (
              <>
                <Sparkles size={8} style={{ color: theme.primaryLight }} />
                <span>Liquid</span>
              </>
            )}
          </span>
        </>
      )}
    </button>
  );
};
