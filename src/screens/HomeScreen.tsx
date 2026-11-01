import React, { useState } from 'react';
import { ScreenId, ThemeTokens, MediaItem, HistoryItem } from '../types';
import { Play, Plus, Check, Bell, Cast, Star, ChevronRight, Info } from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onSelectMedia: (media: MediaItem) => void;
  onPlayMedia: (media: MediaItem, resumeSeconds?: number) => void;
  mediaList: MediaItem[];
  continueWatching: HistoryItem[];
  watchlistIds: string[];
  onToggleWatchlist: (mediaId: string) => void;
  unreadNotificationsCount: number;
  theme: ThemeTokens;
  lowRamMode: boolean;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onSelectMedia,
  onPlayMedia,
  mediaList,
  continueWatching,
  watchlistIds,
  onToggleWatchlist,
  unreadNotificationsCount,
  theme,
  lowRamMode,
}) => {
  const [selectedGenre, setSelectedGenre] = useState('Semua');

  const heroMovie = mediaList[0]; // The Creator
  const trendingList = mediaList.filter((m) => m.isTrending);
  const latestMovies = mediaList.filter((m) => m.type === 'MOVIE' && m.isLatest);
  const latestSeries = mediaList.filter((m) => m.type === 'SERIES');
  const topRatedList = mediaList.filter((m) => m.isTopRated);

  const isHeroInWatchlist = watchlistIds.includes(heroMovie?.id);

  const genres = ['Semua', 'Aksi', 'Sci-Fi', 'Thriller', 'Drama', 'Dokumenter'];

  return (
    <div
      className="relative w-full h-full pb-24 overflow-y-auto select-none no-scrollbar"
      style={{ backgroundColor: theme.canvas }}
    >
      {/* Top Floating App Bar */}
      <div
        className={`sticky top-0 z-30 px-4 pt-3 pb-2 flex items-center justify-between transition-all ${
          lowRamMode
            ? 'bg-[#080C0A]/95 border-b border-white/5'
            : 'backdrop-blur-md bg-[#080C0A]/75 border-b border-white/10'
        }`}
      >
        <div className="flex items-center gap-2">
          {/* PeTaNiFlix Brand */}
          <div className="flex items-center gap-1.5">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs text-black"
              style={{
                backgroundImage: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
              }}
            >
              P
            </div>
            <span className="font-extrabold text-base tracking-tight" style={{ color: theme.textPrimary }}>
              PeTaNi<span style={{ color: theme.primary }}>Flix</span>
            </span>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => alert('Fitur Google Cast Terhubung: Menyiapkan transmisi ke Smart TV')}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            title="Transmisi Layar (Cast to TV)"
            aria-label="Google Cast"
          >
            <Cast size={18} />
          </button>

          <button
            onClick={() => onNavigate('notifications')}
            className="relative w-8 h-8 rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Notifikasi"
          >
            <Bell size={18} />
            {unreadNotificationsCount > 0 && (
              <span
                className="absolute top-1 right-1 w-2 h-2 rounded-full"
                style={{ backgroundColor: theme.primary }}
              />
            )}
          </button>

          <button
            onClick={() => onNavigate('profile')}
            className="w-8 h-8 rounded-full overflow-hidden border-2 transition-transform hover:scale-105"
            style={{ borderColor: theme.primary }}
            aria-label="Profil Pengguna"
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>

      {/* HERO CINEMATIC BANNER */}
      {heroMovie && (
        <div className="relative w-full aspect-[4/5] max-h-[460px] overflow-hidden">
          {/* Backdrop Image */}
          <img
            src={heroMovie.posterUrl}
            alt={heroMovie.title}
            className="w-full h-full object-cover object-top scale-105 transition-transform duration-700"
          />

          {/* Liquid Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080C0A] via-[#080C0A]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080C0A]/60 via-transparent to-[#080C0A]" />

          {/* Hero Content Overlay */}
          <div className="absolute inset-x-4 bottom-4 flex flex-col items-center text-center">
            {/* Top Badge */}
            <div
              className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase mb-2 border text-black shadow-lg"
              style={{
                backgroundColor: theme.primary,
                borderColor: theme.borderGlass,
              }}
            >
              TOP 1 HARI INI • {heroMovie.genres.join(' • ')}
            </div>

            <h1
              className="text-2xl font-black tracking-tight drop-shadow-md max-w-xs"
              style={{ color: theme.textPrimary }}
            >
              {heroMovie.title}
            </h1>

            {/* Metadata Chips */}
            <div className="flex items-center gap-2 text-xs text-slate-300 mt-1 mb-4 font-medium">
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                <Star size={12} className="fill-amber-400" /> {heroMovie.ratingImdb}
              </span>
              <span>•</span>
              <span>{heroMovie.releaseYear}</span>
              <span>•</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-white/10 font-mono text-emerald-300">
                {heroMovie.badge}
              </span>
            </div>

            {/* Hero CTAs */}
            <div className="flex items-center gap-3 w-full max-w-xs justify-center">
              <button
                onClick={() => onPlayMedia(heroMovie)}
                className="flex-1 py-3 rounded-2xl font-bold text-xs text-black flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xl"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                  boxShadow: `0 8px 24px ${theme.primaryGlow}`,
                }}
              >
                <Play size={16} className="fill-black" />
                <span>Putar Film</span>
              </button>

              <button
                onClick={() => onToggleWatchlist(heroMovie.id)}
                className={`w-11 h-11 rounded-2xl border flex items-center justify-center transition-all ${
                  lowRamMode ? 'bg-[#0F1713]' : 'bg-white/10 backdrop-blur-md'
                } hover:bg-white/20`}
                style={{
                  borderColor: isHeroInWatchlist ? theme.primary : theme.borderGlass,
                  color: isHeroInWatchlist ? theme.primary : '#FFFFFF',
                }}
                aria-label={isHeroInWatchlist ? 'Hapus dari Watchlist' : 'Tambah ke Watchlist'}
              >
                {isHeroInWatchlist ? <Check size={18} /> : <Plus size={18} />}
              </button>

              <button
                onClick={() => onSelectMedia(heroMovie)}
                className={`w-11 h-11 rounded-2xl border flex items-center justify-center text-white transition-all ${
                  lowRamMode ? 'bg-[#0F1713]' : 'bg-white/10 backdrop-blur-md'
                } hover:bg-white/20`}
                style={{ borderColor: theme.borderGlass }}
                aria-label="Detail Film"
              >
                <Info size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HORIZONTAL GENRE FILTER CHIPS */}
      <div className="px-4 mt-3 mb-5 overflow-x-auto no-scrollbar flex items-center gap-2">
        {genres.map((g) => {
          const isSelected = selectedGenre === g;
          return (
            <button
              key={g}
              onClick={() => setSelectedGenre(g)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all border ${
                isSelected
                  ? 'text-black font-semibold shadow-md'
                  : 'text-slate-400 bg-white/[0.04] border-white/10 hover:text-white'
              }`}
              style={{
                backgroundColor: isSelected ? theme.primary : undefined,
                borderColor: isSelected ? theme.primary : undefined,
              }}
            >
              {g}
            </button>
          );
        })}
      </div>

      {/* CONTINUE WATCHING SECTION */}
      {continueWatching.length > 0 && (
        <section className="px-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold tracking-normal text-white flex items-center gap-2">
              <span
                className="w-1.5 h-3.5 rounded-full"
                style={{ backgroundColor: theme.primary }}
              />
              Lanjutkan Menonton
            </h2>
            <button
              onClick={() => onNavigate('history')}
              className="text-xs flex items-center gap-0.5 text-slate-400 hover:text-white"
            >
              Lihat Semua <ChevronRight size={14} />
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {continueWatching.map((item) => (
              <div
                key={item.id}
                onClick={() => onPlayMedia(item.media, item.progressSeconds)}
                className="group relative w-48 shrink-0 rounded-2xl overflow-hidden border border-white/10 bg-[#0F1713] cursor-pointer transition-transform hover:scale-[1.02]"
              >
                {/* 16:9 Thumbnail */}
                <div className="relative w-full aspect-video">
                  <img
                    src={item.media.backdropUrl}
                    alt={item.media.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: theme.primary }}
                    >
                      <Play size={16} className="fill-black text-black ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-1 right-1.5 px-1.5 py-0.5 rounded text-[9px] font-mono bg-black/80 text-white">
                    {Math.round((item.totalSeconds - item.progressSeconds) / 60)}m tersisa
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-black/60 h-1">
                  <div
                    className="h-full transition-all"
                    style={{
                      width: `${item.progressPercent}%`,
                      backgroundColor: theme.primary,
                    }}
                  />
                </div>

                {/* Meta details */}
                <div className="p-2.5">
                  <h3 className="text-xs font-semibold text-white truncate">
                    {item.media.title}
                  </h3>
                  <p className="text-[10px] text-slate-400 truncate">
                    {item.episode ? item.episode.title : 'Film Utama'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TRENDING MOVIES (IDLIX VIP Style with giant rank numerals) */}
      <section className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
            <span
              className="w-1.5 h-3.5 rounded-full"
              style={{ backgroundColor: theme.primary }}
            />
            Sedang Tren Sekarang
          </h2>
          <span className="text-[10px] uppercase font-bold text-amber-400">
            IDLIX POPULAR
          </span>
        </div>

        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {trendingList.map((movie, index) => (
            <div
              key={movie.id}
              onClick={() => onSelectMedia(movie)}
              className="relative flex items-end cursor-pointer group shrink-0"
            >
              {/* Giant Stylized Rank Number behind/beside poster */}
              <span
                className="font-black text-6xl leading-none -mr-4 z-0 opacity-40 select-none transition-colors group-hover:opacity-75"
                style={{
                  color: index === 0 ? theme.primary : '#475569',
                  WebkitTextStroke: '1px rgba(255,255,255,0.2)',
                }}
              >
                {index + 1}
              </span>

              {/* Poster Card */}
              <div
                className="relative z-10 w-28 aspect-[2/3] rounded-xl overflow-hidden border border-white/10 shadow-lg group-hover:scale-105 transition-transform"
                style={{
                  boxShadow: `0 8px 20px rgba(0,0,0,0.5)`,
                }}
              >
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-1.5 left-1.5 px-1 py-0.5 rounded text-[8px] font-bold bg-black/75 text-emerald-300 border border-emerald-500/30">
                  {movie.badge || '4K'}
                </div>
                <div className="absolute bottom-1 right-1 px-1 py-0.5 rounded text-[8px] font-bold bg-black/80 text-amber-400 flex items-center gap-0.5">
                  ★ {movie.ratingImdb}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LATEST MOVIES */}
      <section className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
            <span
              className="w-1.5 h-3.5 rounded-full"
              style={{ backgroundColor: theme.primary }}
            />
            Rilis Film Terbaru
          </h2>
          <button
            onClick={() => onNavigate('explore')}
            className="text-xs text-slate-400 hover:text-white"
          >
            Lihat Semua
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {latestMovies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => onSelectMedia(movie)}
              className="w-28 shrink-0 cursor-pointer group"
            >
              <div className="relative aspect-[2/3] rounded-xl overflow-hidden border border-white/10 group-hover:scale-105 transition-transform">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-1.5 right-1.5 px-1 py-0.5 rounded text-[8px] font-bold bg-black/70 text-emerald-300">
                  {movie.badge}
                </div>
              </div>
              <h3 className="text-xs font-semibold text-white mt-1.5 truncate">
                {movie.title}
              </h3>
              <p className="text-[10px] text-slate-400">
                {movie.releaseYear} • ★ {movie.ratingImdb}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* LATEST SERIES */}
      <section className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
            <span
              className="w-1.5 h-3.5 rounded-full"
              style={{ backgroundColor: theme.primary }}
            />
            Serial Unggulan
          </h2>
          <span className="text-[10px] text-slate-400">Musim Baru</span>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {latestSeries.map((series) => (
            <div
              key={series.id}
              onClick={() => onSelectMedia(series)}
              className="w-28 shrink-0 cursor-pointer group"
            >
              <div className="relative aspect-[2/3] rounded-xl overflow-hidden border border-white/10 group-hover:scale-105 transition-transform">
                <img
                  src={series.posterUrl}
                  alt={series.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded text-[8px] font-bold bg-emerald-950/90 text-emerald-300 border border-emerald-500/40">
                  {series.seasonsCount} Musim
                </div>
              </div>
              <h3 className="text-xs font-semibold text-white mt-1.5 truncate">
                {series.title}
              </h3>
              <p className="text-[10px] text-slate-400">
                ★ {series.ratingImdb} • {series.genres[0]}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* TOP RATED IDLIX PICKS */}
      <section className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
            <span
              className="w-1.5 h-3.5 rounded-full"
              style={{ backgroundColor: theme.primary }}
            />
            Rating Tertinggi (Koleksi Kritikus)
          </h2>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {topRatedList.map((media) => (
            <div
              key={media.id}
              onClick={() => onSelectMedia(media)}
              className="w-28 shrink-0 cursor-pointer group"
            >
              <div className="relative aspect-[2/3] rounded-xl overflow-hidden border border-white/10 group-hover:scale-105 transition-transform">
                <img
                  src={media.posterUrl}
                  alt={media.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-1.5 right-1.5 px-1 py-0.5 rounded text-[8px] font-bold bg-amber-500 text-black">
                  ★ {media.ratingImdb}
                </div>
              </div>
              <h3 className="text-xs font-semibold text-white mt-1.5 truncate">
                {media.title}
              </h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
