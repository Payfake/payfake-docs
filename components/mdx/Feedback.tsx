"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThumbsUp, ThumbsDown, Check } from "lucide-react";

interface FeedbackProps {
  slug: string;
}

export function Feedback({ slug }: FeedbackProps) {
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const submitFeedback = async (value: "up" | "down") => {
    setFeedback(value);

    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, helpful: value === "up" }),
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Failed to submit feedback:", error);
    }
  };

  return (
    <div className="mt-12 pt-6 border-t border-white/10">
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="question"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-4"
          >
            <span className="text-sm text-white/60">
              Was this page helpful?
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => submitFeedback("up")}
                className={`p-2 cursor-pointer rounded-md border transition-all ${
                  feedback === "up"
                    ? "border-green-500 bg-green-500/10 text-green-500"
                    : "border-white/10 hover:border-white/20 text-white/60 hover:text-white"
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => submitFeedback("down")}
                className={`p-2 cursor-pointer rounded-md border transition-all ${
                  feedback === "down"
                    ? "border-red-500 bg-red-500/10 text-red-500"
                    : "border-white/10 hover:border-white/20 text-white/60 hover:text-white"
                }`}
              >
                <ThumbsDown className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="thanks"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-green-500"
          >
            <Check className="w-4 h-4" />
            <span className="text-sm">Thanks for your feedback!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
