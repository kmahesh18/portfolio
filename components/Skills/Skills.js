/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import Image from "next/image";
import { MENULINKS, SKILLS } from "../../constants";
import { motion } from "framer-motion";

const SkillIcon = ({ skill }) => (
  <motion.div
    className="group relative perspective-1000"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        duration: 1,
        bounce: 0.3
      }
    }}
    viewport={{ once: true, margin: "-50px" }}
    whileHover={{ z: 50 }}
  >
    <motion.div
      className="relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center"
      style={{ transformStyle: "preserve-3d" }}
      whileHover={{ 
        rotateX: 15,
        rotateY: 15,
        scale: 1.1,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 25
        }
      }}
    >
      {/* Octagon Background with enhanced 3D effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-transparent"
           style={{ 
             clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
             transform: "translateZ(-15px)",
             boxShadow: "0 0 25px rgba(168,85,247,0.3)"
           }} 
      />
      
      {/* Main Octagon */}
      <div className="absolute inset-0 bg-[#1a1a1a] border border-purple-500/40"
           style={{ 
             clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
             transform: "translateZ(0px)",
           }} 
      />

      {/* Skill Icon - Adjusted size */}
      <div className="relative transform transition-all duration-300 group-hover:scale-110 w-10 h-10 md:w-12 md:h-12"
           style={{ transform: "translateZ(25px)" }}>
        <Image
          src={`/skills/${skill}.svg`}
          alt={skill}
          layout="fill"
          className="filter brightness-95 group-hover:brightness-110 transition-all duration-300"
        />
      </div>

      {/* Enhanced Glowing Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
           style={{ 
             background: "radial-gradient(circle at center, rgba(168,85,247,0.2) 0%, transparent 70%)",
             transform: "translateZ(10px)",
             clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
           }} 
      />

      {/* Enhanced 3D Edges */}
      <div className="absolute inset-0 border-2 border-purple-500/30 group-hover:border-purple-500/50 transition-colors duration-300"
           style={{ 
             clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
             transform: "translateZ(35px)",
           }} 
      />
    </motion.div>

    {/* Skill Name */}
    <div className="absolute -bottom-4 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
         style={{ transform: "translateZ(50px)" }}>
      <span className="text-sm text-purple-300 font-medium">
        {skill.charAt(0).toUpperCase() + skill.slice(1)}
      </span>
    </div>
  </motion.div>
);

const SkillCategory = ({ title, skills, index }) => (
  <motion.div 
    className="flex flex-col items-center space-y-6"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        delay: index * 0.2
      }
    }}
    viewport={{ once: true, margin: "-50px" }}
  >
    <h3 className="text-lg font-semibold text-purple-400 tracking-wider uppercase text-center">
      {title}
    </h3>
    <div className="container mx-auto max-w-3xl">
      <div className="max-w-96 grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-10 mx-auto">
        {skills.map((skill) => (
          <SkillIcon key={skill} skill={skill} />
        ))}
      </div>
    </div>
  </motion.div>
);

const Skills = () => {
  const targetSection = useRef(null);

  return (
    <section
      className="w-full relative select-none bg-black py-20"
      id={MENULINKS[1].ref}
      ref={targetSection}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Updated Header Section to match other sections */}
        <motion.div 
          className="flex flex-col items-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 1,
              delay: 0.2
            }
          }}
          viewport={{ once: true }}
        >
          <h2 
            className="text-6xl sm:text-7xl lg:text-8xl font-bold text-center"
            style={{
              background: "linear-gradient(135deg, #9F7AEA 0%, #4C1D95 50%, #9F7AEA 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundSize: "200% auto",
              animation: "shine 5s linear infinite",
            }}
          >
            Skills
          </h2>
          <div className="mt-4">
            <div className="h-1 w-24 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"></div>
          </div>
        </motion.div>

        {/* Skills Categories with staggered animation */}
        <div className="space-y-12">
          {[
            { title: "Languages and Tools", skills: SKILLS.languagesAndTools },
            { title: "Libraries and Frameworks", skills: SKILLS.librariesAndFrameworks },
            { title: "Databases", skills: SKILLS.databases },
            { title: "Other", skills: SKILLS.other }
          ].map((category, index) => (
            <SkillCategory 
              key={category.title}
              title={category.title}
              skills={category.skills}
              index={index}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes shine {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
};

export default Skills;
