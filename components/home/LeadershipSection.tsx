'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiAward, FiShield } from 'react-icons/fi';

interface Profile {
  id: string;
  name: string;
  role: string;
  department: string;
  organization: string;
  image: string;
  imageAlt: string;
  badgeLabel: string;
  badgeColor: string;
}

const profiles: Profile[] = [
  {
    id: 'mayank-tyagi',
    name: 'Mayank Tyagi',
    role: 'Joint Secretary',
    department: 'Executive Committee',
    organization: 'Uttarakhand Sports Hapkido Association',
    image: '/images/leadership/mayank-tyagi.jpg',
    imageAlt: 'Mayank Tyagi wearing a white martial arts uniform',
    badgeLabel: 'Executive Leadership',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  {
    id: 'uttarakhand-team-coach',
    name: 'Uttarakhand Team Coach',
    role: 'Uttarakhand Team Coach',
    department: 'Coaching & Technical Staff',
    organization: 'Uttarakhand Sports Hapkido Association',
    image: '/images/leadership/uttarakhand-team-coach.jpg',
    imageAlt: 'Uttarakhand team coach wearing a blue formal suit',
    badgeLabel: 'State Coaching Staff',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
  },
];

export default function LeadershipSection() {
  return (
    <section
      className="section-padding bg-gradient-to-b from-white via-gray-50/60 to-white relative overflow-hidden"
      id="leadership"
      aria-label="Association Leadership and Coaching Staff"
    >
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 bg-amber-50 text-amber-700 border border-amber-200">
            <FiShield className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Leadership &amp; Coaching</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
            Key Association <span style={{ color: 'var(--color-primary)' }}>Officials</span>
          </h2>
          <div className="accent-line mx-auto" aria-hidden="true" />
          <p className="section-subtitle mx-auto text-base sm:text-lg">
            Dedicated leadership guiding administrative governance and athletic excellence across Uttarakhand.
          </p>
        </div>

        {/* 2-Column Balanced Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-4xl mx-auto">
          {profiles.map((profile, index) => (
            <motion.article
              key={profile.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: index * 0.15, ease: 'easeOut' }}
              className="group bg-white rounded-2xl shadow-sm border border-gray-200/80 overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col"
            >
              {/* Card Top Accent Bar */}
              <div
                className="h-1.5 w-full"
                style={{
                  background:
                    index === 0
                      ? 'linear-gradient(90deg, var(--color-primary), #3b82f6)'
                      : 'linear-gradient(90deg, #d4af37, #f59e0b)',
                }}
                aria-hidden="true"
              />

              <div className="p-6 sm:p-8 flex flex-col items-center text-center flex-grow">
                {/* Department Badge */}
                <div className="mb-5">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${profile.badgeColor}`}>
                    <FiAward className="w-3 h-3" aria-hidden="true" />
                    <span>{profile.badgeLabel}</span>
                  </span>
                </div>

                {/* Portrait Presentation */}
                <div
                  className="relative w-48 h-56 sm:w-52 sm:h-60 mb-6 overflow-hidden rounded-2xl border-4 shadow-md group-hover:shadow-lg transition-transform duration-300 group-hover:scale-[1.02] bg-gray-100"
                  style={{
                    borderColor: index === 0 ? 'var(--color-primary-light)' : '#fdf8e7',
                  }}
                >
                  <Image
                    src={profile.image}
                    alt={profile.imageAlt}
                    fill
                    sizes="(max-width: 640px) 192px, 208px"
                    priority={index === 0}
                    className={
                      index === 0
                        ? 'object-cover'
                        : 'object-cover'
                    }
                    style={{
                      objectPosition: index === 0
                        ? 'center 22%'
                        : 'center 38%',
                    }}
                  />
                </div>

                {/* Person's Identity & Role */}
                <h3
                  className="text-2xl font-bold text-gray-900 mb-1.5 tracking-tight"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                >
                  {profile.name}
                </h3>

                <div
                  className="text-base font-semibold mb-2"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {profile.role}
                </div>

                <div className="w-12 h-0.5 bg-gray-200 my-2 rounded-full" aria-hidden="true" />

                <p className="text-gray-600 text-sm font-medium">
                  {profile.organization}
                </p>

                <p className="text-gray-400 text-xs mt-1">
                  {profile.department}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

