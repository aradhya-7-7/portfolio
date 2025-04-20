import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BlogModal = ({ blog, onClose, isMobile }) => {
  const [comment, setComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const modalContent = (
    <div
      className={`${
        isMobile ? "fixed inset-0" : "relative"
      } bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 max-w-4xl mx-auto rounded-xl shadow-lg overflow-hidden flex flex-col`}
    >
      {/* Header */}
      <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">{blog.title}</h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">{blog.timestamp}</span>
        <button
          onClick={onClose}
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-2xl"
        >
          &times; {/* Cross icon */}
        </button>
      </div>

      {/* Content */}
      <div className="p-6 overflow-y-auto flex-1 space-y-6">
        <div>
          <p className="text-base leading-relaxed">{blog.content}</p>
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
        className={`fixed inset-0 z-50 ${isMobile ? "" : "bg-black/70"} flex items-center justify-center`}
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

export default BlogModal;
