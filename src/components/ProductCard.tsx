import React from 'react';
import { Star, Eye, ShoppingCart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: any;
  product: Product;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product, event: React.MouseEvent) => void;
}

export default function ProductCard({
  product,
  onViewDetails,
  onAddToCart,
}: ProductCardProps) {
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      onClick={() => onViewDetails(product)}
      className="group relative bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer"
    >
      {/* Product Image section with badges */}
      <div className="relative aspect-square w-full bg-slate-50 flex items-center justify-center overflow-hidden p-4">
        {product.badge && (
          <span className="absolute top-3 left-3 z-10 bg-slate-900 text-white text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full uppercase">
            {product.badge}
          </span>
        )}

        {discountPercentage > 0 && (
          <span className="absolute top-3 right-3 z-10 bg-rose-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
            -{discountPercentage}%
          </span>
        )}

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-xl"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // High fidelity product category default placeholders
            (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format`;
          }}
        />

        {/* Hover action slide-up */}
        <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
            className="p-3 bg-white text-slate-800 rounded-full shadow-lg hover:bg-amber-500 hover:text-white transition-all duration-200"
            title="View Product Facts"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Narrative Info section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <span className="text-[11px] font-mono font-bold text-amber-500 uppercase tracking-wider block">
            {product.category.replace('-', ' ')}
          </span>
          <h3 className="text-slate-800 font-semibold text-sm sm:text-base group-hover:text-amber-500 transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>

          {/* Rating stars and reviews counts */}
          <div className="flex items-center gap-1.5 pt-1">
            <div className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 fill-current ${
                    i < Math.floor(product.rating) ? 'text-amber-400' : 'text-slate-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] font-semibold text-slate-800 font-mono">
              {product.rating}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              ({product.reviewsCount})
            </span>
          </div>
        </div>

        {/* Price Tag and actions footer */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50 gap-2">
          <div>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-base sm:text-lg font-bold font-mono text-slate-900">
                £{product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through font-mono">
                  £{product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-600 font-medium block mt-0.5">
              ✓ Free Delivery on Prime
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product, e);
            }}
            className="flex items-center justify-center p-2.5 sm:px-3 sm:py-2 bg-slate-900 text-white rounded-xl hover:bg-amber-500 hover:shadow-md hover:shadow-amber-500/10 transition-all duration-200 cursor-pointer"
            title="Add to Basket"
          >
            <ShoppingCart className="w-4 h-4 sm:mr-1.5 text-white" />
            <span className="hidden sm:inline text-xs font-semibold">Buy</span>
          </button>
        </div>
      </div>
    </div>
  );
}
