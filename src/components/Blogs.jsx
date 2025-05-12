import React, { useState } from "react";
import BlogModal from "./BlogModal.jsx";
import { useMediaQuery } from "react-responsive";

const Blogs = ({ blogs }) => {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
    if (isMobile) {
      document.body.style.overflow = "hidden";
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            onClick={() => handleBlogClick(blog)}
            className="cursor-pointer p-4 rounded-xl border border-blue-500 dark:border-blue-400 transition-all duration-300 shadow-md hover:shadow-[0_0_15px_#1877f2] bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
              {blog.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 line-clamp-4">
              {blog.description}
            </p>
          </div>
        ))}
      </div>

      {selectedBlog && (
        <BlogModal
          blog={selectedBlog}
          onClose={() => {
            setSelectedBlog(null);
            document.body.style.overflow = "auto";
          }}
          isMobile={isMobile}
        />
      )}
    </>
  );
};

export default Blogs;
