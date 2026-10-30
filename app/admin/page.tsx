'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiUsers, FiHome, FiBookOpen, FiCalendar, FiMessageSquare, FiClock, FiAlertCircle, FiCheck, FiX } from 'react-icons/fi';
import { formatDate, formatRelativeDate } from '@/lib/utils';

interface Stats {
  totalPlayers: number;
  totalCoaches: number;
  totalAcademies: number;
  pendingApprovals: number;
  pendingPlayers: number;
  pendingCoaches: number;
  pendingAcademies: number;
  totalNews: number;
  totalEvents: number;
  upcomingEvents: number;
  unreadMessages: number;
}

interface RecentPlayer {
  id: string; fullName: string; district: string; beltLevel: string; status: string; createdAt: string;
}

interface RecentAcademy {
  id: string; name: string; district: string; status: string; createdAt: string;
}

const kpiCards = (stats: Stats) => [
  { label: 'Active Players', value: stats.totalPlayers, icon: <FiUsers className="w-5 h-5" />, color: 'var(--color-primary)', bg: 'var(--color-primary-light)', href: '/admin/members' },
  { label: 'Affiliated Academies', value: stats.totalAcademies, icon: <FiHome className="w-5 h-5" />, color: '#D4AF37', bg: '#fdf8e7', href: '/admin/academies' },
  { label: 'Published News', value: stats.totalNews, icon: <FiBookOpen className="w-5 h-5" />, color: '#10b981', bg: '#ecfdf5', href: '/admin/news' },
  { label: 'Pending Approvals', value: stats.pendingApprovals, icon: <FiAlertCircle className="w-5 h-5" />, color: '#f59e0b', bg: '#fffbeb', href: '/admin/members' },
  { label: 'Upcoming Events', value: stats.upcomingEvents, icon: <FiCalendar className="w-5 h-5" />, color: '#8b5cf6', bg: '#f5f3ff', href: '/admin/events' },
  { label: 'Unread Messages', value: stats.unreadMessages, icon: <FiMessageSquare className="w-5 h-5" />, color: '#ec4899', bg: '#fdf2f8', href: '/admin/messages' },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentPlayers, setRecentPlayers] = useState<RecentPlayer[]>([]);
  const [recentAcademies, setRecentAcademies] = useState<RecentAcademy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          setStats(data.stats);
          setRecentPlayers(data.recentPlayers || []);
          setRecentAcademies(data.recentAcademies || []);
        }
      })
      .catch(() => {
        // Fallback demo data
        setStats({
          totalPlayers: 523, totalCoaches: 62, totalAcademies: 47,
          pendingApprovals: 12, pendingPlayers: 8, pendingCoaches: 3, pendingAcademies: 1,
          totalNews: 24, totalEvents: 8, upcomingEvents: 3, unreadMessages: 5,
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const mockPlayers: RecentPlayer[] = [
    { id: '1', fullName: 'Ankit Sharma', district: 'Dehradun', beltLevel: 'Yellow Belt', status: 'PENDING', createdAt: new Date().toISOString() },
    { id: '2', fullName: 'Priya Rawat', district: 'Haridwar', beltLevel: 'White Belt', status: 'APPROVED', createdAt: new Date(Date.now() - 86400000).toISOString() },
    { id: '3', fullName: 'Rohan Negi', district: 'Nainital', beltLevel: 'Green Belt', status: 'PENDING', createdAt: new Date(Date.now() - 172800000).toISOString() },
  ];

  const displayPlayers = recentPlayers.length > 0 ? recentPlayers : mockPlayers;

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Array(6).fill(0).map((_, i) => (
          <div key={i} className="skeleton h-28 rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-poppins)' }}>
          Welcome back 👋
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Here's what's happening with USHA today, {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}.
        </p>
      </div>

      {/* KPI Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          {kpiCards(stats).map((card) => (
            <Link
              key={card.label}
              href={card.href}
              className="card card-hover p-4 group"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: card.bg, color: card.color }}
              >
                {card.icon}
              </div>
              <div className="text-2xl font-bold mb-0.5" style={{ color: card.color, fontFamily: 'var(--font-poppins)' }}>
                {card.value}
              </div>
              <p className="text-xs text-gray-500 font-medium leading-tight">{card.label}</p>
            </Link>
          ))}
        </div>
      )}

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Players */}
        <div className="card">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900" style={{ fontFamily: 'var(--font-poppins)' }}>Recent Registrations</h2>
            <Link href="/admin/members" className="text-xs font-semibold hover:underline" style={{ color: 'var(--color-primary)' }}>View All</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {displayPlayers.map((player) => (
              <div key={player.id} className="flex items-center gap-3 p-4">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0"
                  style={{ backgroundColor: 'var(--color-primary)', fontFamily: 'var(--font-poppins)' }}
                >
                  {player.fullName[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm truncate">{player.fullName}</p>
                  <p className="text-xs text-gray-400">{player.district} · {player.beltLevel}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={player.status === 'APPROVED' ? 'badge-approved' : player.status === 'REJECTED' ? 'badge-rejected' : 'badge-pending'}>
                    {player.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          {stats && stats.pendingPlayers > 0 && (
            <div className="p-4 bg-yellow-50 border-t border-yellow-100 rounded-b-2xl">
              <Link href="/admin/members?status=PENDING" className="flex items-center gap-2 text-sm font-semibold text-yellow-700">
                <FiAlertCircle className="w-4 h-4" />
                {stats.pendingPlayers} pending player approvals
              </Link>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <div className="card p-5">
            <h2 className="font-semibold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Approve Members', href: '/admin/members?status=PENDING', color: 'var(--color-primary)', icon: <FiUsers className="w-4 h-4" /> },
                { label: 'Add News', href: '/admin/news?action=new', color: '#10b981', icon: <FiBookOpen className="w-4 h-4" /> },
                { label: 'Add Event', href: '/admin/events?action=new', color: '#8b5cf6', icon: <FiCalendar className="w-4 h-4" /> },
                { label: 'Upload Gallery', href: '/admin/gallery', color: '#f59e0b', icon: <FiHome className="w-4 h-4" /> },
              ].map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-2.5 p-3.5 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-200 group"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0"
                    style={{ backgroundColor: action.color }}
                  >
                    {action.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{action.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {stats && (
            <div className="card p-5">
              <h2 className="font-semibold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>Pending Approvals</h2>
              <div className="space-y-3">
                {[
                  { label: 'Players', count: stats.pendingPlayers, href: '/admin/members?status=PENDING' },
                  { label: 'Coaches', count: stats.pendingCoaches, href: '/admin/members?tab=coaches&status=PENDING' },
                  { label: 'Academies', count: stats.pendingAcademies, href: '/admin/academies?status=PENDING' },
                ].map((item) => (
                  <Link key={item.label} href={item.href} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                    <span
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: item.count > 0 ? '#f59e0b' : '#10b981' }}
                    >
                      {item.count}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
