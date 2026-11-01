/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ScreenId,
  VisualDirection,
  MediaItem,
  Episode,
  NotificationItem,
  HistoryItem,
  UserProfile,
  AppSettings,
} from './types';
import {
  MOCK_MEDIA,
  CONTINUE_WATCHING_LIST,
  MOCK_NOTIFICATIONS,
  INITIAL_USER,
} from './data/mockData';
import { getVisualTheme } from './utils/formatters';

// Components
import { StudioHeader } from './components/StudioHeader';
import { DeviceFrame } from './components/DeviceFrame';
import { NavigationDock } from './components/NavigationDock';
import { FloatingDynamicPill } from './components/FloatingDynamicPill';
import { ArchitectureModal } from './components/ArchitectureModal';
import { AICinephileDrawer } from './components/AICinephileDrawer';

// Screens
import { SplashScreen } from './screens/SplashScreen';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { LoginScreen } from './screens/LoginScreen';
import { RegisterScreen } from './screens/RegisterScreen';
import { ForgotPasswordScreen } from './screens/ForgotPasswordScreen';
import { HomeScreen } from './screens/HomeScreen';
import { SearchScreen } from './screens/SearchScreen';
import { ExploreScreen } from './screens/ExploreScreen';
import { MovieDetailScreen } from './screens/MovieDetailScreen';
import { SeriesDetailScreen } from './screens/SeriesDetailScreen';
import { VideoPlayerScreen } from './screens/VideoPlayerScreen';
import { WatchlistScreen } from './screens/WatchlistScreen';
import { HistoryScreen } from './screens/HistoryScreen';
import { NotificationsScreen } from './screens/NotificationsScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { EmptyStateScreen } from './screens/EmptyStateScreen';
import { ErrorStateScreen } from './screens/ErrorStateScreen';

