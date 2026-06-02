'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { cartCount, setCartOpen, activeSection, setActiveSection } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      if (isMobileMenuOpen) {
        setIsVisible(true);
        return;
      }

      // Determine the threshold: start of section 3 (#menu)
      const menuElement = document.getElementById('menu');
      const threshold = menuElement ? menuElement.offsetTop - 120 : 800; // fallback to 800px

      if (currentScrollY <= threshold) {
        // Always visible before the 3rd section
        setIsVisible(true);
      } else {
        // Past the 2nd section: hide when scrolling down, show when scrolling up
        if (currentScrollY > lastScrollY) {
          // Scrolling down
          setIsVisible(false);
        } else {
          // Scrolling up
          setIsVisible(true);
        }
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen]);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'outlets', label: 'Outlets' },
    { id: 'contact', label: 'Feedback' },
  ];

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    setActiveSection(id);

    // Scroll to the targeted section
    const targetElement = document.getElementById(id);
    if (targetElement) {
      if (typeof window !== 'undefined') {
        (window as any).isProgrammaticScroll = true;
      }
      targetElement.scrollIntoView({ behavior: 'smooth' });
      
      // Reset scroll flag after transition (typically takes ~800ms)
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          (window as any).isProgrammaticScroll = false;
        }
      }, 800);
    }
  };

  return (
    <header
      className={`fixed transition-all duration-300 z-40 left-1/2 -translate-x-1/2 w-[92%] max-w-5xl rounded-[2rem] bg-white border-2 border-zinc-950 shadow-[4px_4px_0px_#000] py-3 px-4 md:px-6 ${
        isVisible ? 'top-4 opacity-100' : '-top-24 opacity-0 pointer-events-none'
      }`}
    >
      <div className="w-full flex items-center justify-between">
        
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center space-x-2.5 select-none group text-left"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-zinc-950 transform group-hover:scale-105 transition-transform bg-white flex items-center justify-center p-0.5 shadow-sm">
            <img src="/logo.png" alt="Chillox Logo" className="w-full h-full object-contain rounded-full" />
          </div>
          <span className="flex items-baseline font-black font-sans uppercase tracking-wider text-zinc-950">
            <span style={{ fontSize: '1.12rem' }} className="transition-colors duration-200 group-hover:text-[#ff2a14]">C</span>
            <span style={{ fontSize: '1.18rem' }} className="transition-colors duration-200 group-hover:text-[#ff2a14]">H</span>
            <span style={{ fontSize: '1.24rem' }} className="transition-colors duration-200 group-hover:text-[#ff2a14]">I</span>
            <span style={{ fontSize: '1.30rem' }} className="transition-colors duration-200 group-hover:text-[#ff2a14]">L</span>
            <span style={{ fontSize: '1.36rem', marginLeft: '-1.5px' }} className="transition-colors duration-200 group-hover:text-[#ff2a14]">L</span>
            <span style={{ fontSize: '1.42rem', marginLeft: '-2.5px' }} className="transition-colors duration-200 group-hover:text-[#ff2a14]">O</span>
            <span style={{ fontSize: '1.48rem', marginLeft: '-3.5px' }} className="text-[#ff2a14] transition-colors duration-200 group-hover:text-zinc-950">X</span>
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all border-2 border-zinc-950 ${
                activeSection === item.id
                  ? 'bg-[#ff2a14] text-white shadow-[2px_2px_0px_#000] translate-x-[-1px] translate-y-[-1px]'
                  : 'bg-white hover:bg-zinc-50 text-zinc-800 shadow-[1px_1px_0px_#000] hover:translate-x-[-0.5px] hover:translate-y-[-0.5px] hover:shadow-[1.5px_1.5px_0px_#000] active:translate-x-[0.5px] active:translate-y-[0.5px] active:shadow-[0.5px_0.5px_0px_#000]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          
          {/* Shopping Cart Button */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative p-2.5 rounded-full bg-white text-zinc-950 border-2 border-zinc-950 shadow-[2px_2px_0px_#000] hover:bg-amber-400 hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] transition-all duration-200 group"
            aria-label="Open Cart"
          >
            <ShoppingBag className="w-4.5 h-4.5 transition-transform group-hover:scale-110" />
            
            {/* Pulsing Badge */}
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#ff2a14] text-white text-[10px] font-black min-w-4.5 h-4.5 px-1 flex items-center justify-center rounded-full shadow-sm border border-zinc-950 animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Yellow Circular Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-11 h-11 rounded-full bg-amber-400 hover:bg-amber-300 text-zinc-950 flex items-center justify-center border-2 border-zinc-950 shadow-[2px_2px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] transition-all duration-200 md:hidden"
            aria-label="Toggle Navigation"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 stroke-[2.5px]" /> : <Menu className="w-5 h-5 stroke-[2.5px]" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Full-screen Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-zinc-950/60 backdrop-blur-md z-35 flex items-center justify-center p-6 h-screen w-screen left-0 top-0">
          <div className="bg-[#faf6ed] border-2 border-zinc-950 rounded-[2rem] shadow-[6px_6px_0px_#000] w-full max-w-sm p-8 flex flex-col items-center space-y-5 animate-slide-up-fade">
            <h4 className="text-sm font-black uppercase tracking-widest text-[#ff2a14] border-b-2 border-zinc-950 pb-2 w-full text-center mb-2">Navigation</h4>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full py-3 px-8 rounded-full text-sm font-black uppercase tracking-wider transition-all border-2 border-zinc-950 ${
                  activeSection === item.id
                    ? 'bg-[#ff2a14] text-white shadow-[3px_3px_0px_#000] translate-x-[-1.5px] translate-y-[-1.5px]'
                    : 'bg-white hover:bg-zinc-50 text-zinc-800 shadow-[2px_2px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
export default Navbar;
