import React from 'react';
import { ImageCard } from './ImageCard';
import { ImageIcon, Trash2, CheckSquare, Square, Plus } from 'lucide-react';

export function ImageGrid({
  images,
  isLoading,
  selectedIds,
  onToggleSelect,
  onSelectAll,
  onDeselectAll,
  onView,
  onEdit,
  onDelete,
  onBulkDelete,
  onCopyUrl,
  onDownload,
  onOpenCreate,
  viewMode = 'grid'
}) {
  const isAllSelected = images.length > 0 && selectedIds.length === images.length;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="animate-pulse rounded-2xl border border-slate-800 bg-slate-900/40 p-4"
          >
            <div className="aspect-[4/3] w-full rounded-xl bg-slate-800/60" />
            <div className="mt-4 h-4 w-3/4 rounded bg-slate-800/60" />
            <div className="mt-2 h-3 w-1/2 rounded bg-slate-800/60" />
            <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-800/60">
              <div className="h-3 w-1/3 rounded bg-slate-800/60" />
              <div className="h-6 w-20 rounded-lg bg-slate-800/60" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-800 bg-slate-900/30 px-6 py-16 text-center backdrop-blur-xl">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-700/60 bg-slate-900 text-cyan-400 shadow-xl">
          <ImageIcon className="h-8 w-8" />
        </div>
        <h3 className="mt-4 text-lg font-bold text-white">No images found</h3>
        <p className="mt-1 max-w-sm text-xs text-slate-400">
          We couldn't find any images matching your current search criteria or category filters. Try adjusting your query or upload a new image.
        </p>
        <button
          onClick={onOpenCreate}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all hover:from-cyan-400 hover:to-blue-500"
        >
          <Plus className="h-4 w-4" />
          Upload New Image
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Bulk Selection Bar */}
      {selectedIds.length > 0 && (
        <div className="flex items-center justify-between rounded-xl border border-cyan-500/40 bg-cyan-950/40 px-4 py-3 backdrop-blur-xl text-xs text-cyan-200 shadow-xl">
          <div className="flex items-center gap-3">
            <button
              onClick={isAllSelected ? onDeselectAll : onSelectAll}
              className="inline-flex items-center gap-1.5 font-semibold text-cyan-400 hover:underline"
            >
              {isAllSelected ? <CheckSquare className="h-4 w-4" /> : <Square className="h-4 w-4" />}
              {isAllSelected ? 'Deselect All' : 'Select All'}
            </button>
            <span>•</span>
            <span className="font-semibold text-white">
              {selectedIds.length} {selectedIds.length === 1 ? 'image' : 'images'} selected
            </span>
          </div>

          <button
            onClick={onBulkDelete}
            className="inline-flex items-center gap-1.5 rounded-lg bg-red-500/20 border border-red-500/30 px-3 py-1.5 text-xs font-semibold text-red-300 transition hover:bg-red-500/30"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete Selected ({selectedIds.length})
          </button>
        </div>
      )}

      {/* Grid or List Layout */}
      <div
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'
            : 'flex flex-col gap-3'
        }
      >
        {images.map((image) => (
          <ImageCard
            key={image.id}
            image={image}
            isSelected={selectedIds.includes(image.id)}
            onToggleSelect={onToggleSelect}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
            onCopyUrl={onCopyUrl}
            onDownload={onDownload}
            viewMode={viewMode}
          />
        ))}
      </div>
    </div>
  );
}
