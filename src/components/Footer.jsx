import { useState } from 'react';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Footer = () => {
  const { darkMode } = useContext(ThemeContext);
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setClickCount(prev => prev + 1);
  };

  return (
    <footer 
      className={`
        ${darkMode ? 'bg-black text-gray-300' : 'bg-white text-gray-700'}
        py-3 mt-auto text-sm
      `}
    >
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col items-center gap-2">
          <div className="text-center">
            <p className="text-xs">Made with 🚀 by Your Name</p>
            <p 
  onClick={handleClick}
  className={`
    mt-1 cursor-pointer select-none transition-all duration-300 text-xs
    ${clickCount < 2 ? 'blur-sm' : 'blur-none'}
    hover:scale-105
    hidden sm:block
  `}
>
  Secret: Try pressing ↑ ↑ ↓ ↓ ← → ← →
</p>

          </div>
          
          <div className="flex gap-6">
            <a 
              href="https://github.com/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className="transform transition-all duration-300 hover:text-blue-500 hover:scale-110 hover:-translate-y-1"
            >
              GitHub
            </a>
            <a 
              href="https://linkedin.com/in/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className="transform transition-all duration-300 hover:text-blue-500 hover:scale-110 hover:-translate-y-1"
            >
              LinkedIn
            </a>
            <a 
              href="https://twitter.com/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className="transform transition-all duration-300 hover:text-blue-500 hover:scale-110 hover:-translate-y-1"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
