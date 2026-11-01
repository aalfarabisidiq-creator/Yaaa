import React, { useState } from 'react';
import { ScreenId, ThemeTokens } from '../types';
import { calculatePasswordStrength } from '../utils/formatters';
import { ArrowLeft, User, Mail, Lock, Eye, EyeOff, ShieldCheck, Check } from 'lucide-react';

interface RegisterScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onLoginSuccess: () => void;
  theme: ThemeTokens;
  lowRamMode: boolean;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onNavigate,
  onLoginSuccess,
  theme,
  lowRamMode,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const pwdStrength = calculatePasswordStrength(password);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName || !email || !password) {
      setError('Lengkapi semua kolom formulir pendaftaran.');
      return;
    }

    if (!agreeTerms) {
      setError('Anda harus menyetujui Ketentuan Layanan.');
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
      {/* Top Header */}
      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={() => onNavigate('login')}
          className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 hover:border-white/20 transition-colors"
          style={{ backgroundColor: theme.surface }}
          aria-label="Kembali ke Login"
        >
          <ArrowLeft size={18} style={{ color: theme.textPrimary }} />
        </button>
        <div>
          <h2 className="text-sm font-bold" style={{ color: theme.textPrimary }}>
            Daftar Akun
          </h2>
          <span className="text-[10px] text-slate-400">Bergabung dengan PeTaNiFlix VIP</span>
        </div>
      </div>

      {/* Main Register Form */}
      <div className="my-auto py-3">
        <div className="mb-5">
          <h1
            className="text-2xl font-extrabold tracking-tight"
            style={{ color: theme.textPrimary }}
          >
            Buka Akses Sinema
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Nikmati tontonan berkualitas tinggi dengan lisensi studio terlengkap.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="flex flex-col gap-3.5">
          {/* Full Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-300">
              Nama Lengkap
            </label>
            <div
              className={`flex items-center gap-2 px-3.5 py-3 rounded-xl border transition-all ${
                lowRamMode ? 'bg-[#0F1713]' : 'bg-white/[0.04]'
              }`}
              style={{ borderColor: theme.borderGlass }}
            >
              <User size={16} className="text-slate-400" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Arya Sinema"
                className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-300">
              Alamat Email Aktif
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
                placeholder="nama@domain.com"
                className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-300">
              Kata Sandi Baru
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
                placeholder="Minimal 8 karakter"
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

            {/* Dynamic 4-segment Password Strength Bar */}
            {password.length > 0 && (
              <div className="mt-1 flex flex-col gap-1">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-slate-400">Kekuatan Sandi:</span>
                  <span style={{ color: pwdStrength.color }} className="font-semibold">
                    {pwdStrength.label}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-1.5 h-1.5">
                  {[1, 2, 3, 4].map((seg) => (
                    <div
                      key={seg}
                      className="rounded-full transition-all duration-300"
                      style={{
                        backgroundColor:
                          seg <= pwdStrength.score ? pwdStrength.color : 'rgba(255,255,255,0.1)',
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Terms checkbox */}
          <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-400 mt-1">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="hidden"
            />
            <span
              className={`w-4 h-4 mt-0.5 rounded flex items-center justify-center border shrink-0 transition-colors ${
                agreeTerms ? 'border-transparent text-black' : 'border-white/20'
              }`}
              style={{
                backgroundColor: agreeTerms ? theme.primary : 'transparent',
              }}
            >
              {agreeTerms && <Check size={12} strokeWidth={3} />}
            </span>
            <span className="leading-tight text-[11px]">
              Saya menyetujui Ketentuan Layanan, Kebijakan DRM Widevine, dan Privasi Pengguna PeTaNiFlix.
            </span>
          </label>

          {/* Submit */}
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
              'BUAT AKUN SEKARANG'
            )}
          </button>
        </form>
      </div>

      {/* Footer link */}
      <div className="text-center pt-2 pb-1 text-xs text-slate-400">
        <span>Sudah memiliki akun? </span>
        <button
          onClick={() => onNavigate('login')}
          className="font-bold hover:underline"
          style={{ color: theme.primary }}
        >
          Masuk Saja
        </button>
      </div>
    </div>
  );
};
