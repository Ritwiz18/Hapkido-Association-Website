'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import { cn } from '@/lib/utils';
import Logo from '@/components/ui/Logo';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Leadership', href: '/#leadership' },
  { label: 'Events', href: '/events' },
  { label: 'Gallery', href: '/gallery' },
  {
    label: 'Registration',
    href: '/registration',
    children: [
      { label: 'Student Registration', href: '/registration#student' },
      { label: 'Club Affiliation', href: '/registration#club' },
    ],
  },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  const isHome = pathname === '/';

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled || !isHome
          ? 'bg-white shadow-md border-b border-gray-100'
          : 'bg-transparent'
      )}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex-shrink-0">
              <Logo className="transition-all duration-300" />
            </div>
            <div className="leading-tight">
              <div
                className={cn(
                  'font-bold text-sm leading-none transition-colors duration-300',
                  scrolled || !isHome ? 'text-gray-900' : 'text-white'
                )}
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                USHA
              </div>
              <div
                className={cn(
                  'text-xs transition-colors duration-300',
                  scrolled || !isHome ? 'text-gray-500' : 'text-white/80'
                )}
              >
                Hapkido
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label} className="relative group">
                  <button
                    className={cn(
                      'flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                      scrolled || !isHome
                        ? 'text-gray-700 hover:text-primary hover:bg-gray-50'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    )}
                    onMouseEnter={() => setOpenDropdown(link.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    {link.label}
                    <FiChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
                  </button>
                  <div
                    className={cn(
                      'absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 transition-all duration-200',
                      openDropdown === link.label ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                    )}
                    onMouseEnter={() => setOpenDropdown(link.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        style={{ color: 'inherit' }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    pathname === link.href
                      ? scrolled || !isHome
                        ? 'bg-primary/10 font-semibold'
                        : 'bg-white/20 text-white font-semibold'
                      : scrolled || !isHome
                      ? 'text-gray-700 hover:text-primary hover:bg-gray-50'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  )}
                  style={
                    pathname === link.href && (scrolled || !isHome)
                      ? { color: 'var(--color-primary)' }
                      : undefined
                  }
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/registration"
              className={cn(
                'hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm',
                scrolled || !isHome
                  ? 'text-white hover:shadow-lg'
                  : 'bg-white/20 text-white border border-white/40 hover:bg-white hover:text-primary'
              )}
              style={scrolled || !isHome ? { backgroundColor: 'var(--color-primary)' } : undefined}
            >
              Join Now
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                'lg:hidden p-2 rounded-xl transition-colors',
                scrolled || !isHome
                  ? 'text-gray-700 hover:bg-gray-100'
                  : 'text-white hover:bg-white/10'
              )}
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'lg:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-300',
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="container-custom py-4 space-y-1">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label}>
                <button
                  onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  {link.label}
                  <FiChevronDown
                    className={cn('w-4 h-4 transition-transform', openDropdown === link.label && 'rotate-180')}
                  />
                </button>
                {openDropdown === link.label && (
                  <div className="pl-4 space-y-1 mt-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'block px-4 py-3 rounded-xl font-medium transition-colors',
                  pathname === link.href
                    ? 'text-white font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                )}
                style={pathname === link.href ? { backgroundColor: 'var(--color-primary)' } : undefined}
              >
                {link.label}
              </Link>
            )
          )}
          <div className="pt-2 pb-1">
            <Link
              href="/registration"
              className="btn-primary w-full text-center block py-3 text-sm"
            >
              Join Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
