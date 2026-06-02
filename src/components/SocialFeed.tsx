'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { menuItems } from '../data/menuData';
import { ThumbsUp, Heart, Send, Smile, Sparkles, ShoppingBag } from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  time: string;
}

interface Post {
  id: string;
  itemId: string;
  author: string;
  avatar: string;
  time: string;
  text: string;
  image: string;
  hashtags: string[];
  initialReactions: {
    like: number;
    love: number;
    haha: number;
    wow: number;
  };
  comments: Comment[];
  badgeText: string;
  badgeBg: string;
}

const INITIAL_POSTS: Post[] = [
  {
    id: 'post-1',
    itemId: 'chicken-cheese-blast',
    author: 'Chillox',
    avatar: '/logo.png',
    time: 'Just now • Global',
    text: 'Bhaiaa, extra cheese er baji lagbe? Slicing through that liquid cheese center of our Cheese Blast Chicken is a literal core memory! Double tap text to show some love! Tag that friend who owes you a treat!',
    image: '/assets/buzz/hero_burger.png',
    hashtags: ['CheesyGoodness', 'Chillox', 'CheeseBlast'],
    badgeText: 'CHEESE LAVA',
    badgeBg: 'bg-[#fbbf24] text-zinc-950',
    initialReactions: { like: 342, love: 1205, haha: 42, wow: 189 },
    comments: [
      { id: 'c1', author: 'Safwan Ahmed', avatar: 'SA', text: 'Bhai, Cheese Blast er comparison hoy na! Shei leveler cheese leak kore!', time: '2m' },
      { id: 'c2', author: 'Nusrat Jahan', avatar: 'NJ', text: 'Order matching menu immediately, double size extra cheese lagbe!', time: '1m' },
    ]
  },
  {
    id: 'post-2',
    itemId: 'side-drums',
    author: 'Chillox',
    avatar: '/logo.png',
    time: '3 hours ago • Global',
    text: 'Amader Naga Drums mane e agun! Jhal e matha noshto hobe kintu mukhe shad lege thakbe! Authentic naga pepper glaze e wrap kora crispy drums! Try at your own risk! Who is brave enough to try this spicy beast?',
    image: '/assets/buzz/fish_tots.png',
    hashtags: ['FieryNaga', 'SpicyLevelMax', 'ChilloxDrums'],
    badgeText: 'EXTREME NAGA',
    badgeBg: 'bg-[#ff2a14] text-white',
    initialReactions: { like: 198, love: 412, haha: 15, wow: 532 },
    comments: [
      { id: 'c3', author: 'Tanvir Rahman', avatar: 'TR', text: 'Khabar por chokh diye pani ber hoye gese kintu absolute treat!', time: '1h' },
      { id: 'c4', author: 'Farhana Kabir', avatar: 'FK', text: '@Rian bondhu tor naga challenge ekhane chole asho!', time: '42m' },
    ]
  },
  {
    id: 'post-3',
    itemId: 'smasher-bacon',
    author: 'Chillox',
    avatar: '/logo.png',
    time: 'Yesterday at 5:12 PM • Global',
    text: 'Why settle for single when you can smash? Smashed beef patties, caramelized onions, and premium Canadian maple bacon er perfect fusion! Smasher try korso kobe? Soti\'r shad sotti e unki mare! Order now and get smashed!',
    image: '/assets/buzz/bacon_smasher.jpg',
    hashtags: ['SmasherPride', 'ChilloxSmasher', 'BaconDelight'],
    badgeText: 'SMASH SPECIAL',
    badgeBg: 'bg-zinc-950 text-[#fbbf24]',
    initialReactions: { like: 521, love: 890, haha: 3, wow: 76 },
    comments: [
      { id: 'c5', author: 'Imtiaz Fahim', avatar: 'IF', text: 'Canadian Bacon Smasher is a masterpiece! Smashed beef pattern is top notch!', time: '20h' },
      { id: 'c6', author: 'Fariha Karim', avatar: 'FK', text: 'Ayo, Smasher party kobe diccho? @Siam', time: '18h' },
    ]
  },
  {
    id: 'post-4',
    itemId: 'side-wings',
    author: 'Chillox',
    avatar: '/logo.png',
    time: '2 days ago • Global',
    text: 'Bhai, weekend plan ki? Pankha wings er box, double coke, r bondhuder adda! Wings e spicy BBQ glaze ta sotti e awesome! Box ta order koro right now athoba outlets e chole asho bondhu! Let\'s get messy!',
    image: '/assets/buzz/burger_exploded.png',
    hashtags: ['MessyWings', 'WeekendVibes', 'AddaTime'],
    badgeText: 'CRAVING CONTROL',
    badgeBg: 'bg-emerald-600 text-white',
    initialReactions: { like: 284, love: 593, haha: 12, wow: 35 },
    comments: [
      { id: 'c7', author: 'Jamil Hossain', avatar: 'JH', text: 'Wings er sauce er spice level absolute fire! Sotti joss chilo!', time: '1d' },
      { id: 'c8', author: 'Mehedi Hasan', avatar: 'MH', text: 'Pankha wings name o pankha, taste o super aerial!', time: '23h' },
    ]
  }
];

