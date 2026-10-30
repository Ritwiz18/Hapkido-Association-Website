'use client';

import type { Metadata } from 'next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FiMapPin, FiPhone, FiMail, FiClock, FiFacebook, FiInstagram, FiYoutube, FiCheck, FiChevronDown } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const contactSchema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Valid email required'),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});
type ContactForm = z.infer<typeof contactSchema>;

const faqs = [
  { q: 'How do I register as a player?', a: 'Visit our Registration page, select "Player Registration", fill in the form with your details and upload required documents. Your application will be reviewed within 3-5 working days.' },
  { q: 'What documents are required for registration?', a: 'You need a passport-size photo, Aadhaar card copy, and a medical fitness certificate. Coaches additionally need educational qualification certificates and previous belt certificates.' },
  { q: 'How long does academy affiliation take?', a: 'Academy affiliation is processed within 7-10 working days after submission of complete documents. You will receive an official certificate upon approval.' },
  { q: 'Are there age restrictions for players?', a: 'No minimum age — we welcome players of all ages! We have dedicated kids programs (5-14 years), youth programs (15-18), and adult programs.' },
  { q: 'How do I check my registration status?', a: 'You can contact our office via phone or email with your registration ID. We are working on an online status check portal that will be available soon.' },
  { q: 'Is USHA affiliated with national and international bodies?', a: 'Yes, USHA is officially affiliated with the Indian Hapkido Federation (IHF) which is in turn affiliated with the World Hapkido Federation (WHF).' },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-900 text-sm pr-4" style={{ fontFamily: 'var(--font-poppins)' }}>{q}</span>
        <FiChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-5 pb-4 bg-white">
          <p className="text-sm text-gray-600 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) { setSubmitted(true); reset(); }
      else alert('Failed to send. Please try again.');
    } catch { alert('Network error.'); }
    finally { setSubmitting(false); }
  };

  return (
    <div className="pt-20">
      {/* Header */}
      <div
        className="relative py-20 text-white text-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, #1a5cbf 100%)' }}
      >
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="relative container-custom">
          <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-3">Reach Us</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>Contact Us</h1>
          <p className="text-white/80 max-w-xl mx-auto">Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>
      </div>

      <section className="section-padding bg-gray-50">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-5">
            {[
              { icon: <FiMapPin className="w-5 h-5" />, title: 'Office Address', text: 'Sports Complex, Rajpur Road,\nDehradun, Uttarakhand – 248001' },
              { icon: <FiPhone className="w-5 h-5" />, title: 'Phone', text: '+91 98765 43210' },
              { icon: <FiMail className="w-5 h-5" />, title: 'Email', text: 'info@ushahapkido.org' },
              { icon: <FiClock className="w-5 h-5" />, title: 'Training Hours', text: 'Mon–Sat: 6:00 AM – 9:00 AM\nMon–Sat: 5:00 PM – 8:00 PM' },
            ].map((item) => (
              <div key={item.title} className="card p-5 flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1 text-sm" style={{ fontFamily: 'var(--font-poppins)' }}>{item.title}</h4>
                  <p className="text-sm text-gray-600 whitespace-pre-line">{item.text}</p>
                </div>
              </div>
            ))}

            {/* Social Media */}
            <div className="card p-5">
              <h4 className="font-semibold text-gray-900 mb-3 text-sm" style={{ fontFamily: 'var(--font-poppins)' }}>Follow Us</h4>
              <div className="flex gap-3">
                {[
                  { icon: <FiFacebook className="w-5 h-5" />, label: 'Facebook', bg: '#1877f2' },
                  { icon: <FiInstagram className="w-5 h-5" />, label: 'Instagram', bg: '#e1306c' },
                  { icon: <FiYoutube className="w-5 h-5" />, label: 'YouTube', bg: '#ff0000' },
                  { icon: <FaWhatsapp className="w-5 h-5" />, label: 'WhatsApp', bg: '#25d366', href: 'https://wa.me/919876543210' },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.label}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white transition-transform hover:scale-110"
                    style={{ backgroundColor: s.bg }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="card overflow-hidden rounded-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27627.782591869283!2d77.9907!3d30.3165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390929c356c888af%3A0x4c3562c032518799!2sDehradun%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="USHA Location"
              />
            </div>
          </div>

          {/* Contact Form + FAQ */}
          <div className="lg:col-span-2 space-y-8">
            {/* Form */}
            <div className="card p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-poppins)' }}>
                Send Us a Message
              </h2>
              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <FiCheck className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-500">We've received your message and will get back to you within 24 hours.</p>
                  <button onClick={() => setSubmitted(false)} className="mt-4 btn-outline text-sm px-5 py-2.5">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="form-label">Full Name <span className="text-red-500">*</span></label>
                      <input {...register('name')} className="form-input" placeholder="Your full name" />
                      {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="form-label">Email Address <span className="text-red-500">*</span></label>
                      <input {...register('email')} type="email" className="form-input" placeholder="your@email.com" />
                      {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Subject</label>
                    <input {...register('subject')} className="form-input" placeholder="What is this about?" />
                  </div>
                  <div>
                    <label className="form-label">Message <span className="text-red-500">*</span></label>
                    <textarea {...register('message')} rows={5} className="form-input resize-y" placeholder="Write your message here..." />
                    {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
                  </div>
                  <button type="submit" disabled={submitting} className="btn-primary w-full py-4 text-base disabled:opacity-60">
                    {submitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-5" style={{ fontFamily: 'var(--font-poppins)' }}>
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {faqs.map((faq, i) => <FAQItem key={i} {...faq} />)}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
