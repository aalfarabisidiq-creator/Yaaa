import React from 'react';
import { ScreenId, ThemeTokens, UserProfile } from '../types';
import {
  Settings as SettingsIcon,
  Crown,
  Clock,
  CheckCircle,
  HardDrive,
  Volume2,
  LogOut,
  Plus,
  Shield,
  ChevronRight,
} from 'lucide-react';

interface ProfileScreenProps {
  user: UserProfile;
  onNavigate: (screen: ScreenId) => void;
  onLogout: () => void;
  theme: ThemeTokens;
  lowRamMode: boolean;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  onNavigate,
  onLogout,
  theme,
  lowRamMode,
}) => {
  return (
    <div
      className="relative w-full h-full pb-24 overflow-y-auto select-none no-scrollbar p-4"
      style={{ backgroundColor: theme.canvas }}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between pt-1 pb-3">
        <h1 className="text-xl font-bold tracking-tight text-white">
          Profil Saya
        </h1>
        <button
          onClick={() => onNavigate('settings')}
          className="w-9 h-9 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white hover:bg-white/15 transition-colors"
          title="Buka Pengaturan"
          aria-label="Pengaturan"
        >
          <SettingsIcon size={18} />
        </button>
      </div>

      {/* User Hero Card */}
      <div
        className={`p-4 rounded-3xl border shadow-xl flex flex-col items-center text-center relative overflow-hidden mb-5 ${
          lowRamMode ? 'bg-[#0F1713]' : 'bg-[#0F1713]/90 backdrop-blur-md'
        }`}
        style={{ borderColor: theme.borderAccent }}
      >
        {/* Ambient Top Glow */}
        <div
          className="absolute -top-12 inset-x-0 h-24 rounded-full blur-2xl opacity-20 pointer-events-none"
          style={{ backgroundColor: theme.primary }}
        />

        {/* Avatar with Emerald Ring */}
        <div className="relative mb-3">
          <div
            className="w-20 h-20 rounded-full overflow-hidden border-2 p-0.5 shadow-2xl"
            style={{
              borderColor: theme.primary,
              boxShadow: `0 0 20px ${theme.primaryGlow}`,
            }}
          >
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div
            className="absolute -bottom-1 -right-1 p-1 rounded-full bg-black border border-amber-400 text-amber-400"
            title="VIP Member"
          >
            <Crown size={14} className="fill-amber-400" />
          </div>
        </div>

        <h2 className="text-base font-bold text-white">{user.name}</h2>
        <span className="text-xs text-slate-400 mb-2">{user.email}</span>

        {/* Tier Badge */}
        <div
          className="px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider border flex items-center gap-1.5 shadow-sm"
          style={{
            backgroundColor: `${theme.primary}20`,
            borderColor: theme.primary,
            color: theme.primary,
          }}
        >
          <Crown size={12} />
          <span>{user.tier} SUBSCRIBER</span>
        </div>
      </div>

      {/* Watch Stats Cards */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="p-3 rounded-2xl border border-white/10 bg-[#0F1713] flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/10"
            style={{ backgroundColor: theme.surface }}
          >
            <Clock size={18} style={{ color: theme.primary }} />
          </div>
          <div>
            <span className="text-base font-bold text-white block">
              {user.watchHours} Jam
            </span>
            <span className="text-[10px] text-slate-400">Total Ditonton</span>
          </div>
        </div>

        <div className="p-3 rounded-2xl border border-white/10 bg-[#0F1713] flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/10"
            style={{ backgroundColor: theme.surface }}
          >
            <CheckCircle size={18} className="text-amber-400" />
          </div>
          <div>
            <span className="text-base font-bold text-white block">
              {user.completedTitles} Judul
            </span>
            <span className="text-[10px] text-slate-400">Film & Seri Tamat</span>
          </div>
        </div>
      </div>

      {/* Manage Profiles */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Kelola Profil Penonton
          </span>
          <span className="text-[10px] text-slate-500">Maksimal 4 Profil</span>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {user.profiles.map((p, idx) => (
            <div
              key={p.id}
              className="flex flex-col items-center text-center w-16 shrink-0 cursor-pointer group"
            >
              <div
                className={`w-14 h-14 rounded-2xl overflow-hidden border-2 mb-1 transition-transform group-hover:scale-105 ${
                  idx === 0 ? 'border-emerald-400' : 'border-white/20'
                }`}
              >
                <img
                  src={p.avatar}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[10px] font-medium text-white truncate w-full">
                {p.name}
              </span>
            </div>
          ))}

          {/* Add Profile button */}
          <button
            onClick={() => alert('Fitur Tambah Profil Keluarga: Terhubung dengan database PostgreSQL')}
            className="flex flex-col items-center text-center w-16 shrink-0 group"
          >
            <div className="w-14 h-14 rounded-2xl border-2 border-dashed border-white/20 hover:border-emerald-400 flex items-center justify-center text-slate-400 hover:text-emerald-400 transition-colors mb-1">
              <Plus size={20} />
            </div>
            <span className="text-[10px] text-slate-400">Tambah</span>
          </button>
        </div>
      </div>

      {/* Storage and System Quick Toggles */}
      <div className="flex flex-col gap-2.5 mb-5">
        {/* Offline Storage */}
        <div className="p-3 rounded-2xl border border-white/10 bg-[#0F1713] flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-medium flex items-center gap-1.5">
              <HardDrive size={15} className="text-sky-400" /> Unduhan Offline
            </span>
            <span className="text-slate-400 font-mono text-[11px]">
              {user.offlineStorageUsedGb} GB / {user.offlineStorageTotalGb} GB
            </span>
          </div>
          <div className="w-full bg-black/60 h-2 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${(user.offlineStorageUsedGb / user.offlineStorageTotalGb) * 100}%`,
                backgroundColor: theme.primary,
              }}
            />
          </div>
        </div>

        {/* Dolby Atmos Status */}
        <div className="p-3 rounded-2xl border border-white/10 bg-[#0F1713] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Volume2 size={16} style={{ color: theme.primary }} />
            <span>Format Audio Dolby Atmos</span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
            AKTIF
          </span>
        </div>

        {/* Security & DRM */}
        <div
          onClick={() => onNavigate('settings')}
          className="p-3 rounded-2xl border border-white/10 bg-[#0F1713] flex items-center justify-between text-xs cursor-pointer hover:border-white/20"
        >
          <div className="flex items-center gap-2 text-slate-300">
            <Shield size={16} className="text-amber-400" />
            <span>Lisensi Widevine & Pengaturan Aplikasi</span>
          </div>
          <ChevronRight size={16} className="text-slate-400" />
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={onLogout}
        className="w-full py-3 rounded-2xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
      >
        <LogOut size={16} />
        <span>Keluar Dari Akun (Sign Out)</span>
      </button>
    </div>
  );
};
