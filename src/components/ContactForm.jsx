import { useState, useContext } from "react";
import emailjs from "emailjs-com";
import { ThemeContext } from "../context/ThemeContext";

const ContactForm = ({ onClose }) => {
  const { darkMode } = useContext(ThemeContext);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .send(
        "service_xahjxka",
        "template_tsema5i",
        formData,
        "w9fTIM19r2oHHbZvv"
      )
      .then(() => {
        alert("Message Sent Successfully!");
        onClose();
      })
      .catch((error) => {
        console.error("Email sending error:", error);
        alert("Failed to send message.");
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30">
      <div
        className={`w-full max-w-md p-8 rounded-2xl backdrop-blur-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] transition-all duration-300
        ${
          darkMode
            ? "bg-gray-800/20 text-white border border-gray-700/30"
            : "bg-white/20 text-gray-900 border border-white/30"
        }`}
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Contact Me</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className={`p-3 rounded-lg focus:outline-none focus:ring-2 transition
            ${
              darkMode
                ? "bg-gray-700/30 border border-gray-600/30 focus:ring-blue-500/50 placeholder-gray-400"
                : "bg-white/30 border border-white/30 focus:ring-blue-600/50 placeholder-gray-500"
            }`}
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className={`p-3 rounded-lg focus:outline-none focus:ring-2 transition
            ${
              darkMode
                ? "bg-gray-700/30 border border-gray-600/30 focus:ring-blue-500/50 placeholder-gray-400"
                : "bg-white/30 border border-white/30 focus:ring-blue-600/50 placeholder-gray-500"
            }`}
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="4"
            className={`p-3 rounded-lg focus:outline-none focus:ring-2 transition
            ${
              darkMode
                ? "bg-gray-700/30 border border-gray-600/30 focus:ring-blue-500/50 placeholder-gray-400"
                : "bg-white/30 border border-white/30 focus:ring-blue-600/50 placeholder-gray-500"
            }`}
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="bg-blue-600/80 hover:bg-blue-700/90 text-white p-3 rounded-lg transition font-semibold shadow-lg hover:shadow-blue-500/25 w-3/4 mx-auto
"
          >
            Send Message
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-6 w-full text-center text-red-500 hover:text-red-600 font-semibold transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ContactForm;
