import React from 'react';
import { Search, X, Filter, ArrowUpDown, Plus, LayoutGrid, List } from 'lucide-react';

export function SearchFilterBar({
  query,
  setQuery,
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  categories,
  onOpenCreate,
  viewMode,
  setViewMode
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, tag, category, description..."
          className="w-full rounded-xl border border-slate-700/60 bg-slate-950/70 py-2.5 pl-10 pr-9 text-sm text-slate-100 placeholder-slate-400 transition-all focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Category Filter */}
        <div className="relative flex items-center">
          <Filter className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="appearance-none rounded-xl border border-slate-700/60 bg-slate-950/70 py-2.5 pl-9 pr-8 text-xs font-medium text-slate-200 transition focus:border-cyan-500 focus:outline-none"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-slate-900 text-slate-200">
                {cat === 'All' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border border-slate-700/60 bg-slate-950/70 px-3.5 py-2.5 text-xs font-medium text-slate-200 transition focus:border-cyan-500 focus:outline-none"
        >
          <option value="All" className="bg-slate-900 text-slate-200">All Statuses</option>
          <option value="Active" className="bg-slate-900 text-slate-200">Active Only</option>
          <option value="Inactive" className="bg-slate-900 text-slate-200">Inactive Only</option>
        </select>

        {/* Sort By */}
        <div className="relative flex items-center">
          <ArrowUpDown className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none rounded-xl border border-slate-700/60 bg-slate-950/70 py-2.5 pl-9 pr-8 text-xs font-medium text-slate-200 transition focus:border-cyan-500 focus:outline-none"
          >
            <option value="Newest" className="bg-slate-900 text-slate-200">Sort: Newest</option>
            <option value="Oldest" className="bg-slate-900 text-slate-200">Sort: Oldest</option>
            <option value="Name A–Z" className="bg-slate-900 text-slate-200">Sort: Name A–Z</option>
            <option value="File Size" className="bg-slate-900 text-slate-200">Sort: File Size</option>
          </select>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center rounded-xl border border-slate-700/60 bg-slate-950/70 p-1">
          <button
            onClick={() => setViewMode('grid')}
            title="Grid View"
            className={`rounded-lg p-1.5 transition ${viewMode === 'grid' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            title="List View"
            className={`rounded-lg p-1.5 transition ${viewMode === 'list' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <List className="h-4 w-4" />
          </button>
        </div>

        {/* Upload Button */}
        <button
          onClick={onOpenCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all hover:from-cyan-400 hover:to-blue-500 hover:shadow-cyan-500/40 active:scale-95"
        >
          <Plus className="h-4 w-4" />
          Upload Image
        </button>
      </div>
    </div>
  );
}
