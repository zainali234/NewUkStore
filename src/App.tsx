import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Grid, 
  Utensils, 
  Home as HomeIcon, 
  Sparkles, 
  Cpu, 
  TrendingUp, 
  CheckCircle2, 
  Package, 
  Clock, 
  ChevronRight, 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Award,
  BookOpen,
  Download,
  Layers,
  HelpCircle,
  ShieldCheck,
  Check,
  Facebook,
  Instagram,
  Twitter,
  Truck,
  Plane
} from 'lucide-react';

import { PRODUCTS, CATEGORIES } from './data';
import { Product, CartItem, CheckoutDetails } from './types';

// Importing custom components safely
import Header, { AppTab } from './components/Header';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import RebatePortal from './components/RebatePortal';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsAndConditions from './components/TermsAndConditions';
import RefundPolicy from './components/RefundPolicy';
import ShippingDelivery from './components/ShippingDelivery';
import Returns from './components/Returns';
import OrderTracking from './components/OrderTracking';

export default function App() {
  const [currentTab, setTab] = useState<AppTab>('shop');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Selected product for individual specs view
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  
  // Persistent shopping cart state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const cached = localStorage.getItem('mamazon_basket');
    return cached ? JSON.parse(cached) : [];
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutMode, setIsCheckoutMode] = useState(false);
  const [orderedDetails, setOrderedDetails] = useState<CheckoutDetails | null>(null);
  const [latestOrder, setLatestOrder] = useState<CheckoutDetails | null>(() => {
    try {
      const cached = localStorage.getItem('mamazon_latest_order');
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });

  // Synchronize state with browser URL (search params, hash, and history)
  useEffect(() => {
    const handleUrlSync = () => {
      const params = new URLSearchParams(window.location.search);
      let prodId = params.get('product') || params.get('p');
      const tabParam = params.get('tab') as AppTab | null;

      // Also check hash for #/product/{id} or #product={id}
      if (!prodId && window.location.hash) {
        const hashMatch = window.location.hash.match(/(?:product\/|product=)([a-zA-Z0-9_-]+)/);
        if (hashMatch) {
          prodId = hashMatch[1];
        }
      }

      // Also check pathname for /product/{id}
      if (!prodId && window.location.pathname.startsWith('/product/')) {
        prodId = window.location.pathname.replace('/product/', '').replace(/\/$/, '');
      }

      if (prodId) {
        const found = PRODUCTS.find(p => p.id === prodId);
        if (found) {
          setActiveProduct(found);
          setIsCartOpen(false);
          setIsCheckoutMode(false);
          return;
        }
      }

      setActiveProduct(null);

      if (tabParam && ['shop', 'rebate', 'about', 'contact', 'privacy', 'policies', 'terms', 'refund', 'shipping', 'returns', 'track'].includes(tabParam)) {
        setTab(tabParam);
      } else if (window.location.hash.includes('track') || params.get('track')) {
        setTab('track');
      } else {
        setTab('shop');
      }
    };

    handleUrlSync();

    window.addEventListener('popstate', handleUrlSync);
    window.addEventListener('hashchange', handleUrlSync);
    return () => {
      window.removeEventListener('popstate', handleUrlSync);
      window.removeEventListener('hashchange', handleUrlSync);
    };
  }, []);

  // Sync cart shifts into browser memory
  useEffect(() => {
    localStorage.setItem('mamazon_basket', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleOpenProduct = (product: Product) => {
    setActiveProduct(product);
    setIsCartOpen(false);
    setIsCheckoutMode(false);

    try {
      const url = new URL(window.location.href);
      url.searchParams.set('product', product.id);
      url.hash = `/product/${product.id}`;
      window.history.pushState({ productId: product.id }, '', url.toString());
    } catch {
      window.location.hash = `/product/${product.id}`;
    }
  };

  const handleCloseProduct = () => {
    setActiveProduct(null);

    try {
      const url = new URL(window.location.href);
      url.searchParams.delete('product');
      url.hash = '';
      if (currentTab && currentTab !== 'shop') {
        url.searchParams.set('tab', currentTab);
      } else {
        url.searchParams.delete('tab');
      }
      window.history.pushState({}, '', url.toString());
    } catch {
      window.location.hash = '';
    }
  };

  const handleSelectTab = (tab: AppTab) => {
    setTab(tab);
    setIsCartOpen(false);
    setIsCheckoutMode(false);
    setActiveProduct(null);

    try {
      const url = new URL(window.location.href);
      url.searchParams.delete('product');
      url.hash = '';
      if (tab !== 'shop') {
        url.searchParams.set('tab', tab);
      } else {
        url.searchParams.delete('tab');
      }
      window.history.pushState({ tab }, '', url.toString());
    } catch {
      window.location.hash = tab !== 'shop' ? `/${tab}` : '';
    }
  };

  const resetAllShoppingModes = () => {
    setOrderedDetails(null);
    setIsCheckoutMode(false);
    setIsCartOpen(false);
    setActiveProduct(null);
    setTab('shop');

    try {
      const url = new URL(window.location.href);
      url.searchParams.delete('product');
      url.searchParams.delete('tab');
      url.hash = '';
      window.history.pushState({}, '', url.toString());
    } catch {
      window.location.hash = '';
    }
  };

  const handleUpdateQty = (productId: string, quantity: number, selectedColor?: string) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.product.id === productId && (!selectedColor || item.selectedColor === selectedColor)) {
          return { ...item, quantity: Math.max(1, quantity) };
        }
        return item;
      });
    });
  };

  const handleRemoveItem = (productId: string, selectedColor?: string) => {
    setCartItems(prev => prev.filter(item => 
      !(item.product.id === productId && (!selectedColor || item.selectedColor === selectedColor))
    ));
  };

  const handleAddToCart = (product: Product, quantity: number = 1, selectedColor?: string) => {
    setCartItems(prev => {
      const existsIdx = prev.findIndex(item => 
        item.product.id === product.id && 
        (!selectedColor || item.selectedColor === selectedColor)
      );

      if (existsIdx > -1) {
        const next = [...prev];
        next[existsIdx] = {
          ...next[existsIdx],
          quantity: next[existsIdx].quantity + quantity
        };
        return next;
      }

      return [...prev, { product, quantity, selectedColor }];
    });
    
    // Auto trigger basket notifications slider
    setIsCartOpen(true);
  };

  const handleQuickAddToCart = (product: Product, event: React.MouseEvent) => {
    event.stopPropagation();
    handleAddToCart(product, 1, product.colors && product.colors.length > 0 ? product.colors[0] : undefined);
  };

  const handleOrderSuccess = (details: CheckoutDetails) => {
    setOrderedDetails(details);
    setLatestOrder(details);
    try {
      localStorage.setItem('mamazon_latest_order', JSON.stringify(details));
    } catch (e) {
      console.error('Failed to cache order', e);
    }
    // Erase basket items upon successful transaction completion
    setCartItems([]);
  };

  // Helper utility to pair custom category icons safely
  const renderCategoryIcon = (id: string) => {
    switch (id) {
      case 'all': return <Grid className="w-4 h-4" />;
      case 'kitchen': return <Utensils className="w-4 h-4" />;
      case 'home': return <HomeIcon className="w-4 h-4" />;
      case 'beauty': return <Sparkles className="w-4 h-4" />;
      case 'electronics': return <Cpu className="w-4 h-4" />;
      default: return <Grid className="w-4 h-4" />;
    }
  };

  // Filter models list
  const filteredProducts = PRODUCTS.filter(prod => {
    const matchCat = selectedCategory === 'all' || prod.category === selectedCategory;
    const matchSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        prod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        prod.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-900">
      
      {/* Header navbar layout controls */}
      <Header
        currentTab={currentTab}
        setTab={handleSelectTab}
        cartCount={cartCount}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onCartClick={() => {
          setIsCartOpen(true);
          setIsCheckoutMode(false);
          setActiveProduct(null);
        }}
      />

      {/* Main Container Core Viewport switcher */}
      <main className="flex-1">
        
        {/* VIEW 1: Order Checkout Receipt Dashboard (Overriding other views upon completion) */}
        {orderedDetails ? (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-slate-800"
          >
            <div className="bg-white border border-slate-100 rounded-3xl shadow-xl p-8 sm:p-12 space-y-8">
              <div className="w-20 h-20 bg-emerald-100 border-4 border-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono font-bold uppercase">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Payment Transfer Approved
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                  Order Confirmed & Scheduled!
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm font-medium">
                  We've emailed your invoice receipt details to <span className="font-bold text-slate-900">{orderedDetails.email}</span>
                </p>
              </div>

              {/* USA to UK 10-Day Tracking Spotlight Box */}
              <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white rounded-2xl p-6 text-left border border-slate-800 shadow-lg space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block font-bold">
                      Official Transatlantic Air Cargo Tracking
                    </span>
                    <span className="text-lg sm:text-xl font-mono font-extrabold text-amber-400">
                      {orderedDetails.trackingNumber || 'MZ-US8492014UK'}
                    </span>
                  </div>

                  <span className="bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold px-3 py-1 rounded-full w-max">
                    10-Day Guaranteed US ➔ UK Route
                  </span>
                </div>

                {/* Origin -> Transatlantic -> Destination Route */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">1. Origin</span>
                    <span className="font-bold text-white block mt-0.5">🇺🇸 US Logistics Hub</span>
                    <span className="text-[11px] text-slate-400">Newark / JFK Airport, USA</span>
                  </div>
                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">2. Air Transit</span>
                    <span className="font-bold text-amber-400 block mt-0.5">✈️ Boeing 777F Flight</span>
                    <span className="text-[11px] text-slate-400">Transatlantic Air Cargo</span>
                  </div>
                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">3. UK Destination</span>
                    <span className="font-bold text-emerald-400 block mt-0.5">🇬🇧 Your UK Address</span>
                    <span className="text-[11px] text-slate-400">{orderedDetails.city}, {orderedDetails.postalCode}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                  <div className="text-xs text-slate-400">
                    Expected UK Doorstep Delivery: <span className="text-white font-bold font-mono">Within 10 Days</span>
                  </div>
                  <button
                    onClick={() => {
                      setOrderedDetails(null);
                      setTab('track');
                    }}
                    className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl transition-all shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Truck className="w-4 h-4" />
                    Track Parcel Live (10-Day Timeline)
                  </button>
                </div>
              </div>

              {/* Transit progression step slider bar */}
              <div className="grid grid-cols-4 gap-2 border-y border-slate-100 py-6 text-slate-500 text-[10px] sm:text-xs">
                <div className="text-center space-y-1">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto text-[10px]">1</div>
                  <span className="font-bold text-slate-900 block">Day 1: Dispatched</span>
                  <span className="text-[9px] text-slate-400 font-mono">US Hub (Newark)</span>
                </div>
                <div className="text-center space-y-1">
                  <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center mx-auto text-[10px] animate-pulse">2</div>
                  <span className="font-bold text-slate-900 block">Day 2-5: Air Transit</span>
                  <span className="text-[9px] text-amber-600 font-mono">Flight JFK ➔ LHR</span>
                </div>
                <div className="text-center space-y-1 opacity-75">
                  <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center mx-auto text-[10px]">3</div>
                  <span className="font-bold text-slate-900 block">Day 6-8: UK Customs</span>
                  <span className="text-[9px] text-slate-500 font-mono">HMRC Cleared</span>
                </div>
                <div className="text-center space-y-1 opacity-75">
                  <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center mx-auto text-[10px]">4</div>
                  <span className="font-bold text-slate-900 block">Day 9-10: Delivery</span>
                  <span className="text-[9px] text-slate-500 font-mono">Royal Mail / UK Address</span>
                </div>
              </div>

              {/* Delivery specifications */}
              <div className="bg-slate-50 rounded-2xl p-6 text-left space-y-4 text-xs sm:text-sm">
                <h4 className="font-bold text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-1.5 uppercase tracking-wide text-xs">
                  <Package className="w-4 h-4 text-amber-500" />
                  Courier & Consignment Summary
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider block">Recipient</span>
                    <span className="font-bold text-slate-800 text-xs sm:text-sm block">{orderedDetails.fullName}</span>
                    <span className="text-slate-500 text-xs block">{orderedDetails.phone}</span>
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider block">Given UK Address</span>
                    <span className="text-slate-600 text-xs sm:text-sm block leading-normal">
                      {orderedDetails.addressLine1}, {orderedDetails.addressLine2 ? `${orderedDetails.addressLine2}, ` : ''} 
                      {orderedDetails.city}, {orderedDetails.state} {orderedDetails.postalCode}, {orderedDetails.country}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">Payment Status:</span>
                    <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-md text-[11px]">
                      Bank Transfer Receipt Verified
                    </span>
                  </div>
                  {orderedDetails.paymentScreenshot && (
                    <div className="flex items-center gap-1.5 text-slate-600 text-xs font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>Screenshot SS Attached</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action layout */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => {
                    setOrderedDetails(null);
                    setTab('track');
                  }}
                  className="py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-amber-500/20 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Truck className="w-4 h-4 text-slate-950" />
                  Live Parcel Tracking
                </button>

                <button
                  onClick={() => {
                    setOrderedDetails(null);
                    setTab('rebate');
                  }}
                  className="py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Award className="w-4 h-4 text-amber-400" />
                  Claim Cashback
                </button>

                <button
                  onClick={resetAllShoppingModes}
                  className="py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer"
                >
                  Store Catalog
                </button>
              </div>
            </div>
          </motion.div>
        ) : isCartOpen ? (
          /* VIEW 2: Dynamic Basket Pages (Subdivided into Cart details and Checkout fields) */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-4"
          >
            {isCheckoutMode ? (
              <Checkout
                cartItems={cartItems}
                onBackToCart={() => setIsCheckoutMode(false)}
                onOrderSuccess={handleOrderSuccess}
              />
            ) : (
              <Cart
                cartItems={cartItems}
                onUpdateQty={handleUpdateQty}
                onRemoveItem={handleRemoveItem}
                onCheckout={() => setIsCheckoutMode(true)}
                onKeepShopping={() => setIsCartOpen(false)}
              />
            )}
          </motion.div>
        ) : activeProduct ? (
          /* VIEW 3: Dedicated facts sheets details sliders */
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="py-4"
          >
            <ProductDetail
              product={activeProduct}
              onBack={handleCloseProduct}
              onAddToCart={(prod, qty, color) => {
                handleAddToCart(prod, qty, color);
              }}
            />
          </motion.div>
        ) : currentTab === 'rebate' ? (
          /* VIEW 4: VIP Hub Order verification templates */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-4"
          >
            <RebatePortal
              products={PRODUCTS}
              onBackToCatalog={() => handleSelectTab('shop')}
            />
          </motion.div>
        ) : currentTab === 'about' ? (
          <AboutUs onBackToCatalog={resetAllShoppingModes} onContactClick={() => setTab('contact')} />
        ) : currentTab === 'contact' ? (
          <ContactUs onBackToCatalog={resetAllShoppingModes} />
        ) : currentTab === 'privacy' || currentTab === 'policies' ? (
          <PrivacyPolicy onBackToCatalog={resetAllShoppingModes} onContactClick={() => setTab('contact')} />
        ) : currentTab === 'terms' ? (
          <TermsAndConditions onBackToCatalog={resetAllShoppingModes} onContactClick={() => setTab('contact')} />
        ) : currentTab === 'refund' ? (
          <RefundPolicy onBackToCatalog={resetAllShoppingModes} onContactClick={() => setTab('contact')} />
        ) : currentTab === 'shipping' ? (
          <ShippingDelivery onBackToCatalog={resetAllShoppingModes} onContactClick={() => setTab('contact')} />
        ) : currentTab === 'returns' ? (
          /* VIEW 8: Product Return and 30-day money back guarantee */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-4"
          >
            <Returns onBackToCatalog={resetAllShoppingModes} />
          </motion.div>
        ) : currentTab === 'track' ? (
          /* VIEW 9: 10-Day USA to UK Order Tracking Portal */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-4"
          >
            <OrderTracking
              latestOrder={latestOrder}
              onBackToCatalog={resetAllShoppingModes}
              onContactClick={() => setTab('contact')}
            />
          </motion.div>
        ) : (
          /* VIEW 8: Default Retail Catalog Storefront layout */
          <div className="space-y-10 pb-16">
            
            {/* Promo hero board Carousel section banner */}
            <div className="bg-white border-b border-slate-100 pt-6 pb-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative bg-slate-900 rounded-3xl overflow-hidden p-6 sm:p-12 md:p-16 text-white shadow-xl min-h-[360px] flex items-center">
                  {/* Decorative background overlay */}
                  <div className="absolute inset-0 bg-radial-[circle_at_right_top,_var(--tw-gradient-stops)] from-amber-500/10 via-slate-950 to-slate-950"></div>
                  
                  <div className="relative z-10 max-w-xl space-y-4 sm:space-y-6">
                    <span className="text-amber-400 text-xs font-mono font-bold tracking-widest uppercase bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full inline-block">
                      🔥 Prime Summer Direct Warehouse Clearance
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-sans leading-tight">
                      Factory Direct Deals <br className="hidden sm:inline" />
                      Meet <span className="text-amber-500">VIP CashBack</span>.
                    </h2>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      Shop our exclusive catalog of home appliances, silky bedding sets, advanced personal beauty wands, and accessories. Experience elite fast Prime shipping, certified high quality, and automated PayPal cashback claims.
                    </p>
                    <div className="flex flex-wrap items-center gap-3.5 pt-2">
                      <a
                        href="#products-list"
                        className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm px-5 py-3.5 rounded-xl shadow-md cursor-pointer transition-all"
                      >
                        Browse Amazon Catalog
                      </a>
                      <button
                        onClick={() => handleSelectTab('rebate')}
                        className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-xs sm:text-sm px-5 py-3.5 rounded-xl transition-all"
                      >
                        Claim order cashbacks
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Real-time category filtration navigation scroll block */}
            <div id="products-list" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-slate-900 font-extrabold text-xl sm:text-2xl font-sans tracking-tight">MzAmazon Seller Exclusive Catalog</h3>
                  <p className="text-slate-500 text-xs sm:text-sm mt-0.5">Filter by lifestyle classifications or text search parameters.</p>
                </div>

                {/* Secondary list indicators */}
                <div className="text-xs font-mono text-slate-400">
                  Showing <span className="font-bold text-slate-800">{filteredProducts.length}</span> certified premium models
                </div>
              </div>

              {/* Categorization chips */}
              <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-tight transition-all duration-200 cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-slate-900 text-white shadow-md'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {renderCategoryIcon(cat.id)}
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Grid listings of filtered models */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredProducts.map((prod) => (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      onViewDetails={handleOpenProduct}
                      onAddToCart={handleQuickAddToCart}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white border rounded-3xl p-16 text-center space-y-4 max-w-md mx-auto shadow-xs">
                  <span className="text-amber-500 text-4xl block font-mono">⚠️</span>
                  <h4 className="text-slate-900 font-extrabold text-lg">No Matching Products</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    We couldn't locate any products matching "{searchQuery}" in our {selectedCategory} lists. Let's try adjusting your spelling or filters!
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="px-4 py-2 bg-slate-900 hover:bg-amber-500 text-white font-bold text-xs rounded-xl"
                  >
                    Reset Filter Parameters
                  </button>
                </div>
              )}

            </div>
          </div>
        )}

      </main>

      {/* Structured elegant Footer banner - Luxe Black & Gold Design */}
      <footer className="bg-slate-950 text-slate-400 text-xs font-medium py-12 border-t border-slate-900 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-center sm:text-left">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <h4 className="text-white font-black text-sm tracking-widest uppercase bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">
              MzAmazonSeller
            </h4>
            <p className="leading-relaxed text-slate-500 text-xs font-normal">
              The premier zero-cost testing & rebate aggregation club for high quality household models, electronics, appliances, wellness devices, and beauty wands. Fully legal and compliant.
            </p>
            {/* Social Media Placeholders */}
            <div className="flex justify-center sm:justify-start gap-2.5 pt-2">
              <a href="#" onClick={(e) => e.preventDefault()} className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-500/40 transition-all shadow-md">
                <Facebook className="w-4 h-4 text-inherit" />
              </a>
              <a href="#" onClick={(e) => e.preventDefault()} className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-500/40 transition-all shadow-md">
                <Instagram className="w-4 h-4 text-inherit" />
              </a>
              <a href="#" onClick={(e) => e.preventDefault()} className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-500/40 transition-all shadow-md">
                <Twitter className="w-4 h-4 text-inherit" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-[13px] tracking-wider uppercase">VIP Store Pages</h4>
            <div className="flex flex-col gap-2.5 text-slate-400 font-semibold">
              <button onClick={() => handleSelectTab('shop')} className="text-left w-max mx-auto sm:mx-0 hover:text-amber-400 cursor-pointer transition-colors text-xs">Prime Shop</button>
              <button onClick={() => handleSelectTab('rebate')} className="text-left w-max mx-auto sm:mx-0 hover:text-amber-400 cursor-pointer transition-colors text-xs">VIP Cashback Claims</button>
              <button onClick={() => handleSelectTab('track')} className="text-left w-max mx-auto sm:mx-0 hover:text-amber-400 cursor-pointer transition-colors text-xs flex items-center gap-1.5 text-amber-400 font-bold">
                <Truck className="w-3.5 h-3.5" />
                Track Order (USA ➔ UK)
              </button>
              <button onClick={() => handleSelectTab('about')} className="text-left w-max mx-auto sm:mx-0 hover:text-amber-400 cursor-pointer transition-colors text-xs">About Us</button>
              <button onClick={() => handleSelectTab('contact')} className="text-left w-max mx-auto sm:mx-0 hover:text-amber-400 cursor-pointer transition-colors text-xs">Contact Us</button>
              <button onClick={() => handleSelectTab('returns')} className="text-left w-max mx-auto sm:mx-0 hover:text-amber-400 cursor-pointer transition-colors text-xs">Product Returns Portal</button>
            </div>
          </div>

          {/* Col 3: Legal Policy Links */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-[13px] tracking-wider uppercase">Store Policies</h4>
            <div className="flex flex-col gap-2.5 text-slate-400 font-semibold">
              <button onClick={() => handleSelectTab('privacy')} className="text-left w-max mx-auto sm:mx-0 hover:text-amber-400 cursor-pointer transition-colors text-xs">Privacy Policy</button>
              <button onClick={() => handleSelectTab('terms')} className="text-left w-max mx-auto sm:mx-0 hover:text-amber-400 cursor-pointer transition-colors text-xs">Terms & Conditions</button>
              <button onClick={() => handleSelectTab('refund')} className="text-left w-max mx-auto sm:mx-0 hover:text-amber-400 cursor-pointer transition-colors text-xs">Refund Policy</button>
              <button onClick={() => handleSelectTab('shipping')} className="text-left w-max mx-auto sm:mx-0 hover:text-amber-400 cursor-pointer transition-colors text-xs">Shipping & Delivery</button>
            </div>
          </div>

          {/* Col 4: Support Email Section */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-[13px] tracking-wider uppercase">Customer Support</h4>
            <div className="space-y-3 text-slate-500 font-normal leading-relaxed text-xs">
              <div className="space-y-0.5">
                <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block font-mono">Direct Support Email</span>
                <a href="mailto:serhatrodi4@gmail.com" className="text-amber-400 font-bold hover:underline select-all block mt-0.5">
                  serhatrodi4@gmail.com
                </a>
              </div>
              <div className="space-y-0.5">
                <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block font-mono">Support Hotline</span>
                <a href="tel:+447426783731" className="text-white font-mono font-bold hover:text-amber-400 transition-colors block mt-0.5">
                  +447426783731
                </a>
              </div>
              <div className="space-y-0.5">
                <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block font-mono font-sans">Business Hours</span>
                <p className="text-slate-400 text-[11px] leading-tight fn-normal">Mon - Sat: 9:00 AM - 8:00 PM (GMT)</p>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright & Code Export Section */}
        <div className="border-t border-slate-900/80 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono tracking-tight max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            © 2026 MZ Amazon Seller Store & Palamede-EU Stores Ltd. All Rights Reserved.
          </div>
          <a
            href="/mamazon-seller-store.zip"
            download="mamazon-seller-store.zip"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-slate-300 font-sans font-bold text-xs transition-all border border-slate-800 shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            Download Source Code (.ZIP)
          </a>
        </div>
      </footer>

    </div>
  );
}
