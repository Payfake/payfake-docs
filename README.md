# Payfake Documentation

The official documentation site for [Payfake](https://github.com/payfake/payfake-api) — a self-hostable, Paystack-compatible payment simulator for African developers.

## Overview

This is the documentation site for Payfake, built with:

- **Next.js 15** (App Router)
- **Tailwind CSS** (Black/white theme)
- **MDX** (next-mdx-remote)
- **Framer Motion** (Animations)
- **TypeScript**

## Features

-  **MDX Documentation** — Write docs in Markdown with React components
-  **Full-text Search** — Search across all documentation with ⌘K shortcut
-  **Responsive Design** — Works on desktop, tablet, and mobile
-  **Dark Theme** — Clean black/white aesthetic
-  **Fast** — Static generation with Next.js
-  **Table of Contents** — Auto-generated from headings
-  **Keyboard Navigation** — Full keyboard support for search

## Getting Started

### Prerequisites

- Node.js 18+
- npm 

### Installation

```bash
# Clone the repository
git clone https://github.com/payfake/payfake-docs.git
cd payfake-docs

# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev
# or
bun dev
```

Visit `http://localhost:3000` to see the documentation site.

## Project Structure

```
payfake-docs/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Docs homepage
│   ├── docs/
│   │   └── [[...slug]]/
│   │       └── page.tsx        # Dynamic doc pages
│   └── api/
│       └── search/
│           └── route.ts        # Search API endpoint
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── MobileNav.tsx
│   │   ├── TableOfContents.tsx
│   │   └── Search.tsx
│   └── mdx/
│       ├── CodeBlock.tsx
│       ├── Callout.tsx
│       ├── Endpoint.tsx
│       └── Tabs.tsx
├── content/
│   └── docs/
│       └── v1/
│           ├── index.mdx
│           ├── quick-start.mdx
│           ├── api/
│           └── guides/
├── lib/
│   ├── docs.ts                 # MDX loading utilities
│   ├── mdx.tsx                 # MDX compilation
│   └── navigation.ts           # Sidebar navigation config
└── styles/
    └── globals.css             # Global styles
```

## Adding Documentation

1. Create a new `.mdx` file in `content/docs/v1/`
2. Add frontmatter at the top:

```md
---
title: Your Page Title
description: A brief description of the page
---
```

3. Write your content in Markdown with optional MDX components:

```md
<Callout type="info">
  This is a callout box.
</Callout>

<Endpoint method="POST" path="/api/v1/endpoint" />
```

## Available MDX Components

### Callout

```md
<Callout type="info" title="Note">
  Your message here.
</Callout>
```

Types: `info`, `success`, `warning`, `error`

### Endpoint

```md
<Endpoint method="GET" path="/api/v1/endpoint" />
```

### Tabs

```md
<Tabs defaultValue="javascript">
  <TabList>
    <Tab value="javascript">JavaScript</Tab>
    <Tab value="python">Python</Tab>
  </TabList>
  <TabPanels>
    <TabPanel value="javascript">
      ```javascript
      // JS code
      ```
    </TabPanel>
    <TabPanel value="python">
      ```python
      # Python code
      ```
    </TabPanel>
  </TabPanels>
</Tabs>
```

## Building for Production

```bash
npm run build
# or
bun run build
```

The static output will be in the `out/` directory.

## Deployment

The site is configured for deployment on Vercel:

```bash
vercel --prod
```

Or connect your GitHub repository to Vercel for automatic deployments.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_BASE_URL` | Base URL for metadata | `http://localhost:3000` |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-docs`)
3. Commit your changes (`git commit -m 'Add amazing docs'`)
4. Push to the branch (`git push origin feature/amazing-docs`)
5. Open a Pull Request

## License

MIT © [Payfake](https://github.com/payfake)

## Related

- [Payfake API](https://github.com/payfake/payfake-api) — The main Payfake server
- [Payfake JS SDK](https://github.com/payfake/payfake-js)
- [Payfake Python SDK](https://github.com/payfake/payfake-python)
- [Payfake Go SDK](https://github.com/payfake/payfake-go)
- [Payfake Rust SDK](https://github.com/payfake/payfake-rust)
