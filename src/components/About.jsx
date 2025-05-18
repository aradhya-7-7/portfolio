import React from "react";

const About = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="space-y-8">
        {/* Summary */}
        <div>
          <h3 className="text-xl font-semibold mb-2 dark:text-white">
            🚀 Summary
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            🚀 Software Engineer | Mechanical Engineer turned Web Wrangler 🔧 | Proficient in React.js, Node.js, JS ⚙️ | Bridging the gap between machines & machines-that-run-JavaScript 🤖 | 📚 Debugging life one line at a time — always learning, occasionally caffeinated! ☕
          </p>
        </div>

        {/* Education */}
        <div >
          <h3 className="text-xl font-semibold mb-4 dark:text-white">
            🎓 Education
          </h3>
          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="font-medium text-lg">
                🏛️ Madan Mohan Malaviya University of Technology, Gorakhpur
              </p>
              <p className="text-sm">
                🎓 Bachelor of Technology | Mechanical Engineering ⚙️
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                08/2020 – 07/2024
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <p className="font-medium text-lg">
                🏫 Modern Academy Inter College, Lucknow
              </p>
              <p className="text-sm">📖 Intermediate</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                04/2017 – 04/2019
              </p>
              <p className="text-sm">📘 High School</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                04/2015 – 04/2017
              </p>
            </div>
          </div>
        </div>

        {/* Leadership */}
        <div>
          <h3 className="text-xl font-semibold mb-2 dark:text-white">
            🏆 Positions of Responsibility
          </h3>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
            <li>👨‍💻 Full Stack Developer Intern - AIDEOA</li>
            <li>
              🎯 Co-Head of Digital Sub-Council at SAE Collegiate Club, MMMUT
              Chapter
            </li>
            <li>
              📢 Executive Member at Council at SAE Collegiate Club, MMMUT
              Chapter
            </li>
            <li>🛠️ Junior Member at SAE Collegiate Club, MMMUT Chapter</li>
            <li>🚗 Design Section Head at Raptor 4.0, SAE-mBAJA 2022</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
