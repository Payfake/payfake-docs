"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { navigation } from "@/lib/navigation";

export function Sidebar() {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<string[]>([
    "Getting Started",
  ]);

  const toggleSection = (title: string) => {
    setOpenSections((prev) =>
      prev.includes(title) ? prev.filter((s) => s !== title) : [...prev, title],
    );
  };

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="h-screen sticky top-0 border-r border-white/10 p-6 overflow-y-auto"
    >
      <Link href="/" className="flex items-center gap-3 mb-8">
        <Image
          src="/logo.jpeg"
          alt="Payfake"
          width={32}
          height={32}
          className="invert"
        />
        <span className="font-medium text-white">Payfake</span>
      </Link>

      <div className="mb-4">
        <select className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-white/30">
          <option value="v1">v1.0.0</option>
        </select>
      </div>

      <nav className="space-y-6">
        {navigation.map((section) => (
          <div key={section.title}>
            <button
              onClick={() => toggleSection(section.title)}
              className="flex items-center justify-between w-full text-xs font-medium text-white/40 uppercase tracking-wider mb-2 hover:text-white/60 transition-colors"
            >
              {section.title}
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-200 ${openSections.includes(section.title) ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {openSections.includes(section.title) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <ul className="space-y-1 ml-2">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className={`block py-1.5 text-sm transition-colors ${
                            pathname === link.href
                              ? "text-white"
                              : "text-white/60 hover:text-white"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>

      <div className="mt-8 pt-6 border-t border-white/10">
        <a
          href="https://github.com/payfake/payfake"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-white/40 hover:text-white/60 transition-colors"
        >
          GitHub
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </motion.aside>
  );
}
