import { NextRequest, NextResponse } from "next/server";
import { getAllDocs } from "@/lib/docs";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

const DOCS_PATH = path.join(process.cwd(), "content/docs");

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q");

  if (!query) {
    return NextResponse.json([]);
  }

  const version = "v1";
  const docs = await getAllDocs(version);

  const results = [];

  for (const doc of docs) {
    const filePath = path.join(DOCS_PATH, version, `${doc.slug}.mdx`);
    const file = await fs.readFile(filePath, "utf-8");
    const { data: frontmatter, content } = matter(file);

    const title = frontmatter.title || doc.slug;
    const searchText = `${title} ${content}`.toLowerCase();

    if (searchText.includes(query.toLowerCase())) {
      const excerpt = extractExcerpt(content, query);

      results.push({
        title,
        href: `/docs/${doc.slug}`,
        excerpt,
      });
    }
  }

  return NextResponse.json(results.slice(0, 10));
}

function extractExcerpt(content: string, query: string): string {
  const lowerContent = content.toLowerCase();
  const queryIndex = lowerContent.indexOf(query.toLowerCase());

  if (queryIndex === -1) return content.slice(0, 100) + "...";

  const start = Math.max(0, queryIndex - 40);
  const end = Math.min(content.length, queryIndex + query.length + 40);

  let excerpt = content.slice(start, end);

  if (start > 0) excerpt = "..." + excerpt;
  if (end < content.length) excerpt = excerpt + "...";

  return excerpt;
}
