/* eslint-disable @next/next/no-img-element */
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { MENULINKS, SKILLS } from "../../constants";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";

const SkillIcon = ({ skill, index }) => (
  <motion.div
    className="group relative mx-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ 
      duration: 0.5, 
      delay: index * 0.05,
      type: "spring", 
      stiffness: 100
    }}
    whileHover={{ 
      scale: 1.15, 
      y: -8,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }}
  >
    <div className="relative w-20 h-20 md:w-24 md:h-24 bg-[#0A0A1B] rounded-xl border border-purple-500/20 
      overflow-hidden transition-all duration-300 group-hover:border-purple-500/70 
      group-hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] backdrop-blur-sm">
      <Image
        src={`/skills/${skill}.svg`}
        alt={skill}
        layout="fill"
        className="p-4 filter brightness-95 group-hover:brightness-110 transition-all duration-300"
      />
      {/* <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent opacity-0 
        group-hover:opacity-100 transition-opacity duration-300" /> */}
    </div>
    <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 w-full text-center">
      <span className="text-sm text-purple-300 opacity-0 group-hover:opacity-100 
        transition-all duration-300 group-hover:-translate-y-1 inline-block">
        {skill}
      </span>
    </div>
  </motion.div>
);

// Enhanced CircularQueue class implementation
class CircularQueue {
  constructor(items) {
    this.items = items;
    this.size = items.length;
    this.currentIndex = 0;
  }
  
  getNextBatch(count) {
    const result = [];
    let tempIndex = this.currentIndex;
    
    for (let i = 0; i < count; i++) {
      result.push(this.items[tempIndex]);
      tempIndex = (tempIndex + 1) % this.size;
    }
    
    return result;
  }
  
  advance(steps = 1) {
    this.currentIndex = (this.currentIndex + steps) % this.size;
    return this.currentIndex;
  }
  
  getCurrentIndex() {
    return this.currentIndex;
  }
  
  getAllItems() {
    return this.items;
  }
  
  // New method for smooth rotation of items
  rotate() {
    this.advance(1);
    return this.getNextBatch(this.size);
  }
}

const InfiniteSkillScroll = () => {
  const containerRef = useRef(null);
  const [skillQueue, setSkillQueue] = useState(null);
  const [scrollDirection, setScrollDirection] = useState(1);
  const scrollSpeed = useRef(100);
  const pauseRef = useRef(false);
  
  useEffect(() => {
    const allSkills = [
      ...SKILLS.languagesAndTools,
      ...SKILLS.librariesAndFrameworks,
      ...SKILLS.databases,
      ...SKILLS.other
    ];
    
    setSkillQueue(new CircularQueue([...allSkills]));
    
    const container = containerRef.current;
    if (!container) return;
    
    let animation;
    
    const startAnimation = () => {
      if (animation) animation.kill();
      
      animation = gsap.to(container, {
        x: scrollDirection > 0 ? `-50%` : `0%`,
        duration: scrollSpeed.current /3,
        ease: "none",
        repeat: -1,
        onRepeat: () => {
          gsap.set(container, { x: scrollDirection > 0 ? `0%` : `-50%` });
        }
      });
      
      return animation;
    };
    
    animation = startAnimation();
    
    // Smoother hover transitions
    const handleMouseEnter = () => {
      pauseRef.current = true;
      gsap.to(animation, { 
        timeScale: 0.1, 
        duration: 0.3,
        ease: "power2.out"
      });
    };
    
    const handleMouseLeave = () => {
      pauseRef.current = false;
      gsap.to(animation, { 
        timeScale: 1, 
        duration: 0.3,
        ease: "power2.in"
      });
    };
    
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      if (animation) animation.kill();
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [scrollDirection]);
  
  // Prepare skills for display
  const getSkillsForDisplay = () => {
    if (!skillQueue) return [];
    
    // Get all skills for first run
    const allSkills = skillQueue.getAllItems();
    
    // Double the array for seamless loop
    return [...allSkills, ...allSkills];
  };
  
  return (
    <div className="relative max-w-7xl mx-auto overflow-hidden">
      {/* Enhance gradient edges for smoother fading */}
      <div className="absolute left-0 top-0 bottom-0 w-32 md:w-40 lg:bg-gradient-to-r lg:from-black lg:via-black/95 lg:to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 md:w-40 lg:bg-gradient-to-l lg:from-black lg:via-black/95 lg:to-transparent z-10" />
      
      {/* Skills Container */}
      <div className="overflow-hidden">
        <div
          ref={containerRef}
          className="flex items-center gap-4 md:gap-6 py-14"
          style={{ 
            width: "fit-content",
            willChange: "transform",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 0%, black 85%, transparent)"
          }}
        >
          {getSkillsForDisplay().map((skill, idx) => (
            <SkillIcon key={`skill-${idx}`} skill={skill} index={idx % (getSkillsForDisplay().length / 2)} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Skills = () => {
  const targetSection = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetSection,
    offset: ["start end", "end start"]
  });
  
  // Parallax effect values
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  return (
    <section
      className="w-full relative select-none bg-black py-20 overflow-hidden"
      id={MENULINKS[1].ref}
      ref={targetSection}
    >
      {/* Enhanced Title with animation */}
      <motion.div 
        className="text-center mb-24"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2 
          className="text-6xl sm:text-7xl lg:text-8xl font-bold relative z-10 mt-24"
          style={{
            background: "linear-gradient(135deg, #9F7AEA 0%, #4C1D95 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        >
          Skills
        </motion.h2>
        <motion.div
          className="w-24 h-1 bg-gradient-to-r from-purple-500 to-purple-900 mx-auto mt-6 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: 96 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </motion.div>

      {/* Improved Skills Scroll */}
      <motion.div style={{ y, opacity }}>
        <InfiniteSkillScroll />
      </motion.div>

      {/* Enhanced Background Effects */}
      {/* <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-[150px] animate-pulse" 
          style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-[150px] animate-pulse"
          style={{ animationDuration: '10s', animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-700/5 rounded-full filter blur-[100px] animate-pulse"
          style={{ animationDuration: '7s', animationDelay: '1s' }} />
      </div> */}
    </section>
  );
};

export default Skills;