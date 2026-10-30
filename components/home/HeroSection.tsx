'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight, FiUsers } from 'react-icons/fi';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white" id="hero">
      {/* Decorative clean pattern background */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 container-custom text-center pt-24 pb-16 flex flex-col items-center justify-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="relative w-40 h-40 md:w-48 md:h-48 mx-auto">
            <Image
              src="/images/logo.png"
              alt="U.S.H.A. Logo"
              fill
              className="object-contain drop-shadow-xl"
              priority
            />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4 text-gray-900"
          style={{ fontFamily: 'var(--font-poppins)' }}
        >
          Uttarakhand Sports
          <br />
          <span style={{ color: 'var(--color-primary)' }}>Hapkido Association</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-lg md:text-xl text-gray-600 font-medium max-w-2xl mx-auto mb-10"
        >
          "Official State Association promoting Sports Hapkido across Uttarakhand."
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/registration"
            className="btn-primary px-8 py-4 text-base rounded-xl shadow-lg"
          >
            <FiUsers className="w-5 h-5" />
            Join Association
          </Link>
          <Link
            href="/events"
            className="btn-outline px-8 py-4 text-base rounded-xl bg-white"
          >
            View Events
            <FiArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
