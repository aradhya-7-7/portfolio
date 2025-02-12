import { useEffect, useState, useContext } from 'react';
import '../styles/easter-egg.css';
import toast from 'react-hot-toast';
import { ThemeContext } from '../context/ThemeContext';

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];

const EasterEgg = () => {
  const { darkMode } = useContext(ThemeContext);
  const [keySequence, setKeySequence] = useState([]);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [characters, setCharacters] = useState([]);

  const createCharacter = () => ({
    id: Math.random(),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    type: ['pacman', 'invader', 'coin', 'block'][Math.floor(Math.random() * 4)],
    rotation: Math.random() * 360
  });

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
        
        // Create initial characters
        setCharacters(Array(10).fill(null).map(createCharacter));

        setTimeout(() => {
          toast.success(
            "Congratulations! You've unlocked Dev Mode. Just kidding, this site is always in Dev Mode! 🚀",
            {
              duration: 3000,
              style: {
                background: darkMode ? '#333' : '#fff',
                color: darkMode ? '#fff' : '#333',
              },
              icon: '🎮'
            }
          );
          setIsUnlocked(false);
          setCharacters([]);
          tetrisAudio.pause();
          tetrisAudio.currentTime = 0;
        }, 8000);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [keySequence]);

  useEffect(() => {
    if (!isUnlocked) return;

    const moveInterval = setInterval(() => {
      setCharacters(prev => prev.map(char => ({
        ...char,
        x: (char.x + (Math.random() * 100 - 50) + window.innerWidth) % window.innerWidth,
        y: (char.y + (Math.random() * 100 - 50) + window.innerHeight) % window.innerHeight,
        rotation: char.rotation + Math.random() * 20
      })));
    }, 100);

    return () => clearInterval(moveInterval);
  }, [isUnlocked]);

  if (!isUnlocked) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black bg-opacity-50">
      {characters.map(char => (
        <div
          key={char.id}
          className={`retro-character ${char.type}`}
          style={{
            left: `${char.x}px`,
            top: `${char.y}px`,
            transform: `rotate(${char.rotation}deg)`
          }}
        >
          {char.type === 'pacman' && <div className="pacman-eye" />}
        </div>
      ))}
    </div>
  );
};

export default EasterEgg;
