import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { FiMapPin, FiPhone, FiUser, FiExternalLink } from 'react-icons/fi';
import { UTTARAKHAND_DISTRICTS } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Academy Directory',
  description: 'Find affiliated Hapkido academies across all districts of Uttarakhand.',
};

const sampleAcademies = UTTARAKHAND_DISTRICTS.map((district, i) => ({
  id: `acad-${i + 1}`,
  registrationId: `ACD-2025-${1000 + i}`,
  name: `${district} Hapkido Academy`,
  ownerName: ['Master Rajan Negi', 'Sensei Vikram Rawat', 'Instructor Priya Bisht', 'Coach Deepak Rana'][i % 4],
  address: `Near Sports Complex, ${district}, Uttarakhand`,
  district,
  phone: `+91 9${String(876543210 + i).slice(-9)}`,
  logo: null,
  status: 'APPROVED',
  mapsLink: 'https://maps.google.com',
}));

export default function AcademiesPage() {
  return (
    <div className="pt-20">
      {/* Header */}
      <div
        className="relative py-20 text-white text-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, #1a5cbf 100%)' }}
      >
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="relative container-custom">
          <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-3">Directory</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>Academy Directory</h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Find affiliated Hapkido academies across all 13 districts of Uttarakhand.
          </p>
        </div>
      </div>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            {[
              { value: '45+', label: 'Affiliated Academies' },
              { value: '13', label: 'Districts Covered' },
              { value: '500+', label: 'Students Enrolled' },
            ].map((stat) => (
              <div key={stat.label} className="card p-5 text-center">
                <div className="text-2xl font-bold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-poppins)' }}>
                  {stat.value}
                </div>
                <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Academy Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleAcademies.map((academy) => (
              <div key={academy.id} className="card card-hover group">
                {/* Top */}
                <div className="p-5 pb-4 flex items-start gap-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-xl shrink-0"
                    style={{ background: 'linear-gradient(135deg, var(--color-primary), #1a5cbf)', fontFamily: 'var(--font-poppins)' }}
                  >
                    {academy.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 leading-snug mb-0.5 truncate" style={{ fontFamily: 'var(--font-poppins)' }}>
                      {academy.name}
                    </h3>
                    <p className="text-xs font-mono text-gray-400">{academy.registrationId}</p>
                    <span className="badge-approved mt-1 inline-block">Affiliated</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 px-5 py-4 space-y-2.5">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FiUser className="w-4 h-4 shrink-0" style={{ color: 'var(--color-primary)' }} />
                    {academy.ownerName}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FiMapPin className="w-4 h-4 shrink-0" style={{ color: 'var(--color-primary)' }} />
                    <span className="truncate">{academy.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FiPhone className="w-4 h-4 shrink-0" style={{ color: 'var(--color-primary)' }} />
                    <a href={`tel:${academy.phone}`} className="hover:text-primary transition-colors">{academy.phone}</a>
                  </div>
                </div>

                <div className="border-t border-gray-100 px-5 py-3 flex items-center justify-between">
                  <span
                    className="px-3 py-1 rounded-lg text-xs font-semibold text-white"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    {academy.district}
                  </span>
                  <a
                    href={academy.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs font-semibold transition-colors hover:underline"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    View on Maps <FiExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Register Academy CTA */}
          <div
            className="mt-10 rounded-2xl p-8 text-center text-white"
            style={{ background: 'linear-gradient(135deg, var(--color-primary), #1a5cbf)' }}
          >
            <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>
              Want to Register Your Academy?
            </h3>
            <p className="text-white/80 mb-5">
              Join the USHA family and get official recognition for your Hapkido academy.
            </p>
            <Link href="/registration#academy" className="btn-accent px-8 py-3">
              Register Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
