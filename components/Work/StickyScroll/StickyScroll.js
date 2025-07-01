import React, { useState, useRef, useEffect } from "react";
import { useMotionValueEvent, useScroll, motion, AnimatePresence } from "framer-motion";
import { WORK_CONTENT } from "../../../constants";

const StickyScroll = ({ githubData, codeforcesData, codeChefData, leetcodeData }) => {
  const [activeCard, setActiveCard] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const contentItems = WORK_CONTENT || [];
  const cardLength = contentItems.length;

  // Card navigation with circular linking
  const changeActiveCard = (newIndex) => {
    setActiveCard(newIndex);
  };

  const nextCard = () => {
    const newIndex = (activeCard + 1) % cardLength;
    changeActiveCard(newIndex);
  };

  const prevCard = () => {
    const newIndex = (activeCard - 1 + cardLength) % cardLength;
    changeActiveCard(newIndex);
  };

  // Handle scroll-based card changes
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isInteracting) {
      const currentIndex = Math.min(
        cardLength - 1,
        Math.floor(latest * cardLength)
      );
      if (currentIndex !== activeCard) {
        changeActiveCard(currentIndex);
      }
    }
  });

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        prevCard();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        nextCard();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCard, cardLength]);

  return (
    <div className="relative w-full overflow-hidden bg-black min-h-screen">
      <motion.div ref={containerRef} className="relative h-[200vh]">
        <div 
          className="sticky top-0 h-screen flex items-center justify-center"
          onMouseEnter={() => setIsInteracting(true)}
          onMouseLeave={() => setIsInteracting(false)}
        >
          {/* Left Navigation Button */}
          <motion.button
            className="absolute left-8 z-20 w-14 h-14 bg-gradient-to-r from-purple-600/20 to-blue-600/20 
              backdrop-blur-xl rounded-full border border-purple-500/30 flex items-center justify-center 
              text-white hover:from-purple-600/40 hover:to-blue-600/40 transition-all duration-300
              shadow-[0_8px_32px_rgba(139,92,246,0.3)]"
            onClick={prevCard}
            whileHover={{ scale: 1.1, boxShadow: "0 12px 40px rgba(139,92,246,0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>

          {/* Right Navigation Button */}
          <motion.button
            className="absolute right-8 z-20 w-14 h-14 bg-gradient-to-r from-purple-600/20 to-blue-600/20 
              backdrop-blur-xl rounded-full border border-purple-500/30 flex items-center justify-center 
              text-white hover:from-purple-600/40 hover:to-blue-600/40 transition-all duration-300
              shadow-[0_8px_32px_rgba(139,92,246,0.3)]"
            onClick={nextCard}
            whileHover={{ scale: 1.1, boxShadow: "0 12px 40px rgba(139,92,246,0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>

          {/* Content Cards - Planetary Revolving Display */}
          <div className="w-full max-w-6xl mx-auto px-4 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCard}
                initial={{ 
                  rotateZ: 180,
                  scale: 0.3,
                  opacity: 0,
                  x: 400,
                  y: 200
                }}
                animate={{ 
                  rotateZ: 0,
                  scale: 1,
                  opacity: 1,
                  x: 0,
                  y: 0
                }}
                exit={{ 
                  rotateZ: -180,
                  scale: 0.3,
                  opacity: 0,
                  x: -400,
                  y: -200
                }}
                transition={{ 
                  duration: 0.05,
                  ease: [0.22, 1, 0.36, 1],
                  type: "spring",
                  stiffness: 500,
                  damping: 35
                }}
                className="relative bg-gradient-to-br from-gray-900/50 via-gray-800/30 to-purple-900/20 
                  backdrop-blur-2xl rounded-3xl border border-purple-500/20 overflow-hidden
                  shadow-[0_20px_80px_rgba(139,92,246,0.15)]"
                style={{
                  perspective: "1000px",
                  transformStyle: "preserve-3d"
                }}
              >
                {/* Animated Background Elements */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
                </div>

                {/* Enhanced Content Header */}
                <div className="relative p-8 md:p-10 border-b border-purple-500/20 bg-gradient-to-r from-transparent to-purple-500/5">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl 
                      flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-xl">{activeCard + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 
                        bg-clip-text text-transparent leading-tight">
                        {contentItems[activeCard]?.title}
                      </h2>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-lg leading-relaxed font-medium">
                    {contentItems[activeCard]?.description}
                  </p>
                </div>

                {/* Enhanced Main Content */}
                <div className="relative p-8 md:p-10 max-h-[55vh] overflow-y-auto enhanced-scrollbar">
                  {/* Content Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="w-full h-full" style={{
                      backgroundImage: `radial-gradient(circle at 25% 25%, rgba(139,92,246,0.3) 0%, transparent 50%), 
                                       radial-gradient(circle at 75% 75%, rgba(59,130,246,0.3) 0%, transparent 50%)`
                    }}></div>
                  </div>

                  <div className="relative enhanced-content">
                    {typeof contentItems[activeCard]?.content === 'function' 
                      ? contentItems[activeCard].content({
                          githubData,
                          codeforcesData,
                          codeChefData,
                          leetcodeData
                        })
                      : contentItems[activeCard]?.content
                    }
                  </div>
                </div>

                {/* Enhanced Footer */}
                <div className="relative p-6 border-t border-purple-500/20 bg-gradient-to-r from-gray-900/30 to-purple-900/20">
                  <div className="flex items-center justify-between">
                    {/* Enhanced Navigation Dots */}
                    <div className="flex items-center gap-3">
                      {contentItems.map((_, index) => (
                        <motion.button
                          key={index}
                          className={`relative overflow-hidden rounded-full transition-all duration-500 ${
                            activeCard === index 
                              ? 'w-10 h-3 bg-gradient-to-r from-purple-500 to-blue-500' 
                              : 'w-3 h-3 bg-gray-600 hover:bg-gray-500'
                          }`}
                          onClick={() => changeActiveCard(index)}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {activeCard === index && (
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400"
                              layoutId="activeIndicator"
                              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            />
                          )}
                        </motion.button>
                      ))}
                    </div>
                    
                    {/* Card Counter */}
                    <div className="flex items-center gap-4">
                      <span className="text-gray-400 text-sm font-medium">
                        {activeCard + 1} of {cardLength}
                      </span>
                      <div className="w-24 h-1 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                          animate={{ width: `${((activeCard + 1) / cardLength) * 100}%` }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Enhanced Background Cards for Planetary Depth */}
            <div className="absolute inset-0 -z-10">
              {/* Previous Card - Orbital Path */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-gray-900/15 to-purple-900/8 
                  backdrop-blur-sm rounded-3xl border border-purple-500/10"
                animate={{
                  x: [0, -60, -80, -60, 0],
                  y: [0, -30, 0, 30, 0],
                  scale: [0.92, 0.88, 0.92, 0.88, 0.92],
                  rotateZ: [0, -15, -30, -15, 0],
                  opacity: [0.3, 0.2, 0.1, 0.2, 0.3]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* Next Card - Counter-Orbital Path */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-gray-900/15 to-blue-900/8 
                  backdrop-blur-sm rounded-3xl border border-blue-500/10"
                animate={{
                  x: [0, 60, 80, 60, 0],
                  y: [0, 30, 0, -30, 0],
                  scale: [0.92, 0.88, 0.92, 0.88, 0.92],
                  rotateZ: [0, 15, 30, 15, 0],
                  opacity: [0.3, 0.2, 0.1, 0.2, 0.3]
                }}
                transition={{ 
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 1
                }}
              />

              {/* Additional Orbital Elements */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-gray-900/10 to-indigo-900/5 
                  backdrop-blur-sm rounded-3xl border border-indigo-500/5"
                animate={{
                  x: [0, -40, -60, -40, 0, 40, 60, 40, 0],
                  y: [0, 40, 0, -40, 0, -40, 0, 40, 0],
                  scale: [0.90, 0.85, 0.90, 0.85, 0.90, 0.85, 0.90, 0.85, 0.90],
                  rotateZ: [0, 45, 90, 135, 180, 225, 270, 315, 360],
                  opacity: [0.2, 0.1, 0.05, 0.1, 0.2, 0.1, 0.05, 0.1, 0.2]
                }}
                transition={{ 
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 2
                }}
              />
            </div>

            {/* Orbital Ring Effect */}
            <div className="absolute inset-0 -z-20 pointer-events-none">
              <motion.div
                className="absolute top-1/2 left-1/2 w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2
                  border border-purple-500/5 rounded-full"
                animate={{ rotateZ: 360 }}
                transition={{ 
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <motion.div
                className="absolute top-1/2 left-1/2 w-[130%] h-[130%] -translate-x-1/2 -translate-y-1/2
                  border border-blue-500/5 rounded-full"
                animate={{ rotateZ: -360 }}
                transition={{ 
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <motion.div
                className="absolute top-1/2 left-1/2 w-[110%] h-[110%] -translate-x-1/2 -translate-y-1/2
                  border border-indigo-500/3 rounded-full"
                animate={{ rotateZ: 360 }}
                transition={{ 
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>
          </div>

          {/* Enhanced Instructions */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-xl 
              px-6 py-3 rounded-full border border-purple-500/20 shadow-lg">
              <p className="text-gray-300 text-sm font-medium">
                Use ← → keys or click buttons to navigate
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Styles for Better Content UI */}
      <style jsx global>{`
        .enhanced-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .enhanced-scrollbar::-webkit-scrollbar-track {
          background: rgba(139, 92, 246, 0.1);
          border-radius: 8px;
        }
        .enhanced-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.6), rgba(59, 130, 246, 0.6));
          border-radius: 8px;
          border: 2px solid transparent;
          background-clip: content-box;
        }
        .enhanced-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.8), rgba(59, 130, 246, 0.8));
          background-clip: content-box;
        }
        
        .enhanced-content {
          color: #fff;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        /* Enhanced Links */
        .enhanced-content a {
          color: #a78bfa;
          font-weight: 600;
          text-decoration: none;
          background: linear-gradient(135deg, #a78bfa, #60a5fa);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          padding: 2px 4px;
          border-radius: 4px;
        }
        .enhanced-content a:hover {
          transform: translateY(-1px);
          background: rgba(167, 139, 250, 0.1);
          -webkit-text-fill-color: #c4b5fd;
        }
        .enhanced-content a::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(135deg, #a78bfa, #60a5fa);
          transition: width 0.3s ease;
        }
        .enhanced-content a:hover::after {
          width: 100%;
        }
        
        /* Enhanced Headings */
        .enhanced-content h1,
        .enhanced-content h2,
        .enhanced-content h3,
        .enhanced-content h4 {
          background: linear-gradient(135deg, #ffffff, #e2e8f0);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 700;
          margin: 2rem 0 1rem 0;
          position: relative;
          line-height: 1.2;
        }
        .enhanced-content h3 {
          font-size: 1.5rem;
        }
        .enhanced-content h3::before {
          content: '';
          position: absolute;
          left: 0;
          bottom: -8px;
          width: 60px;
          height: 3px;
          background: linear-gradient(135deg, #8b5cf6, #3b82f6);
          border-radius: 2px;
        }
        
        /* Enhanced Paragraphs */
        .enhanced-content p {
          color: #e2e8f0;
          line-height: 1.8;
          margin-bottom: 1.5rem;
          font-size: 1.05rem;
          font-weight: 400;
        }
        
        /* Enhanced Lists */
        .enhanced-content ul {
          list-style-type: none;
          padding: 0;
          margin: 1.5rem 0;
          background: rgba(139, 92, 246, 0.02);
          border-radius: 12px;
          padding: 1.5rem;
          border: 1px solid rgba(139, 92, 246, 0.1);
        }
        .enhanced-content li {
          margin-bottom: 1rem;
          color: #e2e8f0;
          position: relative;
          padding-left: 2rem;
          font-size: 1.05rem;
          line-height: 1.6;
          transition: all 0.3s ease;
          padding: 0.75rem 0 0.75rem 2rem;
          border-radius: 8px;
        }
        .enhanced-content li:hover {
          color: #f1f5f9;
          transform: translateX(4px);
          background: rgba(139, 92, 246, 0.05);
        }
        .enhanced-content li::before {
          content: '◆';
          position: absolute;
          left: 0.5rem;
          color: #8b5cf6;
          font-weight: bold;
          font-size: 1em;
          transition: all 0.3s ease;
          top: 0.75rem;
        }
        .enhanced-content li:hover::before {
          color: #a78bfa;
          transform: scale(1.2) rotate(45deg);
        }
        
        /* Enhanced Tables */
        .enhanced-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 2rem 0;
          background: rgba(139, 92, 246, 0.03);
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(139, 92, 246, 0.2);
          box-shadow: 0 8px 32px rgba(139, 92, 246, 0.1);
        }
        .enhanced-content th,
        .enhanced-content td {
          padding: 1.25rem 1rem;
          text-align: left;
          border-bottom: 1px solid rgba(139, 92, 246, 0.1);
          transition: all 0.3s ease;
        }
        .enhanced-content th {
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(59, 130, 246, 0.15));
          font-weight: bold;
          color: #fff;
          font-size: 1.1rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .enhanced-content td {
          color: #e2e8f0;
          font-weight: 500;
        }
        .enhanced-content tr:hover td {
          background: rgba(139, 92, 246, 0.08);
          color: #f1f5f9;
          transform: scale(1.01);
        }
        
        /* Enhanced Code Blocks */
        .enhanced-content pre,
        .enhanced-content code {
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 8px;
          font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
          color: #e2e8f0;
        }
        .enhanced-content pre {
          padding: 1.5rem;
          margin: 1.5rem 0;
          overflow-x: auto;
          position: relative;
        }
        .enhanced-content pre::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(135deg, #8b5cf6, #3b82f6);
        }
        .enhanced-content code {
          padding: 0.25rem 0.5rem;
          font-size: 0.9em;
        }
        
        /* Enhanced Media */
        .enhanced-content canvas,
        .enhanced-content svg,
        .enhanced-content img {
          max-width: 100%;
          height: auto;
          border-radius: 16px;
          border: 1px solid rgba(139, 92, 246, 0.2);
          background: rgba(0, 0, 0, 0.2);
          transition: all 0.4s ease;
          margin: 1.5rem 0;
          box-shadow: 0 8px 32px rgba(139, 92, 246, 0.1);
        }
        .enhanced-content canvas:hover,
        .enhanced-content svg:hover,
        .enhanced-content img:hover {
          transform: scale(1.02);
          border-color: rgba(139, 92, 246, 0.4);
          box-shadow: 0 12px 48px rgba(139, 92, 246, 0.2);
        }
        
        /* Enhanced Quotes */
        .enhanced-content blockquote {
          border-left: 4px solid #8b5cf6;
          background: rgba(139, 92, 246, 0.05);
          padding: 1.5rem;
          margin: 2rem 0;
          border-radius: 0 12px 12px 0;
          font-style: italic;
          color: #e2e8f0;
          position: relative;
        }
        .enhanced-content blockquote::before {
          content: '"';
          font-size: 4rem;
          color: rgba(139, 92, 246, 0.3);
          position: absolute;
          top: -0.5rem;
          left: 1rem;
          font-family: serif;
        }
        
        /* Enhanced Badges/Tags */
        .enhanced-content .badge,
        .enhanced-content .tag {
          display: inline-block;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2));
          color: #e2e8f0;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          margin: 0.25rem;
          border: 1px solid rgba(139, 92, 246, 0.3);
          transition: all 0.3s ease;
        }
        .enhanced-content .badge:hover,
        .enhanced-content .tag:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(139, 92, 246, 0.3);
        }
        
        /* Enhanced Stats/Cards */
        .enhanced-content .stat-card,
        .enhanced-content .info-card {
          background: rgba(139, 92, 246, 0.05);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 16px;
          padding: 1.5rem;
          margin: 1rem 0;
          transition: all 0.3s ease;
        }
        .enhanced-content .stat-card:hover,
        .enhanced-content .info-card:hover {
          transform: translateY(-4px);
          border-color: rgba(139, 92, 246, 0.4);
          box-shadow: 0 12px 32px rgba(139, 92, 246, 0.2);
        }
        
        /* Enhanced Animations */
        .enhanced-content > * {
          animation: smoothFadeInUp 0.6s ease-out forwards;
          opacity: 0;
          transform: translateY(20px);
        }
        
        @keyframes smoothFadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .enhanced-content > *:nth-child(1) { animation-delay: 0.1s; }
        .enhanced-content > *:nth-child(2) { animation-delay: 0.15s; }
        .enhanced-content > *:nth-child(3) { animation-delay: 0.2s; }
        .enhanced-content > *:nth-child(4) { animation-delay: 0.25s; }
        .enhanced-content > *:nth-child(5) { animation-delay: 0.3s; }
        .enhanced-content > *:nth-child(6) { animation-delay: 0.35s; }
        .enhanced-content > *:nth-child(7) { animation-delay: 0.4s; }
        .enhanced-content > *:nth-child(8) { animation-delay: 0.45s; }
        
        /* Interactive Elements */
        .enhanced-content button {
          background: linear-gradient(135deg, #8b5cf6, #3b82f6);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(139, 92, 246, 0.3);
        }
        .enhanced-content button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(139, 92, 246, 0.4);
        }
        
        /* Enhanced planetary motion keyframes */
        @keyframes planetaryOrbit {
          0% {
            transform: rotate(0deg) translateX(200px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(200px) rotate(-360deg);
          }
        }
        
        @keyframes counterOrbit {
          0% {
            transform: rotate(0deg) translateX(150px) rotate(0deg);
          }
          100% {
            transform: rotate(-360deg) translateX(150px) rotate(360deg);
          }
        }
        
        /* Add subtle glow animation to cards */
        .enhanced-content {
          animation: subtleGlow 4s ease-in-out infinite alternate;
        }
        
        @keyframes subtleGlow {
          0% {
            filter: drop-shadow(0 0 10px rgba(139, 92, 246, 0.1));
          }
          100% {
            filter: drop-shadow(0 0 20px rgba(139, 92, 246, 0.2));
          }
        }
      `}</style>
    </div>
  );
};

export default StickyScroll;
