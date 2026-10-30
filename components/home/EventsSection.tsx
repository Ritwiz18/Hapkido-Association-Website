import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiMapPin, FiClock, FiCalendar } from 'react-icons/fi';
import { formatDate } from '@/lib/utils';

interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  date: Date;
  venue: string;
  image?: string | null;
  category: string;
  status: string;
}

const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'State Hapkido Championship 2025',
    slug: 'state-championship-2025',
    description: 'Open to all belt levels. Individual and team events across 12 weight categories.',
    date: new Date('2025-09-15'),
    venue: 'Sports Stadium, Dehradun',
    image: '/images/gallery-2.jpg',
    category: 'Championship',
    status: 'UPCOMING',
  },
  {
    id: '2',
    title: 'Summer Training Camp — Haridwar',
    slug: 'summer-training-camp-2025',
    description: '10-day intensive residential camp for intermediate and advanced students.',
    date: new Date('2025-07-22'),
    venue: 'USHA Dojo, Haridwar',
    image: '/images/gallery-1.jpg',
    category: 'Training Camp',
    status: 'UPCOMING',
  },
  {
    id: '3',
    title: 'International Hapkido Seminar',
    slug: 'international-seminar-2025',
    description: 'Master-level seminar with Grand Master Kim Ji-hoon from South Korea.',
    date: new Date('2025-08-10'),
    venue: 'Uttarakhand Sports Academy',
    image: null,
    category: 'Seminar',
    status: 'UPCOMING',
  },
];

const categoryColors: Record<string, string> = {
  Championship: '#0B3D91',
  'Training Camp': '#10b981',
  Seminar: '#8b5cf6',
  Tournament: '#f59e0b',
  Workshop: '#ec4899',
};

function Countdown({ date }: { date: Date }) {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  if (diff <= 0) return <span className="text-sm text-gray-400">Event passed</span>;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days > 30) return <span className="text-sm font-semibold" style={{ color: 'var(--color-primary)' }}>{days} days away</span>;
  return (
    <span className="text-sm font-semibold" style={{ color: '#dc2626' }}>
      {days} days remaining
    </span>
  );
}

interface EventsSectionProps {
  events: Event[];
}

export default function EventsSection({ events }: EventsSectionProps) {
  const displayEvents = events.length > 0 ? events : sampleEvents;

  return (
    <section className="section-padding bg-white" id="events">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <span className="section-tag">Upcoming</span>
            <h2 className="section-title text-3xl md:text-4xl">Events &amp; Championships</h2>
            <div className="accent-line mb-0" />
          </div>
          <Link href="/events" className="btn-outline shrink-0 text-sm px-5 py-2.5">
            All Events <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayEvents.map((event) => {
            const color = categoryColors[event.category] || '#0B3D91';
            return (
              <article key={event.id} className="card card-hover group overflow-hidden">
                {/* Top color bar */}
                <div className="h-1.5 w-full" style={{ backgroundColor: color }} />

                {/* Date + Category header */}
                <div className="flex items-start justify-between p-5 pb-3">
                  <div
                    className="rounded-xl text-white text-center min-w-[56px] py-2 px-3"
                    style={{ backgroundColor: color }}
                  >
                    <div className="text-2xl font-bold leading-none" style={{ fontFamily: 'var(--font-poppins)' }}>
                      {new Date(event.date).getDate()}
                    </div>
                    <div className="text-xs text-white/80 mt-1">
                      {new Date(event.date).toLocaleDateString('en-IN', { month: 'short' })}
                    </div>
                    <div className="text-xs text-white/80">
                      {new Date(event.date).getFullYear()}
                    </div>
                  </div>
                  <span
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold text-white mt-1"
                    style={{ backgroundColor: color }}
                  >
                    {event.category}
                  </span>
                </div>

                {/* Content */}
                <div className="px-5 pb-5">
                  <h3 className="font-semibold text-gray-900 mb-2 leading-snug text-lg group-hover:text-primary transition-colors" style={{ fontFamily: 'var(--font-poppins)' }}>
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3 leading-relaxed">{event.description}</p>

                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                    <FiMapPin className="w-3.5 h-3.5 shrink-0" style={{ color }} />
                    {event.venue}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                    <FiCalendar className="w-3.5 h-3.5 shrink-0" style={{ color }} />
                    {formatDate(event.date)}
                  </div>

                  <div className="flex items-center justify-between">
                    <Countdown date={new Date(event.date)} />
                    <Link
                      href={`/events/${event.slug}`}
                      className="text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all"
                      style={{ color }}
                    >
                      Register <FiArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
