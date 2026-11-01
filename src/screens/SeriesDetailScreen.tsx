import React, { useState } from 'react';
import { ScreenId, ThemeTokens, MediaItem, Episode } from '../types';
import { ArrowLeft, Play, ChevronDown, Check, Plus, Star, ShieldCheck } from 'lucide-react';

interface SeriesDetailScreenProps {
  series: MediaItem;
  onNavigate: (screen: ScreenId) => void;
  onPlayEpisode: (series: MediaItem, episode: Episode) => void;
  watchlistIds: string[];
  onToggleWatchlist: (mediaId: string) => void;
  theme: ThemeTokens;
  lowRamMode: boolean;
}

export const SeriesDetailScreen: React.FC<SeriesDetailScreenProps> = ({
  series,
  onNavigate,
  onPlayEpisode,
  watchlistIds,
  onToggleWatchlist,
  theme,
  lowRamMode,
}) => {
  const [selectedSeason, setSelectedSeason] = useState(2);
  const [isSeasonPickerOpen, setIsSeasonPickerOpen] = useState(false);

  const isInWatchlist = watchlistIds.includes(series.id);
  const episodes = series.episodes || [];

  return (
    <div
      className="relative w-full h-full pb-24 overflow-y-auto select-none no-scrollbar"
      style={{ backgroundColor: theme.canvas }}
    >
      {/* Top Floating Controls */}
      <div className="absolute top-3 inset-x-4 z-30 flex items-center justify-between">
        <button
          onClick={() => onNavigate('home')}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-black/80 transition-colors shadow-lg"
          aria-label="Kembali"
        >
          <ArrowLeft size={18} />
        </button>

        <button
          onClick={() => onToggleWatchlist(series.id)}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-black/60 backdrop-blur-md border border-white/20 transition-colors shadow-lg"
          style={{
            color: isInWatchlist ? theme.primary : '#FFFFFF',
            borderColor: isInWatchlist ? theme.primary : 'rgba(255,255,255,0.2)',
          }}
          aria-label={isInWatchlist ? 'Hapus dari Watchlist' : 'Tambah ke Watchlist'}
        >
          {isInWatchlist ? <Check size={18} /> : <Plus size={18} />}
        </button>
      </div>

      {/* Series Backdrop */}
      <div className="relative w-full aspect-video max-h-[300px] overflow-hidden">
        <img
          src={series.backdropUrl}
          alt={series.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080C0A] via-transparent to-black/50" />
      </div>

      {/* Series Metadata */}
      <div className="px-4 -mt-8 relative z-10">
        <div className="flex gap-3.5 items-start">
          <div className="w-24 shrink-0 aspect-[2/3] rounded-xl overflow-hidden border-2 border-white/20 shadow-2xl bg-[#0F1713]">
            <img
              src={series.posterUrl}
              alt={series.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 pt-8">
            <h1 className="text-xl font-black tracking-tight text-white leading-snug">
              {series.title}
            </h1>
            <div className="flex items-center gap-2 text-xs text-slate-300 mt-1 font-medium">
              <span className="flex items-center gap-0.5 text-amber-400 font-bold">
                <Star size={12} className="fill-amber-400" /> {series.ratingImdb}
              </span>
              <span>•</span>
              <span>{series.releaseYear}</span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">{series.seasonsCount} Musim</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/10 text-emerald-300 border border-emerald-500/30">
                {series.badge || 'Dolby Vision'}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-white/5 text-slate-300 border border-white/10">
                {series.contentRating || 'TV-MA'}
              </span>
            </div>
          </div>
        </div>

        {/* Primary Play Button for Episode 1 */}
        {episodes.length > 0 && (
          <button
            onClick={() => onPlayEpisode(series, episodes[0])}
            className="w-full mt-5 py-3.5 rounded-2xl font-bold text-sm text-black flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-xl"
            style={{
              backgroundImage: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
              boxShadow: `0 8px 24px ${theme.primaryGlow}`,
            }}
          >
            <Play size={18} className="fill-black" />
            <span>LANJUTKAN: EPS 2 "REFRAKSI DATA"</span>
          </button>
        )}

        {/* Synopsis */}
        <p className="text-xs text-slate-300 leading-relaxed mt-4">
          {series.synopsis}
        </p>

        {/* Season Selector Dropdown */}
        <div className="mt-6 flex items-center justify-between border-b border-white/10 pb-3">
          <button
            onClick={() => setIsSeasonPickerOpen(true)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-bold text-white transition-all ${
              lowRamMode ? 'bg-[#0F1713]' : 'bg-white/10 backdrop-blur-md'
            }`}
            style={{ borderColor: theme.borderGlass }}
          >
            <span>Musim {selectedSeason} (Terbaru)</span>
            <ChevronDown size={14} />
          </button>

          <span className="text-xs text-slate-400 font-medium">
            {episodes.length} Episode Tersedia
          </span>
        </div>

        {/* Episode Cards List */}
        <div className="mt-4 flex flex-col gap-3.5">
          {episodes.map((ep) => (
            <div
              key={ep.id}
              onClick={() => onPlayEpisode(series, ep)}
              className="p-3 rounded-2xl border border-white/10 bg-[#0F1713] hover:border-white/20 transition-all cursor-pointer group flex flex-col gap-2.5"
            >
              <div className="flex gap-3">
                {/* Episode Thumbnail 16:9 */}
                <div className="relative w-32 shrink-0 aspect-video rounded-xl overflow-hidden bg-black/40">
                  <img
                    src={ep.thumbnailUrl}
                    alt={ep.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-80 group-hover:opacity-100">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: theme.primary }}
                    >
                      <Play size={14} className="fill-black text-black ml-0.5" />
                    </div>
                  </div>
                  {/* Progress bar */}
                  {ep.progressPercent !== undefined && ep.progressPercent > 0 && (
                    <div className="absolute bottom-0 inset-x-0 h-1 bg-black/60">
                      <div
                        className="h-full"
                        style={{
                          width: `${ep.progressPercent}%`,
                          backgroundColor: theme.primary,
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Episode Meta */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xs font-bold text-white truncate">
                      {ep.title}
                    </h3>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                    {ep.durationMinutes} menit
                  </span>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-snug">
                    {ep.synopsis}
                  </p>
                </div>
              </div>

              {/* Status pill */}
              <div className="flex items-center justify-between text-[10px] pt-1 border-t border-white/5">
                <span className="text-slate-400">Audio 5.1 Surround • Subtitle ID</span>
                {ep.progressPercent === 100 ? (
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <Check size={12} /> Tuntas Ditonton
                  </span>
                ) : ep.progressPercent ? (
                  <span className="text-amber-400 font-semibold">
                    {ep.progressPercent}% Ditonton
                  </span>
                ) : (
                  <span className="text-slate-500">Belum Dilihat</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* License */}
        <div className="mt-8 p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-2.5 text-[10px] text-slate-400">
          <ShieldCheck size={18} className="text-emerald-400 shrink-0" />
          <span>
            Hak siar streaming episode resmi PeTaNiFlix Global. Terenkripsi perlindungan DRM Google Widevine L1.
          </span>
        </div>
      </div>

      {/* Season Selector Modal Sheet */}
      {isSeasonPickerOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm p-0 animate-in fade-in duration-200">
          <div
            className="w-full max-w-md rounded-t-[32px] p-5 border-t border-x border-white/20 shadow-2xl relative"
            style={{
              backgroundColor: lowRamMode ? '#0F1713' : 'rgba(15, 23, 19, 0.95)',
            }}
          >
            <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-4" />
            <h3 className="text-base font-bold text-white mb-3">Pilih Musim Serial</h3>

            <div className="flex flex-col gap-2">
              {[1, 2].map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setSelectedSeason(s);
                    setIsSeasonPickerOpen(false);
                  }}
                  className={`p-3.5 rounded-xl border text-left flex items-center justify-between text-xs font-semibold transition-all ${
                    selectedSeason === s
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                      : 'border-white/10 text-slate-300'
                  }`}
                >
                  <span>Musim {s} {s === 2 ? '(Terbaru • 2024)' : '(2022)'}</span>
                  {selectedSeason === s && <Check size={16} />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
