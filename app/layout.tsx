import type { Metadata } from 'next';
import { Poppins, Inter } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Uttarakhand Hapkido Association',
    template: '%s | Uttarakhand Hapkido Association',
  },
  description:
    'Official website of the Uttarakhand Hapkido Association (USHA) — the premier governing body for Hapkido in Uttarakhand. Register, find academies, view events, and more.',
  keywords: [
    'Hapkido', 'Uttarakhand', 'Martial Arts', 'USHA', 'Sports Association',
    'Hapkido Training', 'Dehradun', 'Black Belt', 'Martial Arts Academy',
  ],
  authors: [{ name: 'Uttarakhand Hapkido Association' }],
  creator: 'USHA',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://ushahapkido.org',
    siteName: 'Uttarakhand Hapkido Association',
    title: 'Uttarakhand Hapkido Association',
    description: 'Official website of the Uttarakhand Hapkido Association — Discipline, Strength, Respect.',
    images: [{ url: '/images/hero-bg.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Uttarakhand Hapkido Association',
    description: 'Official website of the Uttarakhand Hapkido Association',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-white">
        {children}
      </body>
    </html>
  );
}
