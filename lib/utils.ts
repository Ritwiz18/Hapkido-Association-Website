import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, formatDistanceToNow } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string, fmt = 'dd MMM yyyy'): string {
  return format(new Date(date), fmt);
}

export function formatRelativeDate(date: Date | string): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function generateRegistrationId(prefix: string): string {
  const year = new Date().getFullYear();
  const random = Math.floor(10000 + Math.random() * 90000);
  return `${prefix}-${year}-${random}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return `${text.slice(0, length)}...`;
}

export function getBeltColor(belt: string): string {
  const colors: Record<string, string> = {
    'White Belt': 'bg-gray-100 text-gray-800',
    'Yellow Belt': 'bg-yellow-100 text-yellow-800',
    'Green Belt': 'bg-green-100 text-green-800',
    'Blue Belt': 'bg-blue-100 text-blue-800',
    'Red Belt': 'bg-red-100 text-red-800',
    'Black Belt': 'bg-gray-900 text-white',
    '1st Dan': 'bg-gray-900 text-white',
    '2nd Dan': 'bg-gray-900 text-yellow-400',
    '3rd Dan': 'bg-gray-900 text-yellow-400',
    '4th Dan': 'bg-gray-900 text-yellow-400',
    '5th Dan': 'bg-gray-900 text-yellow-400',
  };
  return colors[belt] || 'bg-gray-100 text-gray-800';
}

export function getMedalEmoji(medal: string | null): string {
  if (!medal) return '🏅';
  const lower = medal.toLowerCase();
  if (lower.includes('gold')) return '🥇';
  if (lower.includes('silver')) return '🥈';
  if (lower.includes('bronze')) return '🥉';
  return '🏅';
}

export const UTTARAKHAND_DISTRICTS = [
  'Almora', 'Bageshwar', 'Chamoli', 'Champawat', 'Dehradun',
  'Haridwar', 'Nainital', 'Pauri Garhwal', 'Pithoragarh',
  'Rudraprayag', 'Tehri Garhwal', 'Udham Singh Nagar', 'Uttarkashi',
];

export const BELT_LEVELS = [
  'White Belt', 'Yellow Belt', 'Green Belt', 'Blue Belt',
  'Red Belt', 'Black Belt', '1st Dan', '2nd Dan', '3rd Dan',
  '4th Dan', '5th Dan', '6th Dan', '7th Dan',
];
