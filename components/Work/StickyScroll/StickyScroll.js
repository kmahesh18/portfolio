import React, { useState, useRef, useEffect, useId } from "react";
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from "framer-motion";
import { WORK_CONTENT } from "../../../constants";

// Canvas Reveal Effect Component (simplified)
const CanvasRevealEffect = ({ colors = [[139, 92, 246], [88, 28, 135]] }) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-violet-400/60 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 2 + 1,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// CardSpotlight Component
const CardSpotlight = ({ children, className, onClick }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`group/spotlight relative border border-violet-500/30 bg-gradient-to-br rounded-2xl overflow-hidden cursor-pointer ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={onClick}
    >
      <motion.div
        className="pointer-events-none absolute z-0 -inset-px rounded-2xl opacity-0 transition duration-300 group-hover/spotlight:opacity-100"
        style={{
          backgroundColor: "#581c87",
          maskImage: useMotionTemplate`
            radial-gradient(
              300px circle at ${mouseX}px ${mouseY}px,
              white,
              transparent 80%
            )
          `,
        }}
      >
        {isHovering && <CanvasRevealEffect />}
      </motion.div>
      
      {/* Glowing border effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-violet-500/0 pointer-events-none"
        animate={{
          borderColor: isHovering 
            ? ["rgba(139, 92, 246, 0)", "rgba(139, 92, 246, 0.8)", "rgba(139, 92, 246, 0)"] 
            : "rgba(139, 92, 246, 0)",
        }}
        transition={{
          duration: 2,
          repeat: isHovering ? Infinity : 0,
          ease: "easeInOut",
        }}
      />
      
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
};

// WobbleCard Component (enhanced with wobble effect)
const WobbleCard = ({ children, containerClassName, onClick }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (clientX - (rect.left + rect.width / 2)) / 15;
    const y = (clientY - (rect.top + rect.height / 2)) / 15;
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      style={{
        transform: isHovering
          ? `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) scale3d(1.02, 1.02, 1)`
          : "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
        transition: "transform 0.15s ease-out",
      }}
      className="w-full h-full"
    >
      {/* Desktop version with CardSpotlight */}
      <div className="hidden md:block">
        <CardSpotlight
          className={containerClassName}
          onClick={onClick}
        >
          <motion.div
            style={{
              transform: isHovering
                ? `translate3d(${-mousePosition.x * 0.5}px, ${-mousePosition.y * 0.5}px, 0)`
                : "translate3d(0px, 0px, 0)",
              transition: "transform 0.15s ease-out",
            }}
            className="h-full px-4 py-6"
          >
            {children}
          </motion.div>
        </CardSpotlight>
      </div>

      {/* Mobile version with animated gradients */}
      <motion.div
        className="md:hidden w-full h-full relative overflow-hidden rounded-2xl cursor-pointer"
        onClick={onClick}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: "linear-gradient(-45deg, #1a0033, #2d1b69, #0f0a1f, #4c1d95, #1a0033)",
          backgroundSize: "400% 400%",
        }}
      >
        {/* Animated border */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(139, 92, 246, 0.3), rgba(167, 139, 250, 0.1), rgba(139, 92, 246, 0.3))",
              "linear-gradient(45deg, rgba(167, 139, 250, 0.3), rgba(139, 92, 246, 0.1), rgba(167, 139, 250, 0.3))",
              "linear-gradient(45deg, rgba(139, 92, 246, 0.3), rgba(167, 139, 250, 0.1), rgba(139, 92, 246, 0.3))",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            padding: "2px",
            borderRadius: "1rem",
          }}
        >
          <div className="w-full h-full bg-black rounded-2xl" />
        </motion.div>

        {/* Floating particles for mobile */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-violet-400/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.6, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Content */}
        <motion.div
          className="relative z-10 h-full px-4 py-6"
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {children}
        </motion.div>

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-20"
          animate={{
            boxShadow: [
              "inset 0 0 20px rgba(139, 92, 246, 0.1)",
              "inset 0 0 40px rgba(139, 92, 246, 0.3)",
              "inset 0 0 20px rgba(139, 92, 246, 0.1)",
            ],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </motion.div>
  );
};

// Outside click hook
const useOutsideClick = (ref, callback) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      callback(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]);
};

// Close Icon Component
const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4 text-white"
  >
    <path d="M18 6l-12 12" />
    <path d="M6 6l12 12" />
  </svg>
);

const StickyScroll = ({ githubData, codeforcesData, codeChefData, leetcodeData }) => {
  const [active, setActive] = useState(null);
  const ref = useRef(null);
  const id = useId();

  const contentItems = WORK_CONTENT || [];

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  const getCardColors = (index) => {
    const colors = [
      "from-violet-600/40 via-purple-700/30 to-black",
      "from-purple-600/40 via-violet-700/30 to-black", 
      "from-indigo-600/40 via-violet-700/30 to-black",
      "from-violet-700/40 via-purple-600/30 to-black",
      "from-purple-700/40 via-violet-600/30 to-black",
      "from-indigo-700/40 via-purple-600/30 to-black"
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="relative w-full overflow-hidden bg-black min-h-screen py-8 px-4">
      {/* Background overlay when modal is open */}
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 h-full w-full z-10"
          />
        )}
      </AnimatePresence>

      {/* Expandable Card Modal */}
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100] p-4">
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="flex absolute top-4 right-4 items-center justify-center bg-purple-600 hover:bg-purple-700 rounded-full h-10 w-10 z-50"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              ref={ref}
              initial={{ 
                opacity: 0, 
                scale: 0.8, 
                y: 50,
                rotateX: -15 
              }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: 0,
                rotateX: 0 
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.8, 
                y: 50,
                rotateX: -15 
              }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 25,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="w-full max-w-4xl h-fit max-h-[70vh] md:max-h-[90%] flex flex-col bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-purple-900/95 backdrop-blur-2xl border border-purple-500/20 rounded-3xl overflow-hidden shadow-2xl"
              style={{
                boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.4), 0 0 0 1px rgba(139, 92, 246, 0.1)"
              }}
            >
              {/* Modal Header */}
              <motion.div 
                className="p-4 md:p-6 border-b border-purple-500/20"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2">
                  {active.title}
                </h3>
                <p className="text-gray-300 text-sm md:text-lg">
                  {active.description}
                </p>
              </motion.div>

              {/* Modal Content */}
              <motion.div 
                className="flex-1 p-4 md:p-6 overflow-y-auto enhanced-scrollbar"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="enhanced-content text-white">
                  {typeof active.content === "function"
                    ? active.content({
                        githubData,
                        codeforcesData,
                        codeChefData,
                        leetcodeData,
                      })
                    : active.content}
                </div>
              </motion.div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      {/* Main Content - Header */}
      <div className="w-full max-w-4xl mx-auto mb-8 text-center">
        <h2 className="text-7xl font-bold text-center mb-4 gradient-text"
          style={{
            background: "linear-gradient(135deg, #9F7AEA 0%, #4C1D95 50%, #9F7AEA 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundSize: "200% auto",
            animation: "shine 5s linear infinite",
          }}>
          My Professional Journey
        </h2>
        <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Explore my technical expertise, projects, and achievements through interactive cards.
        </p>
      </div>

      {/* WobbleCard Grid */}
      <div className="w-full max-w-4xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-4">
          {contentItems.map((item, index) => {
            const isLarge = index === 0 || index === 3;
            return (
              <motion.div
                key={`card-${item.title}-${id}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: "easeOut" 
                }}
                className={`${
                  isLarge ? "col-span-2 lg:col-span-2" : "col-span-1"
                }`}
              >
                <WobbleCard
                  containerClassName={`w-full h-full min-h-[180px] md:min-h-[220px] lg:min-h-[260px] hover:shadow-violet-500/50 hover:border-violet-400/70 transition-all duration-300 group ${getCardColors(index)}`}
                  onClick={() => setActive(item)}
                >
                  <div className="w-full h-full flex flex-col justify-between relative">
                    <div className="flex-1 flex flex-col justify-center">
                      <motion.h2 
                        className="text-left text-balance text-sm md:text-base lg:text-lg xl:text-xl font-semibold tracking-[-0.015em] text-white mb-3 leading-tight group-hover:text-violet-200 transition-colors duration-300"
                        animate={{
                          color: ["#ffffff", "#c4b5fd", "#ffffff"],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          repeatType: "reverse",
                        }}
                      >
                        {item.title}
                      </motion.h2>
                      <motion.p 
                        className="text-left text-xs md:text-sm lg:text-base text-gray-300 group-hover:text-gray-200 line-clamp-3 leading-relaxed transition-colors duration-300"
                      >
                        {item.description}
                      </motion.p>
                    </div>
                    
                    {/* Mobile tap indicator */}
                    <motion.div 
                      className="absolute bottom-2 right-2 md:opacity-0 md:group-hover:opacity-100 opacity-60 transition-all duration-300"
                      animate={{
                        x: [0, 3, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </motion.div>
                  </div>
                </WobbleCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Essential Styles for Content */}
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        html, body {
          overflow-x: hidden !important;
          max-width: 100vw !important;
        }

        @keyframes shine {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }

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

        .enhanced-content {
          color: #fff;
          font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .enhanced-content > * {
          animation: enhancedFadeIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          opacity: 0;
          transform: translateY(20px);
        }

        @keyframes enhancedFadeIn {
          0% { opacity: 0; transform: translateY(25px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .enhanced-content > *:nth-child(1) { animation-delay: 0.1s; }
        .enhanced-content > *:nth-child(2) { animation-delay: 0.17s; }
        .enhanced-content > *:nth-child(3) { animation-delay: 0.24s; }
        .enhanced-content > *:nth-child(4) { animation-delay: 0.31s; }
        .enhanced-content > *:nth-child(5) { animation-delay: 0.38s; }
        .enhanced-content > *:nth-child(6) { animation-delay: 0.45s; }

        .enhanced-content a {
          color: #a78bfa;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          padding: 2px 4px;
          border-radius: 4px;
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
          border-radius: 1px;
        }
        
        .enhanced-content a:hover {
          color: #c4b5fd;
          transform: translateY(-1px);
        }
        
        .enhanced-content a:hover::after {
          width: 100%;
        }
        
        .enhanced-content h1,
        .enhanced-content h2,
        .enhanced-content h3,
        .enhanced-content h4 {
          color: #ffffff;
          font-weight: 700;
          margin: 2rem 0 1rem 0;
          line-height: 1.2;
        }

        .enhanced-content p {
          color: #e2e8f0;
          line-height: 1.8;
          margin-bottom: 1.5rem;
          font-size: 1.05rem;
        }

        .enhanced-content ul {
          list-style-type: none;
          padding: 1.5rem;
          margin: 1.5rem 0;
          background: rgba(139, 92, 246, 0.02);
          border-radius: 12px;
          border: 1px solid rgba(139, 92, 246, 0.1);
        }
        
        .enhanced-content li {
          margin-bottom: 1rem;
          color: #e2e8f0;
          position: relative;
          padding: 0.75rem 0 0.75rem 2rem;
          font-size: 1.05rem;
          line-height: 1.6;
          border-radius: 8px;
          transition: all 0.3s ease;
        }
        
        .enhanced-content li:hover {
          color: #f1f5f9;
          background: rgba(139, 92, 246, 0.05);
        }
        
        .enhanced-content li::before {
          content: "◆";
          position: absolute;
          left: 0.5rem;
          color: #8b5cf6;
          font-weight: bold;
          top: 0.75rem;
        }

        .enhanced-content img {
          max-width: 100%;
          height: auto;
          border-radius: 16px;
          margin: 1.5rem 0;
          border: 1px solid rgba(139, 92, 246, 0.2);
        }

        .enhanced-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 2rem 0;
          background: rgba(139, 92, 246, 0.03);
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(139, 92, 246, 0.2);
        }
        
        .enhanced-content th,
        .enhanced-content td {
          padding: 1.25rem 1rem;
          text-align: left;
          border-bottom: 1px solid rgba(139, 92, 246, 0.1);
        }
        
        .enhanced-content th {
          background: rgba(139, 92, 246, 0.15);
          font-weight: bold;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .enhanced-content td {
          color: #e2e8f0;
        }

        .enhanced-content code {
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 8px;
          padding: 0.25rem 0.5rem;
          font-family: "Monaco", "Consolas", monospace;
          color: #e2e8f0;
          font-size: 0.9em;
        }
      `}</style>
    </div>
  );
};

export default StickyScroll;
