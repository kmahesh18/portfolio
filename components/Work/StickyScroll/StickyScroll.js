import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import {
  useMotionValueEvent,
  useScroll,
  motion,
  AnimatePresence,
} from "framer-motion";
import { WORK_CONTENT } from "../../../constants";

const StickyScroll = ({
  githubData,
  codeforcesData,
  codeChefData,
  leetcodeData,
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const containerRef = useRef(null);
  const activeCardRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const contentItems = useMemo(() => WORK_CONTENT || [], []);
  const cardLength = contentItems.length;

  // Optimized card navigation with useCallback
  const changeActiveCard = useCallback((newIndex) => {
    if (newIndex !== activeCardRef.current) {
      activeCardRef.current = newIndex;
      setActiveCard(newIndex);
    }
  }, []);

  const nextCard = useCallback(() => {
    const newIndex = (activeCardRef.current + 1) % cardLength;
    changeActiveCard(newIndex);
  }, [cardLength, changeActiveCard]);

  const prevCard = useCallback(() => {
    const newIndex = (activeCardRef.current - 1 + cardLength) % cardLength;
    changeActiveCard(newIndex);
  }, [cardLength, changeActiveCard]);

  // Throttled scroll handler for better performance
  const handleScrollChange = useCallback(
    (latest) => {
      if (!isInteracting) {
        const currentIndex = Math.min(
          cardLength - 1,
          Math.floor(latest * cardLength),
        );
        changeActiveCard(currentIndex);
      }
    },
    [isInteracting, cardLength, changeActiveCard],
  );

  useMotionValueEvent(scrollYProgress, "change", handleScrollChange);

  // Optimized keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        prevCard();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        nextCard();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevCard, nextCard]);

  return (
    <div className="relative w-full overflow-hidden bg-black min-h-screen">
      <motion.div ref={containerRef} className="relative h-[200vh]">
        <div
          className="sticky top-0 h-screen flex items-center justify-center"
          onMouseEnter={() => setIsInteracting(true)}
          onMouseLeave={() => setIsInteracting(false)}
        >
          {/* Left Navigation Button */}
          <button
            className="absolute left-8 z-20 w-14 h-14 bg-gradient-to-r from-purple-600/20 to-blue-600/20
              backdrop-blur-xl rounded-full border border-purple-500/30 flex items-center justify-center
              text-white hover:from-purple-600/40 hover:to-blue-600/40 transition-all duration-200
              shadow-[0_8px_32px_rgba(139,92,246,0.3)] hover:scale-110 active:scale-95"
            onClick={prevCard}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Right Navigation Button */}
          <button
            className="absolute right-8 z-20 w-14 h-14 bg-gradient-to-r from-purple-600/20 to-blue-600/20
              backdrop-blur-xl rounded-full border border-purple-500/30 flex items-center justify-center
              text-white hover:from-purple-600/40 hover:to-blue-600/40 transition-all duration-200
              shadow-[0_8px_32px_rgba(139,92,246,0.3)] hover:scale-110 active:scale-95"
            onClick={nextCard}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Content Cards */}
          <div className="w-full max-w-6xl mx-auto px-4 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCard}
                initial={{
                  x: "100%", // Start from left side
                  opacity: 0,
                  scale: 0.95,
                  rotateY: -15,  // Slight Y rotation for 3D effect
                }}
                animate={{
                  x: 0, // Slide to center
                  opacity: 1,
                  scale: 1,
                  rotateY: 0,
                }}
                exit={{
                  x: "-100%", // Exit to right side
                  opacity: 0,
                  scale: 0.95,
                  rotateY: 15,
                }}
                transition={{
                  type: "spring",
                  stiffness: 250, // Increased stiffness for snappier animation
                  damping: 20,    // Adjusted damping
                  mass: 0.2,      // Lighter mass for faster movement
                  duration: 0.05, // Further reduced duration for faster sliding
                }}
                style={{
                  perspective: "1000px",
                  transformStyle: "preserve-3d",
                  boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.25)",
                  transformOrigin: "left center",
                }}
                className="relative bg-gradient-to-br from-gray-900/50 via-gray-800/30 to-purple-900/20
                  backdrop-blur-2xl rounded-3xl border border-purple-500/20 overflow-hidden"
              >
                {/* Animated Background Elements */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
                </div>

                {/* Enhanced Content Header */}
                <div className="relative p-8 md:p-10 border-b border-purple-500/20 bg-gradient-to-r from-transparent to-purple-500/5">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl
                      flex items-center justify-center shadow-lg"
                    >
                      <span className="text-white font-bold text-xl">
                        {activeCard + 1}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h2
                        className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200
                        bg-clip-text text-transparent leading-tight"
                      >
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
                    <div
                      className="w-full h-full"
                      style={{
                        backgroundImage: `radial-gradient(circle at 25% 25%, rgba(139,92,246,0.3) 0%, transparent 50%),
                                       radial-gradient(circle at 75% 75%, rgba(59,130,246,0.3) 0%, transparent 50%)`,
                      }}
                    ></div>
                  </div>

                  <div className="relative enhanced-content">
                    {typeof contentItems[activeCard]?.content === "function"
                      ? contentItems[activeCard].content({
                          githubData,
                          codeforcesData,
                          codeChefData,
                          leetcodeData,
                        })
                      : contentItems[activeCard]?.content}
                  </div>
                </div>

                {/* Enhanced Footer */}
                <div className="relative p-6 border-t border-purple-500/20 bg-gradient-to-r from-gray-900/30 to-purple-900/20">
                  <div className="flex items-center justify-between">
                    {/* Simplified Navigation Dots */}
                    <div className="flex items-center gap-3">
                      {contentItems.map((_, index) => (
                        <button
                          key={index}
                          className={`rounded-full transition-all duration-300 hover:scale-110 ${
                            activeCard === index
                              ? "w-10 h-3 bg-gradient-to-r from-purple-500 to-blue-500"
                              : "w-3 h-3 bg-gray-600 hover:bg-gray-500"
                          }`}
                          onClick={() => changeActiveCard(index)}
                        />
                      ))}
                    </div>

                    {/* Card Counter */}
                    <div className="flex items-center gap-4">
                      <span className="text-gray-400 text-sm font-medium">
                        {activeCard + 1} of {cardLength}
                      </span>
                      <div className="w-24 h-1 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-300 ease-out"
                          style={{
                            width: `${((activeCard + 1) / cardLength) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Subtle side indicators for left-right navigation */}
            <div className="absolute inset-y-0 -left-10 w-10 bg-gradient-to-r from-purple-500/5 to-transparent" />
            <div className="absolute inset-y-0 -right-10 w-10 bg-gradient-to-l from-purple-500/5 to-transparent" />
          </div>
        </div>
      </motion.div>

      {/* Enhanced Styles for Better Content UI */}
      <style jsx global>{`
        /* Core styles only */
        .enhanced-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .enhanced-scrollbar::-webkit-scrollbar-track {
          background: rgba(139, 92, 246, 0.1);
          border-radius: 8px;
        }
        .enhanced-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(
            135deg,
            rgba(139, 92, 246, 0.6),
            rgba(59, 130, 246, 0.6)
          );
          border-radius: 8px;
          border: 2px solid transparent;
          background-clip: content-box;
        }

        .enhanced-content {
          color: #fff;
          font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
          filter: drop-shadow(0 0 15px rgba(139, 92, 246, 0.15));
          transition: filter 0.3s ease;
        }
        
        .enhanced-content:hover {
          filter: drop-shadow(0 0 20px rgba(139, 92, 246, 0.25));
        }

        /* Content element animations */
        .enhanced-content > * {
          animation: enhancedFadeIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          opacity: 0;
          transform: translateY(20px) translateZ(0);
        }

        @keyframes enhancedFadeIn {
          0% { opacity: 0; transform: translateY(25px) translateZ(0); }
          100% { opacity: 1; transform: translateY(0) translateZ(0); }
        }

        /* Staggered content timing */
        .enhanced-content > *:nth-child(1) { animation-delay: 0.1s; }
        .enhanced-content > *:nth-child(2) { animation-delay: 0.17s; }
        .enhanced-content > *:nth-child(3) { animation-delay: 0.24s; }
        .enhanced-content > *:nth-child(4) { animation-delay: 0.31s; }
        .enhanced-content > *:nth-child(5) { animation-delay: 0.38s; }
        .enhanced-content > *:nth-child(6) { animation-delay: 0.45s; }
        
        /* Essential content styling */
        .enhanced-content a {
          color: #a78bfa;
          font-weight: 600;
          position: relative;
          transition: all 0.3s ease;
        }
        
        .enhanced-content a:hover {
          color: #c4b5fd;
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
          content: "";
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
          content: "";
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
          transform: translateX(2px);
          background: rgba(139, 92, 246, 0.05);
        }
        .enhanced-content li::before {
          content: "◆";
          position: absolute;
          left: 0.5rem;
          color: #8b5cf6;
          font-weight: bold;
          font-size: 1em;
          transition: color 0.2s ease;
          top: 0.75rem;
        }
        .enhanced-content li:hover::before {
          color: #a78bfa;
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
          background: linear-gradient(
            135deg,
            rgba(139, 92, 246, 0.15),
            rgba(59, 130, 246, 0.15)
          );
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
        }

        /* Enhanced Code Blocks */
        .enhanced-content pre,
        .enhanced-content code {
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 8px;
          font-family: "Fira Code", "Monaco", "Consolas", monospace;
          color: #e2e8f0;
        }
        .enhanced-content pre {
          padding: 1.5rem;
          margin: 1.5rem 0;
          overflow-x: auto;
          position: relative;
        }
        .enhanced-content pre::before {
          content: "";
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
          border-color: rgba(139, 92, 246, 0.4);
          box-shadow: 0 8px 24px rgba(139, 92, 246, 0.2);
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
          background: linear-gradient(
            135deg,
            rgba(139, 92, 246, 0.2),
            rgba(59, 130, 246, 0.2)
          );
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
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
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
          border-color: rgba(139, 92, 246, 0.4);
          box-shadow: 0 8px 24px rgba(139, 92, 246, 0.2);
        }

        /* Enhanced Animations */
        .enhanced-content > * {
          animation: enhancedFadeIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          opacity: 0;
          transform: translateY(20px) translateZ(0);
        }

        @keyframes enhancedFadeIn {
          0% {
            opacity: 0;
            transform: translateY(25px) translateZ(0);
          }
          100% {
            opacity: 1;
            transform: translateY(0) translateZ(0);
          }
        }

        /* Improved staggered animations with more natural timing */
        .enhanced-content > *:nth-child(1) { animation-delay: 0.1s; }
        .enhanced-content > *:nth-child(2) { animation-delay: 0.17s; }
        .enhanced-content > *:nth-child(3) { animation-delay: 0.24s; }
        .enhanced-content > *:nth-child(4) { animation-delay: 0.31s; }
        .enhanced-content > *:nth-child(5) { animation-delay: 0.38s; }
        .enhanced-content > *:nth-child(6) { animation-delay: 0.45s; }
        .enhanced-content > *:nth-child(7) { animation-delay: 0.52s; }
        .enhanced-content > *:nth-child(8) { animation-delay: 0.59s; }

        /* Page turning effect enhancement */
        @keyframes pageTurn {
          from { transform: rotateY(90deg); opacity: 0.2; }
          to { transform: rotateY(0); opacity: 1; }
        }

        /* Add subtle hover animation to make content feel alive */
        .enhanced-content:hover > *:hover {
          transform: translateY(-2px) scale(1.01);
          transition: transform 0.3s ease;
        }
        
        /* Animation for navigation between cards */
        @media (prefers-reduced-motion: no-preference) {
          .active-card-transition {
            transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
        }

        /* Simplified glow effect with improved animation */
        .enhanced-content {
          filter: drop-shadow(0 0 15px rgba(139, 92, 246, 0.15));
          transition: filter 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .enhanced-content:hover {
          filter: drop-shadow(0 0 25px rgba(139, 92, 246, 0.3));
        }

        /* Parallax Animation Effects */
        .parallax-card {
          transform-style: preserve-3d;
          transform-origin: center center;
        }
        
        .parallax-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at center, transparent 60%, rgba(139, 92, 246, 0.1));
          z-index: -1;
          opacity: 0;
          transition: opacity 1s ease;
        }
        
        .parallax-card:hover::before {
          opacity: 1;
        }

        /* Enhanced parallax content animations */
        .enhanced-content > * {
          animation: parallaxFadeIn 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          opacity: 0;
          transform: translateZ(0);
        }
        
        @keyframes parallaxFadeIn {
          0% {
            opacity: 0;
            transform: translateY(30px) translateZ(-50px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) translateZ(0);
          }
        }

        /* Staggered parallax timings with different depths */
        .enhanced-content > *:nth-child(1) { 
          animation-delay: 0.1s; 
          transform: translateZ(10px);
        }
        .enhanced-content > *:nth-child(2) { 
          animation-delay: 0.17s; 
          transform: translateZ(20px);
        }
        .enhanced-content > *:nth-child(3) { 
          animation-delay: 0.24s; 
          transform: translateZ(30px);
        }
        .enhanced-content > *:nth-child(4) { 
          animation-delay: 0.31s; 
          transform: translateZ(25px);
        }
        .enhanced-content > *:nth-child(5) { 
          animation-delay: 0.38s; 
          transform: translateZ(15px);
        }
        .enhanced-content > *:nth-child(6) { 
          animation-delay: 0.45s; 
          transform: translateZ(5px);
        }
        .enhanced-content > *:nth-child(7) { 
          animation-delay: 0.52s; 
          transform: translateZ(15px);
        }
        .enhanced-content > *:nth-child(8) { 
          animation-delay: 0.59s; 
          transform: translateZ(10px);
        }
        
        /* Improved parallax page turn effect */
        @keyframes parallaxPageTurn {
          0% {
            transform: rotateY(70deg) translateZ(-100px);
            opacity: 0;
          }
          100% {
            transform: rotateY(0) translateZ(0);
            opacity: 1;
          }
        }
        
        /* Parallax mouse movement effect */
        .parallax-card:hover {
          transition: transform 0.2s ease-out;
        }
        
        .parallax-card:hover .enhanced-content > * {
          transition: transform 0.2s ease-out;
        }
        
        /* Parallax shadows for depth enhancement */
        .parallax-card::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 40%;
          background: linear-gradient(to top, rgba(0,0,0,0.2), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        
        .parallax-card:hover::after {
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
};

export default StickyScroll;
