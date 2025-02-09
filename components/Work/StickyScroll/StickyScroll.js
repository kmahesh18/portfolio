import React, { useState, useRef } from "react";
import { useMotionValueEvent, useScroll, motion } from "framer-motion";
import { WORK_CONTENT } from "../../../constants";

const StickyScroll = () => {
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
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 px-4">
            {/* Left Side - Navigation with enhanced 3D */}
            <div className="space-y-6 perspective-1000">
              {contentItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  className={`p-6 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 
                    ${activeCard === index 
                      ? "bg-[#111111] border-2 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]" 
                      : "bg-[#111111] border border-gray-800 hover:border-purple-500/50"
                    }`}
                  style={{
                    transform: activeCard === index 
                      ? "translateZ(50px) rotateX(2deg)" 
                      : "translateZ(0)",
                    transformStyle: "preserve-3d",
                    transition: "transform 0.3s ease-out",
                  }}
                  whileHover={{
                    transform: "translateZ(30px) rotateX(2deg)",
                  }}
                  onClick={() => setActiveCard(index)}
                >
                  <h3 className="text-2xl font-bold mb-2 text-white">
                    {item.title}
                  </h3>
                  <p className="text-white">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Right Side - Content Display with enhanced 3D */}
            <div className="relative perspective-1000">
              <motion.div
                className="bg-[#111111] p-8 rounded-xl border-2 border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.3)]"
                style={{
                  transform: "translateZ(80px) rotateX(2deg)",
                  transformStyle: "preserve-3d",
                  transition: "all 0.5s ease-out",
                }}
                whileHover={{
                  transform: "translateZ(90px) rotateX(2deg)",
                }}
                initial={false}
                animate={{
                  y: [20, 0],
                }}
                transition={{
                  duration: 0.3,
                }}
                key={activeCard}
              >
                <div className="text-white transform transition-transform duration-300">
                  {contentItems[activeCard]?.content}
                </div>
              </motion.div>
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
