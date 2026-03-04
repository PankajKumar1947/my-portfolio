"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Plus, Edit2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { BaseDialog } from "@/components/layout/base-dialog";
import { FormInput } from "@/components/form-field/form-input";
import { FormTextarea } from "@/components/form-field/form-textarea";
import { FormSelect } from "@/components/form-field/form-select";
import { InfoGrid } from "@/components/layout/info-grid";
import { InfoSection } from "@/components/layout/info-section";

import { blogSchema, type BlogFormValues } from "@/schema/blog";

interface BlogFormProps {
  initialData?: BlogFormValues;
  onSubmit?: (data: BlogFormValues) => void;
  trigger?: React.ReactNode;
}

export function BlogForm({
  initialData,
  onSubmit: onSubmitProp,
  trigger,
}: BlogFormProps) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const isEdit = !!initialData;

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: initialData || {
      title: "",
      slug: "",
      excerpt: "",
      coverImage: "",
      readTime: "",
      status: "draft",
    },
  });

  // Reset form when dialog opens
  React.useEffect(() => {
    if (open && initialData) {
      form.reset(initialData);
    } else if (open && !initialData) {
      form.reset({
        title: "",
        slug: "",
        excerpt: "",
        coverImage: "",
        readTime: "",
        status: "draft",
      });
    }
  }, [open, initialData, form]);

  // Auto-generate slug from title
  const watchTitle = form.watch("title");
  React.useEffect(() => {
    if (watchTitle) {
      const slug = watchTitle
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      form.setValue("slug", slug);
    }
  }, [watchTitle, form]);

  function handleSubmit(data: BlogFormValues) {
    if (onSubmitProp) {
      onSubmitProp(data);
    } else {
      // Default behavior: store in session and navigate to content editor
      sessionStorage.setItem("blog-draft-meta", JSON.stringify(data));
      router.push("/admin/blogs/new");
    }
    setOpen(false);
    if (!isEdit) {
      form.reset();
    }
  }

  const defaultTrigger = isEdit ? (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 text-muted-foreground hover:text-primary"
    >
      <Edit2 className="h-4 w-4" />
    </Button>
  ) : (
    <Button>
      <Plus className="mr-2 h-4 w-4" />
      New Post
    </Button>
  );

  return (
    <BaseDialog
      open={open}
      onOpenChange={setOpen}
      title={isEdit ? "Edit Blog Post" : "Create New Blog Post"}
      description={
        isEdit
          ? "Update the details of this blog post."
          : "Fill in the blog details. You'll write the content on the next page."
      }
      trigger={trigger || defaultTrigger}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <InfoGrid cols={1} className="gap-6">
            <InfoSection title="Post Details">
              <InfoGrid cols={1} className="mb-4">
                <FormInput
                  name="title"
                  label="Title"
                  placeholder="Enter blog title..."
                />
              </InfoGrid>
              <InfoGrid cols={1}>
                <FormInput
                  name="slug"
                  label="Slug"
                  placeholder="url-friendly-slug"
                />
              </InfoGrid>
              <InfoGrid cols={1} className="mt-4">
                <FormTextarea
                  name="excerpt"
                  label="Excerpt"
                  placeholder="Brief description of the blog post..."
                />
              </InfoGrid>
            </InfoSection>

            <InfoSection title="Settings">
              <InfoGrid cols={2}>
                <FormInput
                  name="coverImage"
                  label="Cover Image URL"
                  placeholder="https://..."
                />
                <FormInput
                  name="readTime"
                  label="Read Time"
                  placeholder="e.g. 5 min read"
                />
              </InfoGrid>
              <InfoGrid cols={1} className="mt-4">
                <FormSelect
                  name="status"
                  label="Status"
                  placeholder="Select status"
                  options={[
                    { label: "Draft", value: "draft" },
                    { label: "Published", value: "published" },
                  ]}
                />
              </InfoGrid>
            </InfoSection>
          </InfoGrid>

          <InfoGrid cols={1} className="justify-items-end pt-2">
            <Button type="submit" className="w-full sm:w-auto">
              {isEdit ? "Update Post" : "Continue to Editor"}
            </Button>
          </InfoGrid>
        </form>
      </Form>
    </BaseDialog>
  );
}
