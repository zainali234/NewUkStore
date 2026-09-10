import React from 'react';
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  cartItems: CartItem[];
  onUpdateQty: (productId: string, quantity: number, selectedColor?: string) => void;
  onRemoveItem: (productId: string, selectedColor?: string) => void;
  onCheckout: () => void;
  onKeepShopping: () => void;
}

export default function Cart({
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onCheckout,
  onKeepShopping,
}: CartProps) {
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = 0; // Free Prime delivery
  const estimatedTax = subtotal * 0.08; // 8% estimated sales tax
  const total = subtotal + deliveryFee + estimatedTax;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-10 max-w-md mx-auto shadow-xs">
          <div className="bg-amber-100 text-amber-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-sans tracking-tight">Your Cart is Empty</h2>
          <p className="text-slate-500 text-sm mt-2 leading-relaxed">
            Looks like you haven't added any of MzAmazonSeller's hot premium products to your basket yet.
          </p>
          <button
            onClick={onKeepShopping}
            className="mt-6 w-full inline-flex items-center justify-center px-5 py-3 bg-slate-900 hover:bg-amber-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer shadow-xs gap-2"
          >
            <ArrowLeft className="w-4 h-4 text-inherit" />
            Browse Prime Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-2xl sm:text-3xl font-extrabold font-sans tracking-tight text-slate-900 mb-8 border-b border-slate-100 pb-4">
        Your Shopping Basket
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Cart Item Cards */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item, index) => (
            <div
              key={`${item.product.id}-${item.selectedColor || ''}-${index}`}
              className="bg-white border border-slate-100 p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-center gap-4 sm:gap-6 shadow-xs hover:border-slate-200 transition-all duration-200"
            >
              {/* Product Thumbnail image */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 bg-slate-50 border border-slate-100 rounded-xl overflow-hidden flex items-center justify-center p-2 shrink-0">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full h-full object-contain mix-blend-multiply"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=200&auto=format`;
                  }}
                />
              </div>

              {/* Descriptions & price */}
              <div className="flex-1 w-full text-center sm:text-left space-y-1">
                <span className="text-[10px] font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded uppercase">
                  {item.product.category}
                </span>
                <h3 className="text-slate-800 font-semibold text-sm sm:text-base line-clamp-1 mt-1">
                  {item.product.name}
                </h3>
                {item.selectedColor && (
                  <p className="text-xs text-slate-500 font-medium">
                    Finish: <span className="text-slate-700 font-semibold">{item.selectedColor}</span>
                  </p>
                )}
                <div className="pt-1.5 flex items-baseline justify-center sm:justify-start gap-2">
                  <span className="text-base font-bold font-mono text-slate-900">
                    £{item.product.price.toFixed(2)}
                  </span>
                  {item.product.originalPrice && (
                    <span className="text-xs text-slate-400 line-through font-mono">
                      £{item.product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              {/* Adjustments and trash controls layout */}
              <div className="flex sm:flex-col items-center justify-between sm:justify-center gap-4 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-50">
                {/* Control buttons */}
                <div className="flex items-center border border-slate-200 rounded-lg">
                  <button
                    onClick={() => onUpdateQty(item.product.id, item.quantity - 1, item.selectedColor)}
                    className="p-1.5 sm:p-2 text-slate-500 hover:text-slate-800 disabled:opacity-40"
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-slate-950 font-mono">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQty(item.product.id, item.quantity + 1, item.selectedColor)}
                    className="p-1.5 sm:p-2 text-slate-500 hover:text-slate-800 disabled:opacity-40"
                    disabled={item.quantity >= item.product.stock}
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold font-mono text-slate-900 hidden sm:inline">
                    £{(item.product.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    onClick={() => onRemoveItem(item.product.id, item.selectedColor)}
                    className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Core Return to catalog btn */}
          <button
            onClick={onKeepShopping}
            className="inline-flex items-center text-xs sm:text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors gap-2 cursor-pointer pt-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue shopping alternative products
          </button>
        </div>

        {/* Pricing Summary Cart Totals card Column */}
        <div className="bg-slate-50 border border-slate-200/60 p-6 rounded-2xl space-y-5 lg:sticky lg:top-28">
          <h3 className="text-slate-900 font-bold text-base font-sans uppercase tracking-wide">
            Order Financial Summary
          </h3>

          <div className="space-y-3 pt-2 text-sm">
            <div className="flex justify-between text-slate-500">
              <span>Cart Subtotal</span>
              <span className="font-mono text-slate-800 font-semibold">£{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Estimated Sales Tax (8%)</span>
              <span className="font-mono text-slate-800 font-semibold">£{estimatedTax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Delivery Fee</span>
              <span className="text-emerald-600 font-bold uppercase text-xs">FREE PRIME</span>
            </div>

            <div className="w-full h-px border-t border-slate-200 my-4"></div>

            <div className="flex justify-between text-slate-800 font-bold text-base">
              <span>Total Price Due</span>
              <span className="font-mono text-slate-950 text-lg">£{total.toFixed(2)}</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={onCheckout}
              className="w-full inline-flex items-center justify-center p-3 sm:p-3.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm rounded-xl transition-all duration-200 shadow-md shadow-amber-500/10 gap-2 cursor-pointer"
            >
              Secure Checkout
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
            <span className="text-[10px] text-slate-400 text-center block mt-3 leading-tight">
              Instant secure SSL transactional checkouts protected by MzAmazon encryption algorithms.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
