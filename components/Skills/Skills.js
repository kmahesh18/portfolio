"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { MENULINKS, SKILLS } from "../../constants";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

// Background Beams with Collision Component
const BackgroundBeamsWithCollision = ({ children, className }) => {
  const containerRef = useRef(null);
  const parentRef = useRef(null);

  const beams = [
    {
      initialX: 50,
      translateX: 50,
      duration: 8,
      repeatDelay: 2,
      delay: 1,
    },
    {
      initialX: 150,
      translateX: 150,
      duration: 6,
      repeatDelay: 4,
      delay: 2,
    },
    {
      initialX: 250,
      translateX: 250,
      duration: 10,
      repeatDelay: 3,
      className: "h-8",
    },
    {
      initialX: 350,
      translateX: 350,
      duration: 7,
      repeatDelay: 5,
      delay: 3,
    },
    {
      initialX: 450,
      translateX: 450,
      duration: 9,
      repeatDelay: 2,
      className: "h-16",
    },
    {
      initialX: 550,
      translateX: 550,
      duration: 5,
      repeatDelay: 6,
      className: "h-12",
    },
    {
      initialX: 650,
      translateX: 650,
      duration: 8,
      repeatDelay: 3,
      delay: 1,
      className: "h-6",
    },
    {
      initialX: 750,
      translateX: 750,
      duration: 11,
      repeatDelay: 4,
      delay: 2,
      className: "h-10",
    },
  ];

  return (
    <div
      ref={parentRef}
      className={`relative w-full ${className}`}
      style={{ minHeight: '100vh' }}
    >
      {beams.map((beam) => (
        <CollisionMechanism
          key={beam.initialX + "beam-idx"}
          beamOptions={beam}
          containerRef={containerRef}
          parentRef={parentRef}
        />
      ))}
      {children}
      <div
        ref={containerRef}
        className="absolute bottom-0 w-full inset-x-0 pointer-events-none h-32 bg-gradient-to-t from-black/80 to-transparent"
      />
    </div>
  );
};

