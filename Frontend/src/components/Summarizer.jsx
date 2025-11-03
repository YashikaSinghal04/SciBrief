import React, { useCallback, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth";
import JSZip from "jszip";
import { createWorker } from "tesseract.js";

// Configure pdfjs worker (served from unpkg CDN fallback)
pdfjsLib.GlobalWorkerOptions.workerSrc =
  pdfjsLib.GlobalWorkerOptions.workerSrc ||
  `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;

function summarizeText(text) {
  const sentences = text
    .replace(/\s+/g, " ")
    .match(/[^.!?]+[.!?]/g) || [text];
  const words = text.toLowerCase().match(/[a-zA-Z']+/g) || [];
  const stop = new Set([
    "the","is","at","which","on","and","a","an","in","of","to","for","with","that","by","as","it","from","this","be","are","was","were","or"
  ]);
  const freq = new Map();
  for (const w of words) {
    if (stop.has(w)) continue;
    freq.set(w, (freq.get(w) || 0) + 1);
  }
  const scored = sentences.map((s) => {
    const sw = s.toLowerCase().match(/[a-zA-Z']+/g) || [];
    const score = sw.reduce((acc, w) => acc + (freq.get(w) || 0), 0) / (sw.length || 1);
    return { s: s.trim(), score };
  });
  scored.sort((a, b) => b.score - a.score);
  const top = scored.slice(0, Math.max(3, Math.ceil(scored.length * 0.2)));
  top.sort((a, b) => sentences.indexOf(a.s + (a.s.match(/[.!?]$/) ? "" : ".")) - sentences.indexOf(b.s + (b.s.match(/[.!?]$/) ? "" : ".")));
  return top.map((t) => t.s).join(" ");
}

export default function Summarizer() {
  const [active, setActive] = useState("text");
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);

  const tabs = useMemo(
    () => [
      { key: "text", label: "Text" },
      { key: "pdf", label: "PDF", accept: ".pdf" },
      { key: "pptx", label: "PowerPoint", accept: ".pptx" },
      { key: "image", label: "Image", accept: "image/*" },
      { key: "docx", label: "Word", accept: ".docx" },
    ],
    []
  );

  const handleChooseFile = () => {
    if (!fileRef.current) return;
    fileRef.current.value = "";
    fileRef.current.click();
  };

  const extractFromPdf = useCallback(async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map((i) => (i.str ? i.str : "")).join(" ");
      text += pageText + "\n";
    }
    return text.trim();
  }, []);

  const extractFromDocx = useCallback(async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value || "";
  }, []);

  const extractFromPptx = useCallback(async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const zip = await JSZip.loadAsync(arrayBuffer);
    const slideFiles = Object.keys(zip.files)
      .filter((p) => p.startsWith("ppt/slides/slide") && p.endsWith(".xml"))
      .sort();
    let text = "";
    for (const p of slideFiles) {
      const xml = await zip.files[p].async("string");
      const matches = [...xml.matchAll(/<a:t>([\s\S]*?)<\/a:t>/g)].map((m) => m[1]);
      text += matches.join(" ") + "\n";
    }
    return text.trim();
  }, []);

  const extractFromImage = useCallback(async (file) => {
    const worker = await createWorker("eng");
    const { data } = await worker.recognize(file);
    await worker.terminate();
    return data.text || "";
  }, []);

  const processFile = async (file) => {
    if (!file) return;
    setLoading(true);
    setSummary("");
    try {
      let text = "";
      if (active === "pdf") text = await extractFromPdf(file);
      else if (active === "docx") text = await extractFromDocx(file);
      else if (active === "pptx") text = await extractFromPptx(file);
      else if (active === "image") text = await extractFromImage(file);
      setInputText(text);
    } catch (err) {
      console.error(err);
      alert("Failed to extract text from the selected file.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    await processFile(file);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer?.files?.[0];
    await processFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const onSummarize = () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setTimeout(() => {
      const s = summarizeText(inputText);
      setSummary(s);
      setLoading(false);
    }, 50);
  };

  const theme = useSelector((s) => s.theme.mode);
  return (
    <section id="summarizer" className={`${theme === "dark" ? "bg-[#0D0D0D] text-white" : "bg-white text-gray-900"}`}>
      <div className="min-h-screen flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-10">
            <h1 className={`text-4xl sm:text-5xl font-extrabold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Welcome to SciBrief!</h1>
            <p className={`mt-3 text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
              Get started by adding your first paper or paste your text below.
            </p>
          </div>

          {/* Outer gradient frame */}
          <div className="rounded-3xl p-1 bg-gradient-to-br from-purple-400 via-violet-400 to-indigo-400 shadow-xl">
            {/* Inner glass card */}
            <div className="rounded-3xl p-6 sm:p-8 bg-white/60 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
              {/* Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
                {tabs.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setActive(t.key)}
                    className={`${
                      active === t.key
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg scale-[1.02]"
                        : "bg-white/40 text-gray-800 backdrop-blur-md hover:bg-white/70"
                    } transition-all duration-200 px-4 sm:px-5 py-2 rounded-full font-semibold border border-white/40 w-full text-center`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Input area: show textarea for Text tab; else show drop zone */}
              {active === "text" ? (
                <div className="rounded-2xl overflow-hidden bg-white/80 border border-white/60">
                  <textarea
                    placeholder="Paste or type your article here..."
                    className="w-full h-64 sm:h-72 resize-y bg-white text-gray-900 placeholder-gray-500 outline-none p-5 sm:p-6 border-0"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  />
                </div>
              ) : (
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className="group rounded-2xl border-2 border-dashed border-white/60 bg-white/50 backdrop-blur-lg p-10 text-center transition-all hover:bg-white/70 min-h-48 flex items-center justify-center"
                >
                  <div className="flex flex-col items-center gap-4">
                    <button
                      onClick={handleChooseFile}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-md transition-colors border border-purple-500"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        <polyline points="7 10 12 5 17 10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></polyline>
                        <line x1="12" y1="5" x2="12" y2="19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></line>
                      </svg>
                      Upload File
                    </button>
                    <div className="flex items-center gap-2 text-gray-800">
                      <span className="text-indigo-700 font-semibold">Select</span>
                      <span className="text-gray-700">or Drop file here to Summarize</span>
                    </div>
                    <input
                      ref={fileRef}
                      type="file"
                      accept={tabs.find((t) => t.key === active)?.accept}
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-center">
                <button
                  onClick={onSummarize}
                  disabled={loading || !inputText.trim()}
                  className="px-8 py-3 sm:px-10 sm:py-3.5 rounded-full bg-white text-purple-700 font-semibold border border-purple-300 hover:border-purple-400 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Working..." : "Summarize"}
                </button>
              </div>

              {summary && (
                <div className="mt-6 bg-white/90 rounded-2xl p-5 text-gray-900 border border-white/60 shadow-sm">
                  <h3 className="text-lg font-semibold mb-2">Summary</h3>
                  <p className="leading-7 text-gray-800">{summary}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


