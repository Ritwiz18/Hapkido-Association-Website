'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FiUser, FiHome, FiAward, FiUpload, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { UTTARAKHAND_DISTRICTS, BELT_LEVELS } from '@/lib/utils';

// ─── Schemas ──────────────────────────────────────
const playerSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  dob: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['Male', 'Female', 'Other']),
  district: z.string().min(1, 'District is required'),
  academyName: z.string().optional(),
  guardianName: z.string().optional(),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  address: z.string().min(5, 'Address is too short'),
  beltLevel: z.string(),
});

const coachSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  gender: z.enum(['Male', 'Female', 'Other']),
  district: z.string().min(1, 'District is required'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter valid mobile number'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  qualification: z.string().optional(),
  experience: z.string().optional(),
  blackBeltLevel: z.string().optional(),
  address: z.string().optional(),
});

const academySchema = z.object({
  name: z.string().min(2, 'Academy name is required'),
  ownerName: z.string().min(2, 'Owner name is required'),
  address: z.string().min(5, 'Address is required'),
  district: z.string().min(1, 'District is required'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter valid mobile number'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  mapsLink: z.string().url('Enter valid URL').optional().or(z.literal('')),
});

type PlayerForm = z.infer<typeof playerSchema>;
type CoachForm = z.infer<typeof coachSchema>;
type AcademyForm = z.infer<typeof academySchema>;

// ─── Shared Components ─────────────────────────────
function FormField({ label, error, children, required }: {
  label: string; error?: string; children: React.ReactNode; required?: boolean;
}) {
  return (
    <div>
      <label className="form-label">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && (
        <p className="flex items-center gap-1 text-xs text-red-500 mt-1">
          <FiAlertCircle className="w-3 h-3" /> {error}
        </p>
      )}
    </div>
  );
}

function SuccessMessage({ type, id }: { type: string; id: string }) {
  return (
    <div className="text-center py-12 px-6">
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
        <FiCheck className="w-10 h-10 text-green-600" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>
        Registration Submitted!
      </h3>
      <p className="text-gray-600 mb-4">
        Your {type} registration has been received. Your registration ID is:
      </p>
      <div
        className="inline-block px-6 py-3 rounded-xl text-white font-mono font-bold text-lg"
        style={{ backgroundColor: 'var(--color-primary)' }}
      >
        {id}
      </div>
      <p className="text-sm text-gray-500 mt-4">
        Our admin team will review your application and notify you via email/phone within 3-5 working days.
      </p>
    </div>
  );
}

// ─── Player Form ────────────────────────────────────
function PlayerRegistrationForm() {
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<PlayerForm>({
    resolver: zodResolver(playerSchema),
    defaultValues: {
      beltLevel: 'White Belt',
    },
  });

  const onSubmit = async (data: PlayerForm) => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/register/player', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) setSuccess(json.registrationId);
      else alert(json.error || 'Submission failed. Please try again.');
    } catch {
      alert('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) return <SuccessMessage type="Player" id={success} />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FormField label="Full Name" error={errors.fullName?.message} required>
          <input {...register('fullName')} className="form-input" placeholder="Enter your full name" />
        </FormField>
        <FormField label="Date of Birth" error={errors.dob?.message} required>
          <input {...register('dob')} type="date" className="form-input" />
        </FormField>
        <FormField label="Gender" error={errors.gender?.message} required>
          <select {...register('gender')} className="form-input">
            <option value="">Select gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </FormField>
        <FormField label="District" error={errors.district?.message} required>
          <select {...register('district')} className="form-input">
            <option value="">Select district</option>
            {UTTARAKHAND_DISTRICTS.map((d) => <option key={d}>{d}</option>)}
          </select>
        </FormField>
        <FormField label="Current Belt Level" error={errors.beltLevel?.message}>
          <select {...register('beltLevel')} className="form-input">
            {BELT_LEVELS.slice(0, 6).map((b) => <option key={b}>{b}</option>)}
          </select>
        </FormField>
        <FormField label="Academy Name" error={errors.academyName?.message}>
          <input {...register('academyName')} className="form-input" placeholder="Name of your academy" />
        </FormField>
        <FormField label="Guardian Name" error={errors.guardianName?.message}>
          <input {...register('guardianName')} className="form-input" placeholder="Parent/guardian name" />
        </FormField>
        <FormField label="Phone Number" error={errors.phone?.message} required>
          <input {...register('phone')} type="tel" className="form-input" placeholder="10-digit mobile number" />
        </FormField>
        <FormField label="Email Address" error={errors.email?.message}>
          <input {...register('email')} type="email" className="form-input" placeholder="your@email.com" />
        </FormField>
      </div>
      <FormField label="Full Address" error={errors.address?.message} required>
        <textarea {...register('address')} className="form-input resize-y" rows={3} placeholder="Your complete residential address" />
      </FormField>
      <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
        <FiUpload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p className="text-sm font-semibold text-gray-700">Upload Documents</p>
        <p className="text-xs text-gray-400 mt-1">Passport photo, Aadhaar card, Medical certificate (PDF/JPG, max 2MB each)</p>
        <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png" className="hidden" id="player-docs" />
        <label htmlFor="player-docs" className="inline-block mt-3 btn-outline text-sm cursor-pointer px-4 py-2">
          Choose Files
        </label>
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="btn-primary w-full py-4 text-base disabled:opacity-60"
      >
        {submitting ? 'Submitting...' : 'Submit Player Registration'}
      </button>
    </form>
  );
}

