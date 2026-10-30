import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import AboutPreview from '@/components/home/AboutPreview';
import LeadershipSection from '@/components/home/LeadershipSection';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Official website of the Uttarakhand Sports Hapkido Association — Register, explore events, find academies, and track achievements.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutPreview />
      <LeadershipSection />
    </>
  );
}
