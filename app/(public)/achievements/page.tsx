import type { Metadata } from 'next';
import { getMedalEmoji } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Achievements',
  description: 'National, state, and international achievements of Uttarakhand Hapkido athletes and coaches.',
};

const achievements = [
  { id: '1', title: 'National Gold Medal', playerName: 'Rajan Negi', level: 'NATIONAL', year: 2024, category: 'Player', medal: 'Gold', description: '84kg Senior Category — National Hapkido Championship, Delhi' },
  { id: '2', title: 'National Silver Medal', playerName: 'Vikram Rawat', level: 'NATIONAL', year: 2023, category: 'Player', medal: 'Silver', description: '74kg Senior Category — National Championship, Mumbai' },
  { id: '3', title: 'National Bronze Medal', playerName: 'Priya Bisht', level: 'NATIONAL', year: 2024, category: 'Player', medal: 'Bronze', description: 'Women\'s Open Category — National Championship, Hyderabad' },
  { id: '4', title: 'Youth National Gold', playerName: 'Ankit Sharma', level: 'NATIONAL', year: 2024, category: 'Player', medal: 'Gold', description: 'Under-18 Category — National Youth Championship' },
  { id: '5', title: 'Best State Association', playerName: 'USHA', level: 'NATIONAL', year: 2023, category: 'Association', medal: 'Award', description: 'Awarded by Indian Hapkido Federation for excellence' },
  { id: '6', title: 'International Bronze', playerName: 'Deepak Rana', level: 'INTERNATIONAL', year: 2023, category: 'Player', medal: 'Bronze', description: 'Asia Pacific Championship — Bangkok, Thailand' },
  { id: '7', title: 'State Championship Gold', playerName: 'Rohan Joshi', level: 'STATE', year: 2024, category: 'Player', medal: 'Gold', description: 'State Hapkido Championship — Dehradun' },
  { id: '8', title: 'Best Coach Award', playerName: 'Master Rajan Negi', level: 'STATE', year: 2024, category: 'Coach', medal: 'Award', description: 'Uttarakhand Sports Council Best Coach Recognition' },
  { id: '9', title: 'State Championship Gold', playerName: 'Kavita Bisht', level: 'STATE', year: 2023, category: 'Player', medal: 'Gold', description: 'Women\'s State Championship — Nainital' },
  { id: '10', title: 'Excellence Award', playerName: 'USHA', level: 'STATE', year: 2022, category: 'Association', medal: 'Award', description: 'Uttarakhand Sports Council Recognition Award' },
  { id: '11', title: 'National Bronze', playerName: 'Sunita Joshi', level: 'NATIONAL', year: 2022, category: 'Player', medal: 'Bronze', description: 'Women\'s National Championship — Bangalore' },
  { id: '12', title: 'International Participation', playerName: 'Mohit Thapa', level: 'INTERNATIONAL', year: 2024, category: 'Player', medal: null, description: 'World Hapkido Championships — Seoul, South Korea' },
];

const levelLabels = {
  INTERNATIONAL: { label: 'International', color: '#D4AF37', bg: '#fdf8e7', icon: '🌏' },
  NATIONAL: { label: 'National', color: '#0B3D91', bg: '#e8f0fd', icon: '🇮🇳' },
  STATE: { label: 'State', color: '#10b981', bg: '#ecfdf5', icon: '🏔️' },
  DISTRICT: { label: 'District', color: '#8b5cf6', bg: '#f5f3ff', icon: '📍' },
};

export default function AchievementsPage() {
  const international = achievements.filter((a) => a.level === 'INTERNATIONAL');
  const national = achievements.filter((a) => a.level === 'NATIONAL');
  const state = achievements.filter((a) => a.level === 'STATE');

  return (
    <div className="pt-20">
      {/* Header */}
      <div
        className="relative py-20 text-white text-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, #1a5cbf 100%)' }}
      >
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="relative container-custom">
          <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-3">Pride of Uttarakhand</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>Achievements</h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Celebrating the champions who have brought glory to Uttarakhand on national and international stages.
          </p>
        </div>
      </div>

      {/* Stats Bar */}
      <div
        className="py-10 text-white"
        style={{ background: 'linear-gradient(135deg, #082e6a 0%, var(--color-primary) 100%)' }}
      >
        <div className="container-custom grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '150+', label: 'Total Medals' },
            { value: '12', label: 'National Golds' },
            { value: '3', label: 'International Medals' },
            { value: '45+', label: 'State Championships' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-bold" style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-poppins)' }}>
                {stat.value}
              </div>
              <p className="text-white/70 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <section className="section-padding bg-gray-50">
        <div className="container-custom space-y-12">
          {[
            { key: 'INTERNATIONAL', items: international },
            { key: 'NATIONAL', items: national },
            { key: 'STATE', items: state },
          ].map(({ key, items }) => {
            const meta = levelLabels[key as keyof typeof levelLabels];
            return (
              <div key={key}>
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{ backgroundColor: meta.bg }}
                  >
                    {meta.icon}
                  </div>
                  <h2 className="text-2xl font-bold" style={{ color: meta.color, fontFamily: 'var(--font-poppins)' }}>
                    {meta.label} Level ({items.length})
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {items.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="card card-hover p-5 border-l-4"
                      style={{ borderLeftColor: meta.color }}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="text-3xl">{getMedalEmoji(achievement.medal)}</div>
                        <div>
                          <h3 className="font-semibold text-gray-900 leading-snug" style={{ fontFamily: 'var(--font-poppins)' }}>
                            {achievement.title}
                          </h3>
                          <p className="text-sm font-semibold mt-0.5" style={{ color: meta.color }}>
                            {achievement.playerName}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{achievement.description}</p>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                        <span className="text-xs text-gray-400 font-semibold">{achievement.year}</span>
                        <span
                          className="px-2.5 py-0.5 rounded-lg text-xs font-semibold"
                          style={{ backgroundColor: meta.bg, color: meta.color }}
                        >
                          {achievement.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
