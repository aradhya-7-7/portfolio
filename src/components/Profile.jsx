import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { FaBars, FaTimes } from "react-icons/fa";
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
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [stats, setStats] = useState({
    pullRequests: 0,
    contributions: 0,
    repositories: 0,
  });
  
  const username = "aradhya-7-7";

  const profileData = {
    username: "Aradhya Srivastava",
    title: "Full Stack Developer / Problem Solver / Technical Writer",
    bio: "🚀 Software Engineer | DSA & Web Dev Enthusiast 💻 | Proficient in React, Node.js, JS 🤝 Passionate Problem-Solver | 📚 Always Learning & Innovating! 🌐",
    website: "<LinkedIn/>",
  };

  useEffect(() => {
    // Check if the device is mobile or touchscreen
    const checkIfMobile = () => {
      const isTouchDevice = 
        window.matchMedia("(pointer: coarse)").matches ||
        window.innerWidth < 768;
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
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white px-3 sm:px-6 lg:px-8 overflow-x-hidden">
      {!isMobile && <CustomCursor />}
      
      {/* Theme Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-2 right-2 sm:top-4 sm:right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 z-10 hover:bg-gray-200 dark:hover:bg-gray-700"
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? (
          <SunIcon className="h-5 w-5" />
        ) : (
          <MoonIcon className="h-5 w-5" />
        )}
      </button>

      {/* Mobile Navigation Toggle */}
      {isMobile && (
        <button
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="fixed top-2 left-2 z-50 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
        >
          {mobileNavOpen ? (
            <FaTimes className="h-5 w-5" />
          ) : (
            <FaBars className="h-5 w-5" />
          )}
        </button>
      )}

      {/* Mobile Navigation Menu */}
      {isMobile && mobileNavOpen && (
        <div className="fixed inset-0 bg-white dark:bg-black z-40 flex flex-col items-center justify-center space-y-6 p-4">
          <button
            onClick={() => {
              setActiveTab("projects");
              setMobileNavOpen(false);
            }}
            className={`text-xl font-medium ${
              activeTab === "projects" ? "text-blue-500" : ""
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => {
              setActiveTab("Experience");
              setMobileNavOpen(false);
            }}
            className={`text-xl font-medium ${
              activeTab === "Experience" ? "text-blue-500" : ""
            }`}
          >
            Experience
          </button>
          <button
            onClick={() => {
              setActiveTab("Blogs");
              setMobileNavOpen(false);
            }}
            className={`text-xl font-medium ${
              activeTab === "Blogs" ? "text-blue-500" : ""
            }`}
          >
            Blogs
          </button>
          <button
            onClick={() => {
              setActiveTab("About");
              setMobileNavOpen(false);
            }}
            className={`text-xl font-medium ${
              activeTab === "About" ? "text-blue-500" : ""
            }`}
          >
            About
          </button>
          <div className="mt-6 flex space-x-4">
            <button
              onClick={() => {
                setShowResume(true);
                setMobileNavOpen(false);
              }}
              className="px-4 py-2 bg-[#0095F6] text-white font-semibold rounded-lg"
            >
              Resume
            </button>
            <button
              onClick={() => {
                setShowContactForm(true);
                setMobileNavOpen(false);
              }}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 font-semibold rounded-lg"
            >
              Contact
            </button>
          </div>
        </div>
      )}

      {/* Profile Header */}
      <div className="max-w-4xl mx-auto py-6 sm:py-10 md:py-14 mt-8 sm:mt-0">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center sm:items-start">
          {/* Profile Picture */}
          <div className="flex justify-center sm:justify-start">
            <div className="relative group cursor-pointer">
              <div className="instagram-gradient-border w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40">
                <div className="p-[3px] rounded-full bg-white dark:bg-black">
                  <img 
                    src={photo} 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Profile Info */}
          <div className="flex-1 space-y-3 sm:space-y-4 px-2 sm:px-4 text-center sm:text-left">
            {/* Username and Actions */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <h1 className="text-lg sm:text-xl font-semibold">
                {profileData.username}
              </h1>
              
              {/* Action buttons - hidden on mobile, shown in desktop */}
              <div className="hidden sm:flex flex-wrap justify-center sm:justify-start gap-2">
                <button
                  onClick={() => setShowResume(true)}
                  className="px-4 sm:px-6 py-1.5 bg-[#0095F6] text-white font-semibold rounded-lg hover:bg-[#1877F2] transition"
                >
                  Download Resume
                </button>
                <button
                  onClick={() => setShowContactForm(true)}
                  className="px-4 sm:px-6 py-1.5 bg-gray-100 dark:bg-gray-800 font-semibold rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
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
            <div className="flex justify-center sm:justify-start gap-4 sm:gap-8 mb-3 sm:mb-6">
              <div className="text-center sm:text-left">
                <span className="font-semibold text-base sm:text-lg text-gray-900 dark:text-white">
                  {stats.repositories}
                </span>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  repositories
                </p>
              </div>
              <div className="text-center sm:text-left">
                <span className="font-semibold text-base sm:text-lg text-gray-900 dark:text-white">
                  {stats.pullRequests}
                </span>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  pull requests
                </p>
              </div>
              <div className="text-center sm:text-left">
                <span className="font-semibold text-base sm:text-lg text-gray-900 dark:text-white">
                  {stats.contributions}
                </span>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  contributions
                </p>
              </div>
            </div>
            
            {/* Bio */}
            <div className="space-y-2">
              <h2 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                {profileData.title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {profileData.bio}
              </p>
              
              {/* Action buttons for mobile */}
              <div className="flex sm:hidden justify-center gap-2 my-3">
                <button
                  onClick={() => setShowResume(true)}
                  className="px-4 py-1.5 bg-[#0095F6] text-white text-sm font-semibold rounded-lg"
                >
                  Resume
                </button>
                <button
                  onClick={() => setShowContactForm(true)}
                  className="px-4 py-1.5 bg-gray-100 dark:bg-gray-800 text-sm font-semibold rounded-lg"
                >
                  Contact
                </button>
              </div>
              
              {/* Coding platforms */}
              <div className="coding-platforms flex flex-wrap items-center justify-center sm:justify-start gap-3 my-4 p-3 backdrop-blur-lg dark:bg-gray-800/30 bg-white/30 dark:border-gray-700/30 border-white/30 border rounded-3xl shadow-xl dark:shadow-gray-900/30 transition-all duration-300 ease-in-out hover:bg-white/40 dark:hover:bg-gray-800/40 hover:scale-[1.02] hover:shadow-2xl dark:hover:shadow-gray-900/40 group max-w-xl mx-auto sm:mx-0 w-fit">
                {/* GitHub Logo */}
                <a
                  href="https://github.com/aradhya-7-7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform hover:scale-110 transition-transform duration-300"
                >
                  <FaGithub
                    className="text-2xl dark:text-gray-200 text-gray-800 transition-colors duration-300 group-hover:text-gray-600 dark:group-hover:text-gray-400"
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
                                      className="w-6 h-6 sm:w-7 sm:h-7 object-contain filter dark:brightness-90 transition-all duration-300 group-hover:brightness-110 dark:group-hover:brightness-100"
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
                                      className="w-6 h-6 sm:w-7 sm:h-7 object-contain filter dark:brightness-90 transition-all duration-300 group-hover:brightness-110 dark:group-hover:brightness-100"
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
                                      className="w-6 h-6 sm:w-7 sm:h-7 object-contain filter dark:brightness-90 transition-all duration-300 group-hover:brightness-110 dark:group-hover:brightness-100"
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
                          
                          {/* Story Highlights - hide on small screens */}
                          <div className="hidden sm:block">
                            <FloatingHighlights />
                          </div>
                          
                          {/* Content Tabs */}
                          <div className="mt-6 border-t dark:border-gray-700">
                            {/* Desktop Navigation */}
                            <div className="hidden sm:flex justify-around sm:justify-center sm:gap-12">
                              <button
                                className={`py-3 px-6 text-sm font-medium tracking-wider transition-all duration-300 ${
                                  activeTab === "projects"
                                    ? "text-gray-900 dark:text-white border-t-2 border-gray-900 dark:border-white"
                                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                }`}
                                onClick={() => setActiveTab("projects")}
                              >
                                <div className="flex items-center gap-2">
                                  Projects
                                </div>
                              </button>
                              <button
                                className={`py-3 px-6 text-sm font-medium tracking-wider transition-all duration-300 ${
                                  activeTab === "Experience"
                                    ? "text-gray-900 dark:text-white border-t-2 border-gray-900 dark:border-white"
                                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                }`}
                                onClick={() => setActiveTab("Experience")}
                              >
                                Experience
                              </button>
                              <button
                                className={`py-3 px-6 text-sm font-medium tracking-wider transition-all duration-300 ${
                                  activeTab === "Blogs"
                                    ? "text-gray-900 dark:text-white border-t-2 border-gray-900 dark:border-white"
                                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                }`}
                                onClick={() => setActiveTab("Blogs")}
                              >
                                Blogs
                              </button>
                              <button
                                className={`py-3 px-6 text-sm font-medium tracking-wider transition-all duration-300 ${
                                  activeTab === "About"
                                    ? "text-gray-900 dark:text-white border-t-2 border-gray-900 dark:border-white"
                                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                }`}
                                onClick={() => setActiveTab("About")}
                              >
                                About
                              </button>
                            </div>
                            
                            {/* Mobile Tab Navigation */}
                            <div className="flex sm:hidden justify-between border-b dark:border-gray-700 mb-4">
                              <button
                                className={`py-2 px-2 text-xs font-medium ${
                                  activeTab === "projects"
                                    ? "text-blue-500 border-b-2 border-blue-500"
                                    : "text-gray-500"
                                }`}
                                onClick={() => setActiveTab("projects")}
                              >
                                Projects
                              </button>
                              <button
                                className={`py-2 px-2 text-xs font-medium ${
                                  activeTab === "Experience"
                                    ? "text-blue-500 border-b-2 border-blue-500"
                                    : "text-gray-500"
                                }`}
                                onClick={() => setActiveTab("Experience")}
                              >
                                Experience
                              </button>
                              <button
                                className={`py-2 px-2 text-xs font-medium ${
                                  activeTab === "Blogs"
                                    ? "text-blue-500 border-b-2 border-blue-500"
                                    : "text-gray-500"
                                }`}
                                onClick={() => setActiveTab("Blogs")}
                              >
                                Blogs
                              </button>
                              <button
                                className={`py-2 px-2 text-xs font-medium ${
                                  activeTab === "About"
                                    ? "text-blue-500 border-b-2 border-blue-500"
                                    : "text-gray-500"
                                }`}
                                onClick={() => setActiveTab("About")}
                              >
                                About
                              </button>
                            </div>
                            
                            {/* Content Display */}
                            <div className="w-full">
                              {activeTab === "About" && <About />}
                              {activeTab === "projects" && <Projects projects={projectsData} />}
                              {activeTab === "Experience" && (
                                <Experience experiences={experienceData} />
                              )}
                              {activeTab === "Blogs" && <Blogs blogs={blogsData} />}
                            </div>
                          </div>
                        </div>
                        
                        {/* Modals */}
                        <SocialMenu
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
                  