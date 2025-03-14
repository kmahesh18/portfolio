import React, { useState, useRef } from "react";
import { useMotionValueEvent, useScroll, motion } from "framer-motion";
import { WORK_CONTENT } from "../../../constants";

const StickyScroll = ({ githubData, codeforcesData, codeChefData, leetcodeData }) => {
  const [activeCard, setActiveCard] = useState(0);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const contentItems = WORK_CONTENT || [];
  const cardLength = contentItems.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const currentIndex = Math.min(
      cardLength - 1,
      Math.floor(latest * cardLength)
    );
    setActiveCard(currentIndex);
  });

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 py-8">
      <motion.div ref={containerRef} className="relative h-[200vh]">
        <div className="sticky top-0 h-screen flex items-center">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Side - Navigation */}
            <div className="space-y-6">
              {contentItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  className={`p-6 rounded-xl cursor-pointer transition-all duration-500 relative
                    ${activeCard === index 
                      ? "bg-[#0A0A1B] border-2 border-[#7913ff] shadow-[0_0_15px_rgba(121,19,255,0.3)]" 
                      : "bg-[#0A0A1B] border border-violet-500/20 hover:border-violet-500/40"
                    }`}
                  style={{
                    transform: activeCard === index ? "scale(1.02)" : "scale(1)",
                  }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setActiveCard(index)}
                >
                  {/* Arrow Indicator */}
                  {activeCard === index && (
                    <motion.div 
                      className="absolute -right-6 top-1/2 -translate-y-1/2 hidden lg:block"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="#7913ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.div>
                  )}

                  <h3 className={`text-xl font-bold mb-2 transition-colors duration-300
                    ${activeCard === index ? "text-[#7913ff]" : "text-white"}`}>
                    {item.title}
                  </h3>
                  <p className="text-violet-200/60">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Right Side - Content Display */}
            <div className="relative perspective-1000">
              <motion.div
                className="bg-[#0A0A1B] rounded-xl border-2 border-violet-500/20 
                  shadow-[0_0_30px_rgba(121,19,255,0.2)] overflow-hidden
                  backdrop-blur-sm relative z-10"
                initial={{ opacity: 0, y: 20, rotateX: 5 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  rotateX: 0,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 20
                  }
                }}
                key={activeCard}
              >
                {/* Ambient Glow */}
                <div className="absolute -inset-[1px] bg-gradient-to-r from-[#7913ff]/20 via-violet-500/20 to-[#7913ff]/20 
                  blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="relative p-6">
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

                {/* Bottom Gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r 
                  from-transparent via-[#7913ff]/50 to-transparent" />
              </motion.div>

              {/* Floating Effect */}
              <motion.div
                className="absolute -inset-4 bg-[#7913ff]/5 rounded-xl blur-2xl z-0"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .prose {
          color: #fff;
        }
        .prose a {
          color: #a78bfa;
          font-weight: 500;
        }
        .prose a:hover {
          color: #c4b5fd;
        }
        .prose h3 {
          color: #fff;
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }
        .prose p {
          color: #fff;
          line-height: 1.6;
        }
        .prose ul {
          list-style-type: none;
          padding: 0;
        }
        .prose li {
          margin-bottom: 0.75rem;
          color: #fff;
        }
        .prose li a {
          color: #fff;
          text-decoration: none;
          transition: color 0.2s;
        }
        .prose li a:hover {
          color: #a78bfa;
        }
      `}</style>
    </div>
  );
};

export default StickyScroll;
