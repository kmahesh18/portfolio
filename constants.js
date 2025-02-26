export const METADATA = {
  author: "Mahesh Kumar",
  title: "Portfolio | Mahesh Kumar",
  description:
    "Mahesh Kumar is a passionate Software Engineer, skilled in Problem Solving, building performant web applications.",
  siteUrl: "https://github.com/kmahesh18",
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
  image: "https://res.cloudinary.com/dywdhyojt/image/upload/v1721378510/social-preview.png",
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
    image: "/projects/medium.webp",
    blurImage: "/projects/blur/blog-blur.webp",
    description: "Dynamic blog platform with role-based access control using MERN Stack + Redux",
    gradient: ["#1488CC", "#2B32B2"],
    url: "https://venzo.vercel.app/",
    github: "https://github.com/kmahesh18/VENZO",
    tech: ["react", "redux", "nodejs", "mongodb"],
  },
  {
    name: "ZENKAI - Anime Stream",
    image: "/projects/airbnb.webp",
    blurImage: "/projects/blur/anime-blur.webp",
    description: "Optimized streaming platform with server-side rendering",
    gradient: ["#ff0099", "#493240"],
    url: "https://zenkai-ochre.vercel.app/",
    github: "https://github.com/kmahesh18/anime",
    tech: ["typescript", "nextjs", "redux"],
  },
  {
    name: "Excelify",
    image: "/projects/tesla.webp",
    blurImage: "/projects/blur/excel-blur.webp",
    description: "Interactive dashboards with excel converting features",
    gradient: ["#00b09b", "#96c93d"],
    github: "https://github.com/kmahesh18/xcelifiee-repo",
    url: "#",
    tech: ["react", "nodejs", "express"],
  },
  {
    name: "YTWrap",
    image: "/projects/inshorts.webp",
    blurImage: "/projects/blur/yt-blur.webp",
    description: "Creator-editor platform with automated video processing using AWS",
    gradient: ["#f953c6", "#b91d73"],
    github: "https://github.com/kmahesh18/YTWrap",
    url: "#",
    tech: ["nodejs", "aws", "react"],
  },
  {
    name: "React Chat App",
    image: "/projects/tesla.webp",
    blurImage: "/projects/blur/chat-blur.webp",
    description: "Real-time chat platform with Socket.IO and MERN Stack",
    gradient: ["#4568dc", "#b06ab3"],
    url: "#",
    github: "#",
    tech: ["react", "nodejs", "mongodb", "socket"],
  },
];

export const WORK_CONTENT = [
  {
    title: "GitHub Activity",
    description: "Open Source Contributions & Projects",
    content: (
      <div className="h-full w-full flex flex-col justify-center items-center p-8 bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 group">
        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent">
          @kmahesh18
        </h3>
        <div className="text-gray-300 space-y-3 text-center">
          <a href="https://github.com/kmahesh18" target="_blank" rel="noopener noreferrer"
             className="block hover:text-purple-400 transition-colors">
            • Public Repositories: 15+<br/>
            • Total Commits: 200+<br/>
            • Pull Requests: 20+<br/>
            • Stars Earned: 10+
          </a>
        </div>
        <div className="mt-6 space-y-4 w-full max-w-md transform group-hover:scale-105 transition-transform duration-500">
          <img 
            src={`https://ghchart.rshah.org/kmahesh18`} 
            alt="GitHub Contributions Graph"
            className="w-full rounded-xl shadow-lg hover:shadow-purple-500/20"
          />
          <img
            src="https://github-readme-streak-stats.herokuapp.com/?user=kmahesh18&theme=dark&hide_border=true"
            alt="GitHub Streak Stats"
            className="w-full rounded-xl shadow-lg hover:shadow-purple-500/20"
          />
        </div>
      </div>
    ),
  },
  {
    title: "Competitive Programming",
    description: "Active competitive programmer with strong problem-solving skills",
    content: (
      <div className="h-full w-full flex flex-col justify-center items-center p-8 bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-500 group">
        <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
          Coding Profiles
        </h3>
        <div className="space-y-6 w-full max-w-md">
          <div className="p-4 rounded-xl bg-gray-800/50 hover:bg-gray-800/70 transition-all duration-300 transform hover:-translate-y-1">
            <a href="https://codeforces.com/profile/maheshpro" target="_blank" rel="noopener noreferrer"
               className="block hover:text-blue-400 transition-colors">
              <span className="text-lg font-semibold">CodeForces (@maheshpro)</span><br/>
              <span className="text-gray-400">
                • Rating: 1012 (Pupil)<br/>
                • Problems Solved: ~100<br/>
                • Max Rating: 1012
              </span>
            </a>
          </div>
          
          <div className="p-4 rounded-xl bg-gray-800/50 hover:bg-gray-800/70 transition-all duration-300 transform hover:-translate-y-1">
            <a href="https://www.codechef.com/users/kmahesh_18" target="_blank" rel="noopener noreferrer"
               className="block hover:text-blue-400 transition-colors">
              <span className="text-lg font-semibold">CodeChef (@kmahesh_18)</span><br/>
              <span className="text-gray-400">
                • Rating: 1439 (2★)<br/>
                • Problems Solved: 399<br/>
                • Global Rank: 40338
              </span>
            </a>
          </div>
          
          <div className="p-4 rounded-xl bg-gray-800/50 hover:bg-gray-800/70 transition-all duration-300 transform hover:-translate-y-1">
            <a href="https://leetcode.com/u/__mahesh18/" target="_blank" rel="noopener noreferrer"
               className="block hover:text-blue-400 transition-colors">
              <span className="text-lg font-semibold">LeetCode (@__mahesh18)</span><br/>
              <span className="text-gray-400">
                • Contest Rating: ~1500<br/>
                • Problems Solved: ~200<br/>
                • Global Ranking: Top 15%
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
