import React from 'react';
import { X, Copy, Download, Edit2, Trash2, Tag, Calendar, HardDrive, FileText, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { formatBytes, formatDate } from '../../services/imageService';

export function ImageViewerModal({
  image,
  onClose,
  onEdit,
  onDelete,
  onCopyUrl,
  onDownload
}) {
  if (!image) return null;

  const isInactive = image.status === 'Inactive';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative flex flex-col lg:flex-row w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-full bg-slate-950/70 p-2 text-slate-300 backdrop-blur-md border border-white/10 transition hover:bg-slate-800 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Left Side: High-Res Image Canvas */}
        <div className="relative flex-1 bg-slate-950 flex items-center justify-center p-6 min-h-[300px] lg:min-h-[500px]">
          <img
            src={image.url}
            alt={image.altText || image.title}
            className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
          />

          <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2">
            <span
              className={`rounded-full px-3 py-1 text-xs font-bold border backdrop-blur-md ${
                isInactive
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
              }`}
            >
              {image.status || 'Active'}
            </span>
            <span className="rounded-full bg-slate-900/80 px-3 py-1 text-xs font-semibold text-slate-200 border border-white/10 backdrop-blur-md">
              {image.category || 'General'}
            </span>
          </div>
        </div>

        {/* Right Side: Metadata Information Panel */}
        <div className="w-full lg:w-96 flex flex-col justify-between p-6 overflow-y-auto border-t lg:border-t-0 lg:border-l border-slate-800 bg-slate-900/90">
          <div className="space-y-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                Asset Details
              </span>
              <h2 className="mt-1 text-xl font-extrabold text-white leading-snug">{image.title}</h2>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                {image.description || 'No description provided for this image.'}
              </p>
            </div>

            {/* Metadata Table Grid */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <span className="flex items-center gap-2 text-slate-400">
                  <FileText className="h-3.5 w-3.5 text-cyan-400" />
                  File Name:
                </span>
                <span className="font-semibold text-slate-200 truncate max-w-[150px]">{image.fileName || 'image.jpg'}</span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <span className="flex items-center gap-2 text-slate-400">
                  <HardDrive className="h-3.5 w-3.5 text-purple-400" />
                  File Size:
                </span>
                <span className="font-semibold text-slate-200">{formatBytes(image.fileSize)}</span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <span className="flex items-center gap-2 text-slate-400">
                  <Calendar className="h-3.5 w-3.5 text-emerald-400" />
                  Uploaded On:
                </span>
                <span className="font-semibold text-slate-200">{formatDate(image.uploadedAt)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-400">
                  <Tag className="h-3.5 w-3.5 text-amber-400" />
                  Alt Text:
                </span>
                <span className="font-semibold text-slate-200 truncate max-w-[150px]">{image.altText || 'N/A'}</span>
              </div>
            </div>

            {/* Tags */}
            {image.tags && image.tags.length > 0 && (
              <div>
                <span className="block text-[11px] font-semibold text-slate-400 mb-2">Tags & Keywords</span>
                <div className="flex flex-wrap gap-1.5">
                  {image.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="rounded-lg border border-slate-700/60 bg-slate-950 px-2.5 py-1 text-xs text-slate-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="mt-6 pt-4 border-t border-slate-800 space-y-2.5">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onCopyUrl(image.url)}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-700/80 bg-slate-950 py-2.5 text-xs font-semibold text-slate-200 transition hover:bg-slate-800 hover:text-white"
              >
                <Copy className="h-3.5 w-3.5 text-cyan-400" />
                Copy URL
              </button>

              <button
                onClick={() => onDownload(image)}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-700/80 bg-slate-950 py-2.5 text-xs font-semibold text-slate-200 transition hover:bg-slate-800 hover:text-white"
              >
                <Download className="h-3.5 w-3.5 text-emerald-400" />
                Download
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onClose();
                  onEdit(image);
                }}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 py-2.5 text-xs font-semibold text-amber-300 transition hover:bg-amber-500/20"
              >
                <Edit2 className="h-3.5 w-3.5" />
                Edit Asset
              </button>

              <button
                onClick={() => {
                  onClose();
                  onDelete(image);
                }}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/10 py-2.5 text-xs font-semibold text-red-300 transition hover:bg-red-500/20"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete Asset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
