import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../store/authSlice";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function FloatingHeader() {
  const user = useSelector((s) => s.auth.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-xl mx-2 my-2">
        <div className="flex justify-between items-center px-6 py-3">
          {/* Left: Logo + Title */}
          <a href="#/" className="flex items-center gap-2">
            <span className="text-2xl font-extrabold text-[#00704A]">&lt;/&gt;</span>
            <span className="text-xl font-bold text-[#00704A]">sciBrief</span>
          </a>

          {/* Right: Auth action */}
          {user ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setOpen((v) => !v)}
                aria-label="User menu"
              className="w-10 h-10 rounded-full bg-gradient-to-r from-[#00704A]/70 via-[#1E3932]/60 to-[#00704A]/70 backdrop-blur-md border border-white/30 shadow-lg text-white font-semibold grid place-items-center transform transition-all hover:scale-105 hover:shadow-xl"
              >
                {(user.displayName || user.email || "U").charAt(0).toUpperCase()}
              </button>
              {open && (
                <div className="absolute right-0 mt-2 w-40 rounded-xl overflow-hidden animate-[fadeIn_150ms_ease-out]">
                  <a href="#/profile" className="block px-4 py-2 text-white text-sm bg-gradient-to-r from-[#00704A]/30 via-[#1E3932]/30 to-[#00704A]/30 backdrop-blur-md border border-white/30 transition-all">Profile</a>
                  <button
                    className="w-full text-left px-4 py-2 text-white text-sm bg-gradient-to-r from-[#00704A]/30 via-[#1E3932]/30 to-[#00704A]/30 backdrop-blur-md border-t border-white/30 transition-all"
                    onClick={async () => {
                      try { await signOut(auth); } catch {}
                      dispatch(clearUser());
                      setOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <a
              href="#/login"
              className="inline-flex items-center rounded-full px-5 py-2 font-semibold text-white text-sm bg-gradient-to-r from-[#00704A]/70 via-[#1E3932]/60 to-[#00704A]/70 backdrop-blur-md bg-opacity-40 border border-white/30 shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
            >
              Login
            </a>
          )}
        </div>
      </div>
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(-4px);} to {opacity: 1; transform: translateY(0);} }`}</style>
    </header>
  );
}


