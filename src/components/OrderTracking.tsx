import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Truck, 
  Plane, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Search, 
  Copy, 
  Check, 
  Package, 
  ArrowRight, 
  ExternalLink,
  Info,
  Building2,
  Boxes,
  HelpCircle,
  Share2,
  RefreshCw
} from 'lucide-react';
import { CheckoutDetails, TrackingMilestone } from '../types';
import { PRODUCTS } from '../data';

interface OrderTrackingProps {
  initialTrackingId?: string;
  latestOrder?: CheckoutDetails | null;
  onBackToCatalog: () => void;
  onContactClick: () => void;
}

export default function OrderTracking({
  initialTrackingId = '',
  latestOrder = null,
  onBackToCatalog,
  onContactClick
}: OrderTrackingProps) {
  // Compute default search value
  const defaultCode = initialTrackingId || latestOrder?.trackingNumber || latestOrder?.orderId || 'MZ-US8492014UK';
  const [searchInput, setSearchInput] = useState<string>(defaultCode);
  const [activeTrackingNumber, setActiveTrackingNumber] = useState<string>(defaultCode);
  const [copied, setCopied] = useState(false);
  const [filterDay, setFilterDay] = useState<number | null>(null);

  // Determine order date
  const orderDateObj = useMemo(() => {
    if (latestOrder?.orderDate) {
      const d = new Date(latestOrder.orderDate);
      if (!isNaN(d.getTime())) return d;
    }
    // Default to 2 days ago for a lively tracking demo
    const d = new Date();
    d.setDate(d.getDate() - 2);
    return d;
  }, [latestOrder]);

  // Delivery date is strictly 10 days after order date
  const deliveryDateObj = useMemo(() => {
    const d = new Date(orderDateObj);
    d.setDate(d.getDate() + 10);
    return d;
  }, [orderDateObj]);

  // Format date helper
  const formatDayDate = (dayOffset: number) => {
    const d = new Date(orderDateObj);
    d.setDate(d.getDate() + (dayOffset - 1));
    return d.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Determine active day in transit (fresh order = Day 2 or 3, allows user simulation)
  const [simulatedDay, setSimulatedDay] = useState<number>(3);

  // Recipient details (derived from latestOrder or default UK buyer)
  const recipientName = latestOrder?.fullName || 'Oliver Kensington';
  const destinationAddress = latestOrder ? (
    `${latestOrder.addressLine1}${latestOrder.addressLine2 ? `, ${latestOrder.addressLine2}` : ''}, ${latestOrder.city}, ${latestOrder.state} ${latestOrder.postalCode}, United Kingdom`
  ) : 'Flat 4B, 22 Kensington High Street, London W8 4PT, United Kingdom';
  const recipientCity = latestOrder?.city || 'London';
  const recipientPostcode = latestOrder?.postalCode || 'W8 4PT';

  // Order Items
  const orderItems = latestOrder?.items && latestOrder.items.length > 0 
    ? latestOrder.items 
    : [
        {
          product: PRODUCTS[0],
          quantity: 1,
          selectedColor: PRODUCTS[0].colors ? PRODUCTS[0].colors[0] : undefined
        }
      ];

  // 10-Day Milestones Journey Definition (USA to UK)
  const milestones: TrackingMilestone[] = useMemo(() => [
    {
      day: 1,
      title: 'Order Confirmed & Picked at US Fulfillment Facility',
      location: 'MzAmazon Logistics Hub, Newark, NJ, USA',
      region: 'USA',
      status: simulatedDay >= 1 ? 'completed' : 'upcoming',
      time: '08:30 AM EST',
      description: 'Your order was verified, packaged with international air export cushioning, barcoded, and scheduled for transatlantic transit.',
      details: [
        'Electronic shipping data received by US Global Logistics',
        'Export manifest reference MZ-EXP-9041 registered',
        'Custom protective carton boxing sealed with security tape'
      ]
    },
    {
      day: 2,
      title: 'Inbound Scan at US International Gateway Logistics Center',
      location: 'JFK Air Cargo Terminal 8, New York, USA',
      region: 'USA',
      status: simulatedDay > 2 ? 'completed' : simulatedDay === 2 ? 'in-progress' : 'upcoming',
      time: '02:15 PM EST',
      description: 'Package arrived at John F. Kennedy International Air Cargo Gateway. Consolidated into Unit Load Device (ULD) container.',
      details: [
        'Transatlantic consolidation pallet #PAL-7729 built',
        'Weight and volume check: 1.45 kg verified',
        'Security X-Ray and explosive trace detection cleared'
      ]
    },
    {
      day: 3,
      title: 'US Customs & Border Protection (CBP) Export Clearance',
      location: 'US Customs Export Station, JFK Airport, NY, USA',
      region: 'USA',
      status: simulatedDay > 3 ? 'completed' : simulatedDay === 3 ? 'in-progress' : 'upcoming',
      time: '11:45 AM EST',
      description: 'Automated Export System (AES) approved package for international departure. Handed over to air freight ground crew.',
      details: [
        'Electronic export declaration #US-CBP-8812 approved',
        'Assigned to Transatlantic Cargo Flight #MZ-BA178',
        'Moved to tarmac staging ramp ready for aircraft loading'
      ]
    },
    {
      day: 4,
      title: 'Departed JFK Airport on Transatlantic Freight Aircraft',
      location: 'En Route to London Heathrow (LHR), Air Corridor',
      region: 'TRANSATLANTIC',
      status: simulatedDay > 4 ? 'completed' : simulatedDay === 4 ? 'in-progress' : 'upcoming',
      time: '06:20 PM EST',
      description: 'Boeing 777F cargo aircraft departed New York JFK en route to London Heathrow (LHR), United Kingdom.',
      details: [
        'Flight #MZ-BA178 wheels up from JFK Runway 31L',
        'Cruising altitude 36,000 ft across North Atlantic track',
        'Scheduled direct flight duration: approx. 6 hours 45 mins'
      ]
    },
    {
      day: 5,
      title: 'Transatlantic Air Freight in Transit (Ocean Crossing)',
      location: 'North Atlantic Oceanic Flight Airspace',
      region: 'TRANSATLANTIC',
      status: simulatedDay > 5 ? 'completed' : simulatedDay === 5 ? 'in-progress' : 'upcoming',
      time: '04:10 AM UTC',
      description: 'Aircraft navigating international waypoint coordinates. In-flight telemetry transmitting arrival telemetry to UK Air Traffic Control.',
      details: [
        'Oceanic clearance waypoint 52°N 30°W crossed',
        'UK Border Force advance cargo EDI manifest pre-transmitted',
        'Cold-chain and ambient parcel temperatures nominal'
      ]
    },
    {
      day: 6,
      title: 'Touchdown & Arrival at London Heathrow Airport (LHR)',
      location: 'Heathrow Cargo Hub, Terminal 4, London, UK',
      region: 'UK',
      status: simulatedDay > 6 ? 'completed' : simulatedDay === 6 ? 'in-progress' : 'upcoming',
      time: '08:50 AM BST',
      description: 'Aircraft landed safely at London Heathrow. Air cargo container offloaded and transported to UK customs inspection bonded facility.',
      details: [
        'Flight #MZ-BA178 landed on LHR Runway 27R',
        'Container de-consolidated and parcel sorted for UK customs',
        'UK inbound customs holding entry generated'
      ]
    },
    {
      day: 7,
      title: 'UK Border Force & HM Revenue & Customs (HMRC) Clearance',
      location: 'UK Border Agency Customs Facility, London Heathrow, UK',
      region: 'UK',
      status: simulatedDay > 7 ? 'completed' : simulatedDay === 7 ? 'in-progress' : 'upcoming',
      time: '01:30 PM BST',
      description: 'Package completed UK import clearance. All VAT, tariffs, and customs duties settled by MzAmazonSeller with zero balance owed by buyer.',
      details: [
        'HMRC Entry Acceptance #GB-HMRC-77192 cleared',
        '100% Pre-paid import duty stamp verified',
        'Released into UK Domestic Carrier transfer bay'
      ]
    },
    {
      day: 8,
      title: 'Handover to UK Domestic Carrier (National Logistics Hub)',
      location: 'Royal Mail / Parcelforce National Sorting Hub, Daventry, UK',
      region: 'UK',
      status: simulatedDay > 8 ? 'completed' : simulatedDay === 8 ? 'in-progress' : 'upcoming',
      time: '09:15 AM BST',
      description: 'Inbound barcode scanned into Royal Mail Tracked 24 network. Package routed to regional highway transport van for destination depot.',
      details: [
        'Royal Mail domestic barcode assigned & linked',
        'Dispatched on regional trunk transport towards recipient postal county',
        'High-speed optical sorting completed'
      ]
    },
    {
      day: 9,
      title: 'Arrived at Local UK Delivery Office / Depot',
      location: `Local Delivery Center (Serving ${recipientCity} / ${recipientPostcode}), UK`,
      region: 'UK',
      status: simulatedDay > 9 ? 'completed' : simulatedDay === 9 ? 'in-progress' : 'upcoming',
      time: '05:45 AM BST',
      description: `Package arrived at the local UK delivery office closest to your address. Sorted into the designated courier delivery route.`,
      details: [
        'Received at local postal delivery unit',
        'Allocated to driver delivery round manifest',
        'Pre-delivery address verification confirmed'
      ]
    },
    {
      day: 10,
      title: 'Out for Delivery & Final Handover to UK Address',
      location: destinationAddress,
      region: 'UK',
      status: simulatedDay >= 10 ? 'completed' : 'upcoming',
      time: '01:15 PM BST',
      description: 'Your parcel is loaded on the delivery van for delivery to your UK given address. Delivered with contactless proof of delivery.',
      details: [
        'Courier out on final delivery round with GPS tracking',
        'Contactless delivery or direct signature handoff',
        'Delivery photo receipt confirmation uploaded'
      ]
    }
  ], [simulatedDay, recipientCity, recipientPostcode, destinationAddress]);

  // Handle Search Submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    setActiveTrackingNumber(searchInput.trim().toUpperCase());
  };

  // Copy tracking number to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(activeTrackingNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Current active milestone
  const currentMilestone = milestones.find(m => m.day === simulatedDay) || milestones[simulatedDay - 1] || milestones[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans space-y-8">
      
      {/* Top Banner / Breadcrumb Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-600 uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            USA ✈️ UK 10-Day International Transit Route
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Transatlantic Parcel Tracking
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track your parcel from our US export fulfillment facility to your United Kingdom doorstep over the 10-day guaranteed transit timeline.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onBackToCatalog}
            className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-all shadow-xs"
          >
            ← Store Catalog
          </button>
          <button
            onClick={onContactClick}
            className="px-4 py-2.5 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
          >
            Help & Support
          </button>
        </div>
      </div>

      {/* Lookup Bar Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-6 shadow-sm">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Enter your Tracking Number (e.g. MZ-US8492014UK) or Order ID..."
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all uppercase"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-amber-500/10 flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <Search className="w-4 h-4" />
            Track Parcel
          </button>
        </form>

        {/* Quick presets & recent order badge */}
        <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-slate-500 pt-3 border-t border-slate-100">
          <span className="font-semibold text-slate-600">Quick Track:</span>
          {latestOrder?.trackingNumber && (
            <button
              type="button"
              onClick={() => {
                setSearchInput(latestOrder.trackingNumber!);
                setActiveTrackingNumber(latestOrder.trackingNumber!);
              }}
              className="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-lg text-[11px] font-mono font-bold hover:bg-amber-100 transition-colors"
            >
              My Recent Order ({latestOrder.trackingNumber})
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              setSearchInput('MZ-US8492014UK');
              setActiveTrackingNumber('MZ-US8492014UK');
            }}
            className="px-2.5 py-1 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg text-[11px] font-mono transition-colors"
          >
            Sample A: MZ-US8492014UK (Day 3)
          </button>
          <button
            type="button"
            onClick={() => {
              setSearchInput('MZ-US4910283UK');
              setActiveTrackingNumber('MZ-US4910283UK');
              setSimulatedDay(8);
            }}
            className="px-2.5 py-1 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg text-[11px] font-mono transition-colors"
          >
            Sample B: MZ-US4910283UK (Day 8 - UK Hub)
          </button>
        </div>
      </div>

      {/* Main Tracking Overview Dashboard */}
      <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden border border-slate-800">
        
        {/* Subtle background world map glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* Top bar: Tracking code & Live status */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">
                Official Tracking ID
              </span>
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                ACTIVE LOGISTICS ROUTE
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-xl sm:text-2xl lg:text-3xl font-black font-mono tracking-wider text-amber-400">
                {activeTrackingNumber}
              </span>
              <button
                onClick={handleCopy}
                title="Copy tracking number"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Guaranteed 10-day badge */}
          <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                Guaranteed Transit Timeline
              </span>
              <span className="text-xs sm:text-sm font-bold text-white block">
                10 Days (USA Origin ➔ UK Doorstep)
              </span>
            </div>
          </div>
        </div>

        {/* Route Visualizer: USA to UK Flight Path */}
        <div className="relative z-10 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            
            {/* Origin Card (USA) */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 space-y-2 relative">
              <div className="flex items-center justify-between">
                <span className="text-2xl">🇺🇸</span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                  ORIGIN DISPATCHED
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-white">United States (US Hub)</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                JFK Air Cargo Gateway / Newark Fulfillment Center, USA. Handled by US Global Logistics.
              </p>
              <div className="pt-2 text-[11px] font-mono text-slate-500">
                Dispatched: {formatDayDate(1)}
              </div>
            </div>

            {/* Middle: Flight & Transit Status */}
            <div className="text-center space-y-3 px-2">
              <div className="relative flex items-center justify-center">
                <div className="w-full h-0.5 bg-slate-800 absolute"></div>
                <div 
                  className="h-0.5 bg-gradient-to-r from-amber-500 to-emerald-500 absolute left-0 transition-all duration-500"
                  style={{ width: `${Math.min(100, (simulatedDay / 10) * 100)}%` }}
                ></div>
                <div className="relative z-10 w-10 h-10 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/20 font-bold mx-auto animate-pulse">
                  <Plane className="w-5 h-5 rotate-45" />
                </div>
              </div>

              <div>
                <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
                  Transatlantic Flight Route #MZ-772
                </div>
                <div className="text-slate-300 text-xs mt-0.5 font-medium">
                  {simulatedDay < 4 ? 'Prepared for US Air Departure' : 
                   simulatedDay <= 6 ? 'Transatlantic Air Freight Crossing' : 
                   simulatedDay <= 8 ? 'Arrived at UK Customs & Sorting' : 
                   simulatedDay === 9 ? 'At Local UK Delivery Depot' : 'Delivered to UK Address'}
                </div>
              </div>

              <div className="inline-block bg-slate-900 border border-amber-500/20 px-3 py-1 rounded-full text-[11px] font-mono text-amber-300 font-bold">
                Day {simulatedDay} of 10 Transit Cycle ({Math.round((simulatedDay / 10) * 100)}% Complete)
              </div>
            </div>

            {/* Destination Card (UK) */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 space-y-2 relative">
              <div className="flex items-center justify-between">
                <span className="text-2xl">🇬🇧</span>
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                  simulatedDay >= 10 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                }`}>
                  {simulatedDay >= 10 ? 'DELIVERED' : 'ESTIMATED ARRIVAL'}
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-white">United Kingdom (Doorstep)</h4>
              <p className="text-xs text-slate-400 leading-relaxed truncate" title={destinationAddress}>
                {destinationAddress}
              </p>
              <div className="pt-2 text-[11px] font-mono text-amber-400 font-bold">
                Expected UK Delivery: {formatDayDate(10)}
              </div>
            </div>

          </div>
        </div>

        {/* 10-Day Step Indicator Slider Bar */}
        <div className="relative z-10 pt-6 border-t border-slate-800/80">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-mono font-bold uppercase tracking-wider text-slate-300">
              Interactive 10-Day Transit Timeline:
            </span>
            <span className="font-mono text-[11px] text-amber-400">
              Click any day to simulate & view parcel milestone
            </span>
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 sm:gap-2">
            {milestones.map((m) => {
              const isCompleted = simulatedDay > m.day;
              const isCurrent = simulatedDay === m.day;
              return (
                <button
                  key={m.day}
                  type="button"
                  onClick={() => setSimulatedDay(m.day)}
                  className={`p-2 rounded-xl text-center border transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                    isCurrent
                      ? 'bg-amber-500 text-slate-950 border-amber-400 font-black shadow-lg shadow-amber-500/20 scale-105 z-10'
                      : isCompleted
                      ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400 hover:bg-emerald-900/50'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-850 hover:text-white'
                  }`}
                >
                  <span className="text-[10px] font-mono font-bold">DAY</span>
                  <span className="text-sm sm:text-base font-extrabold">{m.day}</span>
                  <span className="text-[9px] font-mono uppercase tracking-tighter truncate max-w-full">
                    {m.region}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Two Column Section: Live Milestone Details & Order Specifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left 2 Cols: Step-by-Step 10-Day Milestones Timeline */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-amber-500" />
                  Full 10-Day International Journey Log
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Chronological checkpoints detailing every stage from US warehouse export to UK doorstep handoff.
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="text-slate-600 font-medium">Completed</span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 ml-2"></span>
                <span className="text-slate-600 font-medium">Active (Day {simulatedDay})</span>
              </div>
            </div>

            {/* Vertical Milestones Timeline */}
            <div className="space-y-6 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-slate-100">
              {milestones.map((m) => {
                const isCompleted = simulatedDay > m.day;
                const isCurrent = simulatedDay === m.day;
                const isUpcoming = simulatedDay < m.day;

                return (
                  <div 
                    key={m.day}
                    className={`relative flex items-start gap-4 transition-all duration-200 ${
                      isCurrent ? 'scale-[1.01]' : ''
                    }`}
                  >
                    {/* Circle Node indicator */}
                    <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${
                      isCurrent
                        ? 'bg-amber-500 border-amber-300 text-slate-950 font-black shadow-md shadow-amber-500/20'
                        : isCompleted
                        ? 'bg-emerald-500 border-emerald-300 text-white font-bold'
                        : 'bg-white border-slate-200 text-slate-400 font-medium'
                    }`}>
                      {isCompleted ? (
                        <Check className="w-4 h-4 stroke-[3]" />
                      ) : (
                        <span className="text-xs font-mono">{m.day}</span>
                      )}
                    </div>

                    {/* Milestone Card Content */}
                    <div className={`flex-1 rounded-2xl p-4 sm:p-5 border transition-all ${
                      isCurrent
                        ? 'bg-amber-50/60 border-amber-300/80 shadow-xs'
                        : isCompleted
                        ? 'bg-slate-50/70 border-slate-200/80'
                        : 'bg-white border-slate-100 opacity-60'
                    }`}>
                      
                      {/* Milestone Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded-md bg-slate-900 text-white">
                            Day {m.day} • {m.region}
                          </span>
                          <span className="text-xs font-mono text-slate-500">
                            {formatDayDate(m.day)} ({m.time})
                          </span>
                        </div>

                        <div>
                          {isCurrent && (
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-md animate-pulse">
                              CURRENT ACTIVE STAGE
                            </span>
                          )}
                          {isCompleted && (
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                              Completed
                            </span>
                          )}
                          {isUpcoming && (
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                              Scheduled
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Title & Location */}
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                        {m.title}
                      </h4>
                      <div className="flex items-center gap-1.5 text-xs text-amber-700 font-medium mt-0.5">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span>{m.location}</span>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        {m.description}
                      </p>

                      {/* Detailed Checkpoint bullets */}
                      <div className="mt-3 pt-3 border-t border-slate-200/60">
                        <ul className="space-y-1 text-[11px] text-slate-500 font-mono">
                          {m.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-amber-500 font-bold">•</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* Right 1 Col: Shipping Information, Courier & Package Details */}
        <div className="space-y-6">
          
          {/* Recipient & Courier Specs */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-5">
            <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wider font-mono border-b border-slate-100 pb-3 flex items-center gap-2">
              <Package className="w-4 h-4 text-amber-500" />
              Consignment & Delivery Specs
            </h4>

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                  Delivery Recipient
                </span>
                <span className="text-sm font-bold text-slate-900 block">{recipientName}</span>
                <span className="text-slate-500">{latestOrder?.email || 'Customer on file'}</span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                  Given UK Delivery Address
                </span>
                <p className="text-slate-700 font-medium leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {destinationAddress}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">Courier (US)</span>
                  <span className="font-bold text-slate-800 text-xs mt-0.5 block">US Global Air Cargo</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">Courier (UK)</span>
                  <span className="font-bold text-slate-800 text-xs mt-0.5 block">Royal Mail Tracked 24</span>
                </div>
              </div>

              <div className="space-y-1 pt-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                  Customs & Tariff Status
                </span>
                <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 p-2.5 rounded-xl font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Pre-Paid by Seller (Zero Customs or Import VAT to pay upon delivery).</span>
                </div>
              </div>
            </div>
          </div>

          {/* Package Contents / Ordered Items */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-4">
            <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wider font-mono border-b border-slate-100 pb-3 flex items-center gap-2">
              <Boxes className="w-4 h-4 text-amber-500" />
              Package Contents ({orderItems.length} {orderItems.length === 1 ? 'Item' : 'Items'})
            </h4>

            <div className="space-y-3">
              {orderItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-12 h-12 rounded-lg object-cover bg-white border border-slate-200 shrink-0"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=200&auto=format";
                    }}
                  />
                  <div className="min-w-0 flex-1">
                    <h5 className="text-xs font-bold text-slate-900 truncate">
                      {item.product.name}
                    </h5>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                      <span>Qty: {item.quantity}</span>
                      {item.selectedColor && (
                        <span>• Color: {item.selectedColor}</span>
                      )}
                      <span className="font-mono font-bold text-slate-900">
                        • £{(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {latestOrder?.totalAmount && (
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-600">Total Declared Value:</span>
                <span className="font-bold font-mono text-slate-900 text-sm">
                  £{latestOrder.totalAmount.toFixed(2)}
                </span>
              </div>
            )}
          </div>

          {/* 10-Day US to UK Guarantee Card */}
          <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-slate-50 border border-amber-500/30 rounded-3xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider font-mono">
              <ShieldCheck className="w-4 h-4" />
              MzAmazonSeller 10-Day Delivery Promise
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every order placed on our VIP storefront is packed and dispatched directly from our verified United States supply chain. Our transatlantic air freight guarantee promises arrival at your UK address within 10 business days.
            </p>
            <div className="pt-2">
              <button
                onClick={onContactClick}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all cursor-pointer text-center block"
              >
                Need Assistance With Your Delivery?
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
