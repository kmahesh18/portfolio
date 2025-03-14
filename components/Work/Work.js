import { useEffect, useRef, useState } from "react";
import { MENULINKS } from "../../constants";
import StickyScroll from "./StickyScroll/StickyScroll";
import { motion } from "framer-motion";

// Function to fetch CodeForces data
const fetchCodeforcesData = async () => {
  try {
    const response = await fetch('https://codeforces.com/api/user.info?handles=maheshpro');
    const data = await response.json();
    return data.result[0];
  } catch (error) {
    console.error('CodeForces API Error:', error);
    return null;
  }
};

// Function to fetch LeetCode data
const fetchLeetcodeData = async () => {
  try {
    const response = await fetch('https://leetcode-stats-api.herokuapp.com/__mahesh18');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('LeetCode API Error:', error);
    return null;
  }
};

// Function to fetch GitHub data
const fetchGithubData = async () => {
  try {
    const response = await fetch('https://api.github.com/users/kmahesh18');
    const data = await response.json();
    const reposResponse = await fetch('https://api.github.com/users/kmahesh18/repos');
    const reposData = await reposResponse.json();
    return { ...data, repos: reposData };
  } catch (error) {
    console.error('GitHub API Error:', error);
    return null;
  }
};

// Function to fetch Chess.com data
const fetchChessData = async () => {
  try {
    const response = await fetch('https://api.chess.com/pub/player/k_m_a_h_e_s_h_18/stats');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Chess.com API Error:', error);
    return null;
  }
};

// Function to fetch CodeChef data
const fetchCodeChefData = async () => {
  try {
    const response = await fetch('https://codechef-api.vercel.app/handle/kmahesh_18');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('CodeChef API Error:', error);
    return null;
  }
};

