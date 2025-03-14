export const METADATA = {
  author: "Mahesh Kumar",
  title: "Portfolio | Mahesh Kumar",
  description:
    "Mahesh Kumar is a passionate Software Engineer, skilled in Problem Solving, building performant web applications.",
  siteUrl: "https://mahesh-zeta.vercel.app",
  twitterHandle: "@xnor404",
  keywords: [
    "Mahesh Kumar",
    "Software Engineer",
    "Frontend Developer",
    "Full Stack Developer",
    "React Developer",
    "Portfolio",
    "Devfolio",
  ].join(", "),
  image: "@public/preview.png",
  language: "English",
  themeColor: "#000000",
};

export const MENULINKS = [
  {
    name: "Home",
    ref: "home",
  },
  {
    name: "Skills",
    ref: "skills",
  },
  {
    name: "Projects",
    ref: "projects",
  },
  {
    name: "Activities",
    ref: "work",
  },
  {
    name: "Contact",
    ref: "contact",
  },
];

export const TYPED_STRINGS = [
  "A passionate Software Engineer",
  "I build modern full-stack soluions",
  "I love solving real-world problems",
  "I explore and inspire"
];

export const SOCIAL_LINKS = [
  {
    name: "mail",
    url: "mailto:maheshkolli888@gmail.com",
  },
  {
    name: "linkedin",
    url: "https://www.linkedin.com/in/mahesh-kumar-0a2b47290/",
  },
  {
    name: "github",
    url: "https://github.com/kmahesh18",
  },
  {
    name: "instagram",
    url: "https://www.instagram.com/__mahesh18/",
  },
  {
    name: "twitter",
    url: "https://x.com/xnor404",
  },
];

export const SKILLS = {
  languagesAndTools: [
    "html",
    "css",
    "javascript",
    "typescript",
    "python",
    "cpp",
    "nodejs",
    "express",
    "aws",
    "git",
    "c"
  ],
  librariesAndFrameworks: [
    "react",
    "nextjs",
    "tailwindcss",
    "bootstrap",
  ],
  databases: ["mysql", "mongodb", "postgresql"],
  other: ["linux", "aws", "vercel"],
};

export const PROJECTS = [
  {
    name: "VENZO - Blog Website",
    image: "/projects/medium.png",
    blurImage: "/projects/blur/blog-blur.webp",
    description: "Dynamic blog platform with role-based access control using MERN Stack + Redux",
    gradient: ["#1488CC", "#2B32B2"],
    url: "https://venzo.vercel.app/",
    github: "https://github.com/kmahesh18/VENZO",
    tech: ["react", "redux", "nodejs", "mongodb"],
  },
  {
    name: "ZENKAI - Anime Stream",
    image: "/projects/airbnb.png",
    blurImage: "/projects/blur/anime-blur.webp",
    description: "Optimized streaming platform with server-side rendering",
    gradient: ["#ff0099", "#493240"],
    url: "https://zenkai-ochre.vercel.app/",
    github: "https://github.com/kmahesh18/anime",
    tech: ["typescript", "nextjs", "redux"],
  },
  {
    name: "Lost and Found",
    image: "/projects/laf.png",
    blurImage: "/projects/blur/anime-blur.webp",
    description: "MERN website to search and find lost objects..",
    gradient: ["#ff0099", "#493240"],
    url: "https://lost-and-found-blue.vercel.app/",
    github: "https://github.com/arbazahmed07/LostandFound",
    tech: ["react", "nextjs", "MERN"],
  },
  {
    name: "Metaverse",
    image: "/projects/metaverse.png",
    blurImage: "/projects/blur/blog-blur.webp",
    description: "A 3D virtual workspace where employees are represented by customizable avatars, enhancing the remote work experience.",
    gradient: ["#1488CC", "#2B32B2"],
    url: "#",
    github: "https://github.com/PAVAN507-STAR/MetaVerse",
    tech: ["react", "WebRTC", "nodejs", "three.js"],
  },
  {
    name: "Excelify",
    image: "/projects/excel.png",
    blurImage: "/projects/blur/excel-blur.webp",
    description: "Interactive dashboards with excel converting features",
    gradient: ["#00b09b", "#96c93d"],
    github: "https://github.com/askarthikey/xcelifiee-repo",
    url: "#",
    tech: ["react", "nodejs", "express"],
  },
  {
    name: "YTWrap",
    image: "/projects/inshorts.png",
    blurImage: "/projects/blur/yt-blur.webp",
    description: "Creator-editor platform with automated video processing using AWS",
    gradient: ["#f953c6", "#b91d73"],
    github: "https://github.com/kmahesh18/YTWrap",
    url: "#",
    tech: ["nodejs", "aws", "react"],
  },
  {
    name: "React Chat App",
    image: "/projects/tesla.png",
    blurImage: "/projects/blur/chat-blur.webp",
    description: "Real-time chat platform with Socket.IO and MERN Stack",
    gradient: ["#4568dc", "#b06ab3"],
    url: "#",
    github: "https://github.com/kmahesh18/chat-app",
    tech: ["react", "nodejs", "mongodb", "socket"],
  },
];

