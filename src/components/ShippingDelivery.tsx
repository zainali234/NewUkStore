import React from 'react';
import { motion } from 'motion/react';
import { Truck, Cpu, Globe, HelpCircle, Mail, AlertTriangle, ShieldCheck, Clock, Search } from 'lucide-react';

interface ShippingDeliveryProps {
  onBackToCatalog: () => void;
  onContactClick: () => void;
}

export default function ShippingDelivery({ onBackToCatalog, onContactClick }: ShippingDeliveryProps) {
  const delays = [
    { title: "Customs Clearances", desc: "International shipping might involve localized legal/customs declarations checks." },
    { title: "Technical Issues", desc: "Unscheduled data server failures or API logistic update pauses." },
    { title: "Payment Verification", desc: "Secondary checks completed by credit systems or bank processors." },
    { title: "High Order Volume", desc: "Seasonal queue build-ups during Prime Day or clearance campaigns." }
  ];

  return (
    <div className="bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-8 min-h-screen relative overflow-hidden">
      {/* Golden accent radial fills */}
      <div className="absolute top-10 right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-yellow-600/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        
        {/* Document Title Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/15 border border-amber-500/30 rounded-full text-[10px] font-mono font-bold uppercase text-amber-400">
            <Truck className="w-3.5 h-3.5" /> Logistic Network Dispatch Status
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-sans tracking-tight bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 bg-clip-text text-transparent">
            Shipping & Delivery
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto font-light leading-relaxed">
            Transparent explanations concerning our product distribution channels, physical items dispatch timelines, and digital voucher handling.
          </p>
        </div>

        {/* Dual Delivery Methods Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Track 1: Digital Products */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-900 border border-amber-500/20 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl relative"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-3xl pointer-events-none"></div>
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="p-2 bg-slate-950 border border-slate-800 text-amber-500 rounded-xl">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-white font-extrabold text-base">Digital Products</h3>
            </div>
            
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
              Our digital products and activation licenses are processed with hyper-efficiency. 
            </p>
            <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl">
              <span className="text-amber-400 text-[10px] font-mono uppercase font-black block tracking-wider mb-1">Standard Delivery Time</span>
              <strong className="text-white text-xs sm:text-sm font-sans flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-500" /> Delivered instantly or within 24 hours
              </strong>
              <p className="text-slate-500 text-[10px] mt-1 leading-normal">
                Dispatched straight to your registered email address post payment authorization.
              </p>
            </div>
          </motion.div>

          {/* Track 2: Physical Products */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-900 border border-amber-500/20 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl relative"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-3xl pointer-events-none"></div>
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="p-2 bg-slate-950 border border-slate-800 text-amber-500 rounded-xl">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-white font-extrabold text-base">Physical Products (USA ➔ UK)</h3>
            </div>
            
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
              All physical merchandise is dispatched directly from our verified United States export logistics center (Newark/JFK, USA) to your given United Kingdom address.
            </p>
            <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl">
              <span className="text-amber-400 text-[10px] font-mono uppercase font-black block tracking-wider mb-1">Guaranteed Delivery Timeline</span>
              <strong className="text-white text-xs sm:text-sm font-sans flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-400" /> Exactly 10 Days (USA Origin to UK Doorstep)
              </strong>
              <p className="text-slate-400 text-[10px] mt-1 leading-normal">
                Includes transatlantic air cargo, full pre-paid UK HMRC customs clearance, and final delivery via Royal Mail Tracked 24 or Parcelforce UK.
              </p>
            </div>
          </motion.div>

        </div>

        {/* Delay Factor Breakdowns */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-slate-300">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider">Potential Delay Variables</h4>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed">
            Unexpected delays in shipping operations might occasionally manifest. Our support team works around the clock to mitigate latency caused by:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {delays.map((d, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-850 p-4 rounded-2xl space-y-1.5">
                <strong className="text-white text-xs font-extrabold block">{d.title}</strong>
                <p className="text-slate-400 text-[10px] leading-relaxed font-normal">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Order tracking coordinates info */}
        <div className="bg-slate-900 border border-amber-500/20 rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center sm:text-left">
            <h4 className="text-white font-extrabold text-base flex items-center justify-center sm:justify-start gap-2">
              <Search className="w-5 h-5 text-amber-400" /> Need Real-Time Dispatch Status?
            </h4>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
              Customers may contact support at any time for real-time tracking coordinates or order logistics updates.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0 animate-fade-in">
            <button
              onClick={onContactClick}
              className="w-full sm:w-auto px-5 py-3.5 bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-black text-xs sm:text-sm rounded-xl cursor-pointer"
            >
              Contact Support Desk
            </button>
            <button
              onClick={onBackToCatalog}
              className="w-full sm:w-auto px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-semibold rounded-xl cursor-pointer"
            >
              Return to Catalog
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
