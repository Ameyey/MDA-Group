import React from 'react';
import { AlertTriangle, Trash2, X, Loader2 } from 'lucide-react';

export function DeleteConfirmModal({
  isOpen,
  target, // single image object or array of IDs
  onClose,
  onConfirm,
  isDeleting = false
}) {
  if (!isOpen || !target) return null;

  const isBulk = Array.isArray(target);
  const titleText = isBulk
    ? `Delete ${target.length} Selected Images?`
    : `Delete "${target.title}"?`;

  const descriptionText = isBulk
    ? `This will permanently remove ${target.length} selected images from your Cloudinary store and dashboard database. This action cannot be undone.`
    : `Are you sure you want to delete this image asset? It will be permanently removed from your Cloudinary storage and cannot be restored.`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md rounded-3xl border border-red-500/30 bg-slate-900 p-6 shadow-2xl text-slate-100">
        
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-red-500/10 text-red-400 border border-red-500/20">
            <AlertTriangle className="h-6 w-6" />
          </div>

          <div className="flex-1">
            <h3 className="text-base font-bold text-white leading-snug">{titleText}</h3>
            <p className="mt-2 text-xs text-slate-300 leading-relaxed">{descriptionText}</p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="rounded-xl border border-slate-700/60 bg-slate-950 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => onConfirm(target)}
            disabled={isDeleting}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-red-600/20 transition-all hover:from-red-500 hover:to-rose-600 disabled:opacity-50"
          >
            {isDeleting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                Confirm Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
