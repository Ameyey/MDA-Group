import React from 'react';
import { Eye, Edit2, Download, Copy, Trash2, Check, Tag } from 'lucide-react';
import { formatBytes, formatDate } from '../../services/imageService';

export function ImageCard({
  image,
  isSelected,
  onToggleSelect,
  onView,
  onEdit,
  onDelete,
  onCopyUrl,
  onDownload,
  viewMode = 'grid'
}) {
  const isInactive = image.status === 'Inactive';

  if (viewMode === 'list') {
    return (
      <div
        className={`group flex items-center justify-between gap-4 rounded-xl border p-3 transition-all duration-200 ${
          isSelected
            ? 'border-cyan-500/60 bg-cyan-950/20'
            : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900/90'
        }`}
      >
        <div className="flex items-center gap-3.5 min-w-0">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggleSelect(image.id)}
            className="h-4 w-4 rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-cyan-500/20"
          />

          <div
            onClick={() => onView(image)}
            className="relative h-14 w-20 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg border border-slate-700/60 bg-slate-950"
          >
            <img
              src={image.url}
              alt={image.altText || image.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h4
                onClick={() => onView(image)}
                className="cursor-pointer truncate text-sm font-semibold text-white transition hover:text-cyan-400"
              >
                {image.title}
              </h4>
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                  isInactive
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                }`}
              >
                {image.status || 'Active'}
              </span>
            </div>

            <div className="mt-1 flex items-center gap-3 text-xs text-slate-400">
              <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-300">
                {image.category || 'General'}
              </span>
              <span>{formatBytes(image.fileSize)}</span>
              <span>•</span>
              <span>{formatDate(image.uploadedAt)}</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onView(image)}
            title="View details"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-cyan-400"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={() => onEdit(image)}
            title="Edit details"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-amber-400"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => onCopyUrl(image.url)}
            title="Copy URL"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-blue-400"
          >
            <Copy className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDownload(image)}
            title="Download Image"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-emerald-400"
          >
            <Download className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(image)}
            title="Delete Image"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-red-500/20 hover:text-red-400"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-slate-900/70 backdrop-blur-xl transition-all duration-300 hover:translate-y-[-3px] hover:shadow-2xl hover:shadow-cyan-500/10 ${
        isSelected
          ? 'border-cyan-500 bg-cyan-950/20 ring-2 ring-cyan-500/30'
          : 'border-slate-800 hover:border-slate-700'
      }`}
    >
      {/* Top Banner overlay */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
        <img
          src={image.url}
          alt={image.altText || image.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40 opacity-80 transition-opacity group-hover:opacity-60" />

        {/* Checkbox select */}
        <div className="absolute left-3 top-3 z-10">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggleSelect(image.id)}
            className="h-4 w-4 cursor-pointer rounded border-slate-600 bg-slate-900/90 text-cyan-500 focus:ring-cyan-500/30"
          />
        </div>

        {/* Category & Status badges */}
        <div className="absolute right-3 top-3 z-10 flex items-center gap-1.5">
          <span className="rounded-full bg-slate-900/80 px-2.5 py-0.5 text-[11px] font-medium text-slate-200 border border-white/10 backdrop-blur-md">
            {image.category || 'General'}
          </span>
          <span
            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold border backdrop-blur-md ${
              isInactive
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
            }`}
          >
            {image.status || 'Active'}
          </span>
        </div>

        {/* Quick View Button overlay */}
        <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100 bg-slate-950/40 backdrop-blur-[2px]">
          <button
            onClick={() => onView(image)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-slate-900/90 px-3.5 py-2 text-xs font-semibold text-white shadow-xl transition-all hover:scale-105 hover:bg-slate-800"
          >
            <Eye className="h-4 w-4 text-cyan-400" />
            Quick Preview
          </button>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <h4
            onClick={() => onView(image)}
            className="cursor-pointer font-bold text-slate-100 transition hover:text-cyan-400 line-clamp-1 text-sm"
          >
            {image.title}
          </h4>

          <p className="mt-1 text-xs text-slate-400 line-clamp-2 min-h-[2rem]">
            {image.description || 'No description provided.'}
          </p>

          {/* Tags */}
          {image.tags && image.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-1">
              <Tag className="h-3 w-3 text-slate-500" />
              {image.tags.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="rounded-md bg-slate-800/80 px-1.5 py-0.5 text-[10px] text-slate-300 border border-slate-700/50"
                >
                  #{tag}
                </span>
              ))}
              {image.tags.length > 3 && (
                <span className="text-[10px] text-slate-500">+{image.tags.length - 3}</span>
              )}
            </div>
          )}
        </div>

        {/* Footer info & Action buttons */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex flex-col">
            <span className="font-medium text-slate-300">{formatBytes(image.fileSize)}</span>
            <span className="text-[10px] text-slate-500">{formatDate(image.uploadedAt)}</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onEdit(image)}
              title="Edit image"
              className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-amber-400"
            >
              <Edit2 className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => onCopyUrl(image.url)}
              title="Copy URL"
              className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-cyan-400"
            >
              <Copy className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => onDownload(image)}
              title="Download image"
              className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-emerald-400"
            >
              <Download className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => onDelete(image)}
              title="Delete image"
              className="rounded-lg p-1.5 text-slate-400 transition hover:bg-red-500/20 hover:text-red-400"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
