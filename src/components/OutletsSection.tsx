'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { MapPin, Phone, Clock, Compass } from 'lucide-react';

interface Outlet {
  name: string;
  address: string;
  phone: string;
  hours: string;
  mapsUrl: string;
  region: 'north' | 'south';
}

const OUTLETS_DATA: Outlet[] = [
  {
    name: 'Chillox Dhanmondi',
    address: 'Green Delizia, House 39 (Ground Floor), Road 27, Dhanmondi, Dhaka 1209',
    phone: '01712-345678',
    hours: '11:00 AM - 11:00 PM',
    mapsUrl: 'https://maps.google.com/?q=Chillox+Dhanmondi',
    region: 'south',
  },
  {
    name: 'Chillox Banani',
    address: 'House 54, Road 11, Block C, Banani, Dhaka 1213',
    phone: '01712-987654',
    hours: '11:00 AM - 11:30 PM',
    mapsUrl: 'https://maps.google.com/?q=Chillox+Banani',
    region: 'north',
  },
  {
    name: 'Chillox Uttara',
    address: 'House 14, Sector 3, Rabindra Sarani, Uttara, Dhaka 1230',
    phone: '01812-334455',
    hours: '11:00 AM - 11:00 PM',
    mapsUrl: 'https://maps.google.com/?q=Chillox+Uttara',
    region: 'north',
  },
  {
    name: 'Chillox Bailey Road',
    address: 'Nawabi Voj Building (2nd Floor), Bailey Road, Dhaka 1217',
    phone: '01912-778899',
    hours: '11:30 AM - 11:00 PM',
    mapsUrl: 'https://maps.google.com/?q=Chillox+Bailey+Road',
    region: 'south',
  },
  {
    name: 'Chillox Wari',
    address: 'House 10/A, Rankin Street, Wari, Dhaka 1203',
    phone: '01512-556677',
    hours: '11:00 AM - 11:00 PM',
    mapsUrl: 'https://maps.google.com/?q=Chillox+Wari',
    region: 'south',
  },
  {
    name: 'Chillox Mirpur',
    address: 'Plot 3, Block A, Sony Cinema Hall More, Section 2, Mirpur, Dhaka 1216',
    phone: '01612-445566',
    hours: '11:00 AM - 11:30 PM',
    mapsUrl: 'https://maps.google.com/?q=Chillox+Mirpur',
    region: 'north',
  },
];

