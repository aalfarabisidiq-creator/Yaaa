import React from 'react';
import { ScreenId, VisualDirection, ThemeTokens } from '../types';
import {
  Palette,
  Smartphone,
  Cpu,
  Code2,
  Sparkles,
  Layers,
  RotateCw,
} from 'lucide-react';

interface StudioHeaderProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  visualDirection: VisualDirection;
  onChangeDirection: (dir: VisualDirection) => void;
  lowRamMode: boolean;
  onToggleLowRamMode: () => void;
  isLandscape: boolean;
  onToggleOrientation: () => void;
  onOpenArchitecture: () => void;
  onOpenAI: () => void;
  theme: ThemeTokens;
}

export const StudioHeader: React.FC<StudioHeaderProps> = ({
  currentScreen,
  onNavigate,
  visualDirection,
  onChangeDirection,
  lowRamMode,
  onToggleLowRamMode,
  isLandscape,
  onToggleOrientation,
  onOpenArchitecture,
  onOpenAI,
  theme,
}) => {
  const allScreens: { id: ScreenId; name: string }[] = [
    { id: 'splash', name: '1. Splash Screen' },
    { id: 'onboarding', name: '2. Onboarding (3 Slides)' },
    { id: 'login', name: '3. Login (Wajib Login)' },
    { id: 'register', name: '4. Register Akun' },
    { id: 'forgot-password', name: '5. Forgot Password (OTP)' },
    { id: 'home', name: '6. Home (Hero & Trending)' },
    { id: 'search', name: '7. Search (Live Debounce)' },
    { id: 'explore', name: '8. Explore (Katalog & Filter)' },
    { id: 'movie-detail', name: '9. Movie Detail (Backdrop 16:9)' },
    { id: 'series-detail', name: '10. Series Detail (Season & Eps)' },
    { id: 'video-player', name: '11. Video Player (Fullscreen Controls)' },
    { id: 'watchlist', name: '12. Watchlist (Grid/List & Undo)' },
    { id: 'history', name: '13. History (Riwayat Tontonan)' },
    { id: 'notifications', name: '14. Notifications' },
    { id: 'profile', name: '15. Profile & Storage VIP' },
    { id: 'settings', name: '16. Settings (RAM 4GB & HW)' },
    { id: 'empty-state', name: '17. Empty States (Search/Watchlist)' },
    { id: 'error-state', name: '18. Error States (DRM / 500)' },
  ];

  return (
    <header className="w-full bg-[#070A08] border-b border-white/10 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs select-none sticky top-0 z-50">
      {/* Brand & Mode Tag */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-black text-xs shadow-md"
            style={{ backgroundColor: theme.primary }}
          >
            P
          </div>
          <div>
            <span className="font-extrabold text-sm text-white tracking-tight">
              PeTaNi<span style={{ color: theme.primary }}>Flix</span>
            </span>
            <span className="text-[10px] text-slate-400 block -mt-0.5">
              Flutter UI/UX Mobile Studio
            </span>
          </div>
        </div>

        {/* 3 Visual Alternatives Switcher */}
        <div className="hidden lg:flex items-center gap-1 bg-white/[0.04] p-1 rounded-xl border border-white/10 ml-2">
          <span className="text-[10px] text-slate-400 font-bold px-1.5 flex items-center gap-1">
            <Palette size={11} /> Arah Visual:
          </span>
          {[
            { id: 'emerald', label: '1. Emerald Cyber', color: '#00E676' },
            { id: 'cyan', label: '2. Cyan Biolum', color: '#00F0FF' },
            { id: 'amethyst', label: '3. Amethyst Velvet', color: '#A855F7' },
          ].map((dir) => (
            <button
              key={dir.id}
              onClick={() => onChangeDirection(dir.id as VisualDirection)}
              className={`px-2 py-1 rounded-lg text-[11px] font-medium flex items-center gap-1.5 transition-all ${
                visualDirection === dir.id
                  ? 'bg-white/15 text-white font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: dir.color }}
              />
              <span>{dir.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Screen Quick-Jump Dropdown */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 bg-white/[0.05] border border-white/15 rounded-xl px-2.5 py-1">
          <Layers size={13} className="text-emerald-400" />
          <span className="text-[11px] text-slate-300 font-medium">Layar:</span>
          <select
            value={currentScreen}
            onChange={(e) => onNavigate(e.target.value as ScreenId)}
            className="bg-transparent text-white text-xs font-semibold focus:outline-none cursor-pointer"
          >
            {allScreens.map((s) => (
              <option key={s.id} value={s.id} className="bg-[#0C120F] text-white">
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Low-RAM 4GB Performance Toggle Button */}
        <button
          onClick={onToggleLowRamMode}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
            lowRamMode
              ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
              : 'bg-white/[0.04] border-white/10 text-slate-300 hover:text-white'
          }`}
          title="Mode Performa RAM 4GB (Mematikan blur berat untuk efisiensi CPU/GPU)"
        >
          <Cpu size={14} className={lowRamMode ? 'text-amber-400' : 'text-slate-400'} />
          <span className="hidden sm:inline">
            {lowRamMode ? 'Mode RAM 4GB: AKTIF' : 'RAM 4GB Mode'}
          </span>
        </button>

        {/* Orientation Toggle */}
        <button
          onClick={onToggleOrientation}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 hover:text-white transition-colors"
          title="Putar Orientasi Ponsel (Landscape / Portrait)"
        >
          <Smartphone size={14} />
          <span className="hidden sm:inline">{isLandscape ? 'Landscape' : 'Portrait'}</span>
        </button>

        {/* Architecture & Flutter Code Modal Button */}
        <button
          onClick={onOpenArchitecture}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 font-semibold transition-all"
        >
          <Code2 size={14} />
          <span className="hidden md:inline">Kode Flutter & PostgreSQL</span>
        </button>

        {/* Gemini AI Cinephile Button */}
        <button
          onClick={onOpenAI}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-black font-bold shadow-md hover:scale-105 active:scale-95 transition-all"
          style={{
            backgroundImage: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
          }}
        >
          <Sparkles size={14} />
          <span>PeTaNi AI</span>
        </button>
      </div>
    </header>
  );
};
