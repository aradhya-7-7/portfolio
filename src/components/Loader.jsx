import React, { useEffect, useState } from 'react';

const devQuotes = [
  "Turning coffee into code...",
  "Debugging the matrix...",
  "npm installing your patience...",
  "git commit -m 'Loading awesome stuff'",
  "while(loading) { drink_coffee(); }",
  "404: Loading screen not found... JK!",
  "Converting caffeine to code...",
  "sudo load --faster",
  "const life = new Promise((resolve, reject) => {...})",
  "// TODO: Add better loading messages"
];

const Loader = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const selectedQuote = devQuotes[Math.floor(Math.random() * devQuotes.length)];
    setQuote(selectedQuote);
    let index = 0;

    const typeInterval = setInterval(() => {
      if (index <= selectedQuote.length) {
        setDisplayedText(selectedQuote.slice(0, index));
        index++;
      } else {
        clearInterval(typeInterval);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-green-500 font-mono">
      <div className="w-64 h-64 relative">
        {/* Terminal Window */}
        <div className="absolute inset-0 border-2 border-green-500 rounded-lg p-4 shadow-lg shadow-green-800/30">
          <div className="flex gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>

          {/* Typing Animation */}
          <div className="h-full flex flex-col justify-center items-center">
            <div className="text-center mb-4 flex">
              <span className="inline-block animate-pulse">&gt;</span>
              <span className="ml-2">{displayedText}</span>
              <span className="w-1.5 h-5 bg-green-500 animate-blink ml-1"></span>
            </div>

            {/* Bounce Dots */}
            <div className="flex gap-1 mt-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-2.5 h-2.5 bg-green-400 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-sm text-green-400">
        <span className="animate-pulse">{'</'}</span>
        <span className="mx-1">loading</span>
        <span className="animate-pulse">{'>'}</span>
      </div>

      {/* Extra Glow Effect */}
      <div className="absolute bottom-8 text-xs text-green-700 animate-pulse">
        // powered by caffeine ☕
      </div>

      {/* Custom blink animation */}
      <style>{`
        @keyframes blink {
          0%, 50%, 100% { opacity: 1; }
          25%, 75% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-start infinite;
        }
      `}</style>
    </div>
  );
};

export default Loader;
