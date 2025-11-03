import { createSlice } from "@reduxjs/toolkit";

const initialTheme = (typeof window !== "undefined" && localStorage.getItem("theme")) || "light";

const themeSlice = createSlice({
  name: "theme",
  initialState: { mode: initialTheme },
  reducers: {
    setTheme(state, action) {
      state.mode = action.payload;
    },
    toggleTheme(state) {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;




