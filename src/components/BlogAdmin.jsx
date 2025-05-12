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
      <div className="relative min-h-screen bg-black text-white px-4 flex items-center justify-center">
        <CustomCursor />
        <form
          onSubmit={handleLogin}
          className="bg-white/10 border border-white/20 p-8 rounded-xl space-y-4 w-full max-w-sm backdrop-blur-md"
        >
          <h2 className="text-2xl font-bold text-center mb-4">
            🔐 Admin Login
          </h2>
          <input
            type="text"
            placeholder="ID"
            value={credentials.id}
            onChange={(e) =>
              setCredentials({ ...credentials, id: e.target.value })
            }
            className="w-full p-3 rounded bg-black text-white border border-cyan-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            className="w-full p-3 rounded bg-black text-white border border-cyan-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 text-black font-bold rounded-lg transition duration-200"
          >
            🔓 Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black text-white px-6 py-8">
      <CustomCursor />
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold text-white mb-6 border-b border-white/20 pb-2">
          📝 Blog Admin Panel
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 mb-10 bg-white/5 p-6 rounded-xl border border-white/20"
        >
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Title"
            className="w-full p-3 rounded bg-black text-white border border-cyan-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
          <div className="w-full">
            <DatePicker
              selected={form.date}
              onChange={(date) => setForm({ ...form, date })}
              className="w-full p-3 rounded bg-black text-white border border-cyan-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              dateFormat="yyyy-MM-dd"
              required
            />
          </div>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Description"
            className="w-full p-3 rounded bg-black text-white border border-cyan-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            rows={4}
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 text-black font-bold rounded-lg transition duration-200"
          >
            ➕ Add Blog
          </button>
        </form>
        <div className="space-y-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white/5 border border-white/20 p-5 rounded-xl shadow-md hover:shadow-cyan-500/30 transition duration-300"
            >
              <h3 className="text-xl font-bold text-cyan-400">{blog.title}</h3>
              <p className="text-sm text-gray-400 mb-1">{blog.date}</p>
              <p className="text-white">{blog.description}</p>
              <div className="flex gap-4 mt-3">
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="text-red-500 hover:text-red-300 font-semibold"
                >
                  ❌ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogAdmin;
