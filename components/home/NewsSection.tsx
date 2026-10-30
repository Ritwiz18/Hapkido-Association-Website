import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiCalendar, FiTag } from 'react-icons/fi';
import { formatDate, truncate } from '@/lib/utils';

interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  description: string;
  image?: string | null;
  category: string;
  createdAt: Date;
}

interface NewsSectionProps {
  articles: NewsArticle[];
}

const categoryColors: Record<string, string> = {
  General: 'bg-blue-100 text-blue-800',
  Achievement: 'bg-green-100 text-green-800',
  Event: 'bg-purple-100 text-purple-800',
  Tournament: 'bg-orange-100 text-orange-800',
  Training: 'bg-cyan-100 text-cyan-800',
};

const sampleArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'USHA Announces State Championship 2025 — Registration Open',
    slug: 'state-championship-2025',
    description: 'The Uttarakhand Sports Hapkido Association is proud to announce the upcoming State Hapkido Championship 2025 to be held in Dehradun.',
    image: '/images/gallery-2.jpg',
    category: 'Tournament',
    createdAt: new Date('2025-05-15'),
  },
  {
    id: '2',
    title: 'Uttarakhand Athletes Win 12 Medals at National Championship',
    slug: 'national-championship-medals',
    description: 'Our athletes represented Uttarakhand with pride at the National Hapkido Championship, winning 12 medals including 4 gold.',
    image: '/images/gallery-1.jpg',
    category: 'Achievement',
    createdAt: new Date('2025-04-20'),
  },
  {
    id: '3',
    title: 'New Affiliation Program for Academies Launched',
    slug: 'academy-affiliation-program',
    description: 'USHA has launched a simplified affiliation program for Hapkido academies across Uttarakhand with reduced fees and online verification.',
    image: null,
    category: 'General',
    createdAt: new Date('2025-03-10'),
  },
];

export default function NewsSection({ articles }: NewsSectionProps) {
  const displayArticles = articles.length > 0 ? articles : sampleArticles;

  return (
    <section className="section-padding bg-gray-50" id="news">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <span className="section-tag">Latest Updates</span>
            <h2 className="section-title text-3xl md:text-4xl">News &amp; Announcements</h2>
            <div className="accent-line mb-0" />
          </div>
          <Link href="/news" className="btn-outline shrink-0 text-sm px-5 py-2.5">
            View All News <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayArticles.map((article, i) => (
            <article key={article.id} className="card card-hover group">
              {/* Image */}
              <div className="relative aspect-video bg-gray-100 overflow-hidden">
                {article.image ? (
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, var(--color-primary-light), #dbeafe)' }}
                  >
                    <div className="text-5xl opacity-20">📰</div>
                  </div>
                )}
                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${categoryColors[article.category] || 'bg-gray-100 text-gray-800'}`}>
                    {article.category}
                  </span>
                </div>
              </div>
              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                  <FiCalendar className="w-3.5 h-3.5" />
                  {formatDate(article.createdAt)}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 leading-snug group-hover:text-primary transition-colors" style={{ fontFamily: 'var(--font-poppins)' }}>
                  <Link href={`/news/${article.slug}`}>{article.title}</Link>
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {truncate(article.description, 100)}
                </p>
                <Link
                  href={`/news/${article.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-semibold mt-4 transition-all duration-200 hover:gap-2"
                  style={{ color: 'var(--color-primary)' }}
                >
                  Read More <FiArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
