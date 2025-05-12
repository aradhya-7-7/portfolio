import { useEffect, useState } from "react";
import axios from "axios";
import CustomCursor from "./CustomCursor";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BlogAdmin = () => {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: new Date()
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ id: "", password: "" });
  const correctID = "admin";
  const correctPassword = "12345"; // Change this to your desired password

  const fetchBlogs = () => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/blogs`)
      .then((res) => setBlogs(res.data))
      .catch((err) => {
        console.error("Failed to fetch blogs:", err);
        alert("Error: Could not load blogs");
      });
  };

  useEffect(() => {
    if (localStorage.getItem("blogAdminAuth") === "true") {
      setIsAuthenticated(true);
      fetchBlogs();
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      credentials.id === correctID &&
      credentials.password === correctPassword
    ) {
      localStorage.setItem("blogAdminAuth", "true");
      setIsAuthenticated(true);
      fetchBlogs();
    } else {
      alert("Incorrect ID or password");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Format the date to YYYY-MM-DD before sending to the server
    const formattedDate = form.date.toISOString().split('T')[0];
    const formData = {
      ...form,
      date: formattedDate
    };
    
    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}/api/blogs`, formData)
      .then(() => {
        setForm({ title: "", description: "", date: new Date() });
        fetchBlogs();
      })
      .catch((err) => {
        console.error("Failed to create blog:", err);
        alert("Error: Could not create blog");
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`${import.meta.env.VITE_API_BASE_URL}/api/blogs/${id}`)
      .then(() => {
        fetchBlogs();
      })
      .catch((err) => {
        console.error("Failed to delete blog:", err);
        alert("Error: Could not delete blog");
      });
  };

  if (!isAuthenticated) {
    return (
      <div className="relative min-h-screen bg-white text-gray-800 p-4 flex items-center justify-center">
        <CustomCursor />
        <form
          onSubmit={handleLogin}
          className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm border border-gray-200"
        >
          <h2 className="text-2xl font-medium mb-6 text-center text-gray-900">Admin Login</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="ID"
              value={credentials.id}
              onChange={(e) =>
                setCredentials({ ...credentials, id: e.target.value })
              }
              className="w-full p-3 rounded-md bg-gray-100 text-gray-900 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500 transition-all"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              className="w-full p-3 rounded-md bg-gray-100 text-gray-900 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500 transition-all"
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-md transition duration-200"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-50 text-gray-800 px-4 py-8 md:px-6">
      <CustomCursor />
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-medium text-gray-900">Blog Admin</h2>
          {/* <button
            onClick={() => {
              localStorage.removeItem("blogAdminAuth");
              setIsAuthenticated(false);
            }}
            className="text-sm text-gray-500 hover:text-pink-500 transition-colors"
          >
            Logout
          </button> */}
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 mb-10 bg-white p-5 rounded-lg border border-gray-200 shadow-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Title"
              className="p-3 rounded-md bg-gray-100 text-gray-900 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500 transition-all"
              required
            />
            <DatePicker
              selected={form.date}
              onChange={(date) => setForm({ ...form, date })}
              className="p-3 rounded-md bg-gray-100 text-gray-900 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500 transition-all w-full"
              dateFormat="yyyy-MM-dd"
              required
            />
          </div>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Description"
            className="w-full p-3 rounded-md bg-gray-100 text-gray-900 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500 transition-all"
            rows={4}
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-md transition duration-200"
          >
            Add New Blog
          </button>
        </form>
        <div className="grid grid-cols-1 gap-4">
          {blogs.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No blog posts yet</p>
          ) : (
            blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white border border-gray-200 p-4 rounded-lg hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{blog.title}</h3>
                    <p className="text-xs text-gray-500 mb-2">{blog.date}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="text-gray-400 hover:text-pink-500 transition-colors"
                    aria-label="Delete blog post"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
                <p className="text-gray-700 text-sm mt-1">{blog.description}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogAdmin;
