import Link from 'next/link';
import Image from 'next/image';
import { FiFacebook, FiInstagram, FiYoutube, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Leadership', href: '/#leadership' },
  { label: 'Events', href: '/events' },
  { label: 'Photo Gallery', href: '/gallery' },
  { label: 'Contact Us', href: '/contact' },
];

const programLinks = [
  { label: 'Student Registration', href: '/registration#student' },
  { label: 'Club Affiliation', href: '/registration#club' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="flex-shrink-0">
                <Image
                  src="/images/usha-logo.jpg"
                  alt="Uttarakhand Sports Hapkido Association logo"
                  width={1536}
                  height={1024}
                  className="w-16 h-auto object-contain"
                  priority
                />
              </div>
              <div>
                <div className="font-bold text-white" style={{ fontFamily: 'var(--font-poppins)' }}>
                  USHA Hapkido
                </div>
                <div className="text-xs text-gray-400">Est. 2010 · Uttarakhand</div>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              The premier governing body for Hapkido in Uttarakhand, developing champions and
              spreading the noble art since 2010.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 transition-all duration-200"
                aria-label="Facebook"
              >
                <FiFacebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-pink-600 transition-all duration-200"
                aria-label="Instagram"
              >
                <FiInstagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600 transition-all duration-200"
                aria-label="YouTube"
              >
                <FiYoutube className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-green-600 transition-all duration-200"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-5" style={{ fontFamily: 'var(--font-poppins)' }}>
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-accent transition-colors"
                      style={{ backgroundColor: undefined }}
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-white font-semibold mb-5" style={{ fontFamily: 'var(--font-poppins)' }}>
              Registration & More
            </h4>
            <ul className="space-y-2.5">
              {programLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-gray-300 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-5" style={{ fontFamily: 'var(--font-poppins)' }}>
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FiMapPin className="w-4 h-4 text-accent mt-0.5 shrink-0" style={{ color: 'var(--color-accent)' }} />
                <span className="text-sm text-gray-400 leading-relaxed">
                  Sports Complex, Rajpur Road,<br />
                  Dehradun, Uttarakhand – 248001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="w-4 h-4 shrink-0" style={{ color: 'var(--color-accent)' }} />
                <a href="tel:+919876543210" className="text-sm text-gray-400 hover:text-white transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="w-4 h-4 shrink-0" style={{ color: 'var(--color-accent)' }} />
                <a href="mailto:info@ushahapkido.org" className="text-sm text-gray-400 hover:text-white transition-colors">
                  info@ushahapkido.org
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wider">Training Hours</p>
              <p className="text-sm text-gray-400">Mon–Sat: 6:00 AM – 9:00 AM</p>
              <p className="text-sm text-gray-400">Mon–Sat: 5:00 PM – 8:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500 text-center sm:text-left">
            © {currentYear} Uttarakhand Hapkido Association. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/contact" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              Terms of Use
            </Link>
            <Link href="/admin/login" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
