import React from "react";

const websiteName = "SciBrief";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Article Summarizer", href: "#" },
      { label: "Features", href: "#features" },
      { label: `Who is ${websiteName} for?`, href: "#" },
      { label: "Browser Extensions", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Sign Up", href: "#" },
      { label: "Login", href: "#" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "Blog", href: "#" },
      { label: "Quickstart Guide", href: "#" },
      { label: "Video Tutorials", href: "#" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "User Guide", href: "#" },
      { label: "FAQs", href: "#" },
      { label: "Contact Support", href: "#" },
      { label: "System Status", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Cookies Policy", href: "#" },
      { label: "Security", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "API Terms of Service", href: "#" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="text-white" style={{ backgroundColor: "#48267C" }}>
      {/* Link columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/15 pt-8">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-base font-semibold mb-3">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-white/75 hover:text-yellow-300 hover:underline transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="border-t border-white/15 pt-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Left: logo + socials */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold text-white">&lt;/&gt;</span>
                <span className="text-2xl font-semibold">{websiteName}</span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Twitter"
                >
                  <img
                    src="https://cdn.prod.website-files.com/65388e98a52fc34922751f84/6539e382dd8a234f6c48c6a7_icn__tw.svg"
                    alt="Twitter icon"
                    className="w-6 h-6"
                    loading="lazy"
                  />
                </a>
                <a
                  href="https://www.youtube.com/channel/UCAYldMMz6_2ZKoGL12Ughdg"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                >
                  <img
                    src="https://cdn.prod.website-files.com/65388e98a52fc34922751f84/6539e382dd8a234f6c48c6a6_icn__yt.svg"
                    alt="YouTube icon"
                    className="w-6 h-6"
                    loading="lazy"
                  />
                </a>
                <a
                  href="https://www.facebook.com/scholarcy"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                >
                  <img
                    src="https://cdn.prod.website-files.com/65388e98a52fc34922751f84/6539e382dd8a234f6c48c6a4_icn__fb.svg"
                    alt="Facebook icon"
                    className="w-6 h-6"
                    loading="lazy"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/company/scholarcy"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <img
                    src="https://cdn.prod.website-files.com/65388e98a52fc34922751f84/6539e382dd8a234f6c48c6a5_icn__li.svg"
                    alt="LinkedIn icon"
                    className="w-6 h-6"
                    loading="lazy"
                  />
                </a>
              </div>
            </div>

            {/* Center: notices */}
            <div className="text-white/80 text-xs sm:text-sm max-w-2xl text-center md:text-left">
              <p>
                Notion and the Notion logo are trademarks of Notion Labs, Inc., and are used here with permission.
              </p>
              <p className="mt-2">
                Zotero is a registered trademark of the Corporation for Digital Scholarship.
              </p>
            </div>

            {/* Right: legal */}
            <div className="text-center md:text-right text-white/80 text-xs sm:text-sm">
              <p>© {year} {websiteName}. All Rights Reserved.</p>
              <p>Registered in England & Wales.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


