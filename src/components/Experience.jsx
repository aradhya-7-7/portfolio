import React from 'react';

const Experience = ({ experiences }) => {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="relative">
        {experiences.map((exp, index) => (
          <div key={exp.id} className="mb-8 flex">
            <div className="flex-shrink-0 w-12">
              <div className="w-4 h-4 rounded-full bg-gray-900 dark:bg-white mx-auto"></div>
              {index !== experiences.length - 1 && (
                <div className="w-0.5 h-full bg-gray-300 dark:bg-gray-700 mx-auto mt-2"></div>
              )}
            </div>
            <div className="flex-grow pl-4">
              <h3 className="font-bold dark:text-white">{exp.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{exp.company}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{exp.duration}</p>
              <ul className="mt-2 text-gray-600 dark:text-gray-300 list-disc list-inside">
                {exp.description.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
