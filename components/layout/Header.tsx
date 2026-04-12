"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, Search as SearchIcon, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Search } from "./Search";

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 flex items-center justify-between px-4 md:px-6 lg:px-8 py-4 bg-black/80 backdrop-blur-sm border-b border-white/10"
    >
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 cursor-pointer text-white/60 hover:text-white transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <nav className="hidden lg:flex items-center gap-6">
          <Link
            href="/docs"
            className={`text-sm transition-colors ${
              pathname.startsWith("/docs")
                ? "text-white"
                : "text-white/60 hover:text-white"
            }`}
          >
            Documentation
          </Link>
          <Link
            href="/docs/api/transaction"
            className={`text-sm transition-colors ${
              pathname.includes("/api")
                ? "text-white"
                : "text-white/60 hover:text-white"
            }`}
          >
            API Reference
          </Link>
          <a
            href="https://github.com/payfake-api"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white/60 hover:text-white transition-colors inline-flex items-center gap-1"
          >
            GitHub
            <ExternalLink className="w-3 h-3" />
          </a>
        </nav>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setSearchOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white/60 hover:text-white hover:border-white/20 transition-all"
        >
          <SearchIcon className="w-4 h-4" />
          <span className="hidden sm:inline">Search docs...</span>
          <kbd className="hidden md:inline-block px-1.5 py-0.5 text-xs bg-white/10 rounded">
            ⌘K
          </kbd>
        </button>
      </div>

      <Search isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </motion.header>
  );
}
