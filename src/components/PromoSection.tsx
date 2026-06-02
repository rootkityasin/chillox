'use client';

import React, { useState } from 'react';

interface LetterConfig {
  char: string;
  dx: string;
  dy: string;
  dr: string;
}

const SMASH_CONFIGS: LetterConfig[] = [
  { char: 'S', dx: '-65px', dy: '-85px', dr: '-140deg' },
  { char: 'M', dx: '-25px', dy: '-115px', dr: '120deg' },
  { char: 'A', dx: '5px', dy: '-135px', dr: '-190deg' },
  { char: 'S', dx: '35px', dy: '-105px', dr: '160deg' },
  { char: 'H', dx: '75px', dy: '-75px', dr: '-110deg' },
];

const TopTeeth: React.FC = () => (
  <svg viewBox="0 0 100 40" className="w-full h-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
    {/* Red gum base */}
    <path d="M 0,0 L 100,0 L 100,15 Q 50,22 0,15 Z" fill="#b91c1c" stroke="#000" strokeWidth="2.5" />
    {/* White teeth */}
    <path d="M 5,12 L 15,12 L 10,28 Z 
             M 18,13 L 28,13 L 23,30 Z 
             M 32,14 L 44,14 L 38,34 Z 
             M 50,14 L 62,14 L 56,34 Z 
             M 68,13 L 78,13 L 73,30 Z 
             M 82,12 L 92,12 L 87,28 Z" fill="#ffffff" stroke="#000" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

const BottomTeeth: React.FC = () => (
  <svg viewBox="0 0 100 40" className="w-full h-auto drop-shadow-[0_-2px_4px_rgba(0,0,0,0.5)]">
    {/* Red gum base */}
    <path d="M 0,40 L 100,40 L 100,25 Q 50,18 0,25 Z" fill="#b91c1c" stroke="#000" strokeWidth="2.5" />
    {/* White teeth */}
    <path d="M 5,28 L 15,28 L 10,12 Z 
             M 18,27 L 28,27 L 23,10 Z 
             M 32,26 L 44,26 L 38,6 Z 
             M 50,26 L 62,26 L 56,6 Z 
             M 68,27 L 78,27 L 73,10 Z 
             M 82,28 L 92,28 L 87,12 Z" fill="#ffffff" stroke="#000" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

const CartoonBurgerLeft: React.FC = () => (
  <svg viewBox="0 0 100 100" className="w-16 h-16 md:w-22 md:h-22">
    {/* Bun Top */}
    <path d="M 15,45 Q 50,15 85,45 Z" fill="#f59e0b" stroke="#000" strokeWidth="3.5" />
    {/* Eyes/Sunglasses */}
    <rect x="25" y="42" width="22" height="12" rx="4" fill="#000" />
    <rect x="53" y="42" width="22" height="12" rx="4" fill="#000" />
    <path d="M 47,46 L 53,46" stroke="#000" strokeWidth="3" />
    {/* Highlights on glasses */}
    <line x1="29" y1="45" x2="35" y2="45" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="57" y1="45" x2="63" y2="45" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
    {/* Cheese layer */}
    <path d="M 12,54 L 88,54 L 75,62 L 65,54 L 50,65 L 35,54 L 25,62 Z" fill="#fbbf24" stroke="#000" strokeWidth="3" />
    {/* Meat Patty */}
    <rect x="18" y="60" width="64" height="10" rx="5" fill="#78350f" stroke="#000" strokeWidth="3" />
    {/* Smile */}
    <path d="M 42,75 Q 50,82 58,75" stroke="#000" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    {/* Bun Bottom */}
    <path d="M 20,70 L 80,70 Q 80,82 50,82 Q 20,82 20,70 Z" fill="#d97706" stroke="#000" strokeWidth="3.5" />
    {/* Small flag */}
    <path d="M 50,22 L 50,10" stroke="#000" strokeWidth="3" />
    <path d="M 50,10 L 68,14 L 50,18 Z" fill="#ef4444" stroke="#000" strokeWidth="2.5" />
  </svg>
);

const CartoonBurgerRight: React.FC = () => (
  <svg viewBox="0 0 100 100" className="w-16 h-16 md:w-22 md:h-22">
    {/* Straw */}
    <path d="M 44,35 L 30,10 L 36,7 L 50,35" fill="#fff" stroke="#ff2a14" strokeWidth="4" strokeLinejoin="round" />
    {/* Straw stripes */}
    <path d="M 41,29 L 35,18" stroke="#ff2a14" strokeWidth="3" />
    <path d="M 37,21 L 31,10" stroke="#ff2a14" strokeWidth="3" />
    
    {/* Cup Body */}
    <path d="M 28,40 L 36,86 Q 37,92 43,92 L 57,92 Q 63,92 64,86 L 72,40 Z" fill="#fff" stroke="#ff2a14" strokeWidth="4" strokeLinejoin="round" />
    
    {/* Whipped Cream Top */}
    <path d="M 28,40 
             C 24,30 34,22 42,26 
             C 45,16 55,16 58,26 
             C 66,22 76,30 72,40 Z" fill="#fff" stroke="#ff2a14" strokeWidth="4" strokeLinejoin="round" />
             
    {/* Cup Rim highlight */}
    <path d="M 25,40 L 75,40" stroke="#ff2a14" strokeWidth="4" strokeLinecap="round" />

    {/* Cute Face */}
    {/* Eyes */}
    <circle cx="44" cy="58" r="3" fill="#ff2a14" />
    <circle cx="56" cy="58" r="3" fill="#ff2a14" />
    
    {/* Smile */}
    <path d="M 47,68 Q 50,74 53,68" fill="none" stroke="#ff2a14" strokeWidth="3.5" strokeLinecap="round" />
    
    {/* Cherry */}
    <circle cx="50" cy="18" r="6" fill="#fff" stroke="#ff2a14" strokeWidth="4" />
    <path d="M 50,12 Q 53,5 60,8" fill="none" stroke="#ff2a14" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const PromoSection: React.FC = () => {
  const [smashActive, setSmashActive] = useState(false);
  const [repeatActive, setRepeatActive] = useState(false);
  const [eatState, setEatState] = useState<'idle' | 'chomp' | 'bitten'>('idle');
  const [crumbs, setCrumbs] = useState<{ id: string; x: number; y: number; vx: number; vy: number; size: number }[]>([]);
  const [sauceSplatters, setSauceSplatters] = useState<{ id: string; vx: number; vy: number; size: number; rot: number; isTeardrop: boolean }[]>([]);

  const handleSmashHover = () => {
    if (smashActive) return;
    setSmashActive(true);

    // Wet squelch audio synthesis
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContext) {
        const ctx = new AudioContext();
        const now = ctx.currentTime;

        // Sequence of three quick pitch-swept triangle wave pops
        const playPop = (time: number, freq: number, duration: number) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const filter = ctx.createBiquadFilter();
          
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, time);
          osc.frequency.exponentialRampToValueAtTime(30, time + duration);
          
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(600, time);
          filter.frequency.exponentialRampToValueAtTime(100, time + duration);
          
          gain.gain.setValueAtTime(0.25, time);
          gain.gain.exponentialRampToValueAtTime(0.01, time + duration);
          
          osc.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);
          
          osc.start(time);
          osc.stop(time + duration + 0.05);
        };

        playPop(now, 200, 0.22);
        playPop(now + 0.04, 150, 0.18);
        playPop(now + 0.08, 170, 0.15);

        // Noise spray sweep for wet sauce squish
        const bufferSize = ctx.sampleRate * 0.25;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.setValueAtTime(900, now);
        noiseFilter.frequency.exponentialRampToValueAtTime(180, now + 0.25);
        noiseFilter.Q.setValueAtTime(3.0, now);

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.1, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(ctx.destination);

        noise.start(now);
        noise.stop(now + 0.28);
      }
    } catch (e) {
      // Ignored if blocked by browser autoplay
    }

    // Generate 18-28 dynamic ketchup splatters shooting outwards
    const count = 18 + Math.floor(Math.random() * 10);
    const newSplatters = Array.from({ length: count }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 60 + Math.random() * 180; // flight distance in px
      const vx = Math.cos(angle) * distance;
      const vy = Math.sin(angle) * distance;

      // Pointy tail of teardrop faces backward (angle + 45 deg)
      const angleDeg = (angle * 180) / Math.PI;
      const rot = angleDeg + 45;

      const size = 6 + Math.random() * 20; // size 6px to 26px
      const isTeardrop = Math.random() > 0.35; // 65% teardrops, 35% circles

      return {
        id: `splatter-${i}-${Math.random()}-${Date.now()}`,
        vx,
        vy,
        size,
        rot,
        isTeardrop,
      };
    });

    setSauceSplatters(newSplatters);

    setTimeout(() => {
      setSmashActive(false);
      setSauceSplatters([]);
    }, 1300); // Reassemble letters and clean up splatters after 1.3 seconds
  };

  const handleRepeatHover = () => {
    if (repeatActive) return;
    setRepeatActive(true);
    setTimeout(() => {
      setRepeatActive(false);
    }, 3000); // Matches CSS flyAround keyframe timeline
  };

  const handleEatMouseEnter = () => {
    if (eatState !== 'idle') return;
    setEatState('chomp');

    // Retro sound synth
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContext) {
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.13);
      }
    } catch (e) {
      // Audio context may be blocked by autoplay policies
    }

    // After 150ms of teeth closing, apply bite shape and fly crumbs
    setTimeout(() => {
      setEatState('bitten');

      const newCrumbs = Array.from({ length: 14 }).map((_, i) => {
        const angle = Math.PI * 0.5 + Math.random() * Math.PI * 1.5; // Up and left focus
        const speed = 3 + Math.random() * 5;
        return {
          id: `crumb-${i}-${Math.random()}-${Date.now()}`,
          x: 45 + Math.random() * 15,
          y: 20 + Math.random() * 60,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1,
          size: 3 + Math.random() * 4,
        };
      });
      setCrumbs(newCrumbs);
    }, 150);
  };

  const handleEatMouseLeave = () => {
    setEatState('idle');
    setCrumbs([]);
  };

  const handlePromoBurgerClick = () => {
    const menuSec = document.getElementById('menu');
    if (menuSec) {
      menuSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-[#0c0c0e] py-28 px-4 overflow-hidden select-none flex flex-col items-center justify-center border-t-2 border-b-2 border-zinc-900">
      
      {/* Glowing Neon ambient backdrops */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ff2a14]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#fbbf24]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Industrial Grid Mesh Background */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{
        backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px), radial-gradient(#ffffff 1px, transparent 1px)',
        backgroundSize: '24px 24px',
        backgroundPosition: '0 0, 12px 12px'
      }} />

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 25s linear infinite;
        }
        @keyframes flicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
            text-shadow: 0 0 5px #fff, 0 0 10px #ff2a14, 0 0 20px #ff2a14, 0 0 40px #ff2a14;
            opacity: 1;
          }
          20%, 24%, 55% {
            text-shadow: none;
            opacity: 0.8;
          }
        }
        .neon-flicker {
          animation: flicker 4s infinite alternate;
        }
      `}</style>

      {/* Center dark industrial neon banner matching layout */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl h-64 md:h-[350px] bg-[#121214] z-0 rounded-t-[40px] rounded-b-[100px] md:rounded-b-[160px] shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_40px_rgba(255,42,20,0.15)] border-b-2 border-zinc-800">
        {/* Left Seeds (4 seeds in arched positions) */}
        <div className="absolute left-[10%] top-[15%] flex space-x-3 md:space-x-5 pointer-events-none">
          <div className="w-2 md:w-3 h-5 md:h-7 bg-[#ff2a14] rounded-full rotate-[-40deg] shadow-[0_0_8px_#ff2a14]" />
          <div className="w-2 md:w-3 h-5 md:h-7 bg-[#ff2a14] rounded-full rotate-[-15deg] shadow-[0_0_8px_#ff2a14]" />
          <div className="w-2 md:w-3 h-5 md:h-7 bg-[#ff2a14] rounded-full rotate-[15deg] shadow-[0_0_8px_#ff2a14]" />
          <div className="w-2 md:w-3 h-5 md:h-7 bg-[#ff2a14] rounded-full rotate-[40deg] shadow-[0_0_8px_#ff2a14]" />
        </div>

        {/* Right Seeds (3 seeds in arched positions) */}
        <div className="absolute right-[10%] top-[15%] flex space-x-3 md:space-x-5 pointer-events-none">
          <div className="w-2 md:w-3 h-5 md:h-7 bg-[#fbbf24] rounded-full rotate-[-30deg] shadow-[0_0_8px_#fbbf24]" />
          <div className="w-2 md:w-3 h-5 md:h-7 bg-[#fbbf24] rounded-full rotate-[0deg] shadow-[0_0_8px_#fbbf24]" />
          <div className="w-2 md:w-3 h-5 md:h-7 bg-[#fbbf24] rounded-full rotate-[30deg] shadow-[0_0_8px_#fbbf24]" />
        </div>
      </div>

      {/* Main content container */}
      <div className="max-w-6xl w-full mx-auto flex flex-col items-center justify-center relative z-10 text-center mt-6">
        
        {/* Cartoon sunglasses burger sticker (Left) */}
        <div className="absolute left-4 md:left-[15%] top-[80px] md:top-[130px] z-20 transform -rotate-12 hover:rotate-0 transition-transform duration-300 pointer-events-auto hidden md:block">
          <div className="bg-[#121214] border-[3px] border-zinc-800 rounded-full w-28 h-28 md:w-36 md:h-36 shadow-[0_0_15px_rgba(251,191,36,0.15)] relative flex items-center justify-center select-none">
            {/* Inner red ring */}
            <div className="absolute border border-[#ff2a14]/30 rounded-full w-[90%] h-[90%] pointer-events-none" />
            
            {/* Curved text along circular path */}
            <svg className="absolute w-full h-full animate-[spin_20s_linear_infinite] hover:[animation-play-state:paused]" viewBox="0 0 100 100">
              <defs>
                <path id="textPath" d="M 12,50 A 38,38 0 1,1 88,50" fill="none" />
              </defs>
              <text className="font-sans font-black uppercase text-[6px] md:text-[6.5px] fill-[#fbbf24] tracking-[0.08em]">
                <textPath href="#textPath" startOffset="50%" textAnchor="middle">
                  SMASH, EAT & REPEAT
                </textPath>
              </text>
            </svg>

            {/* Center Burger */}
            <div className="relative z-10 scale-90">
              <CartoonBurgerLeft />
            </div>
          </div>
        </div>

        {/* Smiling outline burger stick sticker (Right) */}
        <div className="absolute right-4 md:right-[15%] top-[70px] md:top-[120px] z-20 transform rotate-12 hover:rotate-0 transition-transform duration-300 pointer-events-auto hidden md:block">
          <div className="bg-[#121214] border-[3px] border-zinc-800 rounded-3xl p-3 shadow-[0_0_15px_rgba(255,42,20,0.15)] flex flex-col items-center justify-center select-none w-24 h-24 md:w-32 md:h-32">
            <CartoonBurgerRight />
          </div>
        </div>

        {/* Script Title behind and Burger in front container */}
        <div className="relative w-full flex flex-col items-center justify-center mt-12 md:mt-20">
          
          <h1 
            className="absolute top-[-10%] md:top-[-20%] font-pacifico text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-none select-none pointer-events-none z-10 w-full text-center whitespace-nowrap px-4 neon-flicker"
            style={{ 
              transform: 'translateY(-50%)'
            }}
          >
            Best burgers in town
          </h1>

          {/* Center circular backing and massive juicy burger */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center z-20 my-6">
            {/* Backing red circle */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,#ff2a14_0%,#7a0a07_100%)] border-[8px] md:border-[12px] border-[#ff2a14] rounded-full shadow-[0_12px_24px_rgba(0,0,0,0.6),0_0_45px_rgba(255,42,20,0.7)] z-0 animate-pulse" />
            
            {/* Large burger image */}
            <button
              onClick={handlePromoBurgerClick}
              className="w-[90%] h-[90%] flex items-center justify-center transform hover:scale-105 active:scale-95 duration-300 z-10 cursor-pointer pointer-events-auto filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.8)]"
            >
              <img
                src="/promo_burger.png"
                alt="Smashed Cheeseburger"
                className="w-full h-full object-contain"
              />
            </button>
          </div>
        </div>

        {/* Custom Word Interaction Panel: SMASH, EAT & REPEAT */}
        <div className="mt-8 font-sans font-black text-xl md:text-4xl text-white/90 flex flex-wrap justify-center items-center gap-x-2 md:gap-x-4 tracking-widest uppercase select-none relative z-20">
          <span className="pointer-events-none select-none">•</span>

          {/* 1. SMASH (Blast Letters) */}
          <span 
            onMouseEnter={handleSmashHover}
            className="cursor-pointer select-none inline-flex items-center hover:text-amber-400 transition-colors duration-200 relative text-white"
          >
            {SMASH_CONFIGS.map((cfg, idx) => (
              <span
                key={idx}
                className={`inline-block transition-transform duration-300 ${smashActive ? 'smash-active' : ''}`}
                style={{
                  '--dx': cfg.dx,
                  '--dy': cfg.dy,
                  '--dr': cfg.dr,
                } as React.CSSProperties}
              >
                {cfg.char}
              </span>
            ))}

            {/* Sauce Splatters */}
            {sauceSplatters.map((splat) => (
              <span
                key={splat.id}
                className="absolute pointer-events-none animate-sauce z-30"
                style={{
                  left: '50%',
                  top: '50%',
                  width: `${splat.size}px`,
                  height: `${splat.size}px`,
                  marginLeft: `-${splat.size / 2}px`,
                  marginTop: `-${splat.size / 2}px`,
                  background: 'radial-gradient(circle at 35% 35%, #ff4d4d 0%, #a80a0a 70%, #660000 100%)',
                  borderRadius: splat.isTeardrop ? '50% 50% 50% 0' : '50%',
                  border: '2px solid #000000',
                  boxShadow: '1.5px 1.5px 0px #000000',
                  '--vx': `${splat.vx}px`,
                  '--vy': `${splat.vy}px`,
                  '--rot': `${splat.rot}deg`,
                } as React.CSSProperties}
              />
            ))}
          </span>

          <span className="pointer-events-none select-none">,</span>

          {/* 2. EAT (Bite Animation on Hover) */}
          <span 
            onMouseEnter={handleEatMouseEnter}
            onMouseLeave={handleEatMouseLeave}
            className={`cursor-pointer select-none relative inline-block py-1 px-3 transition-all duration-200 origin-center ${
              eatState === 'chomp' ? 'scale-y-[0.75] scale-x-[1.1] animate-shake' : ''
            } ${eatState === 'bitten' ? 'hover:scale-y-[0.85]' : 'hover:scale-y-[0.82]'} hover:text-amber-400`}
          >
            {/* The EAT text, clipped when bitten */}
            <span 
              className="relative z-10 block transition-colors select-none text-white hover:text-amber-400"
              style={{ 
                clipPath: eatState === 'bitten' 
                  ? 'polygon(0% 0%, 45% 0%, 42% 5%, 38% 12%, 37% 20%, 39% 27%, 43% 30%, 40% 35%, 34% 42%, 33% 50%, 35% 58%, 42% 60%, 39% 65%, 35% 72%, 34% 80%, 36% 87%, 45% 90%, 50% 100%, 0% 100%)' 
                  : 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                transition: eatState === 'idle' ? 'clip-path 0.3s ease-out' : 'none',
              }}
            >
              EAT
            </span>

            {/* Top Jaw SVG */}
            <div 
              className="absolute left-1/2 -translate-x-1/2 w-[140%] pointer-events-none z-30 transition-all duration-200 ease-out"
              style={{
                top: '-10px',
                transform: eatState === 'chomp' 
                  ? 'translate(-50%, -10%) scale(1)' 
                  : 'translate(-50%, -120%) scale(0.8)',
                opacity: eatState === 'chomp' ? 1 : 0
              }}
            >
              <TopTeeth />
            </div>

            {/* Bottom Jaw SVG */}
            <div 
              className="absolute left-1/2 -translate-x-1/2 w-[140%] pointer-events-none z-30 transition-all duration-200 ease-out"
              style={{
                bottom: '-10px',
                transform: eatState === 'chomp' 
                  ? 'translate(-50%, 10%) scale(1)' 
                  : 'translate(-50%, 120%) scale(0.8)',
                opacity: eatState === 'chomp' ? 1 : 0
              }}
            >
              <BottomTeeth />
            </div>

            {/* Particle crumbs */}
            {crumbs.map((crumb) => (
              <span
                key={crumb.id}
                className="absolute bg-[#faf6ed] rounded-full border border-black pointer-events-none animate-crumb z-20"
                style={{
                  left: `${crumb.x}%`,
                  top: `${crumb.y}%`,
                  width: `${crumb.size}px`,
                  height: `${crumb.size}px`,
                  '--vx': `${crumb.vx * 15}px`,
                  '--vy': `${crumb.vy * 15}px`,
                } as React.CSSProperties}
              />
            ))}
          </span>

          <span className="pointer-events-none select-none">&</span>

          {/* 3. REPEAT (Fly Away and Return) */}
          <span 
            onMouseEnter={handleRepeatHover}
            className={`cursor-pointer select-none inline-block transition-all text-white hover:text-amber-400 ${
              repeatActive ? 'animate-fly-around pointer-events-none' : ''
            }`}
          >
            REPEAT
          </span>

          <span className="pointer-events-none select-none">•</span>
        </div>

      </div>
    </section>
  );
};
export default PromoSection;
