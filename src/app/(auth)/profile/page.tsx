'use client';

import React, { useState } from 'react';
import { User, ShieldAlert, Award, ShoppingBag, Clock, MapPin, ChevronRight, Settings } from 'lucide-react';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'orders' | 'settings'>('orders');

  return (
    <div className="max-w-4xl mx-auto px-4 mt-6">
      {/* Profile Header Card */}
      <div className="bg-[#121214] border-2 border-zinc-800 rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_10px_35px_rgba(0,0,0,0.5)] mb-8">
        <div className="flex flex-col md:flex-row items-center gap-5 text-center md:text-left">
          <div className="w-20 h-20 rounded-full bg-amber-400 border-2 border-zinc-950 flex items-center justify-center text-zinc-950 shadow-[2px_2px_0px_#000] relative">
            <User className="w-10 h-10" />
            <span className="absolute -bottom-1 -right-1 bg-red-500 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-zinc-950">
              Gold
            </span>
          </div>
          <div>
            <h1 className="text-2xl font-black uppercase tracking-wide text-white">
              Yasin Arafat
            </h1>
            <p className="text-zinc-400 text-xs font-semibold mt-1">
              Member since Nov 2023 • yasin@chillox.com
            </p>
            {/* Loyalty point bar */}
            <div className="mt-3 flex items-center gap-3">
              <div className="w-48 bg-zinc-900 border border-zinc-800 rounded-full h-3.5 p-0.5 overflow-hidden">
                <div className="bg-gradient-to-r from-red-500 to-amber-400 h-full rounded-full w-[75%]" />
              </div>
              <span className="text-xs font-black text-amber-400">750 / 1000 Pts</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-2 px-5 rounded-xl font-black text-xs uppercase border-2 border-zinc-950 transition-all ${
              activeTab === 'orders'
                ? 'bg-[#ff2a14] text-white shadow-[2px_2px_0px_#000] translate-y-[-1px]'
                : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-400 border-zinc-800'
            }`}
          >
            Order History
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-2 px-5 rounded-xl font-black text-xs uppercase border-2 border-zinc-950 transition-all ${
              activeTab === 'settings'
                ? 'bg-[#ff2a14] text-white shadow-[2px_2px_0px_#000] translate-y-[-1px]'
                : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-400 border-zinc-800'
            }`}
          >
            Settings
          </button>
        </div>
      </div>

      {activeTab === 'orders' ? (
        <div className="space-y-6">
          <h2 className="text-lg font-black uppercase tracking-wider text-[#ff2a14] mb-4 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" /> Recent Orders
          </h2>

          {/* List of Orders */}
          <div className="bg-[#121214] border-2 border-zinc-800 rounded-[2rem] overflow-hidden divide-y divide-zinc-800/40">
            {/* Order item 1 */}
            <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-zinc-900/10 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center text-[#ff2a14]">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-sm uppercase text-white">CHX-84920</span>
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-md">
                      Delivered
                    </span>
                  </div>
                  <p className="text-zinc-500 text-xs font-semibold mt-1">
                    2x Smasher Bacon, 1x Classic French Fries
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6 self-end sm:self-auto">
                <div className="text-right">
                  <span className="font-black text-sm text-amber-400">1,080 BDT</span>
                  <p className="text-zinc-500 text-[10px] font-semibold mt-0.5">May 24, 2026</p>
                </div>
                <ChevronRight className="w-5 h-5 text-zinc-600" />
              </div>
            </div>

            {/* Order item 2 */}
            <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-zinc-900/10 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center text-[#ff2a14]">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-sm uppercase text-white">CHX-71029</span>
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-md">
                      Delivered
                    </span>
                  </div>
                  <p className="text-zinc-500 text-xs font-semibold mt-1">
                    1x Beef Cheese Burger, 1x Iced Lemon Tea
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6 self-end sm:self-auto">
                <div className="text-right">
                  <span className="font-black text-sm text-amber-400">374 BDT</span>
                  <p className="text-zinc-500 text-[10px] font-semibold mt-0.5">Apr 12, 2026</p>
                </div>
                <ChevronRight className="w-5 h-5 text-zinc-600" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#121214] border-2 border-zinc-800 rounded-[2rem] p-6 md:p-8 space-y-6">
          <h2 className="text-lg font-black uppercase tracking-wider text-white mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5" /> Account Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-zinc-400 mb-2">Name</label>
              <input
                type="text"
                defaultValue="Yasin Arafat"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff2a14]"
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-zinc-400 mb-2">Phone</label>
              <input
                type="text"
                defaultValue="+880 1712-345678"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff2a14]"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-black uppercase tracking-wider text-zinc-400 mb-2">Default Address</label>
              <textarea
                defaultValue="Flat 4B, House 12, Road 5, Dhanmondi, Dhaka"
                rows={3}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff2a14] resize-none"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button className="py-2.5 px-6 bg-[#ff2a14] hover:bg-[#e0220f] border-2 border-zinc-950 text-white rounded-xl font-black text-xs uppercase shadow-[2px_2px_0px_#000] active:translate-y-[1px] transition-all">
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
