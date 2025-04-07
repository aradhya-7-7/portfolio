import React from 'react';

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
  const randomQuote = devQuotes[Math.floor(Math.random() * devQuotes.length)];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-green-500 font-mono">
      <div className="w-64 h-64 relative">
        {/* Terminal Window */}
        <div className="absolute inset-0 border-2 border-green-500 rounded-lg p-4">
          <div className="flex gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          
          {/* Loading Animation */}
          <div className="h-full flex flex-col justify-center items-center">
            <div className="text-center mb-4">
              <span className="inline-block animate-pulse">&gt;</span>
              <span className="typing-animation ml-2">{randomQuote}</span>
            </div>
            
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-green-500 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.2}s` }}
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
    </div>
  );
};

export default Loader;
