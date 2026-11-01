import React, { useState } from 'react';
import { ScreenId, ThemeTokens, HistoryItem, MediaItem } from '../types';
import { Play, Trash2, RotateCcw, Clock, AlertTriangle, ArrowLeft } from 'lucide-react';

interface HistoryScreenProps {
  historyList: HistoryItem[];
  onNavigate: (screen: ScreenId) => void;
  onPlayMedia: (media: MediaItem, resumeSeconds?: number) => void;
  onClearHistory: () => void;
  theme: ThemeTokens;
  lowRamMode: boolean;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({
  historyList,
  onNavigate,
  onPlayMedia,
  onClearHistory,
  theme,
  lowRamMode,
}) => {
  const [isConfirmClearOpen, setIsConfirmClearOpen] = useState(false);

  // Group by date
  const todayItems = historyList.filter((item) => item.watchedDate === 'Hari Ini');
  const yesterdayItems = historyList.filter((item) => item.watchedDate === 'Kemarin');

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
            aria-label="Kembali ke Beranda"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              Riwayat Tontonan
            </h1>
            <span className="text-[11px] text-slate-400">
              Sinkronisasi Cloud Aktif
            </span>
          </div>
        </div>

        {historyList.length > 0 && (
          <button
            onClick={() => setIsConfirmClearOpen(true)}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-red-400 transition-colors p-1"
          >
            <Trash2 size={14} />
            <span>Bersihkan</span>
          </button>
        )}
      </div>

      {historyList.length > 0 ? (
        <div className="flex flex-col gap-5 mt-2">
          {/* Today */}
          {todayItems.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5">
                <Clock size={13} style={{ color: theme.primary }} /> Hari Ini
              </div>
              <div className="flex flex-col gap-3">
                {todayItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-2.5 rounded-2xl border border-white/10 bg-[#0F1713] flex flex-col gap-2 group hover:border-white/20 transition-all"
                  >
                    <div className="flex gap-3">
                      {/* 16:9 Thumbnail */}
                      <div className="relative w-32 shrink-0 aspect-video rounded-xl overflow-hidden bg-black/50">
                        <img
                          src={item.media.backdropUrl}
                          alt={item.media.title}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => onPlayMedia(item.media, item.progressSeconds)}
                          className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-85 group-hover:opacity-100 transition-opacity"
                          aria-label={`Lanjutkan putar ${item.media.title}`}
                        >
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
                            style={{ backgroundColor: theme.primary }}
                          >
                            <Play size={14} className="fill-black text-black ml-0.5" />
                          </div>
                        </button>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <h3 className="text-xs font-bold text-white truncate">
                            {item.media.title}
                          </h3>
                          <p className="text-[10px] text-slate-400 truncate mt-0.5">
                            {item.episode ? item.episode.title : 'Film Utama (4K)'}
                          </p>
                        </div>

                        <div className="text-[10px] text-emerald-400 font-mono">
                          Tersisa {Math.round((item.totalSeconds - item.progressSeconds) / 60)} menit
                        </div>
                      </div>
                    </div>

                    {/* Progress Slider Bar */}
                    <div className="w-full bg-black/60 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${item.progressPercent}%`,
                          backgroundColor: theme.primary,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Yesterday */}
          {yesterdayItems.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5">
                <Clock size={13} className="text-slate-400" /> Kemarin
              </div>
              <div className="flex flex-col gap-3">
                {yesterdayItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-2.5 rounded-2xl border border-white/10 bg-[#0F1713] flex flex-col gap-2 group hover:border-white/20 transition-all"
                  >
                    <div className="flex gap-3">
                      <div className="relative w-32 shrink-0 aspect-video rounded-xl overflow-hidden bg-black/50">
                        <img
                          src={item.media.backdropUrl}
                          alt={item.media.title}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => onPlayMedia(item.media, item.progressSeconds)}
                          className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-85 group-hover:opacity-100"
                          aria-label={`Lanjutkan putar ${item.media.title}`}
                        >
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
                            style={{ backgroundColor: theme.primary }}
                          >
                            <Play size={14} className="fill-black text-black ml-0.5" />
                          </div>
                        </button>
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <h3 className="text-xs font-bold text-white truncate">
                            {item.media.title}
                          </h3>
                          <p className="text-[10px] text-slate-400 truncate mt-0.5">
                            Film Utama (4K HDR)
                          </p>
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {item.progressPercent}% selesai ditonton
                        </div>
                      </div>
                    </div>

                    <div className="w-full bg-black/60 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${item.progressPercent}%`,
                          backgroundColor: theme.primary,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="py-20 flex flex-col items-center text-center">
          <Clock size={36} className="text-slate-600 mb-3" />
          <h2 className="text-sm font-bold text-white mb-1">
            Riwayat Masih Kosong
          </h2>
          <p className="text-xs text-slate-400 max-w-xs mb-4">
            Film dan episode yang Anda tonton akan tersimpan secara otomatis di sini.
          </p>
          <button
            onClick={() => onNavigate('home')}
            className="px-4 py-2 rounded-xl text-xs font-bold text-black"
            style={{
              backgroundImage: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
            }}
          >
            Mulai Menonton
          </button>
        </div>
      )}

      {/* Clear Confirmation Modal */}
      {isConfirmClearOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-3xl p-5 border border-white/15 bg-[#0F1713] shadow-2xl text-center">
            <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mx-auto mb-3">
              <AlertTriangle size={24} />
            </div>
            <h3 className="text-sm font-bold text-white mb-1">
              Bersihkan Semua Riwayat?
            </h3>
            <p className="text-xs text-slate-400 mb-5">
              Tindakan ini akan menghapus daftar tontonan terakhir dari profil Anda secara permanen.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setIsConfirmClearOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-slate-300"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  onClearHistory();
                  setIsConfirmClearOpen(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-bold text-xs hover:bg-red-600 transition-colors"
              >
                Ya, Bersihkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
