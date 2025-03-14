import { useEffect, useRef } from "react";
import { MENULINKS, PROJECTS } from "../../constants";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const ProjectCard = ({ project }) => (
  <motion.div
    className="project-card group"
    whileHover={{ scale: 1.01 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    <div className="bg-black rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300">
      {/* Project Header */}
      <div className="bg-black/50 px-4 py-2 flex items-center gap-1.5 border-b border-purple-500/20">
        <motion.div className="w-3 h-3 rounded-full bg-[#FF605C]" whileHover={{ scale: 1.2 }} />
        <motion.div className="w-3 h-3 rounded-full bg-[#FFBD44]" whileHover={{ scale: 1.2 }} />
        <motion.div className="w-3 h-3 rounded-full bg-[#00CA4E]" whileHover={{ scale: 1.2 }} />
        <span className="ml-4 text-[#4AE3B5] font-mono">
          {project.name}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Project Content */}
        <div className="p-6 md:p-8 lg:p-10 font-mono text-sm relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <span className="text-pink-500">const</span>
              <span className="text-white"> project </span>
              <span className="text-pink-500">=</span>
              <span className="text-white"> {`{`}</span>
            </div>
            <div className="ml-6 space-y-2">
              <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <span className="text-[#4AE3B5]">name:</span>
                <span className="text-yellow-300"> '{project.name}',</span>
              </motion.div>
              <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <span className="text-[#4AE3B5]">tools:</span>
                <span className="text-white"> [</span>
                {project.tech.map((tool, i) => (
                  <span key={tool} className="text-yellow-300 hover:text-yellow-200 transition-colors">
                    '{tool}'
                    {i < project.tech.length - 1 ? <span className="text-white">, </span> : ''}
                  </span>
                ))}
                <span className="text-white">],</span>
              </motion.div>
              <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <span className="text-[#4AE3B5]">myRole:</span>
                <span className="text-orange-400"> 'Full Stack Developer',</span>
              </motion.div>
              <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <span className="text-[#4AE3B5]">description: </span>
                <div className="text-cyan-400 ml-4 group-hover:text-cyan-300 transition-colors">
                  '{project.description}'
                </div>
              </motion.div>
            </div>
            <div className="text-white mt-2">{`};`}</div>

            {/* Project Links */}
            <div className="flex gap-4 mt-8">
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 
                    text-purple-300 backdrop-blur-sm transition-all duration-300 
                    hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" clipRule="evenodd" />
                  </svg>
                  <span>Code</span>
                </motion.a>
              )}
              {project.url && (
                <motion.a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 
                    text-purple-300 backdrop-blur-sm transition-all duration-300 
                    hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>Live Demo</span>
                </motion.a>
              )}
            </div>
          </motion.div>
        </div>

        {/* Project Image */}
        <div className="relative h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            style={{ backgroundImage: `url(${project.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-transparent md:bg-gradient-to-r lg:from-black lg:via-black/50 lg:to-transparent md:from-transparent md:via-black/50 md:to-black" />
        </div>
      </div>
    </div>
  </motion.div>
);

const Projects = () => {
  const targetSection = useRef(null);
  const projectsRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animate projects on scroll
    const projects = gsap.utils.toArray('.project-card');
    projects.forEach((project, i) => {
      gsap.from(project, {
        scrollTrigger: {
          trigger: project,
          start: "top bottom-=100",
          end: "top center",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
        delay: i * 0.1,
      });
    });
  }, []);

  return (
    <section
      ref={targetSection}
      id={MENULINKS[2].ref}
      className="min-h-screen w-full relative bg-black py-20 px-4"
    >
      {/* Projects Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-20"
      >
        <h2 
          className="text-6xl sm:text-7xl font-bold"
          style={{
            background: "linear-gradient(135deg, #9F7AEA, #4C1D95)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Projects
        </h2>
      </motion.div>

      {/* Projects Stack */}
      <div ref={projectsRef} className="max-w-6xl mx-auto space-y-12">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-purple-500/5 rounded-full filter blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-purple-500/5 rounded-full filter blur-[120px] animate-pulse" />
      </div>
    </section>
  );
};

export default Projects;
