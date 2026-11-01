import React from 'react';
import { Home, Compass, Search, Bookmark, User } from 'lucide-react';
import { ScreenId, ThemeTokens } from '../types';

interface NavigationDockProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  theme: ThemeTokens;
  lowRamMode: boolean;
}

export const NavigationDock: React.FC<NavigationDockProps> = ({
  currentScreen,
  onNavigate,
  theme,
  lowRamMode,
}) => {
  const navTabs = [
    { id: 'home' as ScreenId, label: 'Home', icon: Home },
    { id: 'explore' as ScreenId, label: 'Explore', icon: Compass },
    { id: 'search' as ScreenId, label: 'Search', icon: Search },
    { id: 'watchlist' as ScreenId, label: 'Watchlist', icon: Bookmark },
    { id: 'profile' as ScreenId, label: 'Profile', icon: User },
  ];

  return (
    <nav
      aria-label="Bottom Navigation Dock"
      className="absolute bottom-5 left-4 right-4 z-40"
    >
      <div
        className={`relative h-16 rounded-[32px] px-3 flex items-center justify-around border transition-all duration-300 shadow-2xl ${
          lowRamMode
            ? 'border-white/10'
            : 'backdrop-blur-xl border-white/15'
        }`}
        style={{
          backgroundColor: lowRamMode ? theme.surfaceGlassFallback : theme.surfaceGlass,
          borderColor: theme.borderGlass,
          boxShadow: `0 12px 32px rgba(0, 0, 0, 0.6), 0 0 20px ${theme.primaryGlow}`,
        }}
      >
        {/* Specular top glass highlight */}
        <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentScreen === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className="relative flex flex-col items-center justify-center w-12 h-12 rounded-2xl group transition-all duration-200"
              aria-label={`Buka layar ${tab.label}`}
            >
              {/* Active ambient glow aura */}
              {isActive && (
                <div
                  className="absolute inset-0 rounded-2xl opacity-20 blur-sm scale-110"
                  style={{ backgroundColor: theme.primary }}
                />
              )}

              <div
                className={`transition-all duration-200 ${
                  isActive ? 'scale-110 -translate-y-0.5' : 'group-hover:scale-105'
                }`}
              >
                <Icon
                  size={20}
                  style={{
                    color: isActive ? theme.primary : theme.textSecondary,
                  }}
                  strokeWidth={isActive ? 2.4 : 1.8}
                />
              </div>

              <span
                className={`text-[9px] mt-0.5 font-medium transition-colors ${
                  isActive ? 'font-semibold' : 'opacity-80'
                }`}
                style={{
                  color: isActive ? theme.textPrimary : theme.textSecondary,
                }}
              >
                {tab.label}
              </span>

              {/* Active Neon Dot Indicator */}
              {isActive && (
                <div
                  className="w-1.5 h-1.5 rounded-full mt-0.5 shadow-sm transition-all"
                  style={{
                    backgroundColor: theme.primary,
                    boxShadow: `0 0 8px ${theme.primary}`,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
