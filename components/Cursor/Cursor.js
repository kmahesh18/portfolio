import { useEffect, useRef } from "react";

const Cursor = ({ isDesktop }) => {
  const cursorRef = useRef(null);
  const circlesRef = useRef([]);
  const coordsRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef(null);

  const numCircles = 12;

  useEffect(() => {
    if (isDesktop && document.body.clientWidth > 767) {
      const circles = circlesRef.current;

      // Initialize all circle positions
      circles.forEach(circle => {
        if (circle) {
          circle.x = 0;
          circle.y = 0;
          circle.classList.remove("hidden");
        }
      });

      const handleMouseMove = (e) => {
        coordsRef.current.x = e.clientX;
        coordsRef.current.y = e.clientY;
      };

      const animate = () => {
        let x = coordsRef.current.x;
        let y = coordsRef.current.y;

        circles.forEach((circle, index) => {
          if (!circle) return;
          
          // Offset to center the circle around the cursor
          const circleOffset = 13;

          // Interpolation towards the previous position
          const nextCircle = circles[index + 1] || circles[0];
          if (nextCircle) {
            x += (nextCircle.x - x) * 0.26;
            y += (nextCircle.y - y) * 0.26;
          }

          circle.style.left = `${x - circleOffset}px`;
          circle.style.top = `${y - circleOffset}px`;
          circle.style.transform = `scale(${(numCircles - index) / numCircles})`;

          // Update stored position
          circle.x = x;
          circle.y = y;
        });

        animationFrameRef.current = requestAnimationFrame(animate);
      };

      const hover = () => {
        circles.forEach((circle, index) => {
          if (circle) {
            circle.style.transform = `scale(${((numCircles - index) / numCircles) * 0.5})`;
          }
        });
      };

      const unHover = () => {
        circles.forEach((circle, index) => {
          if (circle) {
            circle.style.transform = `scale(${(numCircles - index) / numCircles})`;
          }
        });
      };

      document.addEventListener('mousemove', handleMouseMove);
      animate();

      document.querySelectorAll(".link").forEach((el) => {
        el.addEventListener("mouseenter", hover);
        el.addEventListener("mouseleave", unHover);
      });

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        cancelAnimationFrame(animationFrameRef.current);

        document.querySelectorAll(".link").forEach((el) => {
          el.removeEventListener("mouseenter", hover);
          el.removeEventListener("mouseleave", unHover);
        });
      };
    }
  }, [isDesktop]);

  // Render circles
  const circleElements = Array.from({ length: numCircles }, (_, index) => (
    <div
      key={index}
      className="fixed w-6 h-6 rounded-full pointer-events-none z-50 hidden"
      style={{ 
        backgroundColor: '#ffffff',
        opacity: 1,
        border: 'none',
      }}
      ref={(el) => (circlesRef.current[index] = el)}
    />
  ));

  return <div ref={cursorRef}>{circleElements}</div>;
};

export default Cursor;
