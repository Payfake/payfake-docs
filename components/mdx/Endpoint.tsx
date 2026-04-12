"use client";

import { motion } from "framer-motion";

interface EndpointProps {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
}

const methodColors = {
  GET: "text-green-500 border-green-500/20 bg-green-500/10",
  POST: "text-blue-500 border-blue-500/20 bg-blue-500/10",
  PUT: "text-yellow-500 border-yellow-500/20 bg-yellow-500/10",
  DELETE: "text-red-500 border-red-500/20 bg-red-500/10",
  PATCH: "text-purple-500 border-purple-500/20 bg-purple-500/10",
};

export function Endpoint({ method, path }: EndpointProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="my-6 p-4 bg-white/5 border border-white/10 rounded-lg"
    >
      <div className="flex items-center gap-4">
        <span
          className={`px-3 py-1 text-xs font-mono font-medium rounded-full border ${methodColors[method]}`}
        >
          {method}
        </span>
        <code className="text-sm text-white/80 font-mono">{path}</code>
      </div>
    </motion.div>
  );
}
