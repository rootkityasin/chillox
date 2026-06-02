'use client';

import React, { useState, useEffect } from 'react';
import { useCart, ItemCustomization } from '../context/CartContext';
import { menuItems, MenuItem } from '../data/menuData';
import { Search, Flame, Award, Crown, Gem, Star, Check, Settings, X, Plus, Minus, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';

const TOPPING_OPTIONS = [
  { name: 'Cheese Slice', price: 35 },
  { name: 'Sausage', price: 60 },
  { name: 'Beef Bacon', price: 80 },
  { name: 'Extra Patty', price: 150 },
  { name: 'Egg', price: 30 },
  { name: 'BBQ Sauce', price: 25 },
  { name: 'Honey BBQ Sauce', price: 30 },
  { name: 'Chicken Rasher', price: 60 },
];

export const MenuSection: React.FC = () => {
  const { addToCart, setActiveSection } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>(menuItems);
  const [addedItemId, setAddedItemId] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  // Search bar interactivity refs & states
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Horizontal scroll for categories
  const tabsRef = React.useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  // Drag to scroll state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  const updateScrollButtons = () => {
    const el = tabsRef.current;
    if (el) {
      setShowLeftArrow(el.scrollLeft > 5);
      setShowRightArrow(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
    }
  };

  useEffect(() => {
    updateScrollButtons();
    // Update on window resize
    window.addEventListener('resize', updateScrollButtons);
    return () => window.removeEventListener('resize', updateScrollButtons);
  }, []);

  // Update scroll buttons when category changes or filtered items change (after render layout shifts)
  useEffect(() => {
    const timer = setTimeout(updateScrollButtons, 100);
    return () => clearTimeout(timer);
  }, [selectedCategory]);

  const handleDragMouseDown = (e: React.MouseEvent) => {
    if (!tabsRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - tabsRef.current.offsetLeft);
    setScrollLeftState(tabsRef.current.scrollLeft);
    setHasDragged(false);
  };

  const handleDragMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !tabsRef.current) return;
    e.preventDefault();
    const x = e.pageX - tabsRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    tabsRef.current.scrollLeft = scrollLeftState - walk;
    if (Math.abs(walk) > 5) {
      setHasDragged(true);
    }
    updateScrollButtons();
  };

  const handleDragMouseUp = () => {
    setIsDragging(false);
  };

  const scrollLeftDirection = () => {
    if (tabsRef.current) {
      tabsRef.current.scrollBy({ left: -240, behavior: 'smooth' });
      setTimeout(updateScrollButtons, 300);
    }
  };

  const scrollRightDirection = () => {
    if (tabsRef.current) {
      tabsRef.current.scrollBy({ left: 240, behavior: 'smooth' });
      setTimeout(updateScrollButtons, 300);
    }
  };

  const getFadeMaskClass = () => {
    if (showLeftArrow && showRightArrow) return 'scroll-fade-both';
    if (showLeftArrow) return 'scroll-fade-left';
    if (showRightArrow) return 'scroll-fade-right';
    return '';
  };

  // Keyboard shortcut listener to focus search bar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Customization modal states
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [sauceLevel, setSauceLevel] = useState<string>('regular');
  const [spiceLevel, setSpiceLevel] = useState<string>('spicy');
  const [bunType, setBunType] = useState<string>('brioche');
  const [selectedAddOns, setSelectedAddOns] = useState<{ name: string; price: number }[]>([]);

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'beef', label: 'Beef Burgers' },
    { id: 'chicken', label: 'Chicken Burgers' },
    { id: 'fish', label: 'Fish Burgers' },
    { id: 'smasher', label: 'Smashers' },
    { id: 'rice-bowls', label: 'Rice Bowls' },
    { id: 'fried-chicken', label: 'Fried Chicken' },
    { id: 'sides', label: 'Sides' },
    { id: 'drinks', label: 'Shakes & Desserts' },
  ];

  // Monitor scroll entry to activate navigation states
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined' && (window as any).isProgrammaticScroll) return;
      const menuSec = document.getElementById('menu');
      if (!menuSec) return;
      const rect = menuSec.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom > 200) {
        setActiveSection('menu');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setActiveSection]);

  // Handle Search and Category Filter
  useEffect(() => {
    let result = menuItems;

    if (selectedCategory !== 'all') {
      result = result.filter((item) => item.category === selectedCategory);
    }

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
      );
    }

    setFilteredItems(result);
  }, [selectedCategory, searchQuery]);

  // Reset visible item count when category or search changes
  useEffect(() => {
    setVisibleCount(6);
  }, [selectedCategory, searchQuery]);

  // Lock body scroll when customization modal is open to prevent background scrolling
  useEffect(() => {
    if (customizingItem) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [customizingItem]);

  // Quick add to cart with default options
  const handleQuickAdd = (item: MenuItem) => {
    addToCart(item);
    setAddedItemId(item.id);
    setTimeout(() => {
      setAddedItemId(null);
    }, 1500);
  };

  // Open customization modal
  const handleOpenCustomize = (item: MenuItem) => {
    setCustomizingItem(item);
    setSauceLevel('regular');
    setSpiceLevel('spicy');
    setBunType('brioche');
    setSelectedAddOns([]);
  };

  // Handle customizations add-on checkboxes
  const toggleAddOn = (addOn: { name: string; price: number }) => {
    setSelectedAddOns((prev) => {
      const exists = prev.find((x) => x.name === addOn.name);
      if (exists) {
        return prev.filter((x) => x.name !== addOn.name);
      }
      return [...prev, addOn];
    });
  };

  // Save customized item to cart
  const handleAddCustomizedToCart = () => {
    if (!customizingItem) return;

    const customizations: ItemCustomization = {
      sauceLevel,
      spiceLevel,
      bunType,
      addOns: selectedAddOns,
    };

    addToCart(customizingItem, customizations);
    setAddedItemId(customizingItem.id);
    setCustomizingItem(null); // Close modal
    setTimeout(() => {
      setAddedItemId(null);
    }, 1500);
  };

  const getTagStyle = (tag: string) => {
    const t = tag.toLowerCase();
    if (t.includes('spicy') || t.includes('🔥') || t.includes('🌶️') || t.includes('fiery') || t.includes('naga')) {
      return {
        icon: <Flame className="w-3 h-3 mr-1 text-red-500 animate-pulse" />,
        className: "bg-red-50/95 text-red-600 border border-red-200/50"
      };
    }
    if (t.includes('choice') || t.includes('select') || t.includes('signature') || t.includes('masterpiece') || t.includes('connoisseur') || t.includes('star') || t.includes('special')) {
      return {
        icon: <Crown className="w-3 h-3 mr-1 text-amber-500" />,
        className: "bg-amber-50/95 text-amber-700 border border-amber-200/50"
      };
    }
    if (t.includes('artisan') || t.includes('gourmet') || t.includes('smoked') || t.includes('shake') || t.includes('sugar') || t.includes('velvet')) {
      return {
        icon: <Gem className="w-3 h-3 mr-1 text-cyan-600" />,
        className: "bg-cyan-50/95 text-cyan-700 border border-cyan-200/50"
      };
    }
    return {
      icon: <Star className="w-3 h-3 mr-1 text-yellow-500 fill-yellow-400" />,
      className: "bg-yellow-50/95 text-yellow-800 border border-yellow-200/50"
    };
  };

  // 3D Parallax Tilt mouse handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;

    // Check if the user is hovering over interactive buttons or the footer
    const target = e.target as HTMLElement;
    if (target.closest('.card-footer') || target.tagName === 'BUTTON' || target.closest('button')) {
      // Reset card transform and exit so buttons are fully clickable and stable
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.boxShadow = '';
      const img = card.querySelector('.parallax-img') as HTMLImageElement;
      if (img) {
        img.style.transform = 'translate3d(0, 0, 0) scale(1)';
      }
      return;
    }

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 8; // max 8 deg
    const rotateY = -((x - centerX) / centerX) * 8; // max 8 deg

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.boxShadow = '0 25px 50px -12px rgba(251, 191, 36, 0.15)';

    const img = card.querySelector('.parallax-img') as HTMLImageElement;
    if (img) {
      // 3D pop-out rising towards the mouse
      img.style.transform = `translate3d(${(x - centerX) * 0.12}px, ${(y - centerY) * 0.12 - 16}px, 50px) scale(1.25)`;
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    card.style.boxShadow = '';

    const img = card.querySelector('.parallax-img') as HTMLImageElement;
    if (img) {
      img.style.transform = 'translate3d(0, 0, 0) scale(1)';
    }
  };

  const isBurgerCategory = customizingItem 
    ? ['beef', 'chicken', 'smasher', 'fish'].includes(customizingItem.category)
    : false;

  const currentCustomTotal = customizingItem
    ? customizingItem.price + selectedAddOns.reduce((sum, a) => sum + a.price, 0)
    : 0;

  return (
    <section id="menu" className="relative py-32 px-4 bg-[#faf6ed] text-zinc-900 overflow-hidden">
      
      {/* Top Wave Divider (flowing from red promo section) */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10 rotate-180">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[45px] md:h-[65px] fill-[#ff2a14]">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V120H0V56.44Z" />
        </svg>
      </div>

      {/* Bottom Wave Divider (flowing into charcoal outlets section) */}
      <div className="absolute bottom-[-2px] left-0 w-full overflow-hidden leading-none z-10 translate-y-[1px]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[45px] md:h-[65px] fill-black">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0H0V56.44Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-20 my-8">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className="text-white bg-[#ff2a14] border border-[#ff2a14]/30 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full select-none">
            Dine In or Delivery
          </span>
          <h2 className="text-4xl md:text-5xl font-black mt-4 tracking-wide uppercase text-zinc-950 font-display">
            EXPLORE THE <span className="text-[#ff2a14]">CHILLOX MENU</span>
          </h2>
          <p className="text-zinc-600 text-sm max-w-lg mx-auto mt-3">
            Order our famous beef cheese blast burgers, crispy smasher burgers, and loaded sides. Customize your spice level and bun toppings below!
          </p>
        </div>

        {/* Filter controls panel */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-6 mb-16 bg-white border-2 border-zinc-950 py-3 px-6 rounded-[2rem] shadow-[4px_4px_0px_#000]">
          
          {/* Tabs Wrapper */}
          <div className="flex-1 min-w-0 relative flex items-center">
            {/* Left Arrow Button */}
            {showLeftArrow && (
              <button
                onClick={scrollLeftDirection}
                className="absolute left-0 z-30 p-2 bg-[#fbbf24] hover:bg-amber-300 text-zinc-950 rounded-full border-2 border-zinc-950 shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] transition-all cursor-pointer"
                title="Scroll Left"
              >
                <ChevronLeft className="w-4 h-4 stroke-[3px]" />
              </button>
            )}

            {/* Tabs */}
            <div
              ref={tabsRef}
              onMouseDown={handleDragMouseDown}
              onMouseMove={handleDragMouseMove}
              onMouseUp={handleDragMouseUp}
              onMouseLeave={handleDragMouseUp}
              onScroll={updateScrollButtons}
              className={`flex-1 min-w-0 flex items-center overflow-x-auto space-x-2 py-1.5 scrollbar-none lg:mr-12 ${getFadeMaskClass()} cursor-grab active:cursor-grabbing select-none`}
            >
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    if (!hasDragged) {
                      setSelectedCategory(cat.id);
                    }
                  }}
                  className={`flex-shrink-0 px-4.5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap border-2 border-zinc-950 ${
                    selectedCategory === cat.id
                      ? 'bg-[#ff2a14] text-white shadow-[2px_2px_0px_#000] translate-x-[-1px] translate-y-[-1px]'
                      : 'bg-white hover:bg-zinc-50 text-zinc-800 shadow-[1px_1px_0px_#000] hover:translate-x-[-0.5px] hover:translate-y-[-0.5px] hover:shadow-[1.5px_1.5px_0px_#000] active:translate-x-[0.5px] active:translate-y-[0.5px] active:shadow-[0.5px_0.5px_0px_#000]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
              {/* Spacer to allow scrolling the last item fully out of the fade zone */}
              <div className="w-12 flex-shrink-0 h-4" />
            </div>

            {/* Right Arrow Button */}
            {showRightArrow && (
              <button
                onClick={scrollRightDirection}
                className="absolute right-0 lg:right-6 z-30 p-2 bg-[#fbbf24] hover:bg-amber-300 text-zinc-950 rounded-full border-2 border-zinc-950 shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] transition-all cursor-pointer"
                title="Scroll Right"
              >
                <ChevronRight className="w-4 h-4 stroke-[3px]" />
              </button>
            )}
          </div>

          {/* Solid Neo-Brutalist vertical divider for desktop */}
          <div className="hidden lg:block w-[2px] h-8 bg-zinc-950 flex-shrink-0 mx-2" />

          {/* Search bar */}
          <div className="relative w-full lg:w-80 flex-shrink-0">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search food item..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => {
                // Delay blur to allow clicks on the clear button to execute
                setTimeout(() => setIsSearchFocused(false), 200);
              }}
              className="w-full bg-white border-2 border-zinc-950 focus:border-[#ff2a14] focus:outline-none py-2.5 pl-11 pr-24 rounded-full text-xs transition-all text-zinc-900 placeholder-zinc-400 shadow-[1px_1px_0px_#000] focus:shadow-[2px_2px_0px_#000] focus:translate-x-[-0.5px] focus:translate-y-[-0.5px]"
            />
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-all duration-300 ${
              isSearchFocused ? 'text-[#ff2a14] scale-110 rotate-12' : 'text-zinc-400'
            }`} />

            {/* Interactive Right elements */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-1.5 pointer-events-auto">
              {/* Keyboard Helper Badge */}
              {!searchQuery && !isSearchFocused && (
                <kbd className="hidden sm:inline-flex items-center justify-center w-5 h-5 text-[10px] font-black text-zinc-400 bg-zinc-50 border border-zinc-950/20 rounded shadow-[1px_1px_0px_rgba(0,0,0,0.15)] font-mono select-none pointer-events-none">
                  /
                </kbd>
              )}

              {/* Items Found Badge */}
              {searchQuery && (
                <span className="text-[9px] font-black uppercase bg-[#ff2a14]/10 text-[#ff2a14] border border-[#ff2a14]/25 px-2 py-0.5 rounded-full select-none">
                  {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
                </span>
              )}

              {/* Clear button */}
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    searchInputRef.current?.focus();
                  }}
                  className="p-1 hover:bg-zinc-100 rounded-full border border-zinc-950/15 text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5 stroke-[3px]" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-white border-2 border-zinc-950 rounded-[2rem] shadow-[4px_4px_0px_#000]">
            <p className="text-zinc-800 font-bold">No items found matching your search.</p>
            <p className="text-xs text-zinc-500 mt-1">Try another keyword or category filter!</p>
          </div>
        ) : (
          <div className="space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {(selectedCategory === 'all'
                ? filteredItems.slice(0, visibleCount)
                : filteredItems
              ).map((item) => (
                <div
                  key={item.id}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{ transition: 'transform 0.1s ease, box-shadow 0.3s ease' }}
                  className="bg-white border-3 border-zinc-950 rounded-[2.5rem] p-6 flex flex-col justify-between relative shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-300 transform-gpu group [transform-style:preserve-3d]"
                >
                  <div>
                    {/* Bounding box for image (no overflow-hidden, so pop-out works!) */}
                    <div className="h-48 bg-[#ff2a14] border-b-2 border-zinc-950 flex items-center justify-center relative mb-6 select-none -mx-6 -mt-6 rounded-t-[2.2rem] rounded-b-[2rem]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="parallax-img w-full h-full object-contain p-3.5 z-10 filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.12)] group-hover:drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)] pointer-events-none"
                        style={{ transformStyle: 'preserve-3d', transition: 'transform 0.15s ease-out' }}
                      />
                    </div>

                    {/* Header metadata */}
                    <div className="flex justify-between items-start space-x-2 px-1">
                      <h3 className="text-xl font-black tracking-tight uppercase leading-tight text-zinc-950 font-display group-hover:text-[#ff2a14] transition-colors">
                        {item.name}
                      </h3>
                    </div>

                    {/* Description & Badge Tags Row */}
                    <div className="flex justify-between items-start space-x-3 mt-2.5 px-1">
                      {/* Description */}
                      <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2 flex-grow">
                        {item.description}
                      </p>

                      {/* Badge tags */}
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-col gap-1 items-end flex-shrink-0">
                          {item.tags.map((tag, tIdx) => {
                            const style = getTagStyle(tag);
                            return (
                              <span
                                key={tIdx}
                                className={`text-[8px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md flex items-center shadow-sm select-none whitespace-nowrap ${style.className}`}
                              >
                                {style.icon}
                                {tag}
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Pricing & Add to Cart footer */}
                  <div className="card-footer flex flex-col border-t border-zinc-950/5 pt-4 mt-6 z-30 relative">
                    <div className="flex items-center justify-between mb-4 px-1">
                      <div className="flex flex-col">
                        <span className="text-[9px] text-zinc-400 uppercase tracking-widest font-extrabold">Base Price</span>
                        <span className="text-2xl font-black text-[#ff2a14]">Tk {item.price}</span>
                      </div>

                      {item.calories && (
                        <span className="text-[10px] bg-zinc-100 text-zinc-600 px-2.5 py-1 rounded-lg font-bold font-sans">
                          {item.calories} kcal
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {/* Quick Add Button */}
                      <button
                        onClick={() => handleQuickAdd(item)}
                        className={`h-11 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5 border-2 border-zinc-950 transition-all ${
                          addedItemId === item.id
                            ? 'bg-emerald-500 text-white border-zinc-950 shadow-[2px_2px_0px_#000]'
                            : 'bg-white hover:bg-zinc-50 text-zinc-900 shadow-[2px_2px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000]'
                        }`}
                      >
                        {addedItemId === item.id ? (
                          <>
                            <Check className="w-4 h-4 stroke-[3px]" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-4 h-4" />
                            <span>Quick Add</span>
                          </>
                        )}
                      </button>

                      {/* Customize Button */}
                      <button
                        onClick={() => handleOpenCustomize(item)}
                        className="h-11 bg-amber-400 hover:bg-amber-300 text-zinc-950 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5 border-2 border-zinc-950 shadow-[2px_2px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] transition-all"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Customize</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedCategory === 'all' && filteredItems.length > visibleCount && (
              <div className="flex justify-center mt-12">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="px-8 py-3.5 bg-zinc-950 hover:bg-[#ff2a14] text-white font-black uppercase text-xs rounded-2xl border-2 border-zinc-950 hover:border-[#ff2a14] shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] hover:translate-x-[-1.5px] hover:translate-y-[-1.5px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0px_#000] transition-all duration-200 cursor-pointer"
                >
                  Load More Items
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3D-feel Interactive Customize Modal */}
      {customizingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <div 
            onClick={() => setCustomizingItem(null)} 
            className="fixed inset-0 bg-zinc-950/80 backdrop-blur-md transition-opacity" 
          />

          {/* Modal Container */}
          <div className="relative bg-white text-zinc-900 rounded-[2.5rem] border-3 border-zinc-950 max-w-3xl w-full overflow-hidden shadow-[10px_10px_0px_#000] animate-fade-in flex flex-col md:flex-row max-h-[90vh]">
            
            {/* Close Button */}
            <button
              onClick={() => setCustomizingItem(null)}
              className="absolute top-4 right-4 p-2 bg-zinc-100 hover:bg-zinc-200 rounded-full border border-zinc-950/10 z-30 transition-colors"
            >
              <X className="w-4 h-4 text-zinc-800" />
            </button>

            {/* Left: Product visual preview */}
            <div className="md:w-[40%] bg-[#faf6ed]/20 flex flex-col justify-start border-b md:border-b-0 md:border-r-2 border-zinc-950/10 relative overflow-hidden select-none">
              
              {/* Product Hero Image Area */}
              <div className="w-full h-48 md:h-72 relative overflow-hidden bg-[#ff2a14] border-b-2 border-zinc-950 flex-shrink-0">
                <img
                  src={customizingItem.image}
                  alt={customizingItem.name}
                  className="w-full h-full object-cover select-none pointer-events-none"
                />
              </div>

              {/* Structured Title and Description */}
              <div className="p-6 md:p-8 flex flex-col justify-start text-center md:text-left">
                <h3 className="text-2xl font-black uppercase tracking-tight text-[#ff2a14] font-display animate-slide-up-fade opacity-0 [animation-delay:100ms]">
                  {customizingItem.name}
                </h3>
                <p className="text-xs text-zinc-600 mt-3 leading-relaxed animate-slide-up-fade opacity-0 [animation-delay:250ms] font-medium">
                  {customizingItem.description}
                </p>
              </div>
            </div>

            {/* Right: Customization Controls */}
            <div className="md:w-[60%] flex flex-col justify-between max-h-[50vh] md:max-h-[80vh] overflow-y-auto p-6 md:p-8 scrollbar-none">
              
              <div className="space-y-6">
                
                {/* 1. Bun / Sauce / Spice Customizers */}
                {isBurgerCategory && (
                  <>
                    {/* Bun type selector */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-black uppercase tracking-widest text-[#ff2a14] border-b border-[#ff2a14]/10 pb-1">
                        Choose Your Bun
                      </h4>
                      <div className="grid grid-cols-2 gap-2.5">
                        <button
                          type="button"
                          onClick={() => setBunType('brioche')}
                          className={`py-2 px-3 text-xs font-bold uppercase rounded-xl border-2 transition-all ${
                            bunType === 'brioche'
                              ? 'border-[#ff2a14] bg-[#ff2a14]/5 text-[#ff2a14]'
                              : 'border-zinc-950/10 text-zinc-600 hover:border-zinc-950/20 bg-white'
                          }`}
                        >
                          Brioche Bun
                        </button>
                        <button
                          type="button"
                          onClick={() => setBunType('sesame')}
                          className={`py-2 px-3 text-xs font-bold uppercase rounded-xl border-2 transition-all ${
                            bunType === 'sesame'
                              ? 'border-[#ff2a14] bg-[#ff2a14]/5 text-[#ff2a14]'
                              : 'border-zinc-950/10 text-zinc-600 hover:border-zinc-950/20 bg-white'
                          }`}
                        >
                          Sesame Bun
                        </button>
                      </div>
                    </div>

                    {/* Sauce level control */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="text-xs font-black uppercase tracking-widest text-[#ff2a14] border-b border-[#ff2a14]/10 pb-1 flex-grow mr-2">
                          Sauce Level
                        </h4>
                        <span className="text-[9px] bg-[#ff2a14]/10 text-[#ff2a14] px-2 py-0.5 rounded font-black capitalize whitespace-nowrap">
                          {sauceLevel} Sauce
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-1.5">
                        {['no', 'less', 'regular', 'more'].map((sLevel) => (
                          <button
                            key={sLevel}
                            type="button"
                            onClick={() => setSauceLevel(sLevel)}
                            className={`py-2 text-[10px] font-black uppercase rounded-lg border transition-all ${
                              sauceLevel === sLevel
                                ? 'bg-amber-400 text-zinc-950 border-zinc-950 shadow-[1px_1px_0px_#000]'
                                : 'bg-white border-zinc-950/10 text-zinc-700 hover:bg-zinc-50'
                            }`}
                          >
                            {sLevel}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Spice Level selection */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="text-xs font-black uppercase tracking-widest text-[#ff2a14] border-b border-[#ff2a14]/10 pb-1 flex-grow mr-2">
                          Spice Level
                        </h4>
                        <span className="text-[9px] bg-red-600/10 text-red-600 px-2 py-0.5 rounded font-black capitalize flex items-center whitespace-nowrap">
                          <Flame className="w-2.5 h-2.5 mr-1 animate-pulse" />
                          {spiceLevel === 'naga' ? 'Extreme Naga' : spiceLevel}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-1.5">
                        {['mild', 'spicy', 'very-spicy', 'naga'].map((sLevel) => (
                          <button
                            key={sLevel}
                            type="button"
                            onClick={() => setSpiceLevel(sLevel)}
                            className={`py-2 text-[10px] font-black uppercase rounded-lg border transition-all ${
                              spiceLevel === sLevel
                                ? 'bg-red-600 text-white border-zinc-950 shadow-[1px_1px_0px_#000]'
                                : 'bg-white border-zinc-950/10 text-zinc-700 hover:bg-zinc-50'
                            }`}
                          >
                            {sLevel === 'naga' ? 'Naga 🔥' : sLevel}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* 2. Toppings list */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-black uppercase tracking-widest text-[#ff2a14] border-b border-[#ff2a14]/10 pb-1">
                    Add Toppings
                  </h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                    {TOPPING_OPTIONS.map((addon) => {
                      const isSelected = selectedAddOns.some((x) => x.name === addon.name);

                      return (
                        <button
                          key={addon.name}
                          type="button"
                          onClick={() => toggleAddOn(addon)}
                          className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all text-left text-xs font-black ${
                            isSelected
                              ? 'border-amber-400 bg-amber-400/5 text-zinc-900 shadow-[1px_1px_0px_rgba(0,0,0,0.05)]'
                              : 'border-zinc-950/10 hover:border-zinc-950/20 bg-white text-zinc-700'
                          }`}
                        >
                          <span className="flex items-center">
                            <span className={`w-4 h-4 border-2 rounded mr-3 flex items-center justify-center ${
                              isSelected ? 'border-amber-400 bg-amber-400 text-zinc-950' : 'border-zinc-950/20 bg-zinc-50'
                            }`}>
                              {isSelected && <Check className="w-3 h-3 stroke-[3px]" />}
                            </span>
                            {addon.name}
                          </span>
                          <span className="text-[#ff2a14]">+ {addon.price} <span className="text-[10px] font-bold text-zinc-500">Tk</span></span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Subtotal and Place to Cart */}
              <div className="border-t border-zinc-950/10 pt-4 mt-6 flex items-center justify-between bg-zinc-50 -mx-6 -mb-6 p-6">
                <div className="flex items-baseline space-x-2">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-black">Total Price:</span>
                  <span className="text-2xl font-black text-[#ff2a14]">
                    {currentCustomTotal}
                    <span className="text-sm font-bold text-zinc-500 ml-1">Tk</span>
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleAddCustomizedToCart}
                  className="h-12 px-6 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-black uppercase text-xs tracking-wider rounded-2xl border-2 border-zinc-950 shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] transition-all flex items-center space-x-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add Customized</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
};
export default MenuSection;