// ─── Coach Form ─────────────────────────────────────
function CoachRegistrationForm() {
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<CoachForm>({
    resolver: zodResolver(coachSchema),
  });

  const onSubmit = async (data: CoachForm) => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/register/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) setSuccess(json.registrationId);
      else alert(json.error || 'Submission failed.');
    } catch { alert('Network error.'); }
    finally { setSubmitting(false); }
  };

  if (success) return <SuccessMessage type="Coach" id={success} />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FormField label="Full Name" error={errors.fullName?.message} required>
          <input {...register('fullName')} className="form-input" placeholder="Enter your full name" />
        </FormField>
        <FormField label="Gender" error={errors.gender?.message} required>
          <select {...register('gender')} className="form-input">
            <option value="">Select</option>
            <option>Male</option><option>Female</option><option>Other</option>
          </select>
        </FormField>
        <FormField label="District" error={errors.district?.message} required>
          <select {...register('district')} className="form-input">
            <option value="">Select district</option>
            {UTTARAKHAND_DISTRICTS.map((d) => <option key={d}>{d}</option>)}
          </select>
        </FormField>
        <FormField label="Phone" error={errors.phone?.message} required>
          <input {...register('phone')} type="tel" className="form-input" placeholder="10-digit mobile" />
        </FormField>
        <FormField label="Email" error={errors.email?.message}>
          <input {...register('email')} type="email" className="form-input" placeholder="your@email.com" />
        </FormField>
        <FormField label="Qualification" error={errors.qualification?.message}>
          <input {...register('qualification')} className="form-input" placeholder="e.g., B.P.Ed, M.A. Sports" />
        </FormField>
        <FormField label="Experience (years)" error={errors.experience?.message}>
          <input {...register('experience')} type="number" className="form-input" placeholder="Years of coaching experience" />
        </FormField>
        <FormField label="Black Belt Level" error={errors.blackBeltLevel?.message}>
          <select {...register('blackBeltLevel')} className="form-input">
            <option value="">Select</option>
            {BELT_LEVELS.slice(5).map((b) => <option key={b}>{b}</option>)}
          </select>
        </FormField>
      </div>
      <FormField label="Address" error={errors.address?.message}>
        <textarea {...register('address')} className="form-input resize-y" rows={3} placeholder="Full address" />
      </FormField>
      <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
        <FiUpload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p className="text-sm font-semibold text-gray-700">Upload Documents</p>
        <p className="text-xs text-gray-400 mt-1">Photo, certificates, resume (PDF/JPG, max 2MB each)</p>
        <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png" className="hidden" id="coach-docs" />
        <label htmlFor="coach-docs" className="inline-block mt-3 btn-outline text-sm cursor-pointer px-4 py-2">Choose Files</label>
      </div>
      <button type="submit" disabled={submitting} className="btn-primary w-full py-4 text-base disabled:opacity-60">
        {submitting ? 'Submitting...' : 'Submit Coach Registration'}
      </button>
    </form>
  );
}

