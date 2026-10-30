'use client';

import { useEffect, useState } from 'react';
import { FiUpload, FiTrash2, FiImage, FiPlus } from 'react-icons/fi';
import Image from 'next/image';

interface GalleryImage {
  id: string; url: string; caption?: string; createdAt: string;
}

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/gallery');
      const data = await res.json();
      if (data.success) setImages(data.images || []);
    } catch {
      setImages([
        { id: '1', url: '/images/gallery-1.jpg', caption: 'Training Session', createdAt: new Date().toISOString() },
        { id: '2', url: '/images/gallery-2.jpg', caption: 'Championship 2024', createdAt: new Date().toISOString() },
        { id: '3', url: '/images/about.jpg', caption: 'About Hapkido', createdAt: new Date().toISOString() },
      ]);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchImages(); }, []);

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('caption', caption);
      const res = await fetch('/api/gallery', { method: 'POST', body: formData });
      if (res.ok) { await fetchImages(); setSelectedFile(null); setCaption(''); }
    } catch { alert('Upload failed'); }
    finally { setUploading(false); }
  };

  const deleteImage = async (id: string) => {
    if (!confirm('Delete this image?')) return;
    try {
      await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
      setImages((prev) => prev.filter((img) => img.id !== id));
    } catch { alert('Delete failed'); }
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-poppins)' }}>Gallery Management</h1>
        <p className="text-sm text-gray-500 mt-0.5">{images.length} images uploaded</p>
      </div>

      {/* Upload Area */}
      <div className="card p-6">
        <h2 className="font-semibold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>Upload New Image</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label
              htmlFor="gallery-upload"
              className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-8 cursor-pointer hover:border-primary hover:bg-blue-50 transition-all duration-200"
            >
              {selectedFile ? (
                <div className="text-center">
                  <FiImage className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="font-medium text-gray-700 text-sm">{selectedFile.name}</p>
                  <p className="text-xs text-gray-400">{(selectedFile.size / 1024).toFixed(0)} KB</p>
                </div>
              ) : (
                <div className="text-center">
                  <FiUpload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="font-semibold text-gray-600 text-sm">Click to upload image</p>
                  <p className="text-xs text-gray-400 mt-1">JPG, PNG up to 5MB</p>
                </div>
              )}
              <input id="gallery-upload" type="file" accept="image/*" className="hidden" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
            </label>
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <label className="form-label">Caption</label>
              <input className="form-input" placeholder="Image caption..." value={caption} onChange={(e) => setCaption(e.target.value)} />
            </div>
            <button
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
              className="btn-primary py-3 mt-auto disabled:opacity-60"
            >
              {uploading ? 'Uploading...' : <><FiUpload className="w-4 h-4" /> Upload Image</>}
            </button>
          </div>
        </div>
      </div>

      {/* Images Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array(8).fill(0).map((_, i) => <div key={i} className="skeleton aspect-square rounded-2xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image) => (
            <div key={image.id} className="group relative rounded-2xl overflow-hidden aspect-square bg-gray-100 card">
              <Image src={image.url} alt={image.caption || 'Gallery image'} fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 p-3">
                {image.caption && <p className="text-white text-xs font-medium text-center leading-tight">{image.caption}</p>}
                <button
                  onClick={() => deleteImage(image.id)}
                  className="w-9 h-9 rounded-xl bg-red-600 hover:bg-red-700 flex items-center justify-center text-white transition-colors"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
