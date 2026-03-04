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

import { noteSchema, type NoteFormValues } from "@/schema/note";

interface NoteFormProps {
  initialData?: NoteFormValues;
  onSubmit?: (data: NoteFormValues) => void;
  trigger?: React.ReactNode;
}

export function NoteForm({
  initialData,
  onSubmit: onSubmitProp,
  trigger,
}: NoteFormProps) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const isEdit = !!initialData;

  const form = useForm<NoteFormValues>({
    resolver: zodResolver(noteSchema),
    defaultValues: initialData || {
      title: "",
      slug: "",
      description: "",
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
        description: "",
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

  function handleSubmit(data: NoteFormValues) {
    if (onSubmitProp) {
      onSubmitProp(data);
    } else {
      sessionStorage.setItem("note-draft-meta", JSON.stringify(data));
      router.push("/admin/notes/new");
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
      New Note
    </Button>
  );

  return (
    <BaseDialog
      open={open}
      onOpenChange={setOpen}
      title={isEdit ? "Edit Note" : "Create New Note"}
      description={
        isEdit
          ? "Update the details of this note."
          : "Fill in the note details. You'll add pages on the next screen."
      }
      trigger={trigger || defaultTrigger}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <InfoGrid cols={1} className="gap-6">
            <InfoSection title="Note Details">
              <InfoGrid cols={1} className="mb-4">
                <FormInput
                  name="title"
                  label="Title"
                  placeholder="Enter note title..."
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
                  name="description"
                  label="Description"
                  placeholder="Brief description of this note..."
                />
              </InfoGrid>
            </InfoSection>

            <InfoSection title="Settings">
              <InfoGrid cols={1}>
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
              {isEdit ? "Update Note" : "Continue to Editor"}
            </Button>
          </InfoGrid>
        </form>
      </Form>
    </BaseDialog>
  );
}
