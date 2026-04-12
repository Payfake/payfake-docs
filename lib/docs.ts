import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { compileMdx } from "./mdx";

const DOCS_PATH = path.join(process.cwd(), "content/docs");

export async function getDocBySlug(slug: string, version: string = "v1") {
  const filePath = path.join(DOCS_PATH, version, `${slug}.mdx`);

  try {
    const file = await fs.readFile(filePath, "utf-8");
    const { data: frontmatter, content: rawContent } = matter(file);

    // Compile the MDX
    const { content } = await compileMdx(rawContent);

    // Extract headings from raw content
    const headings: { level: number; text: string; id: string }[] = [];
    const headingRegex = /^(#{2,4})\s+(.+)$/gm;
    let match;

    while ((match = headingRegex.exec(rawContent)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
      headings.push({ level, text, id });
    }

    const navigation = await getNavigationContext(slug, version);

    return {
      slug,
      frontmatter,
      content,
      headings,
      navigation,
    };
  } catch (error) {
    console.error(`Error loading doc ${slug}:`, error);
    return null;
  }
}

export async function getAllDocs(version: string = "v1") {
  const docs: any[] = [];
  const basePath = path.join(DOCS_PATH, version);

  async function walk(dir: string) {
    const files = await fs.readdir(dir, { withFileTypes: true });

    for (const file of files) {
      const fullPath = path.join(dir, file.name);

      if (file.isDirectory()) {
        await walk(fullPath);
      } else if (file.name.endsWith(".mdx")) {
        const slug = path.relative(basePath, fullPath).replace(".mdx", "");
        docs.push({ slug });
      }
    }
  }

  await walk(basePath);
  return docs;
}

async function getNavigationContext(slug: string, version: string) {
  const allDocs = await getAllDocs(version);
  const sortedSlugs = allDocs.map((d) => d.slug).sort();

  const currentIndex = sortedSlugs.indexOf(slug);

  return {
    prev:
      currentIndex > 0
        ? { href: `/docs/${sortedSlugs[currentIndex - 1]}`, label: "Previous" }
        : null,
    next:
      currentIndex < sortedSlugs.length - 1
        ? { href: `/docs/${sortedSlugs[currentIndex + 1]}`, label: "Next" }
        : null,
  };
}
