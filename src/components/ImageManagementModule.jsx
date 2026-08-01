import React, { useState, useMemo, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Sparkles, RefreshCw } from 'lucide-react';
import { imageService } from '../services/imageService';
import { removeCustomProductCard, resolveImageCatalogTargetProductId, upsertCustomProductCard, upsertProductImageMetadata } from '../data/images';
import { StatsHeader } from './dashboard/StatsHeader';
import { SearchFilterBar } from './dashboard/SearchFilterBar';
import { ImageGrid } from './dashboard/ImageGrid';
import { ImageModal } from './dashboard/ImageModal';
import { ImageViewerModal } from './dashboard/ImageViewerModal';
import { DeleteConfirmModal } from './dashboard/DeleteConfirmModal';
import { ToastNotification } from './dashboard/ToastNotification';
import { Pagination } from './dashboard/Pagination';

export function ImageManagementModule({ onBackToHome: _onBackToHome }) {
  const queryClient = useQueryClient();

  // State Management
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' | 'edit'
  const [selectedImage, setSelectedImage] = useState(null);
  const [viewingImage, setViewingImage] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null); // single image obj or array of IDs

  // Multi-select state
  const [selectedIds, setSelectedIds] = useState([]);

  // Toast state
  const [toast, setToast] = useState(null);

  // Fetch images query
  const { data: images = [], isLoading, refetch } = useQuery({
    queryKey: ['images'],
    queryFn: imageService.fetchImages,
    staleTime: 1000 * 30
  });

  // Reset page to 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [query, categoryFilter, statusFilter, sortBy, pageSize]);

  // Derived Categories List
  const categories = useMemo(() => {
    const set = new Set(['All']);
    images.forEach((img) => {
      if (img.category) set.add(img.category);
    });
    return Array.from(set);
  }, [images]);

  // Filtered & Sorted Images
  const filteredImages = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const result = images.filter((img) => {
      const matchesSearch =
        !normalizedQuery ||
        (img.title && img.title.toLowerCase().includes(normalizedQuery)) ||
        (img.category && img.category.toLowerCase().includes(normalizedQuery)) ||
        (img.description && img.description.toLowerCase().includes(normalizedQuery)) ||
        (img.tags && img.tags.some((t) => t.toLowerCase().includes(normalizedQuery)));

      const matchesCategory = categoryFilter === 'All' || img.category === categoryFilter;
      const matchesStatus = statusFilter === 'All' || img.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });

    return [...result].sort((a, b) => {
      switch (sortBy) {
        case 'Oldest':
          return new Date(a.uploadedAt) - new Date(b.uploadedAt);
        case 'Name A–Z':
          return (a.title || '').localeCompare(b.title || '');
        case 'File Size':
          return (b.fileSize || 0) - (a.fileSize || 0);
        case 'Newest':
        default:
          return new Date(b.uploadedAt) - new Date(a.uploadedAt);
      }
    });
  }, [images, query, categoryFilter, statusFilter, sortBy]);

  // Paginated View
  const paginatedImages = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredImages.slice(start, start + pageSize);
  }, [filteredImages, page, pageSize]);

  const totalPages = Math.max(1, Math.ceil(filteredImages.length / pageSize));

  // Compute Stats Overview
  const stats = useMemo(() => {
    const total = images.length;
    const active = images.filter((i) => i.status === 'Active').length;
    const inactive = total - active;
    const storageUsed = images.reduce((sum, item) => sum + (item.fileSize || 0), 0);
    return { total, active, inactive, storageUsed };
  }, [images]);

  // Mutations
  const createMutation = useMutation({
    mutationFn: (formData) => imageService.createImage(formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['images'] });
      setIsModalOpen(false);
      setToast({ message: 'Image asset uploaded successfully!', type: 'success' });
    },
    onError: (err) => {
      setToast({ message: `Upload failed: ${err.message || 'Error uploading image'}`, type: 'error' });
    }
  });

  const createMultiMutation = useMutation({
    mutationFn: (formData) => imageService.createMultipleImages(formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['images'] });
      setIsModalOpen(false);
      setToast({ message: `${data.images ? data.images.length : 'Multiple'} images uploaded successfully!`, type: 'success' });
    },
    onError: (err) => {
      setToast({ message: `Batch upload failed: ${err.message}`, type: 'error' });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => imageService.updateImage(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['images'] });
      setIsModalOpen(false);
      setToast({ message: 'Image asset updated successfully!', type: 'success' });
    },
    onError: (err) => {
      setToast({ message: `Update failed: ${err.message}`, type: 'error' });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => imageService.deleteImage(id),
    onSuccess: (_data, id) => {
      const deletedImage = images.find((img) => img.id === id) || null;
      if (deletedImage) {
        removeCustomProductCard({
          id: deletedImage.linkedProductId || deletedImage.productId || '',
          name: deletedImage.title,
          title: deletedImage.title,
          imageUrl: deletedImage.url || deletedImage.imageUrl || ''
        });
      }

      queryClient.invalidateQueries({ queryKey: ['images'] });
      setDeleteTarget(null);
      setSelectedIds((prev) => prev.filter((itemId) => itemId !== id));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('image-catalog-updated'));
      }
      setToast({ message: 'Image deleted from cloud storage.', type: 'info' });
    },
    onError: (err) => {
      setToast({ message: `Delete failed: ${err.message}`, type: 'error' });
    }
  });

  const deleteBulkMutation = useMutation({
    mutationFn: (ids) => imageService.deleteBulkImages(ids),
    onSuccess: (data, ids) => {
      ids.forEach((id) => {
        const deletedImage = images.find((img) => img.id === id) || null;
        if (deletedImage) {
          removeCustomProductCard({
            id: deletedImage.linkedProductId || deletedImage.productId || '',
            name: deletedImage.title,
            title: deletedImage.title,
            imageUrl: deletedImage.url || deletedImage.imageUrl || ''
          });
        }
      });

      queryClient.invalidateQueries({ queryKey: ['images'] });
      setDeleteTarget(null);
      setSelectedIds([]);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('image-catalog-updated'));
      }
      setToast({ message: `${data.count || 'Selected'} images deleted successfully.`, type: 'info' });
    },
    onError: (err) => {
      setToast({ message: `Bulk delete failed: ${err.message}`, type: 'error' });
    }
  });

  // Action Handlers
  const handleOpenCreate = () => {
    setModalMode('create');
    setSelectedImage(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (image) => {
    setModalMode('edit');
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleFormSubmit = ({ form, files, mode, initialImage, uploadMode, imageUrl }) => {
    const tags = form.tags.split(',').map((t) => t.trim()).filter(Boolean);

    const assignToProduct = (url) => {
      if (!url) return;

      const priceValue = (form.pricePlaceholder || '').trim() || 'Contact for Price';

      if (form.createNewCard) {
        upsertCustomProductCard({
          id: `custom-prod-${Date.now()}`,
          name: form.title,
          category: form.category || 'Custom',
          compatibleBrands: tags.length ? tags : ['Custom'],
          shortDesc: form.description || 'Added from dashboard',
          fullDesc: form.description || 'Added from dashboard',
          badge: 'New',
          pricePlaceholder: priceValue,
          imageUrl: url,
          visualType: 'custom',
          customSource: 'dashboard',
          createdAt: new Date().toISOString()
        });
      } else {
        const productId = form.productId || resolveImageCatalogTargetProductId('prod-1');
        upsertProductImageMetadata(productId, {
          url,
          title: form.title,
          altText: form.altText,
          category: form.category,
          description: form.description,
          tags,
          status: form.status,
          uploadedAt: new Date().toISOString(),
          fileName: form.title.toLowerCase().replace(/\s+/g, '-') + '.jpg',
          mimeType: 'image/jpeg',
          fileSize: 0,
          productId,
          pricePlaceholder: priceValue
        });
      }

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('image-catalog-updated'));
      }
    };

    // Edit mode
    if (mode === 'edit' && initialImage) {
      updateMutation.mutate({
        id: initialImage.id,
        payload: {
          ...form,
          tags
        }
      }, {
        onSuccess: () => {
          const resolvedUrl = initialImage.url || imageUrl || '';
          assignToProduct(resolvedUrl);
        }
      });
      return;
    }

    // Create mode: URL-based
    if (uploadMode === 'url' && imageUrl) {
      const urlPayload = {
        title: form.title,
        altText: form.altText,
        category: form.category,
        description: form.description,
        tags: form.tags,
        status: form.status,
        url: imageUrl
      };

      createMutation.mutate(urlPayload, {
        onSuccess: () => {
          assignToProduct(imageUrl);
        }
      });
      return;
    }

    // Create mode: File upload (existing flow)
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('category', form.category);
    formData.append('altText', form.altText);
    formData.append('description', form.description);
    formData.append('tags', form.tags);
    formData.append('status', form.status);

    if (files.length > 1) {
      files.forEach((file) => formData.append('images', file));
      createMultiMutation.mutate(formData, {
        onSuccess: (data) => {
          const uploadedImages = Array.isArray(data?.images) ? data.images : [];
          uploadedImages.forEach((entry) => assignToProduct(entry?.url));
        }
      });
    } else if (files.length === 1) {
      formData.append('image', files[0]);
      const objectUrl = URL.createObjectURL(files[0]);
      formData.append('previewUrl', objectUrl);
      createMutation.mutate(formData, {
        onSuccess: (data) => {
          const uploadedUrl = data?.image?.url || data?.url || objectUrl;
          assignToProduct(uploadedUrl);
        }
      });
    }
  };

  const handleConfirmDelete = (target) => {
    if (Array.isArray(target)) {
      deleteBulkMutation.mutate(target);
    } else if (target && target.id) {
      deleteMutation.mutate(target.id);
    }
  };

  const handleToggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedIds(filteredImages.map((img) => img.id));
  };

  const handleDeselectAll = () => {
    setSelectedIds([]);
  };

  const handleCopyUrl = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      setToast({ message: 'Image URL copied to clipboard!', type: 'success' });
    } catch {
      setToast({ message: 'Failed to copy URL', type: 'error' });
    }
  };

  const handleDownload = (image) => {
    try {
      const link = document.createElement('a');
      link.href = image.url;
      link.download = image.fileName || `${image.title.toLowerCase().replace(/\s+/g, '-')}.jpg`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setToast({ message: `Downloading ${image.title}...`, type: 'info' });
    } catch {
      setToast({ message: 'Failed to initiate download.', type: 'error' });
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-3xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-2xl">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white">
              Customer & Event Image Manager
            </h1>
            <p className="text-xs text-slate-400">
              Multer local file uploads stored in public/images/ with JSON database CRUD
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => refetch()}
            title="Refresh assets list"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-950 px-3.5 py-2 text-xs font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Summary Header */}
      <StatsHeader stats={stats} />

      {/* Search, Filters, Sorting & View Toggle */}
      <SearchFilterBar
        query={query}
        setQuery={setQuery}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        categories={categories}
        onOpenCreate={handleOpenCreate}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {/* Image Grid / List */}
      <ImageGrid
        images={paginatedImages}
        isLoading={isLoading}
        selectedIds={selectedIds}
        onToggleSelect={handleToggleSelect}
        onSelectAll={handleSelectAll}
        onDeselectAll={handleDeselectAll}
        onView={(img) => setViewingImage(img)}
        onEdit={handleOpenEdit}
        onDelete={(img) => setDeleteTarget(img)}
        onBulkDelete={() => setDeleteTarget(selectedIds)}
        onCopyUrl={handleCopyUrl}
        onDownload={handleDownload}
        onOpenCreate={handleOpenCreate}
        viewMode={viewMode}
      />

      {/* Pagination Controls */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        totalItems={filteredImages.length}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />

      {/* Modals & Alerts */}
      <ImageModal
        isOpen={isModalOpen}
        mode={modalMode}
        initialImage={selectedImage}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        isSubmitting={createMutation.isPending || createMultiMutation.isPending || updateMutation.isPending}
      />

      <ImageViewerModal
        image={viewingImage}
        onClose={() => setViewingImage(null)}
        onEdit={handleOpenEdit}
        onDelete={(img) => setDeleteTarget(img)}
        onCopyUrl={handleCopyUrl}
        onDownload={handleDownload}
      />

      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        target={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        isDeleting={deleteMutation.isPending || deleteBulkMutation.isPending}
      />

      <ToastNotification toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
