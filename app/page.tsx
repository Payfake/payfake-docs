"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Book,
  Code,
  Zap,
  Shield,
  Globe,
  Terminal,
  Webhook,
  Key,
} from "lucide-react";
import Image from "next/image";

export default function DocsHomepage() {
  return (
    <div className="min-h-screen bg-black">
      <section className="px-6 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-8">
            <Image
              src="/logo.JPG"
              alt="Payfake"
              width={48}
              height={48}
              className="invert"
            />
            <span className="text-sm font-medium text-white/60 tracking-wide">
              Documentation
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
            Build and test payments
            <br />
            without limits
          </h1>

          <p className="text-lg text-white/60 max-w-2xl mb-8">
            Everything you need to integrate Payfake — from quick start guides
            to detailed API references.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/docs/quick-start"
              className="px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-white/90 transition-colors inline-flex items-center gap-2"
            >
              Quick Start
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/docs/api/transaction"
              className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg font-medium text-white hover:bg-white/10 transition-colors inline-flex items-center gap-2"
            >
              API Reference
              <Code className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="px-6 py-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-light mb-8"
          >
            Popular Topics
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: Zap,
                title: "Quick Start",
                description: "Get up and running in under 5 minutes",
                href: "/docs/quick-start",
              },
              {
                icon: Book,
                title: "Guides",
                description: "Learn how to test scenarios and handle webhooks",
                href: "/docs/guides/testing",
              },
              {
                icon: Code,
                title: "SDKs",
                description: "Go, Python, JavaScript, and Rust libraries",
                href: "/docs/guides/sdks",
              },
              {
                icon: Terminal,
                title: "API Reference",
                description: "Complete endpoint documentation",
                href: "/docs/api/transaction",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="block p-6 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 transition-all group"
                >
                  <item.icon className="w-6 h-6 mb-4 text-white/60 group-hover:text-white transition-colors" />
                  <h3 className="text-lg font-medium mb-1 group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/40">{item.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-light mb-8"
          >
            Core Endpoints
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                method: "POST",
                path: "/transaction/initialize",
                description: "Create a new pending transaction",
                href: "/docs/api/transaction",
              },
              {
                method: "POST",
                path: "/charge/card",
                description: "Process a card payment",
                href: "/docs/api/charge",
              },
              {
                method: "POST",
                path: "/charge/mobile_money",
                description: "Process a mobile money payment",
                href: "/docs/api/charge",
              },
              {
                method: "GET",
                path: "/transaction/verify/:reference",
                description: "Confirm transaction status",
                href: "/docs/api/transaction",
              },
            ].map((endpoint, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={endpoint.href}
                  className="block p-4 bg-white/5 border border-white/10 rounded-lg hover:border-white/20 transition-all"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={`px-2 py-0.5 text-xs font-mono rounded border ${
                        endpoint.method === "POST"
                          ? "text-blue-400 border-blue-400/20 bg-blue-400/10"
                          : "text-green-400 border-green-400/20 bg-green-400/10"
                      }`}
                    >
                      {endpoint.method}
                    </span>
                    <code className="text-sm text-white/80 font-mono">
                      {endpoint.path}
                    </code>
                  </div>
                  <p className="text-sm text-white/40">
                    {endpoint.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-light mb-8"
          >
            What You Can Build
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Globe,
                title: "Card Payments",
                description:
                  "Visa, Mastercard, Amex, Discover with full validation and error simulation",
              },
              {
                icon: Shield,
                title: "Mobile Money",
                description:
                  "MTN MoMo, Vodafone Cash, AirtelTigo with realistic async flows",
              },
              {
                icon: Webhook,
                title: "Webhooks",
                description:
                  "HMAC-signed events with retry logic and delivery logs",
              },
              {
                icon: Zap,
                title: "Scenario Engine",
                description:
                  "Configure failure rates, delays, and forced outcomes",
              },
              {
                icon: Key,
                title: "Auth & Keys",
                description:
                  "JWT authentication with public/secret key management",
              },
              {
                icon: Terminal,
                title: "Introspection Logs",
                description: "Every request and response stored and queryable",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-white/5 border border-white/10 rounded-xl"
              >
                <feature.icon className="w-6 h-6 mb-4 text-white/60" />
                <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                <p className="text-sm text-white/40">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-light mb-4">Ready to get started?</h2>
            <p className="text-white/60 mb-8">
              Clone the repo and have Payfake running locally in under 5
              minutes.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                href="/docs/quick-start"
                className="px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-white/90 transition-colors inline-flex items-center gap-2"
              >
                Quick Start Guide
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://github.com/payfake/payfake-api"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg font-medium text-white hover:bg-white/10 transition-colors inline-flex items-center gap-2"
              >
                GitHub
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.26.82-.58 0-.287-.01-1.05-.015-2.06-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.082-.73.082-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.123-.3-.535-1.52.117-3.16 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.29-1.552 3.297-1.23 3.297-1.23.653 1.64.24 2.86.118 3.16.768.84 1.233 1.91 1.233 3.22 0 4.61-2.804 5.62-5.476 5.92.43.37.824 1.102.824 2.22 0 1.602-.015 2.894-.015 3.287 0 .322.216.698.83.578C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
