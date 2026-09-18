import React, { useState } from 'react';
import { ArrowLeft, Copy, Check, Upload, X, Image as ImageIcon, Building2, ShieldCheck, CheckCircle2, AlertCircle, FileText } from 'lucide-react';
import { CartItem, CheckoutDetails } from '../types';

interface CheckoutProps {
  cartItems: CartItem[];
  onBackToCart: () => void;
  onOrderSuccess: (details: CheckoutDetails) => void;
}

export default function Checkout({ cartItems, onBackToCart, onOrderSuccess }: CheckoutProps) {
  const [formData, setFormData] = useState<CheckoutDetails>({
    fullName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United Kingdom',
    paymentMethod: 'bank_transfer',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [showBankModal, setShowBankModal] = useState(false);
  
  // Bank modal state
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [screenshotName, setScreenshotName] = useState<string>('');
  const [modalError, setModalError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const tax = subtotal * 0;
  const total = subtotal + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleOpenBankModal = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage('');

    // Form Validations for shipping address
    if (!formData.fullName || !formData.email || !formData.phone || !formData.addressLine1 || !formData.city || !formData.state || !formData.postalCode) {
      setErrorMessage('Please complete all standard shipping address fields to proceed.');
      return;
    }

    setShowBankModal(true);
  };

  const handleCopyText = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setModalError('Please upload an image file (PNG, JPG, JPEG, WEBP).');
        return;
      }
      setModalError('');
      setScreenshotName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshot(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCompleteOrder = () => {
    setModalError('');
    if (!screenshot) {
      setModalError('Please upload your payment transfer screenshot (SS) to verify order payment.');
      return;
    }

    setIsSubmitting(true);

    const randomOrderId = `MZ-${Math.floor(1000000 + Math.random() * 9000000)}`;
    const randomTrackingNumber = `MZ-US${Math.floor(10000000 + Math.random() * 90000000)}UK`;
    const orderDate = new Date().toISOString();

    setTimeout(() => {
      setIsSubmitting(false);
      setShowBankModal(false);
      onOrderSuccess({
        ...formData,
        orderId: randomOrderId,
        trackingNumber: randomTrackingNumber,
        orderDate,
        items: [...cartItems],
        totalAmount: total,
        paymentScreenshot: screenshot,
      });
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      <button
        onClick={onBackToCart}
        className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-amber-500 transition-colors gap-2 cursor-pointer mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to shopping basket
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        {/* Left Column: Shipping Address Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200/80 p-6 sm:p-8 rounded-2xl shadow-xs space-y-5">
            <h3 className="text-lg font-bold font-sans text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-amber-500 rounded-full text-slate-950 text-xs font-black flex items-center justify-center">1</span>
              Prime Delivery Shipping Address
            </h3>

            {errorMessage && (
              <div className="bg-rose-50 border-l-4 border-rose-500 p-4 rounded-r-xl text-rose-800 text-xs font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="johndoe@gmail.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+44 7911 123456"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">Country</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                >
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">Street Address Line 1</label>
                <input
                  type="text"
                  name="addressLine1"
                  required
                  placeholder="10 Downing Street, Westminster"
                  value={formData.addressLine1}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">Street Address Line 2 (Optional)</label>
                <input
                  type="text"
                  name="addressLine2"
                  placeholder="Flat 4B / Suite"
                  value={formData.addressLine2}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">Town / City</label>
                <input
                  type="text"
                  name="city"
                  required
                  placeholder="London"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">County / Region</label>
                <input
                  type="text"
                  name="state"
                  required
                  placeholder="Greater London"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">Postcode</label>
                <input
                  type="text"
                  name="postalCode"
                  required
                  placeholder="E14 9SH"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-amber-50/60 border border-amber-200/80 p-5 rounded-2xl flex items-center gap-3">
            <Building2 className="w-6 h-6 text-amber-600 shrink-0" />
            <div className="text-xs text-slate-700 leading-relaxed">
              <span className="font-bold text-slate-900 block">Direct UK Bank Transfer (Faster Payments / BACS)</span>
              Clicking <span className="font-bold text-amber-700">Pay & Complete Secure Order</span> will display our UK bank details (Account: <span className="font-bold text-slate-900">Faran Ahmed</span>, Sort Code: <span className="font-bold text-slate-900">040972</span>) and upload input for transfer receipt screenshot.
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & Checkout Button */}
        <div className="bg-slate-50 border border-slate-200/80 p-6 rounded-2xl space-y-5 lg:sticky lg:top-28 shadow-xs">
          <h3 className="text-slate-900 font-bold text-base font-sans uppercase tracking-wide">
            Your Purchase Summary
          </h3>

          <div className="max-h-48 overflow-y-auto divide-y divide-slate-100 pr-1">
            {cartItems.map((item, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-10 h-10 bg-white border border-slate-200 rounded-md p-1 flex items-center justify-center shrink-0">
                    <img src={item.product.image} className="w-full h-full object-contain" referrerPolicy="no-referrer" alt={item.product.name} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-800 line-clamp-1">{item.product.name}</p>
                    <p className="text-[10px] text-slate-400">Qty: {item.quantity} {item.selectedColor ? `| ${item.selectedColor}` : ''}</p>
                  </div>
                </div>
                <span className="font-mono font-bold text-slate-900 shrink-0">
                  £{(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="w-full h-px border-t border-slate-200"></div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-slate-500">
              <span>Checkout Subtotal</span>
              <span className="font-mono text-slate-700">£{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Estimated Sales Tax (0%)</span>
              <span className="font-mono text-slate-700">£{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Prime Delivery Fee</span>
              <span className="text-emerald-600 font-bold text-[10px] uppercase">FREE SHIPPING</span>
            </div>
            <div className="w-full h-px border-t border-slate-200 my-2"></div>
            <div className="flex justify-between font-bold text-sm text-slate-800">
              <span>Grand Total</span>
              <span className="font-mono text-slate-950">£{total.toFixed(2)}</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleOpenBankModal}
              className="w-full inline-flex items-center justify-center p-3.5 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-bold text-xs rounded-xl transition-all duration-200 shadow-md gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-amber-400 group-hover:text-slate-950" />
              <span>PAY & COMPLETE SECURE ORDER • £{total.toFixed(2)}</span>
            </button>
            
            <div className="mt-4 p-3 bg-emerald-50 rounded-xl border border-emerald-100/60 flex gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <div className="text-[10px] text-emerald-700 leading-tight">
                <span className="font-bold block">MzAmazon Trusted Escrow</span>
                Bank transfer verified under standard buyer protection and instant cashbacks.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BANK DETAILS & SCREENSHOT UPLOAD MODAL */}
      {showBankModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative space-y-6 my-8">
            
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-800 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-full inline-flex items-center gap-1.5">
                    🇬🇧 Within the UK
                  </span>
                  <span className="text-[10px] font-bold text-slate-500">
                    Receive & Hold British Pound
                  </span>
                </div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">UK Bank Payment Details</h3>
                <p className="text-xs text-slate-500 mt-0.5">Transfer exactly <span className="font-bold text-slate-900 font-mono">£{total.toFixed(2)}</span> to the account below</p>
              </div>
              <button
                type="button"
                onClick={() => setShowBankModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Error Message */}
            {modalError && (
              <div className="bg-rose-50 border-l-4 border-rose-500 p-3.5 rounded-r-xl text-rose-800 text-xs font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{modalError}</span>
              </div>
            )}

            {/* Bank Details List matching the Provided Screenshot */}
            <div className="space-y-4 text-slate-800 text-sm">
              
              {/* Name of the Account */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold text-slate-400 block">Name of the Account</span>
                  <span className="font-extrabold text-slate-900 text-base">Faran Ahmed</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyText('Faran Ahmed', 'accountHolder')}
                  className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Copy account holder name"
                >
                  {copiedField === 'accountHolder' ? (
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                      <Check className="w-4 h-4" /> Copied
                    </span>
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Sort Code */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold text-slate-400 block">Sort Code</span>
                  <span className="font-mono font-bold text-slate-900 text-base tracking-wider">04-09-72</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyText('04-09-72', 'sortCode')}
                  className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Copy sort code"
                >
                  {copiedField === 'sortCode' ? (
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                      <Check className="w-4 h-4" /> Copied
                    </span>
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Account Number */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold text-slate-400 block">Account Number</span>
                  <span className="font-mono font-bold text-slate-900 text-base tracking-wide">01022110</span>
                  <span className="text-[11px] font-bold text-emerald-600 block mt-0.5">Faster Payments & BACS supported</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyText('01022110', 'accountNumber')}
                  className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Copy account number"
                >
                  {copiedField === 'accountNumber' ? (
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                      <Check className="w-4 h-4" /> Copied
                    </span>
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Bank Name */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold text-slate-400 block">Bank Name</span>
                  <span className="font-bold text-slate-900 text-sm">Clear Bank</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyText('Clear Bank', 'bankName')}
                  className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Copy bank name"
                >
                  {copiedField === 'bankName' ? (
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                      <Check className="w-4 h-4" /> Copied
                    </span>
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Bank Address */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold text-slate-400 block">Bank Address</span>
                  <span className="font-semibold text-slate-900 text-xs leading-relaxed block max-w-xs">
                    133 Houndsditch, London EC3A 7BX, United Kingdom
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyText('133 Houndsditch, London EC3A 7BX, United Kingdom', 'bankAddress')}
                  className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Copy bank address"
                >
                  {copiedField === 'bankAddress' ? (
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                      <Check className="w-4 h-4" /> Copied
                    </span>
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

            </div>

            {/* SCREENSHOT UPLOAD SECTION */}
            <div className="bg-slate-50 border border-slate-200/80 p-5 rounded-2xl space-y-3">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
                <span>Upload Payment Screenshot (SS)</span>
                <span className="text-rose-600 text-[10px] font-black">* Required</span>
              </label>

              {!screenshot ? (
                <label className="border-2 border-dashed border-slate-300 hover:border-amber-500 bg-white p-6 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors group text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Click to upload transfer screenshot</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Supports PNG, JPG, JPEG, WEBP</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="bg-white border border-slate-200 p-3 rounded-xl flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={screenshot} alt="Screenshot proof" className="w-12 h-12 object-cover rounded-lg border border-slate-200 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-800 truncate">{screenshotName || 'Payment_Screenshot.png'}</p>
                      <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Image attached
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setScreenshot(null);
                      setScreenshotName('');
                    }}
                    className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Remove attachment"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Complete Order Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleCompleteOrder}
                disabled={isSubmitting}
                className={`w-full py-4 px-6 ${
                  isSubmitting ? 'bg-slate-700 cursor-not-allowed' : 'bg-slate-900 hover:bg-amber-500 hover:text-slate-950 cursor-pointer'
                } text-white font-black text-sm rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    <span>Verifying Screenshot & Placing Order...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-amber-400" />
                    <span>Submit Screenshot & Complete Order</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
