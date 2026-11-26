import React from 'react';

/**
 * Skeleton Shimmer Card para estado de carga acelerado por GPU (CLS = 0).
 * Calca exactamente la geometría de las tarjetas de maquinaria de Nexthezia.
 */
export default function SkeletonCard() {
  return (
    <div className="bg-white border border-line p-6 flex flex-col justify-between shadow-sm animate-pulse">
      <div>
        {/* Top Badges placeholder */}
        <div className="flex items-center justify-between pb-3 border-b border-line-soft mb-4">
          <div className="w-16 h-5 skeleton-shimmer" />
          <div className="w-20 h-5 skeleton-shimmer" />
        </div>

        {/* Title placeholder */}
        <div className="w-3/4 h-7 skeleton-shimmer mb-2" />
        <div className="w-full h-4 skeleton-shimmer mb-4" />

        {/* Table placeholder */}
        <div className="space-y-2 bg-panel p-4 border border-line-soft mb-5">
          <div className="w-full h-3.5 skeleton-shimmer" />
          <div className="w-full h-3.5 skeleton-shimmer" />
          <div className="w-full h-3.5 skeleton-shimmer" />
          <div className="w-full h-3.5 skeleton-shimmer" />
        </div>

        {/* Tags placeholder */}
        <div className="flex gap-2 mb-4">
          <div className="w-16 h-4 skeleton-shimmer" />
          <div className="w-20 h-4 skeleton-shimmer" />
          <div className="w-14 h-4 skeleton-shimmer" />
        </div>
      </div>

      {/* Action buttons placeholder */}
      <div className="pt-4 border-t border-line-soft flex items-center justify-between gap-3">
        <div className="w-24 h-4 skeleton-shimmer" />
        <div className="w-20 h-8 skeleton-shimmer" />
      </div>
    </div>
  );
}
