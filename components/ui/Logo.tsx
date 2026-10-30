'use client';

import Image from 'next/image';

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <Image
      src="/images/usha-logo.jpg"
      alt="Uttarakhand Sports Hapkido Association logo"
      width={1536}
      height={1024}
      className={`w-auto h-10 object-contain ${className ?? ''}`}
      priority
    />
  );
}
