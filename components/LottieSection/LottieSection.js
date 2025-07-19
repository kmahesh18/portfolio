import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";

const LottieSection = () => {
  const [lottie, setLottie] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(null);
  
  const sectionRef = useRef(null);
  const lottieRef = useRef(null);

  // Load Lottie
  useEffect(() => {
    import("lottie-web").then((Lottie) => setLottie(Lottie.default));
  }, []);

  // Initialize Lottie Animation with your existing animation
  useEffect(() => {
    if (lottie && lottieRef.current) {
      const animation = lottie.loadAnimation({
        container: lottieRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: require("../../utils/lotti.json"),
      });

      return () => animation.destroy();
    }
  }, [lottie]);

  // GSAP Animation
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current.querySelectorAll(".animate-in"),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Spotify Integration
  const fetchCurrentlyPlaying = async () => {
    try {
      const response = await fetch('/api/spotify/currently-playing');
      if (response.ok) {
        const data = await response.json();
        if (data.isPlaying) {
          setCurrentTrack(data);
          setIsPlaying(true);
          setError(null);
        } else {
          setCurrentTrack(null);
          setIsPlaying(false);
        }
      } else {
        throw new Error('Failed to fetch currently playing track');
      }
    } catch (err) {
      console.error("Error fetching Spotify data:", err);
      setError(err.message);
      // Fallback to mock data when Spotify is not available
      setCurrentTrack({
        name: "Coding Vibes",
        artist: "Lo-Fi Developer",
        album: "Focus Sessions",
        isPlaying: true,
        image: null
      });
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    fetchCurrentlyPlaying();
    // Update every 30 seconds
    const interval = setInterval(fetchCurrentlyPlaying, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const handleSpotifyLogin = () => {
    window.open('/api/spotify/login', '_blank', 'width=500,height=600');
  };

  return (
    <>
      {/* Section Spacing */}
      <div className="h-20 bg-black"></div>

      <section
        ref={sectionRef}
        className="relative bg-black py-20 overflow-hidden"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-purple-500/5 rounded-full filter blur-[150px] animate-pulse" />
          <div className="absolute bottom-1/4 -right-1/4 w-[800px] h-[800px] bg-green-500/5 rounded-full filter blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.div
            className="text-center mb-16 animate-in"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold gradient-text mb-4"
              style={{
                background: "linear-gradient(135deg, #9F7AEA 0%, #1DB954 50%, #9F7AEA 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
              Currently Vibing
            </h2>
            <p className="text-gray-400 text-lg font-mono">
              Music fuels creativity ! Heres whats playing in my dev space
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Lottie Animation Side */}
            <motion.div
              className="animate-in"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div
                  ref={lottieRef}
                  className="w-full h-[400px] md:h-[500px] flex items-center justify-center"
                  style={{
                    filter: 'drop-shadow(0 0 30px rgba(139, 92, 246, 0.4))',
                  }}
                />
                
                {/* Floating Music Elements */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute text-purple-400/20 text-xl animate-bounce"
                      style={{
                        left: `${20 + i * 10}%`,
                        top: `${10 + (i % 4) * 25}%`,
                        animationDelay: `${i * 0.3}s`,
                        animationDuration: `${2 + i * 0.2}s`
                      }}
                    >
                      {['♪', '♫', '♬', '♩'][i % 4]}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Spotify Integration Side */}
            <motion.div
              className="animate-in space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {/* Current Track Display */}
              {currentTrack && (
                <motion.div 
                  className="bg-gradient-to-br from-gray-900/90 to-black rounded-2xl p-6 border border-green-500/30 backdrop-blur-sm shadow-[0_25px_60px_rgba(29,185,84,0.2)]"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 35px 80px rgba(29,185,84,0.3)",
                    borderColor: "rgba(29,185,84,0.5)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
                    <span className={`font-mono text-sm ${isPlaying ? 'text-green-400' : 'text-gray-400'}`}>
                      {isPlaying ? 'Now Playing' : 'Last Played'}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <motion.div 
                      className="w-16 h-16 rounded-lg bg-gradient-to-br from-green-500/30 to-purple-500/30 flex items-center justify-center border border-green-500/20 overflow-hidden"
                      whileHover={{ scale: 1.1, rotate: 2 }}
                      transition={{ duration: 0.2 }}
                    >
                      {currentTrack.image ? (
                        <Image src={currentTrack.image} alt={currentTrack.album} className="w-full h-full object-cover" />
                      ) : (
                        <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                        </svg>
                      )}
                    </motion.div>
                    <div className="flex-1">
                      <motion.h3 
                        className="text-white font-semibold text-lg truncate"
                        whileHover={{ color: "#4ade80" }}
                        transition={{ duration: 0.2 }}
                      >
                        {currentTrack.name}
                      </motion.h3>
                      <motion.p 
                        className="text-gray-400 truncate"
                        whileHover={{ color: "#a3a3a3" }}
                        transition={{ duration: 0.2 }}
                      >
                        {currentTrack.artist}
                      </motion.p>
                      <p className="text-gray-500 text-sm truncate">{currentTrack.album}</p>
                    </div>
                    {isPlaying && (
                      <div className="flex items-center gap-1">
                        {[...Array(4)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-1 bg-green-400 rounded-full animate-pulse"
                            style={{ 
                              height: `${12 + Math.random() * 12}px`,
                              animationDelay: `${i * 0.2}s`,
                              animationDuration: `${0.8 + Math.random() * 0.4}s`
                            }}
                            whileHover={{ scale: 1.2 }}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {currentTrack.songUrl && (
                    <motion.a
                      href={currentTrack.songUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg text-white text-sm font-semibold transition-all duration-200"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.84-.599 0-.36.24-.66.54-.78 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.242 1.019zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
                      </svg>
                      Open in Spotify
                    </motion.a>
                  )}
                </motion.div>
              )}

              {/* Coding Stats */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div 
                  className="bg-gradient-to-br from-gray-900/60 to-black/60 rounded-xl p-4 border border-purple-500/20"
                  whileHover={{ 
                    scale: 1.02, 
                    borderColor: "rgba(139,92,246,0.4)",
                    boxShadow: "0 10px 30px rgba(139,92,246,0.2)"
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div 
                    className="text-2xl font-bold text-purple-400 mb-1"
                    whileHover={{ scale: 1.1 }}
                  >
                    10+
                  </motion.div>
                  <div className="text-gray-400 text-sm font-mono">Hours Coded</div>
                </motion.div>
                <motion.div 
                  className="bg-gradient-to-br from-gray-900/60 to-black/60 rounded-xl p-4 border border-green-500/20"
                  whileHover={{ 
                    scale: 1.02, 
                    borderColor: "rgba(34,197,94,0.4)",
                    boxShadow: "0 10px 30px rgba(34,197,94,0.2)"
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div 
                    className="text-2xl font-bold text-green-400 mb-1"
                    whileHover={{ scale: 1.1 }}
                  >
                    ∞
                  </motion.div>
                  <div className="text-gray-400 text-sm font-mono">Spotify Tracks</div>
                </motion.div>
              </div>

              {/* Favorite Coding Genres */}
              <motion.div 
                className="bg-gradient-to-br from-gray-900/60 to-black/60 rounded-xl p-4 border border-purple-500/20"
                whileHover={{ 
                  scale: 1.01, 
                  borderColor: "rgba(139,92,246,0.4)",
                  boxShadow: "0 15px 40px rgba(139,92,246,0.15)"
                }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="text-white font-semibold mb-3">My Coding Soundtrack</h4>
                <div className="flex flex-wrap gap-2">
                  {['Lo-Fi Hip Hop', 'Synthwave', 'Ambient', 'Electronic', 'Jazz Hop', 'Chill Beats'].map((genre) => (
                    <motion.span
                      key={genre}
                      className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm font-mono border border-green-500/30 transition-colors duration-200 cursor-pointer"
                      whileHover={{ 
                        scale: 1.05,
                        backgroundColor: "rgba(34,197,94,0.3)",
                        color: "#4ade80"
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {genre}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Connect Spotify / Error Display */}
              {error ? (
                <motion.button
                  onClick={handleSpotifyLogin}
                  className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-green-600 hover:bg-green-500 rounded-lg text-white font-semibold transition-all duration-200"
                  whileHover={{ scale: 1.02, y: -2, boxShadow: "0 10px 30px rgba(34,197,94,0.3)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.84-.599 0-.36.24-.66.54-.78 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.242 1.019zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                  Connect Spotify for Live Updates
                </motion.button>
              ) : (
                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="text-gray-500 text-sm font-mono">
                    🎵 Live Spotify integration active
                  </p>
                </motion.div>
              )}

              {/* Developer Quote */}
              <motion.div 
                className="bg-gradient-to-br from-gray-900/60 to-black/60 rounded-xl p-4 border border-purple-500/20"
                whileHover={{ 
                  scale: 1.01, 
                  borderColor: "rgba(139,92,246,0.4)",
                  boxShadow: "0 15px 40px rgba(139,92,246,0.15)"
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.blockquote 
                  className="text-gray-300 italic font-mono text-sm"
                  whileHover={{ color: "#d1d5db" }}
                >
                  Code flows better with the right soundtrack. Every bug fix has its beat, every feature its rhythm.
                </motion.blockquote>
                <motion.div 
                  className="text-purple-400 text-right mt-2 text-sm"
                  whileHover={{ color: "#a855f7" }}
                >
                  - Mahesh Kumar
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Spacing */}
      <div className="h-20 bg-black"></div>
    </>
  );
};

export default LottieSection;
