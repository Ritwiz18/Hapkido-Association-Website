'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiZoomIn, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const sampleImages = [
  { src: '/images/gallery-1.jpg', caption: 'Group Training Session' },
  { src: '/images/gallery-2.jpg', caption: 'State Championship 2024' },
  { src: '/images/about.jpg', caption: 'Hapkido Techniques' },
  { src: '/images/hero-bg.jpg', caption: 'Black Belt Grading' },
  { src: '/images/gallery-1.jpg', caption: 'Kids Program' },
  { src: '/images/gallery-2.jpg', caption: 'International Seminar' },
];

interface GalleryImage {
  url: string;
  caption?: string | null;
}

interface GalleryPreviewProps {
  images?: GalleryImage[];
}

export default function GalleryPreview({ images }: GalleryPreviewProps) {
  const [lightbox, setLightbox] = useState<{ src: string; caption: string } | null>(null);
  const displayImages = images && images.length > 0
    ? images.map((img) => ({ src: img.url, caption: img.caption || '' }))
    : sampleImages;

  return (
    <section className="section-padding bg-gray-50" id="gallery">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <span className="section-tag">Media</span>
            <h2 className="section-title text-3xl md:text-4xl">Photo Gallery</h2>
            <div className="accent-line mb-0" />
          </div>
          <Link href="/gallery" className="btn-outline shrink-0 text-sm px-5 py-2.5">
            View Gallery <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {displayImages.slice(0, 6).map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group ${i === 0 ? 'md:row-span-2 aspect-square md:aspect-auto' : 'aspect-square'}`}
              onClick={() => setLightbox(img)}
            >
              <Image
                src={img.src}
                alt={img.caption}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
                  <p className="text-white text-sm font-medium leading-tight">{img.caption}</p>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <FiZoomIn className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-10 right-0 text-white p-2 hover:text-gray-300 transition-colors z-10"
                aria-label="Close lightbox"
              >
                <FiX className="w-6 h-6" />
              </button>
              <div className="relative rounded-2xl overflow-hidden bg-black aspect-video">
                <Image
                  src={lightbox.src}
                  alt={lightbox.caption}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
              {lightbox.caption && (
                <p className="text-center text-white/80 text-sm mt-3">{lightbox.caption}</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
