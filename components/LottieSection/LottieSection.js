import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";

const LottieSection = () => {
  const [lottie, setLottie] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
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

  // Spotify Integration - Updated
  const fetchCurrentlyPlaying = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/spotify/currently-playing');
      const data = await response.json();
      
      if (response.ok) {
        setIsConnected(data.connected || false);
        
        if (data.connected) {
          setError(null);
          if (data.isPlaying && data.name) {
            setCurrentTrack(data);
            setIsPlaying(true);
          } else if (data.name) {
            // Show last played track even if not currently playing
            setCurrentTrack(data);
            setIsPlaying(false);
          } else {
            setCurrentTrack(null);
            setIsPlaying(false);
          }
        } else {
          setCurrentTrack(null);
          setIsPlaying(false);
          setError(data.error || 'Not connected to Spotify');
        }
      } else {
        setIsConnected(false);
        setError(data.error || 'Failed to fetch Spotify data');
        setCurrentTrack(null);
        setIsPlaying(false);
      }
    } catch (err) {
      console.error("Error fetching Spotify data:", err);
      setError('Failed to connect to Spotify');
      setIsConnected(false);
      setCurrentTrack(null);
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentlyPlaying();
    // Update every 10 seconds for better real-time experience
    const interval = setInterval(fetchCurrentlyPlaying, 10000);
    
    return () => clearInterval(interval);
  }, []);

  // Check for Spotify connection status on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('spotify_connected')) {
      setIsConnected(true);
      setTimeout(fetchCurrentlyPlaying, 1000); // Fetch after connection
      // Remove URL parameter
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    if (urlParams.get('spotify_error')) {
      setError('Spotify connection failed. Please try again.');
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleSpotifyLogin = () => {
    const popup = window.open('/api/spotify/login', 'spotify-login', 'width=500,height=600');
    
    // Listen for popup close to refresh data
    const checkClosed = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkClosed);
        setTimeout(fetchCurrentlyPlaying, 2000);
      }
    }, 1000);
  };

  const handleRefresh = () => {
    fetchCurrentlyPlaying();
  };

  // Add CSS animations to document head - client-side only
  useEffect(() => {
    // Only run in browser environment
    if (typeof window !== 'undefined') {
      const style = document.createElement('style');
      style.textContent = `
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
          animation-delay: var(--delay, 0s);
          opacity: 0;
        }
        
        .fade-in-left {
          animation: fadeInLeft 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .fade-in-right {
          animation: fadeInRight 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .hover\\:scale-101:hover {
          transform: scale(1.01);
        }
        
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
        
        .hover\\:scale-103:hover {
          transform: scale(1.03);
        }
        
        .hover\\:scale-105:hover {
          transform: scale(1.05);
        }
        
        .active\\:scale-95:active {
          transform: scale(0.95);
        }
        
        .active\\:scale-97:active {
          transform: scale(0.97);
        }
        
        .hover\\:rotate-360:hover {
          transform: rotate(360deg);
        }
      `;
      document.head.appendChild(style);
      
      // Cleanup function to remove style on unmount
      return () => {
        if (style.parentNode) {
          document.head.removeChild(style);
        }
      };
    }
  }, []); // Empty dependency array means this runs once on mount

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
          <div
            className="text-center mb-16 animate-in fade-in-up"
          >
            <h2 className="text-6xl font-bold gradient-text mb-4"
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
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Lottie Animation Side */}
            <div className="animate-in fade-in-left">
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
            </div>

            {/* Spotify Integration Side */}
            <div className="animate-in space-y-6 fade-in-right">
              {/* Current Track Display - Updated */}
              <div 
                className={`bg-gradient-to-br from-gray-900/90 to-black rounded-2xl p-4 border transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg animate-in fade-in-up ${
                  isConnected && currentTrack ? 'border-green-500/30 shadow-[0_25px_60px_rgba(29,185,84,0.2)]' : 'border-gray-500/30'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${
                      isLoading ? 'bg-yellow-500 animate-pulse' :
                      !isConnected ? 'bg-red-500' :
                      isPlaying ? 'bg-green-500 animate-pulse' : 
                      currentTrack ? 'bg-gray-500' : 'bg-orange-500'
                    }`}></div>
                    <span className={`font-mono text-sm ${
                      isLoading ? 'text-yellow-400' :
                      !isConnected ? 'text-red-400' :
                      isPlaying ? 'text-green-400' : 
                      currentTrack ? 'text-gray-400' : 'text-orange-400'
                    }`}>
                      {isLoading ? 'Loading...' :
                       !isConnected ? 'Not Connected' :
                       isPlaying ? 'Now Playing' : 
                       currentTrack ? 'Last Played' : 'Nothing Playing'}
                    </span>
                  </div>
                  {isConnected && (
                    <button
                      onClick={handleRefresh}
                      className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 hover:text-white transition-colors hover:scale-105 active:scale-95"
                      title="Refresh"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                  )}
                </div>
                
                {isConnected && currentTrack ? (
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-14 h-14 rounded-lg bg-gradient-to-br from-green-500/30 to-purple-500/30 flex items-center justify-center border border-green-500/20 overflow-hidden hover:scale-105 transition-transform duration-200"
                    >
                      {currentTrack.image ? (
                        <Image 
                          src={currentTrack.image} 
                          alt={currentTrack.album} 
                          width={64} 
                          height={64} 
                          className="w-full h-full object-cover rounded-lg"
                          unoptimized={true}
                        />
                      ) : (
                        <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 
                        className="text-white font-semibold text-base truncate hover:text-green-400 transition-colors duration-200"
                      >
                        {currentTrack.name}
                      </h3>
                      <p 
                        className="text-gray-400 truncate text-sm hover:text-gray-300 transition-colors duration-200"
                      >
                        {currentTrack.artist}
                      </p>
                      <p className="text-gray-500 text-xs truncate">{currentTrack.album}</p>
                    </div>
                    {isPlaying && (
                      <div className="flex items-center gap-1">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className="w-1 bg-green-400 rounded-full animate-pulse hover:scale-110 transition-transform"
                            style={{ 
                              height: `${12 + Math.random() * 12}px`,
                              animationDelay: `${i * 0.2}s`,
                              animationDuration: `${0.8 + Math.random() * 0.4}s`
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <svg className="w-10 h-10 text-gray-600 mx-auto mb-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                    </svg>
                    <p className="text-gray-400 text-sm">
                      {!isConnected ? 'Connect Spotify to see your music' : 'No track currently playing'}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      {!isConnected ? 'Live music integration available' : 'Start playing music on Spotify'}
                    </p>
                  </div>
                )}

                {currentTrack?.songUrl && (
                  <a
                    href={currentTrack.songUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-3 px-3 py-2 bg-green-600 hover:bg-green-500 rounded-lg text-white text-xs font-semibold transition-all duration-200 hover:scale-105 active:scale-95 hover:translate-y-[-2px]"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.84-.599 0-.36.24-.66.54-.78 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.242 1.019zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                    Open in Spotify
                  </a>
                )}
              </div>

              {/* Coding Stats */}
              <div className="grid grid-cols-2 gap-3 animate-in fade-in-up" style={{ "--delay": "0.2s" }}>
                <div 
                  className="bg-gradient-to-br from-gray-900/60 to-black/60 rounded-xl p-3 border border-purple-500/20 hover:scale-105 hover:translate-y-[-3px] hover:shadow-lg hover:border-purple-500/40 transition-all duration-200"
                >
                  <div 
                    className="text-xl font-bold text-purple-400 mb-1 hover:scale-105 transition-transform"
                  >
                    10+
                  </div>
                  <div className="text-gray-400 text-xs font-mono">Hours Coded</div>
                </div>
                <div 
                  className="bg-gradient-to-br from-gray-900/60 to-black/60 rounded-xl p-3 border border-green-500/20 hover:scale-105 hover:translate-y-[-3px] hover:shadow-lg hover:border-green-500/40 transition-all duration-200"
                >
                  <div 
                    className="text-xl font-bold text-green-400 mb-1 hover:scale-105 transition-transform"
                  >
                    ∞
                  </div>
                  <div className="text-gray-400 text-xs font-mono">Spotify Tracks</div>
                </div>
              </div>

              {/* Follow My Spotify */}
              <div 
                className="bg-gradient-to-br from-gray-900/60 to-black/60 rounded-xl p-3 border border-purple-500/20 hover:scale-102 hover:translate-y-[-2px] hover:shadow-lg hover:border-purple-500/40 transition-all duration-300 animate-in fade-in-up"
                style={{ "--delay": "0.3s" }}
              >
                <h4 
                  className="text-white font-semibold mb-2 text-center text-sm animate-in fade-in-up"
                  style={{ "--delay": "0.4s" }}
                >
                  Follow My Spotify
                </h4>
                <div className="flex justify-center">
                  <a
                    href="https://open.spotify.com/user/31xbtibxhkueqre6tx2yj5bo5msq?si=hVVl6_apSvSI9JXaQMLbjA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 rounded-full text-white font-semibold transition-all duration-200 text-xs hover:scale-105 hover:translate-y-[-2px] hover:shadow-md active:scale-95 animate-in fade-in-up"
                    style={{ "--delay": "0.5s" }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.84-.599 0-.36.24-.66.54-.78 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.242 1.019zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                    <span>Follow on Spotify</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
                <p 
                  className="text-gray-400 text-xs text-center mt-2 animate-in fade-in-up"
                  style={{ "--delay": "0.6s" }}
                >
                  Discover my playlists & music taste
                </p>
              </div>

              {/* Connect Spotify / Status Display - Updated */}
              {!isConnected ? (
                <button
                  onClick={handleSpotifyLogin}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-500 rounded-lg text-white font-semibold transition-all duration-200 text-sm hover:scale-103 hover:translate-y-[-3px] hover:shadow-lg active:scale-97 animate-in fade-in-up"
                  style={{ "--delay": "0.7s" }}
                >
                  <svg 
                    className="w-5 h-5 transition-transform duration-500 hover:rotate-360" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.84-.599 0-.36.24-.66.54-.78 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.242 1.019zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                  Connect Spotify for Live Updates
                </button>
              ) : (
                <></>
                // <motion.div 
                //   className="text-center space-y-1"
                //   initial={{ opacity: 0, y: 20 }}
                //   whileInView={{ 
                //     opacity: 1, 
                //     y: 0,
                //     transition: {
                //       duration: 0.5,
                //       delay: 1.6,
                //       ease: "easeOut"
                //     }
                //   }}
                //   whileHover={{ scale: 1.02 }}
                //   viewport={{ once: true }}
                // >
                //   <motion.p 
                //     className="text-green-400 text-sm font-mono flex items-center justify-center gap-2"
                //     initial={{ opacity: 0 }}
                //     whileInView={{ opacity: 1 }}
                //     transition={{ duration: 0.5, delay: 1.7 }}
                //   >
                //     <motion.span 
                //       className="w-2 h-2 bg-green-400 rounded-full"
                //       animate={{ 
                //         scale: [1, 1.2, 1],
                //         opacity: [1, 0.7, 1]
                //       }}
                //       transition={{ 
                //         duration: 2,
                //         repeat: Infinity,
                //         ease: "easeInOut"
                //       }}
                //     />
                //     🎵 Spotify connected
                //   </motion.p>
                //   <motion.div 
                //     className="flex items-center justify-center gap-4 text-xs text-gray-500"
                //     initial={{ opacity: 0 }}
                //     whileInView={{ opacity: 1 }}
                //     transition={{ duration: 0.5, delay: 1.8 }}
                //   >
                //     <span>Auto-refresh: 10s</span>
                //     <motion.button 
                //       onClick={handleRefresh}
                //       className="text-green-400 hover:text-green-300 underline"
                //       whileHover={{ scale: 1.05 }}
                //       whileTap={{ scale: 0.95 }}
                //     >
                //       Refresh now
                //     </motion.button>
                //   </motion.div>
                //   {error && (
                //     <motion.p 
                //       className="text-yellow-400 text-xs"
                //       initial={{ opacity: 0, scale: 0.9 }}
                //       animate={{ opacity: 1, scale: 1 }}
                //       transition={{ duration: 0.3 }}
                //     >
                //       {error}
                //     </motion.p>
                //   )}
                // </motion.div>
              )}

              {/* Developer Quote */}
              <div 
                className="bg-gradient-to-br from-gray-900/60 to-black/60 rounded-xl p-3 border border-purple-500/20 hover:scale-101 hover:translate-y-[-2px] hover:shadow-lg hover:border-purple-500/40 transition-all duration-300 animate-in fade-in-up"
                style={{ "--delay": "0.8s" }}
              >
                <blockquote 
                  className="text-gray-300 italic font-mono text-xs hover:text-gray-200 transition-colors animate-in fade-in-up"
                  style={{ "--delay": "0.9s" }}
                >
                  Code flows better with the right soundtrack. Every bug fix has its beat, every feature its rhythm.
                </blockquote>
                <div 
                  className="text-purple-400 text-right mt-1 text-xs hover:text-purple-300 transition-colors animate-in fade-in-right"
                  style={{ "--delay": "1s" }}
                >
                  - Mahesh Kumar
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Spacing */}
      <div className="h-20 bg-black"></div>
    </>
  );
};

export default LottieSection;