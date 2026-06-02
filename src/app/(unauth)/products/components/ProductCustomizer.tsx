'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { MenuItem } from '@/data/menuData';
import { ShoppingBag, Check } from 'lucide-react';

interface ProductCustomizerProps {
  product: MenuItem;
}

const ADD_ONS = [
  { name: 'Extra Cheese Slice', price: 40 },
  { name: 'Canadian Bacon Strip', price: 60 },
  { name: 'Caramelized Onions', price: 20 },
  { name: 'Fried Egg', price: 30 },
];

export const ProductCustomizer: React.FC<ProductCustomizerProps> = ({ product }) => {
  const { addToCart, setCartOpen } = useCart();
  const [sauceLevel, setSauceLevel] = useState('regular');
  const [spiceLevel, setSpiceLevel] = useState('spicy');
  const [bunType, setBunType] = useState('brioche');
  const [selectedAddOns, setSelectedAddOns] = useState<{ name: string; price: number }[]>([]);

  const toggleAddOn = (addOn: { name: string; price: number }) => {
    setSelectedAddOns((prev) =>
      prev.some((a) => a.name === addOn.name)
        ? prev.filter((a) => a.name !== addOn.name)
        : [...prev, addOn]
    );
  };

  const handleAddToCart = () => {
    addToCart(product, {
      sauceLevel,
      spiceLevel,
      bunType,
      addOns: selectedAddOns,
    });
    setCartOpen(true);
  };

  const calculateTotalPrice = () => {
    const addOnTotal = selectedAddOns.reduce((sum, item) => sum + item.price, 0);
    return product.price + addOnTotal;
  };

  return (
    <div className="bg-[#121214] border-2 border-zinc-800 rounded-[2.5rem] p-6 md:p-8 flex flex-col md:flex-row gap-8 shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
      {/* Product Image Panel */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-zinc-950/40 rounded-[2rem] border border-zinc-800/40 relative group overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#ff2a14]/5 to-transparent pointer-events-none" />
        <img
          src={product.image}
          alt={product.name}
          className="w-56 h-56 md:w-72 md:h-72 object-contain transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="text-center mt-6">
          <h2 className="text-2xl font-black uppercase text-white tracking-wide">{product.name}</h2>
          <p className="text-zinc-500 text-xs font-semibold mt-2 max-w-sm">{product.description}</p>
        </div>
      </div>

      {/* Customizer Panel */}
      <div className="flex-1 flex flex-col justify-between space-y-6">
        <div>
          <span className="text-[#ff2a14] text-[10px] font-black uppercase tracking-wider block mb-1">
            Customization
          </span>
          <h3 className="text-lg font-black uppercase tracking-wide text-white border-b border-zinc-800 pb-3">
            Build it your way
          </h3>

          <div className="space-y-5 mt-5">
            {/* Spice Level */}
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-zinc-400 block mb-2">Spice Level</span>
              <div className="flex gap-2">
                {['regular', 'spicy', 'naga'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setSpiceLevel(level)}
                    className={`py-2 px-4 rounded-xl text-xs font-black uppercase border-2 transition-all ${
                      spiceLevel === level
                        ? 'bg-[#ff2a14] border-zinc-950 text-white shadow-[2px_2px_0px_#000] translate-y-[-1px]'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800'
                    }`}
                  >
                    {level === 'naga' ? 'Extreme Naga 🔥' : level}
                  </button>
                ))}
              </div>
            </div>

            {/* Sauce Level */}
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-zinc-400 block mb-2">Sauce Level</span>
              <div className="flex gap-2">
                {['none', 'light', 'regular', 'heavy'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setSauceLevel(level)}
                    className={`py-2 px-4 rounded-xl text-xs font-black uppercase border-2 transition-all ${
                      sauceLevel === level
                        ? 'bg-[#ff2a14] border-zinc-950 text-white shadow-[2px_2px_0px_#000] translate-y-[-1px]'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Add-ons */}
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-zinc-400 block mb-2">Add Extra toppings</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ADD_ONS.map((addOn) => {
                  const isSelected = selectedAddOns.some((a) => a.name === addOn.name);
                  return (
                    <button
                      key={addOn.name}
                      onClick={() => toggleAddOn(addOn)}
                      className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-amber-400/10 border-amber-400 text-amber-400'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                          isSelected ? 'border-amber-400 bg-amber-400 text-zinc-950' : 'border-zinc-700 bg-zinc-950'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3px]" />}
                        </div>
                        <span className="text-xs font-black uppercase tracking-wide">{addOn.name}</span>
                      </div>
                      <span className="text-xs font-black text-white">+{addOn.price} BDT</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Add-to-cart */}
        <div className="border-t border-zinc-800 pt-5 flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-zinc-500">Total Price</span>
            <div className="text-2xl font-black text-amber-400 mt-0.5">{calculateTotalPrice()} BDT</div>
          </div>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 py-3 px-6 bg-[#ff2a14] hover:bg-[#e0220f] border-2 border-zinc-950 text-white rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest transition-all shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4.5px_4.5px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1.5px_1.5px_0px_#000]"
          >
            <ShoppingBag className="w-4.5 h-4.5" />
            <span>ADD TO CART</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCustomizer;
