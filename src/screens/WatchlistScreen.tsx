import React, { useState } from 'react';
import { ScreenId, ThemeTokens, MediaItem } from '../types';
import { LayoutGrid, List, Trash2, Play, Star, BookmarkX, RotateCcw } from 'lucide-react';

interface WatchlistScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onSelectMedia: (media: MediaItem) => void;
  onPlayMedia: (media: MediaItem) => void;
  watchlistIds: string[];
  onRemoveFromWatchlist: (mediaId: string) => void;
  onAddToWatchlist: (mediaId: string) => void;
  mediaList: MediaItem[];
  theme: ThemeTokens;
  lowRamMode: boolean;
}

export const WatchlistScreen: React.FC<WatchlistScreenProps> = ({
  onNavigate,
  onSelectMedia,
  onPlayMedia,
  watchlistIds,
  onRemoveFromWatchlist,
  onAddToWatchlist,
  mediaList,
  theme,
  lowRamMode,
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterType, setFilterType] = useState<'ALL' | 'MOVIE' | 'SERIES'>('ALL');
  const [lastRemovedId, setLastRemovedId] = useState<string | null>(null);

  const watchlistItems = mediaList.filter((m) => watchlistIds.includes(m.id));
  const filteredItems = watchlistItems.filter((item) => {
    if (filterType === 'MOVIE') return item.type === 'MOVIE';
    if (filterType === 'SERIES') return item.type === 'SERIES';
    return true;
  });

  const handleRemove = (id: string) => {
    setLastRemovedId(id);
    onRemoveFromWatchlist(id);
  };

  const handleUndo = () => {
    if (lastRemovedId) {
      onAddToWatchlist(lastRemovedId);
      setLastRemovedId(null);
    }
  };

  return (
    <div
      className="relative w-full h-full pb-24 overflow-y-auto select-none no-scrollbar p-4"
      style={{ backgroundColor: theme.canvas }}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between pt-1 pb-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            Daftar Tontonan
          </h1>
          <span className="text-[11px] text-slate-400">
            {watchlistItems.length} judul tersimpan di akun Anda
          </span>
        </div>

        {/* View toggle (Grid / List) */}
        <div className="flex items-center bg-white/[0.05] p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-lg transition-colors ${
              viewMode === 'grid' ? 'bg-white/20 text-white' : 'text-slate-400'
            }`}
            aria-label="Tampilan Grid"
          >
            <LayoutGrid size={15} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-lg transition-colors ${
              viewMode === 'list' ? 'bg-white/20 text-white' : 'text-slate-400'
            }`}
            aria-label="Tampilan Daftar"
          >
            <List size={15} />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-4">
        {[
          { id: 'ALL', label: `Semua (${watchlistItems.length})` },
          { id: 'MOVIE', label: 'Film' },
          { id: 'SERIES', label: 'Serial' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id as any)}
            className={`px-3 py-1 rounded-xl text-xs font-medium border transition-all ${
              filterType === tab.id
                ? 'text-black font-semibold shadow-md'
                : 'text-slate-400 bg-white/[0.03] border-white/10 hover:text-white'
            }`}
            style={{
              backgroundColor: filterType === tab.id ? theme.primary : undefined,
              borderColor: filterType === tab.id ? theme.primary : undefined,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Watchlist content */}
      {filteredItems.length > 0 ? (
        viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-2 gap-3">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#0F1713] transition-all hover:scale-[1.02]"
              >
                <div
                  onClick={() => onSelectMedia(item)}
                  className="aspect-[2/3] w-full overflow-hidden relative cursor-pointer"
                >
                  <img
                    src={item.posterUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[8px] font-bold bg-black/75 text-emerald-300">
                    {item.badge}
                  </div>
                  <div className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded text-[8px] font-bold bg-black/80 text-amber-400 flex items-center gap-0.5">
                    <Star size={10} className="fill-amber-400" /> {item.ratingImdb}
                  </div>
                </div>

                <div className="p-2.5 flex items-center justify-between">
                  <div className="min-w-0 pr-1 cursor-pointer" onClick={() => onSelectMedia(item)}>
                    <h3 className="text-xs font-semibold text-white truncate">
                      {item.title}
                    </h3>
                    <p className="text-[10px] text-slate-400">{item.releaseYear}</p>
                  </div>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-white/10 transition-colors"
                    title="Hapus dari Watchlist"
                    aria-label={`Hapus ${item.title}`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="flex flex-col gap-2.5">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="p-2.5 rounded-2xl border border-white/10 bg-[#0F1713] flex items-center justify-between gap-3 group"
              >
                <div
                  onClick={() => onSelectMedia(item)}
                  className="flex items-center gap-3 min-w-0 flex-1 cursor-pointer"
                >
                  <div className="w-14 aspect-[2/3] rounded-lg overflow-hidden shrink-0 bg-black/50">
                    <img
                      src={item.posterUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-bold text-white truncate">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                      <span className="text-amber-400">★ {item.ratingImdb}</span>
                      <span>•</span>
                      <span>{item.releaseYear}</span>
                      <span>•</span>
                      <span className="text-emerald-400">{item.type === 'MOVIE' ? 'Film' : 'Serial'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => onPlayMedia(item)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-black"
                    style={{ backgroundColor: theme.primary }}
                    aria-label={`Putar ${item.title}`}
                  >
                    <Play size={14} className="fill-black ml-0.5" />
                  </button>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-red-400 hover:bg-white/10"
                    aria-label={`Hapus ${item.title}`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        /* Empty Watchlist State */
        <div className="py-16 flex flex-col items-center text-center">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center border mb-3 text-slate-500"
            style={{ backgroundColor: theme.surface, borderColor: theme.borderGlass }}
          >
            <BookmarkX size={28} />
          </div>
          <h2 className="text-sm font-bold text-white mb-1">
            Watchlist Masih Kosong
          </h2>
          <p className="text-xs text-slate-400 max-w-xs mb-4">
            Simpan film dan serial favorit Anda di sini untuk ditonton kapan saja.
          </p>
          <button
            onClick={() => onNavigate('home')}
            className="px-4 py-2 rounded-xl text-xs font-bold text-black"
            style={{
              backgroundImage: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
            }}
          >
            Telusuri Film Populer
          </button>
        </div>
      )}

      {/* Undo Snackbar */}
      {lastRemovedId && (
        <div className="fixed bottom-24 inset-x-6 z-50 p-3 rounded-2xl bg-[#0F1713] border border-emerald-500/40 text-white flex items-center justify-between shadow-2xl animate-in slide-in-from-bottom-2">
          <span className="text-xs text-slate-200">Item dihapus dari Watchlist</span>
          <button
            onClick={handleUndo}
            className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg text-emerald-400 hover:bg-emerald-500/10"
          >
            <RotateCcw size={12} /> Urungkan
          </button>
        </div>
      )}
    </div>
  );
};