export const WORK_CONTENT = [
  {
    title: "GitHub Activity",
    description: "Open Source Contributions & Projects",
    content: ({ githubData }) => (
      <div className="h-full w-full flex flex-col justify-center items-center p-8 bg-[#0A0A1B] backdrop-blur-sm rounded-2xl border border-violet-500/20 hover:border-violet-500/40 transition-all duration-500 group">
        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#7913ff] to-violet-300 bg-clip-text text-transparent">
          GITHUB
        </h3>
        <div className="text-gray-300 space-y-3 text-center">
          <a href="https://github.com/kmahesh18" target="_blank" rel="noopener noreferrer">@kmahesh18</a>
          <p className="block hover:text-[#7913ff] transition-colors">
            • Public Repositories: {githubData?.public_repos || '15+'}<br></br>
            • Total Commits: {githubData?.total_commits || '200+'}<br></br>
            • Pull Requests: {githubData?.public_gists || '20+'}<br></br>
            • Stars: {githubData?.followers || '10+'}
          </p>
        </div>
        <div className="mt-6 space-y-4 w-full max-w-md transform group-hover:scale-105 transition-transform duration-500">
          <img 
            src={`https://ghchart.rshah.org/7913ff/kmahesh18`}
            alt="GitHub Contributions"
            className="w-full rounded-xl shadow-lg hover:shadow-[#7913ff]/20"
          />
        </div>
      </div>
    ),
  },
  {
    title: "Competitive Programming",
    description: "Active competitive programmer with strong problem-solving skills",
    content: ({ codeforcesData, codeChefData, leetcodeData }) => (
      <div className="h-full w-full flex flex-col justify-center items-center p-8 bg-[#0A0A1B] backdrop-blur-sm rounded-2xl border border-violet-500/20 hover:border-violet-500/40 transition-all duration-500 group">
        <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#7913ff] to-violet-300 bg-clip-text text-transparent">
          Coding Profiles
        </h3>
        <div className="space-y-6 w-full max-w-md">
          <div className="p-4 rounded-xl bg-black/50 hover:bg-black/70 transition-all duration-300 transform hover:-translate-y-1 border border-violet-500/10 hover:border-violet-500/30">
            <a href="https://codeforces.com/profile/maheshpro" target="_blank" rel="noopener noreferrer"
               className="block hover:text-[#7913ff] transition-colors">
              <span className="text-lg font-semibold">CodeForces (@maheshpro)</span><br/>
              <span className="text-gray-400">
                • Rating: {codeforcesData?.rating || '1012'} ({codeforcesData?.rank || 'Pupil'})<br/>
                • Max Rating: {codeforcesData?.maxRating || '1012'}
              </span>
            </a>
          </div>
          
          <div className="p-4 rounded-xl bg-black/50 hover:bg-black/70 transition-all duration-300 transform hover:-translate-y-1 border border-violet-500/10 hover:border-violet-500/30">
            <a href="https://www.codechef.com/users/kmahesh_18" target="_blank" rel="noopener noreferrer"
               className="block hover:text-[#7913ff] transition-colors">
              <span className="text-lg font-semibold">CodeChef (@kmahesh_18)</span><br/>
              <span className="text-gray-400">
                • Rating: {codeChefData?.currentRating || '1439'} ({codeChefData?.stars || '2★'})<br/>
                • Global Rank: {codeChefData?.globalRank || '40338'}<br/>
                • Country Rank: {codeChefData?.countryRank || 'N/A'}
              </span>
            </a>
          </div>
          
          <div className="p-4 rounded-xl bg-black/50 hover:bg-black/70 transition-all duration-300 transform hover:-translate-y-1 border border-violet-500/10 hover:border-violet-500/30">
            <a href="https://leetcode.com/u/__mahesh18/" target="_blank" rel="noopener noreferrer"
               className="block hover:text-[#7913ff] transition-colors">
              <span className="text-lg font-semibold">LeetCode (@__mahesh18)</span><br/>
              <span className="text-gray-400">
                • Problems Solved: {leetcodeData?.totalSolved || '200+'}<br/>
                • Global Ranking: {leetcodeData?.ranking ? `Top ${leetcodeData.ranking}` : 'Top 15%'}
              </span>
            </a>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Technical Activities",
    description: "College Activities & Contributions",
    content: (
      <div className="h-full w-full flex flex-col justify-center items-center p-8 bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-green-500/20 hover:border-green-500/40 transition-all duration-500 group">
        <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
          Campus Involvement
        </h3>
        <div className="space-y-4 text-center transform group-hover:scale-105 transition-transform duration-500">
          <div className="p-4 rounded-xl bg-gray-800/50 hover:bg-gray-800/70 transition-all duration-300">
            <p className="text-gray-300">
              • Active Member of Turing Hut (Technical Club)<br/>
              • Member of Computer Society of India (CSI)<br/>
              • Mentored Junior Students in Programming<br/>
              • Participated in Hackathons<br/>
              • 5 Badges in Hacktober Fest 2024
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Education",
    description: "B.Tech in Computer Science & Engineering",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white px-4 flex-col">
        <h3 className="text-xl font-semibold mb-2">VNRVJIET (2023-2027)</h3>
        <p className="text-sm text-center">
          Currently pursuing B.Tech in CSE<br/>
          Second Year Student<br/>
          CGPA: 9.23/10<br/>
          Hyderabad, India
        </p>
        <h3 className="text-xl font-semibold mb-2">Ascent Junior College (2021-2023)</h3>
        <p className="text-sm text-center">
          Intermediate Education, APBIE<br/>
          Scored 941/1000<br/>
          Vizag, Andhra Pradesh, India
        </p>
        <h3 className="text-xl font-semibold mb-2">Nava Bharat Public School (2021)</h3>
        <p className="text-sm text-center">
          Secondary Education<br/>
          CGPA: 8.5/10<br/>
          Kothagudem, Telangana, India
        </p>
      </div>
    ),
  },
  {
    title: "Achievements",
    description: "Programming & Technical Accomplishments",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white px-4 flex-col">
        <h3 className="text-xl font-semibold mb-2">Notable Achievements</h3>
        <p className="text-sm text-center">
          • CodeChef:<br/>
          - Contest Contender Silver Badge<br/>
          - Problem Solver Silver Badge (250+ Problems)<br/>
          - Daily Streak Gold Badge (50+ Days)<br/>
          • LeetCode:<br/>
          - Solved 250+ DSA Problems<br/>
          - Consistent Daily Solver Badge<br/>
          • GitHub:<br/>
          - 100+ Days Contribution Streak<br/>
          - Active Open Source Contributor
        </p>
      </div>
    ),
  }
];

export const GTAG = "G-5HCTL2TJ5W";
