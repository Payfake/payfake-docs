import { notFound } from "next/navigation";
import { getDocBySlug, getAllDocs } from "@/lib/docs";
import { TableOfContents } from "@/components/layout/TableOfContents";
import { Feedback } from "@/components/mdx/Feedback";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { MotionWrapper } from "@/components/layout/MotionWrapper";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ v?: string }>;
}

export async function generateStaticParams() {
  const docs = await getAllDocs();
  return docs.map((doc) => ({
    slug: doc.slug.split("/"),
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const doc = await getDocBySlug(slug?.join("/") || "index");

  if (!doc) {
    return { title: "Not Found" };
  }

  return {
    title: doc.frontmatter.title,
    description: doc.frontmatter.description,
    openGraph: {
      title: doc.frontmatter.title,
      description: doc.frontmatter.description,
    },
  };
}

export default async function DocPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { v } = await searchParams;
  const version = v || "v1";

  const doc = await getDocBySlug(slug?.join("/") || "index", version);

  if (!doc) {
    notFound();
  }

  const { content, frontmatter, headings, navigation } = doc;

  return (
    <MotionWrapper>
      <div className="flex gap-8">
        <article className="flex-1 min-w-0">
          <div className="prose prose-invert max-w-none">
            <h1 className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {frontmatter.title}
            </h1>
            {frontmatter.description && (
              <p className="text-lg text-white/60 -mt-2 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
                {frontmatter.description}
              </p>
            )}
            <div className="animate-in fade-in duration-500 delay-200">
              {content}
            </div>
          </div>

          <div className="flex items-center justify-between mt-12 pt-6 border-t border-white/10 animate-in fade-in duration-500 delay-300">
            {navigation.prev && (
              <Link
                href={navigation.prev.href}
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>{navigation.prev.label}</span>
              </Link>
            )}
            {navigation.next && (
              <Link
                href={navigation.next.href}
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors ml-auto group"
              >
                <span>{navigation.next.label}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>

          <div className="mt-8 flex items-center justify-between animate-in fade-in duration-500 delay-300">
            <a
              href={`https://github.com/payfake/payfake-docs/edit/main/content/docs/${version}/${doc.slug}.mdx`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/40 hover:text-white/60 transition-colors"
            >
              Edit this page on GitHub
            </a>
          </div>

          <div className="animate-in fade-in duration-500 delay-300">
            <Feedback slug={doc.slug} />
          </div>
        </article>

        <TableOfContents headings={headings} />
      </div>
    </MotionWrapper>
  );
}
