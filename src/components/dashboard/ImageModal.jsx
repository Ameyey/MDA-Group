import React, { useState, useEffect, useRef } from 'react';
import { X, UploadCloud, Image as ImageIcon, AlertCircle, Loader2, Check, Sparkles } from 'lucide-react';

const CATEGORY_PRESETS = [
  'Customer',
  'Event',
  'Customer Installation',
  'Corporate Event',
  'Product Launch',
  'Exhibition Expo',
  'General'
];

export function ImageModal({
  isOpen,
  mode = 'create', // 'create' | 'edit'
  initialImage = null,
  onClose,
  onSubmit,
  isSubmitting = false
}) {
  const fileInputRef = useRef(null);
  const [form, setForm] = useState({
    title: '',
    altText: '',
    category: 'Customer',
    description: '',
    tags: '',
    status: 'Active'
  });

  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && initialImage) {
        setForm({
          title: initialImage.title || '',
          altText: initialImage.altText || '',
          category: initialImage.category || 'Equipment',
          description: initialImage.description || '',
          tags: Array.isArray(initialImage.tags) ? initialImage.tags.join(', ') : initialImage.tags || '',
          status: initialImage.status || 'Active'
        });
        setPreviews([initialImage.url]);
        setFiles([]);
      } else {
        setForm({
          title: '',
          altText: '',
          category: 'Equipment',
          description: '',
          tags: '',
          status: 'Active'
        });
        setFiles([]);
        setPreviews([]);
      }
      setErrors({});
    }
  }, [isOpen, mode, initialImage]);

  if (!isOpen) return null;

  const handleFileChange = (selectedFiles) => {
    const validFiles = Array.from(selectedFiles).filter((file) => file.type.startsWith('image/'));
    if (!validFiles.length) {
      setErrors((prev) => ({ ...prev, files: 'Please select valid image files (JPG, PNG, WebP, SVG).' }));
      return;
    }

    setFiles(validFiles);
    setErrors((prev) => ({ ...prev, files: null }));

    // Generate local Object URL previews
    const newPreviews = validFiles.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);

    // Auto-fill title & alt text if empty
    if (!form.title && validFiles.length === 1) {
      const fileNameWithoutExt = validFiles[0].name.replace(/\.[^/.]+$/, '');
      const formattedTitle = fileNameWithoutExt.replace(/[-_]/g, ' ');
      setForm((prev) => ({
        ...prev,
        title: formattedTitle,
        altText: formattedTitle
      }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files);
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Image Title is required.';
    if (!form.altText.trim()) errs.altText = 'Alt Text is required.';
    if (!form.category.trim()) errs.category = 'Category is required.';
    if (!form.description.trim()) errs.description = 'Description is required.';
    if (mode === 'create' && files.length === 0 && previews.length === 0) {
      errs.files = 'At least one image file is required.';
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit({
      form,
      files,
      mode,
      initialImage
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <UploadCloud className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {mode === 'create' ? 'Upload Image Asset' : 'Update Image Details'}
              </h3>
              <p className="text-xs text-slate-400">
                {mode === 'create'
                  ? 'Add single or multiple image assets to your Cloudinary storage'
                  : 'Modify title, category, alt text, tags, and visibility status'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* File Upload Zone (Create Mode or Edit Replace) */}
          {mode === 'create' && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Image File Upload (Single or Multiple)
              </label>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center cursor-pointer transition-all duration-200 ${
                  isDragging
                    ? 'border-cyan-400 bg-cyan-950/30 scale-[1.01]'
                    : 'border-slate-700/80 bg-slate-950/60 hover:border-slate-600 hover:bg-slate-950'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => e.target.files && handleFileChange(e.target.files)}
                  className="hidden"
                />

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-3">
                  <UploadCloud className="h-6 w-6" />
                </div>

                <p className="text-sm font-semibold text-slate-200">
                  <span className="text-cyan-400 underline">Click to select files</span> or drag and drop
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  PNG, JPG, WebP, GIF, SVG up to 10MB each. Multiple selection enabled.
                </p>

                {errors.files && (
                  <p className="mt-2 text-xs font-semibold text-red-400">{errors.files}</p>
                )}
              </div>
            </div>
          )}

          {/* Image Preview Strip */}
          {previews.length > 0 && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Selected Preview ({previews.length} {previews.length === 1 ? 'file' : 'files'})
              </label>
              <div className="flex flex-wrap gap-3 p-3 rounded-2xl border border-slate-800 bg-slate-950/60 max-h-36 overflow-y-auto">
                {previews.map((src, idx) => (
                  <div key={idx} className="relative h-20 w-24 overflow-hidden rounded-xl border border-slate-700/60 bg-slate-900 group">
                    <img src={src} alt="Preview" className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Title & Category Row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Image Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Precision CNC Machining Unit"
                className="w-full rounded-xl border border-slate-700/80 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
              />
              {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Category <span className="text-red-400">*</span>
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full rounded-xl border border-slate-700/80 bg-slate-950 px-3.5 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none"
              >
                {CATEGORY_PRESETS.map((cat) => (
                  <option key={cat} value={cat} className="bg-slate-900 text-white">
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && <p className="mt-1 text-xs text-red-400">{errors.category}</p>}
            </div>
          </div>

          {/* Alt Text & Status Row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Alt Text (SEO & Accessibility) <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={form.altText}
                onChange={(e) => setForm({ ...form, altText: e.target.value })}
                placeholder="Screen reader description"
                className="w-full rounded-xl border border-slate-700/80 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
              />
              {errors.altText && <p className="mt-1 text-xs text-red-400">{errors.altText}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Visibility Status
              </label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full rounded-xl border border-slate-700/80 bg-slate-950 px-3.5 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none"
              >
                <option value="Active" className="bg-slate-900 text-white">Active (Visible)</option>
                <option value="Inactive" className="bg-slate-900 text-white">Inactive (Hidden/Draft)</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Description <span className="text-red-400">*</span>
            </label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Detailed description of the image asset..."
              className="w-full rounded-xl border border-slate-700/80 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
            />
            {errors.description && <p className="mt-1 text-xs text-red-400">{errors.description}</p>}
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Tags (Comma Separated)
            </label>
            <input
              type="text"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              placeholder="cnc, machinery, titanium, aerospace"
              className="w-full rounded-xl border border-slate-700/80 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-700/60 bg-slate-950 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving Asset...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4" />
                  {mode === 'create' ? 'Upload to Cloud Storage' : 'Save Changes'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
