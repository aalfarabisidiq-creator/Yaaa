import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatDuration,
  formatTimeMinutes,
  calculatePasswordStrength,
  calculateResumeProgress,
  filterCatalog,
  getVisualTheme,
} from './formatters';
import { MediaItem } from '../types';

test('formatDuration formats seconds to MM:SS and HH:MM:SS accurately', () => {
  assert.equal(formatDuration(0), '00:00');
  assert.equal(formatDuration(65), '01:05');
  assert.equal(formatDuration(3600), '01:00:00');
  assert.equal(formatDuration(3665), '01:01:05');
  assert.equal(formatDuration(-10), '00:00');
});

test('formatTimeMinutes formats minutes to human readable string', () => {
  assert.equal(formatTimeMinutes(45), '45m');
  assert.equal(formatTimeMinutes(125), '2j 5m');
});

test('calculatePasswordStrength evaluates password complexity correctly', () => {
  assert.equal(calculatePasswordStrength('').score, 0);
  assert.equal(calculatePasswordStrength('abc').score, 0);
  assert.equal(calculatePasswordStrength('abcdefgh').score, 1);
  assert.equal(calculatePasswordStrength('Abcdefgh').score, 2);
  assert.equal(calculatePasswordStrength('Abcdef12').score, 3);
  assert.equal(calculatePasswordStrength('Abcdef12!').score, 4);
});

test('calculateResumeProgress clamps between 0% and 100%', () => {
  assert.equal(calculateResumeProgress(50, 100), 50);
  assert.equal(calculateResumeProgress(0, 100), 0);
  assert.equal(calculateResumeProgress(120, 100), 100);
  assert.equal(calculateResumeProgress(30, 0), 0);
});

test('getVisualTheme returns appropriate tokens for all visual directions', () => {
  const emerald = getVisualTheme('emerald');
  assert.equal(emerald.primary, '#00E676');

  const cyan = getVisualTheme('cyan');
  assert.equal(cyan.primary, '#00F0FF');

  const amethyst = getVisualTheme('amethyst');
  assert.equal(amethyst.primary, '#A855F7');
});

test('filterCatalog correctly filters by query, genre, and type', () => {
  const mockMedia: MediaItem[] = [
    {
      id: '1',
      title: 'Blade Runner 2049',
      slug: 'blade-runner-2049',
      type: 'MOVIE',
      synopsis: 'A young blade runner discovers a secret.',
      releaseYear: 2017,
      ratingImdb: 8.0,
      contentRating: '18+',
      posterUrl: '',
      backdropUrl: '',
      genres: ['Sci-Fi', 'Aksi'],
      cast: [{ id: 'c1', name: 'Ryan Gosling', role: 'Officer K', avatarUrl: '' }],
      badge: '4K HDR',
    },
    {
      id: '2',
      title: 'Severance',
      slug: 'severance',
      type: 'SERIES',
      synopsis: 'Office employees undergo a surgical procedure.',
      releaseYear: 2022,
      ratingImdb: 8.7,
      contentRating: 'TV-MA',
      posterUrl: '',
      backdropUrl: '',
      genres: ['Sci-Fi', 'Thriller'],
      cast: [{ id: 'c2', name: 'Adam Scott', role: 'Mark Scout', avatarUrl: '' }],
      badge: 'Dolby Vision',
    },
    {
      id: '3',
      title: 'Agritech: Revolusi Hijau',
      slug: 'agritech-revolusi-hijau',
      type: 'MOVIE',
      synopsis: 'Dokumenter modern petani cerdas Indonesia.',
      releaseYear: 2024,
      ratingImdb: 8.9,
      contentRating: 'Semua Umur',
      posterUrl: '',
      backdropUrl: '',
      genres: ['Dokumenter', 'Aksi'],
      cast: [{ id: 'c3', name: 'Arya Surya', role: 'Presenter', avatarUrl: '' }],
      badge: '4K HDR',
    },
  ];

  // Test search query
  const resQuery = filterCatalog(mockMedia, 'Gosling');
  assert.equal(resQuery.length, 1);
  assert.equal(resQuery[0].id, '1');

  // Test genre filter
  const resGenre = filterCatalog(mockMedia, '', 'Dokumenter');
  assert.equal(resGenre.length, 1);
  assert.equal(resGenre[0].id, '3');

  // Test type filter
  const resSeries = filterCatalog(mockMedia, '', 'Semua', 'Series');
  assert.equal(resSeries.length, 1);
  assert.equal(resSeries[0].id, '2');
});