const InfoCard = ({ title, children }) => (
  <motion.div
    className="relative group"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    {/* Ambient Glow Effects */}
    <div className="absolute -inset-40 bg-gradient-to-r from-[#7913ff]/10 via-violet-500/10 to-[#7913ff]/10 
      rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-1000" />
    
    {/* Content Container */}
    <div className="relative max-w-4xl mx-auto">
      {/* Subtle top line */}
      <div className="absolute -top-px left-20 right-20 h-px bg-gradient-to-r from-transparent via-[#7913ff]/50 to-transparent" />
      
      {/* Main Content Area */}
      <div className="relative px-6 sm:px-8 py-10">
        {/* Section Title */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-white opacity-90">
          {title}
        </h2>

        {/* Content Grid */}
        <div className="relative">
          {/* Decorative vertical line */}
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-violet-500/50 via-violet-500/20 to-transparent 
            hidden md:block" />
          
          {children}
        </div>
      </div>

      {/* Subtle bottom line */}
      <div className="absolute -bottom-px left-20 right-20 h-px bg-gradient-to-r from-transparent via-[#7913ff]/50 to-transparent" />
    </div>
  </motion.div>
);

const Work = () => {
  const targetSection = useRef(null);
  const [codeforcesData, setCodeforcesData] = useState(null);
  const [leetcodeData, setLeetcodeData] = useState(null);
  const [githubData, setGithubData] = useState(null);
  const [chessData, setChessData] = useState(null);
  const [codeChefData, setCodeChefData] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      const [cf, lc, gh, chess, cc] = await Promise.all([
        fetchCodeforcesData(),
        fetchLeetcodeData(),
        fetchGithubData(),
        fetchChessData(),
        fetchCodeChefData()
      ]);

      setCodeforcesData(cf);
      setLeetcodeData(lc);
      setGithubData(gh);
      setChessData(chess);
      setCodeChefData(cc);
    };

    fetchAllData();
  }, []);

  return (
    <section className="w-full relative select-none bg-black" id={MENULINKS[3].ref} ref={targetSection}>
      {/* Title Section */}
      <div className="max-w-5xl mx-auto pt-24 pb-12 px-4">
        <div className="flex flex-col items-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-center relative z-10"
            style={{
              background: "linear-gradient(135deg, #4AE3B5 0%, #6D28D9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
            Education & Experience
          </h1>
          <div className="mt-4">
            <div className="h-1 w-32 bg-gradient-to-r from-[#7913ff] to-violet-500 rounded-full" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-24">
        <InfoCard title="Overview">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Education Section */}
            <div className="relative">
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-lg font-semibold mb-6 text-[#7913ff]">Education Timeline</h3>
                <div className="relative pl-6 border-l-2 border-violet-500/30">
                  <div className="absolute w-3 h-3 bg-[#7913ff] rounded-full -left-[7px] top-2" />
                  <div className="text-white font-medium">B.Tech in CSE (2023 – 2027)</div>
                  <div className="text-violet-200">VNR Vignana Jyothi Institute of Engineering and Technology</div>
                  <div className="text-[#4AE3B5] text-sm mt-1">CGPA: 9.23/10</div>
                </div>
                
                <div className="relative pl-6 border-l-2 border-violet-500/30">
                  <div className="absolute w-3 h-3 bg-[#7913ff] rounded-full -left-[7px] top-2" />
                  <div className="text-white font-medium">Intermediate, APBIE (2021 – 2023)</div>
                  <div className="text-violet-200">Ascent Junior College, Vizag</div>
                </div>
                
                <div className="relative pl-6 border-l-2 border-violet-500/30">
                  <div className="absolute w-3 h-3 bg-[#7913ff] rounded-full -left-[7px] top-2" />
                  <div className="text-white font-medium">Secondary Education, CBSE (2021)</div>
                  <div className="text-violet-200">Nava Bharat Public School, Kothagudem</div>
                </div>
              </motion.div>
            </div>

            {/* Competitive Programming Section */}
            <div className="relative">
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-lg font-semibold mb-6 text-[#7913ff]">Competitive Programming</h3>
                <a href="https://www.codechef.com/users/kmahesh_18" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="block group/link relative">
                  <div className="absolute inset-0 bg-violet-500/5 rounded-lg opacity-0 group-hover/link:opacity-100 
                    transition-all duration-300" />
                  <div className="relative p-3">
                    <div className="text-white font-medium group-hover/link:text-[#7913ff] transition-colors">
                      CodeChef {codeChefData && `• ${codeChefData.stars}`}
                    </div>
                    {codeChefData && (
                      <div className="text-violet-200 text-sm space-y-0.5 mt-1">
                        <div>Rating: {codeChefData.currentRating}</div>
                        <div>Global Rank: {codeChefData.globalRank}</div>
                        <div>Country Rank: {codeChefData.countryRank}</div>
                      </div>
                    )}
                  </div>
                </a>

                <a href="https://codeforces.com/profile/maheshpro"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="block group/link relative">
                  <div className="absolute inset-0 bg-violet-500/5 rounded-lg opacity-0 group-hover/link:opacity-100 
                    transition-all duration-300" />
                  <div className="relative p-3">
                    <div className="text-white font-medium group-hover/link:text-[#7913ff] transition-colors">
                      CodeForces
                    </div>
                    {codeforcesData && (
                      <div className="text-violet-200 text-sm">
                        Rating: {codeforcesData.rating} ({codeforcesData.rank})
                      </div>
                    )}
                  </div>
                </a>

                <a href="https://leetcode.com/u/__mahesh18/"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="block group/link relative">
                  <div className="absolute inset-0 bg-violet-500/5 rounded-lg opacity-0 group-hover/link:opacity-100 
                    transition-all duration-300" />
                  <div className="relative p-3">
                    <div className="text-white font-medium group-hover/link:text-[#7913ff] transition-colors">
                      LeetCode
                    </div>
                    {leetcodeData && (
                      <div className="text-violet-200 text-sm">
                        Solved: {leetcodeData.totalSolved} • Rank: {leetcodeData.ranking}
                      </div>
                    )}
                  </div>
                </a>

                <div className="mt-6 pt-4 border-t border-violet-500/20">
                  <div className="text-white font-medium mb-2">Additional Activities</div>
                  <div className="text-violet-200 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[#7913ff] rounded-full" />
                      <span>Member of Turing Hut Club</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[#7913ff] rounded-full" />
                      <span>Active Chess Player</span>
                    </div>
                    {chessData && (
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-[#7913ff] rounded-full" />
                        <span>Chess.com Rapid: {chessData.chess_rapid.last.rating} Rating</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </InfoCard>
      </div>

      {/* Sticky Scroll Section - Pass the data as props */}
      <div className="relative z-10 mt-8">
        <StickyScroll 
          githubData={githubData}
          codeforcesData={codeforcesData}
          codeChefData={codeChefData}
          leetcodeData={leetcodeData}
        />
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-violet-500/5 rounded-full filter blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-violet-500/5 rounded-full filter blur-[120px] animate-pulse" />
      </div>
    </section>
  );
};

export default Work;
