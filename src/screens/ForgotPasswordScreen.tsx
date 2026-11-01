import React, { useState } from 'react';
import { ScreenId, ThemeTokens } from '../types';
import { ArrowLeft, KeyRound, Mail, CheckCircle2 } from 'lucide-react';

interface ForgotPasswordScreenProps {
  onNavigate: (screen: ScreenId) => void;
  theme: ThemeTokens;
  lowRamMode: boolean;
}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  onNavigate,
  theme,
  lowRamMode,
}) => {
  const [email, setEmail] = useState('arya.sinema@petaniflix.id');
  const [step, setStep] = useState<'request' | 'otp' | 'success'>('request');
  const [otp, setOtp] = useState(['4', '8', '2', '', '', '']);
  const [countdown, setCountdown] = useState(58);

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
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
            Pemulihan Akun
          </h2>
          <span className="text-[10px] text-slate-400">Atur Ulang Kata Sandi</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="my-auto py-4 flex flex-col items-center text-center">
        {/* Visual Icon with Liquid Glass border */}
        <div
          className={`w-20 h-20 rounded-3xl flex items-center justify-center border shadow-xl mb-6 ${
            lowRamMode ? 'bg-[#121D17]' : 'backdrop-blur-md'
          }`}
          style={{
            backgroundColor: theme.surfaceGlass,
            borderColor: theme.borderAccent,
            boxShadow: `0 12px 30px ${theme.primaryGlow}`,
          }}
        >
          {step === 'success' ? (
            <CheckCircle2 size={36} style={{ color: theme.primary }} />
          ) : (
            <KeyRound size={36} style={{ color: theme.primary }} />
          )}
        </div>

        {step === 'request' && (
          <div className="w-full">
            <h1
              className="text-2xl font-bold tracking-tight mb-2"
              style={{ color: theme.textPrimary }}
            >
              Lupa Kata Sandi?
            </h1>
            <p className="text-xs text-slate-400 mb-6 max-w-xs mx-auto">
              Masukkan alamat email yang terdaftar. Kami akan mengirimkan 6-digit kode verifikasi pemulihan akun.
            </p>

            <form onSubmit={handleSendCode} className="flex flex-col gap-4 text-left">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Email Terdaftar
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

              <button
                type="submit"
                className="w-full mt-2 py-3.5 rounded-2xl font-bold text-sm text-black flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                  boxShadow: `0 8px 24px ${theme.primaryGlow}`,
                }}
              >
                KIRIM KODE VERIFIKASI
              </button>
            </form>
          </div>
        )}

        {step === 'otp' && (
          <div className="w-full">
            <h1
              className="text-2xl font-bold tracking-tight mb-2"
              style={{ color: theme.textPrimary }}
            >
              Masukkan Kode OTP
            </h1>
            <p className="text-xs text-slate-400 mb-6 max-w-xs mx-auto">
              Kode 6-digit telah dikirim ke <span className="text-white font-medium">{email}</span>.
            </p>

            <form onSubmit={handleVerifyOtp} className="flex flex-col gap-5">
              {/* 6 Digit Glass Boxes */}
              <div className="flex justify-center gap-2">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const newOtp = [...otp];
                      newOtp[idx] = e.target.value;
                      setOtp(newOtp);
                    }}
                    className={`w-11 h-12 rounded-xl text-center font-mono text-lg font-bold border transition-all ${
                      lowRamMode ? 'bg-[#0F1713]' : 'bg-white/[0.06] backdrop-blur-sm'
                    } text-white focus:outline-none`}
                    style={{
                      borderColor: digit ? theme.primary : theme.borderGlass,
                      boxShadow: digit ? `0 0 10px ${theme.primaryGlow}` : undefined,
                    }}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 px-2">
                <span>Kirim ulang kode dalam:</span>
                <span className="font-mono text-emerald-400 font-semibold">{countdown}s</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl font-bold text-sm text-black flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                  boxShadow: `0 8px 24px ${theme.primaryGlow}`,
                }}
              >
                VERIFIKASI & ATUR KATA SANDI
              </button>
            </form>
          </div>
        )}

        {step === 'success' && (
          <div className="w-full">
            <h1
              className="text-2xl font-bold tracking-tight mb-2"
              style={{ color: theme.textPrimary }}
            >
              Kata Sandi Berhasil Diperbarui
            </h1>
            <p className="text-xs text-slate-400 mb-6 max-w-xs mx-auto">
              Akun Anda kini aman. Silakan masuk kembali dengan kredensial baru Anda.
            </p>

            <button
              onClick={() => onNavigate('login')}
              className="w-full py-3.5 rounded-2xl font-bold text-sm text-black flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg"
              style={{
                backgroundImage: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                boxShadow: `0 8px 24px ${theme.primaryGlow}`,
              }}
            >
              KEMBALI KE LOGIN
            </button>
          </div>
        )}
      </div>

      {/* Footer Support */}
      <div className="text-center pt-2 pb-1 text-xs text-slate-500">
        Kendala verifikasi?{' '}
        <span className="text-slate-400 hover:text-white cursor-pointer underline">
          Hubungi Tim Dukungan PeTaNiFlix
        </span>
      </div>
    </div>
  );
};
