'use client';

import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton({ phoneNumber }: { phoneNumber: string }) {
  const cleaned = phoneNumber.replace(/\D/g, '');
  return (
    <a
      href={`https://wa.me/${cleaned}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-btn"
      aria-label="Chat on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <FaWhatsapp className="w-7 h-7 text-white" />
    </a>
  );
}
