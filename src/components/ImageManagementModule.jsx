import { useEffect, useMemo, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  AlertCircle,
  Archive,
  ArrowLeft,
  CheckCircle2,
  Copy,
  Download,
  Eye,
  ImagePlus,
  Loader2,
  Search,
  Sparkles,
  Trash2,
  UploadCloud,
  X
} from 'lucide-react';
import { formatBytes, formatDate, imageService } from '../services/imageService';

const STATUS_OPTIONS = ['All', 'Active', 'Inactive'];
const SORT_OPTIONS = ['Newest', 'Oldest', 'Name A–Z', 'File Size'];
const INITIAL_FORM = {
  title: '',
  altText: '',
  category: '',
  description: '',
  tags: '',
  status: 'Active'
};

function getInitialState() {
  return {
    form: INITIAL_FORM,
    imageFile: null,
    previewUrl: '',
    progress: 0,
    isSubmitting: false,
    isDragging: false,
    selectedIds: []
  };
}

function validateForm(values) {
  const errors = {};
  if (!values.title.trim()) errors.title = 'Title is required.';
  if (!values.altText.trim()) errors.altText = 'Alt text is required.';
  if (!values.category.trim()) errors.category = 'Category is required.';
  if (!values.description.trim()) errors.description = 'Description is required.';
  if (!values.tags.trim()) errors.tags = 'Add at least one tag.';
  return errors;
}

function createPreviewUrl(file) {
  if (!file) return '';
  return URL.createObjectURL(file);
}

