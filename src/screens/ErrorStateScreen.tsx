import React, { useState } from 'react';
import { ScreenId, ThemeTokens } from '../types';
import { ArrowLeft, AlertOctagon, WifiOff, RotateCcw, Download, ShieldAlert } from 'lucide-react';

interface ErrorStateScreenProps {
  onNavigate: (screen: ScreenId) => void;
  theme: ThemeTokens;
  lowRamMode: boolean;
}

export const ErrorStateScreen: React.FC<ErrorStateScreenProps> = ({
  onNavigate,
  theme,
  lowRamMode,
}) => {
  const [errorType, setErrorType] = useState<'drm' | 'network'>('drm');
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      setIsRetrying(false);
      onNavigate('home');
    }, 800);
  };

  return (
    <div
      className="relative w-full h-full pb-24 overflow-y-auto select-none no-scrollbar p-4"
      style={{ backgroundColor: theme.canvas }}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between pt-1 pb-3">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigate('home')}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white"
            aria-label="Kembali"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              Pratinjau Status Error
            </h1>
            <span className="text-[11px] text-slate-400">
              Penanganan Kegagalan Stream & Jaringan
            </span>
          </div>
        </div>
      </div>

      {/* Switcher Tabs */}
      <div className="flex gap-2 mb-6 bg-white/[0.04] p-1 rounded-xl border border-white/10">
        {[
          { id: 'drm', label: 'DRM Playback Failed' },
          { id: 'network', label: 'Server 500 / No Network' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setErrorType(t.id as any)}
            className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
              errorType === t.id
                ? 'text-black font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
            style={{
              backgroundColor: errorType === t.id ? theme.primary : 'transparent',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Error Card */}
      <div
        className={`p-6 rounded-3xl border text-center flex flex-col items-center justify-center my-6 shadow-xl ${
          lowRamMode ? 'bg-[#0F1713]' : 'bg-[#0F1713]/80 backdrop-blur-md'
        }`}
        style={{ borderColor: theme.borderGlass }}
      >
        {errorType === 'drm' ? (
          <>
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center border border-red-500/30 bg-red-500/10 text-red-400 shadow-xl mb-4">
              <ShieldAlert size={38} />
            </div>

            <h2 className="text-lg font-bold text-white mb-1.5">
              Koneksi Pemutaran Terputus
            </h2>
            <div className="px-2.5 py-1 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-[10px] mb-3">
              KODE: DRM_KEY_FETCH_TIMEOUT (Widevine L1)
            </div>

            <p className="text-xs text-slate-400 max-w-xs mb-6 leading-relaxed">
              Gagal mendekripsi kunci aliran video terenkripsi HLS. Periksa koneksi internet atau gunakan berkas unduhan offline Anda.
            </p>

            <div className="flex flex-col gap-2.5 w-full max-w-xs">
              <button
                onClick={handleRetry}
                disabled={isRetrying}
                className="w-full py-3.5 rounded-2xl font-bold text-xs text-black flex items-center justify-center gap-2 shadow-lg"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                }}
              >
                {isRetrying ? (
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <RotateCcw size={15} />
                    <span>COBA PUTAR ULANG</span>
                  </>
                )}
              </button>

              <button
                onClick={() => onNavigate('profile')}
                className="w-full py-3 rounded-2xl border border-white/10 bg-white/[0.04] text-xs font-semibold text-slate-300 hover:text-white flex items-center justify-center gap-2"
              >
                <Download size={14} />
                <span>Buka Hasil Unduhan Offline</span>
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center border border-amber-500/30 bg-amber-500/10 text-amber-400 shadow-xl mb-4">
              <WifiOff size={38} />
            </div>

            <h2 className="text-lg font-bold text-white mb-1.5">
              Jaringan Tidak Terhubung
            </h2>
            <div className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-[10px] mb-3">
              STATUS: HTTP_500_GATEWAY_TIMEOUT
            </div>

            <p className="text-xs text-slate-400 max-w-xs mb-6 leading-relaxed">
              Server API Node.js PeTaNiFlix tidak dapat dijangkau. Kami sedang melakukan pemeliharaan database rutin demi keandalan siaran.
            </p>

            <button
              onClick={handleRetry}
              disabled={isRetrying}
              className="w-full max-w-xs py-3.5 rounded-2xl font-bold text-xs text-black flex items-center justify-center gap-2 shadow-lg"
              style={{
                backgroundImage: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
              }}
            >
              {isRetrying ? (
                <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <RotateCcw size={15} />
                  <span>MUAT ULANG APLIKASI</span>
                </>
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
};
