import type { Metadata } from 'next';
import Image from 'next/image';
import { FiTarget, FiEye, FiFlag, FiCheck } from 'react-icons/fi';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about the Uttarakhand Sports Hapkido Association — our history, mission, vision, executive committee, and leadership.',
};

const objectives = [
  'Promote and develop Hapkido across all districts of Uttarakhand',
  'Organize state-level championships, camps, and seminars',
  'Provide structured coaching and certification programs',
  'Affiliate academies and regulate training standards',
  'Select and train athletes for national and international competitions',
  'Foster discipline, sportsmanship, and character development',
];

const committee = [
  { name: 'Sri Rajan Negi', role: 'President', belt: '5th Dan', district: 'Dehradun' },
  { name: 'Sri Vikram Rawat', role: 'Secretary', belt: '4th Dan', district: 'Haridwar' },
  { name: 'Smt. Priya Bisht', role: 'Vice President', belt: '3rd Dan', district: 'Nainital' },
  { name: 'Sri Arun Thapa', role: 'Treasurer', belt: '2nd Dan', district: 'Almora' },
  { name: 'Sri Deepak Rana', role: 'Joint Secretary', belt: '3rd Dan', district: 'Tehri Garhwal' },
  { name: 'Sri Mohit Rawat', role: 'Technical Director', belt: '5th Dan', district: 'Pauri Garhwal' },
  { name: 'Smt. Sunita Joshi', role: 'Women\'s Wing Head', belt: '2nd Dan', district: 'Pithoragarh' },
  { name: 'Sri Gaurav Negi', role: 'District Coordinator', belt: '1st Dan', district: 'Chamoli' },
];

