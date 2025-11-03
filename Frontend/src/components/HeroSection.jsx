import React from "react";

export default function HeroSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="bg-purple-100 rounded-3xl px-8 py-16 sm:px-16 sm:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-purple-900 dark:text-white mb-8 leading-tight">
            Extract key information from research papers with our AI summarizer.
          </h1>

          <div className="space-y-4 text-lg sm:text-xl text-gray-700 dark:text-gray-200 mb-10">
            <p>
              Get a snapshot of what matters – <span className="italic">fast</span>.
            </p>
            <p>Break down complex concepts into easy-to-read sections.</p>
            <p>Skim or dive deep with a clean reading experience.</p>
          </div>

          <a href="#/summarizer" className="inline-block rounded-full px-5 py-2 font-semibold text-white text-sm bg-gradient-to-r from-purple-500/60 via-fuchsia-500/50 to-pink-500/60 backdrop-blur-md bg-opacity-40 border border-white/30 shadow-lg hover:scale-105 hover:shadow-xl hover:from-purple-600 hover:to-fuchsia-600 transition-all duration-300">
            Go to summarizer
          </a>
        </div>
      </div>
    </div>
  );
}
