'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { FiUsers, FiHome, FiMap, FiAward, FiStar, FiTrendingUp } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface Stat {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
  color: string;
}

function CountUp({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    if (inView && !started) {
      setStarted(true);
      const startTime = Date.now();
      const update = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * target));
        if (progress < 1) requestAnimationFrame(update);
        else setCount(target);
      };
      requestAnimationFrame(update);
    }
  }, [inView, started, target, duration]);

  return <span ref={ref}>{count}</span>;
}

interface StatsProps {
  settings?: {
    totalPlayers: number;
    totalAcademies: number;
    districtsCovered: number;
    certifiedCoaches: number;
    blackBeltHolders: number;
    nationalMedals: number;
  } | null;
}

export default function StatsSection({ settings }: StatsProps) {
  const stats: Stat[] = [
    {
      icon: <FiUsers className="w-7 h-7" />,
      value: settings?.totalPlayers || 500,
      suffix: '+',
      label: 'Registered Players',
      color: '#0B3D91',
    },
    {
      icon: <FiHome className="w-7 h-7" />,
      value: settings?.totalAcademies || 45,
      suffix: '+',
      label: 'Affiliated Academies',
      color: '#D4AF37',
    },
    {
      icon: <FiMap className="w-7 h-7" />,
      value: settings?.districtsCovered || 13,
      suffix: '',
      label: 'Districts Covered',
      color: '#10b981',
    },
    {
      icon: <FiAward className="w-7 h-7" />,
      value: settings?.certifiedCoaches || 60,
      suffix: '+',
      label: 'Certified Coaches',
      color: '#f59e0b',
    },
    {
      icon: <FiStar className="w-7 h-7" />,
      value: settings?.blackBeltHolders || 85,
      suffix: '+',
      label: 'Black Belt Holders',
      color: '#1f2937',
    },
    {
      icon: <FiTrendingUp className="w-7 h-7" />,
      value: settings?.nationalMedals || 150,
      suffix: '+',
      label: 'National Medals',
      color: '#dc2626',
    },
  ];

  return (
    <section className="py-16 bg-gray-50 border-b border-gray-100">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="card card-hover p-5 text-center group"
            >
              <div
                className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: stat.color }}
              >
                {stat.icon}
              </div>
              <div
                className="text-2xl md:text-3xl font-bold mb-1"
                style={{ color: stat.color, fontFamily: 'var(--font-poppins)' }}
              >
                <CountUp target={stat.value} />
                {stat.suffix}
              </div>
              <p className="text-xs text-gray-500 font-medium leading-tight">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
