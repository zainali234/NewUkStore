import React from 'react';
import { motion } from 'motion/react';
import { RefreshCcw, CheckCircle2, XCircle, Clock, Mail, ShieldAlert, Award, FileText } from 'lucide-react';

interface RefundPolicyProps {
  onBackToCatalog: () => void;
  onContactClick: () => void;
}

export default function RefundPolicy({ onBackToCatalog, onContactClick }: RefundPolicyProps) {
  const eligibilities = [
    "Product was not delivered",
    "Payment issue occurred",
    "Duplicate payment was made",
    "Technical problem prevented delivery"
  ];

  const nonRefundables = [
    "Customer changes mind after delivery",
    "Incorrect information was provided by customer",
    "Service abuse or fraud is detected"
  ];

  return (
    <div className="bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-8 min-h-screen relative overflow-hidden">
      {/* Golden accents */}
      <div className="absolute top-10 right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-yellow-600/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        
        {/* Header Block */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/15 border border-amber-500/30 rounded-full text-[10px] font-mono font-bold uppercase text-amber-400">
            <RefreshCcw className="w-3.5 h-3.5" /> Customer Satisfaction Standards
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-sans tracking-tight bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 bg-clip-text text-transparent">
            Refund Policy
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto font-light leading-relaxed">
            We are dedicated to maintaining positive customer trust. Customer satisfaction is important to us. Here is our detailed layout regarding refund approvals.
          </p>
        </div>

        {/* Requirements Grid (Eligibility vs Non-Refundable) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Eligibility Column */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-900 border border-emerald-500/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl"
          >
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="p-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 rounded-xl">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-white font-extrabold text-base">Eligibility For Refund</h3>
            </div>
            <p className="text-slate-400 text-xs font-normal">
              Refund requests may be accepted if any of the following technical or logistical situations occur:
            </p>
            <ul className="space-y-3.5 text-xs text-slate-300">
              {eligibilities.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">&#10003;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Non-Refundable Column */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-900 border border-rose-500/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl"
          >
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="p-2 bg-rose-500/10 text-rose-400 border border-rose-500/25 rounded-xl">
                <XCircle className="w-5 h-5" />
              </div>
              <h3 className="text-white font-extrabold text-base">Non-Refundable Situations</h3>
            </div>
            <p className="text-slate-400 text-xs font-normal">
              Approved refunds may not apply if our compliance agents verify any of the following coordinates:
            </p>
            <ul className="space-y-3.5 text-xs text-slate-300">
              {nonRefundables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">&#10007;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>

        {/* Payout Processing Times Row */}
        <div className="bg-slate-900 border border-slate-850 rounded-3xl p-8 flex flex-col sm:flex-row items-center gap-6 shadow-xl">
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-amber-400 shrink-0">
            <Clock className="w-8 h-8" />
          </div>
          <div className="space-y-1.5">
            <h4 className="text-white font-extrabold text-base">Refund Processing Time</h4>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Once a case is reviewed and confirmed, approved refunds are usually processed and cleared to your originating payment system within <strong className="text-amber-400 font-extrabold font-mono text-sm">5-10 business days</strong>.
            </p>
          </div>
        </div>

        {/* Refund Contact Instructions Card */}
        <div className="bg-gradient-to-r from-amber-500/10 via-yellow-600/5 to-slate-900 border border-amber-500/20 rounded-3xl p-8 sm:p-10 space-y-6 shadow-2xl">
          <div className="space-y-2 text-center sm:text-left">
            <h4 className="text-white font-extrabold text-lg flex items-center justify-center sm:justify-start gap-2">
              <Mail className="w-5 h-5 text-amber-400" /> Contact For Refunds
            </h4>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
              To request an official refund, send a detailed email to: <a href="mailto:serhatrodi4@gmail.com" className="text-amber-400 hover:underline font-bold select-all font-mono">serhatrodi4@gmail.com</a>
            </p>
          </div>

          <div className="border-t border-slate-800 pt-5 space-y-3 font-sans">
            <p className="text-slate-400 text-xs uppercase tracking-wider font-mono font-bold">Please Include:</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-850">
                <span className="text-amber-400 font-mono font-bold block mb-1">Step 1</span>
                <strong className="text-white">Order ID</strong>
                <p className="text-slate-500 text-[10px] mt-0.5 leading-tight font-normal">Invoice/Trans Reference</p>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-850">
                <span className="text-amber-400 font-mono font-bold block mb-1">Step 2</span>
                <strong className="text-white">Payment Details</strong>
                <p className="text-slate-500 text-[10px] mt-0.5 leading-tight font-normal">PayPal/Credit method code</p>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-850">
                <span className="text-amber-400 font-mono font-bold block mb-1">Step 3</span>
                <strong className="text-white">Reason For Request</strong>
                <p className="text-slate-500 text-[10px] mt-0.5 leading-tight font-normal">Technical difficulty context</p>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-end">
            <button
              onClick={onContactClick}
              className="px-5 py-3.5 bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-black text-xs sm:text-sm rounded-xl cursor-pointer"
            >
              Submit Support Ticket
            </button>
            <button
              onClick={onBackToCatalog}
              className="px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-semibold rounded-xl cursor-pointer"
            >
              Return to Catalog
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