const CollisionMechanism = ({ parentRef, containerRef, beamOptions = {} }) => {
  const beamRef = useRef(null);
  const [collision, setCollision] = useState({
    detected: false,
    coordinates: null,
  });
  const [beamKey, setBeamKey] = useState(0);
  const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false);

  useEffect(() => {
    const checkCollision = () => {
      if (
        beamRef.current &&
        containerRef.current &&
        parentRef.current &&
        !cycleCollisionDetected
      ) {
        const beamRect = beamRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const parentRect = parentRef.current.getBoundingClientRect();

        if (beamRect.bottom >= containerRect.top) {
          const relativeX = beamRect.left - parentRect.left + beamRect.width / 2;
          const relativeY = beamRect.bottom - parentRect.top;

          setCollision({
            detected: true,
            coordinates: {
              x: relativeX,
              y: relativeY,
            },
          });
          setCycleCollisionDetected(true);
        }
      }
    };

    const animationInterval = setInterval(checkCollision, 50);
    return () => clearInterval(animationInterval);
  }, [cycleCollisionDetected, containerRef]);

  useEffect(() => {
    if (collision.detected && collision.coordinates) {
      setTimeout(() => {
        setCollision({ detected: false, coordinates: null });
        setCycleCollisionDetected(false);
      }, 2000);

      setTimeout(() => {
        setBeamKey((prevKey) => prevKey + 1);
      }, 2000);
    }
  }, [collision]);

  return (
    <>
      <motion.div
        key={beamKey}
        ref={beamRef}
        animate="animate"
        initial={{
          translateY: beamOptions.initialY || "-200px",
          translateX: beamOptions.initialX || "0px",
          rotate: beamOptions.rotate || 0,
        }}
        variants={{
          animate: {
            translateY: beamOptions.translateY || "1800px",
            translateX: beamOptions.translateX || "0px",
            rotate: beamOptions.rotate || 0,
          },
        }}
        transition={{
          duration: beamOptions.duration || 8,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          delay: beamOptions.delay || 0,
          repeatDelay: beamOptions.repeatDelay || 0,
        }}
        className={`absolute left-0 top-0 h-14 w-1 rounded-full bg-gradient-to-b from-transparent via-violet-400 to-purple-600 opacity-90 shadow-lg ${beamOptions.className || ''}`}
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(139, 92, 246, 0.8) 30%, rgba(147, 51, 234, 1) 100%)',
          filter: 'drop-shadow(0 0 6px rgba(139, 92, 246, 0.6))',
          transform: `translateX(${beamOptions.initialX}px)`
        }}
      />
      <AnimatePresence>
        {collision.detected && collision.coordinates && (
          <Explosion
            key={`${collision.coordinates.x}-${collision.coordinates.y}`}
            style={{
              left: `${collision.coordinates.x}px`,
              top: `${collision.coordinates.y}px`,
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

const Explosion = ({ ...props }) => {
  const spans = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    initialX: 0,
    initialY: 0,
    directionX: Math.floor(Math.random() * 80 - 40),
    directionY: Math.floor(Math.random() * -50 - 10),
  }));

  return (
    <div {...props} className="absolute z-50 h-2 w-2">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute -inset-x-10 top-0 m-auto h-2 w-10 rounded-full bg-gradient-to-r from-transparent via-purple-500 to-transparent blur-sm"
      />
      {spans.map((span) => (
        <motion.span
          key={span.id}
          initial={{ x: span.initialX, y: span.initialY, opacity: 1 }}
          animate={{
            x: span.directionX,
            y: span.directionY,
            opacity: 0,
          }}
          transition={{ duration: Math.random() * 1.5 + 0.5, ease: "easeOut" }}
          className="absolute h-1 w-1 rounded-full bg-gradient-to-b from-purple-500 to-violet-500"
        />
      ))}
    </div>
  );
};

const AnimatedSkillTooltip = ({ items }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);
  const rotate = useSpring(useTransform(x, [-100, 100], [-15, 15]), springConfig);
  const translateX = useSpring(useTransform(x, [-100, 100], [-20, 20]), springConfig);
  
  const handleMouseMove = (event) => {
    const halfWidth = event.target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="p-4">
        <div className="flex flex-wrap items-center justify-center">
          {items.map((item, idx) => (
            <div
              className="group relative"
              key={item.name}
              onMouseEnter={() => setHoveredIndex(item.id)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <AnimatePresence mode="popLayout">
                {hoveredIndex === item.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.6 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 260,
                        damping: 10,
                      },
                    }}
                    exit={{ opacity: 0, y: 20, scale: 0.6 }}
                    style={{
                      translateX: translateX,
                      rotate: rotate,
                      whiteSpace: "nowrap",
                    }}
                    className="absolute -top-14 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-center rounded-lg bg-gradient-to-br from-purple-900/95 to-black/95 backdrop-blur-sm px-3 py-2 text-xs shadow-2xl"
                  >
                    <div className="absolute inset-x-3 -bottom-px z-30 h-px w-[60%] bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
                    <div className="absolute -bottom-px left-3 z-30 h-px w-[30%] bg-gradient-to-r from-transparent via-violet-400 to-transparent" />
                    <div className="relative z-30 text-sm font-bold text-white">
                      {item.name}
                    </div>
                    <div className="text-xs text-purple-300">{item.category}</div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <motion.div
                onMouseMove={handleMouseMove}
                className="relative w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-violet-900/60 to-violet-800/80 rounded-xl overflow-hidden transition-all duration-300 backdrop-blur-sm cursor-pointer m-1"
                animate={{
                  y: [0, -8, 0],
                  boxShadow: [
                    "0 0 20px rgba(139, 92, 246, 0.3)",
                    "0 0 30px rgba(139, 92, 246, 0.6)",
                    "0 0 20px rgba(139, 92, 246, 0.3)"
                  ]
                }}
                transition={{
                  y: {
                    duration: 2 + (idx % 3),
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: idx * 0.2
                  },
                  boxShadow: {
                    duration: 1.5 + (idx % 2),
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: idx * 0.3
                  }
                }}
                whileHover={{ 
                  scale: 1.15,
                  y: -12,
                  boxShadow: "0 0 40px rgba(139, 92, 246, 0.8)",
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 via-transparent to-violet-500/20 animate-pulse" />
                <Image
                  src={`/skills/${item.image}.svg`}
                  alt={item.name}
                  layout="fill"
                  className="p-2 md:p-2.5 filter brightness-95 group-hover:brightness-120 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SkillsGrid = () => {
  // Convert skills to the format needed for AnimatedSkillTooltip
  const allSkills = [
    ...SKILLS.languages.map((skill, index) => ({
      id: index + 1,
      name: skill.charAt(0).toUpperCase() + skill.slice(1),
      category: "Languages",
      image: skill
    })),
    ...SKILLS.librariesAndFrameworks.map((skill, index) => ({
      id: index + 100,
      name: skill === "reactnative" ? "React Native" : 
            skill === "nextjs" ? "Next.js" : 
            skill === "tailwindcss" ? "Tailwind CSS" :
            skill === "styledcomponents" ? "Styled Components" :
            skill === "chakra-ui" ? "Chakra UI" :
            skill === "antdesign" ? "Ant Design" :
            skill.charAt(0).toUpperCase() + skill.slice(1),
      category: "Frameworks & Libraries",
      image: skill
    })),
    ...SKILLS.databases.map((skill, index) => ({
      id: index + 200,
      name: skill === "mongodb" ? "MongoDB" :
            skill === "mysql" ? "MySQL" :
            skill === "postgresql" ? "PostgreSQL" :
            skill.charAt(0).toUpperCase() + skill.slice(1),
      category: "Databases",
      image: skill
    })),
    ...SKILLS.Tools.map((skill, index) => ({
      id: index + 300,
      name: skill === "nodejs" ? "Node.js" :
            skill === "docker" ? "Docker" :
            skill === "postman" ? "Postman" :
            skill === "socketio" ? "Socket.IO" :
            skill === "webrtc" ? "WebRTC" :
            skill === "sanity-io" ? "Sanity" :
            skill === "tanstack-query" ? "TanStack Query" :
            skill === "github" ? "GitHub" :
            skill === "vercel" ? "Vercel" :
            skill.charAt(0).toUpperCase() + skill.slice(1),
      category: "Tools & Services",
      image: skill
    }))
  ];

  return (
    <div className="w-full">
      <AnimatedSkillTooltip items={allSkills} />
    </div>
  );
};

const Skills = () => {
  const targetSection = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetSection,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      className="w-full relative select-none bg-black py-20 overflow-hidden"
      id={MENULINKS[1].ref}
      ref={targetSection}
    >
      {/* Background Beams with Collision */}
      <div className="absolute inset-0 w-full h-full z-0">
        <BackgroundBeamsWithCollision className="w-full h-full">
          <div />
        </BackgroundBeamsWithCollision>
      </div>

      {/* Enhanced Title with animation */}
      <motion.div 
        className="text-center mb-12 relative z-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mt-28 z-40"
        >
          <h2 className="text-7xl font-bold text-center mb-4 gradient-text"
            style={{
              background: "linear-gradient(135deg, #9F7AEA 0%, #4C1D95 50%, #9F7AEA 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundSize: "200% auto",
              animation: "shine 5s linear infinite",
            }}>
            Skills
          </h2>
        </motion.div>
        <motion.div
          className="w-24 h-1 bg-gradient-to-r from-purple-500 to-purple-900 mx-auto mt-6 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: 96 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </motion.div>

      {/* Skills Grid */}
      <motion.div 
        style={{ opacity, y }}
        className="relative z-20"
      >
        <SkillsGrid />
      </motion.div>

      {/* Background cosmic effects */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full filter blur-[150px] animate-pulse" 
          style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full filter blur-[150px] animate-pulse"
          style={{ animationDuration: '10s', animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/3 rounded-full filter blur-[200px]" />
      </div>

      {/* Global styles */}
      <style jsx global>{`
        @keyframes shine {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>
    </section>
  );
};

export default Skills;