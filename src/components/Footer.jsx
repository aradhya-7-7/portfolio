import { useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Footer = () => {
  const { darkMode } = useContext(ThemeContext);
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setClickCount((prev) => prev + 1);
  };

  return (
    <footer
      className={`
        ${darkMode ? "bg-black text-gray-300" : "bg-white text-gray-700"}
        border-t border-white/10 dark:border-white/20
        py-2 mt-auto text-xs font-mono backdrop-blur-md
        shadow-[0_-1px_6px_rgba(255,255,255,0.05)]
      `}
    >
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex flex-col items-center gap-1">
          <div className="text-center opacity-80 tracking-wide">
            <p
              onClick={handleClick}
              className={`
                cursor-pointer select-none transition-all duration-300
                ${clickCount < 2 ? "blur-sm" : "blur-none"}
                hover:scale-105 hidden sm:block
              `}
            >
              Secret: Try pressing ↑ ↑ ↓ ↓ ← → ← →
            </p>
          </div>

          <div className="flex gap-4 font-medium">
            <a
              href="https://github.com/aradhya-7-7"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-105 hover:uppercase transition-all duration-200"
            >
              github
            </a>
            <a
              href="https://www.linkedin.com/in/aradhya08oc01/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-105 hover:uppercase transition-all duration-200"
            >
              linkedin
            </a>
          </div>

          <p className="text-[10px] opacity-50 mt-1">
            &copy; {new Date().getFullYear()} Aradhya Srivastava
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
