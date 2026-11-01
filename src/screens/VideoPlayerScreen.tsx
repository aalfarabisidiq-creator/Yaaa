import React, { useState, useRef, useEffect } from 'react';
import { ScreenId, ThemeTokens, MediaItem, Episode } from '../types';
import { formatDuration } from '../utils/formatters';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  ArrowLeft,
  Settings,
  MessageSquare,
  Lock,
  Unlock,
  Volume2,
  VolumeX,
  Sun,
  Maximize2,
  Minimize2,
  Check,
  X,
} from 'lucide-react';

interface VideoPlayerScreenProps {
  media: MediaItem;
  episode?: Episode;
  initialTimeSeconds?: number;
  onNavigate: (screen: ScreenId) => void;
  theme: ThemeTokens;
  lowRamMode: boolean;
  isLandscape: boolean;
  onToggleOrientation: () => void;
}

export const VideoPlayerScreen: React.FC<VideoPlayerScreenProps> = ({
  media,
  episode,
  initialTimeSeconds = 2530,
  onNavigate,
  theme,
  lowRamMode,
  isLandscape,
  onToggleOrientation,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(initialTimeSeconds);
  const totalDuration = episode ? episode.durationMinutes * 60 : (media.durationMinutes || 133) * 60;
  const [isLocked, setIsLocked] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Settings modals
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAudioSubOpen, setIsAudioSubOpen] = useState(false);

  // Video settings state
  const [selectedQuality, setSelectedQuality] = useState('4K (Auto)');
  const [playbackSpeed, setPlaybackSpeed] = useState('1.0x');
  const [selectedSubtitle, setSelectedSubtitle] = useState('Bahasa Indonesia');
  const [selectedAudio, setSelectedAudio] = useState('English [Original] (Dolby Atmos)');

  // Gestures
  const [brightness, setBrightness] = useState(85);
  const [volume, setVolume] = useState(80);
  const [gestureFeedback, setGestureFeedback] = useState<string | null>(null);
  const [doubleTapFeedback, setDoubleTapFeedback] = useState<'-10s' | '+10s' | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);

  // Progress ticker when playing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            return totalDuration;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, totalDuration]);

  // Auto-hide controls after 4 seconds of inactivity
  useEffect(() => {
    if (!showControls || !isPlaying || isLocked) return;
    const timeout = setTimeout(() => {
      setShowControls(false);
    }, 4500);
    return () => clearTimeout(timeout);
  }, [showControls, isPlaying, isLocked]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    setShowControls(true);
  };

  const seekRelative = (deltaSeconds: number) => {
    setCurrentTime((prev) => Math.max(0, Math.min(totalDuration, prev + deltaSeconds)));
    if (deltaSeconds < 0) {
      setDoubleTapFeedback('-10s');
    } else {
      setDoubleTapFeedback('+10s');
    }
    setTimeout(() => setDoubleTapFeedback(null), 800);
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(parseFloat(e.target.value));
  };

  const triggerGesture = (type: 'vol-up' | 'vol-down' | 'bright-up' | 'bright-down') => {
    if (type === 'vol-up') {
      setVolume((v) => Math.min(100, v + 10));
      setGestureFeedback(`Volume ${Math.min(100, volume + 10)}%`);
    } else if (type === 'vol-down') {
      setVolume((v) => Math.max(0, v - 10));
      setGestureFeedback(`Volume ${Math.max(0, volume - 10)}%`);
    } else if (type === 'bright-up') {
      setBrightness((b) => Math.min(100, b + 10));
      setGestureFeedback(`Kecerahan ${Math.min(100, brightness + 10)}%`);
    } else if (type === 'bright-down') {
      setBrightness((b) => Math.max(10, b - 10));
      setGestureFeedback(`Kecerahan ${Math.max(10, brightness - 10)}%`);
    }
    setTimeout(() => setGestureFeedback(null), 1200);
  };

  const displayTitle = episode
    ? `${media.title} • S${episode.seasonNumber}:E${episode.episodeNumber} "${episode.title}"`
    : media.title;

  return (
    <div
      className="relative w-full h-full bg-black select-none overflow-hidden flex flex-col justify-between"
      onClick={() => {
        if (!isLocked) setShowControls(!showControls);
      }}
    >
      {/* Actual HTML5 Video element */}
      <video
        ref={videoRef}
        src={episode ? episode.streamUrl : media.trailerUrl}
        loop
        playsInline
        muted={volume === 0}
        className="absolute inset-0 w-full h-full object-contain"
        style={{
          filter: `brightness(${brightness / 100})`,
        }}
      />

      {/* Double tap ripple animation overlay */}
      {doubleTapFeedback && (
        <div
          className={`absolute top-1/2 -translate-y-1/2 flex items-center justify-center p-6 rounded-full bg-black/60 backdrop-blur-sm border border-emerald-500/40 text-emerald-400 font-mono font-bold text-lg animate-ping z-30 pointer-events-none ${
            doubleTapFeedback === '-10s' ? 'left-12' : 'right-12'
          }`}
        >
          {doubleTapFeedback}
        </div>
      )}

      {/* Gesture Feedback HUD (Brightness/Volume) */}
      {gestureFeedback && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-40 px-4 py-2 rounded-2xl bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs font-semibold flex items-center gap-2 shadow-2xl pointer-events-none animate-in fade-in">
          {gestureFeedback.includes('Volume') ? <Volume2 size={16} /> : <Sun size={16} />}
          <span>{gestureFeedback}</span>
        </div>
      )}

      {/* Interactive Gesture Zones (Left = Brightness, Right = Volume, Double tap) */}
      <div className="absolute inset-0 z-10 grid grid-cols-2 pointer-events-auto">
        {/* Left Side: Brightness & Rewind */}
        <div
          className="h-full w-full"
          onDoubleClick={(e) => {
            e.stopPropagation();
            seekRelative(-10);
          }}
          title="Ketuk dua kali untuk mundur 10 detik. Usap untuk kecerahan."
        />

        {/* Right Side: Volume & Fast-forward */}
        <div
          className="h-full w-full"
          onDoubleClick={(e) => {
            e.stopPropagation();
            seekRelative(10);
          }}
          title="Ketuk dua kali untuk maju 10 detik. Usap untuk volume."
        />
      </div>

      {/* Video Subtitle Rendering */}
      {selectedSubtitle !== 'Nonaktif' && (
        <div className="absolute bottom-16 inset-x-8 z-20 flex justify-center pointer-events-none text-center">
          <span
            className="px-3 py-1 rounded-lg text-xs md:text-sm font-semibold tracking-wide"
            style={{
              color: '#FFE81F', // Cinema Gold Subtitle
              backgroundColor: 'rgba(0, 0, 0, 0.65)',
              textShadow: '0 2px 4px rgba(0,0,0,0.9)',
            }}
          >
            [Joshua]: "Kami menemukan sumber sinyal dari laboratorium tersembunyi..."
          </span>
        </div>
      )}

      {/* Lock Button (Always available in top-left or side) */}
      <div className="absolute top-4 left-4 z-40">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLocked(!isLocked);
          }}
          className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
            isLocked
              ? 'bg-amber-500/90 border-amber-400 text-black shadow-lg scale-110'
              : 'bg-black/60 border-white/20 text-white'
          }`}
          aria-label={isLocked ? 'Buka Kunci Layar' : 'Kunci Layar'}
        >
          {isLocked ? <Lock size={16} /> : <Unlock size={16} />}
        </button>
      </div>

      {/* TOP CONTROLS BAR (Overlay) */}
      {!isLocked && showControls && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative z-30 px-4 pt-3 pb-6 flex items-center justify-between bg-gradient-to-b from-black/85 via-black/40 to-transparent animate-in fade-in duration-200"
        >
          <div className="flex items-center gap-3 pl-10">
            <button
              onClick={() => onNavigate('movie-detail')}
              className="text-white hover:text-emerald-400 transition-colors"
              aria-label="Kembali"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex flex-col">
              <h2 className="text-xs md:text-sm font-bold text-white truncate max-w-[200px] md:max-w-md">
                {displayTitle}
              </h2>
              <span className="text-[10px] text-emerald-400 font-mono">
                {selectedQuality} • AV1 HDR
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Gesture Quick Shortcuts for Desktop / Mouse users */}
            <button
              onClick={() => triggerGesture('bright-up')}
              className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20"
              title="Kecerahan +"
              aria-label="Kecerahan +"
            >
              <Sun size={15} />
            </button>

            <button
              onClick={() => triggerGesture('vol-up')}
              className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20"
              title="Volume +"
              aria-label="Volume +"
            >
              <Volume2 size={15} />
            </button>

            {/* Subtitle & Audio Track button */}
            <button
              onClick={() => setIsAudioSubOpen(true)}
              className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20"
              title="Audio & Subtitle"
              aria-label="Audio & Subtitle"
            >
              <MessageSquare size={15} />
            </button>

            {/* Quality & Speed settings */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20"
              title="Pengaturan Kualitas"
              aria-label="Pengaturan Video"
            >
              <Settings size={15} />
            </button>

            {/* Orientation toggle */}
            <button
              onClick={onToggleOrientation}
              className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center hover:bg-emerald-500/30"
              title={isLandscape ? 'Mode Vertikal' : 'Putar Horizontal / Fullscreen'}
              aria-label="Putar Orientasi"
            >
              {isLandscape ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
            </button>
          </div>
        </div>
      )}

      {/* CENTER PLAY/PAUSE & REWIND/FORWARD */}
      {!isLocked && showControls && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative z-30 flex items-center justify-center gap-8 self-center animate-in zoom-in-95 duration-200"
        >
          {/* Rewind 10s */}
          <button
            onClick={() => seekRelative(-10)}
            className="flex flex-col items-center gap-1 text-white hover:text-emerald-400 transition-colors group"
            aria-label="Mundur 10 detik"
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-black/50 border border-white/20 group-hover:border-emerald-400 group-hover:scale-105 transition-all">
              <RotateCcw size={20} />
            </div>
            <span className="text-[10px] font-mono text-slate-300">10s</span>
          </button>

          {/* Big Play / Pause Button */}
          <button
            onClick={togglePlay}
            className="w-16 h-16 rounded-full flex items-center justify-center text-black transition-all hover:scale-105 active:scale-95 shadow-2xl"
            style={{
              backgroundColor: theme.primary,
              boxShadow: `0 0 32px ${theme.primaryGlow}`,
            }}
            aria-label={isPlaying ? 'Jeda Video' : 'Putar Video'}
          >
            {isPlaying ? (
              <Pause size={28} className="fill-black" />
            ) : (
              <Play size={28} className="fill-black ml-1" />
            )}
          </button>

          {/* Forward 10s */}
          <button
            onClick={() => seekRelative(10)}
            className="flex flex-col items-center gap-1 text-white hover:text-emerald-400 transition-colors group"
            aria-label="Maju 10 detik"
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-black/50 border border-white/20 group-hover:border-emerald-400 group-hover:scale-105 transition-all">
              <RotateCw size={20} />
            </div>
            <span className="text-[10px] font-mono text-slate-300">10s</span>
          </button>
        </div>
      )}

      {/* BOTTOM TIMELINE & PROGRESS BAR (Overlay) */}
      {!isLocked && showControls && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative z-30 px-4 pt-4 pb-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-2 animate-in fade-in duration-200"
        >
          {/* Seeker Slider */}
          <div className="relative w-full flex items-center group">
            {/* Buffered line simulation */}
            <div className="absolute inset-x-0 h-1 rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-white/30"
                style={{ width: `${Math.min(100, (currentTime / totalDuration) * 100 + 20)}%` }}
              />
            </div>

            <input
              type="range"
              min={0}
              max={totalDuration}
              value={currentTime}
              onChange={handleSeekChange}
              className="w-full h-1.5 appearance-none bg-transparent cursor-pointer z-10 accent-emerald-400"
            />
          </div>

          {/* Time & Resolution info */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-300">
            <span>{formatDuration(currentTime)}</span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                {selectedQuality}
              </span>
              <span className="text-slate-400">/ {formatDuration(totalDuration)}</span>
            </div>
          </div>
        </div>
      )}

      {/* AUDIO & SUBTITLE MODAL (Glass Sheet) */}
      {isAudioSubOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
        >
          <div
            className={`w-full max-w-sm rounded-3xl p-5 border shadow-2xl ${
              lowRamMode ? 'bg-[#0F1713]' : 'bg-[#0F1713]/95 backdrop-blur-md'
            }`}
            style={{ borderColor: theme.borderGlass }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <MessageSquare size={16} style={{ color: theme.primary }} />
                Audio & Subtitle
              </h3>
              <button
                onClick={() => setIsAudioSubOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Audio Track */}
            <div className="mb-4">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Audio Stream (Dolby Atmos)
              </span>
              <div className="flex flex-col gap-1.5">
                {[
                  'English [Original] (Dolby Atmos)',
                  'Bahasa Indonesia (Dubbing Resmi)',
                  'Japanese (Surround 5.1)',
                ].map((audio) => (
                  <button
                    key={audio}
                    onClick={() => setSelectedAudio(audio)}
                    className={`p-2.5 rounded-xl border text-left text-xs font-medium flex items-center justify-between transition-all ${
                      selectedAudio === audio
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300'
                        : 'border-white/10 text-slate-300'
                    }`}
                  >
                    <span>{audio}</span>
                    {selectedAudio === audio && <Check size={14} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Subtitle */}
            <div className="mb-5">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Pilihan Subtitle
              </span>
              <div className="flex flex-col gap-1.5">
                {[
                  'Bahasa Indonesia',
                  'English [CC]',
                  'Nonaktif',
                ].map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setSelectedSubtitle(sub)}
                    className={`p-2.5 rounded-xl border text-left text-xs font-medium flex items-center justify-between transition-all ${
                      selectedSubtitle === sub
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300'
                        : 'border-white/10 text-slate-300'
                    }`}
                  >
                    <span>{sub}</span>
                    {selectedSubtitle === sub && <Check size={14} />}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setIsAudioSubOpen(false)}
              className="w-full py-2.5 rounded-xl font-bold text-xs text-black"
              style={{
                backgroundImage: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
              }}
            >
              Simpan Pengaturan
            </button>
          </div>
        </div>
      )}

      {/* VIDEO QUALITY & SPEED MODAL */}
      {isSettingsOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
        >
          <div
            className={`w-full max-w-sm rounded-3xl p-5 border shadow-2xl ${
              lowRamMode ? 'bg-[#0F1713]' : 'bg-[#0F1713]/95 backdrop-blur-md'
            }`}
            style={{ borderColor: theme.borderGlass }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Settings size={16} style={{ color: theme.primary }} />
                Kualitas Aliran & Kecepatan
              </h3>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Quality Picker */}
            <div className="mb-4">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Kualitas Streaming (HLS)
              </span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  '4K (Auto)',
                  '2160p (UHD)',
                  '1080p (FHD)',
                  '720p (HD)',
                  '480p (Hemat Data)',
                ].map((q) => (
                  <button
                    key={q}
                    onClick={() => setSelectedQuality(q)}
                    className={`p-2 rounded-xl border text-center text-xs font-medium transition-all ${
                      selectedQuality === q
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300'
                        : 'border-white/10 text-slate-300'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Speed Picker */}
            <div className="mb-5">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Kecepatan Pemutaran
              </span>
              <div className="flex gap-2">
                {['0.75x', '1.0x', '1.25x', '1.5x'].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setPlaybackSpeed(spd)}
                    className={`flex-1 py-1.5 rounded-lg border text-center text-xs font-medium transition-all ${
                      playbackSpeed === spd
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 font-bold'
                        : 'border-white/10 text-slate-300'
                    }`}
                  >
                    {spd}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setIsSettingsOpen(false)}
              className="w-full py-2.5 rounded-xl font-bold text-xs text-black"
              style={{
                backgroundImage: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
              }}
            >
              Terapkan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
