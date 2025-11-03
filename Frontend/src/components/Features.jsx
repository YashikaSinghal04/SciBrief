import React from "react";

function FeatureCard({ title, description, icon }) {
  return (
    <div className="rounded-2xl bg-white/90 p-6 sm:p-8 shadow-sm">
      <div className="mb-6">{icon}</div>
      <h3 className="text-2xl font-semibold text-purple-900 mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}

export default function Features() {
  return (
    <section className="w-full py-16 sm:py-20 bg-purple-100/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-purple-900">
            Summarize, analyze, and organize your research in one place.
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            Features built for scholars like you, trusted by researchers and students around the world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            title="Any format"
            description="Summarize papers, PDFs, book chapters, online articles and more."
            icon={
              <img
                src="https://cdn.prod.website-files.com/65388e98a52fc34922751f84/6582dc3183f62d1da3442305_any__format.svg"
                alt="Any format"
                className="w-20 h-20 select-none"
                loading="lazy"
              />
            }
          />

          <FeatureCard
            title="Easy import"
            description="Drag & drop files, paste a link or a block of text, or use our browser extension."
            icon={
              <img
                src="https://cdn.prod.website-files.com/65388e98a52fc34922751f84/6582dc312f1b63cd728f64f9_easy__import.svg"
                alt="Easy import"
                className="w-20 h-20 select-none"
                loading="lazy"
              />
            }
          />

          <FeatureCard
            title="Enhanced summary"
            description="Choose the summary style that matches your reading: bullet list, one‑liner and more."
            icon={
              <img
                src="https://cdn.prod.website-files.com/65388e98a52fc34922751f84/657c0e8d8fb664912af1c311_summarise__icn.svg"
                alt="Enhanced summary"
                className="w-20 h-20 select-none"
                loading="lazy"
              />
            }
          />

          <FeatureCard
            title="Snapshot"
            description="Read the key points of a paper in seconds with confidence that everything you read comes from the original text."
            icon={
              <img
                src="https://cdn.prod.website-files.com/65388e98a52fc34922751f84/6582dc3140f14c8fef1bc2b3_sportlight.svg"
                alt="Snapshot"
                className="w-20 h-20 select-none"
                loading="lazy"
              />
            }
          />

          <FeatureCard
            title="Clean reading"
            description="Clutter‑free flashcards help you skim or dive deeper into the details and quickly jump between sections."
            icon={
              <img
                src="https://cdn.prod.website-files.com/65388e98a52fc34922751f84/6582dc31b69c5d11268fad6f_snapshot-1.svg"
                alt="Clean reading"
                className="w-20 h-20 select-none"
                loading="lazy"
              />
            }
          />

          <FeatureCard
            title="Spotlight"
            description="Highlighted key terms and findings. Let evidence‑based statements guide you through the full text with confidence."
            icon={
              <img
                src="https://cdn.prod.website-files.com/65388e98a52fc34922751f84/6582dc31ee02ab57241ff817_snapshot.svg"
                alt="Spotlight"
                className="w-20 h-20 select-none"
                loading="lazy"
              />
            }
          />
        </div>
      </div>
    </section>
  );
}


