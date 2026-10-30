'use client';

import { useEffect, useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiToggleLeft, FiToggleRight } from 'react-icons/fi';
import { formatDate, truncate } from '@/lib/utils';

interface Article {
  id: string; title: string; category: string; published: boolean; createdAt: string;
}

type ModalMode = 'create' | 'edit' | null;

export default function AdminNewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<ModalMode>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: '', description: '', content: '', category: 'General', published: false });
  const [saving, setSaving] = useState(false);

  const fetch_ = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/news?published=');
      const data = await res.json();
      if (data.success) setArticles(data.news || []);
    } catch {
      setArticles([
        { id: '1', title: 'USHA Announces State Championship 2025', category: 'Tournament', published: true, createdAt: new Date().toISOString() },
        { id: '2', title: 'Athletes Win 12 Medals at Nationals', category: 'Achievement', published: true, createdAt: new Date(Date.now() - 86400000).toISOString() },
        { id: '3', title: 'New Academy Affiliation Program', category: 'General', published: false, createdAt: new Date(Date.now() - 172800000).toISOString() },
      ]);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetch_(); }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const url = editingId ? `/api/news/${editingId}` : '/api/news';
      const method = editingId ? 'PATCH' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (res.ok) { await fetch_(); setModal(null); setEditingId(null); setForm({ title: '', description: '', content: '', category: 'General', published: false }); }
    } catch { alert('Failed to save'); }
    finally { setSaving(false); }
  };

  const togglePublish = async (id: string, published: boolean) => {
    try {
      await fetch(`/api/news/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ published: !published }) });
      setArticles((prev) => prev.map((a) => a.id === id ? { ...a, published: !published } : a));
    } catch { alert('Failed to update'); }
  };

  const deleteArticle = async (id: string) => {
    if (!confirm('Delete this article?')) return;
    try {
      await fetch(`/api/news/${id}`, { method: 'DELETE' });
      setArticles((prev) => prev.filter((a) => a.id !== id));
    } catch { alert('Failed to delete'); }
  };

  const categoryColors: Record<string, string> = {
    Achievement: 'bg-green-100 text-green-700', Tournament: 'bg-blue-100 text-blue-700',
    Event: 'bg-purple-100 text-purple-700', General: 'bg-gray-100 text-gray-700', Training: 'bg-cyan-100 text-cyan-700',
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-poppins)' }}>News Management</h1>
          <p className="text-sm text-gray-500 mt-0.5">{articles.length} articles total</p>
        </div>
        <button onClick={() => { setModal('create'); setEditingId(null); setForm({ title: '', description: '', content: '', category: 'General', published: false }); }} className="btn-primary text-sm px-4 py-2.5">
          <FiPlus className="w-4 h-4" /> Add Article
        </button>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3.5 font-semibold text-gray-600 text-xs uppercase tracking-wider">Title</th>
                <th className="text-left px-4 py-3.5 font-semibold text-gray-600 text-xs uppercase tracking-wider">Category</th>
                <th className="text-left px-4 py-3.5 font-semibold text-gray-600 text-xs uppercase tracking-wider">Date</th>
                <th className="text-left px-4 py-3.5 font-semibold text-gray-600 text-xs uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3.5 font-semibold text-gray-600 text-xs uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                Array(4).fill(0).map((_, i) => (
                  <tr key={i}>{Array(5).fill(0).map((_, j) => <td key={j} className="px-4 py-3"><div className="skeleton h-4 rounded" /></td>)}</tr>
                ))
              ) : articles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900 max-w-xs truncate">{article.title}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-lg text-xs font-semibold ${categoryColors[article.category] || 'bg-gray-100 text-gray-700'}`}>
                      {article.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{formatDate(article.createdAt)}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => togglePublish(article.id, article.published)} className="flex items-center gap-1.5 text-xs font-medium">
                      {article.published
                        ? <><FiToggleRight className="w-4 h-4 text-green-600" /><span className="text-green-700">Published</span></>
                        : <><FiToggleLeft className="w-4 h-4 text-gray-400" /><span className="text-gray-500">Draft</span></>
                      }
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => { setEditingId(article.id); setModal('edit'); }} className="w-7 h-7 rounded-lg bg-blue-50 hover:bg-blue-100 flex items-center justify-center text-blue-600">
                        <FiEdit2 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => deleteArticle(article.id)} className="w-7 h-7 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-600">
                        <FiTrash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'var(--font-poppins)' }}>
                {modal === 'create' ? 'Add New Article' : 'Edit Article'}
              </h2>
              <button onClick={() => setModal(null)} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100">✕</button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="form-label">Title *</label>
                <input className="form-input" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="Article title" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Category</label>
                  <select className="form-input" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}>
                    {['General', 'Achievement', 'Tournament', 'Event', 'Training'].map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="flex items-end pb-0.5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.published} onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))} className="w-4 h-4 rounded accent-primary" />
                    <span className="text-sm font-medium text-gray-700">Publish immediately</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="form-label">Description / Excerpt *</label>
                <textarea className="form-input resize-y" rows={3} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} placeholder="Brief description..." />
              </div>
              <div>
                <label className="form-label">Full Content</label>
                <textarea className="form-input resize-y" rows={6} value={form.content} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))} placeholder="Full article content..." />
              </div>
            </div>
            <div className="flex gap-3 p-5 border-t border-gray-100">
              <button onClick={() => setModal(null)} className="btn-outline flex-1 py-2.5">Cancel</button>
              <button onClick={handleSave} disabled={saving || !form.title || !form.description} className="btn-primary flex-1 py-2.5 disabled:opacity-60">
                {saving ? 'Saving...' : modal === 'create' ? 'Publish Article' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
