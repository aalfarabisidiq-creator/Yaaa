import React from 'react';
import { Wifi, Signal, Battery } from 'lucide-react';
import { ThemeTokens } from '../types';

interface DeviceFrameProps {
  children: React.ReactNode;
  theme: ThemeTokens;
  isLandscape: boolean;
  onToggleOrientation: () => void;
  lowRamMode: boolean;
  dynamicPill?: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  children,
  theme,
  isLandscape,
  lowRamMode,
  dynamicPill,
}) => {
  return (
    <div className="relative flex flex-col items-center justify-center p-2 md:p-6 transition-all duration-500">
      {/* Outer Phone Mockup Chassis */}
      <div
        className={`relative transition-all duration-500 rounded-[48px] p-3 shadow-2xl border-4 ${
          isLandscape
            ? 'w-[780px] h-[400px] max-w-[95vw]'
            : 'w-[375px] h-[780px] max-w-[95vw] max-h-[92vh]'
        }`}
        style={{
          backgroundColor: '#050706',
          borderColor: '#1E2922',
          boxShadow: `0 25px 60px -15px rgba(0,0,0,0.9), 0 0 35px ${theme.primaryGlow}`,
        }}
      >
        {/* Specular Edge Highlight */}
        <div className="absolute inset-1 rounded-[44px] border border-white/10 pointer-events-none" />

        {/* Screen Display Container */}
        <div className="relative w-full h-full rounded-[40px] overflow-hidden bg-black flex flex-col">
          {/* Status Bar */}
          {!isLandscape && (
            <div
              className={`h-8 px-5 pt-1 flex items-center justify-between z-50 select-none text-[11px] font-semibold text-slate-300 transition-colors ${
                lowRamMode ? 'bg-[#080C0A]' : 'bg-[#080C0A]/95 backdrop-blur-sm'
              }`}
            >
              <span>16:00</span>

              {/* Center Dynamic Island Pill */}
              <div className="flex items-center justify-center">
                {dynamicPill ? (
                  dynamicPill
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full bg-black border border-white/10 shadow-inner flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                  </div>
                )}
              </div>

              {/* Battery, Wifi, 5G Icons */}
              <div className="flex items-center gap-1.5 text-slate-300">
                <Signal size={11} />
                <Wifi size={11} />
                <Battery size={13} className="text-emerald-400" />
              </div>
            </div>
          )}

          {/* Actual Screen View Body */}
          <div className="relative flex-1 w-full h-full overflow-hidden">
            {children}
          </div>

          {/* Android Bottom Home Gesture Indicator */}
          {!isLandscape && (
            <div className="absolute bottom-1.5 inset-x-0 h-4 flex items-center justify-center pointer-events-none z-50">
              <div className="w-32 h-1 rounded-full bg-white/30" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
