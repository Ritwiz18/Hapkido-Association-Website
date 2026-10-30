'use client';

import { useEffect, useState } from 'react';
import { FiSearch, FiCheck, FiX, FiMapPin, FiPhone, FiUser, FiRefreshCw } from 'react-icons/fi';
import { UTTARAKHAND_DISTRICTS, formatDate } from '@/lib/utils';

interface Academy {
  id: string; registrationId: string; name: string; ownerName: string;
  district: string; phone: string; status: string; createdAt: string;
}

export default function AdminAcademiesPage() {
  const [academies, setAcademies] = useState<Academy[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [district, setDistrict] = useState('');
  const [status, setStatus] = useState('PENDING');
  const [processing, setProcessing] = useState<string | null>(null);

  const fetchAcademies = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (district) params.set('district', district);
      params.set('status', status || 'PENDING');
      const res = await fetch(`/api/academies?${params}`);
      const data = await res.json();
      if (data.success) { setAcademies(data.academies || []); setTotal(data.total || 0); }
    } catch {
      setAcademies([
        { id: '1', registrationId: 'ACD-2025-1001', name: 'Dehradun Hapkido Club', ownerName: 'Master Rajan Negi', district: 'Dehradun', phone: '+91 9876543210', status: 'PENDING', createdAt: new Date().toISOString() },
        { id: '2', registrationId: 'ACD-2025-1002', name: 'Haridwar Martial Arts Academy', ownerName: 'Vikram Rawat', district: 'Haridwar', phone: '+91 9876543211', status: 'APPROVED', createdAt: new Date(Date.now() - 86400000).toISOString() },
      ]);
      setTotal(2);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchAcademies(); }, [search, district, status]);

  const updateStatus = async (id: string, newStatus: 'APPROVED' | 'REJECTED') => {
    setProcessing(id);
    try {
      await fetch(`/api/academies/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      setAcademies((prev) => prev.map((a) => a.id === id ? { ...a, status: newStatus } : a));
    } catch { alert('Failed to update'); }
    finally { setProcessing(null); }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-poppins)' }}>Academy Management</h1>
          <p className="text-sm text-gray-500 mt-0.5">{total} total registrations</p>
        </div>
        <button onClick={fetchAcademies} className="btn-outline text-sm px-4 py-2 flex items-center gap-2">
          <FiRefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="card p-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input type="text" placeholder="Search academy..." className="form-input pl-9 text-sm py-2.5" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select className="form-input text-sm py-2.5" value={district} onChange={(e) => setDistrict(e.target.value)}>
          <option value="">All Districts</option>
          {UTTARAKHAND_DISTRICTS.map((d) => <option key={d}>{d}</option>)}
        </select>
        <select className="form-input text-sm py-2.5" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
          <option value="">All Status</option>
        </select>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {['Academy', 'ID', 'Owner', 'District', 'Phone', 'Date', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-4 py-3.5 font-semibold text-gray-600 text-xs uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                Array(4).fill(0).map((_, i) => <tr key={i}>{Array(8).fill(0).map((_, j) => <td key={j} className="px-4 py-3"><div className="skeleton h-4 rounded" /></td>)}</tr>)
              ) : academies.length === 0 ? (
                <tr><td colSpan={8} className="text-center py-12 text-gray-400">No academies found</td></tr>
              ) : academies.map((academy) => (
                <tr key={academy.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0" style={{ background: 'linear-gradient(135deg, var(--color-primary), #1a5cbf)' }}>
                        {academy.name[0]}
                      </div>
                      <p className="font-medium text-gray-900 max-w-[160px] truncate">{academy.name}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3"><span className="font-mono text-xs text-gray-500">{academy.registrationId}</span></td>
                  <td className="px-4 py-3 text-gray-600">
                    <span className="flex items-center gap-1"><FiUser className="w-3 h-3" />{academy.ownerName}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    <span className="flex items-center gap-1"><FiMapPin className="w-3 h-3" />{academy.district}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{academy.phone}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{formatDate(academy.createdAt)}</td>
                  <td className="px-4 py-3">
                    <span className={academy.status === 'APPROVED' ? 'badge-approved' : academy.status === 'REJECTED' ? 'badge-rejected' : 'badge-pending'}>
                      {academy.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {academy.status === 'PENDING' && (
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => updateStatus(academy.id, 'APPROVED')} disabled={processing === academy.id} className="w-7 h-7 rounded-lg bg-green-100 hover:bg-green-200 flex items-center justify-center text-green-700 transition-colors disabled:opacity-50" title="Approve">
                          <FiCheck className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => updateStatus(academy.id, 'REJECTED')} disabled={processing === academy.id} className="w-7 h-7 rounded-lg bg-red-100 hover:bg-red-200 flex items-center justify-center text-red-700 transition-colors disabled:opacity-50" title="Reject">
                          <FiX className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
