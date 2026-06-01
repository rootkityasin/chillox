'use client';

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, Trash2, ArrowRight, CreditCard, Truck, RefreshCw } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    vat,
    deliveryFee,
    total,
    placeOrder,
  } = useCart();

  const [isCheckoutMode, setCheckoutMode] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod' | 'bkash' | 'card'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) {
      alert('Please fill out all delivery fields.');
      return;
    }
    placeOrder(name, phone, address, paymentMethod);
    setCheckoutMode(false);
    // Form fields reset
    setName('');
    setPhone('');
    setAddress('');
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={() => {
          setCartOpen(false);
          setCheckoutMode(false);
        }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Drawer content */}
      <div className="relative w-full max-w-md h-full bg-gradient-to-b from-black to-[#0c0505] text-white shadow-2xl flex flex-col z-10 border-l border-white/10 animate-slide-in">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-wider flex items-center">
            {isCheckoutMode ? 'DELIVERY DETAILS' : 'YOUR CART'}
          </h2>
          <button
            onClick={() => {
              setCartOpen(false);
              setCheckoutMode(false);
            }}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-grow overflow-y-auto p-5">
          {cart.length === 0 && !isCheckoutMode ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-amber-400 mb-4 border border-white/10">
                <Trash2 className="w-8 h-8 opacity-40" />
              </div>
              <p className="text-white/60 font-bold tracking-wide">Your cart is empty!</p>
              <p className="text-xs text-white/40 mt-1 max-w-[200px]">Head over to our Menu page to add some tasty burgers!</p>
              <button
                onClick={() => {
                  setCartOpen(false);
                  const menuSec = document.getElementById('menu');
                  if (menuSec) menuSec.scrollIntoView({ behavior: 'smooth' });
                }}
                className="mt-6 px-6 py-2.5 bg-amber-400 text-red-950 font-bold rounded-full text-sm uppercase tracking-wider hover:bg-amber-300 transition-colors"
              >
                Go to Menu
              </button>
            </div>
          ) : !isCheckoutMode ? (
            /* Items List */
            <div className="space-y-4">
              {cart.map((cartItem) => (
                <div
                  key={cartItem.cartItemId}
                  className="flex items-start space-x-4 bg-white/5 p-4 rounded-xl border border-white/10 hover:border-amber-400/40 transition-colors group"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-lg bg-red-900/30 border border-white/10 flex items-center justify-center overflow-hidden flex-shrink-0 relative mt-0.5">
                    <img
                      src={cartItem.item.image}
                      alt={cartItem.item.name}
                      className="w-12 h-12 object-contain filter drop-shadow-[0_4px_4px_rgba(0,0,0,0.4)]"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-grow min-w-0">
                    <h3 className="font-bold text-sm truncate group-hover:text-amber-400 transition-colors">
                      {cartItem.item.name}
                    </h3>
                    
                    {/* Render Customizations */}
                    {cartItem.customizations && (
                      <div className="text-[10px] text-white/50 space-y-0.5 mt-1 border-l border-white/10 pl-2">
                        <p className="capitalize">
                          <span className="text-amber-400/60 font-medium">Sauce:</span> {cartItem.customizations.sauceLevel} | <span className="text-amber-400/60 font-medium">Spice:</span> {cartItem.customizations.spiceLevel}
                        </p>
                        <p className="capitalize">
                          <span className="text-amber-400/60 font-medium">Bun:</span> {cartItem.customizations.bunType}
                        </p>
                        {cartItem.customizations.addOns.length > 0 && (
                          <p className="text-amber-300/80 leading-tight">
                            <span className="text-amber-400/60 font-medium">Add-ons:</span>{' '}
                            {cartItem.customizations.addOns.map((a) => `${a.name} (+Tk ${a.price})`).join(', ')}
                          </p>
                        )}
                      </div>
                    )}

                    <p className="text-amber-400 text-xs font-black mt-2">
                      Tk {cartItem.customPrice} <span className="text-[10px] text-white/40 font-normal">each</span>
                    </p>
                  </div>

                  {/* Quantity Controller & Delete */}
                  <div className="flex flex-col items-end space-y-3">
                    <div className="flex items-center bg-white/10 rounded-lg p-1 border border-white/5">
                      <button
                        onClick={() => updateQuantity(cartItem.cartItemId, cartItem.quantity - 1)}
                        className="p-1 hover:bg-white/10 rounded transition-colors text-white/80"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-extrabold">{cartItem.quantity}</span>
                      <button
                        onClick={() => updateQuantity(cartItem.cartItemId, cartItem.quantity + 1)}
                        className="p-1 hover:bg-white/10 rounded transition-colors text-white/80"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(cartItem.cartItemId)}
                      className="text-white/40 hover:text-red-400 transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in">
              <div className="space-y-1.5">
                <label className="text-xs font-bold tracking-widest text-white/70 block uppercase">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Yasin Arafat"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 focus:border-amber-400 focus:outline-none p-3 rounded-lg text-sm transition-colors text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold tracking-widest text-white/70 block uppercase">
                  Mobile Number
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., 017XXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 focus:border-amber-400 focus:outline-none p-3 rounded-lg text-sm transition-colors text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold tracking-widest text-white/70 block uppercase">
                  Delivery Address
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="House, Flat, Road, Area (e.g., Dhanmondi 27, Dhaka)"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 focus:border-amber-400 focus:outline-none p-3 rounded-lg text-sm transition-colors text-white resize-none"
                />
              </div>

              {/* Payment Methods */}
              <div className="space-y-2">
                <label className="text-xs font-bold tracking-widest text-white/70 block uppercase">
                  Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-lg border text-center flex flex-col items-center justify-center transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-amber-400 bg-amber-400/10 text-amber-400'
                        : 'border-white/10 hover:border-white/20 text-white/70'
                    }`}
                  >
                    <Truck className="w-5 h-5 mb-1" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Cash</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bkash')}
                    className={`p-3 rounded-lg border text-center flex flex-col items-center justify-center transition-all ${
                      paymentMethod === 'bkash'
                        ? 'border-amber-400 bg-amber-400/10 text-amber-400'
                        : 'border-white/10 hover:border-white/20 text-white/70'
                    }`}
                  >
                    <RefreshCw className="w-5 h-5 mb-1 animate-spin-slow" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">bKash</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-lg border text-center flex flex-col items-center justify-center transition-all ${
                      paymentMethod === 'card'
                        ? 'border-amber-400 bg-amber-400/10 text-amber-400'
                        : 'border-white/10 hover:border-white/20 text-white/70'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mb-1" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Card</span>
                  </button>
                </div>
              </div>

              {/* Order Items Summary inside Checkout */}
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="text-xs font-bold tracking-widest text-amber-400 mb-2 uppercase">
                  Order Summary
                </h4>
                <div className="max-h-28 overflow-y-auto space-y-2 pr-1 text-xs">
                  {cart.map((cartItem) => (
                    <div key={cartItem.cartItemId} className="text-white/75 space-y-0.5 border-b border-white/5 pb-1 last:border-0 last:pb-0">
                      <div className="flex justify-between font-bold">
                        <span>{cartItem.item.name} x{cartItem.quantity}</span>
                        <span>Tk {cartItem.customPrice * cartItem.quantity}</span>
                      </div>
                      {cartItem.customizations && (
                        <p className="text-[9px] text-white/40">
                          Sauce: {cartItem.customizations.sauceLevel} | Spice: {cartItem.customizations.spiceLevel} | Bun: {cartItem.customizations.bunType}
                          {cartItem.customizations.addOns.length > 0 && ` | Add-ons: ${cartItem.customizations.addOns.map((a) => a.name).join(', ')}`}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Footer Billing Details */}
        <div className="p-5 border-t border-white/10 bg-black/45 backdrop-blur-md">
          <div className="space-y-2 mb-4 text-sm text-white/80">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold">Tk {subtotal}</span>
            </div>
            {subtotal > 0 && (
              <>
                <div className="flex justify-between text-xs text-white/60">
                  <span>VAT (15%)</span>
                  <span>Tk {vat}</span>
                </div>
                <div className="flex justify-between text-xs text-white/60">
                  <span>Delivery Charge</span>
                  <span>Tk {deliveryFee}</span>
                </div>
                <div className="h-[1px] bg-white/10 my-2" />
                <div className="flex justify-between text-base font-bold text-white">
                  <span>Total Amount</span>
                  <span className="text-amber-400">Tk {total}</span>
                </div>
              </>
            )}
          </div>

          {/* Action buttons */}
          {isCheckoutMode ? (
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setCheckoutMode(false)}
                className="w-full py-3 border border-white/20 hover:border-white/40 font-bold uppercase rounded-lg text-xs tracking-wider transition-all"
              >
                Back to Cart
              </button>
              <button
                onClick={handleSubmit}
                className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-red-950 font-black uppercase rounded-lg text-xs tracking-wider border-2 border-black/90 shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] transition-all"
              >
                Confirm Order
              </button>
            </div>
          ) : (
            cart.length > 0 && (
              <button
                onClick={() => setCheckoutMode(true)}
                className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-red-950 font-black uppercase rounded-xl text-sm tracking-wider flex items-center justify-center space-x-2 border-2 border-black/90 shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] transition-all"
              >
                <span>Checkout</span>
                <ArrowRight className="w-4 h-4 animate-pulse" />
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};
export default CartDrawer;
