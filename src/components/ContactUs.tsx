import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Phone, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Trophy, 
  ArrowLeft,
  AlertTriangle,
  Sparkles,
  HelpCircle,
  MapPin
} from 'lucide-react';

interface ContactUsProps {
  onBackToCatalog: () => void;
}

export default function ContactUs({ onBackToCatalog }: ContactUsProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amazonOrderId: '',
    subject: 'general',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate API request processing
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(`MZA-TICKET-${Math.floor(100000 + Math.random() * 900000)}`);
      setFormData({
        name: '',
        email: '',
        amazonOrderId: '',
        subject: 'general',
        message: ''
      });
    }, 1500);
  };

  return (
    <div className="bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-8 min-h-screen relative overflow-hidden">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-600/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        
        {/* Header Block */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/15 border border-amber-500/30 rounded-full text-[11px] font-mono font-bold uppercase text-amber-400">
            <MessageSquare className="w-3.5 h-3.5" /> Support Hotlines
          </div>
          <h2 className="text-4xl sm:text-5xl font-black font-sans tracking-tight bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 bg-clip-text text-transparent">
            Contact Us
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">
            We are available to help our customers with any questions regarding orders, payments, or products.
          </p>
        </div>

        {/* Channels Grid & Contact Form Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Channel Info Columns */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Main Black & Gold Info Panel */}
            <div className="bg-slate-900 border border-amber-500/20 rounded-3xl p-8 space-y-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-bl-3xl pointer-events-none"></div>
              
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <h3 className="text-lg font-bold text-white tracking-tight">Customer Support</h3>
                <p className="text-amber-500/80 text-xs font-mono font-bold">MZ Amazon Seller Store Helpdesk</p>
              </div>

              <div className="space-y-6">
                
                {/* Support Email */}
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-slate-800 border border-slate-700/50 rounded-xl text-amber-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">Support Email</h4>
                    <a href="mailto:serhatrodi4@gmail.com" className="text-sm font-bold text-white hover:text-amber-400 transition-colors mt-1 block select-all">
                      serhatrodi4@gmail.com
                    </a>
                    <p className="text-slate-400 text-[11px] mt-0.5">Checked continuously, including weekends.</p>
                  </div>
                </div>

                {/* Direct Phone Line */}
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-slate-800 border border-slate-700/50 rounded-xl text-amber-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">Phone Line</h4>
                    <a href="tel:+447426783731" className="text-sm font-bold text-white hover:text-amber-400 transition-colors mt-1 block select-all font-mono">
                      +447426783731
                    </a>
                    <p className="text-slate-400 text-[11px] mt-0.5">Hotline for instant dispatch assistance.</p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-slate-800 border border-slate-700/50 rounded-xl text-amber-400 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">Business Hours</h4>
                    <p className="text-sm font-bold text-white mt-1 leading-normal">
                      Monday - Saturday <br />
                      <span className="text-amber-400 font-extrabold text-xs">9:00 AM - 8:00 PM (GMT)</span>
                    </p>
                    <p className="text-slate-400 text-[11px] mt-0.5">Response times might vary on Sundays.</p>
                  </div>
                </div>

                {/* Response Guarantee */}
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-slate-800 border border-slate-700/50 rounded-xl text-amber-400 shrink-0 font-extrabold font-mono text-xs flex items-center justify-center">
                    24h
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">Response Time</h4>
                    <span className="text-xs font-black text-amber-400 uppercase bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded mt-1.5 inline-block">
                      Guaranteed within 24 hours
                    </span>
                  </div>
                </div>

              </div>

              {/* Thank you note */}
              <div className="border-t border-slate-800 pt-5 text-center text-xs text-slate-400 leading-relaxed italic">
                "Thank you for choosing MZ Amazon Seller Store."
              </div>

            </div>

            {/* Support Guideline Alert box */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 flex gap-3 text-xs text-slate-400">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <p className="leading-normal">
                For prompt cashback updates, please provide your <strong className="text-white">17-digit Amazon Order ID</strong> in your tickets so we can quickly verify seller-partner registers.
              </p>
            </div>

          </div>

          {/* Contact Interactive Form container */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="ticket-form"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl"
                >
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-white">Send assistance request</h3>
                    <p className="text-slate-400 text-xs">Complete the contact form below to instantly transmit data securely.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    
                    <div className="space-y-1.5">
                      <label htmlFor="form-fullName" className="text-xs font-bold text-slate-300 block">Full Name</label>
                      <input
                        id="form-fullName"
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-600 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-sans"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      <div className="space-y-1.5">
                        <label htmlFor="form-emailAddress" className="text-xs font-bold text-slate-300 block">Email Address</label>
                        <input
                          id="form-emailAddress"
                          type="email"
                          required
                          placeholder="recipient@domain.com"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-600 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-sans"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="form-orderId" className="text-xs font-bold text-slate-300 block">Amazon Order ID (Optional)</label>
                        <input
                          id="form-orderId"
                          type="text"
                          placeholder="114-1234567-1234567"
                          value={formData.amazonOrderId}
                          onChange={(e) => setFormData(prev => ({ ...prev, amazonOrderId: e.target.value }))}
                          className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-600 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-mono"
                        />
                      </div>

                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="form-topic" className="text-xs font-bold text-slate-300 block">Inquiry Topic</label>
                      <select
                        id="form-topic"
                        value={formData.subject}
                        onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                        className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-100 focus:outline-hidden focus:border-amber-500 transition-all"
                      >
                        <option value="general">General Support / Store Inquiry</option>
                        <option value="rebates">VIP Cashbacks & Rebates Issues</option>
                        <option value="delivery">Shipping Delays & Product Return Status</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="form-messageText" className="text-xs font-bold text-slate-300 block">Detailed Message</label>
                      <textarea
                        id="form-messageText"
                        required
                        rows={5}
                        placeholder="Please write down details here..."
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-600 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-sans"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-yellow-600 hover:opacity-90 disabled:opacity-50 text-slate-950 font-black text-xs sm:text-sm rounded-xl cursor-pointer transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 rounded-full border-2 border-slate-900 border-t-transparent animate-spin"></div>
                          Dispatching Securely...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-inherit" />
                          Send Support Ticket
                        </>
                      )}
                    </button>

                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="ticket-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-slate-900 border border-emerald-500/20 rounded-3xl p-6 sm:p-8 space-y-6 text-center shadow-2xl"
                >
                  <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white">Ticket Filed Safely</h3>
                    <p className="text-slate-400 text-xs max-w-sm mx-auto">
                      Thank you for contacting us. Our operations team is on it! We usually reply in under 24 hours.
                    </p>
                  </div>

                  <div className="bg-slate-950 border border-slate-850 rounded-2xl p-4 text-xs font-mono text-slate-400 space-y-2 text-left">
                    <div className="flex justify-between border-b border-slate-800/80 pb-2">
                      <span>TICKET REFERENCE:</span>
                      <strong className="text-amber-400 font-bold">{submitted}</strong>
                    </div>
                    <div>
                      <span>GUARANTEED WORKPLACE DIRECT REPLY:</span>
                      <p className="text-slate-200 text-[11px] font-sans italic mt-1 font-normal">
                        "Your verification copy has been forwarded. A response is being compiled for release."
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      onClick={() => setSubmitted(null)}
                      className="flex-1 py-3 bg-slate-850 hover:bg-slate-800 text-slate-300 font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer"
                    >
                      Submit Another Query
                    </button>
                    <button
                      onClick={onBackToCatalog}
                      className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer hover:opacity-95"
                    >
                      Browse Store Catalog
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
}
