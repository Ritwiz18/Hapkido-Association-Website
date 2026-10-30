'use client';

import { useEffect, useState } from 'react';
import { FiSave, FiPhone, FiMail, FiMapPin, FiFacebook, FiInstagram, FiYoutube } from 'react-icons/fi';

interface Settings {
  phone: string; email: string; address: string;
  facebookUrl: string; instagramUrl: string; youtubeUrl: string; whatsappNumber: string;
  totalPlayers: number; totalAcademies: number; districtsCovered: number; certifiedCoaches: number;
  heroTitle: string; heroSubtitle: string; announcementBanner: string; announcementEnabled: boolean;
}

const defaultSettings: Settings = {
  phone: '+91 98765 43210', email: 'info@ushahapkido.org',
  address: 'Sports Complex, Rajpur Road, Dehradun, Uttarakhand – 248001',
  facebookUrl: '', instagramUrl: '', youtubeUrl: '', whatsappNumber: '+919876543210',
  totalPlayers: 500, totalAcademies: 45, districtsCovered: 13, certifiedCoaches: 60,
  heroTitle: 'Uttarakhand Sports Hapkido Association', heroSubtitle: 'Discipline • Strength • Respect',
  announcementBanner: '', announcementEnabled: false,
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('contact');

  useEffect(() => {
    fetch('/api/settings').then((r) => r.json()).then((data) => {
      if (data.success && data.settings) setSettings({ ...defaultSettings, ...data.settings });
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/settings', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(settings) });
      if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 3000); }
    } catch { alert('Failed to save'); }
    finally { setSaving(false); }
  };

  const field = (key: keyof Settings, label: string, type: string = 'text', placeholder?: string) => (
    <div key={key as string}>
      <label className="form-label">{label}</label>
      {type === 'checkbox' ? (
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={settings[key] as boolean} onChange={(e) => setSettings((s) => ({ ...s, [key]: e.target.checked }))} className="w-4 h-4 rounded accent-primary" />
          <span className="text-sm text-gray-700">Enable</span>
        </label>
      ) : type === 'textarea' ? (
        <textarea className="form-input resize-y" rows={3} value={settings[key] as string} onChange={(e) => setSettings((s) => ({ ...s, [key]: e.target.value }))} placeholder={placeholder} />
      ) : (
        <input type={type} className="form-input" value={settings[key] as string | number} onChange={(e) => setSettings((s) => ({ ...s, [key]: type === 'number' ? parseInt(e.target.value) || 0 : e.target.value }))} placeholder={placeholder} />
      )}
    </div>
  );

  const tabs = [
    { id: 'contact', label: 'Contact Info' },
    { id: 'social', label: 'Social Media' },
    { id: 'stats', label: 'Stats Counters' },
    { id: 'hero', label: 'Hero Section' },
    { id: 'announcement', label: 'Announcement' },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-poppins)' }}>Site Settings</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage website content and information</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="btn-primary text-sm px-4 py-2.5 flex items-center gap-2 disabled:opacity-60">
          {saved ? <><span>✓</span> Saved!</> : <><FiSave className="w-4 h-4" />{saving ? 'Saving...' : 'Save Changes'}</>}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 bg-gray-100 rounded-xl p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex-1 min-w-fit px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            style={activeTab === tab.id ? { backgroundColor: 'var(--color-primary)', color: 'white' } : { color: '#6b7280' }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="card p-6 space-y-5">
        {activeTab === 'contact' && (
          <>
            {field('phone', 'Phone Number', 'text', '+91 98765 43210')}
            {field('email', 'Email Address', 'email', 'info@ushahapkido.org')}
            {field('address', 'Office Address', 'textarea', 'Full address...')}
            {field('whatsappNumber', 'WhatsApp Number (with country code)', 'text', '+919876543210')}
          </>
        )}
        {activeTab === 'social' && (
          <>
            {field('facebookUrl', 'Facebook URL')}
            {field('instagramUrl', 'Instagram URL')}
            {field('youtubeUrl', 'YouTube Channel URL')}
          </>
        )}
        {activeTab === 'stats' && (
          <div className="grid grid-cols-2 gap-5">
            {field('totalPlayers', 'Total Players Counter', 'number')}
            {field('totalAcademies', 'Total Academies Counter', 'number')}
            {field('districtsCovered', 'Districts Covered', 'number')}
            {field('certifiedCoaches', 'Certified Coaches', 'number')}
          </div>
        )}
        {activeTab === 'hero' && (
          <>
            {field('heroTitle', 'Hero Section Title')}
            {field('heroSubtitle', 'Hero Subtitle / Tagline')}
          </>
        )}
        {activeTab === 'announcement' && (
          <>
            {field('announcementEnabled', 'Show Announcement Banner', 'checkbox')}
            {field('announcementBanner', 'Announcement Text', 'textarea', 'Important notice...')}
          </>
        )}
      </div>
    </div>
  );
}
