import React, { useEffect } from 'react';
import { ScreenId, ThemeTokens } from '../types';
import { ShieldCheck } from 'lucide-react';

interface SplashScreenProps {
  onNavigate: (screen: ScreenId) => void;
  theme: ThemeTokens;
  lowRamMode: boolean;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onNavigate,
  theme,
  lowRamMode,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Auto transitions to onboarding or home based on auth
      onNavigate('onboarding');
    }, 2800);
    return () => clearTimeout(timer);
  }, [onNavigate]);

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-between p-8 text-center select-none overflow-hidden"
      style={{ backgroundColor: theme.canvas }}
    >
      {/* Ambient background glow */}
      {!lowRamMode && (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl opacity-25 pointer-events-none"
          style={{ backgroundColor: theme.primary }}
        />
      )}

      {/* Decorative top pattern */}
      <div className="w-full flex justify-between items-center text-[11px] text-slate-500 pt-2">
        <span>ANDROID FLUTTER CLIENT</span>
        <span className="flex items-center gap-1 text-emerald-400">
          <ShieldCheck size={12} /> WIDEVINE L1
        </span>
      </div>

      {/* Center Cinematic Logo */}
      <div className="flex flex-col items-center justify-center -mt-6">
        {/* Animated Cyber Leaf & Film Symbol */}
        <div className="relative mb-6">
          <div
            className={`w-28 h-28 rounded-3xl flex items-center justify-center border shadow-2xl transition-all duration-700 animate-pulse ${
              lowRamMode ? 'bg-[#121D17]' : 'backdrop-blur-md'
            }`}
            style={{
              backgroundColor: theme.surfaceGlass,
              borderColor: theme.borderAccent,
              boxShadow: `0 16px 40px ${theme.primaryGlow}`,
            }}
          >
            {/* PeTaNi Cyber Leaf Icon */}
            <svg
              className="w-16 h-16 drop-shadow-lg"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Cinema Clapper & Cyber Plant Fusion */}
              <path
                d="M32 6C18 6 12 20 12 34C12 48 24 58 32 58C40 58 52 48 52 34C52 20 46 6 32 6Z"
                fill="url(#emerald_leaf)"
                opacity="0.85"
              />
              <path
                d="M32 14V52"
                stroke={theme.canvas}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M22 28L32 34L42 26"
                stroke={theme.canvas}
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M24 40L32 44L40 38"
                stroke={theme.canvas}
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* Play symbol inset */}
              <polygon
                points="29,29 39,34 29,39"
                fill="#FFFFFF"
                className="drop-shadow"
              />
              <defs>
                <linearGradient id="emerald_leaf" x1="12" y1="6" x2="52" y2="58" gradientUnits="userSpaceOnUse">
                  <stop stopColor={theme.primary} />
                  <stop offset="1" stopColor={theme.secondary} />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Liquid Glass Highlight ring */}
          <div className="absolute -inset-1 rounded-[28px] border border-white/20 pointer-events-none" />
        </div>

        <h1
          className="text-3xl font-extrabold tracking-tight"
          style={{ color: theme.textPrimary }}
        >
          PeTaNi<span style={{ color: theme.primary }}>Flix</span>
        </h1>
        <p className="text-xs tracking-[0.25em] uppercase text-slate-400 mt-2 font-medium">
          STREAM CINEMA TANPA BATAS
        </p>

        {/* Loading shimmer indicator */}
        <div className="mt-8 flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full animate-bounce"
            style={{ backgroundColor: theme.primary }}
          />
          <div
            className="w-2 h-2 rounded-full animate-bounce [animation-delay:0.2s]"
            style={{ backgroundColor: theme.primaryLight }}
          />
          <div
            className="w-2 h-2 rounded-full animate-bounce [animation-delay:0.4s]"
            style={{ backgroundColor: theme.secondary }}
          />
        </div>
      </div>

      {/* Footer Info & Manual Skip */}
      <div className="w-full flex flex-col items-center gap-3">
        <button
          onClick={() => onNavigate('onboarding')}
          className="text-xs font-medium text-slate-400 hover:text-white px-4 py-1.5 rounded-full border border-white/10 transition-colors"
        >
          Masuk Sekarang &rarr;
        </button>
        <span className="text-[10px] text-slate-500">
          v2.4.0 • Licensed Cinema Hub • DRM Protected
        </span>
      </div>
    </div>
  );
};