export default function App() {
  // Navigation & View States
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [visualDirection, setVisualDirection] = useState<VisualDirection>('emerald');
  const [isLandscape, setIsLandscape] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Mandatory login simulated

  // Modals
  const [isArchitectureOpen, setIsArchitectureOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);

  // App & Device Settings
  const [settings, setSettings] = useState<AppSettings>({
    lowRamMode: false, // Target 4GB Android fallback toggle
    defaultQuality: '4K UHD',
    wifiOnly: false,
    hardwareAcceleration: true,
    subtitleSize: 'Sedang',
    subtitleColor: '#FFE81F',
    subtitleBgOpacity: 0.5,
  });

  // Data States
  const [mediaList] = useState<MediaItem[]>(MOCK_MEDIA);
  const [continueWatching, setContinueWatching] = useState<HistoryItem[]>(CONTINUE_WATCHING_LIST);
  const [watchlistIds, setWatchlistIds] = useState<string[]>(['m1', 'm3', 'm4']);
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);

  // Active Selected Media
  const [selectedMedia, setSelectedMedia] = useState<MediaItem>(MOCK_MEDIA[0]);
  const [playingEpisode, setPlayingEpisode] = useState<Episode | undefined>(undefined);
  const [initialPlayTime, setInitialPlayTime] = useState<number>(2530);

  const theme = getVisualTheme(visualDirection);

  // Watchlist Actions
  const handleToggleWatchlist = (mediaId: string) => {
    setWatchlistIds((prev) =>
      prev.includes(mediaId) ? prev.filter((id) => id !== mediaId) : [...prev, mediaId]
    );
  };

  const handleRemoveFromWatchlist = (mediaId: string) => {
    setWatchlistIds((prev) => prev.filter((id) => id !== mediaId));
  };

  const handleAddToWatchlist = (mediaId: string) => {
    setWatchlistIds((prev) => (prev.includes(mediaId) ? prev : [...prev, mediaId]));
  };

  // Play Actions
  const handlePlayMedia = (media: MediaItem, resumeSeconds?: number) => {
    setSelectedMedia(media);
    setPlayingEpisode(undefined);
    setInitialPlayTime(resumeSeconds || 0);
    setCurrentScreen('video-player');
  };

  const handlePlayEpisode = (series: MediaItem, episode: Episode) => {
    setSelectedMedia(series);
    setPlayingEpisode(episode);
    setInitialPlayTime(0);
    setCurrentScreen('video-player');
  };

  const handleNavigate = (screen: ScreenId) => {
    if (screen === 'series-detail' && selectedMedia.type !== 'SERIES') {
      const series = mediaList.find((m) => m.type === 'SERIES') || mediaList[1];
      setSelectedMedia(series);
    }
    if (screen === 'movie-detail' && selectedMedia.type !== 'MOVIE') {
      const movie = mediaList.find((m) => m.type === 'MOVIE') || mediaList[0];
      setSelectedMedia(movie);
    }
    setCurrentScreen(screen);
  };

  const handleSelectMedia = (media: MediaItem) => {
    setSelectedMedia(media);
    if (media.type === 'SERIES') {
      setCurrentScreen('series-detail');
    } else {
      setCurrentScreen('movie-detail');
    }
  };

  // Notification Actions
  const handleMarkAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Clear History
  const handleClearHistory = () => {
    setContinueWatching([]);
  };

  // Settings update
  const handleUpdateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // Logout Action
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen('login');
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentScreen('home');
  };

  // Screens that should show Bottom Floating Navigation Dock
  const showNavDock =
    !isLandscape &&
    [
      'home',
      'explore',
      'search',
      'watchlist',
      'profile',
      'empty-state',
      'error-state',
    ].includes(currentScreen);

  // Screens that should show Top Dynamic Pill
  const showDynamicPill =
    !isLandscape &&
    currentScreen !== 'splash' &&
    currentScreen !== 'onboarding' &&
    currentScreen !== 'video-player';

  return (
    <div className="min-h-screen bg-[#030605] text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Studio Header Toolbar */}
      <StudioHeader
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        visualDirection={visualDirection}
        onChangeDirection={setVisualDirection}
        lowRamMode={settings.lowRamMode}
        onToggleLowRamMode={() =>
          handleUpdateSettings({ lowRamMode: !settings.lowRamMode })
        }
        isLandscape={isLandscape}
        onToggleOrientation={() => setIsLandscape(!isLandscape)}
        onOpenArchitecture={() => setIsArchitectureOpen(true)}
        onOpenAI={() => setIsAIOpen(true)}
        theme={theme}
      />

      {/* Main Interactive Stage */}
      <main className="flex-1 flex items-center justify-center relative p-2 md:p-6 overflow-hidden">
        {/* Dynamic Background Ambient Light */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[140px] opacity-15 pointer-events-none transition-all duration-700"
          style={{ backgroundColor: theme.primary }}
        />

        {/* Realistic Mobile Device Frame */}
        <DeviceFrame
          theme={theme}
          isLandscape={isLandscape}
          onToggleOrientation={() => setIsLandscape(!isLandscape)}
          lowRamMode={settings.lowRamMode}
          dynamicPill={
            showDynamicPill ? (
              <FloatingDynamicPill
                theme={theme}
                lowRamMode={settings.lowRamMode}
                onPillClick={() => setIsArchitectureOpen(true)}
              />
            ) : undefined
          }
        >
          {/* SCREEN ROUTER */}
          {currentScreen === 'splash' && (
            <SplashScreen
              onNavigate={setCurrentScreen}
              theme={theme}
              lowRamMode={settings.lowRamMode}
            />
          )}

          {currentScreen === 'onboarding' && (
            <OnboardingScreen
              onNavigate={setCurrentScreen}
              theme={theme}
              lowRamMode={settings.lowRamMode}
            />
          )}

          {currentScreen === 'login' && (
            <LoginScreen
              onNavigate={setCurrentScreen}
              onLoginSuccess={handleLoginSuccess}
              theme={theme}
              lowRamMode={settings.lowRamMode}
            />
          )}

          {currentScreen === 'register' && (
            <RegisterScreen
              onNavigate={setCurrentScreen}
              onLoginSuccess={handleLoginSuccess}
              theme={theme}
              lowRamMode={settings.lowRamMode}
            />
          )}

          {currentScreen === 'forgot-password' && (
            <ForgotPasswordScreen
              onNavigate={setCurrentScreen}
              theme={theme}
              lowRamMode={settings.lowRamMode}
            />
          )}

          {currentScreen === 'home' && (
            <HomeScreen
              onNavigate={setCurrentScreen}
              onSelectMedia={handleSelectMedia}
              onPlayMedia={handlePlayMedia}
              mediaList={mediaList}
              continueWatching={continueWatching}
              watchlistIds={watchlistIds}
              onToggleWatchlist={handleToggleWatchlist}
              unreadNotificationsCount={unreadCount}
              theme={theme}
              lowRamMode={settings.lowRamMode}
            />
          )}

          {currentScreen === 'search' && (
            <SearchScreen
              onNavigate={setCurrentScreen}
              onSelectMedia={handleSelectMedia}
              mediaList={mediaList}
              theme={theme}
              lowRamMode={settings.lowRamMode}
            />
          )}

          {currentScreen === 'explore' && (
            <ExploreScreen
              onNavigate={setCurrentScreen}
              onSelectMedia={handleSelectMedia}
              mediaList={mediaList}
              theme={theme}
              lowRamMode={settings.lowRamMode}
            />
          )}

          {currentScreen === 'movie-detail' && (
            <MovieDetailScreen
              media={selectedMedia}
              onNavigate={setCurrentScreen}
              onSelectMedia={handleSelectMedia}
              onPlayMedia={handlePlayMedia}
              watchlistIds={watchlistIds}
              onToggleWatchlist={handleToggleWatchlist}
              mediaList={mediaList}
              theme={theme}
              lowRamMode={settings.lowRamMode}
            />
          )}

          {currentScreen === 'series-detail' && (
            <SeriesDetailScreen
              series={selectedMedia}
              onNavigate={setCurrentScreen}
              onPlayEpisode={handlePlayEpisode}
              watchlistIds={watchlistIds}
              onToggleWatchlist={handleToggleWatchlist}
              theme={theme}
              lowRamMode={settings.lowRamMode}
            />
          )}

          {currentScreen === 'video-player' && (
            <VideoPlayerScreen
              media={selectedMedia}
              episode={playingEpisode}
              initialTimeSeconds={initialPlayTime}
              onNavigate={setCurrentScreen}
              theme={theme}
              lowRamMode={settings.lowRamMode}
              isLandscape={isLandscape}
              onToggleOrientation={() => setIsLandscape(!isLandscape)}
            />
          )}

          {currentScreen === 'watchlist' && (
            <WatchlistScreen
              onNavigate={setCurrentScreen}
              onSelectMedia={handleSelectMedia}
              onPlayMedia={handlePlayMedia}
              watchlistIds={watchlistIds}
              onRemoveFromWatchlist={handleRemoveFromWatchlist}
              onAddToWatchlist={handleAddToWatchlist}
              mediaList={mediaList}
              theme={theme}
              lowRamMode={settings.lowRamMode}
            />
          )}

          {currentScreen === 'history' && (
            <HistoryScreen
              historyList={continueWatching}
              onNavigate={setCurrentScreen}
              onPlayMedia={handlePlayMedia}
              onClearHistory={handleClearHistory}
              theme={theme}
              lowRamMode={settings.lowRamMode}
            />
          )}

          {currentScreen === 'notifications' && (
            <NotificationsScreen
              notifications={notifications}
              onNavigate={setCurrentScreen}
              onMarkAllAsRead={handleMarkAllNotificationsAsRead}
              theme={theme}
              lowRamMode={settings.lowRamMode}
            />
          )}

          {currentScreen === 'profile' && (
            <ProfileScreen
              user={user}
              onNavigate={setCurrentScreen}
              onLogout={handleLogout}
              theme={theme}
              lowRamMode={settings.lowRamMode}
            />
          )}

          {currentScreen === 'settings' && (
            <SettingsScreen
              settings={settings}
              onUpdateSettings={handleUpdateSettings}
              onNavigate={setCurrentScreen}
              theme={theme}
            />
          )}

          {currentScreen === 'empty-state' && (
            <EmptyStateScreen
              onNavigate={setCurrentScreen}
              theme={theme}
              lowRamMode={settings.lowRamMode}
            />
          )}

          {currentScreen === 'error-state' && (
            <ErrorStateScreen
              onNavigate={setCurrentScreen}
              theme={theme}
              lowRamMode={settings.lowRamMode}
            />
          )}

          {/* Floating Liquid Glass Bottom Navigation Dock */}
          {showNavDock && (
            <NavigationDock
              currentScreen={currentScreen}
              onNavigate={handleNavigate}
              theme={theme}
              lowRamMode={settings.lowRamMode}
            />
          )}
        </DeviceFrame>
      </main>

      {/* Architecture & Flutter Code Modal */}
      <ArchitectureModal
        isOpen={isArchitectureOpen}
        onClose={() => setIsArchitectureOpen(false)}
      />

      {/* PeTaNi AI Cinephile Drawer */}
      <AICinephileDrawer
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        theme={theme}
        mediaList={mediaList}
        onSelectMedia={handleSelectMedia}
      />
    </div>
  );
}
