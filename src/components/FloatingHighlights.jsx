import React, { useState, useEffect, useRef } from "react";
import { 
   SiGit, SiGithub, SiPostman, SiNpm, SiYarn
 } from 'react-icons/si';
import {
  FaCode,
  FaServer,
  FaShieldAlt,
  FaCloud,
  FaTools,
  FaLaptopCode,
} from "react-icons/fa";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiVite,
  SiRedux,
} from "react-icons/si";
import { RiLayoutLine } from "react-icons/ri";
import {
  SiNodedotjs,
  SiExpress,
  SiGraphql,
  SiJsonwebtokens,
  SiSocketdotio,
  SiAuth0,
} from "react-icons/si";
import { SiMysql, SiMongodb } from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { FaDatabase } from "react-icons/fa";
import { SiFirebase, SiVercel, SiNetlify } from "react-icons/si";

const FloatingHighlights = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef(null);

  const highlights = [
    {
      title: "Frontend Development",
      text: (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 justify-items-center">
          <SiHtml5 className="w-8 h-8 text-[#E34F26] hover:scale-110 transition-transform" />
          <SiCss3 className="w-8 h-8 text-[#1572B6] hover:scale-110 transition-transform" />
          <SiJavascript className="w-8 h-8 text-[#F7DF1E] hover:scale-110 transition-transform" />
          <SiTypescript className="w-8 h-8 text-[#3178C6] hover:scale-110 transition-transform" />
          <SiReact className="w-8 h-8 text-[#61DAFB] hover:scale-110 transition-transform" />
          <SiNextdotjs className="w-8 h-8 text-gray-800 dark:text-white hover:scale-110 transition-transform" />
          <SiTailwindcss className="w-8 h-8 text-[#06B6D4] hover:scale-110 transition-transform" />
          <SiVite className="w-8 h-8 text-[#646CFF] hover:scale-110 transition-transform" />
          <RiLayoutLine className="w-8 h-8 text-[#2196F3] hover:scale-110 transition-transform" />
          <SiRedux className="w-8 h-8 text-[#764ABC] hover:scale-110 transition-transform" />
        </div>
      ),
      icon: <FaCode className="w-8 h-8 text-gray-600 dark:text-gray-300" />,
    },
    {
      title: "Backend Development",
      text: (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 justify-items-center">
          <SiNodedotjs className="w-8 h-8 text-[#339933] hover:scale-110 transition-transform" />
          <SiExpress className="w-8 h-8 text-[#000000] dark:text-white hover:scale-110 transition-transform" />
          <TbApi className="w-8 h-8 text-[#FF6B6B] hover:scale-110 transition-transform" />
          <SiGraphql className="w-8 h-8 text-[#E10098] hover:scale-110 transition-transform" />
          <SiJsonwebtokens className="w-8 h-8 text-[#000000] dark:text-white hover:scale-110 transition-transform" />
          <SiAuth0 className="w-8 h-8 text-[#EB5424] hover:scale-110 transition-transform" />
          <SiSocketdotio className="w-8 h-8 text-[#010101] dark:text-white hover:scale-110 transition-transform" />
          <SiPostman className="w-8 h-8 text-[#FF6C37] hover:scale-110 transition-transform" />
        </div>
      ),
      icon: <FaServer className="w-8 h-8 text-gray-600 dark:text-gray-300" />,
    },
    {
      title: "Databases & Storage",
      text: (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-items-center">
          <SiMysql className="w-8 h-8 text-[#4479A1] hover:scale-110 transition-transform" />
          <SiMongodb className="w-8 h-8 text-[#47A248] hover:scale-110 transition-transform" />
        </div>
      ),
      icon: <FaDatabase className="w-8 h-8 text-gray-600 dark:text-gray-300" />,
    },
    {
      title: "Deployment",

      text: (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-items-center">
          <SiFirebase className="w-8 h-8 text-[#de3308] hover:scale-110 transition-transform" />
          <SiVercel className="w-8 h-8 text-[#000000] dark:text-white hover:scale-110 transition-transform" />
          <SiNetlify className="w-8 h-8 text-[#00C7B7] hover:scale-110 transition-transform" />
        </div>
      ),
      icon: <FaCloud className="w-8 h-8 text-gray-600 dark:text-gray-300" />,
    },
    {
      title: "Version Control & Development Tools",
      text: (
         <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 justify-items-center">
           <SiGit className="w-8 h-8 text-[#F05032] hover:scale-110 transition-transform" />
           <SiGithub className="w-8 h-8 text-[#181717] dark:text-white hover:scale-110 transition-transform" />
           <SiPostman className="w-8 h-8 text-[#FF6C37] hover:scale-110 transition-transform" />
           <SiNpm className="w-8 h-8 text-[#CB3837] hover:scale-110 transition-transform" />
           <SiYarn className="w-8 h-8 text-[#2C8EBB] hover:scale-110 transition-transform" />
         </div>
       ),
      icon: <FaTools className="w-8 h-8 text-gray-600 dark:text-gray-300" />,
    },
    {
      title: "Software Development & Engineering Concepts",
      text: (
         <div className="flex flex-col space-y-2 px-2 text-center">
           <span>• Full-Stack Development</span>
           <span>• Testing and Debugging</span>
           <span>• Documentation</span>
           <span>• Algorithms</span>
           <span>• Data Structures</span>
           <span>• Problem-Solving & Competitive Programming</span>
         </div>
       ),
      icon: (
        <FaLaptopCode className="w-8 h-8 text-gray-600 dark:text-gray-300" />
      ),
    },
  ];

  const handleClick = (index, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPosition({
      x: Math.max(10, Math.min(rect.left - 200, window.innerWidth - 610)),
      y: rect.top - 20,
    });
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setSelectedIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="mt-6 -mx-4 px-4">
  <div className="flex gap-3 overflow-x-auto scrollbar-hide sm:gap-4">
    {highlights.map((highlight, index) => (
      <div
        key={index}
        className="flex flex-col items-center flex-shrink-0 w-20 sm:w-24"
      >
        <div className="p-[1.5px] sm:p-[2px] rounded-full bg-gray-500">
          <div className="p-[3px] sm:p-[4px] rounded-full bg-white dark:bg-gray-900">
            <div
              className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-100 dark:bg-gray-800 cursor-pointer transition-transform duration-200 hover:scale-105 flex items-center justify-center ${
                selectedIndex === index ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={(e) => handleClick(index, e)}
            >
              {highlight.icon}
            </div>
          </div>
        </div>
        <span className="text-[10px] sm:text-xs mt-2 text-center whitespace-normal font-medium text-gray-700 dark:text-gray-200">
          {highlight.title}
        </span>
      </div>
    ))}
  </div>

  {selectedIndex !== null && (
    <div
      ref={menuRef}
      className="fixed z-50 rounded-lg p-4 w-[90vw] sm:w-[600px] backdrop-blur-md bg-white/30 dark:bg-gray-800/30 border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]"
      style={{
        top: position.y + "px",
        left: position.x + "px",
        animation: "scaleIn 0.2s ease-out",
      }}
    >
      <div className="px-4 sm:px-6 py-3 sm:py-4">
        <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
          {highlights[selectedIndex].title}
        </h3>
        <div className="text-sm sm:text-base leading-relaxed text-gray-600 dark:text-gray-300">
          {highlights[selectedIndex].text}
        </div>
      </div>
    </div>
  )}
</div>

  );
};

export default FloatingHighlights;
