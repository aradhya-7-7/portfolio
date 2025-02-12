import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BlogModal = ({ blog, onClose, isMobile }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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
      } bg-white dark:bg-gray-900 max-w-5xl mx-auto flex flex-col md:flex-row`}
    >
      {/* Image Section */}
      <div className="relative flex-1">
        <img
          src={blog.images?.[currentImageIndex] || blog.thumbnail}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        {blog.images?.length > 1 && (
          <>
            <button
              onClick={() =>
                setCurrentImageIndex((prev) => Math.max(0, prev - 1))
              }
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/50 rounded-full p-2"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() =>
                setCurrentImageIndex((prev) =>
                  Math.min(blog.images.length - 1, prev + 1)
                )
              }
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/50 rounded-full p-2"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Details Section */}
      <div className="w-full md:w-96 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b dark:border-gray-700 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img
              src={`https://picsum.photos/32/32?random=${blog.id}`}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-medium">{blog.author}</span>
        </div>

        {/* Comments Section */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-4">
            <span className="font-medium mr-2">{blog.author}</span>
            <span>{blog.content}</span>
          </div>
          {blog.comments?.map((comment, index) => (
            <div key={index} className="mb-2">
              <span className="font-medium mr-2">{comment.author}</span>
              <span>{comment.text}</span>
            </div>
          ))}
        </div>

        {/* Actions Section */}
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
              <button>
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </button>
              <button>
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
              </button>
            </div>
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

          <div className="mb-4">
            <p className="font-medium">{blog.likes} likes</p>
            <p className="text-gray-500 text-xs">{blog.timestamp}</p>
          </div>

          {/* Comment Input */}
          {/*  */}
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
        className={`fixed inset-0 z-50 ${
          isMobile ? "" : "bg-black/70"
        } flex items-center justify-center`}
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
