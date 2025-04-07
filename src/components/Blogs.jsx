import React, { useState } from 'react';
import BlogModal from './BlogModal.jsx';
import { useMediaQuery } from 'react-responsive';

const Blogs = ({ blogs }) => {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
    if (isMobile) {
      document.body.style.overflow = 'hidden';
    }
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-1 md:gap-4 p-4">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            onClick={() => handleBlogClick(blog)}
            className="relative group cursor-pointer"
          >
            <div className="aspect-[9/16] overflow-hidden">
              <img 
                src={blog.thumbnail} 
                alt={blog.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="text-white flex gap-8">
                  <div className="flex items-center gap-2">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    <span>{blog.likes}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 15a2 2 0 0 1-2 2h-2v2a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-2H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedBlog && (
        <BlogModal
          blog={selectedBlog}
          onClose={() => {
            setSelectedBlog(null);
            document.body.style.overflow = 'auto';
          }}
          isMobile={isMobile}
        />
      )}
    </>
  );
};

export default Blogs;