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
    <motion.div
      className="project-card group"
      initial={animationVariants.initial}
      animate={animationVariants.animate}
      exit={animationVariants.exit}
      transition={transition}
      style={cardStyle}
    >
    <div className="bg-gradient-to-br from-gray-900/90 to-black rounded-2xl overflow-hidden
      border border-purple-500/30 hover:border-purple-500/60 transition-all duration-500
      shadow-[0_25px_60px_rgba(139,92,246,0.2)] backdrop-blur-sm">

      {/* Project Header */}
      <div className="bg-black/60 px-6 py-3 flex items-center gap-2 border-b border-purple-500/20">
        <motion.div className="w-3 h-3 rounded-full bg-[#FF605C]" whileHover={{ scale: 1.3 }} />
        <motion.div className="w-3 h-3 rounded-full bg-[#FFBD44]" whileHover={{ scale: 1.3 }} />
        <motion.div className="w-3 h-3 rounded-full bg-[#00CA4E]" whileHover={{ scale: 1.3 }} />
        <span className="ml-4 mt-4 text-[#4AE3B5] font-mono text-lg font-semibold">
          {project.name}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Project Content */}
        <div className="p-8 lg:p-12 font-mono text-sm relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
            transition={{ duration: 0.4, delay: isActive ? 0.1 : 0, ease: "easeOut" }}
          >
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

            {/* Project Links */}
            <div
              className="flex gap-4 mt-10 opacity-0 translate-y-5 transition-all duration-500"
              style={{
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 rounded-xl bg-purple-500/15 hover:bg-purple-500/25
                    text-purple-300 backdrop-blur-sm transition-all duration-200
                    hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] border border-purple-500/20 hover:border-purple-500/40
                    hover:scale-105 hover:-translate-y-1 active:scale-95"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Code</span>
                </a>
              )}
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 rounded-xl bg-purple-500/15 hover:bg-purple-500/25
                    text-purple-300 backdrop-blur-sm transition-all duration-200
                    hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] border border-purple-500/20 hover:border-purple-500/40
                    hover:scale-105 hover:-translate-y-1 active:scale-95"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span className="font-medium">Live Demo</span>
                </a>
              )}
            </div>
          </motion.div>
        </div>

        {/* Project Image */}
        <div className="relative h-[350px] lg:h-[500px] overflow-hidden rounded-r-2xl">
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{
              scale: isActive ? 1 : 1.15,
              opacity: isActive ? 1 : 0
            }}
            transition={{ duration: 1, delay: isActive ? 0.1 : 0, ease: "easeOut" }}
            style={{ backgroundImage: `url(${project.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-black/60 lg:bg-gradient-to-l" />
        </div>
      </div>
    </div>
  </motion.div>
  );
};

const Projects = () => {
  const targetSection = useRef(null);
  const projectsRef = useRef(null);
  const [activeProject, setActiveProject] = useState(0);
  const activeProjectRef = useRef(0);

  const handleProjectChange = useCallback((newProject) => {
    if (newProject !== activeProjectRef.current) {
      activeProjectRef.current = newProject;
      setActiveProject(newProject);
    }
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const totalHeight = PROJECTS.length * window.innerHeight * 0.8;

    // Throttled scroll handler to improve performance
    let ticking = false;
    const updateActiveProject = (progress) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const newActiveProject = Math.min(
            Math.floor(progress * PROJECTS.length),
            PROJECTS.length - 1
          );
          handleProjectChange(newActiveProject);
          ticking = false;
        });
        ticking = true;
      }
    };

    const scrollTrigger = ScrollTrigger.create({
      trigger: targetSection.current,
      start: "top top",
      end: `+=${totalHeight}`,
      pin: projectsRef.current,
      pinSpacing: false,
      scrub: 0.3, // Reduced for smoother performance
      ease: "none", // Simplified easing
      invalidateOnRefresh: true,
      onUpdate: (self) => updateActiveProject(self.progress),
    });

    // Simplified progress bar update
    const progressTrigger = ScrollTrigger.create({
      trigger: targetSection.current,
      start: "top top",
      end: `+=${totalHeight}`,
      onUpdate: (self) => {
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
          progressBar.style.transform = `scaleY(${self.progress})`;
        }
      },
    });

    return () => {
      scrollTrigger.kill();
      progressTrigger.kill();
    };
  }, [handleProjectChange]);

  return (
    <>
      {/* Section Spacing */}
      <div className="h-32 bg-black"></div>

      <section
        ref={targetSection}
        id={MENULINKS[2].ref}
        className="relative bg-black"
        style={{ height: `${PROJECTS.length * 80}vh` }}
      >
        {/* Sticky Container */}
        <div
          ref={projectsRef}
          className="sticky top-0 h-screen w-full flex flex-col items-center justify-center px-6"
        >
          {/* Projects Title - Bigger and Centered */}
          <motion.div
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className=" z-40"
          >
            <h2
              className="text-6xl lg:text-8xl font-bold text-center tracking-tight"
              style={{
                marginTop: '3rem',
                background: "linear-gradient(135deg, #9F7AEA 0%, #667EEA 50%, #4C1D95 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Projects
            </h2>
          </motion.div>

          {/* Projects Stack */}
          <div className="relative w-full max-w-7xl mx-auto flex-1 flex items-center">
            <div className="relative w-full" style={{ height: '80vh' }}>
              <AnimatePresence mode="wait">
                {PROJECTS.map((project, index) => (
                  <ProjectCard
                    key={project.name}
                    project={project}
                    isActive={activeProject === index}
                    index={index}
                    totalProjects={PROJECTS.length}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
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

      {/* Controlled Section Spacing */}
      <div className="h-screen bg-black"></div>
    </>
  );
};

export default Projects;