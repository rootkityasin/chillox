'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { menuItems } from '../data/menuData';
import { Mail, MessageSquare, Send, CheckCircle, Star } from 'lucide-react';

export const FeedbackSection: React.FC = () => {
  const { setActiveSection } = useCart();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [selectedBurger, setSelectedBurger] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Monitor scroll entry
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined' && (window as any).isProgrammaticScroll) return;
      const contactSec = document.getElementById('contact');
      if (!contactSec) return;
      const rect = contactSec.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom > 200) {
        setActiveSection('contact');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setActiveSection]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;

    setIsSubmitting(true);
    // Simulate API delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail('');
      setMessage('');
      setRating(5);
      setSelectedBurger('');
    }, 1800);
  };

  const RATING_OPTIONS = [
    { value: 1, label: 'Awful', activeColor: 'text-red-500 fill-red-500', glowColor: 'rgba(239, 68, 68, 0.4)', badgeBg: 'bg-red-500/10 text-red-400 border-red-500/20' },
    { value: 2, label: 'Meh', activeColor: 'text-orange-500 fill-orange-500', glowColor: 'rgba(249, 115, 22, 0.4)', badgeBg: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
    { value: 3, label: 'Okay', activeColor: 'text-yellow-500 fill-yellow-500', glowColor: 'rgba(234, 179, 8, 0.4)', badgeBg: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
    { value: 4, label: 'Great', activeColor: 'text-lime-400 fill-lime-400', glowColor: 'rgba(163, 230, 53, 0.4)', badgeBg: 'bg-lime-500/10 text-lime-400 border-lime-500/20' },
    { value: 5, label: 'Perfect', activeColor: 'text-emerald-400 fill-emerald-400', glowColor: 'rgba(52, 211, 153, 0.4)', badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  ];

  const activeRating = hoverRating ?? rating;
  const activeOption = RATING_OPTIONS.find(o => o.value === activeRating)!;

  return (
    <section id="contact" className="py-24 pb-32 px-4 bg-[#fbbf24] text-zinc-950 relative">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-white bg-zinc-950 border border-zinc-900 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full select-none">
            Share Opinion
          </span>
          <h2 className="text-4xl md:text-5xl font-black mt-4 tracking-wide uppercase text-zinc-950 font-display">
            FEEDBACK & <span className="text-[#ff2a14]">CONTACT</span>
          </h2>
          <p className="text-zinc-800 text-sm max-w-lg mx-auto mt-3 font-semibold">
            Got feedback on our burgers? Want to collaborate? Drop us a line below, we read every single message!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 bg-zinc-950 text-white border border-zinc-800 rounded-[2.5rem] p-6 md:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Accent decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff2a14]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Sidebar content */}
          <div className="md:col-span-2 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl font-black tracking-wide uppercase text-[#ff2a14]">
                GET IN TOUCH
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-semibold">
                Chillox is committed to serving the best burgers in the city. Your comments help us improve!
              </p>
            </div>

            <div className="space-y-4 text-xs font-bold text-zinc-200">
              <div className="flex items-center space-x-3.5">
                <Mail className="w-4.5 h-4.5 text-[#ff2a14] flex-shrink-0" />
                <span>support@chilloxburger.com</span>
              </div>
              <div className="flex items-center space-x-3.5">
                <MessageSquare className="w-4.5 h-4.5 text-[#ff2a14] flex-shrink-0" />
                <span>facebook.com/chillox</span>
              </div>
            </div>

            {/* Social media connections */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-black text-zinc-500 tracking-wider uppercase">Follow Us</h4>
              <div className="flex space-x-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-zinc-900 hover:bg-[#ff2a14] text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-950 transition-all duration-300 shadow-md hover:-translate-y-0.5"
                  aria-label="Facebook"
                >
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                  </svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-zinc-900 hover:bg-[#ff2a14] text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-950 transition-all duration-300 shadow-md hover:-translate-y-0.5"
                  aria-label="Instagram"
                >
                  <svg className="w-4.5 h-4.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Form area */}
          <div className="md:col-span-3 border-t md:border-t-0 md:border-l border-zinc-800 pt-6 md:pt-0 md:pl-8">
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-8 animate-fade-in">
                <div className="w-16 h-16 bg-emerald-950/50 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(52,211,153,0.15)]">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-black text-emerald-400 uppercase tracking-wider">THANK YOU!</h4>
                <p className="text-xs text-zinc-400 mt-1.5 max-w-[240px] font-bold">
                  Your review has been successfully transmitted. We value your feedback!
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-850 text-xs font-black uppercase rounded-xl tracking-wider transition-all hover:scale-105 active:scale-95 text-white"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black tracking-widest text-zinc-400 block uppercase">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g., name@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-[#ff2a14] focus:ring-2 focus:ring-[#ff2a14]/15 focus:outline-none p-3.5 rounded-xl text-sm transition-all text-white placeholder-zinc-500"
                  />
                </div>

                <div className="space-y-1.5 relative">
                  <label className="text-[10px] font-black tracking-widest text-zinc-400 block uppercase">
                    Favorite Burger / Item (Optional)
                  </label>
                  <div className="relative">
                    <select
                      value={selectedBurger}
                      onChange={(e) => setSelectedBurger(e.target.value)}
                      className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-[#ff2a14] focus:ring-2 focus:ring-[#ff2a14]/15 focus:outline-none p-3.5 pr-10 rounded-xl text-sm transition-all text-white cursor-pointer appearance-none"
                    >
                      <option value="" className="bg-zinc-950 text-white">-- Choose Food Item --</option>
                      {menuItems.map((item) => (
                        <option key={item.id} value={item.name} className="bg-zinc-950 text-white">
                          {item.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500 font-bold text-xs">
                      ▼
                    </div>
                  </div>
                </div>

                {/* Star rating picker - clean, interactive, modern */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black tracking-widest text-zinc-400 block uppercase">
                      How was it?
                    </label>
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border transition-all duration-300 ${activeOption.badgeBg}`}>
                      {activeOption.label}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 py-1">
                    {[1, 2, 3, 4, 5].map((num) => {
                      const isLit = num <= activeRating;
                      let starStyle = 'text-zinc-700 fill-none';
                      let filterStyle = undefined;

                      if (isLit) {
                        starStyle = activeOption.activeColor;
                        filterStyle = { filter: `drop-shadow(0 0 6px ${activeOption.glowColor})` };
                      }

                      return (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setRating(num)}
                          onMouseEnter={() => setHoverRating(num)}
                          onMouseLeave={() => setHoverRating(null)}
                          className="p-1 transition-transform duration-150 hover:scale-125 active:scale-90 focus:outline-none"
                          aria-label={`Rate ${num} stars`}
                        >
                          <Star
                            style={filterStyle}
                            className={`w-8 h-8 stroke-[1.5] transition-all duration-200 ${starStyle}`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black tracking-widest text-zinc-400 block uppercase">
                    Message / Review
                  </label>
                  <textarea
                    required
                    maxLength={300}
                    rows={4}
                    placeholder="How was the meat juiciness? Were the wings hot enough?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-[#ff2a14] focus:ring-2 focus:ring-[#ff2a14]/15 focus:outline-none p-3.5 rounded-xl text-sm transition-all text-white placeholder-zinc-500 resize-none"
                  />
                  <div className="flex justify-between items-center text-[9px] font-extrabold uppercase tracking-wider text-zinc-500 px-1 mt-1">
                    <span>Max 300 characters</span>
                    <span className={message.length >= 280 ? 'text-[#ff2a14] font-black' : ''}>
                      {message.length} / 300
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 bg-[#ff2a14] hover:bg-[#e0220f] disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-black uppercase rounded-xl text-xs tracking-wider flex items-center justify-center space-x-2 transition-all shadow-[0_4px_12px_rgba(255,42,20,0.2)] hover:shadow-[0_6px_20px_rgba(255,42,20,0.3)] active:scale-[0.98] group overflow-hidden"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <span className="animate-pulse">Transmitting...</span>
                      <Send className="w-3.5 h-3.5 animate-bounce text-white/50" />
                    </div>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Wave Divider (flowing into black footer) */}
      <div className="absolute bottom-[-2px] left-0 w-full overflow-hidden leading-none z-10 translate-y-[1px]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[45px] md:h-[65px] fill-black">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0H0V56.44Z" />
        </svg>
      </div>
    </section>
  );
};
export default FeedbackSection;
