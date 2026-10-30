'use client';

import { FiTarget, FiEye, FiList } from 'react-icons/fi';
import { motion } from 'framer-motion';

const aboutItems = [
  {
    title: 'Our Mission',
    icon: FiTarget,
    description:
      'To promote, develop, and govern the martial art of Sports Hapkido across Uttarakhand, fostering a culture of discipline, respect, and physical excellence.',
  },
  {
    title: 'Our Vision',
    icon: FiEye,
    description:
      'To establish Uttarakhand as a premier hub for Sports Hapkido in India, producing national and international champions while making the sport accessible to all.',
  },
  {
    title: 'Our Objectives',
    icon: FiList,
    description:
      'Organize state-level championships, conduct regular training camps, certify coaches and referees, and affiliate local academies under a unified governing body.',
  },
];

export default function AboutPreview() {
  return (
    <section className="section-padding bg-gray-50" id="about">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="section-tag">About USHA</span>
          <h2 className="section-title text-3xl md:text-4xl mb-4">
            Empowering Uttarakhand<br />
            <span style={{ color: 'var(--color-accent)' }}>Through Hapkido</span>
          </h2>
          <div className="accent-line mx-auto" />
          <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto text-lg">
            The Uttarakhand Sports Hapkido Association (USHA) is the official governing body for
            Hapkido in Uttarakhand. We are dedicated to the structured growth and promotion of this dynamic Korean martial art.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {aboutItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: 'var(--color-primary-light)' }}
                >
                  <Icon className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900" style={{ fontFamily: 'var(--font-poppins)' }}>
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
