import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { MENULINKS, PROJECTS } from "../../constants";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const ProjectCard = ({ project, isActive, index, totalProjects }) => {
  // Memoize animation variants to prevent recreation
  const animationVariants = useMemo(() => ({
    initial: { y: "100%", opacity: 0, rotateX: 15 },
    animate: {
      y: isActive ? 0 : "100%",
      opacity: isActive ? 1 : 0,
      scale: isActive ? 1 : 0.95,
      rotateX: isActive ? 0 : 15
    },
    exit: { y: "-100%", opacity: 0, scale: 0.95, rotateX: -15 }
  }), [isActive]);

  const transition = useMemo(() => ({
    type: "spring",
    stiffness: 300, // Increased for snappier animations
    damping: 40,
    duration: 0.4, // Reduced duration
    ease: [0.25, 0.46, 0.45, 0.94]
  }), []);

  const cardStyle = useMemo(() => ({
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: totalProjects - index,
    transformStyle: "preserve-3d"
  }), [totalProjects, index]);

  return (
    <div
      id={`sticky-card-${index + 1}`}
      className="sticky w-full"
      style={{ 
        top: `${index * 40}px`, // Staggered sticky positions
        zIndex: totalProjects - index 
      }}
    >
      <motion.div
        className="project-card group mb-8"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="bg-gradient-to-br from-gray-900/90 to-black rounded-2xl overflow-hidden
          border border-purple-500/30 hover:border-purple-500/60 transition-all duration-500
          shadow-[0_25px_60px_rgba(139,92,246,0.2)] backdrop-blur-sm">

          {/* Project Header */}
          <div className="bg-black/60 px-6 py-3 flex items-center gap-2 border-b border-purple-500/20">
            <motion.div className="w-3 h-3 rounded-full bg-[#FF605C]" whileHover={{ scale: 1.3 }} />
            <motion.div className="w-3 h-3 rounded-full bg-[#FFBD44]" whileHover={{ scale: 1.3 }} />
            <motion.div className="w-3 h-3 rounded-full bg-[#00CA4E]" whileHover={{ scale: 1.3 }} />
            <span className="ml-4 text-[#4AE3B5] font-mono text-lg font-semibold">
              {project.name}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Project Content */}
            <div className="p-8 lg:p-12 font-mono text-sm relative z-10">
              <div>
                <span className="text-pink-500">const</span>
                <span className="text-white"> project </span>
                <span className="text-pink-500">=</span>
                <span className="text-white"> {`{`}</span>
              </div>
              <div className="ml-8 space-y-3 mt-2">
                <div className="hover:translate-x-2 transition-transform duration-200">
                  <span className="text-[#4AE3B5]">name:</span>
                  <span className="text-yellow-300"> &apos;{project.name}&apos;,</span>
                </div>
                <div className="hover:translate-x-2 transition-transform duration-200">
                  <span className="text-[#4AE3B5]">tools:</span>
                  <span className="text-white"> [</span>
                  {project.tech.map((tool, i) => (
                    <span key={tool} className="text-yellow-300 hover:text-yellow-200 transition-colors duration-200">
                      &apos;{tool}&apos;
                      {i < project.tech.length - 1 ? <span className="text-white">, </span> : ''}
                    </span>
                  ))}
                  <span className="text-white">],</span>
                </div>
                <div className="hover:translate-x-2 transition-transform duration-200">
                  <span className="text-[#4AE3B5]">myRole:</span>
                  <span className="text-orange-400"> &apos;Full Stack Developer&apos;,</span>
                </div>
                <div className="hover:translate-x-2 transition-transform duration-200">
                  <span className="text-[#4AE3B5]">description: </span>
                  <div className="text-cyan-400 ml-6 group-hover:text-cyan-300 transition-colors duration-300 leading-relaxed">
                    &apos;{project.description}&apos;
                  </div>
                </div>
              </div>
              <div className="text-white mt-3">{`};`}</div>

              <div className="flex gap-3 mt-6">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-500/15 hover:bg-purple-500/25
                      text-purple-300 backdrop-blur-sm transition-all duration-200
                      hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] border border-purple-500/20 hover:border-purple-500/40
                      hover:scale-110 hover:-translate-y-1 active:scale-95"
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
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-500/15 hover:bg-purple-500/25
                      text-purple-300 backdrop-blur-sm transition-all duration-200
                      hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] border border-purple-500/20 hover:border-purple-500/40
                      hover:scale-110 hover:-translate-y-1 active:scale-95"
                    title="Live Demo"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>
            </div>

            {/* Project Image */}
            <div className="relative h-[350px] lg:h-[500px] overflow-hidden rounded-r-2xl">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${project.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-black/60 lg:bg-gradient-to-l" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Projects = () => {
  const targetSection = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Create smooth sticky effect for each card
    PROJECTS.forEach((_, index) => {
      const cardElement = document.getElementById(`sticky-card-${index + 1}`);
      if (cardElement) {
        ScrollTrigger.create({
          trigger: cardElement,
          start: "top 100px",
          end: "bottom top",
          onUpdate: (self) => {
            const progress = self.progress;
            // Smooth scale and opacity animation based on scroll progress
            gsap.to(cardElement, {
              scale: 1 - (progress * 0.05),
              opacity: 1 - (progress * 0.2),
              duration: 0.1,
              ease: "none"
            });
          }
        });
      }
    });

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

        {/* Sticky Projects Container */}
        <div className="px-6 max-w-7xl mx-auto">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.name}
              project={project}
              isActive={true} // Always active for smooth display
              index={index}
              totalProjects={PROJECTS.length}
            />
          ))}
        </div>

        {/* Background Effects - Simplified for performance */}
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
    </>
  );
};

export default Projects;