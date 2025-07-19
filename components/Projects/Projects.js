import { useEffect, useRef, useState } from "react";
import { MENULINKS, PROJECTS } from "../../constants";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const Projects = () => {
  const targetSection = useRef(null);
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % PROJECTS.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  };

  const isActive = (index) => {
    return index === active;
  };

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      {/* Section Spacing */}
      <div className="h-32 bg-black"></div>

      <section
        ref={targetSection}
        id={MENULINKS[2].ref}
        className="relative bg-black py-20"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center mb-20 px-6"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold gradient-text"
            style={{
              background: "linear-gradient(135deg, #9F7AEA 0%, #4C1D95 50%, #9F7AEA 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundSize: "200% auto",
              animation: "shine 5s linear infinite",
            }}>
            Projects
          </h2>
        </motion.div>

        {/* Animated Projects Container - Testimonials Style */}
        <div className="mx-auto max-w-sm px-4 py-10 font-sans antialiased md:max-w-6xl md:px-8 lg:px-12">
          <div className="relative grid grid-cols-1 gap-20 lg:grid-cols-2">
            
            {/* Project Images Section - Stacked Animation */}
            <div>
              <div className="relative h-96 w-full md:h-[500px]">
                <AnimatePresence>
                  {PROJECTS.map((project, index) => (
                    <motion.div
                      key={project.name}
                      initial={{
                        opacity: 0,
                        scale: 0.9,
                        z: -100,
                        rotate: randomRotateY(),
                      }}
                      animate={{
                        opacity: isActive(index) ? 1 : 0.7,
                        scale: isActive(index) ? 1 : 0.95,
                        z: isActive(index) ? 0 : -100,
                        rotate: isActive(index) ? 0 : randomRotateY(),
                        zIndex: isActive(index)
                          ? 40
                          : PROJECTS.length + 2 - index,
                        y: isActive(index) ? [0, -20, 0] : 0,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.9,
                        z: 100,
                        rotate: randomRotateY(),
                      }}
                      transition={{
                        duration: 0.6,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 origin-bottom"
                    >
                      <div className="h-full w-full rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900/90 to-black
                        border border-purple-500/30 hover:border-purple-500/60 transition-all duration-500
                        shadow-[0_25px_60px_rgba(139,92,246,0.2)] backdrop-blur-sm">
                        
                        {/* Project Header */}
                        <div className="bg-black/60 px-4 py-2 flex items-center gap-2 border-b border-purple-500/20">
                          <motion.div className="w-2 h-2 rounded-full bg-[#FF605C]" whileHover={{ scale: 1.3 }} />
                          <motion.div className="w-2 h-2 rounded-full bg-[#FFBD44]" whileHover={{ scale: 1.3 }} />
                          <motion.div className="w-2 h-2 rounded-full bg-[#00CA4E]" whileHover={{ scale: 1.3 }} />
                          <span className="ml-2 text-[#4AE3B5] font-mono text-sm font-semibold truncate">
                            {project.name}
                          </span>
                        </div>

                        {/* Project Image */}
                        <div className="relative h-full overflow-hidden">
                          <img
                            src={project.image}
                            alt={project.name}
                            width={500}
                            height={500}
                            className="h-full w-full object-cover object-center"
                            draggable={false}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          
                          {/* Quick Action Buttons */}
                          <div className="absolute bottom-14 right-4 flex gap-2">
                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-500/30 hover:bg-purple-500/50
                                  text-purple-200 backdrop-blur-md transition-all duration-200
                                  hover:shadow-[0_0_20px_rgba(139,92,246,0.6)] border border-purple-500/50 hover:border-purple-500/70
                                  hover:scale-110 active:scale-95"
                                title="View Code"
                              >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" clipRule="evenodd" />
                                </svg>
                              </a>
                            )}
                            {project.url && (
                              <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-500/30 hover:bg-purple-500/50
                                  text-purple-200 backdrop-blur-md transition-all duration-200
                                  hover:shadow-[0_0_20px_rgba(139,92,246,0.6)] border border-purple-500/50 hover:border-purple-500/70
                                  hover:scale-110 active:scale-95"
                                title="Live Demo"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Project Details Section - Testimonials Style */}
            <div className="flex flex-col justify-between py-4">
              <motion.div
                key={active}
                initial={{
                  y: 20,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                exit={{
                  y: -20,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
                className="font-mono text-sm"
              >
                <div>
                  <span className="text-pink-500">const</span>
                  <span className="text-white"> project </span>
                  <span className="text-pink-500">=</span>
                  <span className="text-white"> {`{`}</span>
                </div>
                
                <div className="ml-6 space-y-4 mt-4">
                  {/* Project Name */}
                  <div className="hover:translate-x-2 transition-transform duration-200">
                    <span className="text-[#4AE3B5]">name:</span>
                    <h3 className="text-2xl font-bold text-yellow-300 dark:text-yellow-300 mt-2">
                      &apos;{PROJECTS[active].name}&apos;
                    </h3>
                  </div>

                  {/* Technologies */}
                  <div className="hover:translate-x-2 transition-transform duration-200">
                    <span className="text-[#4AE3B5]">technologies:</span>
                    <p className="text-sm text-orange-400 dark:text-orange-400 mt-1">
                      [{PROJECTS[active].tech.join(', ')}]
                    </p>
                  </div>

                  {/* Role */}
                  <div className="hover:translate-x-2 transition-transform duration-200">
                    <span className="text-[#4AE3B5]">myRole:</span>
                    <span className="text-orange-400 ml-2">&apos;Full Stack Developer&apos;,</span>
                  </div>

                  {/* Description with animated text */}
                  <div className="hover:translate-x-2 transition-transform duration-200">
                    <span className="text-[#4AE3B5]">description:</span>
                    <motion.div className="mt-4 text-lg text-cyan-400 dark:text-cyan-300 leading-relaxed">
                      &apos;
                      {PROJECTS[active].description.split(" ").map((word, index) => (
                        <motion.span
                          key={index}
                          initial={{
                            filter: "blur(10px)",
                            opacity: 0,
                            y: 5,
                          }}
                          animate={{
                            filter: "blur(0px)",
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            duration: 0.2,
                            ease: "easeInOut",
                            delay: 0.02 * index,
                          }}
                          className="inline-block hover:text-cyan-300 transition-colors duration-200"
                        >
                          {word}&nbsp;
                        </motion.span>
                      ))}
                      &apos;
                    </motion.div>
                  </div>
                </div>
                
                <div className="text-white mt-6">{`};`}</div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-8">
                  {PROJECTS[active].github && (
                    <a
                      href={PROJECTS[active].github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/15 hover:bg-purple-500/25
                        text-purple-300 backdrop-blur-sm transition-all duration-200
                        hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] border border-purple-500/20 hover:border-purple-500/40
                        hover:scale-105 active:scale-95 font-mono text-sm"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" clipRule="evenodd" />
                      </svg>
                      Code
                    </a>
                  )}
                  {PROJECTS[active].url && (
                    <a
                      href={PROJECTS[active].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/15 hover:bg-purple-500/25
                        text-purple-300 backdrop-blur-sm transition-all duration-200
                        hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] border border-purple-500/20 hover:border-purple-500/40
                        hover:scale-105 active:scale-95 font-mono text-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Live
                    </a>
                  )}
                </div>
              </motion.div>

              {/* Navigation Controls - Testimonials Style */}
              <div className="flex items-center justify-between pt-12 lg:pt-0">
                <div className="flex gap-4">
                  <button
                    onClick={handlePrev}
                    className="group/button flex h-10 w-10 items-center justify-center rounded-full 
                      bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/20 hover:border-purple-500/40
                      backdrop-blur-sm transition-all duration-200 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]"
                  >
                    <svg className="h-5 w-5 text-purple-300 transition-transform duration-300 group-hover/button:rotate-12" 
                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={handleNext}
                    className="group/button flex h-10 w-10 items-center justify-center rounded-full 
                      bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/20 hover:border-purple-500/40
                      backdrop-blur-sm transition-all duration-200 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]"
                  >
                    <svg className="h-5 w-5 text-purple-300 transition-transform duration-300 group-hover/button:-rotate-12" 
                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Project Indicators */}
                <div className="flex items-center gap-4">
                  <span className="text-purple-300 font-mono text-sm">
                    {active + 1} of {PROJECTS.length}
                  </span>
                  <button
                    onClick={() => setAutoplay(!autoplay)}
                    className={`px-3 py-1 rounded-md text-xs font-mono transition-all duration-200 ${
                      autoplay 
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
                        : 'bg-gray-700/20 text-gray-400 border border-gray-600/30'
                    }`}
                  >
                    {autoplay ? 'Auto' : 'Manual'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div
            className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-purple-500/6 rounded-full filter blur-[120px]
            animate-pulse"
            style={{ animationDuration: '8s' }}
          />
          <div
            className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-purple-500/6 rounded-full filter blur-[120px]
            animate-pulse"
            style={{ animationDuration: '10s', animationDelay: '2s' }}
          />
        </div>
      </section>

      {/* Section Spacing */}
      <div className="h-32 bg-black"></div>
    </>
  );
};

export default Projects;