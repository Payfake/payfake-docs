"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy } from "lucide-react";

export function CodeBlock({ children, language, filename }: any) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    const code = children?.props?.children;
    navigator.clipboard?.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative group my-6"
    >
      {filename && (
        <div className="absolute top-0 left-4 -translate-y-1/2 px-3 py-1 bg-white/10 rounded-md text-xs text-white/60">
          {filename}
        </div>
      )}
      <button
        onClick={copy}
        className="absolute cursor-pointer top-3 right-3 p-2 rounded-md bg-white/5 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity z-10"
      >
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.div
              key="check"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <Check className="w-4 h-4 text-green-500" />
            </motion.div>
          ) : (
            <motion.div
              key="copy"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <Copy className="w-4 h-4 text-white/60" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
      <pre className="bg-white/5 border border-white/10 rounded-lg p-4 overflow-x-auto">
        {children}
      </pre>
    </motion.div>
  );
}
