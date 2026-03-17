import { Metadata } from "next";
import { BlogEditorShell } from "../../_components/blog-editor-shell";

export const metadata: Metadata = {
  title: "Edit Blog | Admin",
  description: "Edit your blog content.",
};

interface BlogEditPageProps {
  params: Promise<{ id: string }>;
}

export default async function BlogEditPage({ params }: BlogEditPageProps) {
  const { id } = await params;

  return <BlogEditorShell id={id} />;
}
