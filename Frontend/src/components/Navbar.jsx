import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../store/themeSlice";

export default function Navbar() {
  const theme = useSelector((s) => s.theme.mode);
  const dispatch = useDispatch();
  const handleToggle = () => {
    const next = theme === "light" ? "dark" : "light";
    dispatch(setTheme(next));
    try { localStorage.setItem("theme", next); } catch {}
    const root = document.documentElement;
    if (next === "dark") root.classList.add("dark"); else root.classList.remove("dark");
  };
  return (
    <nav className="shadow-sm" style={{ backgroundColor: "#48267C" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo */}
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-extrabold text-white">&lt;/&gt;</span>
              <span className="text-2xl font-bold text-white">SciBrief</span>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex items-center space-x-6">
            <a href="#" className="text-white hover:text-yellow-300 font-medium">
              Home
            </a>
            <a href="#" className="text-white hover:text-yellow-300 font-medium">
              About
            </a>
            <a href="#" className="text-white hover:text-yellow-300 font-medium">
              Summarizer
            </a>
            <button
              aria-label="Toggle theme"
              onClick={handleToggle}
              className="text-white hover:text-purple-300 transition-colors"
              title="Toggle theme"
            >
              {theme === "dark" ? (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"></path>
                </svg>
              ) : (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.76 4.84l-1.8-1.79L3.17 4.84l1.79 1.79 1.8-1.79zM1 13h3v-2H1v2zm10 10h2v-3h-2v3zm9-10v-2h-3v2h3zm-3.59 7.76l1.79 1.79 1.79-1.79-1.79-1.79-1.79 1.79zM13 1h-2v3h2V1zm-6.24 15.4l-1.8 1.79 1.8 1.79 1.79-1.79-1.79-1.79zM12 8a4 4 0 100 8 4 4 0 000-8z"></path>
                </svg>
              )}
            </button>
            <a href="#/login" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold px-6 py-2 rounded-lg transition-colors">
              Login
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
