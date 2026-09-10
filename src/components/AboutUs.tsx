import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Trophy, ShieldCheck, Headphones, Globe, ArrowRight, Star } from 'lucide-react';

interface AboutUsProps {
  onBackToCatalog: () => void;
  onContactClick: () => void;
}

export default function AboutUs({ onBackToCatalog, onContactClick }: AboutUsProps) {
  const values = [
    {
      icon: <Sparkles className="w-6 h-6 text-amber-400" />,
      title: "Premium Amazon Products",
      desc: "Carefully curated, high-end electronics, beauty wands, home, and kitchen items designed to elevate daily living."
    },
    {
      icon: <Headphones className="w-6 h-6 text-amber-400" />,
      title: "Fast Customer Support",
      desc: "Our supportive human desk is available via direct channels, answering queries in under 24 hours guaranteed."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-amber-400" />,
      title: "Secure Online Payments",
      desc: "All global transactions are fully protected. Refund balances and PayPal claims are handled via secure socket gates."
    },
    {
      icon: <Globe className="w-6 h-6 text-amber-400" />,
      title: "Worldwide Customer Service",
      desc: "Delivering reliable solutions and elite-tier logistic delivery structures to shoppers across the globe."
    }
  ];

  return (
    <div className="bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-8 min-h-screen relative overflow-hidden">
      {/* Decorative Golden Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-600/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto space-y-16 relative z-10">
        
        {/* Header Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-amber-500/20 to-yellow-600/10 border border-amber-500/30 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-amber-400"
          >
            <Trophy className="w-3.5 h-3.5" /> Established Store Credibility
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-4xl sm:text-5xl font-black tracking-tight font-sans leading-tight bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 bg-clip-text text-transparent"
          >
            About Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed"
          >
            Welcome to <span className="text-amber-400 font-bold">MZ Amazon Seller Store</span>.
          </motion.p>
        </div>

        {/* Narrative Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-900/80 border border-amber-500/20 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full pointer-events-none"></div>
          
          <div className="space-y-6 text-slate-300 text-sm sm:text-base leading-relaxed max-w-4xl mx-auto">
            <p className="font-medium text-white text-lg">
              We are dedicated to providing high-quality digital and ecommerce solutions for customers worldwide.
            </p>
            <p>
              Our mission is simple yet powerful: <strong className="text-amber-400 font-semibold">to deliver reliable products, secure transactions, and excellent customer support</strong>.
            </p>
            <p>
              Our team continuously works to improve the customer experience and maintain a trusted shopping environment. We understand that transparency and premium care are what transform a standard storefront into an elite, life-long shopping destination.
            </p>
            
            <div className="border-t border-slate-800 pt-6">
              <p className="text-amber-400 font-bold tracking-tight text-center sm:text-left">
                Customer satisfaction and transparency are our top priorities.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Value Grid (Core Focuses) */}
        <div className="space-y-6">
          <div className="text-center sm:text-left space-y-1">
            <h3 className="text-xs font-mono font-bold tracking-widest text-amber-500 uppercase">Core Operations</h3>
            <h4 className="text-2xl font-extrabold text-white">We Focus On</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v, idx) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx + 0.4 }}
                className="group bg-slate-900 border border-slate-800 hover:border-amber-500/40 p-6 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/5 relative"
              >
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-slate-800 group-hover:bg-amber-500/10 rounded-xl text-amber-400 transition-all">
                    {v.icon}
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-bold text-white text-base group-hover:text-amber-400 transition-colors">
                      {v.title}
                    </h5>
                    <p className="text-xs text-slate-400 leading-relaxed font-normal">
                      {v.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trust Seal Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-amber-500/10 to-yellow-600/5 border border-amber-500/20 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-white font-extrabold text-lg flex items-center justify-center md:justify-start gap-2">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" /> Need Help Planning Your Purchases?
            </h4>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
              If you have any questions, feel free to contact our support team anytime. We usually respond in under 24 hours.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              onClick={onContactClick}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-bold text-xs sm:text-sm rounded-xl cursor-pointer hover:opacity-90 transition-all flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/10"
            >
              Contact Support
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
            <button
              onClick={onBackToCatalog}
              className="w-full sm:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-700 text-amber-400 font-semibold text-xs sm:text-sm rounded-xl cursor-pointer transition-all text-center"
            >
              Browse Catalog
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
