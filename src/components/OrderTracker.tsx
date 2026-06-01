'use client';

import React from 'react';
import { useCart } from '../context/CartContext';
import { ChefHat, Bike, Gift, CheckCircle, Package } from 'lucide-react';

export const OrderTracker: React.FC = () => {
  const { orderState, setActiveSection } = useCart();

  if (!orderState) return null;

  const statuses = [
    { label: 'Placed', icon: Package, desc: 'We have received your order!' },
    { label: 'Preparing', icon: ChefHat, desc: 'Our chefs are grilling your patties.' },
    { label: 'Shipping', icon: Bike, desc: 'Your rider is speeding towards you!' },
    { label: 'Delivered', icon: CheckCircle, desc: 'Burger secured! Enjoy your meal.' },
  ];

  const getStatusIndex = () => {
    switch (orderState.status) {
      case 'placed': return 0;
      case 'preparing': return 1;
      case 'shipping': return 2;
      case 'delivered': return 3;
      default: return 0;
    }
  };

  const currentIdx = getStatusIndex();

  const handleReset = () => {
    localStorage.removeItem('chillox_active_order');
    window.location.reload(); // Reload to reset state easily
  };

  return (
    <section id="tracking" className="py-24 px-4 bg-gradient-to-b from-[#0f0404] to-[#170505] text-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="bg-amber-400/10 text-amber-400 border border-amber-400/20 text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
            Live Order Tracking
          </span>
          <h2 className="text-3xl font-black mt-3 tracking-wide uppercase">
            Order Status: <span className="text-amber-400">{orderState.id}</span>
          </h2>
          <p className="text-white/60 text-sm mt-1">
            Ordered at {orderState.timestamp} | Payment: {orderState.paymentMethod.toUpperCase()}
          </p>
        </div>

        {/* Dynamic status tracking board */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden mb-8">
          
          {/* Glowing decoration */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-400/10 rounded-full blur-[80px]" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-red-600/10 rounded-full blur-[80px]" />

          {/* Timeline Nodes */}
          <div className="relative flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-4">
            
            {/* Progress line for desktop */}
            <div className="hidden md:block absolute left-0 top-6 w-full h-1 bg-white/10 z-0">
              <div
                className="bg-amber-400 h-full transition-all duration-[1000ms] ease-out"
                style={{ width: `${(currentIdx / 3) * 100}%` }}
              />
            </div>

            {/* Progress line for mobile */}
            <div className="block md:hidden absolute left-1/2 top-4 -translate-x-1/2 w-0.5 h-[80%] bg-white/10 z-0">
              <div
                className="bg-amber-400 w-full transition-all duration-[1000ms] ease-out"
                style={{ height: `${(currentIdx / 3) * 100}%` }}
              />
            </div>

            {/* Nodes */}
            {statuses.map((step, idx) => {
              const StepIcon = step.icon;
              const isCompleted = idx <= currentIdx;
              const isActive = idx === currentIdx;

              return (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center relative z-10 w-full md:w-auto"
                >
                  <div
                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-500 shadow-lg ${
                      isActive
                        ? 'bg-amber-400 border-white text-red-950 scale-110 shadow-[0_0_15px_rgba(251,191,36,0.6)] animate-pulse'
                        : isCompleted
                        ? 'bg-amber-500/20 border-amber-400 text-amber-400'
                        : 'bg-red-950/80 border-white/15 text-white/40'
                    }`}
                  >
                    <StepIcon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-sm font-bold uppercase tracking-wider mt-3 transition-colors ${
                      isCompleted ? 'text-white' : 'text-white/40'
                    }`}
                  >
                    {step.label}
                  </span>
                  <span className="text-[11px] text-white/50 mt-1 max-w-[150px] leading-tight hidden md:block">
                    {step.desc}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="h-[1px] bg-white/10 my-8" />

          {/* Current Status Update Banner */}
          <div className="bg-white/5 border border-white/5 p-5 rounded-xl flex items-start space-x-4">
            <div className="p-3 bg-amber-400/10 rounded-lg text-amber-400 flex-shrink-0 animate-bounce">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-amber-300">
                {statuses[currentIdx].label === 'Delivered'
                  ? 'Burger Secured! 🎉'
                  : 'We are working on your food!'}
              </h3>
              <p className="text-sm text-white/70 mt-1">
                {statuses[currentIdx].desc}
              </p>
              {orderState.status !== 'delivered' && (
                <p className="text-xs text-amber-400/70 font-semibold mt-2 animate-pulse">
                  * Live status updates automatically every 15 seconds.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Customer & Item details breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          
          {/* Delivery Details card */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-4 border-b border-white/10 pb-2">
              Delivery Details
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-white/40 block text-xs uppercase font-bold">Recipient Name</span>
                <span className="font-bold">{orderState.name}</span>
              </div>
              <div>
                <span className="text-white/40 block text-xs uppercase font-bold">Phone Number</span>
                <span className="font-semibold text-white/95">{orderState.phone}</span>
              </div>
              <div>
                <span className="text-white/40 block text-xs uppercase font-bold">Delivery Address</span>
                <p className="text-white/80 leading-relaxed mt-0.5">{orderState.address}</p>
              </div>
            </div>
          </div>

          {/* Ordered items card */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-xl flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-4 border-b border-white/10 pb-2">
                Order Summary
              </h3>
              <div className="max-h-40 overflow-y-auto space-y-2 pr-1">
                {orderState.items.map((cartItem) => (
                  <div key={cartItem.cartItemId} className="flex justify-between items-center text-sm">
                    <span className="text-white/80 font-medium">
                      {cartItem.item.name} <span className="text-amber-400 font-bold">x{cartItem.quantity}</span>
                    </span>
                    <span className="font-bold">Tk {cartItem.item.price * cartItem.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border-t border-white/10 pt-4 mt-4">
              <div className="flex justify-between text-base font-bold text-white">
                <span>Total Amount Paid</span>
                <span className="text-amber-400">Tk {orderState.total}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Clear/Reset button */}
        {orderState.status === 'delivered' && (
          <div className="text-center">
            <button
              onClick={handleReset}
              className="px-8 py-3 bg-amber-400 hover:bg-amber-300 text-red-950 font-black uppercase rounded-full tracking-wider hover:scale-105 transition-transform"
            >
              Order Something Else!
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
export default OrderTracker;
