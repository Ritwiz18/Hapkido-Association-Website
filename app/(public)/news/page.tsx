import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { FiCalendar, FiTag, FiArrowRight, FiSearch } from 'react-icons/fi';
import { formatDate, truncate } from '@/lib/utils';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'News & Announcements',
  description: 'Latest news, achievements, event updates, and announcements from the Uttarakhand Hapkido Association.',
};

const sampleNews = [
  {
    id: '1', title: 'USHA Announces State Championship 2025 — Registration Open Now',
    slug: 'state-championship-2025-registration',
    description: 'The Uttarakhand Sports Hapkido Association is proud to announce the upcoming State Hapkido Championship 2025 to be held at Sports Stadium, Dehradun on September 15-16, 2025. All USHA-registered players are eligible to participate.',
    image: '/images/gallery-2.jpg', category: 'Tournament', createdAt: new Date('2025-06-01'),
  },
  {
    id: '2', title: 'Uttarakhand Athletes Win 12 Medals at National Hapkido Championship 2025',
    slug: 'national-championship-medals-2025',
    description: 'Our athletes made the state proud by winning 12 medals at the National Hapkido Championship — including 4 Gold, 3 Silver, and 5 Bronze medals across various categories.',
    image: '/images/gallery-1.jpg', category: 'Achievement', createdAt: new Date('2025-05-15'),
  },
  {
    id: '3', title: 'New Simplified Academy Affiliation Program Launched',
    slug: 'academy-affiliation-program-2025',
    description: 'USHA has launched a simplified and faster online affiliation program for Hapkido academies across Uttarakhand, with reduced fees and digital document verification.',
    image: null, category: 'General', createdAt: new Date('2025-04-20'),
  },
  {
    id: '4', title: 'International Grand Master to Conduct Seminar in Dehradun',
    slug: 'international-seminar-dehradun',
    description: 'Grand Master Kim Ji-hoon (7th Dan), World Hapkido Federation Technical Director, will conduct an exclusive seminar in Dehradun on August 10, 2025. Open to all black belt holders.',
    image: null, category: 'Event', createdAt: new Date('2025-04-05'),
  },
  {
    id: '5', title: 'Belt Grading Results — Spring 2025 Announced',
    slug: 'belt-grading-results-spring-2025',
    description: '247 students across 13 districts successfully cleared the Spring 2025 belt grading examination. Congratulations to all who advanced to the next level!',
    image: '/images/about.jpg', category: 'Achievement', createdAt: new Date('2025-03-25'),
  },
  {
    id: '6', title: 'USHA Receives Best State Association Award from IHF',
    slug: 'best-state-association-award-ihf',
    description: 'The Uttarakhand Hapkido Association has been honored with the Best State Association Award by the Indian Hapkido Federation for excellence in governance and athlete development.',
    image: null, category: 'Achievement', createdAt: new Date('2025-02-14'),
  },
];

const categories = ['All', 'Achievement', 'Tournament', 'Event', 'General', 'Training'];
const categoryColors: Record<string, string> = {
  Achievement: 'bg-green-100 text-green-800',
  Tournament: 'bg-blue-100 text-blue-800',
  Event: 'bg-purple-100 text-purple-800',
  General: 'bg-gray-100 text-gray-800',
  Training: 'bg-cyan-100 text-cyan-800',
};

async function getNews() {
  try {
    return await prisma.news.findMany({ where: { published: true }, orderBy: { createdAt: 'desc' } });
  } catch {
    return [];
  }
}

export default async function NewsPage() {
  const dbNews = await getNews();
  const articles = (dbNews.length > 0 ? dbNews : sampleNews) as typeof sampleNews;

  return (
    <div className="pt-20">
      {/* Header */}
      <div
        className="relative py-20 text-white text-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, #1a5cbf 100%)' }}
      >
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="relative container-custom">
          <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-3">Updates</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>News &amp; Announcements</h1>
          <p className="text-white/80 max-w-xl mx-auto">Latest updates, achievements, and announcements from USHA.</p>
        </div>
      </div>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                className="px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 hover:shadow-sm"
                style={cat === 'All' ? { backgroundColor: 'var(--color-primary)', color: 'white', borderColor: 'var(--color-primary)' } : { backgroundColor: 'white', color: '#4b5563', borderColor: '#e5e7eb' }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured Article */}
          <div className="card card-hover overflow-hidden mb-8 flex flex-col md:flex-row">
            {articles[0].image && (
              <div className="relative md:w-2/5 aspect-video md:aspect-auto overflow-hidden">
                <Image src={articles[0].image} alt={articles[0].title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" />
              </div>
            )}
            <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-3">
                <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${categoryColors[articles[0].category] || 'bg-gray-100 text-gray-800'}`}>
                  {articles[0].category}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <FiCalendar className="w-3.5 h-3.5" /> {formatDate(articles[0].createdAt)}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-snug" style={{ fontFamily: 'var(--font-poppins)' }}>
                {articles[0].title}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">{articles[0].description}</p>
              <Link href={`/news/${articles[0].slug}`} className="btn-primary inline-flex gap-2 self-start">
                Read Full Article <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(1).map((article) => (
              <article key={article.id} className="card card-hover group">
                <div className="relative aspect-video bg-gray-100 overflow-hidden">
                  {article.image ? (
                    <Image src={article.image} alt={article.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--color-primary-light), #dbeafe)' }}>
                      <span className="text-5xl opacity-20">📰</span>
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${categoryColors[article.category] || 'bg-gray-100 text-gray-800'}`}>
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs text-gray-400 flex items-center gap-1 mb-2">
                    <FiCalendar className="w-3.5 h-3.5" /> {formatDate(article.createdAt)}
                  </p>
                  <h3 className="font-semibold text-gray-900 mb-2 leading-snug group-hover:text-primary transition-colors" style={{ fontFamily: 'var(--font-poppins)' }}>
                    <Link href={`/news/${article.slug}`}>{article.title}</Link>
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{truncate(article.description, 110)}</p>
                  <Link href={`/news/${article.slug}`} className="inline-flex items-center gap-1 text-sm font-semibold mt-4 hover:gap-2 transition-all duration-200" style={{ color: 'var(--color-primary)' }}>
                    Read More <FiArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
