import React, { useState } from 'react';
import { ScreenId, ThemeTokens, MediaItem } from '../types';
import { formatTimeMinutes } from '../utils/formatters';
import { ArrowLeft, Play, Plus, Check, Download, Share2, Star, Volume2, VolumeX, ShieldCheck } from 'lucide-react';

interface MovieDetailScreenProps {
  media: MediaItem;
  onNavigate: (screen: ScreenId) => void;
  onSelectMedia: (media: MediaItem) => void;
  onPlayMedia: (media: MediaItem, resumeSeconds?: number) => void;
  watchlistIds: string[];
  onToggleWatchlist: (mediaId: string) => void;
  mediaList: MediaItem[];
  theme: ThemeTokens;
  lowRamMode: boolean;
}

export const MovieDetailScreen: React.FC<MovieDetailScreenProps> = ({
  media,
  onNavigate,
  onSelectMedia,
  onPlayMedia,
  watchlistIds,
  onToggleWatchlist,
  mediaList,
  theme,
  lowRamMode,
}) => {
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const isInWatchlist = watchlistIds.includes(media.id);
  const relatedTitles = mediaList.filter((m) => m.id !== media.id).slice(0, 4);

  const handleDownload = () => {
    if (isDownloaded) return;
    setDownloadProgress(20);
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDownloaded(true);
          return 100;
        }
        return prev + 25;
      });
    }, 300);
  };

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

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: media.title, text: media.synopsis, url: window.location.href });
              } else {
                alert(`Tautan film "${media.title}" disalin ke clipboard!`);
              }
            }}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-black/80 transition-colors shadow-lg"
            aria-label="Bagikan film"
          >
            <Share2 size={16} />
          </button>

          <button
            onClick={() => onToggleWatchlist(media.id)}
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
      </div>

      {/* HERO BACKDROP (16:9 with Preview Trailer Toggle) */}
      <div className="relative w-full aspect-video max-h-[300px] overflow-hidden">
        {isPlayingPreview ? (
          <div className="relative w-full h-full bg-black">
            <video
              src={media.trailerUrl}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="absolute bottom-3 right-3 p-1.5 rounded-full bg-black/70 text-white text-xs backdrop-blur-sm"
              aria-label="Toggle suara preview"
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
          </div>
        ) : (
          <img
            src={media.backdropUrl}
            alt={media.title}
            className="w-full h-full object-cover"
          />
        )}

        {/* Ambient Gradient Masks */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080C0A] via-transparent to-black/50" />

        {/* Trailer play trigger badge */}
        {!isPlayingPreview && (
          <button
            onClick={() => setIsPlayingPreview(true)}
            className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-xs font-medium flex items-center gap-1.5 hover:bg-black/90 transition-all shadow-lg"
          >
            <Play size={12} className="fill-white" /> Putar Cuplikan
          </button>
        )}
      </div>

      {/* Main Details Body */}
      <div className="px-4 -mt-6 relative z-10">
        {/* Title & Metadata */}
        <div className="flex gap-3.5 items-start">
          {/* Floating Poster */}
          <div className="w-24 shrink-0 aspect-[2/3] rounded-xl overflow-hidden border-2 border-white/20 shadow-2xl bg-[#0F1713]">
            <img
              src={media.posterUrl}
              alt={media.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 pt-6">
            <h1 className="text-xl font-black tracking-tight text-white leading-snug">
              {media.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300 mt-1 font-medium">
              <span className="flex items-center gap-0.5 text-amber-400 font-bold">
                <Star size={12} className="fill-amber-400" /> {media.ratingImdb}
              </span>
              <span>•</span>
              <span>{media.releaseYear}</span>
              <span>•</span>
              <span>{media.durationMinutes ? formatTimeMinutes(media.durationMinutes) : '2j 13m'}</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/10 text-emerald-300 border border-emerald-500/30">
                {media.badge || '4K HDR'}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-white/5 text-slate-300 border border-white/10">
                {media.contentRating || 'PG-13'}
              </span>
            </div>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col gap-2.5 mt-5">
          <button
            onClick={() => onPlayMedia(media, 2530)}
            className="w-full py-3.5 rounded-2xl font-bold text-sm text-black flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-xl"
            style={{
              backgroundImage: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
              boxShadow: `0 8px 24px ${theme.primaryGlow}`,
            }}
          >
            <Play size={18} className="fill-black" />
            <span>TONTON SEKARANG (LANJUTKAN 42:10)</span>
          </button>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={handleDownload}
              className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                lowRamMode ? 'bg-[#0F1713]' : 'bg-white/[0.04]'
              }`}
              style={{
                borderColor: isDownloaded ? theme.primary : theme.borderGlass,
                color: isDownloaded ? theme.primary : '#FFFFFF',
              }}
            >
              <Download size={15} />
              <span>
                {isDownloaded
                  ? 'Tersimpan Offline'
                  : downloadProgress > 0
                  ? `Mengunduh ${downloadProgress}%`
                  : 'Unduh (2.4 GB)'}
              </span>
            </button>

            <button
              onClick={() => onToggleWatchlist(media.id)}
              className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                lowRamMode ? 'bg-[#0F1713]' : 'bg-white/[0.04]'
              }`}
              style={{
                borderColor: isInWatchlist ? theme.primary : theme.borderGlass,
                color: isInWatchlist ? theme.primary : '#FFFFFF',
              }}
            >
              {isInWatchlist ? <Check size={15} /> : <Plus size={15} />}
              <span>{isInWatchlist ? 'Di Watchlist' : 'Tambah Watchlist'}</span>
            </button>
          </div>
        </div>

        {/* Synopsis */}
        <div className="mt-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
            Sinopsis Cerita
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            {media.synopsis}
          </p>
        </div>

        {/* Genre Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {media.genres.map((g) => (
            <span
              key={g}
              className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/[0.05] border border-white/10 text-slate-300"
            >
              {g}
            </span>
          ))}
        </div>

        {/* Cast & Crew Section */}
        <div className="mt-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Pemeran & Sutradara
          </h2>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {media.cast.map((actor) => (
              <div key={actor.id} className="flex flex-col items-center text-center w-16 shrink-0">
                <div
                  className="w-14 h-14 rounded-full overflow-hidden border-2 mb-1.5 shadow-md"
                  style={{ borderColor: theme.primary }}
                >
                  <img
                    src={actor.avatarUrl}
                    alt={actor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[11px] font-medium text-white truncate w-full">
                  {actor.name}
                </span>
                <span className="text-[9px] text-slate-400 truncate w-full">
                  {actor.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Related Titles Recommendations */}
        <div className="mt-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Rekomendasi Serupa
          </h2>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {relatedTitles.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectMedia(item)}
                className="w-24 shrink-0 cursor-pointer group"
              >
                <div className="aspect-[2/3] rounded-xl overflow-hidden border border-white/10 group-hover:scale-105 transition-transform">
                  <img
                    src={item.posterUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-[11px] font-medium text-white mt-1 truncate">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* License & Legal Footer */}
        <div className="mt-8 p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-2.5 text-[10px] text-slate-400">
          <ShieldCheck size={18} className="text-emerald-400 shrink-0" />
          <span>
            {media.licenseInfo || 'Konten berlisensi resmi studio PeTaNiFlix. Dilindungi enkripsi DRM Widevine Modular L1.'}
          </span>
        </div>
      </div>
    </div>
  );
};
