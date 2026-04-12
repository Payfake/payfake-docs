"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Loader2, ChevronDown } from "lucide-react";

interface ApiPlaygroundProps {
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  defaultBody?: string;
  defaultHeaders?: Record<string, string>;
}

export function ApiPlayground({
  endpoint,
  method,
  defaultBody = "{}",
  defaultHeaders = {},
}: ApiPlaygroundProps) {
  const [baseUrl, setBaseUrl] = useState("http://localhost:8080");
  const [body, setBody] = useState(defaultBody);
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  const executeRequest = async () => {
    setLoading(true);
    setError(null);

    try {
      const parsedBody = method !== "GET" ? JSON.parse(body) : undefined;

      const res = await fetch(`${baseUrl}${endpoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...defaultHeaders,
        },
        body: parsedBody ? JSON.stringify(parsedBody) : undefined,
      });

      const data = await res.json();
      setResponse({
        status: res.status,
        data,
      });
      setExpanded(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-6 border border-white/10 rounded-lg overflow-hidden">
      <div className="p-4 bg-white/5 border-b border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-sm text-white/60">Base URL:</span>
          <input
            type="text"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            className="flex-1 px-3 py-1.5 bg-black border border-white/10 rounded text-sm text-white font-mono"
          />
        </div>

        {method !== "GET" && (
          <div className="mb-3">
            <span className="text-sm text-white/60 block mb-1">
              Request Body:
            </span>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={6}
              className="w-full px-3 py-2 bg-black border border-white/10 rounded text-sm text-white font-mono resize-y"
            />
          </div>
        )}

        <button
          onClick={executeRequest}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg font-medium text-sm hover:bg-white/90 transition-colors disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Play className="w-4 h-4" />
          )}
          Execute Request
        </button>
      </div>

      <AnimatePresence>
        {expanded && (response || error) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-white/10"
          >
            <button
              onClick={() => setExpanded(false)}
              className="w-full px-4 py-2 flex items-center justify-between text-sm text-white/60 hover:text-white transition-colors"
            >
              <span>Response</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`}
              />
            </button>

            {expanded && (
              <div className="p-4 bg-black">
                {error ? (
                  <div className="text-red-500 text-sm">{error}</div>
                ) : (
                  <>
                    <div className="mb-2">
                      <span className="text-xs text-white/40">Status: </span>
                      <span
                        className={`text-sm ${response.status < 400 ? "text-green-500" : "text-red-500"}`}
                      >
                        {response.status}
                      </span>
                    </div>
                    <pre className="text-xs text-white/80 overflow-x-auto">
                      <code>{JSON.stringify(response.data, null, 2)}</code>
                    </pre>
                  </>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
