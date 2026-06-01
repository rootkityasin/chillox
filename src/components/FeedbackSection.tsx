'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { menuItems } from '../data/menuData';
import { Mail, MessageSquare, Send, CheckCircle } from 'lucide-react';

export const FeedbackSection: React.FC = () => {
  const { setActiveSection } = useCart();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(5);
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

  const getRatingLabel = (r: number) => {
    switch (r) {
      case 1: return { text: 'Terrible', bg: 'bg-red-600',    border: 'border-red-700' };
      case 2: return { text: 'Bad',      bg: 'bg-orange-500', border: 'border-orange-600' };
      case 3: return { text: 'Average',  bg: 'bg-yellow-400', border: 'border-yellow-500' };
      case 4: return { text: 'Good',     bg: 'bg-lime-500',   border: 'border-lime-600' };
      case 5: return { text: 'Incredible', bg: 'bg-emerald-500', border: 'border-emerald-600' };
      default: return { text: '', bg: '', border: '' };
    }
  };

  const ratingLabel = getRatingLabel(rating);

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

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 bg-black text-white border-2 border-zinc-950 rounded-[2.5rem] p-6 md:p-10 shadow-[6px_6px_0px_#000] relative overflow-hidden">
          
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
                  className="p-2.5 rounded-full bg-zinc-900 hover:bg-[#ff2a14] text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-950 transition-all duration-300 shadow-[1px_1px_0px_rgba(0,0,0,0.5)] hover:shadow-[2px_2px_0px_rgba(0,0,0,0.5)] hover:translate-x-[-0.5px] hover:translate-y-[-0.5px]"
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
                  className="p-2.5 rounded-full bg-zinc-900 hover:bg-[#ff2a14] text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-950 transition-all duration-300 shadow-[1px_1px_0px_rgba(0,0,0,0.5)] hover:shadow-[2px_2px_0px_rgba(0,0,0,0.5)] hover:translate-x-[-0.5px] hover:translate-y-[-0.5px]"
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
                <div className="w-16 h-16 bg-emerald-950 border-2 border-zinc-950 text-emerald-400 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-black text-emerald-400">THANK YOU!</h4>
                <p className="text-xs text-zinc-400 mt-1.5 max-w-[240px] font-bold">
                  Your review has been successfully transmitted. We value your feedback!
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 px-6 py-2 bg-white hover:bg-zinc-100 border-2 border-zinc-950 text-xs font-black uppercase rounded-full tracking-wider transition-all shadow-[2px_2px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000]"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black tracking-widest text-zinc-300 block uppercase">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g., name@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border-2 border-zinc-950 focus:border-[#ff2a14] focus:outline-none p-3.5 rounded-xl text-sm transition-all text-zinc-900 placeholder-zinc-400 shadow-[1px_1px_0px_#000] focus:shadow-[2px_2px_0px_#000] focus:translate-x-[-0.5px] focus:translate-y-[-0.5px]"
                  />
                </div>

                <div className="space-y-1.5 relative">
                  <label className="text-[10px] font-black tracking-widest text-zinc-300 block uppercase">
                    Favorite Burger / Item (Optional)
                  </label>
                  <div className="relative">
                    <select
                      value={selectedBurger}
                      onChange={(e) => setSelectedBurger(e.target.value)}
                      className="w-full bg-white border-2 border-zinc-950 focus:border-[#ff2a14] focus:outline-none p-3.5 pr-10 rounded-xl text-sm transition-all text-zinc-900 shadow-[1px_1px_0px_#000] focus:shadow-[2px_2px_0px_#000] focus:translate-x-[-0.5px] focus:translate-y-[-0.5px] cursor-pointer font-bold appearance-none"
                    >
                      <option value="">-- Choose Food Item --</option>
                      {menuItems.map((item) => (
                        <option key={item.id} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500 font-bold text-xs">
                      ▼
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black tracking-widest text-zinc-300 block uppercase">
                      Burger Rating
                    </label>
                    {ratingLabel.text && (
                      <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full text-white border ${ratingLabel.bg} ${ratingLabel.border} select-none transition-all`}>
                        {ratingLabel.text}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setRating(n)}
                        className={`flex-1 h-9 rounded-lg border-2 border-zinc-950 font-black text-xs transition-all shadow-[2px_2px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#000] active:translate-x-[0.5px] active:translate-y-[0.5px] active:shadow-[1px_1px_0px_#000] ${
                          n <= rating
                            ? 'bg-[#fbbf24] text-zinc-950'
                            : 'bg-zinc-800 text-zinc-500 hover:bg-zinc-700'
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black tracking-widest text-zinc-300 block uppercase">
                    Message / Review
                  </label>
                  <textarea
                    required
                    maxLength={300}
                    rows={4}
                    placeholder="How was the meat juiciness? Were the wings hot enough?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-white border-2 border-zinc-950 focus:border-[#ff2a14] focus:outline-none p-3.5 rounded-xl text-sm transition-all text-zinc-900 placeholder-zinc-400 shadow-[1px_1px_0px_#000] focus:shadow-[2px_2px_0px_#000] focus:translate-x-[-0.5px] focus:translate-y-[-0.5px] resize-none"
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
                  className="w-full h-11 bg-[#ff2a14] hover:bg-[#fbbf24] hover:text-zinc-950 disabled:bg-zinc-800 disabled:text-zinc-500 disabled:border-zinc-700 text-white font-black uppercase rounded-xl text-xs tracking-wider flex items-center justify-center space-x-2 border-2 border-zinc-950 shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] transition-all group overflow-hidden"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <span className="animate-pulse">Transmitting...</span>
                      <Send className="w-3.5 h-3.5 animate-bounce text-[#ff2a14]" />
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
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[45px] md:h-[65px] fill-black">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0H0V56.44Z" />
        </svg>
      </div>
    </section>
  );
};
export default FeedbackSection;
