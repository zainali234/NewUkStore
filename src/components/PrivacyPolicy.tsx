import React from 'react';
import { motion } from 'motion/react';
import { Eye, ShieldAlert, Lock, UserCheck, Scale, Mail, Info, FileText } from 'lucide-react';

interface PrivacyPolicyProps {
  onBackToCatalog: () => void;
  onContactClick: () => void;
}

export default function PrivacyPolicy({ onBackToCatalog, onContactClick }: PrivacyPolicyProps) {
  const collectItems = [
    { label: "Name", desc: "For invoice validation, support tickets, and direct contact registers." },
    { label: "Email Address", desc: "For order updates, confirmation receipts, and claims tracking." },
    { label: "Billing Information", desc: "Encrypted address fields matching third-party payment gateways." },
    { label: "Payment Details", desc: "Secure tokens validated by global payment processors." },
    { label: "Order Information", desc: "Your 17-digit Amazon transaction numbers to correlate cashback claims." },
    { label: "Device and Browser Data", desc: "Standard metadata logs for fraud prevention and performance optimization." }
  ];

  const useGoals = [
    "Process orders & coordinate dispatch operations",
    "Provide premium 24/7 customer support",
    "Improve store services and design layout experience",
    "Prevent transaction fraud and system abuse",
    "Send important real-time order updates"
  ];

  return (
    <div className="bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-8 min-h-screen relative overflow-hidden">
      {/* Golden accent radial fades */}
      <div className="absolute top-0 right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-yellow-600/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        
        {/* Document Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/15 border border-amber-500/30 rounded-full text-[10px] font-mono font-bold uppercase text-amber-400">
            <Lock className="w-3.5 h-3.5 text-inherit" /> Payment Gateway Moderation Grade A
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-sans tracking-tight bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 bg-clip-text text-transparent">
            Privacy Policy
          </h2>
          <p className="text-slate-400 text-xs font-mono">
            Last Updated: <span className="text-amber-400 font-bold">May 2026</span>
          </p>
        </div>

        {/* Introduction */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4"
        >
          <div className="flex gap-3 items-center text-amber-500">
            <Eye className="w-5 h-5" />
            <h3 className="font-bold text-sm uppercase tracking-wider font-mono">Commitment To Privacy</h3>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed font-light">
            At <strong className="text-white">MZ Amazon Seller Store</strong>, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines our transparent guidelines with respect to user information.
          </p>
        </motion.div>

        {/* Detailed Sections Grid */}
        <div className="space-y-8 bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
          
          {/* Section 1: Information We Collect */}
          <div className="space-y-4">
            <h3 className="text-lg font-black text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <span className="text-amber-400">01.</span> Information We Collect
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm">
              We may collect the following data to process customer logs and secure transactions safely:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {collectItems.map((item, id) => (
                <div key={id} className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-1">
                  <h4 className="text-amber-400 font-bold text-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                    {item.label}
                  </h4>
                  <p className="text-slate-400 text-[11px] leading-relaxed font-normal">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: How We Use Information */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h3 className="text-lg font-black text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <span className="text-amber-400">02.</span> How We Use Information
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm">
              We utilize gathered customer information exclusively for the following operations:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-400">
              {useGoals.map((g, idx) => (
                <li key={idx} className="flex items-center gap-2 bg-slate-950 px-4 py-2.5 rounded-lg border border-slate-850">
                  <UserCheck className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: Payment Security */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <h3 className="text-lg font-black text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <span className="text-amber-400">03.</span> Payment Security
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
              All payments are processed through secure third-party payment providers. <span className="text-amber-400 font-semibold">We do not store sensitive payment information on our servers.</span> All data is tokens and parsed through verified HTTPS pipelines.
            </p>
          </div>

          {/* Section 4: Data Protection */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <h3 className="text-lg font-black text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <span className="text-amber-400">04.</span> Data Protection
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
              We implement industry-standard security measures to protect user information from unauthorized access, loss, or alteration. All database tunnels are locked under robust server-side encryption layers.
            </p>
          </div>

          {/* Section 5: Third-Party Services */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <h3 className="text-lg font-black text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <span className="text-amber-400">05.</span> Third-Party Services
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              We may use trusted third-party services for:
            </p>
            <div className="flex flex-wrap gap-2 text-xs text-slate-300 font-mono">
              <span className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg">Payment processing</span>
              <span className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg">Analytics</span>
              <span className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg">Hosting</span>
              <span className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg">Customer communication</span>
            </div>
          </div>

          {/* Section 6: Cookies */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <h3 className="text-lg font-black text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <span className="text-amber-400">06.</span> Cookies
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
              Our website may use cookies to improve user experience, monitor analytics traffic, and optimize website speed and performance. You may configure your browser software to block cookies, although some UI components might restrict flow.
            </p>
          </div>

          {/* Section 7: User Rights */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <h3 className="text-lg font-black text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <span className="text-amber-400">07.</span> User Rights
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-normal">
              Users may request:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-center font-bold">
              <div className="bg-slate-950 px-4 py-3 rounded-xl border border-slate-800 text-amber-400">Access to personal data</div>
              <div className="bg-slate-950 px-4 py-3 rounded-xl border border-slate-800 text-amber-400">Data correction</div>
              <div className="bg-slate-950 px-4 py-3 rounded-xl border border-slate-800 text-amber-400">Data deletion</div>
            </div>
          </div>

        </div>

        {/* Contact Block */}
        <div className="bg-slate-900 border border-amber-500/20 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h4 className="text-white font-extrabold text-sm uppercase tracking-wider font-mono">Privacy-Related Questions?</h4>
            <div className="space-y-1 text-slate-400 text-xs">
              <p>Email: <strong className="text-amber-400 select-all font-mono">serhatrodi4@gmail.com</strong></p>
              <p>ph: <strong className="text-amber-400 select-all font-mono">+447426783731</strong></p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0">
            <button
              onClick={onContactClick}
              className="w-full sm:w-auto px-5 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-black text-xs sm:text-sm rounded-xl cursor-pointer"
            >
              Contact Privacy Compliance
            </button>
            <button
              onClick={onBackToCatalog}
              className="w-full sm:w-auto px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-semibold rounded-xl cursor-pointer"
            >
              Return to Catalog
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
