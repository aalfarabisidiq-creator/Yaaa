import React, { useState } from 'react';
import { ScreenId, ThemeTokens, MediaItem } from '../types';
import { SlidersHorizontal, Star, X, Check } from 'lucide-react';

interface ExploreScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onSelectMedia: (media: MediaItem) => void;
  mediaList: MediaItem[];
  theme: ThemeTokens;
  lowRamMode: boolean;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({
  onNavigate,
  onSelectMedia,
  mediaList,
  theme,
  lowRamMode,
}) => {
  const [selectedGenre, setSelectedGenre] = useState('Semua');
  const [sortBy, setSortBy] = useState<'popularity' | 'rating' | 'year'>('popularity');
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [minRating, setMinRating] = useState(7.0);
  const [selectedType, setSelectedType] = useState<'ALL' | 'MOVIE' | 'SERIES'>('ALL');

  const genres = ['Semua', 'Aksi', 'Sci-Fi', 'Thriller', 'Drama', 'Dokumenter', 'Animasi'];

  // Apply filters & sorting
  const filteredMedia = mediaList
    .filter((m) => {
      if (selectedType !== 'ALL' && m.type !== selectedType) return false;
      if (selectedGenre !== 'Semua' && !m.genres.includes(selectedGenre)) return false;
      if (m.ratingImdb < minRating) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.ratingImdb - a.ratingImdb;
      if (sortBy === 'year') return b.releaseYear - a.releaseYear;
      return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0);
    });

  return (
    <div
      className="relative w-full h-full pb-24 overflow-y-auto select-none no-scrollbar p-4"
      style={{ backgroundColor: theme.canvas }}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between pt-1 pb-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            Jelajah Katalog
          </h1>
          <p className="text-[11px] text-slate-400">
            Ribuan judul film dan serial berkualitas bioskop
          </p>
        </div>

        {/* Filter Modal Trigger */}
        <button
          onClick={() => setIsFilterSheetOpen(true)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
            lowRamMode ? 'bg-[#0F1713]' : 'bg-white/10 backdrop-blur-md'
          } hover:bg-white/20`}
          style={{
            borderColor: minRating > 7.0 || selectedType !== 'ALL' ? theme.primary : theme.borderGlass,
            color: minRating > 7.0 || selectedType !== 'ALL' ? theme.primary : '#FFFFFF',
          }}
          aria-label="Filter katalog"
        >
          <SlidersHorizontal size={14} />
          <span>Filter</span>
        </button>
      </div>

      {/* Type Toggle: Semua | Film | Serial */}
      <div className="flex bg-white/[0.04] p-1 rounded-xl border border-white/10 mb-3">
        {[
          { id: 'ALL', label: 'Semua' },
          { id: 'MOVIE', label: 'Film Layar Lebar' },
          { id: 'SERIES', label: 'Serial Drama' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setSelectedType(t.id as any)}
            className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedType === t.id
                ? 'text-black font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
            style={{
              backgroundColor: selectedType === t.id ? theme.primary : 'transparent',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Genre Filter Chips */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4">
        {genres.map((g) => {
          const isSelected = selectedGenre === g;
          return (
            <button
              key={g}
              onClick={() => setSelectedGenre(g)}
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
              {g}
            </button>
          );
        })}
      </div>

      {/* Sort Dropdown / Badges */}
      <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
        <span>{filteredMedia.length} judul ditemukan</span>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px]">Urut:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#0F1713] text-xs text-white border border-white/10 rounded-lg px-2 py-1 focus:outline-none"
          >
            <option value="popularity">Popularitas</option>
            <option value="rating">Rating IMDb</option>
            <option value="year">Tahun Rilis</option>
          </select>
        </div>
      </div>

      {/* 2-Column Catalog Grid */}
      <div className="grid grid-cols-2 gap-3">
        {filteredMedia.map((media) => (
          <div
            key={media.id}
            onClick={() => onSelectMedia(media)}
            className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#0F1713] cursor-pointer transition-all hover:scale-[1.02]"
          >
            <div className="aspect-[2/3] w-full overflow-hidden relative">
              <img
                src={media.posterUrl}
                alt={media.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-bold bg-black/75 text-emerald-300 border border-emerald-500/30">
                {media.badge || '4K'}
              </div>
              <div className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded text-[9px] font-bold bg-black/80 text-amber-400 flex items-center gap-1">
                <Star size={10} className="fill-amber-400" /> {media.ratingImdb}
              </div>
            </div>

            <div className="p-2.5">
              <h3 className="text-xs font-semibold text-white truncate">
                {media.title}
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5 flex justify-between">
                <span>{media.releaseYear}</span>
                <span>{media.genres[0]}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* FILTER BOTTOM SHEET MODAL (Liquid Glass) */}
      {isFilterSheetOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm p-0 animate-in fade-in duration-200">
          <div
            className="w-full max-w-md rounded-t-[32px] p-5 border-t border-x border-white/20 shadow-2xl relative"
            style={{
              backgroundColor: lowRamMode ? '#0F1713' : 'rgba(15, 23, 19, 0.95)',
            }}
          >
            {/* Sheet Handle */}
            <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-4" />

            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-white">Filter Katalog</h3>
              <button
                onClick={() => setIsFilterSheetOpen(false)}
                className="text-slate-400 hover:text-white"
                aria-label="Tutup filter"
              >
                <X size={20} />
              </button>
            </div>

            {/* Minimum Rating Slider */}
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-300 font-medium">Minimal Rating IMDb</span>
                <span className="font-bold text-amber-400 flex items-center gap-1">
                  <Star size={12} className="fill-amber-400" /> {minRating.toFixed(1)}
                </span>
              </div>
              <input
                type="range"
                min="5.0"
                max="9.5"
                step="0.1"
                value={minRating}
                onChange={(e) => setMinRating(parseFloat(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>5.0</span>
                <span>7.5</span>
                <span>9.5</span>
              </div>
            </div>

            {/* Quality Preference */}
            <div className="mb-5">
              <span className="text-xs text-slate-300 font-medium block mb-2">
                Resolusi Video
              </span>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {['Semua', '4K Ultra HD', 'Dolby Vision'].map((q, i) => (
                  <button
                    key={q}
                    className={`py-2 px-1 rounded-xl border text-center transition-all ${
                      i === 0
                        ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400 font-semibold'
                        : 'border-white/10 text-slate-300'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setMinRating(7.0);
                  setSelectedType('ALL');
                  setSelectedGenre('Semua');
                }}
                className="flex-1 py-3 rounded-2xl border border-white/10 text-xs font-bold text-slate-300 hover:text-white"
              >
                Reset Filter
              </button>
              <button
                onClick={() => setIsFilterSheetOpen(false)}
                className="flex-1 py-3 rounded-2xl font-bold text-xs text-black flex items-center justify-center gap-1.5"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                }}
              >
                <Check size={16} /> Terapkan ({filteredMedia.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
