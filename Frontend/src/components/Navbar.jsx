import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../store/themeSlice";
import { clearUser } from "../store/authSlice";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Navbar() {
  const theme = useSelector((s) => s.theme.mode);
  const user = useSelector((s) => s.auth.user);
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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
        <div className="h-16 flex items-center justify-between gap-4">
          {/* Left: Logo */}
          <div className="flex items-center gap-2">
            <span className="text-3xl font-extrabold text-white">&lt;/&gt;</span>
            <span className="text-2xl font-bold text-white">SciBrief</span>
          </div>

          {/* Right: Links + actions */}
          <div className="flex items-center gap-4">
            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-6">
              <a href="#" className="text-white/95 hover:text-purple-200 transition-colors">Home</a>
              <a href="#" className="text-white/95 hover:text-purple-200 transition-colors">About</a>
              <a href="#" className="text-white/95 hover:text-purple-200 transition-colors">Summarizer</a>
            </div>

            {/* Theme toggle */}
            <button
              aria-label="Toggle theme"
              onClick={handleToggle}
              className="text-white hover:text-purple-200 transition-colors inline-flex items-center justify-center"
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

            {/* User / Login */}
            {user ? (
              <div className="relative flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 text-white text-sm font-semibold grid place-items-center transform transition-transform hover:scale-105 shadow-sm">
                  {(user.displayName || user.email || "U").charAt(0).toUpperCase()}
                </div>
                <button aria-label="Menu" onClick={() => setMenuOpen((v) => !v)} className="text-white hover:text-purple-200 leading-none">⋮</button>
                {menuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-36 bg-white text-gray-800 rounded-md shadow-lg overflow-hidden">
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={async () => {
                        try { await signOut(auth); } catch {}
                        dispatch(clearUser());
                        setMenuOpen(false);
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <a href="#/login" className="hidden sm:inline-block bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold px-5 py-2 rounded-lg transition-colors">Login</a>
            )}

            {/* Hamburger */}
            <button className="md:hidden text-white" aria-label="Open menu" onClick={() => setMobileOpen((v)=>!v)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden py-3 border-t border-white/20">
            <div className="flex flex-col gap-2">
              <a href="#" className="text-white/95 hover:text-purple-200">Home</a>
              <a href="#" className="text-white/95 hover:text-purple-200">About</a>
              <a href="#" className="text-white/95 hover:text-purple-200">Summarizer</a>
              {!user && (
                <a href="#/login" className="mt-2 inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold px-4 py-2 rounded-lg">Login</a>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
