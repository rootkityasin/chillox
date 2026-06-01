'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem } from '../data/menuData';

export interface ItemCustomization {
  sauceLevel: string;
  spiceLevel: string;
  bunType: string;
  addOns: { name: string; price: number }[];
}

export interface CartItem {
  cartItemId: string; // Unique string mapping to this item + customization
  item: MenuItem;
  quantity: number;
  customPrice: number; // Base price + add-ons
  customizations?: ItemCustomization;
}

export interface OrderDetails {
  id: string;
  name: string;
  phone: string;
  address: string;
  paymentMethod: string;
  items: CartItem[];
  subtotal: number;
  vat: number;
  deliveryFee: number;
  total: number;
  status: 'none' | 'placed' | 'preparing' | 'shipping' | 'delivered';
  timestamp: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem, customizations?: ItemCustomization) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  vat: number;
  deliveryFee: number;
  total: number;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  orderState: OrderDetails | null;
  placeOrder: (name: string, phone: string, address: string, paymentMethod: string) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [orderState, setOrderState] = useState<OrderDetails | null>(null);
  const [activeSection, setActiveSection] = useState('home');

  // Load cart and active order from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('chillox_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }

    const savedOrder = localStorage.getItem('chillox_active_order');
    if (savedOrder) {
      try {
        setOrderState(JSON.parse(savedOrder));
      } catch (e) {
        console.error('Failed to parse order', e);
      }
    }
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('chillox_cart', JSON.stringify(cart));
  }, [cart]);

  // Save orderState to localStorage when it changes
  useEffect(() => {
    if (orderState) {
      localStorage.setItem('chillox_active_order', JSON.stringify(orderState));
    } else {
      localStorage.removeItem('chillox_active_order');
    }
  }, [orderState]);

  // Order status simulation loop
  useEffect(() => {
    if (!orderState || orderState.status === 'delivered' || orderState.status === 'none') {
      return;
    }

    const timer = setTimeout(() => {
      setOrderState((prev) => {
        if (!prev) return null;
        let nextStatus: OrderDetails['status'] = prev.status;
        if (prev.status === 'placed') {
          nextStatus = 'preparing';
        } else if (prev.status === 'preparing') {
          nextStatus = 'shipping';
        } else if (prev.status === 'shipping') {
          nextStatus = 'delivered';
        }

        return {
          ...prev,
          status: nextStatus,
        };
      });
    }, 15000); // Progress to next state every 15 seconds

    return () => clearTimeout(timer);
  }, [orderState]);

  const addToCart = (item: MenuItem, customizations?: ItemCustomization) => {
    // Generate a unique ID based on item selection and customization attributes
    const addOnsKey = customizations 
      ? customizations.addOns.map((a) => a.name).sort().join(',')
      : '';
    const customizationsHash = customizations
      ? `${customizations.sauceLevel}-${customizations.spiceLevel}-${customizations.bunType}-[${addOnsKey}]`
      : 'standard';
    
    const cartItemId = `${item.id}-${customizationsHash}`;

    // Sum custom price (Base Price + Add-ons)
    const addOnsPrice = customizations
      ? customizations.addOns.reduce((sum, a) => sum + a.price, 0)
      : 0;
    const customPrice = item.price + addOnsPrice;

    setCart((prev) => {
      const existing = prev.find((cartItem) => cartItem.cartItemId === cartItemId);
      if (existing) {
        return prev.map((cartItem) =>
          cartItem.cartItemId === cartItemId
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { cartItemId, item, quantity: 1, customPrice, customizations }];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((cartItem) => cartItem.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((cartItem) =>
        cartItem.cartItemId === cartItemId ? { ...cartItem, quantity } : cartItem
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
  const subtotal = cart.reduce((total, cartItem) => total + cartItem.customPrice * cartItem.quantity, 0);
  const vat = Math.round(subtotal * 0.15); // 15% VAT
  const deliveryFee = subtotal > 0 ? 60 : 0; // BDT 60 delivery fee
  const total = subtotal + vat + deliveryFee;

  const placeOrder = (name: string, phone: string, address: string, paymentMethod: string) => {
    const newOrder: OrderDetails = {
      id: 'CHX-' + Math.floor(100000 + Math.random() * 900000),
      name,
      phone,
      address,
      paymentMethod,
      items: [...cart],
      subtotal,
      vat,
      deliveryFee,
      total,
      status: 'placed',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setOrderState(newOrder);
    clearCart();
    setCartOpen(false);
    setActiveSection('tracking');

    // Smooth scroll to tracking section
    setTimeout(() => {
      const trackingSec = document.getElementById('tracking');
      if (trackingSec) {
        trackingSec.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        vat,
        deliveryFee,
        total,
        isCartOpen,
        setCartOpen,
        orderState,
        placeOrder,
        activeSection,
        setActiveSection,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