const timeline = [
  { year: 2010, event: 'USHA Founded in Dehradun' },
  { year: 2012, event: 'First State Championship organized with 150 participants' },
  { year: 2014, event: 'National affiliation with Indian Hapkido Federation' },
  { year: 2016, event: 'Expanded to 8 districts with 25 affiliated academies' },
  { year: 2018, event: 'First Uttarakhand athlete wins National Gold' },
  { year: 2020, event: 'Online registration and digital ID system launched' },
  { year: 2022, event: 'Best State Association award from IHF' },
  { year: 2024, event: 'Reached 500+ registered members across 13 districts' },
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Page Header */}
      <div
        className="relative py-20 text-white text-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, #1a5cbf 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative container-custom">
          <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-3">
            Est. 2010 · Uttarakhand
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
            About USHA
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            The premier governing body for Hapkido in Uttarakhand — Building champions, fostering discipline, and promoting the noble art of Hapkido across the state.
          </p>
        </div>
      </div>

      {/* History */}
      <section className="section-padding bg-white">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="section-tag">Our Story</span>
            <h2 className="section-title text-3xl md:text-4xl mb-4">History of USHA</h2>
            <div className="accent-line" />
            <p className="text-gray-600 leading-relaxed mb-4">
              The Uttarakhand Sports Hapkido Association (USHA) was founded in 2010 by a group of
              passionate martial artists and sports administrators in Dehradun. Recognizing the need
              for a structured governing body for Hapkido in the state, they established USHA to
              promote, regulate, and develop this ancient Korean martial art.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              From humble beginnings with just 50 members and 5 affiliated academies, USHA has grown
              into a respected organization with 500+ registered athletes, 45+ affiliated academies
              spanning all 13 districts of Uttarakhand, and a proud record of producing national and
              state champions.
            </p>
            <p className="text-gray-600 leading-relaxed">
              USHA is officially affiliated with the Indian Hapkido Federation (IHF) and follows the
              standards of the World Hapkido Federation, ensuring that Uttarakhand athletes are
              trained and compete at the highest international standards.
            </p>
          </div>
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
            <Image src="/images/about.jpg" alt="USHA History" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      {/* Mission Vision Goals */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="section-tag">Our Purpose</span>
            <h2 className="section-title text-3xl md:text-4xl">Mission, Vision &amp; Objectives</h2>
            <div className="accent-line mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: <FiTarget className="w-7 h-7" />,
                title: 'Mission',
                color: 'var(--color-primary)',
                text: 'To develop world-class Hapkido athletes from Uttarakhand by providing structured training, fair competition, and certified coaching — making the state a powerhouse of Hapkido in India.',
              },
              {
                icon: <FiEye className="w-7 h-7" />,
                title: 'Vision',
                color: 'var(--color-accent)',
                text: 'A Uttarakhand where every district has certified Hapkido academies, every child has access to quality martial arts training, and Uttarakhand athletes consistently win on national and international stages.',
              },
              {
                icon: <FiFlag className="w-7 h-7" />,
                title: 'Values',
                color: '#10b981',
                text: 'Discipline, Integrity, Respect, Excellence, and Inclusivity. We believe Hapkido builds not just physical strength but also strong character and mental resilience in every practitioner.',
              },
            ].map((item) => (
              <div key={item.title} className="card p-8 text-center">
                <div
                  className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white"
                  style={{ backgroundColor: item.color }}
                >
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: item.color, fontFamily: 'var(--font-poppins)' }}>
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          {/* Objectives */}
          <div className="card p-8">
            <h3 className="text-xl font-bold mb-6" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-poppins)' }}>
              Our Objectives
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {objectives.map((obj, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: 'var(--color-primary-light)' }}>
                    <FiCheck className="w-3.5 h-3.5" style={{ color: 'var(--color-primary)' }} />
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{obj}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* President & Secretary Messages */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="section-tag">Leadership</span>
            <h2 className="section-title text-3xl md:text-4xl">Messages from Our Leaders</h2>
            <div className="accent-line mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: 'Sri Rajan Negi',
                role: 'President, USHA',
                message: 'As President of the Uttarakhand Hapkido Association, I am proud of what we have built over the past 15 years. Our journey from a small group of enthusiasts to a recognized state sports body with 500+ athletes is a testament to the dedication of our coaches, athletes, and administrators. We are committed to taking Hapkido to every corner of Uttarakhand.',
              },
              {
                name: 'Sri Vikram Rawat',
                role: 'Secretary, USHA',
                message: 'The Association is committed to transparent governance, athlete welfare, and promoting Hapkido at all levels — from grassroots to national competitions. We are investing in digital infrastructure, coach education, and junior development to ensure the next generation of Uttarakhand athletes excels on the national stage.',
              },
            ].map((leader) => (
              <div key={leader.name} className="card p-8">
                <div className="flex items-start gap-4 mb-5">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl shrink-0"
                    style={{ background: 'linear-gradient(135deg, var(--color-primary), #1a5cbf)', fontFamily: 'var(--font-poppins)' }}
                  >
                    {leader.name.split(' ').slice(-1)[0][0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900" style={{ fontFamily: 'var(--font-poppins)' }}>{leader.name}</h4>
                    <p className="text-sm" style={{ color: 'var(--color-accent)' }}>{leader.role}</p>
                  </div>
                </div>
                <div
                  className="text-4xl font-serif leading-none mb-3 opacity-20"
                  style={{ color: 'var(--color-primary)' }}
                >
                  "
                </div>
                <p className="text-gray-600 leading-relaxed text-sm italic">{leader.message}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Executive Committee */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="section-tag">Governance</span>
            <h2 className="section-title text-3xl md:text-4xl">Executive Committee</h2>
            <div className="accent-line mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {committee.map((member) => (
              <div key={member.name} className="card card-hover p-5 text-center group">
                <div
                  className="w-16 h-16 rounded-2xl mx-auto mb-3 flex items-center justify-center text-white text-xl font-bold"
                  style={{ background: 'linear-gradient(135deg, var(--color-primary), #1a5cbf)', fontFamily: 'var(--font-poppins)' }}
                >
                  {member.name.split(' ').slice(-1)[0][0]}
                </div>
                <h4 className="font-semibold text-gray-900 text-sm" style={{ fontFamily: 'var(--font-poppins)' }}>{member.name}</h4>
                <p className="text-xs font-semibold mt-1" style={{ color: 'var(--color-accent)' }}>{member.role}</p>
                <p className="text-xs text-gray-400 mt-1">{member.belt}</p>
                <p className="text-xs text-gray-400">{member.district}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="section-tag">Milestones</span>
            <h2 className="section-title text-3xl md:text-4xl">Our Journey</h2>
            <div className="accent-line mx-auto" />
          </div>
          <div className="relative max-w-3xl mx-auto">
            {/* Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2" />
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <div key={item.year} className={`flex items-center gap-6 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className="card inline-block p-4">
                      <p className="text-sm font-semibold text-gray-500 mb-1">{item.year}</p>
                      <p className="text-sm text-gray-700 font-medium">{item.event}</p>
                    </div>
                  </div>
                  {/* Dot */}
                  <div
                    className="w-10 h-10 rounded-full border-4 border-white flex items-center justify-center shrink-0 shadow-lg z-10"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    <span className="text-white text-xs font-bold">{item.year.toString().slice(2)}</span>
                  </div>
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
