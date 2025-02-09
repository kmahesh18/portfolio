import { useEffect, useRef, useState } from "react";
import { MENULINKS } from "../../constants";
import StickyScroll from "./StickyScroll/StickyScroll";

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
    <section
      className="w-full relative select-none mt-24"
      id={MENULINKS[3].ref}
      ref={targetSection}
    >
      {/* Header Section */}
      <div className="max-w-7xl mx-auto pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center relative">
          <h1 
            className="text-6xl sm:text-7xl lg:text-8xl font-bold text-center relative z-10"
            style={{
              background: "linear-gradient(135deg, #9F7AEA 0%, #4C1D95 50%, #9F7AEA 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundSize: "200% auto",
              animation: "shine 5s linear infinite",
            }}
          >
            Experience & Work
          </h1>
          <div className="mt-4 relative z-10">
            <div className="h-1 w-32 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Education Card */}
          <div className="group relative bg-[#111111] rounded-2xl p-1">
            <div className="h-full bg-[#111111] p-8 rounded-xl transition-all duration-500 hover:-translate-y-2">
              <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
                Education
              </h3>
              <div className="text-white space-y-2">
                <span className="block text-lg font-medium">B.Tech in CSE</span>
                <span className="block text-gray-300">VNRVJIET (2023-2027)</span>
                <span className="block">Second Year Student</span>
                <span className="block text-blue-400 font-medium">CGPA: 9.23/10</span>
              </div>
            </div>
          </div>

          {/* Activities Card */}
          <div className="group relative bg-[#111111] rounded-2xl p-1">
            <div className="h-full bg-[#111111] p-8 rounded-xl transition-all duration-500 hover:-translate-y-2">
              <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent">
                Activities
              </h3>
              <ul className="text-white space-y-3">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                  Member of Turing Hut Club
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                  Active Chess Player
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                  Chess.com Rapid: {chessData ? `${chessData.chess_rapid.last.rating} Rating` : 'Loading...'}
                </li>
              </ul>
            </div>
          </div>

          {/* Competitive Profile Card */}
          <div className="group relative bg-[#111111] rounded-2xl p-1">
            <div className="h-full bg-[#111111] p-8 rounded-xl transition-all duration-500 hover:-translate-y-2">
              <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                Competitive Profile
              </h3>
              <ul className="text-white space-y-3">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  <a href="https://www.codechef.com/users/kmahesh_18" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="hover:text-green-400 transition-colors">
                    CodeChef: {codeChefData ? (
                      <>
                        {codeChefData.stars} ({codeChefData.currentRating})<br/>
                        <span className="text-gray-300">
                          • Global Rank: {codeChefData.globalRank}<br/>
                          • Country Rank: {codeChefData.countryRank}<br/>
                          • Highest Rating: {codeChefData.highestRating}
                        </span>
                      </>
                    ) : 'Loading...'}
                  </a>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  <a href="https://codeforces.com/profile/maheshpro" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="hover:text-green-400 transition-colors">
                    CodeForces: {codeforcesData ? `${codeforcesData.rating} (${codeforcesData.rank})` : 'Loading...'}
                  </a>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  <a href="https://leetcode.com/u/__mahesh18/" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="hover:text-green-400 transition-colors">
                    LeetCode: {leetcodeData ? `${leetcodeData.totalSolved} solved` : 'Loading...'}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Scroll Section */}
      <div className="mt-24">
        <StickyScroll />
      </div>

      <style jsx>{`
        @keyframes shine {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>
    </section>
  );
};

export default Work;
