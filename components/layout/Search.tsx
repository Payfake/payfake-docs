"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search as SearchIcon,
  FileText,
  X,
  CornerDownLeft,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface SearchProps {
  isOpen?: boolean;
  onClose?: () => void;
}

interface SearchResult {
  title: string;
  href: string;
  excerpt: string;
}

export function Search({ isOpen = false, onClose }: SearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onClose?.();
      }
      if (e.key === "Escape" && isOpen) {
        onClose?.();
      }
      if (e.key === "ArrowDown" && isOpen && results.length > 0) {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % results.length);
      }
      if (e.key === "ArrowUp" && isOpen && results.length > 0) {
        e.preventDefault();
        setSelectedIndex(
          (prev) => (prev - 1 + results.length) % results.length,
        );
      }
      if (e.key === "Enter" && isOpen && results.length > 0) {
        e.preventDefault();
        handleSelect(results[selectedIndex].href);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [isOpen, onClose, results, selectedIndex]);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const search = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data);
        setSelectedIndex(0);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(search, 200);
    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (href: string) => {
    router.push(href);
    onClose?.();
    setQuery("");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 0 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 0 }}
          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-black border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center border-b border-white/10">
              <SearchIcon className="w-5 h-5 text-white/40 ml-5" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search documentation..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 px-4 py-5 text-lg bg-transparent text-white placeholder:text-white/40 outline-none"
                autoFocus
              />
              <button
                onClick={onClose}
                className="p-5 text-white/40 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[500px] overflow-y-auto">
              {isLoading && (
                <div className="p-12 text-center text-white/40 text-lg">
                  Searching...
                </div>
              )}

              {!isLoading && query && results.length === 0 && (
                <div className="p-12 text-center text-white/40 text-lg">
                  No results found for "{query}"
                </div>
              )}

              {!isLoading && results.length > 0 && (
                <div className="py-3">
                  {results.map((result, index) => (
                    <button
                      key={result.href}
                      onClick={() => handleSelect(result.href)}
                      className={`w-full px-5 py-4 text-left transition-colors group ${
                        index === selectedIndex
                          ? "bg-white/10"
                          : "hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <FileText className="w-5 h-5 text-white/40 mt-0.5 group-hover:text-white/60 transition-colors" />
                        <div className="flex-1">
                          <p className="text-base font-medium text-white group-hover:text-white transition-colors mb-1">
                            {result.title}
                          </p>
                          <p className="text-sm text-white/40 line-clamp-1">
                            {result.excerpt}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {!query && (
                <div className="p-6">
                  <p className="text-base text-white/40 mb-4">
                    Start typing to search the documentation...
                  </p>
                  <div className="flex items-center gap-6 text-sm text-white/30">
                    <div className="flex items-center gap-2">
                      <ArrowUp className="w-4 h-4" />
                      <ArrowDown className="w-4 h-4" />
                      <span>to navigate</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CornerDownLeft className="w-4 h-4" />
                      <span>to select</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.5 text-xs bg-white/10 rounded">
                        ESC
                      </span>
                      <span>to close</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
