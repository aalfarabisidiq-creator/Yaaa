export type VisualDirection = 'emerald' | 'cyan' | 'amethyst';

export type ScreenId =
  | 'splash'
  | 'onboarding'
  | 'login'
  | 'register'
  | 'forgot-password'
  | 'home'
  | 'search'
  | 'explore'
  | 'movie-detail'
  | 'series-detail'
  | 'video-player'
  | 'watchlist'
  | 'history'
  | 'notifications'
  | 'profile'
  | 'settings'
  | 'empty-state'
  | 'error-state';

export interface CastMember {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
}

export interface Episode {
  id: string;
  seasonNumber: number;
  episodeNumber: number;
  title: string;
  synopsis: string;
  durationMinutes: number;
  thumbnailUrl: string;
  streamUrl: string;
  progressPercent?: number;
}

export interface MediaItem {
  id: string;
  title: string;
  slug: string;
  type: 'MOVIE' | 'SERIES';
  synopsis: string;
  releaseYear: number;
  ratingImdb: number;
  contentRating: string; // PG-13, 18+, TV-MA
  durationMinutes?: number;
  posterUrl: string;
  backdropUrl: string;
  trailerUrl?: string;
  streamManifestUrl?: string;
  isFeatured?: boolean;
  isTrending?: boolean;
  isLatest?: boolean;
  isTopRated?: boolean;
  genres: string[];
  cast: CastMember[];
  director?: string;
  seasonsCount?: number;
  episodes?: Episode[];
  badge?: string; // 4K HDR, Dolby Vision, New
  licenseInfo?: string;
}

export interface NotificationItem {
  id: string;
  type: 'release' | 'account' | 'system';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  imageUrl?: string;
}

export interface HistoryItem {
  id: string;
  media: MediaItem;
  episode?: Episode;
  watchedDate: 'Hari Ini' | 'Kemarin' | 'Minggu Lalu';
  progressSeconds: number;
  totalSeconds: number;
  progressPercent: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  tier: 'VIP CINEMA' | 'STANDARD' | 'FREE TIER';
  watchHours: number;
  completedTitles: number;
  offlineStorageUsedGb: number;
  offlineStorageTotalGb: number;
  profiles: { id: string; name: string; avatar: string; isKids: boolean }[];
}

export interface AppSettings {
  lowRamMode: boolean; // RAM 4GB optimization (disables heavy blur)
  defaultQuality: 'Auto' | '4K UHD' | '1080p FHD' | '720p HD' | '480p Data Saver';
  wifiOnly: boolean;
  hardwareAcceleration: boolean;
  subtitleSize: 'Kecil' | 'Sedang' | 'Besar';
  subtitleColor: string;
  subtitleBgOpacity: number;
}

export interface ThemeTokens {
  name: string;
  canvas: string;
  surface: string;
  surfaceGlass: string;
  surfaceGlassFallback: string;
  primary: string;
  primaryLight: string;
  primaryGlow: string;
  secondary: string;
  accentStar: string;
  borderGlass: string;
  borderAccent: string;
  textPrimary: string;
  textSecondary: string;
  pillGradient: string;
  ctaGradient: string;
}
