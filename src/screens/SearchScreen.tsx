import React, { useState, useEffect } from 'react';
import { ScreenId, ThemeTokens, MediaItem } from '../types';
import { filterCatalog } from '../utils/formatters';
import { Search, X, Clock, TrendingUp, Star, Film } from 'lucide-react';

interface SearchScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onSelectMedia: (media: MediaItem) => void;
  mediaList: MediaItem[];
  theme: ThemeTokens;
  lowRamMode: boolean;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({
  onNavigate,
  onSelectMedia,
  mediaList,
  theme,
  lowRamMode,
}) => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [activeTypeFilter, setActiveTypeFilter] = useState<'Semua' | 'Film' | 'Series' | '4K'>('Semua');
  const [recentSearches, setRecentSearches] = useState([
    'Dune: Part Two',
    'Severance Musim 2',
    'The Creator 4K',
  ]);

  const trendingKeywords = [
    'Oppenheimer',
    'Cyberpunk 2088',
    'Denis Villeneuve',
    'Arcane Season 2',
    'Shogun',
  ];

  // 300ms debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(handler);
  }, [query]);

  const filteredResults = filterCatalog(
    mediaList,
    debouncedQuery,
    'Semua',
    activeTypeFilter
  );

  const removeRecent = (itemToRemove: string) => {
    setRecentSearches(recentSearches.filter((item) => item !== itemToRemove));
  };

  const handleClearAllRecents = () => {
    setRecentSearches([]);
  };

  return (
    <div
      className="relative w-full h-full pb-24 overflow-y-auto select-none no-scrollbar p-4"
      style={{ backgroundColor: theme.canvas }}
    >
      {/* Top Search Bar */}
      <div className="sticky top-0 z-30 pt-1 pb-3">
        <div
          className={`flex items-center gap-2.5 px-3.5 py-3 rounded-2xl border transition-all ${
            lowRamMode
              ? 'bg-[#0F1713] border-white/10'
              : 'backdrop-blur-md bg-white/[0.05] border-white/15'
          }`}
          style={{
            borderColor: query ? theme.primary : theme.borderGlass,
            boxShadow: query ? `0 0 16px ${theme.primaryGlow}` : undefined,
          }}
        >
          <Search size={18} style={{ color: theme.primary }} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari judul, sutradara, aktor, atau genre..."
            className="w-full bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-white"
              aria-label="Bersihkan pencarian"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Quick Filter Chips */}
        <div className="flex gap-2 mt-2.5 overflow-x-auto no-scrollbar">
          {(['Semua', 'Film', 'Series', '4K'] as const).map((type) => {
            const isSelected = activeTypeFilter === type;
            return (
              <button
                key={type}
                onClick={() => setActiveTypeFilter(type)}
                className={`px-3 py-1 rounded-xl text-xs font-medium whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'text-black font-semibold shadow-md'
                    : 'text-slate-400 bg-white/[0.03] border-white/10 hover:text-white'
                }`}
                style={{
                  backgroundColor: isSelected ? theme.primary : undefined,
                  borderColor: isSelected ? theme.primary : undefined,
                }}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      {/* When no query is typed: Show Recent Searches & Trending */}
      {!debouncedQuery && (
        <div className="flex flex-col gap-5 mt-2">
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Clock size={13} className="text-slate-400" /> Pencarian Terakhir
                </span>
                <button
                  onClick={handleClearAllRecents}
                  className="text-[11px] text-slate-500 hover:text-red-400 transition-colors"
                >
                  Hapus Semua
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {recentSearches.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/[0.03] text-xs text-slate-300 group hover:border-white/20 transition-all"
                  >
                    <button
                      onClick={() => setQuery(item)}
                      className="hover:text-white"
                    >
                      {item}
                    </button>
                    <button
                      onClick={() => removeRecent(item)}
                      className="text-slate-500 hover:text-red-400 transition-colors ml-1"
                      aria-label={`Hapus ${item}`}
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trending Searches */}
          <div>
            <div className="flex items-center gap-1.5 mb-2.5 text-xs font-semibold text-slate-300">
              <TrendingUp size={13} style={{ color: theme.primary }} />
              <span>Paling Banyak Dicari Hari Ini</span>
            </div>

            <div className="flex flex-col gap-1.5">
              {trendingKeywords.map((kw, idx) => (
                <button
                  key={kw}
                  onClick={() => setQuery(kw)}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="font-mono text-xs font-bold w-4 text-center"
                      style={{ color: idx < 3 ? theme.primary : '#64748b' }}
                    >
                      {idx + 1}
                    </span>
                    <span className="text-xs text-slate-200">{kw}</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Trending</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Live Results Section */}
      {debouncedQuery && (
        <div className="mt-2">
          <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
            <span>
              Menampilkan {filteredResults.length} hasil untuk "{debouncedQuery}"
            </span>
          </div>

          {filteredResults.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {filteredResults.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => onSelectMedia(movie)}
                  className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#0F1713] cursor-pointer transition-all hover:scale-[1.02]"
                >
                  <div className="aspect-[2/3] w-full overflow-hidden relative">
                    <img
                      src={movie.posterUrl}
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-bold bg-black/75 text-emerald-300 border border-emerald-500/30">
                      {movie.badge || '4K'}
                    </div>
                    <div className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded text-[9px] font-bold bg-black/80 text-amber-400 flex items-center gap-1">
                      <Star size={10} className="fill-amber-400" /> {movie.ratingImdb}
                    </div>
                  </div>

                  <div className="p-2.5">
                    <h3 className="text-xs font-semibold text-white truncate">
                      {movie.title}
                    </h3>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {movie.releaseYear} • {movie.type === 'MOVIE' ? 'Film' : 'Serial'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty Search State */
            <div className="py-12 flex flex-col items-center text-center">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center border mb-3"
                style={{
                  backgroundColor: theme.surface,
                  borderColor: theme.borderGlass,
                }}
              >
                <Film size={28} className="text-slate-500" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">
                Tontonan Tidak Ditemukan
              </h3>
              <p className="text-xs text-slate-400 max-w-xs mb-4">
                Tidak ada film atau serial yang cocok dengan "{debouncedQuery}". Periksa ejaan atau telusuri koleksi populer kami.
              </p>
              <button
                onClick={() => {
                  setQuery('');
                  onNavigate('explore');
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-black"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                }}
              >
                Jelajahi Semua Katalog
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
