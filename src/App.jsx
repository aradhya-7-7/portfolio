import { ThemeProvider } from "./context/ThemeContext";
import { useState, useEffect } from "react";
import Profile from "./components/Profile";
import EasterEgg from "./components/EasterEgg";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import { Toaster } from "react-hot-toast";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider>
        <Toaster position="top-center" />
        {loading ? (
          <Loader />
        ) : (
          <div className="min-h-screen flex flex-col">
            <Profile />
            <EasterEgg />
            <Footer style={{ zIndex: -50 }} />

          </div>
        )}
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
