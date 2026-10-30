'use client';

import { useEffect, useState, useCallback } from 'react';
import { FiSearch, FiCheck, FiX, FiUser, FiEye, FiRefreshCw } from 'react-icons/fi';
import { UTTARAKHAND_DISTRICTS, BELT_LEVELS, getBeltColor, formatDate } from '@/lib/utils';

interface Player {
  id: string; registrationId: string; fullName: string; district: string;
  beltLevel: string; gender?: string; status: string; photo?: string; createdAt: string;
}

export default function AdminMembersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [district, setDistrict] = useState('');
  const [status, setStatus] = useState('');
  const [processing, setProcessing] = useState<string | null>(null);

  const fetchPlayers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (district) params.set('district', district);
      if (status) params.set('status', status);
      else params.set('status', 'PENDING');

      const res = await fetch(`/api/register/player?${params}`);
      const data = await res.json();
      if (data.success) { setPlayers(data.players || []); setTotal(data.total || 0); }
    } catch {
      // Demo data
      setPlayers([
        { id: '1', registrationId: 'PLY-2025-10001', fullName: 'Ankit Sharma', district: 'Dehradun', beltLevel: 'Yellow Belt', gender: 'Male', status: 'PENDING', createdAt: new Date().toISOString() },
        { id: '2', registrationId: 'PLY-2025-10002', fullName: 'Priya Rawat', district: 'Haridwar', beltLevel: 'White Belt', gender: 'Female', status: 'PENDING', createdAt: new Date(Date.now() - 86400000).toISOString() },
        { id: '3', registrationId: 'PLY-2025-10003', fullName: 'Rohan Negi', district: 'Nainital', beltLevel: 'Green Belt', gender: 'Male', status: 'APPROVED', createdAt: new Date(Date.now() - 172800000).toISOString() },
      ]);
      setTotal(3);
    } finally { setLoading(false); }
  }, [search, district, status]);

  useEffect(() => { fetchPlayers(); }, [fetchPlayers]);

  const updateStatus = async (id: string, newStatus: 'APPROVED' | 'REJECTED') => {
    setProcessing(id);
    try {
      await fetch(`/api/members/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      setPlayers((prev) => prev.map((p) => p.id === id ? { ...p, status: newStatus } : p));
    } catch { alert('Failed to update status'); }
    finally { setProcessing(null); }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-poppins)' }}>Members Management</h1>
          <p className="text-sm text-gray-500 mt-0.5">{total} total registrations</p>
        </div>
        <button onClick={fetchPlayers} className="btn-outline text-sm px-4 py-2 flex items-center gap-2">
          <FiRefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="card p-4 grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="md:col-span-2 relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by name or ID..."
            className="form-input pl-9 text-sm py-2.5"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
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

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3.5 font-semibold text-gray-600 text-xs uppercase tracking-wider">Player</th>
                <th className="text-left px-4 py-3.5 font-semibold text-gray-600 text-xs uppercase tracking-wider">ID</th>
                <th className="text-left px-4 py-3.5 font-semibold text-gray-600 text-xs uppercase tracking-wider">District</th>
                <th className="text-left px-4 py-3.5 font-semibold text-gray-600 text-xs uppercase tracking-wider">Belt</th>
                <th className="text-left px-4 py-3.5 font-semibold text-gray-600 text-xs uppercase tracking-wider">Date</th>
                <th className="text-left px-4 py-3.5 font-semibold text-gray-600 text-xs uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3.5 font-semibold text-gray-600 text-xs uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i}>
                    {Array(7).fill(0).map((_, j) => (
                      <td key={j} className="px-4 py-3"><div className="skeleton h-4 rounded" /></td>
                    ))}
                  </tr>
                ))
              ) : players.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-400">
                    <FiUser className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    No members found
                  </td>
                </tr>
              ) : (
                players.map((player) => (
                  <tr key={player.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                          style={{ backgroundColor: 'var(--color-primary)', fontFamily: 'var(--font-poppins)' }}
                        >
                          {player.fullName[0]}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{player.fullName}</p>
                          <p className="text-xs text-gray-400">{player.gender}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs text-gray-500">{player.registrationId}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{player.district}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-lg text-xs font-semibold ${getBeltColor(player.beltLevel)}`}>
                        {player.beltLevel}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{formatDate(player.createdAt)}</td>
                    <td className="px-4 py-3">
                      <span className={player.status === 'APPROVED' ? 'badge-approved' : player.status === 'REJECTED' ? 'badge-rejected' : 'badge-pending'}>
                        {player.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {player.status === 'PENDING' && (
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => updateStatus(player.id, 'APPROVED')}
                            disabled={processing === player.id}
                            className="w-7 h-7 rounded-lg bg-green-100 hover:bg-green-200 flex items-center justify-center text-green-700 transition-colors disabled:opacity-50"
                            title="Approve"
                          >
                            <FiCheck className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => updateStatus(player.id, 'REJECTED')}
                            disabled={processing === player.id}
                            className="w-7 h-7 rounded-lg bg-red-100 hover:bg-red-200 flex items-center justify-center text-red-700 transition-colors disabled:opacity-50"
                            title="Reject"
                          >
                            <FiX className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                      {player.status !== 'PENDING' && (
                        <button className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500" title="View">
                          <FiEye className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
