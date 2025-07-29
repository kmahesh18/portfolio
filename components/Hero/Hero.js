import { useState, useEffect, useRef, useLayoutEffect } from "react";
import Typed from "typed.js";
import gsap from "gsap";
import Button from "../Button/Button";
import Profiles from "../Profiles/Profiles";
import styles from "./Hero.module.scss";
import { MENULINKS, TYPED_STRINGS } from "../../constants";

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
                opacity: 0.7;
              }
            }
            .lottie-container {
              pointer-events: none;
              mix-blend-mode: lighten;
            }
          `}
        </style>
        <div className="flex flex-col pt-40 md:pt-0 select-none w-full md:w-3/5 relative z-10">
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
          <div className="staggered-reveal pt-4 flex gap-4 flex-wrap">
            <Button 
              href={`#${MENULINKS[4].ref}`} 
              classes="link" 
              type="primary"
            >
              Let&apos;s Talk
            </Button>
            <Button 
              href={`#${MENULINKS[2].ref}`} 
              classes="link" 
              type="secondary"
            >
              View Projects
            </Button>
          </div>
        </div>
        <div
          className="absolute w-full md:w-5/12 h-[300px] md:h-auto right-0 bottom-0 md:bottom-1.5 lottie-container transition-transform duration-300 ease-out"
          style={{
            maxWidth: '600px',
            minHeight: '300px',
            transform: 'translateY(0)',
            visibility: 'visible',
            zIndex: '-1',
            opacity: '0.9',
          }}
          ref={lottieRef}
        />
      </section>

      {/* Sticky Resume Button - Vertical */}
      <div className="fixed right-0 bottom-32 z-50">
        <a
          href="https://drive.google.com/file/d/19FSSKoDYYVzD-LVAL_kRFftf_x5XHfrP/view?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center bg-gradient-to-b from-purple-600 to-indigo-600 
            hover:from-purple-500 hover:to-indigo-500 shadow-lg hover:shadow-2xl 
            transition-all duration-300 ease-out transform hover:scale-105 hover:-translate-x-1
            border-2 border-purple-400/30 hover:border-purple-300/60 backdrop-blur-sm
            before:absolute before:inset-0 before:bg-gradient-to-b 
            before:from-purple-400 before:to-indigo-400 before:opacity-0 before:blur-md 
            before:transition-opacity before:duration-300 hover:before:opacity-20"
          style={{
            writingMode: 'vertical-lr',
            textOrientation: 'mixed',
            padding: '1rem 0.75rem',
            borderTopLeftRadius: '0.75rem',
            borderBottomLeftRadius: '0.75rem',
            borderTopRightRadius: '0',
            borderBottomRightRadius: '0',
            minHeight: '120px',
            width: '48px'
          }}
        >
          {/* Resume Text */}
          <span className="text-white font-mono text-sm font-medium tracking-wider
            transition-all duration-300 group-hover:text-purple-100">
            RESUME
          </span>

          {/* Tooltip */}
          <div className="absolute right-12 top-1/2 transform -translate-y-1/2 px-3 py-2 
            bg-black/90 text-white text-sm rounded-lg font-mono whitespace-nowrap
            opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out
            translate-x-2 group-hover:translate-x-0 pointer-events-none
            border border-purple-500/30 shadow-xl backdrop-blur-sm">
            View Resume
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 
              border-4 border-transparent border-l-black/90"></div>
          </div>

          {/* Pulse animation */}
          <div className="absolute inset-0 bg-purple-500/30 
            animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              borderTopLeftRadius: '0.75rem',
              borderBottomLeftRadius: '0.75rem',
              borderTopRightRadius: '0',
              borderBottomRightRadius: '0',
            }}></div>
        </a>
      </div>
    </>
  );
};

export default Hero;
