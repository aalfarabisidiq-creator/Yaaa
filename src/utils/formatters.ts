import { MediaItem, ThemeTokens, VisualDirection } from '../types';

export const THEMES: Record<VisualDirection, ThemeTokens> = {
  emerald: {
    name: 'Emerald Cyber-Glass (Utama)',
    canvas: '#080C0A',
    surface: '#0F1713',
    surfaceGlass: 'rgba(22, 36, 29, 0.65)',
    surfaceGlassFallback: '#121D17',
    primary: '#00E676',
    primaryLight: '#69f0ae',
    primaryGlow: 'rgba(0, 230, 118, 0.35)',
    secondary: '#10B981',
    accentStar: '#FFE81F',
    borderGlass: 'rgba(255, 255, 255, 0.12)',
    borderAccent: 'rgba(0, 230, 118, 0.30)',
    textPrimary: '#F1F5F3',
    textSecondary: '#8C9E94',
    pillGradient: 'from-emerald-500/20 via-emerald-400/10 to-transparent',
    ctaGradient: 'from-[#00E676] to-[#059669]',
  },
  cyan: {
    name: 'Obsidian Bioluminescence (IDLIX High-Octane)',
    canvas: '#04060A',
    surface: '#0B0F19',
    surfaceGlass: 'rgba(16, 24, 40, 0.70)',
    surfaceGlassFallback: '#0D1526',
    primary: '#00F0FF',
    primaryLight: '#80f8ff',
    primaryGlow: 'rgba(0, 240, 255, 0.35)',
    secondary: '#FFB300',
    accentStar: '#FFB300',
    borderGlass: 'rgba(255, 255, 255, 0.12)',
    borderAccent: 'rgba(0, 240, 255, 0.35)',
    textPrimary: '#FFFFFF',
    textSecondary: '#7C8BA1',
    pillGradient: 'from-cyan-500/20 via-sky-500/10 to-transparent',
    ctaGradient: 'from-[#00F0FF] to-[#0284c7]',
  },
  amethyst: {
    name: 'Eclipse Amethyst (Royal Velvet Hollywood)',
    canvas: '#07050A',
    surface: '#120E1C',
    surfaceGlass: 'rgba(28, 20, 43, 0.65)',
    surfaceGlassFallback: '#1A1329',
    primary: '#A855F7',
    primaryLight: '#d8b4fe',
    primaryGlow: 'rgba(168, 85, 247, 0.35)',
    secondary: '#F59E0B',
    accentStar: '#F59E0B',
    borderGlass: 'rgba(255, 255, 255, 0.14)',
    borderAccent: 'rgba(168, 85, 247, 0.35)',
    textPrimary: '#FAF5FF',
    textSecondary: '#A396B8',
    pillGradient: 'from-purple-500/20 via-violet-500/10 to-transparent',
    ctaGradient: 'from-[#A855F7] to-[#7c3aed]',
  },
};

export function getVisualTheme(direction: VisualDirection): ThemeTokens {
  return THEMES[direction] || THEMES.emerald;
}

export function formatDuration(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const pad = (num: number) => num.toString().padStart(2, '0');

  if (hrs > 0) {
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  }
  return `${pad(mins)}:${pad(secs)}`;
}

export function formatTimeMinutes(minutes: number): string {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hrs > 0) {
    return `${hrs}j ${mins}m`;
  }
  return `${mins}m`;
}

export function calculatePasswordStrength(password: string): {
  score: number; // 0 to 4
  label: string;
  color: string;
} {
  if (!password) return { score: 0, label: 'Kosong', color: '#64748b' };

  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  switch (score) {
    case 1:
      return { score: 1, label: 'Sangat Lemah', color: '#ef4444' };
    case 2:
      return { score: 2, label: 'Cukup', color: '#f59e0b' };
    case 3:
      return { score: 3, label: 'Kuat', color: '#10b981' };
    case 4:
      return { score: 4, label: 'Sangat Kuat (Cyber)', color: '#00E676' };
    default:
      return { score: 0, label: 'Terlalu Pendek', color: '#ef4444' };
  }
}

export function calculateResumeProgress(currentSeconds: number, totalSeconds: number): number {
  if (!totalSeconds || totalSeconds <= 0) return 0;
  const percent = Math.min(100, Math.max(0, Math.round((currentSeconds / totalSeconds) * 100)));
  return percent;
}

export function filterCatalog(
  items: MediaItem[],
  query: string,
  genre: string = 'Semua',
  typeFilter: string = 'Semua'
): MediaItem[] {
  const q = query.trim().toLowerCase();

  return items.filter((item) => {
    // Type match
    if (typeFilter === 'Film' && item.type !== 'MOVIE') return false;
    if (typeFilter === 'Series' && item.type !== 'SERIES') return false;
    if (typeFilter === '4K' && item.badge !== '4K HDR' && item.badge !== 'Dolby Vision') return false;

    // Genre match
    if (genre !== 'Semua' && !item.genres.includes(genre)) return false;

    // Query match
    if (!q) return true;
    const titleMatch = item.title.toLowerCase().includes(q);
    const synopsisMatch = item.synopsis.toLowerCase().includes(q);
    const castMatch = item.cast.some((c) => c.name.toLowerCase().includes(q));
    const genreMatch = item.genres.some((g) => g.toLowerCase().includes(q));

    return titleMatch || synopsisMatch || castMatch || genreMatch;
  });
}
