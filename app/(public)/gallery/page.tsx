'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiZoomIn, FiPlay } from 'react-icons/fi';

const albums = [
  {
    id: '1', title: 'State Championship 2024',
    images: [
      { src: '/images/gallery-2.jpg', caption: 'Opening Ceremony' },
      { src: '/images/gallery-1.jpg', caption: 'Semi-Final Match' },
      { src: '/images/about.jpg', caption: 'Medal Ceremony' },
      { src: '/images/hero-bg.jpg', caption: 'Team Photo' },
    ],
  },
  {
    id: '2', title: 'Summer Training Camp 2024',
    images: [
      { src: '/images/gallery-1.jpg', caption: 'Morning Session' },
      { src: '/images/about.jpg', caption: 'Technique Practice' },
      { src: '/images/gallery-2.jpg', caption: 'Group Training' },
      { src: '/images/hero-bg.jpg', caption: 'Evening Session' },
    ],
  },
  {
    id: '3', title: 'International Seminar 2024',
    images: [
      { src: '/images/hero-bg.jpg', caption: 'Grand Master Demonstration' },
      { src: '/images/gallery-1.jpg', caption: 'Interactive Session' },
      { src: '/images/about.jpg', caption: 'Certificate Distribution' },
    ],
  },
  {
    id: '4', title: 'Belt Grading — Spring 2025',
    images: [
      { src: '/images/gallery-1.jpg', caption: 'Examination' },
      { src: '/images/about.jpg', caption: 'Results Announcement' },
      { src: '/images/gallery-2.jpg', caption: 'New Black Belts' },
    ],
  },
];

type ImageType = { src: string; caption: string };

export default function GalleryPage() {
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<ImageType | null>(null);

  const currentAlbum = selectedAlbum ? albums.find((a) => a.id === selectedAlbum) : null;
  const allImages = albums.flatMap((a) => a.images);
  const displayImages = currentAlbum ? currentAlbum.images : allImages;

  return (
    <div className="pt-20">
      {/* Header */}
      <div
        className="relative py-20 text-white text-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, #1a5cbf 100%)' }}
      >
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="relative container-custom">
          <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-3">Media</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>Photo Gallery</h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Moments from training sessions, championships, seminars, and celebrations.
          </p>
        </div>
      </div>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          {/* Album Filter */}
          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={() => setSelectedAlbum(null)}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
              style={!selectedAlbum ? { backgroundColor: 'var(--color-primary)', color: 'white' } : { backgroundColor: 'white', color: '#4b5563', border: '1px solid #e5e7eb' }}
            >
              All Photos ({allImages.length})
            </button>
            {albums.map((album) => (
              <button
                key={album.id}
                onClick={() => setSelectedAlbum(album.id)}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                style={selectedAlbum === album.id ? { backgroundColor: 'var(--color-primary)', color: 'white' } : { backgroundColor: 'white', color: '#4b5563', border: '1px solid #e5e7eb' }}
              >
                {album.title} ({album.images.length})
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {displayImages.map((img, i) => (
              <motion.div
                key={`${img.src}-${i}`}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative overflow-hidden rounded-2xl cursor-pointer group break-inside-avoid"
                onClick={() => setLightbox(img)}
              >
                <Image
                  src={img.src}
                  alt={img.caption}
                  width={400}
                  height={300}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3">
                  <p className="text-white text-xs font-medium leading-tight">{img.caption}</p>
                  <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <FiZoomIn className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative max-w-5xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-10 right-0 text-white/70 hover:text-white p-2 transition-colors"
                aria-label="Close"
              >
                <FiX className="w-6 h-6" />
              </button>
              <div className="relative rounded-2xl overflow-hidden bg-black" style={{ maxHeight: '80vh' }}>
                <Image
                  src={lightbox.src}
                  alt={lightbox.caption}
                  width={1200}
                  height={800}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
              </div>
              {lightbox.caption && (
                <p className="text-center text-white/70 text-sm mt-3">{lightbox.caption}</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
