'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import { FiSearch, FiFilter, FiMapPin, FiAward, FiUser, FiHome } from 'react-icons/fi';
import Image from 'next/image';
import { UTTARAKHAND_DISTRICTS, BELT_LEVELS, getBeltColor } from '@/lib/utils';

// Sample data for display
const sampleMembers = Array.from({ length: 12 }, (_, i) => ({
  id: `member-${i + 1}`,
  registrationId: `PLY-2025-${10000 + i}`,
  fullName: ['Ankit Sharma', 'Priya Rawat', 'Rohan Negi', 'Kavita Bisht', 'Deepak Rana', 'Sunita Joshi', 'Mohit Thapa', 'Anjali Chauhan', 'Vikram Singh', 'Meena Rawat', 'Gaurav Dhar', 'Ritu Negi'][i],
  district: UTTARAKHAND_DISTRICTS[i % UTTARAKHAND_DISTRICTS.length],
  beltLevel: BELT_LEVELS[i % 6],
  academyName: ['Dehradun Hapkido Club', 'Haridwar Martial Arts', 'Nainital Dojo', 'Almora Academy'][i % 4],
  gender: i % 3 === 1 ? 'Female' : 'Male',
  status: 'APPROVED',
  photo: null,
}));

export default function MembersPage() {
  const [search, setSearch] = useState('');
  const [district, setDistrict] = useState('');
  const [belt, setBelt] = useState('');
  const [gender, setGender] = useState('');

  const filtered = sampleMembers.filter((m) => {
    const matchSearch = !search || m.fullName.toLowerCase().includes(search.toLowerCase()) || m.registrationId.includes(search);
    const matchDistrict = !district || m.district === district;
    const matchBelt = !belt || m.beltLevel === belt;
    const matchGender = !gender || m.gender === gender;
    return matchSearch && matchDistrict && matchBelt && matchGender;
  });

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
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>Members Directory</h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Find registered players and coaches across Uttarakhand.
          </p>
        </div>
      </div>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          {/* Search & Filters */}
          <div className="card p-5 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2 relative">
                <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by name or registration ID..."
                  className="form-input pl-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <select className="form-input" value={district} onChange={(e) => setDistrict(e.target.value)}>
                <option value="">All Districts</option>
                {UTTARAKHAND_DISTRICTS.map((d) => <option key={d}>{d}</option>)}
              </select>
              <select className="form-input" value={belt} onChange={(e) => setBelt(e.target.value)}>
                <option value="">All Belt Levels</option>
                {BELT_LEVELS.slice(0, 8).map((b) => <option key={b}>{b}</option>)}
              </select>
              <select className="form-input" value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">All Genders</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-gray-500 mb-5">
            Showing <strong>{filtered.length}</strong> of {sampleMembers.length} members
          </p>

          {/* Member Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((member) => (
              <div key={member.id} className="card card-hover p-5 text-center group">
                {/* Avatar */}
                <div className="relative w-20 h-20 rounded-2xl mx-auto mb-4 overflow-hidden bg-gray-100">
                  {member.photo ? (
                    <Image src={member.photo} alt={member.fullName} fill className="object-cover" sizes="80px" />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center text-white text-2xl font-bold"
                      style={{ background: 'linear-gradient(135deg, var(--color-primary), #1a5cbf)', fontFamily: 'var(--font-poppins)' }}
                    >
                      {member.fullName[0]}
                    </div>
                  )}
                </div>

                <h3 className="font-semibold text-gray-900 mb-0.5" style={{ fontFamily: 'var(--font-poppins)' }}>
                  {member.fullName}
                </h3>
                <p className="text-xs text-gray-400 mb-2 font-mono">{member.registrationId}</p>

                <span className={`inline-block px-2.5 py-0.5 rounded-lg text-xs font-semibold mb-3 ${getBeltColor(member.beltLevel)}`}>
                  {member.beltLevel}
                </span>

                <div className="space-y-1.5 text-left">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <FiMapPin className="w-3 h-3 shrink-0" style={{ color: 'var(--color-primary)' }} />
                    {member.district}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <FiHome className="w-3 h-3 shrink-0" style={{ color: 'var(--color-primary)' }} />
                    {member.academyName}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <FiUser className="w-3 h-3 shrink-0" style={{ color: 'var(--color-primary)' }} />
                    {member.gender}
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-100">
                  <span className="badge-approved">Active Member</span>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No members found</h3>
              <p className="text-gray-500">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

