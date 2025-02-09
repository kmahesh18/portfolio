import { useState, useEffect, useRef, useLayoutEffect } from "react";
import Typed from "typed.js";
import gsap from "gsap";
import Button from "../Button/Button";
import Profiles from "../Profiles/Profiles";
import styles from "./Hero.module.scss";
import { MENULINKS, TYPED_STRINGS } from "../../constants";
import { motion } from "framer-motion";
import ResumeModal from "../ResumeModal/ResumeModal";

const options = {
  strings: TYPED_STRINGS,
  typeSpeed: 50,
  startDelay: 1500,
  backSpeed: 50,
  backDelay: 8000,
  loop: true,
};

const Hero = () => {
  const [lottie, setLottie] = useState(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const sectionRef = useRef(null);
  const typedElementRef = useRef(null);
  const lottieRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "none" } })
        .to(sectionRef.current, { opacity: 1, duration: 2 })
        .from(
          sectionRef.current.querySelectorAll(".staggered-reveal"),
          { opacity: 0, duration: 0.5, stagger: 0.5 },
          "<"
        );
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const typed = new Typed(typedElementRef.current, options);

    return () => typed.destroy();
  }, [typedElementRef]);

  useEffect(() => {
    import("lottie-web").then((Lottie) => setLottie(Lottie.default));
  }, []);

  useEffect(() => {
    if (lottie && lottieRef.current) {
      const animation = lottie.loadAnimation({
        container: lottieRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: require("../../public/lottie/lottie.json"),
      });

      return () => animation.destroy();
    }
  }, [lottie]);

  return (
    <>
      <section
        ref={sectionRef}
        id={MENULINKS[0].ref}
        className="w-full flex md:items-center py-8 2xl:container mx-auto xl:px-20 md:px-12 px-4 min-h-screen relative mb-24"
        style={{ opacity: 0 }}
      >
        <style global jsx>
          {`
            .typed-cursor {
              font-size: 2rem;
            }
            @media (max-width: 768px) {
              .lottie-container {
                transform: scale(0.8) translateY(-2rem);
              }
            }
          `}
        </style>
        <div className="flex flex-col pt-40 md:pt-0 select-none w-full md:w-3/5">
          <h5
            className={`${styles.intro} font-mono font-medium text-indigo-light staggered-reveal`}
          >
            Hi, I&apos;m
          </h5>
          <h1 className={`${styles.heroName} text-white text-6xl font-semibold`}>
            <span className={`relative ${styles.emphasize} staggered-reveal`}>
              Mahesh
            </span>
            <span className="staggered-reveal"> Kumar</span>
          </h1>
          <p>
            <span
              ref={typedElementRef}
              className="staggered-reveal text-3xl text-gray-light-3 font-mono leading-relaxed"
            />
          </p>
          <div className="staggered-reveal">
            <Profiles />
          </div>
          <div className="staggered-reveal pt-4 flex gap-4">
            <Button 
              href={`#${MENULINKS[4].ref}`} 
              classes="link" 
              type="primary"
            >
              Let&apos;s Talk
            </Button>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={() => setIsResumeOpen(true)}
                classes="link group" 
                type="secondary"
              >
                <span className="group-hover:translate-x-[-2px] transition-transform duration-200">
                  Resume
                </span>
              </Button>
            </motion.div>
          </div>
        </div>
        <div
          className="absolute w-full md:w-5/12 h-[300px] md:h-auto right-0 bottom-0 md:bottom-1.5 lottie-container transition-transform duration-300 ease-out"
          style={{
            maxWidth: '600px',
            minHeight: '300px',
            transform: 'translateY(0)',
            visibility: 'visible'
          }}
          ref={lottieRef}
        />
      </section>

      <ResumeModal 
        isOpen={isResumeOpen} 
        onClose={() => setIsResumeOpen(false)} 
      />
    </>
  );
};

export default Hero;
