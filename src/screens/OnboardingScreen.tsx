import React, { useState } from 'react';
import { ScreenId, ThemeTokens } from '../types';
import { Film, Zap, Tv, ArrowRight } from 'lucide-react';

interface OnboardingScreenProps {
  onNavigate: (screen: ScreenId) => void;
  theme: ThemeTokens;
  lowRamMode: boolean;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  onNavigate,
  theme,
  lowRamMode,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Koleksi Sinematik 4K',
      subtitle: 'Akses ribuan judul film & serial berlisensi resmi dengan kualitas audio Dolby Atmos.',
      icon: Film,
      badge: 'RESMI & BERLISENSI',
      visualPreview: (
        <div className="relative w-full h-44 flex items-center justify-center">
          <div
            className="absolute left-4 w-28 h-36 rounded-xl bg-cover bg-center -rotate-6 shadow-xl border border-white/10 opacity-70"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=300&q=80)',
            }}
          />
          <div
            className="absolute right-4 w-28 h-36 rounded-xl bg-cover bg-center rotate-6 shadow-xl border border-white/10 opacity-70"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=300&q=80)',
            }}
          />
          <div
            className="relative z-10 w-32 h-40 rounded-2xl bg-cover bg-center shadow-2xl border-2 transition-transform duration-300 hover:scale-105"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80)',
              borderColor: theme.primary,
              boxShadow: `0 12px 30px ${theme.primaryGlow}`,
            }}
          >
            <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-bold bg-black/70 text-emerald-300 border border-emerald-500/30">
              4K HDR
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Ultra HD Hemat Kuota',
      subtitle: 'Teknologi kompresi AV1 cerdas menghasilkan gambar kristal dengan penghematan data hingga 50%.',
      icon: Zap,
      badge: 'ADAPTIVE HLS',
      visualPreview: (
        <div className="relative w-full h-44 flex flex-col items-center justify-center px-4">
          <div
            className={`w-full max-w-xs p-4 rounded-2xl border shadow-xl flex flex-col gap-2.5 ${
              lowRamMode ? 'bg-[#121D17]' : 'backdrop-blur-md bg-white/5'
            }`}
            style={{ borderColor: theme.borderAccent }}
          >
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                <Zap size={14} style={{ color: theme.primary }} /> Kompresi AV1 Hardware
              </span>
              <span className="text-[10px] font-mono text-emerald-400">60 FPS</span>
            </div>
            {/* Progress / buffer simulation */}
            <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: '82%',
                  backgroundColor: theme.primary,
                }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Resolusi: 2160p (4K)</span>
              <span className="text-emerald-400 font-medium">Hemat 1.8 GB</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Sinkronisasi Multi-Device',
      subtitle: 'Tonton di ponsel pintar, lanjutkan di tablet atau Smart TV tanpa kehilangan detik tontonan.',
      icon: Tv,
      badge: 'CLOUD SYNC',
      visualPreview: (
        <div className="relative w-full h-44 flex items-center justify-center gap-3">
          <div
            className="w-36 h-24 rounded-xl border border-white/10 bg-black/60 p-2 flex flex-col justify-between shadow-lg"
          >
            <div className="flex justify-between items-center text-[9px] text-slate-400">
              <span>Smart TV</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
            <div className="text-[11px] font-semibold text-slate-200">The Creator</div>
            <div className="text-[9px] text-emerald-400 font-mono">01:14:20 (Sync)</div>
          </div>
          <div
            className="w-20 h-32 rounded-2xl border-2 p-1.5 flex flex-col justify-between shadow-2xl -ml-4 z-10 bg-[#0F1713]"
            style={{ borderColor: theme.primary }}
          >
            <div className="w-full h-1 bg-white/20 rounded-full mx-auto" />
            <div className="text-[8px] text-center font-bold text-emerald-300">Android Mobile</div>
            <div className="w-full h-1 bg-emerald-500 rounded-full" />
          </div>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onNavigate('login');
    }
  };

  const current = slides[currentSlide];

  return (
    <div
      className="relative w-full h-full flex flex-col justify-between p-6 select-none overflow-hidden"
      style={{ backgroundColor: theme.canvas }}
    >
      {/* Top Header */}
      <div className="w-full flex justify-between items-center pt-2">
        <span
          className="text-xs font-bold tracking-wider"
          style={{ color: theme.primary }}
        >
          {current.badge}
        </span>
        <button
          onClick={() => onNavigate('login')}
          className="text-xs text-slate-400 hover:text-white px-2 py-1 transition-colors"
        >
          Lewati
        </button>
      </div>

      {/* Middle Carousel Content */}
      <div className="flex flex-col items-center text-center my-auto">
        {/* Visual Graphic */}
        <div className="w-full mb-6">{current.visualPreview}</div>

        {/* Title & Subtitle */}
        <h2
          className="text-2xl font-bold tracking-tight mb-3"
          style={{ color: theme.textPrimary }}
        >
          {current.title}
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
          {current.subtitle}
        </p>

        {/* Carousel Indicators */}
        <div className="flex items-center gap-2 mt-6">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'w-6' : 'w-2 bg-white/20'
              }`}
              style={{
                backgroundColor: idx === currentSlide ? theme.primary : undefined,
              }}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Action Area */}
      <div className="w-full flex flex-col gap-3 pb-4">
        <button
          onClick={handleNext}
          className="w-full py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 text-black transition-all duration-200 active:scale-[0.98] shadow-lg"
          style={{
            backgroundImage: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
            boxShadow: `0 8px 24px ${theme.primaryGlow}`,
          }}
        >
          <span>{currentSlide === slides.length - 1 ? 'Mulai Sekarang' : 'Lanjutkan'}</span>
          <ArrowRight size={16} />
        </button>

        <div className="flex justify-center items-center gap-1 text-xs text-slate-400">
          <span>Sudah memiliki akun?</span>
          <button
            onClick={() => onNavigate('login')}
            className="font-semibold hover:underline"
            style={{ color: theme.primary }}
          >
            Masuk
          </button>
        </div>
      </div>
    </div>
  );
};
