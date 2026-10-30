import type { Metadata } from 'next';
import { FiDownload, FiFile, FiFileText, FiBook, FiAward } from 'react-icons/fi';

export const metadata: Metadata = {
  title: 'Downloads',
  description: 'Download official forms, rulebooks, guidelines, and membership documents from USHA.',
};

const downloads = [
  {
    category: 'Registration Forms',
    icon: <FiFileText className="w-5 h-5" />,
    color: 'var(--color-primary)',
    items: [
      { title: 'Player Registration Form', description: 'Official form for new player registration', fileName: 'player-registration-form.pdf', size: '245 KB' },
      { title: 'Coach Registration Form', description: 'Application form for coach certification', fileName: 'coach-registration-form.pdf', size: '198 KB' },
      { title: 'Academy Affiliation Form', description: 'Form for new academy registration', fileName: 'academy-affiliation-form.pdf', size: '312 KB' },
      { title: 'Membership Renewal Form', description: 'Annual membership renewal document', fileName: 'membership-renewal-form.pdf', size: '156 KB' },
    ],
  },
  {
    category: 'Rulebooks',
    icon: <FiBook className="w-5 h-5" />,
    color: '#D4AF37',
    items: [
      { title: 'Hapkido Tournament Rulebook', description: 'Official rules for state-level competitions', fileName: 'tournament-rulebook.pdf', size: '2.1 MB' },
      { title: 'Belt Grading Criteria', description: 'Standards for belt promotion examinations', fileName: 'belt-grading-criteria.pdf', size: '890 KB' },
      { title: 'Competition Safety Guidelines', description: 'Safety protocols for all events', fileName: 'safety-guidelines.pdf', size: '445 KB' },
    ],
  },
  {
    category: 'Certificates & Templates',
    icon: <FiAward className="w-5 h-5" />,
    color: '#10b981',
    items: [
      { title: 'Membership Certificate Template', description: 'Official USHA membership certificate', fileName: 'membership-certificate.pdf', size: '1.2 MB' },
      { title: 'Coach ID Card Template', description: 'Official coach identification card', fileName: 'coach-id-template.pdf', size: '567 KB' },
      { title: 'Academy Affiliation Certificate', description: 'Certificate of affiliation for academies', fileName: 'academy-certificate.pdf', size: '834 KB' },
    ],
  },
  {
    category: 'Guidelines & Policies',
    icon: <FiFile className="w-5 h-5" />,
    color: '#8b5cf6',
    items: [
      { title: 'Anti-Doping Policy', description: 'USHA anti-doping rules and procedures', fileName: 'anti-doping-policy.pdf', size: '678 KB' },
      { title: 'Code of Conduct', description: 'Expected behavior for athletes and coaches', fileName: 'code-of-conduct.pdf', size: '234 KB' },
      { title: 'Annual Report 2024', description: 'USHA annual report and financial statement', fileName: 'annual-report-2024.pdf', size: '3.4 MB' },
    ],
  },
];

export default function DownloadsPage() {
  return (
    <div className="pt-20">
      {/* Header */}
      <div
        className="relative py-20 text-white text-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, #1a5cbf 100%)' }}
      >
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="relative container-custom">
          <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-3">Resources</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>Downloads</h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Official forms, rulebooks, guidelines, and documents available for download.
          </p>
        </div>
      </div>

      <section className="section-padding bg-gray-50">
        <div className="container-custom space-y-10">
          {downloads.map((section) => (
            <div key={section.category}>
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: section.color }}>
                  {section.icon}
                </div>
                <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-poppins)' }}>
                  {section.category}
                </h2>
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {section.items.map((item) => (
                  <div key={item.fileName} className="card card-hover p-5 group">
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${section.color}20` }}
                      >
                        <FiFile className="w-5 h-5" style={{ color: section.color }} />
                      </div>
                      <span className="text-xs text-gray-400">{item.size}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1 leading-snug" style={{ fontFamily: 'var(--font-poppins)' }}>
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-500 mb-4 leading-relaxed">{item.description}</p>
                    <a
                      href={`/downloads/${item.fileName}`}
                      download
                      className="flex items-center gap-2 text-sm font-semibold transition-all duration-200 hover:gap-3"
                      style={{ color: section.color }}
                    >
                      <FiDownload className="w-4 h-4" />
                      Download PDF
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Note */}
          <div className="card p-6 border-l-4" style={{ borderLeftColor: 'var(--color-accent)' }}>
            <h4 className="font-semibold text-gray-900 mb-1" style={{ fontFamily: 'var(--font-poppins)' }}>
              Note
            </h4>
            <p className="text-sm text-gray-600">
              For the most up-to-date forms and documents, please contact the USHA office. All forms should be submitted with the required attachments as specified within each document. For digital submission, use the online registration forms.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