export const OutletsSection: React.FC = () => {
  const { setActiveSection } = useCart();
  const [selectedRegion, setSelectedRegion] = useState<'all' | 'north' | 'south'>('all');
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  // Monitor scroll entry
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined' && (window as any).isProgrammaticScroll) return;
      const outletsSec = document.getElementById('outlets');
      if (!outletsSec) return;
      const rect = outletsSec.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom > 200) {
        setActiveSection('outlets');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setActiveSection]);

  // Simple runtime check to see if store is open
  const isCurrentlyOpen = (hoursString: string) => {
    const now = new Date();
    const hours = now.getHours();
    return hours >= 11 && hours < 23;
  };

  // 3D Parallax Tilt handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 8;
    const rotateY = -((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.boxShadow = '0 20px 40px -10px rgba(0, 0, 0, 0.4)';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    card.style.boxShadow = '';
  };

  // Click-to-copy helper
  const handleCopyPhone = (phone: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(phone);
      setCopiedPhone(phone);
      setTimeout(() => setCopiedPhone(null), 2000);
    }
  };

  const filteredOutlets = OUTLETS_DATA.filter((outlet) => {
    if (selectedRegion === 'all') return true;
    return outlet.region === selectedRegion;
  });

  return (
    <section id="outlets" className="py-24 pb-32 px-4 bg-black text-white relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-white bg-[#ff2a14] border border-[#ff2a14]/30 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full select-none">
            Find Us
          </span>
          <h2 className="text-4xl md:text-5xl font-black mt-4 tracking-wide uppercase text-white font-display">
            OUR OUTLETS & <span className="text-amber-400">LOCATIONS</span>
          </h2>
          <p className="text-white/70 text-sm max-w-lg mx-auto mt-3 font-semibold">
            Visit our outlets across Dhaka for dine-in or self-pickup.
          </p>
        </div>

        {/* Region Filters Panel */}
        <div className="flex justify-center space-x-3.5 mb-12">
          {[
            { id: 'all', label: 'All Areas' },
            { id: 'north', label: 'Dhaka North' },
            { id: 'south', label: 'Dhaka South' },
          ].map((region) => (
            <button
              key={region.id}
              onClick={() => setSelectedRegion(region.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all border-2 ${
                selectedRegion === region.id
                  ? 'bg-[#faf6ed] text-zinc-950 border-zinc-950 shadow-[2px_2px_0px_#000] translate-x-[-1px] translate-y-[-1px]'
                  : 'bg-zinc-950 hover:bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white shadow-[1px_1px_0px_rgba(0,0,0,0.5)] hover:translate-x-[-0.5px] hover:translate-y-[-0.5px]'
              }`}
            >
              {region.label}
            </button>
          ))}
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredOutlets.map((outlet, index) => {
            const open = isCurrentlyOpen(outlet.hours);

            return (
              <div
                key={outlet.name}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ transition: 'transform 0.1s ease, box-shadow 0.3s ease' }}
                className="bg-[#fbbf24] text-zinc-950 border-2 border-zinc-950 rounded-[2rem] p-6 flex flex-col justify-between relative shadow-[4px_4px_0px_#000] hover:shadow-[8px_8px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-300 transform-gpu group"
              >
                <div>
                  {/* Title & Open/Close indicator */}
                  <div className="flex items-start justify-between space-x-2">
                    <h3 className="text-lg font-black tracking-wide text-zinc-950 uppercase">
                      {outlet.name}
                    </h3>
                    <span
                      className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                        open
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                          : 'bg-red-950 text-red-300 border-red-800'
                      }`}
                    >
                      {open ? 'Open Now' : 'Closed'}
                    </span>
                  </div>

                  {/* Divider line */}
                  <div className="h-[2px] bg-zinc-950/10 my-4" />

                  {/* Info listing */}
                  <div className="space-y-3.5 text-xs text-zinc-900">
                    <div className="flex items-start">
                      <MapPin className="w-4 h-4 text-zinc-950 mr-3 flex-shrink-0 mt-0.5" />
                      <p className="leading-relaxed font-bold">{outlet.address}</p>
                    </div>

                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-zinc-950 mr-3 flex-shrink-0" />
                      <span className="font-bold">{outlet.hours}</span>
                    </div>

                    <div className="flex items-center">
                      <Phone className="w-4 h-4 text-zinc-950 mr-3 flex-shrink-0" />
                      <div className="relative">
                        <a
                          href={`tel:${outlet.phone}`}
                          onClick={(e) => handleCopyPhone(outlet.phone, e)}
                          className="hover:text-[#ff2a14] transition-colors font-bold select-all cursor-pointer flex items-center"
                        >
                          <span>{outlet.phone}</span>
                        </a>
                        {copiedPhone === outlet.phone && (
                          <span className="absolute left-0 -top-6 bg-zinc-950 text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded border border-zinc-800 shadow-sm animate-bounce z-20">
                            Copied! 📋
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map button */}
                <div className="mt-6 border-t border-zinc-950/10 pt-4">
                  <a
                    href={outlet.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-11 bg-white hover:bg-[#faf6ed] hover:text-zinc-950 border-2 border-zinc-950 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-[2px_2px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3.5px_3.5px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000]"
                  >
                    <Compass className="w-4 h-4" />
                    <span>Get Directions</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Wave Divider (flowing into yellow feedback section bg) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[45px] md:h-[65px] fill-[#fbbf24]">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0H0V56.44Z" />
        </svg>
      </div>
    </section>
  );
};
export default OutletsSection;
