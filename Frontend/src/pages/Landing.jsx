import React from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import Formats from "../components/Formats";
import Footer from "../components/Footer";

export default function Landing() {
  const theme = useSelector((s) => s.theme.mode);
  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
      <Navbar />
      <HeroSection />
      <Features />
      <Formats />
      <Footer />
    </div>
  );
}