// ─── Academy Form ───────────────────────────────────
function AcademyRegistrationForm() {
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<AcademyForm>({
    resolver: zodResolver(academySchema),
  });

  const onSubmit = async (data: AcademyForm) => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/register/academy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) setSuccess(json.registrationId);
      else alert(json.error || 'Submission failed.');
    } catch { alert('Network error.'); }
    finally { setSubmitting(false); }
  };

  if (success) return <SuccessMessage type="Academy" id={success} />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FormField label="Academy Name" error={errors.name?.message} required>
          <input {...register('name')} className="form-input" placeholder="Official academy name" />
        </FormField>
        <FormField label="Owner/Director Name" error={errors.ownerName?.message} required>
          <input {...register('ownerName')} className="form-input" placeholder="Head/owner full name" />
        </FormField>
        <FormField label="District" error={errors.district?.message} required>
          <select {...register('district')} className="form-input">
            <option value="">Select district</option>
            {UTTARAKHAND_DISTRICTS.map((d) => <option key={d}>{d}</option>)}
          </select>
        </FormField>
        <FormField label="Phone" error={errors.phone?.message} required>
          <input {...register('phone')} type="tel" className="form-input" placeholder="10-digit number" />
        </FormField>
        <FormField label="Email" error={errors.email?.message}>
          <input {...register('email')} type="email" className="form-input" placeholder="academy@email.com" />
        </FormField>
        <FormField label="Google Maps Link" error={errors.mapsLink?.message}>
          <input {...register('mapsLink')} className="form-input" placeholder="https://maps.google.com/..." />
        </FormField>
      </div>
      <FormField label="Full Address" error={errors.address?.message} required>
        <textarea {...register('address')} className="form-input resize-y" rows={3} placeholder="Complete academy address" />
      </FormField>
      <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
        <FiUpload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p className="text-sm font-semibold text-gray-700">Upload Documents</p>
        <p className="text-xs text-gray-400 mt-1">Academy logo, photos, registration documents (PDF/JPG)</p>
        <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png" className="hidden" id="academy-docs" />
        <label htmlFor="academy-docs" className="inline-block mt-3 btn-outline text-sm cursor-pointer px-4 py-2">Choose Files</label>
      </div>
      <button type="submit" disabled={submitting} className="btn-primary w-full py-4 text-base disabled:opacity-60">
        {submitting ? 'Submitting...' : 'Submit Academy Registration'}
      </button>
    </form>
  );
}

// ─── Main Page ─────────────────────────────────────
const tabs = [
  { id: 'student', label: 'Student Registration', icon: <FiUser className="w-4 h-4" />, form: <PlayerRegistrationForm /> },
  { id: 'club', label: 'Club Affiliation', icon: <FiHome className="w-4 h-4" />, form: <AcademyRegistrationForm /> },
];

export default function RegistrationPage() {
  const [activeTab, setActiveTab] = useState('student');

  return (
    <div className="pt-20">
      {/* Header */}
      <div
        className="relative py-20 text-white text-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, #1a5cbf 100%)' }}
      >
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="relative container-custom">
          <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-3">Join USHA</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>Registration</h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Register as a player, coach, or academy and become part of the Uttarakhand Hapkido family.
          </p>
        </div>
      </div>

      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-4xl">
          {/* Tabs */}
          <div className="flex flex-col sm:flex-row gap-2 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                id={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-5 py-4 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'text-white shadow-lg scale-[1.01]'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
                style={activeTab === tab.id ? { backgroundColor: 'var(--color-primary)' } : undefined}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Form */}
          <div className="card p-6 md:p-8">
            {tabs.find((t) => t.id === activeTab)?.form}
          </div>

          {/* Info Box */}
          <div className="mt-6 card p-5 border-l-4" style={{ borderLeftColor: 'var(--color-accent)' }}>
            <h4 className="font-semibold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>Important Information</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• All registrations are subject to admin verification and approval</li>
              <li>• You will receive a confirmation with your Registration ID upon submission</li>
              <li>• Approval notification will be sent within 3–5 working days</li>
              <li>• For queries, contact: info@ushahapkido.org or +91 98765 43210</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
