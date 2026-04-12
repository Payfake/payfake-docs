"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, ExternalLink } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { navigation } from "@/lib/navigation";

interface MobileNavProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function MobileNav({ isOpen: propIsOpen, onClose }: MobileNavProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [openSections, setOpenSections] = useState<string[]>([
    "Getting Started",
  ]);
  const pathname = usePathname();

  const isOpen = propIsOpen ?? internalOpen;

  const handleClose = () => {
    setInternalOpen(false);
    onClose?.();
  };

  const toggleSection = (title: string) => {
    setOpenSections((prev) =>
      prev.includes(title) ? prev.filter((s) => s !== title) : [...prev, title],
    );
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <Link
                  href="/"
                  onClick={handleClose}
                  className="flex items-center gap-3"
                >
                  <Image
                    src="/logo.JPG"
                    alt="Payfake"
                    width={32}
                    height={32}
                    className="invert"
                  />
                  <span className="font-medium text-white">Payfake</span>
                </Link>
                <button
                  onClick={handleClose}
                  className="p-2 text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <nav className="space-y-6">
                  {navigation.map((section) => (
                    <div key={section.title}>
                      <button
                        onClick={() => toggleSection(section.title)}
                        className="flex items-center justify-between w-full text-xs font-medium text-white/40 uppercase tracking-wider mb-2"
                      >
                        {section.title}
                        <ChevronDown
                          className={`w-3 h-3 transition-transform ${openSections.includes(section.title) ? "rotate-180" : ""}`}
                        />
                      </button>

                      {openSections.includes(section.title) && (
                        <ul className="space-y-1 ml-2">
                          {section.links.map((link) => (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                onClick={handleClose}
                                className={`block py-2 text-base ${
                                  pathname === link.href
                                    ? "text-white"
                                    : "text-white/60"
                                }`}
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </nav>
              </div>

              <div className="p-4 border-t border-white/10">
                <a
                  href="https://github.com/payfake/payfake-api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/60"
                >
                  GitHub
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