function ImageManagementModule({ onBackToHome }) {
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');
  const [modalMode, setModalMode] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);
  const [state, setState] = useState(getInitialState());
  const [errors, setErrors] = useState({});
  const [viewingImage, setViewingImage] = useState(null);
  const [isBulkToolbarVisible, setIsBulkToolbarVisible] = useState(false);

  const { data: images = [], isLoading, isError } = useQuery({
    queryKey: ['images'],
    queryFn: imageService.fetchImages,
    staleTime: 1000 * 60
  });

  useEffect(() => {
    return () => {
      if (state.previewUrl) URL.revokeObjectURL(state.previewUrl);
    };
  }, [state.previewUrl]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const mutationOptions = {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['images'] });
      setToast('Image saved successfully');
      closeModal();
    },
    onError: () => {
      setToast('Could not save image right now.');
    }
  };

  const createMutation = useMutation({
    mutationFn: imageService.createImage,
    ...mutationOptions
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => imageService.updateImage(id, payload),
    ...mutationOptions
  });

  const deleteMutation = useMutation({
    mutationFn: imageService.deleteImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['images'] });
      setToast('Image removed.');
      setDeleteTarget(null);
    },
    onError: () => {
      setToast('Delete failed.');
    }
  });

  const categories = useMemo(() => ['All', ...new Set(images.map((item) => item.category).filter(Boolean))], [images]);

  const filteredImages = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const visible = images.filter((image) => {
      const matchesQuery = !normalizedQuery || [image.title, image.category, image.description, ...(image.tags || [])].join(' ').toLowerCase().includes(normalizedQuery);
      const matchesCategory = categoryFilter === 'All' || image.category === categoryFilter;
      const matchesStatus = statusFilter === 'All' || image.status === statusFilter;
      return matchesQuery && matchesCategory && matchesStatus;
    });

    return [...visible].sort((left, right) => {
      switch (sortBy) {
        case 'Oldest':
          return new Date(left.uploadedAt) - new Date(right.uploadedAt);
        case 'Name A–Z':
          return left.title.localeCompare(right.title);
        case 'File Size':
          return (right.fileSize || 0) - (left.fileSize || 0);
        case 'Newest':
        default:
          return new Date(right.uploadedAt) - new Date(left.uploadedAt);
      }
    });
  }, [images, categoryFilter, query, sortBy, statusFilter]);

  const stats = useMemo(() => {
    const total = images.length;
    const active = images.filter((img) => img.status === 'Active').length;
    const inactive = total - active;
    const storageUsed = images.reduce((sum, item) => sum + (item.fileSize || 0), 0);
    return { total, active, inactive, storageUsed };
  }, [images]);

  const openCreateModal = () => {
    setModalMode('create');
    setSelectedImage(null);
    setErrors({});
    setState((prev) => ({ ...getInitialState(), form: { ...INITIAL_FORM }, previewUrl: prev.previewUrl }));
  };

  const openEditModal = (image) => {
    setModalMode('edit');
    setSelectedImage(image);
    setErrors({});
    setState((prev) => ({
      ...getInitialState(),
      form: {
        title: image.title || '',
        altText: image.altText || '',
        category: image.category || '',
        description: image.description || '',
        tags: (image.tags || []).join(', '),
        status: image.status || 'Active'
      },
      previewUrl: image.url || ''
    }));
  };

  const closeModal = () => {
    setModalMode(null);
    setSelectedImage(null);
    setState(getInitialState());
    setErrors({});
  };

  const handleFileSelection = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const nextPreview = createPreviewUrl(file);
    setState((prev) => ({ ...prev, imageFile: file, previewUrl: nextPreview }));
    setToast('Image selected. You can continue editing.');
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setState((prev) => ({ ...prev, isDragging: false }));
    const file = event.dataTransfer.files?.[0];
    if (!file) return;
    const nextPreview = createPreviewUrl(file);
    setState((prev) => ({ ...prev, imageFile: file, previewUrl: nextPreview }));
    setToast('File dropped and ready to upload.');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm(state.form);
    if (state.imageFile && !state.imageFile.type.startsWith('image/')) {
      validationErrors.imageFile = 'Please choose an image file.';
    }
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    const transformedTags = state.form.tags.split(',').map((item) => item.trim()).filter(Boolean);
    const payload = {
      ...state.form,
      tags: transformedTags,
      fileName: state.imageFile?.name || selectedImage?.fileName || 'image.webp',
      fileSize: state.imageFile?.size || selectedImage?.fileSize || 0,
      mimeType: state.imageFile?.type || selectedImage?.mimeType || 'image/webp',
      url: state.imageFile ? state.previewUrl : selectedImage?.url,
      uploadedAt: new Date().toISOString()
    };

    if (modalMode === 'edit' && selectedImage) {
      updateMutation.mutate({ id: selectedImage.id, payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const handleDelete = (image) => {
    setDeleteTarget(image);
  };

  const confirmDelete = () => {
    if (deleteTarget) deleteMutation.mutate(deleteTarget.id);
  };

  const toggleSelection = (id) => {
    setState((prev) => ({
      ...prev,
      selectedIds: prev.selectedIds.includes(id)
        ? prev.selectedIds.filter((item) => item !== id)
        : [...prev.selectedIds, id]
    }));
    setIsBulkToolbarVisible(true);
  };

  const bulkUpdateStatus = (status) => {
    const updatedImages = images.filter((image) => state.selectedIds.includes(image.id));
    if (!updatedImages.length) return;
    const promiseList = updatedImages.map((image) => imageService.updateImage(image.id, { ...image, status }));
    Promise.all(promiseList).then(() => {
      queryClient.invalidateQueries({ queryKey: ['images'] });
      setToast(`Updated ${updatedImages.length} item(s).`);
      setState((prev) => ({ ...prev, selectedIds: [] }));
      setIsBulkToolbarVisible(false);
    });
  };

  const bulkDelete = () => {
    const selected = images.filter((image) => state.selectedIds.includes(image.id));
    if (!selected.length) return;
    const promiseList = selected.map((image) => imageService.deleteImage(image.id));
    Promise.all(promiseList).then(() => {
      queryClient.invalidateQueries({ queryKey: ['images'] });
      setToast(`Deleted ${selected.length} item(s).`);
      setState((prev) => ({ ...prev, selectedIds: [] }));
      setIsBulkToolbarVisible(false);
    });
  };

  const handleCopyUrl = async (image) => {
    try {
      await navigator.clipboard.writeText(image.url || '');
      setToast('Image URL copied.');
    } catch {
      setToast('Clipboard access unavailable.');
    }
  };

  const handleDownload = (image) => {
    const link = document.createElement('a');
    link.href = image.url || '';
    link.download = image.fileName || 'image';
    link.click();
    setToast('Download started.');
  };

  return (
    <section className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-cyan-950/30">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-300">
                <Sparkles size={16} /> Image Management Studio
              </div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Single-page image CRUD dashboard</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-400 sm:text-base">Create, review, replace, and organize media assets from one responsive admin workspace.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {onBackToHome ? (
                <button
                  type="button"
                  onClick={onBackToHome}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-slate-800/70 px-4 py-3 font-semibold text-slate-200 transition hover:bg-slate-700"
                >
                  <ArrowLeft size={18} /> Back to Home
                </button>
              ) : null}
              <button
                type="button"
                onClick={openCreateModal}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                <ImagePlus size={18} /> Add Image
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { label: 'Total Images', value: stats.total, tone: 'from-cyan-500 to-sky-600' },
            { label: 'Active Images', value: stats.active, tone: 'from-emerald-500 to-green-600' },
            { label: 'Inactive Images', value: stats.inactive, tone: 'from-amber-500 to-orange-600' },
            { label: 'Storage Used', value: formatBytes(stats.storageUsed), tone: 'from-fuchsia-500 to-purple-600' }
          ].map((card) => (
            <div key={card.label} className={`rounded-3xl border border-white/10 bg-gradient-to-br ${card.tone} p-[1px]`}>
              <div className="rounded-[calc(1.5rem-1px)] bg-slate-900/90 p-5">
                <p className="text-sm text-slate-400">{card.label}</p>
                <p className="mt-3 text-2xl font-semibold text-white">{card.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-4 shadow-xl shadow-slate-950/30 lg:p-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by title, category, or tags"
                className="w-full rounded-2xl border border-white/10 bg-slate-800/70 py-3 pl-12 pr-4 text-sm text-white outline-none ring-0"
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <label className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-800/70 px-3 py-2 text-sm text-slate-300">
                <span className="text-slate-500">Category</span>
                <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} className="flex-1 bg-transparent outline-none">
                  {categories.map((category) => (
                    <option key={category} value={category} className="bg-slate-900">
                      {category}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-800/70 px-3 py-2 text-sm text-slate-300">
                <span className="text-slate-500">Status</span>
                <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="flex-1 bg-transparent outline-none">
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status} className="bg-slate-900">
                      {status}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-800/70 px-3 py-2 text-sm text-slate-300">
                <span className="text-slate-500">Sort</span>
                <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="flex-1 bg-transparent outline-none">
                  {SORT_OPTIONS.map((option) => (
                    <option key={option} value={option} className="bg-slate-900">
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <button type="button" onClick={openCreateModal} className="rounded-2xl border border-cyan-400/40 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-500/20">
                + Add Image
              </button>
            </div>
          </div>

          {isBulkToolbarVisible && state.selectedIds.length ? (
            <div className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-3">
              <span className="text-sm text-cyan-200">{state.selectedIds.length} selected</span>
              <button type="button" onClick={() => bulkUpdateStatus('Active')} className="rounded-xl bg-emerald-500/20 px-3 py-2 text-sm text-emerald-300">Set Active</button>
              <button type="button" onClick={() => bulkUpdateStatus('Inactive')} className="rounded-xl bg-amber-500/20 px-3 py-2 text-sm text-amber-300">Set Inactive</button>
              <button type="button" onClick={bulkDelete} className="rounded-xl bg-rose-500/20 px-3 py-2 text-sm text-rose-300">Bulk Delete</button>
            </div>
          ) : null}
        </div>

        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="animate-pulse rounded-3xl border border-white/10 bg-slate-900/60 p-4">
                <div className="h-40 rounded-2xl bg-slate-800" />
                <div className="mt-4 h-4 w-24 rounded bg-slate-800" />
                <div className="mt-3 h-3 w-full rounded bg-slate-800" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="rounded-3xl border border-rose-400/20 bg-rose-500/10 p-8 text-center text-rose-200">
            <AlertCircle className="mx-auto mb-3" />
            <h2 className="text-xl font-semibold">Something went wrong.</h2>
            <p className="mt-2 text-sm text-rose-100/80">The image list could not be loaded right now.</p>
          </div>
        ) : filteredImages.length ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredImages.map((image) => (
              <article key={image.id} className="group rounded-3xl border border-white/10 bg-slate-900/80 p-4 shadow-lg transition hover:-translate-y-1 hover:border-cyan-400/40">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-slate-400">
                    <input type="checkbox" checked={state.selectedIds.includes(image.id)} onChange={() => toggleSelection(image.id)} className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-cyan-500" />
                    Select
                  </label>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${image.status === 'Active' ? 'bg-emerald-500/15 text-emerald-300' : 'bg-amber-500/15 text-amber-300'}`}>
                    {image.status}
                  </span>
                </div>
                <div className="mt-4 overflow-hidden rounded-2xl">
                  <img src={image.url} alt={image.altText} className="h-48 w-full object-cover transition duration-300 group-hover:scale-105" />
                </div>
                <div className="mt-4 space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{image.title}</h3>
                    <p className="mt-1 text-sm text-slate-400">{image.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-white/10 bg-slate-800/80 px-2.5 py-1 text-xs text-slate-300">{image.category}</span>
                    {(image.tags || []).slice(0, 3).map((tag) => (
                      <span key={tag} className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-2.5 py-1 text-xs text-cyan-300">#{tag}</span>
                    ))}
                  </div>
                  <div className="grid gap-2 text-sm text-slate-400 sm:grid-cols-2">
                    <div><span className="font-medium text-slate-300">Alt:</span> {image.altText}</div>
                    <div><span className="font-medium text-slate-300">Uploaded:</span> {formatDate(image.uploadedAt)}</div>
                    <div><span className="font-medium text-slate-300">Size:</span> {formatBytes(image.fileSize)}</div>
                    <div><span className="font-medium text-slate-300">File:</span> {image.fileName}</div>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <button type="button" onClick={() => setViewingImage(image)} className="rounded-xl border border-white/10 bg-slate-800/80 p-2 text-slate-300 transition hover:bg-slate-700" title="View"><Eye size={16} /></button>
                  <button type="button" onClick={() => openEditModal(image)} className="rounded-xl border border-cyan-400/20 bg-cyan-500/10 p-2 text-cyan-300 transition hover:bg-cyan-500/20" title="Edit"><Archive size={16} /></button>
                  <button type="button" onClick={() => setToast('Replace image flow ready for your backend integration.')} className="rounded-xl border border-fuchsia-400/20 bg-fuchsia-500/10 p-2 text-fuchsia-300 transition hover:bg-fuchsia-500/20" title="Replace"><UploadCloud size={16} /></button>
                  <button type="button" onClick={() => handleDownload(image)} className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 p-2 text-emerald-300 transition hover:bg-emerald-500/20" title="Download"><Download size={16} /></button>
                  <button type="button" onClick={() => handleCopyUrl(image)} className="rounded-xl border border-sky-400/20 bg-sky-500/10 p-2 text-sky-300 transition hover:bg-sky-500/20" title="Copy URL"><Copy size={16} /></button>
                  <button type="button" onClick={() => handleDelete(image)} className="rounded-xl border border-rose-400/20 bg-rose-500/10 p-2 text-rose-300 transition hover:bg-rose-500/20" title="Delete"><Trash2 size={16} /></button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-white/10 bg-slate-900/60 p-10 text-center">
            <ImagePlus className="mx-auto text-cyan-400" size={28} />
            <h2 className="mt-4 text-xl font-semibold text-white">No images found</h2>
            <p className="mt-2 text-sm text-slate-400">Adjust your filters or add your first image to populate the gallery.</p>
          </div>
        )}
      </div>

      {modalMode ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-6 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">{modalMode === 'edit' ? 'Edit' : 'Add'} image</p>
                <h2 className="mt-1 text-2xl font-semibold text-white">{modalMode === 'edit' ? 'Update image metadata' : 'Upload a new image'}</h2>
              </div>
              <button type="button" onClick={closeModal} className="rounded-full border border-white/10 p-2 text-slate-300">
                <X size={18} />
              </button>
            </div>

            <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
              <div
                onDragOver={(event) => {
                  event.preventDefault();
                  setState((prev) => ({ ...prev, isDragging: true }));
                }}
                onDragLeave={() => setState((prev) => ({ ...prev, isDragging: false }))}
                onDrop={handleDrop}
                className={`rounded-3xl border-2 border-dashed p-6 text-center transition ${state.isDragging ? 'border-cyan-400 bg-cyan-500/10' : 'border-white/10 bg-slate-800/40'}`}
              >
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelection} className="hidden" />
                <UploadCloud className="mx-auto text-cyan-400" size={28} />
                <p className="mt-3 text-sm text-slate-300">Drag and drop a file here or <button type="button" onClick={() => fileInputRef.current?.click()} className="font-semibold text-cyan-300">browse</button>.</p>
                <p className="mt-1 text-xs text-slate-500">PNG, JPG, WebP supported · up to 10MB in this demo</p>
                {state.previewUrl ? (
                  <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
                    <img src={state.previewUrl} alt="Preview" className="mx-auto max-h-48 object-contain" />
                  </div>
                ) : null}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2 text-sm">
                  <span className="text-slate-300">Title</span>
                  <input value={state.form.title} onChange={(event) => setState((prev) => ({ ...prev, form: { ...prev.form, title: event.target.value } }))} className="w-full rounded-2xl border border-white/10 bg-slate-800/70 px-3 py-3 text-white outline-none" />
                  {errors.title ? <p className="text-xs text-rose-300">{errors.title}</p> : null}
                </label>
                <label className="space-y-2 text-sm">
                  <span className="text-slate-300">Alt Text</span>
                  <input value={state.form.altText} onChange={(event) => setState((prev) => ({ ...prev, form: { ...prev.form, altText: event.target.value } }))} className="w-full rounded-2xl border border-white/10 bg-slate-800/70 px-3 py-3 text-white outline-none" />
                  {errors.altText ? <p className="text-xs text-rose-300">{errors.altText}</p> : null}
                </label>
                <label className="space-y-2 text-sm">
                  <span className="text-slate-300">Category</span>
                  <input value={state.form.category} onChange={(event) => setState((prev) => ({ ...prev, form: { ...prev.form, category: event.target.value } }))} className="w-full rounded-2xl border border-white/10 bg-slate-800/70 px-3 py-3 text-white outline-none" />
                  {errors.category ? <p className="text-xs text-rose-300">{errors.category}</p> : null}
                </label>
                <label className="space-y-2 text-sm">
                  <span className="text-slate-300">Status</span>
                  <select value={state.form.status} onChange={(event) => setState((prev) => ({ ...prev, form: { ...prev.form, status: event.target.value } }))} className="w-full rounded-2xl border border-white/10 bg-slate-800/70 px-3 py-3 text-white outline-none">
                    <option value="Active" className="bg-slate-900">Active</option>
                    <option value="Inactive" className="bg-slate-900">Inactive</option>
                  </select>
                </label>
              </div>

              <label className="space-y-2 text-sm">
                <span className="text-slate-300">Description</span>
                <textarea value={state.form.description} onChange={(event) => setState((prev) => ({ ...prev, form: { ...prev.form, description: event.target.value } }))} rows="3" className="w-full rounded-2xl border border-white/10 bg-slate-800/70 px-3 py-3 text-white outline-none" />
                {errors.description ? <p className="text-xs text-rose-300">{errors.description}</p> : null}
              </label>

              <label className="space-y-2 text-sm">
                <span className="text-slate-300">Tags</span>
                <input value={state.form.tags} onChange={(event) => setState((prev) => ({ ...prev, form: { ...prev.form, tags: event.target.value } }))} placeholder="e.g. industrial, warehouse, spare" className="w-full rounded-2xl border border-white/10 bg-slate-800/70 px-3 py-3 text-white outline-none" />
                {errors.tags ? <p className="text-xs text-rose-300">{errors.tags}</p> : null}
              </label>

              <div className="rounded-2xl border border-white/10 bg-slate-800/50 p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-cyan-300">
                  <CheckCircle2 size={16} /> Included capabilities
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-400">
                  {['Drag & drop upload', 'Image preview', 'Status control', 'Responsive gallery', 'Toast feedback'].map((item) => (
                    <span key={item} className="rounded-full border border-white/10 px-2.5 py-1">{item}</span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap justify-end gap-3">
                <button type="button" onClick={closeModal} className="rounded-2xl border border-white/10 px-4 py-3 text-sm font-semibold text-slate-300">Cancel</button>
                <button type="submit" disabled={createMutation.isPending || updateMutation.isPending} className="inline-flex items-center gap-2 rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60">
                  {(createMutation.isPending || updateMutation.isPending) ? <Loader2 className="animate-spin" size={18} /> : <ImagePlus size={18} />}
                  {modalMode === 'edit' ? 'Save Changes' : 'Upload Image'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {viewingImage ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">Preview</p>
                <h3 className="mt-1 text-2xl font-semibold text-white">{viewingImage.title}</h3>
              </div>
              <button type="button" onClick={() => setViewingImage(null)} className="rounded-full border border-white/10 p-2 text-slate-300"><X size={18} /></button>
            </div>
            <img src={viewingImage.url} alt={viewingImage.altText} className="mt-5 h-72 w-full rounded-2xl object-cover" />
            <div className="mt-5 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
              <div><span className="text-slate-500">Category:</span> {viewingImage.category}</div>
              <div><span className="text-slate-500">Status:</span> {viewingImage.status}</div>
              <div><span className="text-slate-500">Alt text:</span> {viewingImage.altText}</div>
              <div><span className="text-slate-500">File size:</span> {formatBytes(viewingImage.fileSize)}</div>
            </div>
          </div>
        </div>
      ) : null}

      {deleteTarget ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-300">
              <Trash2 size={20} />
              <h3 className="text-xl font-semibold">Delete image?</h3>
            </div>
            <p className="mt-3 text-sm text-slate-400">This action permanently removes {deleteTarget.title} from the gallery.</p>
            <div className="mt-5 flex justify-end gap-3">
              <button type="button" onClick={() => setDeleteTarget(null)} className="rounded-2xl border border-white/10 px-4 py-3 text-sm font-semibold text-slate-300">Cancel</button>
              <button type="button" onClick={confirmDelete} disabled={deleteMutation.isPending} className="rounded-2xl bg-rose-500 px-4 py-3 text-sm font-semibold text-white disabled:opacity-60">
                {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {toast ? (
        <div className="fixed bottom-5 right-5 z-[60] rounded-2xl border border-cyan-400/20 bg-slate-900/90 px-4 py-3 text-sm text-cyan-100 shadow-xl">
          {toast}
        </div>
      ) : null}
    </section>
  );
}

export default ImageManagementModule;
