import { ThemeProvider } from "./context/ThemeContext";
import { useState, useEffect } from "react";
import Profile from "./components/Profile";
import EasterEgg from "./components/EasterEgg";
import Footer from "./components/Footer";
import BlogAdmin from "./components/BlogAdmin";
import Loader from "./components/Loader";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  // Add this to your existing state variable

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
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Profile />
                    <EasterEgg />
                    <Footer style={{ zIndex: -50 }} />
                  </>
                }
              />
              <Route path="/admin/blogs" element={<BlogAdmin />} />
            </Routes>
          </div>
        )}
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
