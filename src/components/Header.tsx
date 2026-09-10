import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Award, 
  Sparkles, 
  Mail, 
  FileText, 
  RotateCcw, 
  ChevronDown, 
  BookOpen, 
  Shield, 
  Scale, 
  Truck, 
  Info 
} from 'lucide-react';

export type AppTab = 
  | 'shop' 
  | 'rebate' 
  | 'about' 
  | 'contact' 
  | 'policies' 
  | 'returns' 
  | 'privacy' 
  | 'terms' 
  | 'refund' 
  | 'shipping'
  | 'track';

interface HeaderProps {
  currentTab: AppTab;
  setTab: (tab: AppTab) => void;
  cartCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onCartClick: () => void;
}

export default function Header({
  currentTab,
  setTab,
  cartCount,
  searchQuery,
  setSearchQuery,
  onCartClick,
}: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobilePoliciesOpen, setMobilePoliciesOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const closeDropdown = () => setDropdownOpen(false);

  const handlePolicySelect = (tab: AppTab) => {
    setTab(tab);
    closeDropdown();
    setMobilePoliciesOpen(false);
  };

  const isPolicyActive = 
    currentTab === 'privacy' || 
    currentTab === 'terms' || 
    currentTab === 'refund' || 
    currentTab === 'shipping';

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo brand - Luxurious Black and Gold */}
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => handlePolicySelect('shop')}>
            <div className="bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 text-slate-950 p-2 sm:p-2.5 rounded-xl shadow-md shadow-amber-500/10 flex items-center justify-center transition-transform hover:scale-105">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-slate-950" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black font-sans tracking-tight text-white leading-none">
                MzAmazon<span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">Seller</span>
              </h1>
              <p className="text-[10px] sm:text-[11px] font-mono text-amber-500/80 tracking-widest font-bold uppercase mt-1">
                VIP Hub & Premium Goods
              </p>
            </div>
          </div>

          {/* Navigation tabs - Desktop Luxury Menu */}
          <nav className="hidden lg:flex items-center space-x-1 bg-slate-900/50 p-1 border border-slate-800 rounded-xl">
            <button
              onClick={() => handlePolicySelect('shop')}
              className={`px-3.5 py-2 rounded-lg text-xs xl:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                currentTab === 'shop'
                  ? 'bg-gradient-to-r from-amber-500/20 to-yellow-600/15 border border-amber-500/30 text-amber-400 shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Browse Products
            </button>
            
            <button
              onClick={() => handlePolicySelect('rebate')}
              className={`px-3.5 py-2 rounded-lg text-xs xl:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'rebate'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Award className="w-4.5 h-4.5" />
              Claim VIP Cashback
            </button>
            
            <button
              onClick={() => handlePolicySelect('about')}
              className={`px-3.5 py-2 rounded-lg text-xs xl:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                currentTab === 'about'
                  ? 'bg-gradient-to-r from-amber-500/20 to-yellow-600/15 border border-amber-500/30 text-amber-400 shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              About Us
            </button>

            {/* Policies Dropdown Select */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                onMouseEnter={() => setDropdownOpen(true)}
                className={`px-3.5 py-2 rounded-lg text-xs xl:text-sm font-semibold transition-all duration-200 flex items-center gap-1 cursor-pointer ${
                  isPolicyActive
                    ? 'bg-gradient-to-r from-amber-500/20 to-yellow-600/15 border border-amber-500/30 text-amber-400 shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-inherit" />
                Store Policies
                <ChevronDown className={`w-3.5 h-3.5 ml-0.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Gold/Black Premium dropdown container */}
              {dropdownOpen && (
                <div 
                  className="absolute right-0 mt-1 w-52 bg-slate-950 border border-amber-500/20 rounded-xl shadow-2xl py-2 z-50 animate-fade-in font-sans"
                  onMouseLeave={closeDropdown}
                >
                  <button
                    onClick={() => handlePolicySelect('privacy')}
                    className="w-full text-left px-4 py-2 text-xs xl:text-sm font-medium text-slate-300 hover:text-amber-400 hover:bg-slate-900 flex items-center gap-2 cursor-pointer"
                  >
                    <Shield className="w-4 h-4 text-amber-500" /> Privacy Policy
                  </button>
                  <button
                    onClick={() => handlePolicySelect('terms')}
                    className="w-full text-left px-4 py-2 text-xs xl:text-sm font-medium text-slate-300 hover:text-amber-400 hover:bg-slate-900 flex items-center gap-2 cursor-pointer"
                  >
                    <Scale className="w-4 h-4 text-amber-500" /> Terms & Conditions
                  </button>
                  <button
                    onClick={() => handlePolicySelect('refund')}
                    className="w-full text-left px-4 py-2 text-xs xl:text-sm font-medium text-slate-300 hover:text-amber-400 hover:bg-slate-900 flex items-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4 text-amber-500" /> Refund Policy
                  </button>
                  <button
                    onClick={() => handlePolicySelect('shipping')}
                    className="w-full text-left px-4 py-2 text-xs xl:text-sm font-medium text-slate-300 hover:text-amber-400 hover:bg-slate-900 flex items-center gap-2 cursor-pointer"
                  >
                    <Truck className="w-4 h-4 text-amber-500" /> Shipping & Delivery
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => handlePolicySelect('returns')}
              className={`px-3.5 py-2 rounded-lg text-xs xl:text-sm font-semibold transition-all duration-200 flex items-center gap-1 cursor-pointer ${
                currentTab === 'returns'
                  ? 'bg-gradient-to-r from-amber-500/20 to-yellow-600/15 border border-amber-500/30 text-amber-400 shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Easy Returns
            </button>

            <button
              onClick={() => handlePolicySelect('track')}
              className={`px-3.5 py-2 rounded-lg text-xs xl:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'track'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-bold shadow-md'
                  : 'text-amber-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Truck className="w-4 h-4 text-inherit" />
              Track Order
            </button>

            <button
              onClick={() => handlePolicySelect('contact')}
              className={`px-3.5 py-2 rounded-lg text-xs xl:text-sm font-semibold transition-all duration-200 flex items-center gap-1 cursor-pointer ${
                currentTab === 'contact'
                  ? 'bg-gradient-to-r from-amber-500/20 to-yellow-600/15 border border-amber-500/30 text-amber-400 shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              Contact Us
            </button>
          </nav>

          {/* Right Area - Search Inputs & Cart Indicator */}
          <div className="flex items-center gap-3 w-auto">
            {currentTab === 'shop' && (
              <div className="relative hidden lg:block w-72">
                <input
                  type="text"
                  placeholder="Search Amazon goods..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-hidden focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                />
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            )}

            <button
              onClick={onCartClick}
              className="relative p-2.5 text-slate-300 hover:text-amber-400 bg-slate-900 hover:bg-slate-850 rounded-xl border border-slate-800 transition-all duration-200 flex items-center justify-center cursor-pointer shadow-md"
            >
              <ShoppingBag className="w-5.5 h-5.5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-mono text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center animate-bounce shadow-md">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile secondary navigation - Highly Optimized & Scrolling */}
        <div className="flex lg:hidden items-center justify-between pb-4 gap-2">
          <nav className="flex space-x-1.5 bg-slate-900/50 p-1 border border-slate-800/80 rounded-lg w-full overflow-x-auto scrollbar-none whitespace-nowrap">
            <button
              onClick={() => handlePolicySelect('shop')}
              className={`flex-1 py-1.5 px-3.5 rounded-md text-xs font-bold tracking-tight transition-all text-center cursor-pointer ${
                currentTab === 'shop'
                  ? 'bg-gradient-to-r from-amber-500/25 to-yellow-600/15 border border-amber-500/30 text-amber-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Shop
            </button>
            <button
              onClick={() => handlePolicySelect('rebate')}
              className={`flex-grow py-1.5 px-3.5 rounded-md text-xs font-bold tracking-tight transition-all flex items-center justify-center gap-1 cursor-pointer ${
                currentTab === 'rebate'
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              Cashback
            </button>
            <button
              onClick={() => handlePolicySelect('about')}
              className={`flex-1 py-1.5 px-3.5 rounded-md text-xs font-bold tracking-tight transition-all text-center cursor-pointer ${
                currentTab === 'about'
                  ? 'bg-gradient-to-r from-amber-500/25 to-yellow-600/15 border border-amber-500/30 text-amber-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              About
            </button>

            {/* Mobile Store Policies trigger */}
            <button
              onClick={() => setMobilePoliciesOpen(!mobilePoliciesOpen)}
              className={`flex-1 py-1.5 px-3.5 rounded-md text-xs font-bold tracking-tight transition-all flex items-center justify-center gap-1 cursor-pointer ${
                isPolicyActive
                  ? 'bg-gradient-to-r from-amber-500/25 to-yellow-600/15 border border-amber-500/30 text-amber-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Policies
            </button>

            <button
              onClick={() => handlePolicySelect('returns')}
              className={`flex-1 py-1.5 px-3.5 rounded-md text-xs font-bold tracking-tight transition-all flex items-center justify-center gap-1 cursor-pointer ${
                currentTab === 'returns'
                  ? 'bg-gradient-to-r from-amber-500/25 to-yellow-600/15 border border-amber-500/30 text-amber-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Returns
            </button>

            <button
              onClick={() => handlePolicySelect('track')}
              className={`flex-1 py-1.5 px-3.5 rounded-md text-xs font-bold tracking-tight transition-all flex items-center justify-center gap-1 cursor-pointer ${
                currentTab === 'track'
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-bold shadow-md'
                  : 'text-amber-400 hover:text-slate-200'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              Track
            </button>

            <button
              onClick={() => handlePolicySelect('contact')}
              className={`flex-1 py-1.5 px-3.5 rounded-md text-xs font-bold tracking-tight transition-all flex items-center justify-center gap-1 cursor-pointer ${
                currentTab === 'contact'
                  ? 'bg-gradient-to-r from-amber-500/25 to-yellow-600/15 border border-amber-500/30 text-amber-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              Contact
            </button>
          </nav>
        </div>

        {/* Mobile Expandable Policies Drawer */}
        {mobilePoliciesOpen && (
          <div className="lg:hidden bg-slate-900 border border-slate-800 rounded-xl p-3 grid grid-cols-2 gap-2 mb-3 animate-fade-in font-sans">
            <button
              onClick={() => handlePolicySelect('privacy')}
              className={`px-3 py-2 text-xs font-semibold rounded-md text-left flex items-center gap-1.5 cursor-pointer ${currentTab === 'privacy' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'text-slate-300'}`}
            >
              <Shield className="w-3.5 h-3.5 text-amber-500" /> Privacy
            </button>
            <button
              onClick={() => handlePolicySelect('terms')}
              className={`px-3 py-2 text-xs font-semibold rounded-md text-left flex items-center gap-1.5 cursor-pointer ${currentTab === 'terms' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'text-slate-300'}`}
            >
              <Scale className="w-3.5 h-3.5 text-amber-500" /> Terms
            </button>
            <button
              onClick={() => handlePolicySelect('refund')}
              className={`px-3 py-2 text-xs font-semibold rounded-md text-left flex items-center gap-1.5 cursor-pointer ${currentTab === 'refund' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'text-slate-300'}`}
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-500" /> Refunds
            </button>
            <button
              onClick={() => handlePolicySelect('shipping')}
              className={`px-3 py-2 text-xs font-semibold rounded-md text-left flex items-center gap-1.5 cursor-pointer ${currentTab === 'shipping' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'text-slate-300'}`}
            >
              <Truck className="w-3.5 h-3.5 text-amber-500" /> Shipping
            </button>
          </div>
        )}

      </div>
    </header>
  );
}
