import React from 'react';
import { ScreenId, ThemeTokens, AppSettings } from '../types';
import { ArrowLeft, Cpu, Wifi, Zap, Sliders, Type, ShieldCheck, Check } from 'lucide-react';

interface SettingsScreenProps {
  settings: AppSettings;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
  onNavigate: (screen: ScreenId) => void;
  theme: ThemeTokens;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  settings,
  onUpdateSettings,
  onNavigate,
  theme,
}) => {
  return (
    <div
      className="relative w-full h-full pb-24 overflow-y-auto select-none no-scrollbar p-4"
      style={{ backgroundColor: theme.canvas }}
    >
      {/* Top Header */}
      <div className="flex items-center gap-3 pt-1 pb-4">
        <button
          onClick={() => onNavigate('profile')}
          className="w-9 h-9 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white"
          aria-label="Kembali ke Profil"
        >
          <ArrowLeft size={16} />
        </button>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            Pengaturan Aplikasi
          </h1>
          <span className="text-[11px] text-slate-400">
            PeTaNiFlix Android v2.4.0
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {/* SECTION 1: PERFORMA & TAMPILAN (RAM 4GB CRITICAL REQUIREMENT) */}
        <div className="p-4 rounded-3xl border border-white/10 bg-[#0F1713] flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Cpu size={16} style={{ color: theme.primary }} />
            <h2 className="text-xs font-bold text-white uppercase tracking-wider">
              Performa & Efek Tampilan
            </h2>
          </div>

          {/* Low-RAM Toggle Card */}
          <div className="p-3 rounded-2xl bg-black/40 border border-white/10 flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-200 block">
                  Mode Hemat RAM (Target 4GB Android)
                </span>
                <span className="text-[10px] text-slate-400">
                  {settings.lowRamMode
                    ? 'Blur dinonaktifkan (Ganti solid tint hemat GPU)'
                    : 'Liquid glass & backdrop blur aktif penuh'}
                </span>
              </div>

              {/* Interactive Toggle Switch */}
              <button
                onClick={() => onUpdateSettings({ lowRamMode: !settings.lowRamMode })}
                className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                  settings.lowRamMode ? 'bg-emerald-500' : 'bg-white/20'
                }`}
                aria-label="Toggle Mode Hemat RAM 4GB"
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    settings.lowRamMode ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="text-[10px] text-slate-400 p-2 rounded-xl bg-white/[0.02] border border-white/5 leading-relaxed">
              💡 Rekomendasi: Aktifkan mode ini jika perangkat Anda memiliki RAM 4GB untuk mencegah frame drop dan menghemat daya baterai hingga 30%.
            </div>
          </div>
        </div>

        {/* SECTION 2: STREAMING & PEMUTARAN */}
        <div className="p-4 rounded-3xl border border-white/10 bg-[#0F1713] flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Sliders size={16} style={{ color: theme.primary }} />
            <h2 className="text-xs font-bold text-white uppercase tracking-wider">
              Streaming & Pemutaran Video
            </h2>
          </div>

          {/* Default Quality Selector */}
          <div className="flex items-center justify-between text-xs py-1">
            <span className="text-slate-300">Kualitas Streaming Default</span>
            <select
              value={settings.defaultQuality}
              onChange={(e) => onUpdateSettings({ defaultQuality: e.target.value as any })}
              className="bg-black/60 text-white text-xs border border-white/10 rounded-xl px-2.5 py-1.5 focus:outline-none"
            >
              <option value="Auto">Auto (Adaptive HLS)</option>
              <option value="4K UHD">4K Ultra HD (2160p)</option>
              <option value="1080p FHD">1080p Full HD</option>
              <option value="720p HD">720p HD</option>
              <option value="480p Data Saver">480p Hemat Data</option>
            </select>
          </div>

          {/* Wi-Fi only toggle */}
          <div className="flex items-center justify-between text-xs py-1 border-t border-white/5">
            <div className="flex items-center gap-2 text-slate-300">
              <Wifi size={15} />
              <span>Hanya Streaming di Jaringan Wi-Fi</span>
            </div>
            <button
              onClick={() => onUpdateSettings({ wifiOnly: !settings.wifiOnly })}
              className={`w-10 h-5 rounded-full transition-colors relative p-0.5 ${
                settings.wifiOnly ? 'bg-emerald-500' : 'bg-white/20'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  settings.wifiOnly ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Hardware acceleration toggle */}
          <div className="flex items-center justify-between text-xs py-1 border-t border-white/5">
            <div className="flex items-center gap-2 text-slate-300">
              <Zap size={15} />
              <span>Akselerasi Perangkat Keras (HW Decoders)</span>
            </div>
            <button
              onClick={() => onUpdateSettings({ hardwareAcceleration: !settings.hardwareAcceleration })}
              className={`w-10 h-5 rounded-full transition-colors relative p-0.5 ${
                settings.hardwareAcceleration ? 'bg-emerald-500' : 'bg-white/20'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  settings.hardwareAcceleration ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* SECTION 3: SUBTITLE & AUDIO STYLING */}
        <div className="p-4 rounded-3xl border border-white/10 bg-[#0F1713] flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Type size={16} style={{ color: theme.primary }} />
            <h2 className="text-xs font-bold text-white uppercase tracking-wider">
              Tampilan Subtitle
            </h2>
          </div>

          {/* Subtitle font size */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300">Ukuran Teks Subtitle</span>
            <div className="flex gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10">
              {(['Kecil', 'Sedang', 'Besar'] as const).map((sz) => (
                <button
                  key={sz}
                  onClick={() => onUpdateSettings({ subtitleSize: sz })}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                    settings.subtitleSize === sz
                      ? 'bg-emerald-500 text-black font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Subtitle Color */}
          <div className="flex items-center justify-between text-xs border-t border-white/5 pt-2">
            <span className="text-slate-300">Warna Font Subtitle</span>
            <div className="flex gap-2">
              {[
                { hex: '#FFE81F', label: 'Kuning Sinema' },
                { hex: '#FFFFFF', label: 'Putih Klasik' },
                { hex: '#00E676', label: 'Cyber Zamrud' },
              ].map((c) => (
                <button
                  key={c.hex}
                  onClick={() => onUpdateSettings({ subtitleColor: c.hex })}
                  className="w-6 h-6 rounded-full border-2 transition-transform flex items-center justify-center"
                  style={{
                    backgroundColor: c.hex,
                    borderColor: settings.subtitleColor === c.hex ? '#FFFFFF' : 'transparent',
                    transform: settings.subtitleColor === c.hex ? 'scale(1.15)' : 'scale(1)',
                  }}
                  title={c.label}
                >
                  {settings.subtitleColor === c.hex && (
                    <Check size={12} className={c.hex === '#FFFFFF' ? 'text-black' : 'text-black'} />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 4: TENTANG & HUKUM */}
        <div className="p-4 rounded-3xl border border-white/10 bg-[#0F1713] flex flex-col gap-2.5">
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck size={16} className="text-emerald-400" />
            <h2 className="text-xs font-bold text-white uppercase tracking-wider">
              Lisensi & DRM Widevine
            </h2>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            PeTaNiFlix mematuhi seluruh regulasi hak kekayaan intelektual (HAKI) dan hak siar digital internasional. Seluruh aliran video dilindungi dengan DRM Google Widevine Level L1 & modul enkripsi token AES-128.
          </p>
          <div className="flex justify-between items-center text-[10px] text-slate-500 pt-2 border-t border-white/5">
            <span>DRM ID: WV-L1-443318-ID</span>
            <span>Versi Klien: 2.4.0-flutter</span>
          </div>
        </div>
      </div>
    </div>
  );
};
