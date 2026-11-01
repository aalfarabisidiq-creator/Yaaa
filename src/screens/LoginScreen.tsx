import React, { useState } from 'react';
import { ScreenId, ThemeTokens } from '../types';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Check, AlertCircle } from 'lucide-react';

interface LoginScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onLoginSuccess: () => void;
  theme: ThemeTokens;
  lowRamMode: boolean;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onNavigate,
  onLoginSuccess,
  theme,
  lowRamMode,
}) => {
  const [email, setEmail] = useState('arya.sinema@petaniflix.id');
  const [password, setPassword] = useState('Petani2024*');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Harap isi alamat email dan kata sandi lengkap.');
      return;
    }

    if (!email.includes('@')) {
      setErrorMessage('Format email tidak valid.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
      onNavigate('home');
    }, 700);
  };

  return (
    <div
      className="relative w-full h-full flex flex-col justify-between p-6 select-none overflow-y-auto"
      style={{ backgroundColor: theme.canvas }}
    >
      {/* Top Bar with Back Button */}
      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={() => onNavigate('onboarding')}
          className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 hover:border-white/20 transition-colors"
          style={{ backgroundColor: theme.surface }}
          aria-label="Kembali ke Onboarding"
        >
          <ArrowLeft size={18} style={{ color: theme.textPrimary }} />
        </button>
        <div>
          <h2 className="text-sm font-bold" style={{ color: theme.textPrimary }}>
            Masuk Akun
          </h2>
          <span className="text-[10px] text-slate-400">Otentikasi Wajib PeTaNiFlix</span>
        </div>
      </div>

      {/* Main Form Content */}
      <div className="my-auto py-4">
        <div className="mb-6">
          <h1
            className="text-2xl font-extrabold tracking-tight"
            style={{ color: theme.textPrimary }}
          >
            Selamat Datang Kembali
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Masuk untuk sinkronisasi riwayat tontonan, unduhan 4K, dan profil keluarga.
          </p>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-xs text-red-400">
            <AlertCircle size={14} className="shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-300">
              Email atau Nama Pengguna
            </label>
            <div
              className={`flex items-center gap-2 px-3.5 py-3 rounded-xl border transition-all ${
                lowRamMode ? 'bg-[#0F1713]' : 'bg-white/[0.04]'
              }`}
              style={{ borderColor: theme.borderGlass }}
            >
              <Mail size={16} className="text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Password input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-300">
              Kata Sandi
            </label>
            <div
              className={`flex items-center gap-2 px-3.5 py-3 rounded-xl border transition-all ${
                lowRamMode ? 'bg-[#0F1713]' : 'bg-white/[0.04]'
              }`}
              style={{ borderColor: theme.borderGlass }}
            >
              <Lock size={16} className="text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-white"
                aria-label="Tampilkan atau sembunyikan kata sandi"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Remember me & Forgot Password */}
          <div className="flex justify-between items-center text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-slate-300">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="hidden"
              />
              <span
                className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                  rememberMe ? 'border-transparent text-black' : 'border-white/20'
                }`}
                style={{
                  backgroundColor: rememberMe ? theme.primary : 'transparent',
                }}
              >
                {rememberMe && <Check size={12} strokeWidth={3} />}
              </span>
              <span>Ingat Saya</span>
            </label>

            <button
              type="button"
              onClick={() => onNavigate('forgot-password')}
              className="text-xs hover:underline"
              style={{ color: theme.primary }}
            >
              Lupa Kata Sandi?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3.5 rounded-2xl font-bold text-sm text-black flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg"
            style={{
              backgroundImage: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
              boxShadow: `0 8px 24px ${theme.primaryGlow}`,
            }}
          >
            {isLoading ? (
              <span className="inline-block w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              'MASUK KE AKUN'
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="h-[1px] flex-1 bg-white/10" />
          <span className="text-[10px] uppercase tracking-wider text-slate-500">
            atau masuk dengan
          </span>
          <div className="h-[1px] flex-1 bg-white/10" />
        </div>

        {/* Social SSO buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => {
                setIsLoading(false);
                onLoginSuccess();
                onNavigate('home');
              }, 600);
            }}
            className="py-2.5 px-3 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] text-xs font-medium text-slate-200 flex items-center justify-center gap-2 transition-colors"
          >
            <span className="font-bold text-sm text-red-400">G</span> Google
          </button>
          <button
            type="button"
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => {
                setIsLoading(false);
                onLoginSuccess();
                onNavigate('home');
              }, 600);
            }}
            className="py-2.5 px-3 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] text-xs font-medium text-slate-200 flex items-center justify-center gap-2 transition-colors"
          >
            <span className="font-bold text-sm text-emerald-400">P</span> PeTaNi SSO
          </button>
        </div>
      </div>

      {/* Footer Register prompt */}
      <div className="text-center pt-2 pb-1 text-xs text-slate-400">
        <span>Belum memiliki akun PeTaNiFlix? </span>
        <button
          onClick={() => onNavigate('register')}
          className="font-bold hover:underline"
          style={{ color: theme.primary }}
        >
          Daftar Sekarang
        </button>
      </div>
    </div>
  );
};
