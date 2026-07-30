import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange
}) {
  if (totalItems === 0) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between text-xs text-slate-300">
      
      {/* Item Range Info */}
      <div className="flex items-center gap-3">
        <span>
          Showing <strong className="text-white font-semibold">{startItem}</strong> to{' '}
          <strong className="text-white font-semibold">{endItem}</strong> of{' '}
          <strong className="text-white font-semibold">{totalItems}</strong> assets
        </span>

        {/* Page size picker */}
        {onPageSizeChange && (
          <div className="flex items-center gap-1.5 border-l border-slate-800 pl-3">
            <span className="text-slate-400">Show:</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="rounded-lg border border-slate-700/60 bg-slate-950 px-2 py-1 text-xs text-white focus:border-cyan-500 focus:outline-none"
            >
              <option value={6} className="bg-slate-900">6 per page</option>
              <option value={12} className="bg-slate-900">12 per page</option>
              <option value={24} className="bg-slate-900">24 per page</option>
              <option value={48} className="bg-slate-900">48 per page</option>
            </select>
          </div>
        )}
      </div>

      {/* Page Navigation Controls */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-xl border border-slate-700/60 bg-slate-950 p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white disabled:opacity-40 disabled:pointer-events-none"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {getPageNumbers().map((num) => (
          <button
            key={num}
            onClick={() => onPageChange(num)}
            className={`min-w-[32px] h-8 rounded-xl text-xs font-semibold transition ${
              currentPage === num
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                : 'border border-slate-700/60 bg-slate-950 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {num}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded-xl border border-slate-700/60 bg-slate-950 p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white disabled:opacity-40 disabled:pointer-events-none"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
