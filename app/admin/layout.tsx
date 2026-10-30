'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  FiHome, FiUsers, FiBookOpen, FiCalendar, FiImage,
  FiSettings, FiMenu, FiX, FiLogOut, FiBarChart2,
  FiMessageSquare, FiDownload, FiStar,
} from 'react-icons/fi';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: FiHome, exact: true },
  { href: '/admin/members', label: 'Members', icon: FiUsers },
  { href: '/admin/academies', label: 'Academies', icon: FiHome },
  { href: '/admin/news', label: 'News', icon: FiBookOpen },
  { href: '/admin/events', label: 'Events', icon: FiCalendar },
  { href: '/admin/gallery', label: 'Gallery', icon: FiImage },
  { href: '/admin/achievements', label: 'Achievements', icon: FiStar },
  { href: '/admin/messages', label: 'Messages', icon: FiMessageSquare },
  { href: '/admin/settings', label: 'Settings', icon: FiSettings },
];

function Sidebar({ mobile, onClose }: { mobile?: boolean; onClose?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/me', { method: 'DELETE' });
    router.push('/admin/login');
  };

  return (
    <div className={cn('flex flex-col h-full', mobile ? 'w-full' : 'w-64')}>
      {/* Logo */}
      <div className="flex items-center justify-between p-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold"
            style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-dark)', fontFamily: 'var(--font-poppins)' }}
          >
            HK
          </div>
          <div>
            <div className="text-white font-semibold text-sm leading-none" style={{ fontFamily: 'var(--font-poppins)' }}>USHA Admin</div>
            <div className="text-white/50 text-xs mt-0.5">Management Panel</div>
          </div>
        </div>
        {mobile && (
          <button onClick={onClose} className="text-white/70 hover:text-white p-1">
            <FiX className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href) && href !== '/admin';
          const exactActive = href === '/admin' && pathname === '/admin';
          const isActive = exact ? exactActive : active;
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                isActive
                  ? 'text-white shadow-lg'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              )}
              style={isActive ? { backgroundColor: 'var(--color-accent)', color: 'var(--color-dark)' } : undefined}
            >
              <Icon className="w-4.5 h-4.5 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-white/10">
        <Link href="/" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200">
          <FiBarChart2 className="w-4 h-4" />
          View Website
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-white/60 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 mt-0.5"
        >
          <FiLogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:flex flex-col border-r border-white/10 shrink-0"
        style={{ background: 'linear-gradient(180deg, var(--color-dark) 0%, var(--color-primary) 100%)' }}
      >
        <Sidebar />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside
            className="relative w-72 flex flex-col shadow-2xl"
            style={{ background: 'linear-gradient(180deg, var(--color-dark) 0%, var(--color-primary) 100%)' }}
          >
            <Sidebar mobile onClose={() => setSidebarOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 h-16 flex items-center gap-4 shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <FiMenu className="w-5 h-5" />
          </button>
          <h1 className="font-semibold text-gray-900 text-lg flex-1" style={{ fontFamily: 'var(--font-poppins)' }}>
            Admin Panel
          </h1>
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold"
              style={{ backgroundColor: 'var(--color-primary)', fontFamily: 'var(--font-poppins)' }}
            >
              A
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
