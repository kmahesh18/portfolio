import { useRef } from "react";
import Image from "next/image";
import { PROJECTS } from "../../../constants";
import { motion } from "framer-motion";

const ProjectTile = ({ project, gradient, isActive }) => {
  const projectTile = useRef(null);

  return (
    <motion.div
      ref={projectTile}
      className="group relative overflow-hidden rounded-2xl bg-[#111111] border-2 border-purple-500/20 hover:border-purple-500/50 transition-all duration-500"
      style={{
        transformStyle: "preserve-3d",
      }}
      whileHover={{ 
        transform: "translateZ(30px) rotateX(2deg)",
        boxShadow: "0 0 30px rgba(168,85,247,0.3)",
      }}
    >
      {/* Project Image */}
      <div className="relative h-36 overflow-hidden"> {/* Reduced height */}
        <Image
          src={project.image}
          alt={project.name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500 group-hover:scale-110"
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#111111]/50 to-[#111111]" />
      </div>

      {/* Project Info */}
      <div className="p-4 space-y-2"> {/* Reduced padding and spacing */}
        <h3 
          className="text-lg font-bold"
          style={{
            background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {project.name}
        </h3>
        
        <p className="text-gray-400 text-sm line-clamp-2">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-200 border border-purple-500/20"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-200">
              +{project.tech.length - 3}
            </span>
          )}
        </div>

        {/* Project Links with 3D effect */}
        <div className="flex gap-4 pt-4">
          <a
            href={project.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:translate-z-10
              ${project.url 
                ? "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white" 
                : "bg-gray-800 text-gray-400 cursor-not-allowed"}`}
          >
            Live Demo
          </a>
          <a
            href={project.github || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-300 transform hover:translate-z-10
              ${project.github 
                ? "border-purple-700 hover:border-purple-500 text-purple-300 hover:text-purple-200" 
                : "border-gray-800 text-gray-600 cursor-not-allowed"}`}
          >
            GitHub
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectTile;
