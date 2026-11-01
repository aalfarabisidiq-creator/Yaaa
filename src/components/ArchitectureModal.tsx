import React, { useState } from 'react';
import { X, Code2, Database, Palette, Cpu, FileText, Check, Copy } from 'lucide-react';
import { THEMES } from '../utils/formatters';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'flutter' | 'database' | 'design-system' | 'visual-alternatives'>('visual-alternatives');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const flutterCodeSnippet = `// lib/widgets/liquid_glass_pill.dart
import 'dart:ui';
import 'package:flutter/material.dart';

class AppPerformanceConfig {
  static bool isLowEndHardware = false; // Terdeteksi via RAM <= 4GB
}

class LiquidGlassPill extends StatelessWidget {
  final Widget child;
  final EdgeInsetsGeometry padding;
  final VoidCallback? onTap;

  const LiquidGlassPill({
    Key? key,
    required this.child,
    this.padding = const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
    this.onTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final bool useBlur = !AppPerformanceConfig.isLowEndHardware;

    Widget pillContent = Container(
      padding: padding,
      decoration: BoxDecoration(
        color: useBlur 
            ? const Color(0xFF16241D).withOpacity(0.65)
            : const Color(0xFF121D17).withOpacity(0.95), // Fallback hemat GPU RAM 4GB
        borderRadius: BorderRadius.circular(24),
        border: Border.all(
          color: const Color(0xFF00E676).withOpacity(0.25),
          width: 1.0,
        ),
        boxShadow: [
          BoxShadow(
            color: const Color(0xFF00E676).withOpacity(0.12),
            blurRadius: 16,
            spreadRadius: -2,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: child,
    );

    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(24),
      child: useBlur
          ? RepaintBoundary(
              child: ClipRRect(
                borderRadius: BorderRadius.circular(24),
                child: BackdropFilter(
                  filter: ImageFilter.blur(sigmaX: 8.0, sigmaY: 8.0),
                  child: pillContent,
                ),
              ),
            )
          : pillContent,
    );
  }
}

// lib/widgets/liquid_navbar_dock.dart
class LiquidNavBarDock extends StatelessWidget {
  final int currentIndex;
  final Function(int) onTabSelected;

  const LiquidNavBarDock({
    Key? key,
    required this.currentIndex,
    required this.onTabSelected,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return RepaintBoundary(
      child: Container(
        margin: const EdgeInsets.only(left: 20, right: 20, bottom: 20),
        height: 64,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(32),
          gradient: LinearGradient(
            colors: [Colors.white.withOpacity(0.15), Colors.white.withOpacity(0.02)],
          ),
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(32),
          child: BackdropFilter(
            filter: ImageFilter.blur(
              sigmaX: AppPerformanceConfig.isLowEndHardware ? 0 : 10,
              sigmaY: AppPerformanceConfig.isLowEndHardware ? 0 : 10,
            ),
            child: Container(
              color: const Color(0xFF0F1713).withOpacity(0.75),
              // Nav items Row implementation...
            ),
          ),
        ),
      ),
    );
  }
}`;

  const postgresSqlSnippet = `-- TABEL USERS & OTENTIKASI WAJIB
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    avatar_url TEXT,
    tier_subscription VARCHAR(20) DEFAULT 'VIP_MEMBER',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- TABEL MEDIA (FILM & SERIAL IDLIX HYBRID)
CREATE TABLE media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    type VARCHAR(10) NOT NULL CHECK (type IN ('MOVIE', 'SERIES')),
    synopsis TEXT,
    release_year INT,
    rating_imdb NUMERIC(3, 1),
    content_rating VARCHAR(10),
    poster_url TEXT NOT NULL,
    backdrop_url TEXT NOT NULL,
    trailer_url TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    drm_content_id VARCHAR(100), -- ID Widevine DRM
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- TABEL EPISODE SERIAL
CREATE TABLE episodes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    media_id UUID REFERENCES media(id) ON DELETE CASCADE,
    season_number INT NOT NULL,
    episode_number INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    synopsis TEXT,
    duration_seconds INT NOT NULL,
    thumbnail_url TEXT,
    stream_manifest_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- TABEL RIWAYAT TONTONAN & PROGRESS
CREATE TABLE watch_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    media_id UUID REFERENCES media(id) ON DELETE CASCADE,
    episode_id UUID REFERENCES episodes(id) ON DELETE SET NULL,
    last_position_seconds INT NOT NULL DEFAULT 0,
    total_duration_seconds INT NOT NULL DEFAULT 0,
    is_finished BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, media_id, episode_id)
);`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-4xl max-h-[90vh] rounded-[32px] border border-white/20 bg-[#0A0E0C] shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Code2 size={20} className="text-emerald-400" />
              Cetak Biru Arsitektur & Flutter Code PeTaNiFlix
            </h2>
            <p className="text-xs text-slate-400">
              Dokumentasi sistematis Flutter (Android RAM 4GB), PostgreSQL DB, & 3 Arah Visual
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Tutup modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tabs Bar */}
        <div className="flex border-b border-white/10 px-5 bg-black/40 gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'visual-alternatives', label: '3 Alternatif Arah Visual', icon: Palette },
            { id: 'flutter', label: 'Flutter Widgets (RAM 4GB)', icon: Code2 },
            { id: 'database', label: 'PostgreSQL DB & Node.js API', icon: Database },
            { id: 'design-system', label: 'Design Tokens & Legal DRM', icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
                  isActive
                    ? 'border-emerald-400 text-emerald-400'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1 font-sans text-xs">
          {activeTab === 'visual-alternatives' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Alt 1 */}
                <div className="p-4 rounded-2xl border border-emerald-500/40 bg-emerald-950/20 flex flex-col justify-between">
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-400 text-black inline-block mb-2">
                      TERPILIH UTAMA
                    </span>
                    <h3 className="text-sm font-bold text-white">1. Emerald Cyber-Glass</h3>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Fusi modern agrotech cinema, obsidian green (#080C0A) dengan aksen zamrud neon (#00E676) dan frosted glass.
                    </p>
                    <div className="mt-3 flex gap-1.5">
                      <span className="w-6 h-6 rounded-lg bg-[#080C0A] border border-white/20" title="Canvas" />
                      <span className="w-6 h-6 rounded-lg bg-[#00E676]" title="Primary Accent" />
                      <span className="w-6 h-6 rounded-lg bg-[#FFE81F]" title="Star Accent" />
                    </div>
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono mt-4">
                    Optimasi 4GB: Solid #121D17 fallback
                  </div>
                </div>

                {/* Alt 2 */}
                <div className="p-4 rounded-2xl border border-sky-500/30 bg-sky-950/20 flex flex-col justify-between">
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-400 text-black inline-block mb-2">
                      ALTERNATIF 2
                    </span>
                    <h3 className="text-sm font-bold text-white">2. Obsidian Bioluminescence</h3>
                    <p className="text-[11px] text-slate-400 mt-1">
                      IDLIX High-Octane Deep Space, kontras tinggi Midnight (#04060A) dengan pendaran neon cyan (#00F0FF) dan solar amber (#FFB300).
                    </p>
                    <div className="mt-3 flex gap-1.5">
                      <span className="w-6 h-6 rounded-lg bg-[#04060A] border border-white/20" title="Canvas" />
                      <span className="w-6 h-6 rounded-lg bg-[#00F0FF]" title="Primary Cyan" />
                      <span className="w-6 h-6 rounded-lg bg-[#FFB300]" title="Solar Amber" />
                    </div>
                  </div>
                  <div className="text-[10px] text-sky-400 font-mono mt-4">
                    Edge-to-edge docked navbar
                  </div>
                </div>

                {/* Alt 3 */}
                <div className="p-4 rounded-2xl border border-purple-500/30 bg-purple-950/20 flex flex-col justify-between">
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-400 text-black inline-block mb-2">
                      ALTERNATIF 3
                    </span>
                    <h3 className="text-sm font-bold text-white">3. Eclipse Amethyst</h3>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Royal Velvet Hollywood, nuansa violet malam (#07050A) dipadu satin frosted glow ungu neon (#A855F7) dan champagne gold (#F59E0B).
                    </p>
                    <div className="mt-3 flex gap-1.5">
                      <span className="w-6 h-6 rounded-lg bg-[#07050A] border border-white/20" title="Canvas" />
                      <span className="w-6 h-6 rounded-lg bg-[#A855F7]" title="Purple Accent" />
                      <span className="w-6 h-6 rounded-lg bg-[#F59E0B]" title="Champagne Gold" />
                    </div>
                  </div>
                  <div className="text-[10px] text-purple-400 font-mono mt-4">
                    Elastic damping spring curves
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'flutter' && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-400 text-[11px]">
                  Kode Widget Produksi Flutter (Liquid Glass Pill + Low-RAM Fallback):
                </span>
                <button
                  onClick={() => copyToClipboard(flutterCodeSnippet)}
                  className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 hover:text-emerald-300"
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copied ? 'Disalin' : 'Salin Kode'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-2xl bg-black/70 border border-white/10 font-mono text-[11px] text-emerald-300 overflow-x-auto">
                {flutterCodeSnippet}
              </pre>
            </div>
          )}

          {activeTab === 'database' && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-400 text-[11px]">
                  PostgreSQL Master Relational Schema (Node.js API Gateway):
                </span>
                <button
                  onClick={() => copyToClipboard(postgresSqlSnippet)}
                  className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 hover:text-emerald-300"
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copied ? 'Disalin' : 'Salin SQL'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-2xl bg-black/70 border border-white/10 font-mono text-[11px] text-sky-300 overflow-x-auto">
                {postgresSqlSnippet}
              </pre>
            </div>
          )}

          {activeTab === 'design-system' && (
            <div className="space-y-4 text-slate-300 text-xs">
              <div className="p-4 rounded-2xl border border-white/10 bg-black/40">
                <h4 className="font-bold text-white mb-2">Perlindungan Legal, Lisensi, dan DRM</h4>
                <ul className="list-disc pl-5 space-y-1 text-slate-400 text-[11px]">
                  <li>
                    <strong className="text-white">Widevine Modular DRM (Level L1):</strong> Menggunakan Hardware Security Module (TEE) pada chipset Android untuk menjamin pemutaran resolusi 4K tanpa risiko perekaman layar atau dump berkas.
                  </li>
                  <li>
                    <strong className="text-white">Tokenized HLS URLs:</strong> Manifest .m3u8 dienkripsi dengan parameter tanda tangan digital HMAC yang kedaluwarsa dalam 15 menit.
                  </li>
                  <li>
                    <strong className="text-white">Lisensi Katalog:</strong> Seluruh media menggunakan poster dan artwork berlisensi studio resmi atau distributor publik.
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
