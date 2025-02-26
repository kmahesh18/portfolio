import { useEffect, useRef, useState } from "react";
import { MENULINKS, PROJECTS } from "../../constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import ProjectTile from "./ProjectTile/ProjectTile";

const Projects = () => {
  const targetSection = useRef(null);
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Title animation
    gsap.from(".section-title", {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".section-title",
        start: "top bottom-=100",
      }
    });

    // Projects animation with stagger and slide
    const projects = gsap.utils.toArray('.project-item');
    projects.forEach((project, i) => {
      const xOffset = i % 2 === 0 ? -100 : 100; // Alternate slide direction
      
      gsap.fromTo(project,
        {
          x: xOffset,
          y: 100,
          opacity: 0,
          scale: 0.8,
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: project,
            start: "top bottom-=100",
          },
          delay: i * 0.1,
        }
      );
    });
  }, []);

  return (
    <section
      ref={targetSection}
      id={MENULINKS[2].ref}
      className="min-h-screen w-full relative bg-gradient-to-b from-gray-900/60 via-purple-900/5 to-gray-900/70 py-20 px-4 overflow-hidden"
    >
      {/* Header */}
      <div className="text-center relative z-10 mb-20">
        <h1 
          className="section-title text-6xl sm:text-7xl lg:text-8xl font-bold"
          style={{
            background: "linear-gradient(135deg, #9F7AEA, #4C1D95)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Projects
        </h1>
        <div className="mt-5">
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-violet-500 to-purple-500 rounded-full" />
        </div>
      </div>

      {/* Projects Grid Layout */}
      <div className="max-w-6xl mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {PROJECTS.map((project, index) => (
            <div
              key={project.name}
              className={`project-item transform transition-all duration-500 hover:z-10 w-full ${
                activeProject === index ? 'scale-105' : 'scale-100'
              }`}
              onMouseEnter={() => setActiveProject(index)}
              onMouseLeave={() => setActiveProject(null)}
            >
              <ProjectTile
                project={project}
                gradient={project.gradient}
                isActive={activeProject === index}
              />
            </div>
          ))}
        </div>

        {/* Interactive Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Gradient Orbs */}
          <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-pink-500/20 rounded-full filter blur-[120px] animate-pulse" />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-purple-500 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `floatParticle ${3 + Math.random() * 4}s infinite ease-in-out ${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes floatParticle {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(10px, -10px) scale(1.2); }
        }
      `}</style>
    </section>
  );
};

export default Projects;
