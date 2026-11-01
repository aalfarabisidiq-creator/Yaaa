import React, { useState } from 'react';
import { ScreenId, ThemeTokens } from '../types';
import { ArrowLeft, BookmarkX, Search, Download, Compass, RefreshCw } from 'lucide-react';

interface EmptyStateScreenProps {
  onNavigate: (screen: ScreenId) => void;
  theme: ThemeTokens;
  lowRamMode: boolean;
}

export const EmptyStateScreen: React.FC<EmptyStateScreenProps> = ({
  onNavigate,
  theme,
  lowRamMode,
}) => {
  const [activeTab, setActiveTab] = useState<'search' | 'watchlist' | 'download'>('search');

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
              Pratinjau Status Kosong
            </h1>
            <span className="text-[11px] text-slate-400">
              Desain Empty States PeTaNiFlix
            </span>
          </div>
        </div>
      </div>

      {/* Switcher Tabs */}
      <div className="flex gap-2 mb-6 bg-white/[0.04] p-1 rounded-xl border border-white/10">
        {[
          { id: 'search', label: 'Pencarian Kosong' },
          { id: 'watchlist', label: 'Watchlist Kosong' },
          { id: 'download', label: 'Belum Ada Unduhan' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === t.id
                ? 'text-black font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
            style={{
              backgroundColor: activeTab === t.id ? theme.primary : 'transparent',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Card Content Display */}
      <div
        className={`p-6 rounded-3xl border text-center flex flex-col items-center justify-center my-6 shadow-xl ${
          lowRamMode ? 'bg-[#0F1713]' : 'bg-[#0F1713]/80 backdrop-blur-md'
        }`}
        style={{ borderColor: theme.borderGlass }}
      >
        {activeTab === 'search' && (
          <>
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center border shadow-xl mb-4"
              style={{
                backgroundColor: theme.surface,
                borderColor: theme.borderAccent,
              }}
            >
              <Search size={36} style={{ color: theme.primary }} />
            </div>

            <h2 className="text-lg font-bold text-white mb-2">
              Tontonan Tidak Ditemukan
            </h2>
            <p className="text-xs text-slate-400 max-w-xs mb-5 leading-relaxed">
              Kami tidak dapat menemukan hasil untuk kata kunci yang dicari. Silakan periksa kembali ejaan atau jelajahi koleksi genre bioskop kami.
            </p>

            <button
              onClick={() => onNavigate('explore')}
              className="px-5 py-3 rounded-2xl font-bold text-xs text-black flex items-center gap-2 shadow-lg"
              style={{
                backgroundImage: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
              }}
            >
              <Compass size={16} />
              <span>Eksplor Film Populer</span>
            </button>
          </>
        )}

        {activeTab === 'watchlist' && (
          <>
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center border shadow-xl mb-4"
              style={{
                backgroundColor: theme.surface,
                borderColor: theme.borderAccent,
              }}
            >
              <BookmarkX size={36} style={{ color: theme.primary }} />
            </div>

            <h2 className="text-lg font-bold text-white mb-2">
              Daftar Tontonan Belum Terisi
            </h2>
            <p className="text-xs text-slate-400 max-w-xs mb-5 leading-relaxed">
              Klik ikon tanda tambah (+) pada halaman detail film atau serial untuk menyimpannya ke daftar tontonan pribadi Anda.
            </p>

            <button
              onClick={() => onNavigate('home')}
              className="px-5 py-3 rounded-2xl font-bold text-xs text-black flex items-center gap-2 shadow-lg"
              style={{
                backgroundImage: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
              }}
            >
              <RefreshCw size={16} />
              <span>Jelajah Beranda Sekarang</span>
            </button>
          </>
        )}

        {activeTab === 'download' && (
          <>
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center border shadow-xl mb-4"
              style={{
                backgroundColor: theme.surface,
                borderColor: theme.borderAccent,
              }}
            >
              <Download size={36} className="text-sky-400" />
            </div>

            <h2 className="text-lg font-bold text-white mb-2">
              Belum Ada Video Terunduh
            </h2>
            <p className="text-xs text-slate-400 max-w-xs mb-5 leading-relaxed">
              Unduh film dan serial favorit Anda dalam format 4K AV1 hemat kuota untuk dinikmati saat offline di mana saja.
            </p>

            <button
              onClick={() => onNavigate('explore')}
              className="px-5 py-3 rounded-2xl font-bold text-xs text-black flex items-center gap-2 shadow-lg"
              style={{
                backgroundImage: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
              }}
            >
              <span>Cari Film Untuk Diunduh</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};
