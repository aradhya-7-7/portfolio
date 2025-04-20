import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import photo from "../assets/photo.jpeg";
import ResumeViewer from "./ResumeViewer";
import ContactForm from "./ContactForm";
import CustomCursor from "./CustomCursor";
import SocialMenu from "./SocialMenu";
import FloatingHighlights from "./FloatingHighlights";
import About from "./About";
import Projects from "./Projects";
import Blogs from "./Blogs";
import Experience from "./Experience";
import { FaGithub } from "react-icons/fa";
import { SiCodechef, SiLeetcode } from "react-icons/si";
import { projectsData, experienceData, blogsData } from "../Data/data";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("projects");
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [showResume, setShowResume] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [stats, setStats] = useState({
    pullRequests: 0,
    contributions: 0,
    repositories: 0,
  });

  const username = "aradhya-7-7";
  // const projectsData = [
  //   {
  //     id: 1,
  //     title: "Project 1",
  //     description: "Description...",
  //     thumbnail: "https://picsum.photos/800/800?random=2",
  //     likes: 123,
  //     technologies: ["React", "Node.js", "MongoDB"],
  //     links: {
  //       demo: "https://demo.com",
  //       github: "https://picsum.photos/800/800?random=2",
  //     },
  //   },
  //   {
  //     id: 2,
  //     title: "Project 2",
  //     description: "Another project description...",
  //     thumbnail: "https://source.unsplash.com/random/300x300?design",
  //     likes: 89,
  //     technologies: ["Vue", "Firebase"],
  //     links: {
  //       demo: "https://demo2.com",
  //       github: "https://github.com/project2",
  //     },
  //   },
  // ];

  // const experienceData = [
  //   {
  //     id: 1,
  //     company: "All India Diploma Engineers And Officials Association (AIDEOA)",
  //     title: "💻 Full Stack Developer Intern",
  //     duration: "📅Dec 2024 - Present",
  //     description: [
  //       "Developing responsive web applications using React.js and Node.js. 🚀",
  //       "Integrating RESTful APIs for seamless client-server communication. 🔗",
  //       "Managing and optimizing PostgreSQL databases for scalability. 🗄️",
  //       "Developing detailed, technical documentation for frontend and backend codebases. 📝",
  //       "Collaborating with cross-functional teams in an agile environment. 🤝",
  //     ],
  //   },
  // ];

  // const blogsData = [
  //   {
  //     id: 1,
  //     title: "Developer Portfolio",
  //     content: "hwllo",
  //     likes: 234,
  //     comments: [
  //       { author: "jane_doe", text: "This looks amazing! 😍" },
  //       { author: "travel_lover", text: "Perfect weather for the beach!" },
  //     ],
  //     images: [
  //       "https://picsum.photos/800/800?random=1",
  //       "https://picsum.photos/800/800?random=2",
  //       "https://picsum.photos/800/800?random=3",
  //     ],
  //     thumbnail: "https://picsum.photos/800/800?random=1",
  //     author: "johndoe",
  //     timestamp: "2 HOURS AGO",
  //   },

  // ];

  const profileData = {
    username: "Aradhya Srivastava",
    title: "Full Stack Developer / Problem Solver / Technical Writer",
    bio: "🚀 Software Engineer | DSA & Web Dev Enthusiast 💻 | Proficient in React, Node.js, JS 🤝 Passionate Problem-Solver | 📚 Always Learning & Innovating! 🌐",
    website: "<LinkedIn/>",
  };

  useEffect(() => {
    // Check if the device is mobile or touchscreen
    const checkIfMobile = () => {
      const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
      setIsMobile(isTouchDevice);
    };

    checkIfMobile(); // On initial load
    window.addEventListener("resize", checkIfMobile); // Recheck on resize

    return () => {
      window.removeEventListener("resize", checkIfMobile); // Clean up
    };
  }, []);


  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const reposRes = await fetch(
          `https://api.github.com/users/${username}`
        );
        const reposData = await reposRes.json();

        const prsRes = await fetch(
          `https://api.github.com/search/issues?q=author:${username}+type:pr`
        );
        const prsData = await prsRes.json();

        const commitsRes = await fetch(
          `https://api.github.com/search/commits?q=author:${username}`,
          {
            headers: { Accept: "application/vnd.github.cloak-preview" },
          }
        );
        const commitsData = await commitsRes.json();

        setStats({
          pullRequests: prsData.total_count || 0,
          contributions: commitsData.total_count || 0,
          repositories: reposData.public_repos || 0,
        });
      } catch (error) {
        console.error("GitHub API Error:", error);
      }
    };

    fetchGitHubStats();
  }, [username]);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white px-4 sm:px-6 lg:px-8">
      {!isMobile && <CustomCursor />}

      {/* Theme Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-2 right-2 sm:top-4 sm:right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 z-10 hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        {darkMode ? (
          <SunIcon className="h-5 w-5" />
        ) : (
          <MoonIcon className="h-5 w-5" />
        )}
      </button>

      {/* Profile Header */}
      <div className="max-w-4xl mx-auto py-6 sm:py-14">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
          {/* Profile Picture */}
          <div className="flex justify-center sm:justify-start">
            <div className="relative group cursor-pointer">
              <div className="instagram-gradient-border w-32 h-32 sm:w-40 sm:h-40">
                <div className="p-[3px] rounded-full bg-white dark:bg-black">
                  <img src={photo} alt="Profile" className="w-full h-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1 space-y-4 sm:space-y-6 px-2 sm:px-4">
            {/* Username and Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <h1 className="text-lg sm:text-xl font-semibold">
                {profileData.username}
              </h1>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                <button
                  onClick={() => setShowResume(true)}
                  className="px-6 py-1.5 bg-[#0095F6] text-white font-semibold rounded-lg hover:bg-[#1877F2] transition"
                >
                  Download Resume
                </button>
                <button
                  onClick={() => setShowContactForm(true)}
                  className="px-6 py-1.5 bg-gray-100 dark:bg-gray-800 font-semibold rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  Contact Me
                </button>
                <button
                  className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setMenuPosition({
                      x: rect.left - 180, // Adjust based on menu width
                      y: rect.bottom + 10,
                    });
                    setMenuOpen(!menuOpen);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mb-6">
              <div className="text-center sm:text-left">
                <span className="font-semibold text-lg text-gray-900 dark:text-white">
                  {stats.repositories}
                </span>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  repositories
                </p>
              </div>
              <div className="font-semibold text-lg text-gray-900 dark:text-white">
                <span className="font-semibold text-lg">
                  {stats.pullRequests}
                </span>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  pull requests
                </p>
              </div>
              <div className="font-semibold text-lg text-gray-900 dark:text-white">
                <span className="font-semibold text-lg">
                  {stats.contributions}
                </span>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  contributions
                </p>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <h2 className="font-semibold text-gray-900 dark:text-white">
                {profileData.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {profileData.bio}
              </p>

              <div
                className="coding-platforms 
  flex flex-wrap items-center justify-center sm:justify-start gap-3 my-4 p-3
  backdrop-blur-lg
  dark:bg-gray-800/30 bg-white/30
  dark:border-gray-700/30 border-white/30
  border
  rounded-3xl
  shadow-xl
  dark:shadow-gray-900/30
  transition-all duration-300 ease-in-out
  hover:bg-white/40 dark:hover:bg-gray-800/40
  hover:scale-[1.02]
  hover:shadow-2xl
  dark:hover:shadow-gray-900/40
  group
  max-w-xl
  mx-0
  w-fit"
              >
                {/* GitHub Logo */}
                <a
                  href="https://github.com/aradhya-7-7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform hover:scale-110 transition-transform duration-300"
                >
                  <FaGithub
                    className="text-2xl 
      dark:text-gray-200 text-gray-800 
      transition-colors duration-300
      group-hover:text-gray-600 dark:group-hover:text-gray-400"
                  />
                </a>

                {/* CodeChef Logo */}
                <a
                  href="https://www.codechef.com/users/aradhya77777"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform hover:scale-110 transition-transform duration-300"
                >
                  <img
                    src="/codechef.png"
                    alt="CodeChef"
                    className="w-7 h-7 object-contain 
        filter dark:brightness-90 
        transition-all duration-300
        group-hover:brightness-110 dark:group-hover:brightness-100"
                  />
                </a>

                {/* LeetCode Logo */}
                <a
                  href="https://leetcode.com/u/aradhya610/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform hover:scale-110 transition-transform duration-300"
                >
                  <img
                    src="/leetcode.png"
                    alt="LeetCode"
                    className="w-7 h-7 object-contain 
        filter dark:brightness-90 
        transition-all duration-300
        group-hover:brightness-110 dark:group-hover:brightness-100"
                  />
                </a>

                {/* Coding Ninja Logo */}
                <a
                  href="https://www.naukri.com/code360/profile/aradhya7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform hover:scale-110 transition-transform duration-300"
                >
                  <img
                    src="/coding_ninja.png"
                    alt="Coding Ninja"
                    className="w-7 h-7 object-contain 
        filter dark:brightness-90 
        transition-all duration-300
        group-hover:brightness-110 dark:group-hover:brightness-100"
                  />
                </a>
              </div>
              <div>
                <a
                  href={"https://www.linkedin.com/in/aradhya08oc01/"}
                  className="text-[#0095F6] hover:text-[#1877F2] text-sm font-medium pt-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {profileData.website}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Story Highlights */}
        <FloatingHighlights />

        {/* Content Tabs */}
        <div className="mt-6 border-t dark:border-gray-700">
          <div className="flex justify-around sm:justify-center sm:gap-12">
            <button
              className={`py-3 px-6 text-sm font-medium tracking-wider transition-all duration-300 ${
                activeTab === "projects"
                  ? "text-gray-900 dark:text-white border-t-2 border-gray-900 dark:border-white"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
              onClick={() => setActiveTab("projects")}
            >
              <div className="flex items-center gap-2">
                {/* <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg> */}
                Projects
              </div>
            </button>

            <button
              className={`py-3 text-sm tracking-wider text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition ${
                activeTab === "Experience"
                  ? "border-t-2 border-gray-900 dark:border-white"
                  : ""
              }`}
              onClick={() => setActiveTab("Experience")}
            >
              Experience
            </button>
            <button
              className={`py-3 text-sm font-medium tracking-wider text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition flex items-center gap-2 ${
                activeTab === "Blogs"
                  ? "border-t-2 border-gray-900 dark:border-white"
                  : ""
              }`}
              onClick={() => setActiveTab("Blogs")}
            >
              Blogs
            </button>

            <button
              className={`py-3 text-sm tracking-wider text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition ${
                activeTab === "About"
                  ? "border-t-2 border-gray-900 dark:border-white"
                  : ""
              }`}
              onClick={() => setActiveTab("About")}
            >
              About
            </button>
          </div>

          {/* Posts Grid */}

          {/* <div className="grid grid-cols-3 gap-px mt-0.5">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-gray-100 dark:bg-gray-800 hover:opacity-90 transition cursor-pointer"
              />
            ))}
          </div> */}
          <div className="mt-6">
            {activeTab === "About" && <About />}
            {activeTab === "projects" && <Projects projects={projectsData} />}
            {activeTab === "Experience" && (
              <Experience experiences={experienceData} />
            )}
            {activeTab === "Blogs" && <Blogs blogs={blogsData} />}
            {/* Your other tab contents */}
          </div>
        </div>
      </div>

      {/* Modals */}
      <SocialMenu //⚠️social links have to be added
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        position={menuPosition}
      />
      {showResume && <ResumeViewer onClose={() => setShowResume(false)} />}
      {showContactForm && (
        <ContactForm onClose={() => setShowContactForm(false)} />
      )}
    </div>
  );
};

export default Profile;
