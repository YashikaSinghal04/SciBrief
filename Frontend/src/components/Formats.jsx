import React from "react";

const items = [
  {
    title: "Summarize PDFs",
    src: "https://cdn.prod.website-files.com/65388e98a52fc34922751f84/65819950c08e74d9d1c1abb2_sum__pdf.svg",
  },
  {
    title: "Summarize Book Chapters",
    src: "https://cdn.prod.website-files.com/65388e98a52fc34922751f84/65819950812aecb91794897a_sum__book.svg",
  },
  {
    title: "Summarize Online Articles",
    src: "https://cdn.prod.website-files.com/65388e98a52fc34922751f84/658199509785bbd755335279_sum__article.svg",
  },
  {
    title: "Summarize Research Papers",
    src: "https://cdn.prod.website-files.com/65388e98a52fc34922751f84/65819951cbb281fab867b608_sum__research.svg",
  },
  {
    title: "Summarize Plain Text",
    src: "https://cdn.prod.website-files.com/65388e98a52fc34922751f84/658199515959ecd76e424128_sum__text.svg",
  },
];

export default function Formats() {
  return (
    <section className="w-full py-16 bg-purple-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-purple-900 text-center mb-10">
          Summarize texts in any format
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {items.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center gap-3 rounded-2xl bg-white/90 p-6 shadow-sm"
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-20 h-20 select-none"
                loading="lazy"
              />
              <p className="text-center text-sm font-medium text-gray-800">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


