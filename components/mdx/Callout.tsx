"use client";

import { motion } from "framer-motion";
import { AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";

interface CalloutProps {
  children: React.ReactNode;
  type?: "info" | "success" | "warning" | "error";
  title?: string;
}

const icons = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
};

const colors = {
  info: "border-white/20 bg-white/5",
  success: "border-green-500/20 bg-green-500/5",
  warning: "border-yellow-500/20 bg-yellow-500/5",
  error: "border-red-500/20 bg-red-500/5",
};

const iconColors = {
  info: "text-white/60",
  success: "text-green-500",
  warning: "text-yellow-500",
  error: "text-red-500",
};

export function Callout({ children, type = "info", title }: CalloutProps) {
  const Icon = icons[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`my-6 p-4 border rounded-lg ${colors[type]}`}
    >
      <div className="flex gap-3">
        <Icon className={`w-5 h-5 ${iconColors[type]} shrink-0 mt-0.5`} />
        <div>
          {title && <p className="font-medium text-white mb-1">{title}</p>}
          <div className="text-white/70 text-sm">{children}</div>
        </div>
      </div>
    </motion.div>
  );
}
