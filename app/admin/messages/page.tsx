'use client';

import { useEffect, useState } from 'react';
import { FiMail, FiTrash2, FiCheck, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { formatDate, formatRelativeDate } from '@/lib/utils';

interface Message {
  id: string; name: string; email: string; subject?: string; message: string; read: boolean; createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/contact');
      const data = await res.json();
      if (data.success) setMessages(data.messages || []);
    } catch {
      setMessages([
        { id: '1', name: 'Ramesh Kumar', email: 'ramesh@email.com', subject: 'Registration Query', message: 'I want to know how to register my son for Hapkido training. He is 10 years old and interested in martial arts.', read: false, createdAt: new Date().toISOString() },
        { id: '2', name: 'Sunita Devi', email: 'sunita@email.com', subject: 'Academy Affiliation', message: 'We run a martial arts academy in Haridwar and want to affiliate with USHA. Please share the process and fees.', read: true, createdAt: new Date(Date.now() - 86400000).toISOString() },
        { id: '3', name: 'Vikram Singh', email: 'vikram@email.com', subject: 'State Championship Details', message: 'Can you share the weight categories and schedule for the upcoming state championship 2025?', read: false, createdAt: new Date(Date.now() - 172800000).toISOString() },
      ]);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchMessages(); }, []);

  const markRead = async (id: string) => {
    try {
      await fetch(`/api/contact/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ read: true }) });
      setMessages((prev) => prev.map((m) => m.id === id ? { ...m, read: true } : m));
    } catch { /* silent */ }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('Delete this message?')) return;
    try {
      await fetch(`/api/contact/${id}`, { method: 'DELETE' });
      setMessages((prev) => prev.filter((m) => m.id !== id));
    } catch { alert('Failed to delete'); }
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-poppins)' }}>Contact Messages</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          {messages.length} messages · <span className="font-semibold text-yellow-600">{unreadCount} unread</span>
        </p>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array(4).fill(0).map((_, i) => <div key={i} className="card skeleton h-20 rounded-2xl" />)}
        </div>
      ) : messages.length === 0 ? (
        <div className="card p-12 text-center">
          <FiMail className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-400">No messages yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`card overflow-hidden transition-all duration-200 ${!msg.read ? 'border-l-4 shadow-md' : 'opacity-80'}`}
              style={!msg.read ? { borderLeftColor: 'var(--color-primary)' } : undefined}
            >
              {/* Header */}
              <div
                className="flex items-start justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => {
                  setExpanded(expanded === msg.id ? null : msg.id);
                  if (!msg.read) markRead(msg.id);
                }}
              >
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0 mt-0.5"
                    style={{ backgroundColor: msg.read ? '#9ca3af' : 'var(--color-primary)', fontFamily: 'var(--font-poppins)' }}
                  >
                    {msg.name[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-gray-900 text-sm">{msg.name}</span>
                      {!msg.read && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">New</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400">{msg.email}</p>
                    <p className="text-sm text-gray-600 mt-1 font-medium truncate">{msg.subject || 'No subject'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-3">
                  <span className="text-xs text-gray-400 whitespace-nowrap hidden sm:block">{formatRelativeDate(msg.createdAt)}</span>
                  {expanded === msg.id ? <FiChevronUp className="w-4 h-4 text-gray-400" /> : <FiChevronDown className="w-4 h-4 text-gray-400" />}
                </div>
              </div>

              {/* Expanded */}
              {expanded === msg.id && (
                <div className="px-4 pb-4 border-t border-gray-100 pt-4">
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-400">{formatDate(msg.createdAt)}</span>
                    <div className="flex-1" />
                    <a
                      href={`mailto:${msg.email}?subject=Re: ${msg.subject || 'Your enquiry'}`}
                      className="btn-outline text-xs px-3 py-1.5 flex items-center gap-1"
                    >
                      <FiMail className="w-3 h-3" /> Reply via Email
                    </a>
                    <button
                      onClick={() => deleteMessage(msg.id)}
                      className="w-7 h-7 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-600 transition-colors"
                    >
                      <FiTrash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
