import { useEffect, useState, useContext } from 'react';
import '../styles/easter-egg.css';
import toast from 'react-hot-toast';
import { ThemeContext } from '../context/ThemeContext';

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];

import {
  SiJavascript,
  SiPython,
  SiCplusplus,
  SiGo,
  SiTypescript,
  SiPhp,
  SiHtml5,
  SiCss3,
  SiRust,
  SiSwift,
} from 'react-icons/si';

const symbols = [
  <SiJavascript className="text-green-500 w-6 h-6" />,
  <SiPython className="text-green-500 w-6 h-6" />,
  <SiCplusplus className="text-green-500 w-6 h-6" />,
  <img src="/logos/java-outline.svg" alt="Java" className="h-6 w-6 text-green-500" />,
  <SiGo className="text-green-500 w-6 h-6" />,
  <SiTypescript className="text-green-500 w-6 h-6" />,
  <SiPhp className="text-green-500 w-6 h-6" />,
  <SiHtml5 className="text-green-500 w-6 h-6" />,
  <SiCss3 className="text-green-500 w-6 h-6" />,
  <SiRust className="text-green-500 w-6 h-6" />,
  <SiSwift className="text-green-500 w-6 h-6" />
];

const createRainDrop = () => ({
  id: Math.random(),
  x: Math.random() * window.innerWidth,
  y: -Math.random() * window.innerHeight,
  speed: 2 + Math.random() * 3,
  symbol: symbols[Math.floor(Math.random() * symbols.length)]
});

const EasterEgg = () => {
  const { darkMode } = useContext(ThemeContext);
  const [keySequence, setKeySequence] = useState([]);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [rain, setRain] = useState([]);

  useEffect(() => {
    const tetrisAudio = new Audio('/tetris-theme.mp3');
    tetrisAudio.volume = 0.5;

    const handleKeyPress = (event) => {
      const newSequence = [...keySequence, event.key];
      if (newSequence.length > KONAMI_CODE.length) {
        newSequence.shift();
      }
      setKeySequence(newSequence);

      if (newSequence.join('') === KONAMI_CODE.join('')) {
        setIsUnlocked(true);
        tetrisAudio.play();

        const initialRain = Array(100).fill(null).map(createRainDrop);
        setRain(initialRain);

        setTimeout(() => {
          toast.success(
            "Congratulations! You've unlocked Dev Mode. Just kidding, this site is always in Dev Mode! 🚀",
            {
              duration: 10000,
              style: {
                background: darkMode ? '#333' : '#fff',
                color: darkMode ? '#fff' : '#333',
              },
              icon: '🎮'
            }
          );
          setIsUnlocked(false);
          setRain([]);
          tetrisAudio.pause();
          tetrisAudio.currentTime = 0;
        }, 10000); // duration increased here too
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [keySequence]);

  useEffect(() => {
    if (!isUnlocked) return;

    const interval = setInterval(() => {
      setRain(prev =>
        prev.map(drop => ({
          ...drop,
          y: drop.y + drop.speed,
          symbol: Math.random() < 0.05 ? symbols[Math.floor(Math.random() * symbols.length)] : drop.symbol
        })).map(drop =>
          drop.y > window.innerHeight ? createRainDrop() : drop
        )
      );
    }, 50);

    return () => clearInterval(interval);
  }, [isUnlocked]);

  if (!isUnlocked) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Dark grayscale overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-90 grayscale" />

      {/* Matrix rain symbols */}
      {rain.map(drop => (
        <div
          key={drop.id}
          style={{
            position: 'absolute',
            left: `${drop.x}px`,
            top: `${drop.y}px`,
            color: '#00ff00',
            fontFamily: 'monospace',
            fontSize: '1rem',
            opacity: Math.random() * 0.8 + 0.2,
            userSelect: 'none',
            pointerEvents: 'none'
          }}
        >
          {drop.symbol}
        </div>
      ))}
    </div>
  );
};

export default EasterEgg;
