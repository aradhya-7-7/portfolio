import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProjectModal = ({ project, onClose, isMobile }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const modalContent = (
    <div
      className={`${
        isMobile ? "fixed inset-0" : "relative"
      } bg-white dark:bg-gray-900 max-w-5xl mx-auto flex flex-col md:flex-row rounded-lg overflow-hidden`}
    >
      {/* Left Image Section */}
      <div className="relative flex-1">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/50 hover:bg-white/70 rounded-full p-2 transition-all duration-200 transform hover:scale-105"
        >
          <svg
            className="w-6 h-6 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <img
          src={project?.thumbnail || "/default-thumbnail.jpeg"}
          alt={project?.title || "Project thumbnail"}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Info Panel */}
      <div className="w-full md:w-96 flex flex-col">
        <div className="p-4 border-b dark:border-gray-700">
          <h3 className="text-2xl font-semibold mb-1">{project.title}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {project.description}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">

          {/* Technologies */}
          {project.technologies?.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold mb-1">Technologies:</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-xs rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Likes */}
          

          {/* Links */}
          <div className="space-x-4">
            {project.links?.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
              >
                🔗 Live Demo
              </a>
            )}
            {project.links?.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
              >
                💻 GitHub
              </a>
            )}
          </div>
        </div>

        {/* Optional Footer */}
        <div className="p-4 border-t dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
          Press ESC to close
        </div>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={isMobile ? "w-full h-full" : "max-h-[90vh] w-[90vw]"}
        >
          {modalContent}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;
