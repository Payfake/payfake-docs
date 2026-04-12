import { compileMDX } from "next-mdx-remote/rsc";
import { CodeBlock } from "@/components/mdx/CodeBlock";
import { Callout } from "@/components/mdx/Callout";
import { Endpoint } from "@/components/mdx/Endpoint";
import { Tabs, Tab, TabList, TabPanels, TabPanel } from "@/components/mdx/Tabs";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import React from "react";

const components = {
  pre: CodeBlock,
  Callout,
  Endpoint,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-8 mb-4 text-white">
      {children}
    </h1>
  ),
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="text-2xl font-normal border-b border-white/10 pb-2 mt-8 mb-4">
      {children}
    </h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="text-xl font-medium mt-6 mb-3">{children}</h3>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="text-white/80 leading-relaxed mb-4">{children}</p>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="list-disc list-inside text-white/80 space-y-2 mb-4 ml-4">
      {children}
    </ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="list-decimal list-inside text-white/80 space-y-2 mb-4 ml-4">
      {children}
    </ol>
  ),
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a
      href={href}
      className="text-white underline underline-offset-2 hover:text-white/70 transition-colors"
    >
      {children}
    </a>
  ),
  table: ({ children }: { children?: React.ReactNode }) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full text-sm">{children}</table>
    </div>
  ),
  th: ({ children }: { children?: React.ReactNode }) => (
    <th className="text-left p-3 border-b border-white/20 font-medium">
      {children}
    </th>
  ),
  td: ({ children }: { children?: React.ReactNode }) => (
    <td className="p-3 border-b border-white/10 text-white/80">{children}</td>
  ),
};

export async function compileMdx(source: string) {
  return await compileMDX({
    source,
    components,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypePrettyCode,
            {
              theme: "github-dark",
              keepBackground: false,
            },
          ],
        ],
      },
    },
  });
}
