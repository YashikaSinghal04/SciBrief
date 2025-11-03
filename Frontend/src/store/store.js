import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});

// Apply initial theme class immediately
(() => {
  const mode = (typeof window !== "undefined" && localStorage.getItem("theme")) || store.getState().theme.mode;
  const root = document.documentElement;
  if (mode === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
})();

// Persist theme and update document class on changes
store.subscribe(() => {
  const mode = store.getState().theme.mode;
  try {
    localStorage.setItem("theme", mode);
  } catch {}
  const root = document.documentElement;
  if (mode === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
});


