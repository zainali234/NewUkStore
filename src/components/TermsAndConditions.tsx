import React from 'react';
import { motion } from 'motion/react';
import { Scale, ShieldCheck, AlertCircle, FileText, Ban, PoundSterling, Copyright, RefreshCw } from 'lucide-react';

interface TermsAndConditionsProps {
  onBackToCatalog: () => void;
  onContactClick: () => void;
}

export default function TermsAndConditions({ onBackToCatalog, onContactClick }: TermsAndConditionsProps) {
  const terms = [
    {
      icon: <FileText className="w-5 h-5 text-amber-400" />,
      title: "General Use",
      content: "Users must use this website lawfully and responsibly. Any attempt to exploit, scratch, or inject payloads is strictly prohibited."
    },
    {
      icon: <RefreshCw className="w-5 h-5 text-amber-400" />,
      title: "Products & Services",
      content: "We reserve the right to modify or discontinue products or services without notice. All descriptions are periodically verified."
    },
    {
      icon: <PoundSterling className="w-5 h-5 text-amber-400" />,
      title: "Pricing",
      content: "Prices may change at any time without prior notice. All prices are stated in British Pound Sterling (£ GBP)."
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-amber-400" />,
      title: "Payments",
      content: "Payments are securely processed through trusted third-party payment providers. We do not store financial assets locally."
    },
    {
      icon: <Ban className="w-5 h-5 text-amber-400" />,
      title: "Prohibited Activities",
      content: "Users may not: Attempt fraud, abuse payment systems, use stolen payment methods, or interfere with website operations."
    },
    {
      icon: <Copyright className="w-5 h-5 text-amber-400" />,
      title: "Intellectual Property",
      content: "All website content including text, logos, graphics, brand representations, and designs belongs to MZ Amazon Seller Store."
    },
    {
      icon: <AlertCircle className="w-5 h-5 text-amber-400" />,
      title: "Limitation of Liability",
      content: "We are not responsible for indirect damages, delays, customs holdups, or losses caused by third-party services."
    },
    {
      icon: <Ban className="w-5 h-5 text-amber-400" />,
      title: "Account Suspension",
      content: "We reserve the right to suspend accounts, blacklist IPs, or block claims showing suspicious or fraudulent activity."
    },
    {
      icon: <RefreshCw className="w-5 h-5 text-amber-400" />,
      title: "Changes To Terms",
      content: "We may update these terms at any time. Your continued use signifies full agreement."
    }
  ];

  return (
    <div className="bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-8 min-h-screen relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-20 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-600/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        
        {/* Page Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/15 border border-amber-500/30 rounded-full text-[10px] font-mono font-bold uppercase text-amber-400">
            <Scale className="w-3.5 h-3.5" /> Legal Agreement Framework
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-sans tracking-tight bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 bg-clip-text text-transparent">
            Terms and Conditions
          </h2>
          <p className="text-slate-400 text-xs font-light max-w-xl mx-auto leading-relaxed">
            Please read these terms and conditions carefully. By using this website, you agree to the following terms and conditions in full.
          </p>
        </div>

        {/* List of Terms and Conditions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {terms.map((term, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-slate-900 border border-slate-850 p-6 rounded-2xl flex gap-4 items-start hover:border-amber-500/30 transition-all duration-300 group"
            >
              <div className="p-2.5 bg-slate-950 rounded-xl text-amber-400 shrink-0 border border-slate-800 transition-colors group-hover:bg-amber-500/10">
                {term.icon}
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm group-hover:text-amber-400 transition-colors">{term.title}</h4>
                <p className="text-slate-400 text-xs leading-relaxed font-normal">{term.content}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer actions */}
        <div className="bg-slate-900 border border-amber-500/20 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-white font-extrabold text-sm uppercase tracking-wider font-mono">Acceptance and Agreement</h4>
            <p className="text-slate-400 text-xs">If you have questions regarding our legal framework, connect with operations.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0 animate-fade-in">
            <button
              onClick={onContactClick}
              className="w-full sm:w-auto px-5 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-black text-xs sm:text-sm rounded-xl cursor-pointer"
            >
              Raise Legal Inquiry
            </button>
            <button
              onClick={onBackToCatalog}
              className="w-full sm:w-auto px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-semibold rounded-xl cursor-pointer"
            >
              Return to Store
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
