export const METADATA = {
  author: "Mahesh Kumar",
  title: "Portfolio | Mahesh Kumar",
  description:
    "Mahesh Kumar is a passionate Software Engineer, skilled in Problem Solving, building performant web and mobile applications.",
  siteUrl: "https://mahesh-zeta.vercel.app",
  twitterHandle: "@xnor404",
  keywords: [
    "Mahesh Kumar",
    "Software Engineer",
    "Frontend Developer",
    "Full Stack Developer",
    "Backend Developer",
    "Mobile App Developer",
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
    name: "Work",
    ref: "work",
  },
  {
    name: "Contact",
    ref: "contact",
  },
];

export const TYPED_STRINGS = [
  "A passionate Software Engineer",
  "I build modern full-stack solutions",
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
  languages: [
    "javascript",
    "typescript", 
    "python",
    "cpp",
    "c",
    "html",
    "css"
  ],
  librariesAndFrameworks: [
    "react",
    "reactnative",
    "nextjs",
    "tailwindcss",
    "bootstrap",
    "redux",
    "sass",
    "styledcomponents",
    "chakra-ui",
    "antdesign"
  ],
  databases: [
    "mongodb",
    "mysql", 
    "postgresql",
    "prisma"
  ],
  Tools: [
    "nodejs",
    "express",
    "graphql",
    "socketio",
    "webrtc",
    "aws",
    "cloudinary",
    "docker",
    "git",
    "github",
    "linux",
    "postman",
    "jest",
    "vercel",
    "vite",
    "webpack",
    "firebase",
    "figma",
    "sanity-io",
    "rendor",
    "tanstack-query"
  ],
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
    name: "Metaverse",
    image: "/projects/metaversee.png",
    blurImage: "/projects/blur/blog-blur.webp",
    description: "2D virtual workspace with customizable avatars for remote teams",
    gradient: ["#1488CC", "#2B32B2"],
    url: "https://metaverse-three-indol.vercel.app/",
    github: "https://github.com/kmahesh18/MetaVerse",
    tech: ["react", "WebRTC", "nodejs", "three.js"],
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
    name:"DeliveryFlow",
    image: "/projects/deliveryFlow.png",
    blurImage: "/projects/blur/delivery-blur.webp",
    description: "Logistics management system for delivery operations with real-time tracking",
    gradient: ["#00c6ff", "#0072ff"],
    url: "https://delivery-flow.vercel.app/",
    github: "https://github.com/kmahesh18/deliveryFlow",
    tech: ["react", "nodejs", "mongodb", "websockets","leaflet maps"],
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
        <h1 className="text-3xl font-bold text-center mb-4 gradient-text"
            style={{
              background: "linear-gradient(135deg, #9F7AEA 0%, #4C1D95 50%, #9F7AEA 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundSize: "200% auto",
              animation: "shine 5s linear infinite",
            }}>
            Github
          </h1>
        <div className="text-gray-300 space-y-3 text-center">
          <a href="https://github.com/kmahesh18" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-[#7913ff] transition-colors">@kmahesh18</a>
          <p className="block hover:text-[#7913ff] transition-colors">
            • Public Repositories: {githubData?.public_repos || '15+'}<br></br>
            • Total Commits: {githubData?.total_commits || '200+'}<br></br>
            • Pull Requests: {githubData?.public_gists || '20+'}<br></br>
            • Stars: {githubData?.followers || '10+'}<br></br>
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
        <h1 className="text-3xl font-bold text-center mb-4 gradient-text"
            style={{
              background: "linear-gradient(135deg, #9F7AEA 0%, #4C1D95 50%, #9F7AEA 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundSize: "200% auto",
              animation: "shine 5s linear infinite",
            }}>
            Coding Profiles
          </h1>
        <div className="space-y-6 w-full max-w-md">
          <div className="p-4 rounded-xl bg-black/50 hover:bg-black/70 transition-all duration-300 transform hover:-translate-y-1 border border-violet-500/10 hover:border-violet-500/30">
            <a href="https://www.codechef.com/users/kmahesh_18" target="_blank" rel="noopener noreferrer"
               className="block hover:text-[#7913ff] transition-colors">
              <span className="text-lg font-semibold">CodeChef (@kmahesh_18)</span><br/>
              <span className="text-gray-400">
                • Current Rating: {codeChefData?.current_rating || 1550} (2★)<br/>
                • Max Rating: 1550<br/>
                • Contest Contender Silver Badge
              </span>
            </a>
          </div>
          
          <div className="p-4 rounded-xl bg-black/50 hover:bg-black/70 transition-all duration-300 transform hover:-translate-y-1 border border-violet-500/10 hover:border-violet-500/30">
            <a href="https://leetcode.com/u/__mahesh18/" target="_blank" rel="noopener noreferrer"
               className="block hover:text-[#7913ff] transition-colors">
              <span className="text-lg font-semibold">LeetCode (@__mahesh18)</span><br/>
              <span className="text-gray-400">
                • Rating: {leetcodeData?.current_rating||'1707'}<br/>
                • Problems Solved: {leetcodeData?.totalSolved||'200+'}<br/>
                • Daily Solver Badge
              </span>
            </a>
          </div>
          
          <div className="p-4 rounded-xl bg-black/50 hover:bg-black/70 transition-all duration-300 transform hover:-translate-y-1 border border-violet-500/10 hover:border-violet-500/30">
            <a href="https://codeforces.com/profile/maheshpro" target="_blank" rel="noopener noreferrer"
               className="block hover:text-[#7913ff] transition-colors">
              <span className="text-lg font-semibold">CodeForces (@maheshpro)</span><br/>
              <span className="text-gray-400">
                • Rating: {codeforcesData?.current_rating||1211}<br/>
                • Max Rating: 1211<br/>
                • Regular Contest Participant
              </span>
            </a>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Technical Leadership",
    description: "Campus Involvement & Community Contributions",
    content: () => (
      <div className="h-full w-full flex flex-col justify-center items-center p-8 bg-[#0A0A1B] backdrop-blur-sm rounded-2xl border border-green-500/20 hover:border-green-500/40 transition-all duration-500 group">
        <h1 className="text-3xl font-bold text-center mb-4 gradient-text"
            style={{
              background: "linear-gradient(135deg, #9F7AEA 0%, #4C1D95 50%, #9F7AEA 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundSize: "200% auto",
              animation: "shine 5s linear infinite",
            }}>
            Leadership & Community
          </h1>
        <div className="space-y-4 w-full max-w-2xl">
          <div className="p-4 rounded-xl bg-black/50 hover:bg-black/70 transition-all duration-300 transform hover:-translate-y-1 border border-green-500/10 hover:border-green-500/30">
            <span className="text-lg font-semibold text-green-300">Core Member - Turing Hut (Coding Club)</span>
            <p className="text-gray-300 mt-2 leading-relaxed">
              • Leading coding initiatives and peer mentoring programs<br/>
              • Organizing technical workshops and coding competitions<br/>
              • Contributing to club's technical projects and community building
            </p>
            <div className="mt-2 text-sm text-green-400">
              <a href="https://drive.google.com/file/d/1RWmyhPbfY3GjnqIXCioftJjuFsEKLwhO/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="hover:text-green-300">
                Codenox Certificate
              </a>
            </div>
          </div>
          
          <div className="p-4 rounded-xl bg-black/50 hover:bg-black/70 transition-all duration-300 transform hover:-translate-y-1 border border-green-500/10 hover:border-green-500/30">
            <span className="text-lg font-semibold text-emerald-300">Open Source Contributor</span>
            <p className="text-gray-300 mt-2">
              • Active participant in Hacktoberfest 2024 with 4 merged PRs<br/>
              • Contributing to collaborative repositories<br/>
              • Mentoring junior developers in open source contributions
            </p>
            <div className="mt-2 text-sm text-emerald-400">
              <a href="https://www.holopin.io/userbadge/cm2wwmpqk07310cmbw8t5e6a1" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-300">
                Hacktoberfest Badge
              </a>
            </div>
          </div>
          
          <div className="p-4 rounded-xl bg-black/50 hover:bg-black/70 transition-all duration-300 transform hover:-translate-y-1 border border-green-500/10 hover:border-green-500/30">
            <span className="text-lg font-semibold text-cyan-300">Computer Society of India (CSI)</span>
            <p className="text-gray-300 mt-2">
              Member of Student Chapter - Participating in technical events, workshops, and industry networking sessions.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Education & Certifications",
    description: "Academic Excellence & Professional Development",
    content: () => (
      <div className="h-full w-full flex flex-col justify-center items-center p-8 bg-[#0A0A1B] backdrop-blur-sm rounded-2xl border border-orange-500/20 hover:border-orange-500/40 transition-all duration-500 group">
        <h1 className="text-3xl font-bold text-center mb-4 gradient-text"
            style={{
              background: "linear-gradient(135deg, #9F7AEA 0%, #4C1D95 50%, #9F7AEA 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundSize: "200% auto",
              animation: "shine 5s linear infinite",
            }}>
            Education & Certifications
          </h1>
        <div className="space-y-4 w-full max-w-2xl">
          <div className="p-4 rounded-xl bg-black/50 hover:bg-black/70 transition-all duration-300 transform hover:-translate-y-1 border border-orange-500/10 hover:border-orange-500/30">
            <span className="text-lg font-semibold text-orange-300">B.Tech Computer Science & Engineering</span>
            <p className="text-gray-300 mt-2">
              VNR Vignana Jyothi Institute of Engineering and Technology<br/>
              2023-2027 | <strong>CGPA: 9.50/10</strong><br/>
              Hyderabad, India
            </p>
          </div>
          
          <div className="p-4 rounded-xl bg-black/50 hover:bg-black/70 transition-all duration-300 transform hover:-translate-y-1 border border-orange-500/10 hover:border-orange-500/30">
            <span className="text-lg font-semibold text-yellow-300">Professional Certifications</span>
            <div className="text-gray-300 mt-2">
              <p>• <a href="https://drive.google.com/file/d/1iNZzj5I0jBVKY-benXtOojNAA_leSyV9/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Microsoft Cyber Suraksha Course</a></p>
              <p>• <a href="https://drive.google.com/file/d/1sMqHbyaZPNHVzjIOmtOmlSJt2e-4S-Zj/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">PowerBI & Data Analytics - ISTE</a></p>
              <p>• <a href="https://drive.google.com/file/d/179I9VUNJONq2l2S7cT-3UWi4_vZ8_VAY/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">NPTEL - Programming in Modern C++</a></p>
            </div>
          </div>
          
          <div className="p-4 rounded-xl bg-black/50 hover:bg-black/70 transition-all duration-300 transform hover:-translate-y-1 border border-orange-500/10 hover:border-orange-500/30">
            <span className="text-lg font-semibold text-purple-300">Previous Education</span>
            <p className="text-gray-300 mt-2">
              <strong>Intermediate (APBIE)</strong> - Ascent Junior College<br/>
              2021-2023 | 94.1%<br/><br/>
              <strong>Secondary Education (CBSE)</strong> - Nava Bharat Public School<br/>
              2021 | 85%
            </p>
          </div>
        </div>
      </div>
    ),
  },

  {
    title: "Inmin - AI Developer",
    description: "Building intelligent systems for quick commerce platform",
    content: (
      <div className="h-full w-full flex flex-col justify-center items-center p-8 bg-[#0A0A1B] backdrop-blur-sm rounded-2xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-500 group">
        <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
          <a href="https://inmin-home.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors">
            INMIN - Quick Commerce Platform
          </a>
        </h3>
        <div className="space-y-4 w-full max-w-2xl">
          <div className="p-4 rounded-xl bg-black/50 hover:bg-black/70 transition-all duration-300 transform hover:-translate-y-1 border border-blue-500/10 hover:border-blue-500/30">
            <span className="text-lg font-semibold text-blue-300">AI Developer & Software Engineer</span>
            <p className="text-gray-300 mt-2 leading-relaxed">
              • Developing and maintaining 40+ AI agents for automated commerce operations<br/>
              • Building intelligent systems using Python, TensorFlow, and custom LLMs<br/>
              • Implementing NLP solutions for customer service automation<br/>
              • Creating machine learning models for demand forecasting and inventory optimization
            </p>
          </div>
          
          <div className="p-4 rounded-xl bg-black/50 hover:bg-black/70 transition-all duration-300 transform hover:-translate-y-1 border border-blue-500/10 hover:border-blue-500/30">
            <span className="text-lg font-semibold text-cyan-300">Key Technologies</span>
            <p className="text-gray-300 mt-2">
              • <strong>AI/ML:</strong> Python, TensorFlow, Custom LLMs, NLP<br/>
              • <strong>Data Science:</strong> Machine Learning, Predictive Analytics<br/>
              • <strong>Backend:</strong> Scalable AI Agent Architecture<br/>
              • <strong>Impact:</strong> Enhanced platform efficiency through intelligent automation
            </p>
          </div>
          
          <div className="p-4 rounded-xl bg-black/50 hover:bg-black/70 transition-all duration-300 transform hover:-translate-y-1 border border-blue-500/10 hover:border-blue-500/30">
            <span className="text-lg font-semibold text-purple-300">Innovation Focus</span>
            <p className="text-gray-300 mt-2">
              Crafting intelligent systems that solve real-world problems in quick commerce,<br/>
              driven by curiosity and precision to deliver data-driven solutions that optimize<br/>
              customer experience and operational efficiency.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Technical Skills",
    description: "Full-Stack Development & Modern Technologies",
    content: () => (
      <div className="h-full w-full flex flex-col justify-center items-center p-8 bg-[#0A0A1B] backdrop-blur-sm rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 group">
        <h1 className="text-3xl font-bold text-center mb-4 gradient-text"
            style={{
              background: "linear-gradient(135deg, #9F7AEA 0%, #4C1D95 50%, #9F7AEA 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundSize: "200% auto",
              animation: "shine 5s linear infinite",
            }}>
            Technical Expertise
          </h1>
        <div className="space-y-4 w-full max-w-2xl">
          <div className="p-4 rounded-xl bg-black/50 hover:bg-black/70 transition-all duration-300 transform hover:-translate-y-1 border border-purple-500/10 hover:border-purple-500/30">
            <span className="text-lg font-semibold text-purple-300">Languages & Core</span>
            <p className="text-gray-300 mt-2">
              JavaScript, TypeScript, Python, C++, C, R
            </p>
          </div>
          
          <div className="p-4 rounded-xl bg-black/50 hover:bg-black/70 transition-all duration-300 transform hover:-translate-y-1 border border-purple-500/10 hover:border-purple-500/30">
            <span className="text-lg font-semibold text-blue-300">Frontend & Mobile</span>
            <p className="text-gray-300 mt-2">
              React.js, Next.js, React Native (Expo), HTML5, CSS3, Bootstrap, Tailwind CSS, Responsive Design
            </p>
          </div>
          
          <div className="p-4 rounded-xl bg-black/50 hover:bg-black/70 transition-all duration-300 transform hover:-translate-y-1 border border-purple-500/10 hover:border-purple-500/30">
            <span className="text-lg font-semibold text-green-300">Backend & APIs</span>
            <p className="text-gray-300 mt-2">
              Node.js, Express.js, RESTful APIs, GraphQL, Socket.IO, WebSockets, WebRTC
            </p>
          </div>
          
          <div className="p-4 rounded-xl bg-black/50 hover:bg-black/70 transition-all duration-300 transform hover:-translate-y-1 border border-purple-500/10 hover:border-purple-500/30">
            <span className="text-lg font-semibold text-cyan-300">Database & Cloud</span>
            <p className="text-gray-300 mt-2">
              MongoDB, MySQL, Prisma ORM, AWS S3, Cloudinary, Docker, CI/CD Pipelines
            </p>
          </div>
          
          <div className="p-4 rounded-xl bg-black/50 hover:bg-black/70 transition-all duration-300 transform hover:-translate-y-1 border border-purple-500/10 hover:border-purple-500/30">
            <span className="text-lg font-semibold text-orange-300">Development Practices</span>
            <p className="text-gray-300 mt-2">
              Clean Code Architecture, TDD, Code Reviews, Jest Testing, Git, GitHub Copilot, Linux
            </p>
          </div>
        </div>
      </div>
    ),
  }
];

export const GTAG = "G-5HCTL2TJ5W";
