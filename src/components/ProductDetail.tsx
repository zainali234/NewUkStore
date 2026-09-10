import React, { useState } from 'react';
import { ArrowLeft, Star, Trash2, Plus, Minus, ShoppingCart, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number, selectedColor?: string) => void;
}

export default function ProductDetail({ product, onBack, onAddToCart }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0] : undefined
  );

  const incrementQty = () => setQuantity(prev => Math.min(prev + 1, product.stock));
  const decrementQty = () => setQuantity(prev => Math.max(prev - 1, 1));

  return (
    <div className="bg-white min-h-screen">
      {/* Navigation Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button
          onClick={onBack}
          className="inline-flex items-center text-sm font-semibold text-slate-600 hover:text-amber-500 transition-colors gap-2 cursor-pointer pb-2"
        >
          <ArrowLeft className="w-4 h-4 text-inherit" />
          Back to browsing catalog
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16">
          
          {/* Main Product Image Block */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square w-full rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center p-8">
              {product.badge && (
                <span className="absolute top-4 left-4 z-10 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                  {product.badge}
                </span>
              )}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 rounded-xl"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format`;
                }}
              />
            </div>
            
            {/* Value Trust badging layout */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl text-center">
                <Truck className="w-5 h-5 mx-auto text-amber-500 mb-1" />
                <span className="text-[10px] sm:text-xs font-bold text-slate-800 block">Prime Delivery</span>
                <span className="text-[9px] text-slate-400 block mt-0.5">Free & Fast</span>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl text-center">
                <ShieldCheck className="w-5 h-5 mx-auto text-amber-500 mb-1" />
                <span className="text-[10px] sm:text-xs font-bold text-slate-800 block">MZ Certified</span>
                <span className="text-[9px] text-slate-400 block mt-0.5">Direct Guarantee</span>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl text-center">
                <RefreshCw className="w-5 h-5 mx-auto text-amber-500 mb-1" />
                <span className="text-[10px] sm:text-xs font-bold text-slate-800 block">30-Day Return</span>
                <span className="text-[9px] text-slate-400 block mt-0.5">Hassle Free</span>
              </div>
            </div>
          </div>

          {/* Core copy and purchasing configurations */}
          <div className="flex flex-col justify-between">
            <div className="space-y-6">
              {/* Category Breadcrumb */}
              <div>
                <span className="text-xs font-mono font-bold text-amber-600 tracking-wider bg-amber-50 border border-amber-200/20 px-2.5 py-1 rounded-sm uppercase inline-block">
                  {product.category}
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-slate-900 mt-3">
                  {product.name}
                </h1>
              </div>

              {/* Star reviews counter */}
              <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 fill-current ${
                        i < Math.floor(product.rating) ? 'text-amber-400' : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>
                <div className="text-sm font-semibold text-slate-800 font-mono">
                  {product.rating} <span className="text-slate-400">/ 5.0</span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                <div className="text-xs text-slate-400 font-mono">
                  ({product.reviewsCount} customer reviews)
                </div>
              </div>

              {/* Financial Pricing */}
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider block">Special VIP Store Price</span>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-950">
                    £{product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-slate-400 line-through font-mono">
                      £{product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="bg-rose-100 text-rose-700 text-xs font-bold px-2 py-0.5 rounded-md">
                      Save £{(product.originalPrice - product.price).toFixed(2)}
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-500 block">
                  Applicable for cashback if purchasing as a MzAmazonSeller VIP Member.
                </span>
              </div>

              {/* Descriptions */}
              <div className="space-y-3">
                <p className="text-slate-600 text-sm leading-relaxed">
                  {product.description}
                </p>
                <div className="bg-slate-50 border-l-4 border-amber-500 p-4 rounded-r-xl">
                  <h4 className="text-slate-900 font-bold text-xs font-mono tracking-wide uppercase mb-1">VIP Product Facts</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {product.longDescription}
                  </p>
                </div>
              </div>

              {/* Specs checking items (Checks) */}
              <div className="space-y-2.5">
                <h3 className="text-sm font-bold font-sans text-slate-900 uppercase tracking-wide">Key Features & Technical Specs:</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-amber-500 font-bold text-base leading-none">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Color configurations if any */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                    Select Finish / Color:
                  </label>
                  <div className="flex gap-2">
                    {product.colors.map((color, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                          selectedColor === color
                            ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Buying action controls block */}
            <div className="mt-8 border-t border-slate-100 pt-6 space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                {/* Quantity Control Buttons */}
                <div className="flex items-center border border-slate-200 rounded-xl max-w-fit mx-auto sm:mx-0">
                  <button
                    onClick={decrementQty}
                    className="p-3 text-slate-500 hover:text-slate-800 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 font-mono text-center text-sm font-bold text-slate-950">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQty}
                    className="p-3 text-slate-500 hover:text-slate-800 transition-colors"
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart button widget */}
                <button
                  onClick={() => onAddToCart(product, quantity, selectedColor)}
                  className="flex-1 inline-flex items-center justify-center p-3 sm:p-3.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm rounded-xl transition-all duration-200 cursor-pointer shadow-md shadow-amber-500/10 gap-2"
                >
                  <ShoppingCart className="w-4 h-4 text-white" />
                  Add to Cart • £{(product.price * quantity).toFixed(2)}
                </button>
              </div>

              {/* Stock notifications tag */}
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Direct availability in Amazon warehouse</span>
                <span className={product.stock < 10 ? 'text-rose-500 font-bold animate-pulse' : 'text-slate-500 font-semibold'}>
                  {product.stock} items remaining
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