interface FloatingReaction {
  id: string;
  text: string;
  x: number;
  y: number;
}

export const SocialFeed: React.FC = () => {
  const { addToCart, setCartOpen, setActiveSection } = useCart();
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [floatingReactions, setFloatingReactions] = useState<FloatingReaction[]>([]);
  const [commentInputs, setCommentInputs] = useState<{ [postId: string]: string }>({});
  const [showComments, setShowComments] = useState<{ [postId: string]: boolean }>({});

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined' && (window as any).isProgrammaticScroll) return;
      const buzzSec = document.getElementById('buzz');
      if (!buzzSec) return;
      const rect = buzzSec.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom > 200) {
        setActiveSection('buzz');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setActiveSection]);

  const playPopSound = () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContext) {
        const ctx = new AudioContext();
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(700, now + 0.08);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(now + 0.09);
      }
    } catch (e) {
      // Ignored if browser blocks audio
    }
  };

  const handleReact = (postId: string, type: 'like' | 'love' | 'haha' | 'wow') => {
    playPopSound();

    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            initialReactions: {
              ...post.initialReactions,
              [type]: post.initialReactions[type] + 1,
            },
          };
        }
        return post;
      })
    );

    // Spawn floating reaction label
    const reactionMap = { like: 'Like', love: 'Love', haha: 'Haha', wow: 'Wow' };
    const newReaction: FloatingReaction = {
      id: `float-${Math.random()}-${Date.now()}`,
      text: reactionMap[type],
      x: 30 + Math.random() * 40, // percentage from left
      y: 80, // starting position percentage
    };

    setFloatingReactions((prev) => [...prev, newReaction]);

    // Cleanup reaction after animation ends
    setTimeout(() => {
      setFloatingReactions((prev) => prev.filter((r) => r.id !== newReaction.id));
    }, 1500);
  };

  const handleOrderPostItem = (itemId: string) => {
    const item = menuItems.find((i) => i.id === itemId);
    if (item) {
      addToCart(item);
      setCartOpen(true);
    }
  };

  const handleAddComment = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    const text = commentInputs[postId]?.trim();
    if (!text) return;

    const newComment: Comment = {
      id: `c-${Date.now()}`,
      author: 'You (Burger Fan)',
      avatar: 'Y',
      text,
      time: 'Just now',
    };

    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, newComment],
          };
        }
        return post;
      })
    );

    setCommentInputs((prev) => ({
      ...prev,
      [postId]: '',
    }));
  };

  const handleInputChange = (postId: string, text: string) => {
    setCommentInputs((prev) => ({
      ...prev,
      [postId]: text,
    }));
  };

  return (
    <section id="buzz" className="py-24 px-4 bg-[#faf6ed] text-zinc-900 relative border-t-2 border-zinc-950">
      {/* Decorative floating grids */}
      <div className="absolute top-10 left-[5%] w-24 h-24 border border-zinc-900/10 opacity-30 grid grid-cols-4 gap-1 pointer-events-none">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="bg-zinc-950 w-2.5 h-2.5 rounded-full" />
        ))}
      </div>
      <div className="absolute bottom-10 right-[5%] w-24 h-24 border border-zinc-900/10 opacity-30 grid grid-cols-4 gap-1 pointer-events-none">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="bg-zinc-950 w-2.5 h-2.5 rounded-full" />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-white bg-[#ff2a14] border-2 border-zinc-950 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-[2px_2px_0px_#000] select-none">
            Social Buzz
          </span>
          <h2 className="text-4xl md:text-5xl font-black mt-4 tracking-wide uppercase text-zinc-950 font-display">
            CHILLOX <span className="text-[#ff2a14]">FEED & FEELS</span>
          </h2>
          <p className="text-zinc-700 text-sm max-w-lg mx-auto mt-3 font-semibold">
            Fresh from our social feed! Grab the items directly from the posts below. Tag your friends, drop a reaction, and join the burger craze!
          </p>
        </div>

        {/* Floating Reactions Container */}
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {floatingReactions.map((reaction) => (
            <span
              key={reaction.id}
              className={`absolute text-xs font-black uppercase tracking-wider px-2 py-1 border-2 border-zinc-950 bg-white rounded-lg shadow-[2px_2px_0px_#000] animate-float-up opacity-0 ${
                reaction.text === 'Like' ? 'text-blue-600' :
                reaction.text === 'Love' ? 'text-red-500' :
                reaction.text === 'Haha' ? 'text-yellow-600' : 'text-purple-600'
              }`}
              style={{
                left: `${reaction.x}%`,
                bottom: '10%',
              }}
            >
              +{reaction.text}
            </span>
          ))}
        </div>

        {/* Facebook Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => {
            const totalReactions =
              post.initialReactions.like +
              post.initialReactions.love +
              post.initialReactions.haha +
              post.initialReactions.wow;

            return (
              <div
                key={post.id}
                className="bg-white border-3 border-zinc-950 rounded-[2.5rem] shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Header */}
                <div className="p-5 border-b-2 border-zinc-950 flex items-center justify-between bg-[#faf6ed]/20">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-11 h-11 rounded-full border-2 border-zinc-950 bg-white flex items-center justify-center p-0.5 shadow-sm">
                      <img src={post.avatar} alt="Chillox Logo" className="w-full h-full object-contain rounded-full" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="font-black text-sm uppercase tracking-wide text-zinc-900">{post.author}</span>
                        {/* Verified tick */}
                        <span
                          className="w-4 h-4 bg-sky-500 rounded-full flex items-center justify-center text-[9px] text-white font-black select-none pointer-events-none"
                          title="Verified Account"
                        >
                          ✓
                        </span>
                      </div>
                      <span className="text-[10px] text-zinc-400 font-extrabold">{post.time}</span>
                    </div>
                  </div>
                  <span className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-xl border-2 border-zinc-950 shadow-[1.5px_1.5px_0px_#000] select-none ${post.badgeBg}`}>
                    {post.badgeText}
                  </span>
                </div>

                {/* Content Body */}
                <div className="p-6 space-y-4">
                  <p className="text-zinc-800 text-xs sm:text-sm font-semibold leading-relaxed">
                    {post.text}
                  </p>
                  
                  {/* Hashtags */}
                  <div className="flex flex-wrap gap-1.5">
                    {post.hashtags.map((tag) => (
                      <span key={tag} className="text-xs font-black text-red-500 hover:underline cursor-pointer">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Post Image Container */}
                  <div className="h-44 sm:h-48 rounded-2xl border-2 border-zinc-950 bg-zinc-50 flex items-center justify-center relative overflow-hidden group select-none">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                    <img
                      src={post.image}
                      alt="Burger Feed item"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-4 left-4 z-20">
                      <button
                        onClick={() => handleOrderPostItem(post.itemId)}
                        className="py-2 px-4.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 rounded-xl font-black text-xs uppercase border-2 border-zinc-950 shadow-[2px_2px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3.5px_3.5px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] transition-all flex items-center space-x-1.5"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>ORDER THIS FOOD</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Engagement Bar */}
                <div className="px-6 py-3.5 border-t border-b border-zinc-950/5 flex items-center justify-between text-xs text-zinc-500 font-bold select-none">
                  <div className="flex items-center space-x-1">
                    <span className="flex -space-x-1">
                      <span className="w-5 h-5 rounded-full bg-red-500 border border-white flex items-center justify-center text-white p-1">
                        <Heart className="w-full h-full fill-current" />
                      </span>
                      <span className="w-5 h-5 rounded-full bg-blue-500 border border-white flex items-center justify-center text-white p-1">
                        <ThumbsUp className="w-full h-full fill-current" />
                      </span>
                    </span>
                    <span className="ml-1 text-[11px] font-black text-zinc-700">{totalReactions.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-[11px] font-extrabold text-zinc-500">
                    <button
                      type="button"
                      onClick={() => setShowComments((prev) => ({ ...prev, [post.id]: !prev[post.id] }))}
                      className="hover:underline cursor-pointer hover:text-zinc-800 transition-colors"
                    >
                      {post.comments.length} Comments
                    </button>
                    <span>•</span>
                    <span>42 Shares</span>
                  </div>
                </div>

                {/* Reaction Actions */}
                <div className="px-4 py-2 flex items-center justify-between border-b-2 border-zinc-950 bg-[#faf6ed]/10 select-none">
                  <div className="flex items-center space-x-1 w-full justify-around">
                    <button
                      onClick={() => handleReact(post.id, 'like')}
                      className="flex items-center space-x-1.5 py-1.5 px-2.5 rounded-xl hover:bg-zinc-100 text-zinc-600 hover:text-blue-600 font-black text-xs uppercase transition-colors"
                    >
                      <ThumbsUp className="w-4.5 h-4.5" />
                      <span className="hidden sm:inline">Like</span>
                    </button>
                    <button
                      onClick={() => handleReact(post.id, 'love')}
                      className="flex items-center space-x-1.5 py-1.5 px-2.5 rounded-xl hover:bg-zinc-100 text-zinc-600 hover:text-red-500 font-black text-xs uppercase transition-colors"
                    >
                      <Heart className="w-4.5 h-4.5 fill-current" />
                      <span className="hidden sm:inline">Love</span>
                    </button>
                    <button
                      onClick={() => handleReact(post.id, 'haha')}
                      className="flex items-center space-x-1.5 py-1.5 px-2.5 rounded-xl hover:bg-zinc-100 text-zinc-600 hover:text-yellow-600 font-black text-xs uppercase transition-colors"
                    >
                      <Smile className="w-4.5 h-4.5" />
                      <span className="hidden sm:inline">Haha</span>
                    </button>
                    <button
                      onClick={() => handleReact(post.id, 'wow')}
                      className="flex items-center space-x-1.5 py-1.5 px-2.5 rounded-xl hover:bg-zinc-100 text-zinc-600 hover:text-purple-600 font-black text-xs uppercase transition-colors"
                    >
                      <Sparkles className="w-4.5 h-4.5" />
                      <span className="hidden sm:inline">Wow</span>
                    </button>
                  </div>
                </div>

                {/* Comments List & Comments Box */}
                {showComments[post.id] && (
                  <div className="p-6 bg-zinc-50/50 space-y-4 border-t border-zinc-950/5 animate-fade-in">
                    {post.comments.length > 0 && (
                      <div className="space-y-3.5 max-h-40 overflow-y-auto pr-1">
                        {post.comments.map((comment) => (
                          <div key={comment.id} className="flex items-start space-x-3 text-xs">
                            <div className="w-7 h-7 rounded-full bg-white border border-zinc-950 flex items-center justify-center text-xs font-black shadow-sm select-none">
                              {comment.avatar}
                            </div>
                            <div className="flex-1 bg-white border border-zinc-950/10 p-2.5 rounded-2xl shadow-sm">
                              <div className="flex justify-between items-center mb-0.5">
                                <span className="font-extrabold text-zinc-800 text-[11px]">{comment.author}</span>
                                <span className="text-[10px] text-zinc-400 font-bold">{comment.time}</span>
                              </div>
                              <p className="text-zinc-600 font-medium text-[11px] leading-relaxed">{comment.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Comment Input */}
                    <form onSubmit={(e) => handleAddComment(post.id, e)} className="flex items-center space-x-2 pt-2 border-t border-zinc-950/5">
                      <input
                        type="text"
                        placeholder="Write a comment..."
                        value={commentInputs[post.id] || ''}
                        onChange={(e) => handleInputChange(post.id, e.target.value)}
                        className="flex-1 bg-white border border-zinc-950/20 focus:border-[#ff2a14] focus:outline-none py-2 px-4 rounded-xl text-xs text-zinc-800 placeholder-zinc-400"
                      />
                      <button
                        type="submit"
                        className="p-2 bg-[#ff2a14] hover:bg-[#e0220f] text-white rounded-xl border border-zinc-950 transition-colors shadow-sm cursor-pointer"
                        title="Send Comment"
                      >
                        <Send className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </form>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SocialFeed;
