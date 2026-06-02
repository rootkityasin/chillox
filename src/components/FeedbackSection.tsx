'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { menuItems } from '../data/menuData';
import { Camera, Check, X, FileImage, ChevronsUpDown } from 'lucide-react';

export const FeedbackSection: React.FC = () => {
  const { setActiveSection } = useCart();
  const [selectedBurger, setSelectedBurger] = useState('');
  const [sliderValue, setSliderValue] = useState<number>(15); // Scale of 1 to 100
  const [note, setNote] = useState('');
  const [showNote, setShowNote] = useState(false);
  const [photos, setPhotos] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handlePhotoUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setPhotos(prev => [...prev, ...filesArray]);
    }
  };

  const handleRemovePhoto = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotos(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setSelectedBurger('');
      setSliderValue(15);
      setNote('');
      setPhotos([]);
      setShowNote(false);
    }, 1800);
  };

  // Determine feedback text and face mood based on slider value (1-100)
  const getFeedbackLabel = () => {
    if (sliderValue <= 33) return 'TERRIBLE';
    if (sliderValue > 33 && sliderValue <= 66) return 'OKAY';
    return 'GOOD';
  };

  // Calculate SVG quadratic bezier curve mouth coordinate dynamically
  // 62 is extremely sad (curves up), 75 is flat (neutral), 88 is extremely happy (curves down)
  const mouthControlY = 62 + (sliderValue - 1) * (26 / 99);

  // Dynamic card styling based on rating
  const getCardBgColor = () => {
    if (sliderValue <= 33) return 'bg-[#ff2a14]'; // Brand Red (Bad)
    if (sliderValue > 33 && sliderValue <= 66) return 'bg-[#fbbf24]'; // Brand Yellow (Okay)
    return 'bg-[#22c55e]'; // Green (Good)
  };

  const getAddNoteBgColor = () => {
    if (sliderValue <= 33) return 'bg-[#ff8787] hover:bg-[#ff7070]';
    if (sliderValue > 33 && sliderValue <= 66) return 'bg-[#faf6ed] hover:bg-[#eae6dd]';
    return 'bg-[#a7f3d0] hover:bg-[#86efac]';
  };

  return (
    <section id="contact" className="py-24 pb-32 px-4 bg-[#fbbf24] text-zinc-950 relative select-none">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
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

        {/* Main Feedback Card Component */}
        <div className={`${getCardBgColor()} text-[#122415] border-3 border-zinc-950 rounded-[2.5rem] shadow-[8px_8px_0px_#000] overflow-hidden grid grid-cols-1 md:grid-cols-5 relative min-h-[480px] transition-colors duration-500`}>
          
          {isSubmitted ? (
            <div className={`col-span-1 md:col-span-5 flex flex-col items-center justify-center text-center p-12 space-y-4 animate-fade-in ${getCardBgColor()} min-h-[480px] transition-colors duration-500`}>
              <div className="w-20 h-20 rounded-full border-3 border-[#122415] bg-[#122415] text-[#ff2a14] flex items-center justify-center shadow-lg">
                <Check className="w-10 h-10 stroke-[3px]" />
              </div>
              <h3 className="text-3xl font-serif font-black text-[#122415] uppercase tracking-wide">
                Review Submitted
              </h3>
              <p className="text-[#122415]/90 text-sm max-w-sm font-semibold">
                Thank you for sharing your feedback with us! We appreciate your opinion.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-4 px-6 py-3 bg-[#122415] hover:bg-[#1a3821] border-2 border-zinc-950 text-white text-xs font-black uppercase rounded-2xl tracking-widest transition-all shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000]"
              >
                Send Another Review
              </button>
            </div>
          ) : (
            <>
              {/* Left Column - Dynamic Mood Face */}
              <div className="col-span-1 md:col-span-2 flex flex-col justify-center items-center p-8 md:p-12 border-b-2 md:border-b-0 md:border-r-2 border-zinc-950/15 text-center min-h-[220px]">
                
                {/* Mood Face SVG */}
                <svg viewBox="0 0 100 100" className="w-32 h-32 text-[#122415] fill-current">
                  {/* Left Eye */}
                  <circle cx="35" cy="45" r="11" />
                  {/* Right Eye */}
                  <circle cx="65" cy="45" r="11" />
                  {/* Quadratic Bezier Mouth Curve */}
                  <path
                    d={`M 30,75 Q 50,${mouthControlY} 70,75`}
                    stroke="currentColor"
                    strokeWidth="7"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>

                {/* Status Text (Georgia Serif Font) */}
                <h3 className="text-4xl md:text-5xl font-serif font-black uppercase tracking-tight text-[#122415] mt-8 leading-none select-none">
                  {getFeedbackLabel()}
                </h3>
              </div>

              {/* Right Column - Feedback Inputs */}
              <div className="col-span-1 md:col-span-3 p-8 md:p-12 flex flex-col justify-between space-y-6">
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-serif font-black text-[#122415] leading-tight select-none mt-2">
                    How was your shopping experience?
                  </h3>

                  {/* Product Selector Dropdown */}
                  <div className="relative">
                    <select
                      value={selectedBurger}
                      onChange={(e) => setSelectedBurger(e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded-[2rem] py-4 px-6 pr-12 text-sm font-medium text-zinc-800 cursor-pointer appearance-none focus:outline-none focus:ring-2 focus:ring-zinc-950/10 shadow-sm"
                    >
                      <option value="">Select Product...</option>
                      {menuItems.map((item) => (
                        <option key={item.id} value={item.name} className="font-sans text-zinc-800">
                          {item.name}
                        </option>
                      ))}
                    </select>
                    <ChevronsUpDown className="w-4.5 h-4.5 text-zinc-400 absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  {/* Slider Control */}
                  <div className="space-y-2">
                    <div className="relative flex items-center pt-2">
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value={sliderValue}
                        onChange={(e) => setSliderValue(Number(e.target.value))}
                        className="w-full h-1 bg-[#122415]/20 rounded-lg appearance-none cursor-pointer accent-[#122415] focus:outline-none"
                        style={{
                          background: `linear-gradient(to right, #122415 0%, #122415 ${sliderValue}%, rgba(18, 36, 21, 0.15) ${sliderValue}%, rgba(18, 36, 21, 0.15) 100%)`
                        }}
                      />
                    </div>
                    {/* Slider Scale Labels */}
                    <div className="flex justify-between items-center text-[9px] font-black uppercase text-[#122415] tracking-widest px-0.5 select-none">
                      <span className={sliderValue <= 33 ? 'scale-110 font-extrabold' : 'opacity-60'}>Bad</span>
                      <span className={sliderValue > 33 && sliderValue <= 66 ? 'scale-110 font-extrabold' : 'opacity-60'}>Okay</span>
                      <span className={sliderValue > 66 ? 'scale-110 font-extrabold' : 'opacity-60'}>Good</span>
                    </div>
                  </div>

                  {/* Dynamic Note text field toggler */}
                  {showNote && (
                    <div className="space-y-1.5 animate-slide-down-fade">
                      <textarea
                        required
                        rows={3}
                        maxLength={250}
                        placeholder="Write your review here..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="w-full bg-white border-2 border-zinc-950 focus:outline-none p-3 rounded-xl text-xs text-zinc-800 placeholder-zinc-400 resize-none font-semibold"
                      />
                    </div>
                  )}

                  {/* Photo Uploader */}
                  <div
                    onClick={handlePhotoUploadClick}
                    className="border-2 border-dashed border-[#122415]/30 rounded-2xl p-4 hover:bg-[#122415]/5 cursor-pointer transition-colors flex flex-col items-center justify-center text-center select-none"
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoChange}
                    />
                    <div className="flex items-center space-x-2 text-xs font-black text-[#122415]">
                      <Camera className="w-4.5 h-4.5" />
                      <span>Add Photos</span>
                    </div>

                    {/* Photo Thumbnails */}
                    {photos.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3 justify-center">
                        {photos.map((file, idx) => (
                          <div key={idx} className="relative w-10 h-10 border border-zinc-950/20 rounded bg-white overflow-hidden flex items-center justify-center group">
                            <FileImage className="w-5 h-5 text-zinc-400" />
                            <button
                              type="button"
                              onClick={(e) => handleRemovePhoto(idx, e)}
                              className="absolute inset-0 bg-red-600/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Form Action Controls */}
                  <div className="grid grid-cols-5 gap-3.5 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowNote(!showNote)}
                      className={`col-span-2 h-12 ${getAddNoteBgColor()} text-[#122415] rounded-2xl font-black text-xs uppercase tracking-widest border-2 border-zinc-950 transition-colors shadow-sm select-none`}
                    >
                      {showNote ? 'Hide Note' : 'Add Note'}
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="col-span-3 h-12 bg-[#122415] hover:bg-[#1a3821] disabled:bg-zinc-800 disabled:text-zinc-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest border-2 border-zinc-950 transition-colors shadow-sm select-none"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Review'}
                    </button>
                  </div>

                </form>

              </div>
            </>
          )}

        </div>

      </div>
    </section>
  );
};

export default FeedbackSection;
