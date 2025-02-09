import { useEffect, useRef } from "react";
import { MENULINKS, PROJECTS } from "../../constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import ProjectTile from "./ProjectTile/ProjectTile";

const Projects = () => {
  const targetSection = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    // Fade in animation for content
    const revealTl = gsap.timeline({ defaults: { ease: "power2.out" } });
    revealTl.from(targetSection.current, { opacity: 0, duration: 0.5 });

    // Blur effect on scroll
    ScrollTrigger.create({
      trigger: targetSection.current,
      start: "top center",
      end: "bottom center",
      animation: revealTl,
      scrub: 1,
    });

    // Header blur effect on scroll
    gsap.to(headerRef.current, {
      scrollTrigger: {
        trigger: targetSection.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
      backdropFilter: "blur(15px)",
      backgroundColor: "rgba(17, 17, 17, 0.8)",
    });
  }, [targetSection]);

  return (
    <section
      className="w-full relative select-none bg-gradient-to-b from-gray-900/80 via-purple-900/10 to-gray-900/90"
      id={MENULINKS[2].ref}
      ref={targetSection}
    >
      {/* Fixed Header Background */}
      <div 
        ref={headerRef}
        className="sticky top-0 w-full h-40 bg-transparent z-10"
      />

      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 relative z-20">
        {/* Header */}
        <div className="flex flex-col items-center mb-20">
          <h1 
            className="text-6xl sm:text-7xl lg:text-8xl font-bold text-center"
            style={{
              background: "linear-gradient(135deg, #9F7AEA, #4C1D95)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Projects
          </h1>
          <div className="mt-4">
            <div className="h-1 w-24 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"></div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {PROJECTS.map((project) => (
            <ProjectTile
              key={project.name}
              project={project}
              gradient={project.gradient}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
