---
name: server-entry-client-logic
description: Pattern for implementing server-side entry pages with client-side shells (Tables, Editors, Details).
---

# Server Entry, Client Logic Pattern

This skill guides the implementation of features following a "Server Entry, Client Logic" architecture. This pattern ensures fast initial loads, SEO/Metadata support, and modular logic separation.

## Pattern Components

### 1. The Server Page (`page.tsx`)
The entry point must be a Server Component to support metadata and server-side logic.

**Key Responsibilities:**
- Define and export `Metadata`.
- Resolve route parameters (e.g., `params`).
- Render a feature-specific client wrapper (e.g., `BlogTable` or `BlogEditorShell`).
- (Optional) Fetch data on the server and pass it as props for initial paint.

**Example (Data Table):**
```tsx
import { Metadata } from "next";
import { BlogTable } from "./_components/blogs-table";

export const metadata: Metadata = {
  title: "Blogs | Admin",
  description: "Manage your blog posts.",
};

export default function AdminBlogsPage() {
  return <BlogTable />;
}
```

**Example (Editor/Details):**
```tsx
import { Metadata } from "next";
import { BlogEditorShell } from "../../_components/blog-editor-shell";

export const metadata: Metadata = {
  title: "Edit Blog | Admin",
};

export default async function BlogEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <BlogEditorShell id={id} />;
}
```

### 2. The Client Shell (`_components/*.tsx`)
A client component that acts as the "bridge" between data hooks and the UI.

**Key Responsibilities:**
- Use the `"use client"` directive.
- Handle data fetching via client-side hooks (React Query).
- Handle interactive state (forms, filters, pagination).
- Pass logic to generalized components (e.g., `DataTableShell` or `Editor`).

**Example (Editor Shell):**
```tsx
"use client";

import { useAdminBlog, useUpdateBlog } from "@/hooks/query/use-blog";
import { Editor } from "@/components/text-editor/dynamic-editor";

export function BlogEditorShell({ id }: { id: string }) {
  const { data: blog, isLoading } = useAdminBlog(id);
  const { mutate: updateBlog } = useUpdateBlog(id);

  if (isLoading) return <Loader />;

  return (
    <div className="space-y-6">
      <h1>{blog.title}</h1>
      <Editor initialContent={blog.content} onChange={(val) => updateBlog({ content: val })} />
    </div>
  );
}
```

### 3. The Generalized UI Shell
Reusable core components that handle standard UI patterns.

- **`DataTableShell`**: Encapsulates `useDataTable`, headers, and toolbars.
- **Form/Editor Layouts**: Standardized headers and sticky save bars.

## When to Use
- **Tables**: Admin lists with sorting/filtering/pagination.
- **Editors**: Page-level forms requiring auto-save or complex state.
- **Details**: Public or private viewer pages with interactive elements.

## Benefits
- **Metadata**: Next.js metadata only works in Server Components.
- **Consistency**: Centralized logic in Shell components makes maintenance easier.
- **Performance**: Keeps the main page light and allows for easy server-side prefetching later if needed.
