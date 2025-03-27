import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProjectModal = ({ project, onClose, isMobile }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

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
      } bg-white dark:bg-gray-900 max-w-5xl mx-auto flex flex-col md:flex-row`}
    >
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

      <div className="w-full md:w-96 flex flex-col">
        <div className="p-4 border-b dark:border-gray-700 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img
              src={project.authorAvatar || "/default-avatar.png"}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-medium">{project.author}</span>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
          <p className="text-gray-600 dark:text-gray-300">
            {project.description}
          </p>
        </div>

        <div className="p-4 border-t dark:border-gray-700">
          <div className="flex justify-between mb-4">
            <div className="flex gap-4">
              <button onClick={() => setIsLiked(!isLiked)}>
                <svg
                  className={`w-7 h-7 ${
                    isLiked ? "text-red-500 fill-current" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
              <button onClick={() => setIsSaved(!isSaved)}>
                <svg
                  className={`w-7 h-7 ${isSaved ? "fill-current" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="mb-4">
            <p className="font-medium">{project.likes} likes</p>
            <p className="text-gray-500 text-xs">{project.timestamp}</p>
          </div>
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
