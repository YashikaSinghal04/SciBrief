import React from "react";
import Navbar from "../components/Navbar";
import Summarizer from "../components/Summarizer";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";

export default function SummarizerPage() {
  const theme = useSelector((s) => s.theme.mode);
  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-[#0D0D0D]" : "bg-white"}`}>
      <Navbar />
      <Summarizer />
      <Footer />
    </div>
  );
}


