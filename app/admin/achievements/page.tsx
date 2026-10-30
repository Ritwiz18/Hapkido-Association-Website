'use client';

import { useEffect, useState } from 'react';
import { FiPlus, FiTrash2, FiEdit2 } from 'react-icons/fi';
import { getMedalEmoji } from '@/lib/utils';

interface Achievement {
  id: string; title: string; playerName: string; level: string; year: number; medal?: string; category: string; description?: string;
}

export default function AdminAchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: '', playerName: '', level: 'NATIONAL', year: new Date().getFullYear(), medal: 'Gold', category: 'Player', description: '' });

  const fetchAchievements = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/achievements');
      const data = await res.json();
      if (data.success) setAchievements(data.achievements || []);
    } catch {
      setAchievements([
        { id: '1', title: 'National Gold Medal', playerName: 'Rajan Negi', level: 'NATIONAL', year: 2024, medal: 'Gold', category: 'Player', description: '84kg Senior Category' },
        { id: '2', title: 'Best State Association', playerName: 'USHA', level: 'NATIONAL', year: 2023, medal: 'Award', category: 'Association', description: 'Awarded by IHF' },
        { id: '3', title: 'International Bronze', playerName: 'Deepak Rana', level: 'INTERNATIONAL', year: 2023, medal: 'Bronze', category: 'Player', description: 'Asia Pacific Championship' },
      ]);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchAchievements(); }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/achievements', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (res.ok) { await fetchAchievements(); setModal(false); setForm({ title: '', playerName: '', level: 'NATIONAL', year: new Date().getFullYear(), medal: 'Gold', category: 'Player', description: '' }); }
    } catch { alert('Failed to save'); }
    finally { setSaving(false); }
  };

  const deleteAchievement = async (id: string) => {
    if (!confirm('Delete this achievement?')) return;
    try {
      await fetch(`/api/achievements/${id}`, { method: 'DELETE' });
      setAchievements((prev) => prev.filter((a) => a.id !== id));
    } catch { alert('Failed to delete'); }
  };

  const levelColors: Record<string, string> = {
    INTERNATIONAL: '#D4AF37', NATIONAL: '#0B3D91', STATE: '#10b981', DISTRICT: '#8b5cf6',
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-poppins)' }}>Achievements</h1>
          <p className="text-sm text-gray-500 mt-0.5">{achievements.length} records</p>
        </div>
        <button onClick={() => setModal(true)} className="btn-primary text-sm px-4 py-2.5">
          <FiPlus className="w-4 h-4" /> Add Achievement
        </button>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {['Achievement', 'Athlete', 'Level', 'Medal', 'Year', 'Category', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-4 py-3.5 font-semibold text-gray-600 text-xs uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? Array(4).fill(0).map((_, i) => (
                <tr key={i}>{Array(7).fill(0).map((_, j) => <td key={j} className="px-4 py-3"><div className="skeleton h-4 rounded" /></td>)}</tr>
              )) : achievements.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900 max-w-[200px] truncate">{a.title}</td>
                  <td className="px-4 py-3 text-gray-600">{a.playerName}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-lg text-xs font-semibold text-white" style={{ backgroundColor: levelColors[a.level] || '#6b7280' }}>
                      {a.level}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-lg">{getMedalEmoji(a.medal || null)}</td>
                  <td className="px-4 py-3 text-gray-500">{a.year}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{a.category}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <button className="w-7 h-7 rounded-lg bg-blue-50 hover:bg-blue-100 flex items-center justify-center text-blue-600"><FiEdit2 className="w-3.5 h-3.5" /></button>
                      <button onClick={() => deleteAchievement(a.id)} className="w-7 h-7 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-600"><FiTrash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'var(--font-poppins)' }}>Add Achievement</h2>
              <button onClick={() => setModal(false)} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100">✕</button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="form-label">Achievement Title *</label>
                <input className="form-input" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="e.g. National Gold Medal" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Athlete / Player Name *</label>
                  <input className="form-input" value={form.playerName} onChange={(e) => setForm((f) => ({ ...f, playerName: e.target.value }))} placeholder="Full name" />
                </div>
                <div>
                  <label className="form-label">Year *</label>
                  <input type="number" className="form-input" value={form.year} onChange={(e) => setForm((f) => ({ ...f, year: parseInt(e.target.value) }))} min="2000" max="2099" />
                </div>
                <div>
                  <label className="form-label">Level</label>
                  <select className="form-input" value={form.level} onChange={(e) => setForm((f) => ({ ...f, level: e.target.value }))}>
                    <option value="INTERNATIONAL">International</option>
                    <option value="NATIONAL">National</option>
                    <option value="STATE">State</option>
                    <option value="DISTRICT">District</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Medal / Award</label>
                  <select className="form-input" value={form.medal} onChange={(e) => setForm((f) => ({ ...f, medal: e.target.value }))}>
                    <option>Gold</option><option>Silver</option><option>Bronze</option><option>Award</option><option>Participation</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Category</label>
                  <select className="form-input" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}>
                    <option>Player</option><option>Coach</option><option>Association</option><option>Team</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="form-label">Description</label>
                <textarea className="form-input resize-y" rows={2} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} placeholder="Event name, venue, category details..." />
              </div>
            </div>
            <div className="flex gap-3 p-5 border-t border-gray-100">
              <button onClick={() => setModal(false)} className="btn-outline flex-1 py-2.5">Cancel</button>
              <button onClick={handleSave} disabled={saving || !form.title || !form.playerName} className="btn-primary flex-1 py-2.5 disabled:opacity-60">
                {saving ? 'Saving...' : 'Add Achievement'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
