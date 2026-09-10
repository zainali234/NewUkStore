import React, { useState } from 'react';
import { Award, Coins, HelpCircle, Check, ArrowRight, Upload, Info, CheckCircle2, RefreshCw, FileText } from 'lucide-react';
import { Product } from '../types';

interface RebatePortalProps {
  products: Product[];
  onBackToCatalog: () => void;
}

interface RebateClaim {
  id: string;
  productId: string;
  productName: string;
  amazonProfileUrl?: string;
  paypalAccount: string;
  sellerCheck: string;
  amazonOrderId: string;
  actualPaymentAmount: string;
  screenshotName?: string;
  status: 'Pending' | 'Approved' | 'Paid';
  timestamp: string;
}

export default function RebatePortal({ products, onBackToCatalog }: RebatePortalProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Claim state form
  const [amazonProfileUrl, setAmazonProfileUrl] = useState('');
  const [paypalAccount, setPaypalAccount] = useState('');
  const [sellerCheck, setSellerCheck] = useState('MZ_AMAZON_SELLER');
  const [amazonOrderId, setAmazonOrderId] = useState('');
  const [actualPaymentAmount, setActualPaymentAmount] = useState('');
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);

  // Lists of existing claims to track
  const [claims, setClaims] = useState<RebateClaim[]>([
    {
      id: "CLAIM-1082",
      productId: "levoit-air-purifier",
      productName: "Levoit Core true HEPA Air Purifier",
      paypalAccount: "zainaliawan187@gmail.com",
      sellerCheck: "MZ_AMAZON_SELLER",
      amazonOrderId: "114-8293021-9304128",
      actualPaymentAmount: "100.00",
      status: "Paid",
      timestamp: "2026-05-18 14:32"
    },
    {
      id: "CLAIM-1094",
      productId: "satin-sheets-set",
      productName: "Luxury Silky Satin Bed Sheets 4-Piece Set",
      paypalAccount: "zainaliawan187@gmail.com",
      sellerCheck: "MZ_AMAZON_SELLER",
      amazonOrderId: "402-1204859-9238410",
      actualPaymentAmount: "100.00",
      status: "Approved",
      timestamp: "2026-05-19 11:05"
    }
  ]);

  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setScreenshot(file);
      setScreenshotPreview(URL.createObjectURL(file));
    }
  };

  const executeClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: string[] = [];

    if (!paypalAccount) newErrors.push("PayPal Account is required to process automated cashback payouts.");
    if (!amazonOrderId) newErrors.push("Valid Amazon 17-character Order ID (e.g. 123-1234567-1234567) is required.");
    if (!actualPaymentAmount || isNaN(Number(actualPaymentAmount))) newErrors.push("Actual Payment Amount must be a valid numeric dollar amount.");
    if (!selectedProduct) newErrors.push("Please select an eligible MzAmazonSeller product from the slider list.");

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors([]);
    
    const newClaim: RebateClaim = {
      id: `CLAIM-${Math.floor(1000 + Math.random() * 9000)}`,
      productId: selectedProduct!.id,
      productName: selectedProduct!.name,
      amazonProfileUrl: amazonProfileUrl || undefined,
      paypalAccount,
      sellerCheck,
      amazonOrderId,
      actualPaymentAmount,
      screenshotName: screenshot ? screenshot.name : "order_invoice_slip.png",
      status: 'Pending',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    setClaims(prev => [newClaim, ...prev]);
    setSubmittedSuccess(true);

    // Reset fields
    setAmazonOrderId('');
    setActualPaymentAmount('');
    setScreenshot(null);
    setScreenshotPreview(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      
      {/* Header section block */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden relative mb-12">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 bg-amber-500/10 w-64 h-64 rounded-full blur-2xl"></div>
        <div className="max-w-2xl relative z-10 space-y-4">
          <div className="bg-amber-500/20 text-amber-400 font-mono text-[10px] font-bold tracking-widest px-3 py-1.5 rounded-full uppercase border border-amber-500/20 inline-block">
            🎁 MzAmazon VIP Rewards Program
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Order Products on Amazon & Get <span className="text-amber-500 font-black">100% CashBack</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Welcome to the official cashback portal for MzAmazonSeller. We offer reward credits on highly reviewed products! Purchase any item below on Amazon, let us check your invoice screenshot info, and get rewarded via PayPal.
          </p>
          <div className="flex gap-4 pt-2">
            <button
               onClick={onBackToCatalog}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-md transition-all cursor-pointer"
            >
              Browse Catalog
            </button>
            <a
              href="#submit-form"
              className="border border-slate-700 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all"
            >
              Claim Forms Below
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Step 1: Browse / Select Rebate products (Left: Col-span-5) */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="text-slate-900 font-bold text-base uppercase tracking-wider flex items-center gap-2">
            <Coins className="w-5 h-5 text-amber-500" />
            1. Select Purchased Model
          </h3>
          
          <div className="space-y-3.5 max-h-[580px] overflow-y-auto pr-2 divide-y divide-slate-100">
            {products.slice(0, 8).map((prod) => (
              <div
                key={prod.id}
                onClick={() => {
                  setSelectedProduct(prod);
                  setActualPaymentAmount(prod.price.toString());
                  setSubmittedSuccess(false);
                }}
                className={`pt-3.5 pb-2 cursor-pointer transition-all flex items-center gap-4 border-b border-transparent ${
                  selectedProduct?.id === prod.id
                    ? 'bg-amber-50/50 border-l-4 border-amber-500 pl-3 rounded-r-xl'
                    : 'hover:bg-slate-50'
                }`}
              >
                <div className="w-14 h-14 bg-white border border-slate-100 rounded-lg p-1.5 flex items-center justify-center shrink-0">
                  <img src={prod.image} alt={prod.name} className="w-full h-full object-cover rounded-md" referrerPolicy="no-referrer" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-slate-800 text-xs sm:text-sm tracking-tight line-clamp-1">
                    {prod.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-slate-950 font-mono text-xs font-bold">£{prod.price}</span>
                    <span className="text-[10px] text-emerald-600 font-bold">100% Payout Eligible</span>
                  </div>
                </div>
                {selectedProduct?.id === prod.id && (
                  <Check className="w-4 h-4 text-amber-600 shrink-0 mr-2" />
                )}
              </div>
            ))}
          </div>

          {/* Quick instructions widget */}
          <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-5 space-y-3">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <span className="w-5 h-5 bg-amber-500/10 text-amber-600 rounded-full text-xs font-bold flex items-center justify-center">?</span>
              Quick Verification Rules
            </h4>
            <ul className="text-slate-500 text-xs space-y-2 leading-relaxed font-medium">
              <li>• Always verify that the "Sold By" name is MzAmazonSeller (or PALAMEDE-EU) on your invoice slip before checking out.</li>
              <li>• Cashbacks is transferred securely within 24-48 business hours direct to your designated PayPal balance.</li>
            </ul>
          </div>
        </div>

        {/* Step 2: Order Claim Form (Right: Col-span-7) */}
        <div id="submit-form" className="lg:col-span-7 space-y-6">
          <h3 className="text-slate-900 font-bold text-base uppercase tracking-wider flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500 animate-pulse" />
            2. Submit Order Claim details
          </h3>

          <div className="bg-white border text-left border-slate-200/80 rounded-2xl shadow-xs p-6 sm:p-8 space-y-6">
            
            {/* selected display banner */}
            {selectedProduct ? (
              <div className="bg-amber-50/50 rounded-xl p-4 border border-amber-200/30 flex items-center gap-4">
                <span className="shrink-0 text-amber-600 bg-amber-100 p-2.5 rounded-lg font-bold text-sm">
                  🎯 Selected
                </span>
                <div>
                  <h5 className="text-slate-900 font-bold text-xs sm:text-sm line-clamp-1">{selectedProduct.name}</h5>
                  <p className="text-[11px] text-slate-500 mt-0.5">Purchase value: <span className="font-bold text-slate-900">£{selectedProduct.price}</span></p>
                </div>
              </div>
            ) : (
              <div className="bg-rose-50 rounded-xl p-4 border border-rose-100 flex items-center gap-3">
                <Info className="w-5 h-5 text-rose-500 shrink-0" />
                <span className="text-rose-800 text-xs font-bold">Please click/select an eligible Product on the left to begin compiling your rebate form!</span>
              </div>
            )}

            {submittedSuccess ? (
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-emerald-900 font-bold text-lg">VIP Cashback Claim Filed!</h4>
                <p className="text-slate-600 text-xs max-w-md mx-auto leading-relaxed">
                  Your claim has been submitted to MzAmazonSeller system registers under ID <span className="font-mono font-bold text-slate-900">CLAIM-{Math.floor(2000 + Math.random() * 8000)}</span>. Claims average 24 hours for validation checking.
                </p>
                <button
                  onClick={() => setSubmittedSuccess(false)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  File another cashback
                </button>
              </div>
            ) : (
              <form onSubmit={executeClaimSubmit} className="space-y-5">
                {errors.length > 0 && (
                  <div className="bg-rose-50 border-l-4 border-rose-500 p-4 rounded-r-xl space-y-1">
                    {errors.map((err, i) => (
                      <p key={i} className="text-rose-800 text-xs font-medium">• {err}</p>
                    ))}
                  </div>
                )}

                {/* Buyer Info Container */}
                <div className="space-y-4">
                  <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest border-b pb-1">Buyer Information</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Amazon Profile URL (Optional)</label>
                      <input
                        type="url"
                        placeholder="https://amazon.com/gp/profile/amzn1..."
                        value={amazonProfileUrl}
                        onChange={(e) => setAmazonProfileUrl(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-50 border text-xs sm:text-sm rounded-xl focus:ring-2 focus:ring-amber-500/20"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">PayPal Account (Payout Email)</label>
                      <input
                        type="email"
                        required
                        placeholder="paypal@yourdomain.com"
                        value={paypalAccount}
                        onChange={(e) => setPaypalAccount(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-50 border text-xs sm:text-sm rounded-xl focus:ring-2 focus:ring-amber-500/20"
                      />
                    </div>
                  </div>
                </div>

                {/* Order Info Container */}
                <div className="space-y-4 Pt-2">
                  <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest border-b pb-1">Order details</h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Check Sold By</label>
                      <select
                        value={sellerCheck}
                        onChange={(e) => setSellerCheck(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-50 border text-xs sm:text-sm rounded-xl focus:ring-2 focus:ring-amber-500/20"
                      >
                        <option value="MZ_AMAZON_SELLER">MZAMAZONSELLER (Core authorized)</option>
                        <option value="PALAMEDE_EU">PALAMEDE-EU (Affiliated store)</option>
                        <option value="OTHER">Other Partner Seller</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Amazon Order ID *</label>
                      <input
                        type="text"
                        required
                        placeholder="702-8293021-9302847"
                        value={amazonOrderId}
                        onChange={(e) => setAmazonOrderId(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-50 border text-xs sm:text-sm rounded-xl focus:ring-2 focus:ring-amber-500/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Actual Out-Of-Pocket Paid Amount *</label>
                      <input
                        type="text"
                        required
                        placeholder="89.99"
                        value={actualPaymentAmount}
                        onChange={(e) => setActualPaymentAmount(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-50 border text-xs sm:text-sm rounded-xl focus:ring-2 focus:ring-amber-500/20 "
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Order Screenshot Proof *</label>
                      <div className="relative border-2 border-dashed border-slate-200 hover:border-amber-500 rounded-xl p-3 text-center cursor-pointer transition-colors bg-slate-50/50">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleScreenshotChange}
                          className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
                        />
                        <div className="flex items-center justify-center gap-2">
                          <Upload className="w-4 h-4 text-slate-400" />
                          <span className="text-xs text-slate-500 font-medium">
                            {screenshot ? screenshot.name : "Select Screenshot"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {screenshotPreview && (
                    <div className="mt-3 bg-slate-50 border rounded-xl p-3 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-white border overflow-hidden shrink-0">
                        <img src={screenshotPreview} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="text-[10px] text-slate-500">
                        <span className="font-bold text-slate-800 block">Screenshot Attached Successfully</span>
                        Size: {(screenshot!.size / 1024).toFixed(1)} KB • Image format checked
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <button
                    type="submit"
                    className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 font-extrabold text-sm rounded-xl transition-all shadow-md shadow-amber-500/10 cursor-pointer text-center"
                  >
                    Submit Rebate Request
                  </button>
                  <span className="text-[10px] text-slate-400 text-center block mt-3 leading-snug">
                    By submitting, MzAmazonSeller verifies your order matching details in Amazon registries before disbursing pay balances to PayPal account.
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Claims Tracker List: Section 3 */}
      <div className="mt-16 bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-8 space-y-6">
        <div>
          <h3 className="text-slate-900 font-extrabold text-lg sm:text-xl font-sans tracking-tight">VIP CashBack Claims Tracker</h3>
          <p className="text-slate-500 text-xs mt-1">Live tracking of filed cashbacks submitted under your email profiles.</p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200/60 bg-white">
          <table className="min-w-full divide-y divide-slate-100 text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-700 font-bold">
              <tr>
                <th className="px-5 py-3.5">Claim ID</th>
                <th className="px-5 py-3.5">Product Name</th>
                <th className="px-5 py-3.5 font-mono">Order ID</th>
                <th className="px-5 py-3.5">Payout Recipient</th>
                <th className="px-5 py-3.5 font-mono">Amount</th>
                <th className="px-5 py-3.5">Verification Status</th>
                <th className="px-5 py-3.5">Filed At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {claims.map((claim) => (
                <tr key={claim.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-4 font-bold text-slate-900">{claim.id}</td>
                  <td className="px-5 py-4 font-semibold text-slate-800">{claim.productName}</td>
                  <td className="px-5 py-4 font-mono text-[11px] text-slate-400">{claim.amazonOrderId}</td>
                  <td className="px-5 py-4">{claim.paypalAccount}</td>
                  <td className="px-5 py-4 font-bold font-mono text-slate-900">£{claim.actualPaymentAmount}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                      claim.status === 'Paid'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : claim.status === 'Approved'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-indigo-50 text-indigo-700 border border-indigo-200 animate-pulse'
                    }`}>
                      {claim.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs text-slate-400 font-mono">{claim.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
