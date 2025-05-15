import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BlogModal = ({ blog, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

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
          className="w-[90vw] max-w-3xl max-h-[90vh] bg-white/10 dark:bg-black/30 backdrop-blur-md text-white border border-white/20 rounded-2xl shadow-lg flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 border-b border-white/20 flex justify-between items-center">
            <h2 className="text-xl font-bold">{blog.title}</h2>
            <span className="text-sm text-gray-300">{blog.date}</span>
            <button
              onClick={onClose}
              className="text-white hover:text-red-400 text-2xl font-bold"
            >
              &times;
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            <p className="text-base leading-relaxed text-gray-200">
              {blog.description}
            </p>
            {/* 
            {blog.url && (
              <a
                href={blog.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-sm px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
              >
                Visit Blog
              </a>
            )} 
            */}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BlogModal;
