'use client';

import { useEffect, useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiCalendar, FiMapPin } from 'react-icons/fi';
import { formatDate, UTTARAKHAND_DISTRICTS } from '@/lib/utils';

interface Event {
  id: string; title: string; date: string; venue: string; category: string; status: string;
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', date: '', venue: '', category: 'Championship', status: 'UPCOMING', registrationLink: '' });

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/events');
      const data = await res.json();
      if (data.success) setEvents(data.events || []);
    } catch {
      setEvents([
        { id: '1', title: 'State Championship 2025', date: '2025-09-15', venue: 'Dehradun', category: 'Championship', status: 'UPCOMING' },
        { id: '2', title: 'Summer Training Camp', date: '2025-07-22', venue: 'Haridwar', category: 'Training Camp', status: 'UPCOMING' },
      ]);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchEvents(); }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch('/api/events', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      await fetchEvents();
      setModal(false);
    } catch { alert('Failed to save'); }
    finally { setSaving(false); }
  };

  const deleteEvent = async (id: string) => {
    if (!confirm('Delete this event?')) return;
    try {
      await fetch(`/api/events/${id}`, { method: 'DELETE' });
      setEvents((prev) => prev.filter((e) => e.id !== id));
    } catch { alert('Failed to delete'); }
  };

  const categoryColors: Record<string, string> = {
    Championship: '#0B3D91', 'Training Camp': '#10b981', Seminar: '#8b5cf6', Workshop: '#ec4899', Grading: '#f59e0b',
  };

  const statusColors: Record<string, string> = {
    UPCOMING: 'badge-approved', COMPLETED: 'bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-lg text-xs font-semibold',
    CANCELLED: 'badge-rejected',
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-poppins)' }}>Events Management</h1>
          <p className="text-sm text-gray-500 mt-0.5">{events.length} events</p>
        </div>
        <button onClick={() => setModal(true)} className="btn-primary text-sm px-4 py-2.5">
          <FiPlus className="w-4 h-4" /> Add Event
        </button>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3.5 font-semibold text-gray-600 text-xs uppercase tracking-wider">Event</th>
                <th className="text-left px-4 py-3.5 font-semibold text-gray-600 text-xs uppercase tracking-wider">Date</th>
                <th className="text-left px-4 py-3.5 font-semibold text-gray-600 text-xs uppercase tracking-wider">Venue</th>
                <th className="text-left px-4 py-3.5 font-semibold text-gray-600 text-xs uppercase tracking-wider">Category</th>
                <th className="text-left px-4 py-3.5 font-semibold text-gray-600 text-xs uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3.5 font-semibold text-gray-600 text-xs uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                Array(3).fill(0).map((_, i) => <tr key={i}>{Array(6).fill(0).map((_, j) => <td key={j} className="px-4 py-3"><div className="skeleton h-4 rounded" /></td>)}</tr>)
              ) : events.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900 max-w-xs truncate">{event.title}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">
                    <span className="flex items-center gap-1"><FiCalendar className="w-3 h-3" />{formatDate(event.date)}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">
                    <span className="flex items-center gap-1"><FiMapPin className="w-3 h-3" />{event.venue}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-lg text-xs font-semibold text-white" style={{ backgroundColor: categoryColors[event.category] || '#6b7280' }}>
                      {event.category}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={statusColors[event.status] || 'badge-pending'}>{event.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <button className="w-7 h-7 rounded-lg bg-blue-50 hover:bg-blue-100 flex items-center justify-center text-blue-600"><FiEdit2 className="w-3.5 h-3.5" /></button>
                      <button onClick={() => deleteEvent(event.id)} className="w-7 h-7 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-600"><FiTrash2 className="w-3.5 h-3.5" /></button>
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
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'var(--font-poppins)' }}>Add New Event</h2>
              <button onClick={() => setModal(false)} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100">✕</button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="form-label">Event Title *</label>
                <input className="form-input" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="Event title" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Date *</label>
                  <input type="date" className="form-input" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} />
                </div>
                <div>
                  <label className="form-label">Category</label>
                  <select className="form-input" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}>
                    {['Championship', 'Training Camp', 'Seminar', 'Workshop', 'Grading', 'Tournament'].map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="form-label">Venue *</label>
                <input className="form-input" value={form.venue} onChange={(e) => setForm((f) => ({ ...f, venue: e.target.value }))} placeholder="Event venue" />
              </div>
              <div>
                <label className="form-label">Description</label>
                <textarea className="form-input resize-y" rows={3} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} placeholder="Event description..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Status</label>
                  <select className="form-input" value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}>
                    <option>UPCOMING</option><option>COMPLETED</option><option>CANCELLED</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Registration Link</label>
                  <input className="form-input" value={form.registrationLink} onChange={(e) => setForm((f) => ({ ...f, registrationLink: e.target.value }))} placeholder="/registration" />
                </div>
              </div>
            </div>
            <div className="flex gap-3 p-5 border-t border-gray-100">
              <button onClick={() => setModal(false)} className="btn-outline flex-1 py-2.5">Cancel</button>
              <button onClick={handleSave} disabled={saving || !form.title || !form.date || !form.venue} className="btn-primary flex-1 py-2.5 disabled:opacity-60">
                {saving ? 'Saving...' : 'Create Event'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
