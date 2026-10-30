import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { FiMapPin, FiCalendar, FiClock, FiArrowRight, FiTag } from 'react-icons/fi';
import { formatDate } from '@/lib/utils';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Events & Championships',
  description: 'Upcoming and past Hapkido events, tournaments, training camps, and seminars organized by USHA.',
};

const sampleEvents = [
  {
    id: '1', title: 'State Hapkido Championship 2025', slug: 'state-championship-2025',
    description: 'Open to all belt levels across all 13 districts. Individual and team events with 12 weight categories for men and women.',
    date: new Date('2025-09-15'), endDate: new Date('2025-09-16'),
    venue: 'Sports Stadium, Dehradun', image: '/images/gallery-2.jpg',
    category: 'Championship', status: 'UPCOMING', registrationLink: '/registration',
  },
  {
    id: '2', title: 'Summer Intensive Training Camp', slug: 'summer-camp-2025',
    description: '10-day residential camp for intermediate and advanced students. Daily sessions with national-level coaches.',
    date: new Date('2025-07-22'), endDate: new Date('2025-08-01'),
    venue: 'USHA Dojo, Haridwar', image: '/images/gallery-1.jpg',
    category: 'Training Camp', status: 'UPCOMING', registrationLink: '/registration',
  },
  {
    id: '3', title: 'International Hapkido Seminar', slug: 'international-seminar-2025',
    description: 'Master-level seminar with Grand Master Kim Ji-hoon (7th Dan) from South Korea. Open to all black belt holders.',
    date: new Date('2025-08-10'), endDate: null,
    venue: 'Uttarakhand Sports Academy, Dehradun', image: null,
    category: 'Seminar', status: 'UPCOMING', registrationLink: '/registration',
  },
  {
    id: '4', title: 'District Championship — Haridwar', slug: 'district-championship-haridwar',
    description: 'Annual Haridwar district championship open to all USHA-registered players.',
    date: new Date('2025-04-10'), endDate: null,
    venue: 'Town Hall, Haridwar', image: '/images/gallery-2.jpg',
    category: 'Championship', status: 'COMPLETED', registrationLink: null,
  },
  {
    id: '5', title: 'Belt Grading Examination — Spring 2025', slug: 'belt-grading-spring-2025',
    description: 'Official belt grading examination for students across all affiliated academies.',
    date: new Date('2025-03-20'), endDate: null,
    venue: 'Multiple Venues', image: null,
    category: 'Grading', status: 'COMPLETED', registrationLink: null,
  },
  {
    id: '6', title: 'Coaches Certification Workshop', slug: 'coaches-workshop-2025',
    description: 'Official certification workshop for Hapkido coaches. Get certified as Level 1 or Level 2 coach.',
    date: new Date('2025-10-05'), endDate: null,
    venue: 'USHA HQ, Dehradun', image: null,
    category: 'Workshop', status: 'UPCOMING', registrationLink: '/registration',
  },
];

const categoryColors: Record<string, string> = {
  Championship: '#0B5ED7',
  'Training Camp': '#10b981',
  Seminar: '#8b5cf6',
  Tournament: '#f59e0b',
  Grading: '#f59e0b',
  Workshop: '#ec4899',
};

async function getEvents() {
  try {
    return await prisma.event.findMany({ orderBy: { date: 'asc' } });
  } catch {
    return [];
  }
}

export default async function EventsPage() {
  const dbEvents = await getEvents();
  const events = (dbEvents.length > 0 ? dbEvents : sampleEvents) as typeof sampleEvents;
  const upcoming = events.filter((e) => e.status === 'UPCOMING');
  const past = events.filter((e) => e.status === 'COMPLETED');

  return (
    <div className="pt-20">
      {/* Header */}
      <div
        className="relative py-20 text-white text-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, #1a5cbf 100%)' }}
      >
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="relative container-custom">
          <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-3">Calendar</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>Events &amp; Championships</h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Stay updated on upcoming tournaments, training camps, seminars, and belt grading events.
          </p>
        </div>
      </div>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">

          {/* Upcoming Events */}
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-poppins)' }}>
                Upcoming Events ({upcoming.length})
              </h2>
            </div>
            <div className="space-y-5">
              {upcoming.map((event) => {
                const color = categoryColors[event.category] || '#0B3D91';
                const eventDate = new Date(event.date);
                const daysAway = Math.ceil((eventDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                return (
                  <div key={event.id} className="card card-hover overflow-hidden flex flex-col md:flex-row">
                    {/* Date column */}
                    <div
                      className="md:w-24 lg:w-32 flex flex-row md:flex-col items-center justify-center p-4 text-white gap-4 md:gap-0 shrink-0"
                      style={{ backgroundColor: color }}
                    >
                      <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold leading-none" style={{ fontFamily: 'var(--font-poppins)' }}>
                          {eventDate.getDate()}
                        </div>
                        <div className="text-sm text-white/80 mt-1">
                          {eventDate.toLocaleDateString('en-IN', { month: 'short' })}
                        </div>
                        <div className="text-sm text-white/80">{eventDate.getFullYear()}</div>
                      </div>
                      {event.endDate && (
                        <div className="hidden md:block text-center mt-2 pt-2 border-t border-white/20">
                          <div className="text-xs text-white/70">to</div>
                          <div className="text-lg font-bold">{new Date(event.endDate).getDate()}</div>
                          <div className="text-xs text-white/70">
                            {new Date(event.endDate).toLocaleDateString('en-IN', { month: 'short' })}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Image */}
                    {event.image && (
                      <div className="relative w-full md:w-48 lg:w-56 aspect-video md:aspect-auto overflow-hidden">
                        <Image src={event.image} alt={event.title} fill className="object-cover" sizes="200px" />
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 p-5 md:p-6">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span
                          className="px-2.5 py-0.5 rounded-lg text-xs font-semibold text-white"
                          style={{ backgroundColor: color }}
                        >
                          {event.category}
                        </span>
                        {daysAway > 0 && daysAway <= 30 && (
                          <span className="px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-red-100 text-red-700">
                            {daysAway} days left
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>
                        {event.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{event.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-2">
                          <FiMapPin className="w-4 h-4" style={{ color }} />
                          {event.venue}
                        </span>
                        <span className="flex items-center gap-2">
                          <FiCalendar className="w-4 h-4" style={{ color }} />
                          {formatDate(event.date)}
                        </span>
                      </div>
                      {event.registrationLink && (
                        <Link href={event.registrationLink} className="btn-primary text-sm px-5 py-2.5">
                          Register Now <FiArrowRight className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Past Events */}
          {past.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-poppins)' }}>
                Past Events
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {past.map((event) => {
                  const color = categoryColors[event.category] || '#0B3D91';
                  return (
                    <div key={event.id} className="card opacity-80 hover:opacity-100 transition-opacity">
                      <div className="h-1.5" style={{ backgroundColor: color }} />
                      <div className="p-5">
                        <span className="px-2.5 py-0.5 rounded-lg text-xs font-semibold text-white" style={{ backgroundColor: color }}>
                          {event.category}
                        </span>
                        <h3 className="font-semibold text-gray-900 mt-2 mb-1" style={{ fontFamily: 'var(--font-poppins)' }}>
                          {event.title}
                        </h3>
                        <p className="text-xs text-gray-500 flex items-center gap-1 mb-1">
                          <FiCalendar className="w-3 h-3" /> {formatDate(event.date)}
                        </p>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <FiMapPin className="w-3 h-3" /> {event.venue}
                        </p>
                        <span className="inline-block mt-3 px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-gray-100 text-gray-600">Completed</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
