import React, { useState } from 'react';
import { ScreenId, ThemeTokens, NotificationItem } from '../types';
import { Bell, Film, Download, CheckCircle2, ArrowLeft, CheckCheck } from 'lucide-react';

interface NotificationsScreenProps {
  notifications: NotificationItem[];
  onNavigate: (screen: ScreenId) => void;
  onMarkAllAsRead: () => void;
  theme: ThemeTokens;
  lowRamMode: boolean;
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  notifications,
  onNavigate,
  onMarkAllAsRead,
  theme,
  lowRamMode,
}) => {
  const [filter, setFilter] = useState<'all' | 'release' | 'account'>('all');

  const filtered = notifications.filter((n) => {
    if (filter === 'release') return n.type === 'release';
    if (filter === 'account') return n.type === 'account' || n.type === 'system';
    return true;
  });

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
              Notifikasi
            </h1>
            <span className="text-[11px] text-slate-400">
              Pembaruan rilis & sistem VIP
            </span>
          </div>
        </div>

        <button
          onClick={onMarkAllAsRead}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-emerald-400 transition-colors p-1"
        >
          <CheckCheck size={14} />
          <span>Tandai Dibaca</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-4">
        {[
          { id: 'all', label: 'Semua' },
          { id: 'release', label: 'Rilis Baru' },
          { id: 'account', label: 'Akun & Sistem' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`px-3 py-1 rounded-xl text-xs font-medium border transition-all ${
              filter === tab.id
                ? 'text-black font-semibold shadow-md'
                : 'text-slate-400 bg-white/[0.03] border-white/10 hover:text-white'
            }`}
            style={{
              backgroundColor: filter === tab.id ? theme.primary : undefined,
              borderColor: filter === tab.id ? theme.primary : undefined,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="flex flex-col gap-2.5">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`p-3.5 rounded-2xl border transition-all relative flex gap-3 ${
              item.isRead
                ? 'bg-[#0F1713]/60 border-white/5 opacity-80'
                : 'bg-[#0F1713] border-white/15'
            }`}
          >
            {/* Unread Glowing Dot */}
            {!item.isRead && (
              <span
                className="absolute top-3.5 right-3.5 w-2 h-2 rounded-full"
                style={{
                  backgroundColor: theme.primary,
                  boxShadow: `0 0 8px ${theme.primary}`,
                }}
              />
            )}

            {/* Icon */}
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/10"
              style={{ backgroundColor: theme.surface }}
            >
              {item.type === 'release' ? (
                <Film size={18} style={{ color: theme.primary }} />
              ) : item.type === 'system' ? (
                <Download size={18} className="text-sky-400" />
              ) : (
                <CheckCircle2 size={18} className="text-amber-400" />
              )}
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0 pr-4">
              <h3 className="text-xs font-bold text-white mb-0.5">
                {item.title}
              </h3>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {item.message}
              </p>
              <span className="text-[9px] text-slate-500 font-mono mt-1.5 block">
                {item.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
