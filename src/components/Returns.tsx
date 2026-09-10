import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, 
  RotateCcw, 
  CheckCircle2, 
  Truck, 
  Coins, 
  HelpCircle, 
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';
import { PRODUCTS } from '../data';

interface ReturnsProps {
  onBackToCatalog: () => void;
}

export default function Returns({ onBackToCatalog }: ReturnsProps) {
  // Return steps or simulation state
  const [returnStep, setReturnStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    orderId: '',
    email: '',
    productId: PRODUCTS[0]?.id || '',
    reason: 'no-longer-needed',
    customReason: '',
    condition: 'unopened'
  });
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState<{
    returnId: string;
    labelUrl: string;
    refundAmount: number;
    estimatedPayout: string;
  } | null>(null);

  const selectedProduct = PRODUCTS.find(p => p.id === formData.productId) || PRODUCTS[0];

  const handleReasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, reason: e.target.value }));
  };

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, productId: e.target.value }));
  };

  const handleConditionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, condition: e.target.value }));
  };

  const submitReturnRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.orderId || !formData.email) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccessData({
        returnId: `RET-${Math.floor(100000 + Math.random() * 900000)}`,
        labelUrl: "#",
        refundAmount: 100.00, // Every product in data.ts is priced $100.00
        estimatedPayout: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()
      });
      setReturnStep(2);
    }, 1500);
  };

  const resetRequest = () => {
    setReturnStep(1);
    setSuccessData(null);
    setFormData({
      orderId: '',
      email: '',
      productId: PRODUCTS[0]?.id || '',
      reason: 'no-longer-needed',
      customReason: '',
      condition: 'unopened'
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Title & Main Banner */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="bg-amber-100 text-amber-700 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto shadow-xs border border-amber-200/50">
          <RotateCcw className="w-6 h-6" />
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Easy Returns & Money-Back Portal
        </h2>
        <p className="text-slate-500 text-sm leading-relaxed">
          Not fully satisfied with your product? No worries at all. Our industry-leading <strong>30-Day Money-Back Guarantee</strong> keeps your purchases completely risk-free.
        </p>
      </div>

      {/* Hero highlight: 30-Day Guarantee Info badges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-amber-50 to-white border border-amber-200/60 p-6 rounded-2xl space-y-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-200/10 rounded-full blur-xl"></div>
          <div className="w-10 h-10 bg-amber-100/80 rounded-xl flex items-center justify-center text-amber-700">
            <Coins className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">30-Day Money-Back Guarantee</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Get a full 100% refund of your purchase price down to the last penny if initialized within 30 days of the item delivery date.
          </p>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 p-6 rounded-2xl space-y-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-250/10 rounded-full blur-xl"></div>
          <div className="w-10 h-10 bg-indigo-100/80 rounded-xl flex items-center justify-center text-indigo-700">
            <Truck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">100% Free Shipping Back</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            We supply instant pre-paid shipping labels at absolutely zero cost to you. Drop off at any nearby local post office or pick-up locker.
          </p>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 p-6 rounded-2xl space-y-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-250/10 rounded-full blur-xl"></div>
          <div className="w-10 h-10 bg-emerald-100/80 rounded-xl flex items-center justify-center text-emerald-700">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">No-Stress Inspection Policy</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Did you open it, use it, or throw away the outer cardboard carton? That's fine! We accept any condition with sincere tester diagnostics.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Return request panel (Left/Main section) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-6">
          <AnimatePresence mode="wait">
            {returnStep === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span className="bg-slate-900 text-white w-6 h-6 rounded-full inline-flex items-center justify-center font-mono text-xs">1</span>
                    Initiate Return Label
                  </h3>
                  <p className="text-slate-500 text-xs mt-1">Please enter your order coordinates below to print your pre-paid postages.</p>
                </div>

                <form onSubmit={submitReturnRequest} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="return-order-id" className="text-xs font-bold text-slate-700 tracking-tight block">Amazon 17-Digit Order ID</label>
                      <input
                        type="text"
                        id="return-order-id"
                        required
                        placeholder="114-xxxxxxx-xxxxxxx"
                        pattern="^[0-9]{3}-[0-9]{7}-[0-9]{7}$"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-mono"
                        value={formData.orderId}
                        onChange={(e) => setFormData(prev => ({ ...prev, orderId: e.target.value }))}
                      />
                      <span className="text-[10px] text-slate-400 font-medium block">Format: 3 numbers, dash, 7 numbers, dash, 7 numbers</span>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="return-email" className="text-xs font-bold text-slate-700 tracking-tight block">Your Verification Email</label>
                      <input
                        type="email"
                        id="return-email"
                        required
                        placeholder="john@example.com"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="return-product" className="text-xs font-bold text-slate-700 tracking-tight block">Select Item for Return</label>
                    <select
                      id="return-product"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-sans"
                      value={formData.productId}
                      onChange={handleProductChange}
                    >
                      {PRODUCTS.map(p => (
                        <option key={p.id} value={p.id}>{p.name} — £{p.price.toFixed(2)}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="return-reason" className="text-xs font-bold text-slate-700 tracking-tight block font-sans">Primary Return Reason</label>
                      <select
                        id="return-reason"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                        value={formData.reason}
                        onChange={handleReasonChange}
                      >
                        <option value="no-longer-needed">No Longer Needed / Wanted</option>
                        <option value="performance-unsatisfactory">Performance is Unsatisfactory</option>
                        <option value="damaged-delivery">Item arrived Damaged/Scratched</option>
                        <option value="size-incorrect">Incorrect size or variant ordered</option>
                        <option value="other">Other reason (Please detail below)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="return-condition" className="text-xs font-bold text-slate-700 tracking-tight block font-sans">Open Package Condition</label>
                      <select
                        id="return-condition"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-sans"
                        value={formData.condition}
                        onChange={handleConditionChange}
                      >
                        <option value="unopened">Brand New / Unopened (Factory sealed)</option>
                        <option value="opened-excellent">Opened but in Great Condition (Like new)</option>
                        <option value="used">Lightly Used & Fully Functional</option>
                        <option value="defective">Defective / Faulty Item diagnostics</option>
                      </select>
                    </div>
                  </div>

                  {formData.reason === 'other' && (
                    <div className="space-y-1.5">
                      <label htmlFor="return-custom-reason" className="text-xs font-bold text-slate-700 tracking-tight block">Explain custom details</label>
                      <textarea
                        id="return-custom-reason"
                        rows={3}
                        placeholder="Tell us what went wrong with the item..."
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                        value={formData.customReason}
                        onChange={(e) => setFormData(prev => ({ ...prev, customReason: e.target.value }))}
                      ></textarea>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-slate-900 border border-slate-900 hover:bg-slate-800 hover:border-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl cursor-pointer transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 rounded-full border-2 border-slate-400 border-t-white animate-spin"></div>
                        Generating Secure Prepaid Shipping Slip...
                      </>
                    ) : (
                      <>
                        <RotateCcw className="w-4 h-4 text-inherit" />
                        Initiate Free 100% Refund Return
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-6"
              >
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-slate-900 text-sm">Return Label & Authorization Authorized!</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Your return request file has been processed successfully under the 30-day money-back guidelines.
                    </p>
                  </div>
                </div>

                {successData && (
                  <div className="bg-slate-50 border rounded-2xl p-6 space-y-5">
                    <div className="flex justify-between items-center border-b pb-3">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">RETURN RMA NUMBER</span>
                        <strong className="text-slate-800 text-sm font-mono">{successData.returnId}</strong>
                      </div>
                      <span className="px-2.5 py-1 bg-amber-100 text-amber-800 text-[10px] font-bold font-mono rounded-md uppercase border border-amber-200/50">
                        Prepaid Approved
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Refunded Amount</span>
                        <strong className="text-emerald-600 text-base font-extrabold font-sans">£{successData.refundAmount.toFixed(2)}</strong>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Refund Release Target</span>
                        <strong className="text-slate-800 text-sm">{formData.email}</strong>
                      </div>
                    </div>

                    <div className="border-t pt-4 space-y-2">
                      <h5 className="font-bold text-xs text-slate-800 uppercase tracking-wider font-mono">Dynamic Instructions:</h5>
                      <ul className="space-y-2.5 text-xs text-slate-600">
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 font-extrabold font-sans">✓</span>
                          <span><strong>Download Prepaid Label:</strong> Save the PDF shipping slip below representing the nearest courier drop box.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 font-extrabold font-sans">✓</span>
                          <span><strong>Package Details:</strong> Pack the product (opened or not) into any bubble mailer or brown box. Place RMA slip inside.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 font-extrabold font-sans">✓</span>
                          <span><strong>Immediate Verification:</strong> Once the courier scanner logs the packet at the collection desk, your full <strong>£{successData.refundAmount.toFixed(2)}</strong> refund is credited and dispatched directly to your payment address.</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-slate-800 text-slate-200 rounded-xl p-4 text-xs flex gap-3.5 items-center">
                      <img 
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=200&auto=format" 
                        alt="Prepaid shipping preview" 
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 object-cover rounded-lg shrink-0 border border-slate-700 shadow-xs"
                      />
                      <div className="min-w-0 flex-1 space-y-1">
                        <h6 className="font-bold text-white text-[11px] truncate">MZ-AMAZON_PREPAID_RETURN.pdf</h6>
                        <p className="text-[10px] text-slate-400">Standard 48hr fully insured tracked shipment. Carrier rates fully paid.</p>
                        <a 
                          href="#" 
                          onClick={(e) => { e.preventDefault(); alert("Mock pre-paid PDF downloaded successfully! Take sample prints to your nearest postal warehouse."); }} 
                          className="text-amber-400 hover:text-amber-300 font-bold text-[11px] inline-flex items-center gap-1.5 cursor-pointer mt-1"
                        >
                          Download Label PDF <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <button
                    onClick={resetRequest}
                    className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer text-center"
                  >
                    Initiate Another Return
                  </button>
                  <button
                    onClick={onBackToCatalog}
                    className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer text-center"
                  >
                    Return to Shop Catalog
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right side: Informative rules overview / details */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card: 30-Day Money-Back Guarantee Seal */}
          <div className="bg-slate-900 text-slate-150 p-6 sm:p-8 rounded-3xl relative overflow-hidden shadow-xl space-y-6">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl"></div>
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                <RotateCcw className="w-6 h-6" />
              </div>
              <div>
                <span className="text-amber-500 font-mono text-[9px] font-bold uppercase tracking-widest block">Official Store Seal</span>
                <h4 className="font-extrabold text-white text-base">30 Days Return Warranty</h4>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              Every single direct product represented under the <strong>MzAmazonSeller VIP Club</strong> contains an active 30 Days Money Back assurance. This allows consumers to purchase and inspect homeware, cosmetics, or wellness electrical appliances in their homes completely risk-free.
            </p>

            <div className="border-t border-slate-800.5 pt-5 space-y-3.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <span className="text-amber-400 font-bold font-sans">100%</span>
                <span className="leading-snug">Refund value refers to full face value of item including checkout sale taxes.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-amber-400 font-bold font-sans">0%</span>
                <span className="leading-snug">No restocking deductions, cleaning charges, or administrative handle costs whatsoever.</span>
              </div>
            </div>

            {/* Product image preview selection */}
            {selectedProduct && (
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-800 flex gap-4 items-center">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 object-cover rounded-lg shrink-0" 
                />
                <div className="min-w-0 flex-1">
                  <span className="text-[9px] font-mono uppercase text-slate-400 block tracking-widest">Active Selector Preview</span>
                  <div className="text-white text-xs font-bold truncate">{selectedProduct.name}</div>
                  <div className="text-emerald-400 text-xs font-mono font-bold mt-0.5">£{selectedProduct.price.toFixed(2)} Money-Back value</div>
                </div>
              </div>
            )}
          </div>

          {/* Quick FAQ info specifically for returns */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-4">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider font-mono flex items-center gap-1.5 border-b pb-2">
              <HelpCircle className="w-4 h-4 text-emerald-500" />
              Returns FAQ
            </h4>
            
            <div className="space-y-3.5 text-xs text-slate-600">
              <div className="space-y-1">
                <h5 className="font-bold text-slate-900 leading-normal">What if I don't have the original box?</h5>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  No problem! Simply place the returning product secure inside any generic packaging container or envelope and tape down the prepaid label firmly.
                </p>
              </div>

              <div className="space-y-1">
                <h5 className="font-bold text-slate-900 leading-normal">How long does my money take to return?</h5>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  As soon as the shipping carrier scans your package barcode at their counter drop, standard networks notify our support. Refunds process into your PayPal account in 24-48 business hours.
                </p>
              </div>

              <div className="space-y-1">
                <h5 className="font-bold text-slate-900 leading-normal">What about VIP cashbacks I claimed?</h5>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  If the item was purchased as part of verified feedback tester tasks, please contact support prior to return. Returning items post-cashback is strictly tracked.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
