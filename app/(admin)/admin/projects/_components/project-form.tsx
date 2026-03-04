"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Plus, Edit2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { BaseDialog } from "@/components/layout/base-dialog";
import { FormInput } from "@/components/form-field/form-input";
import { FormTextarea } from "@/components/form-field/form-textarea";
import { FormSwitch } from "@/components/form-field/form-switch";
import { InfoGrid } from "@/components/layout/info-grid";
import { InfoSection } from "@/components/layout/info-section";

import { projectSchema, type ProjectFormValues } from "@/schema/project";

interface ProjectFormProps {
  initialData?: ProjectFormValues;
  onSubmit?: (data: ProjectFormValues) => void;
  trigger?: React.ReactNode;
}

export function ProjectForm({
  initialData,
  onSubmit: onSubmitProp,
  trigger,
}: ProjectFormProps) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const isEdit = !!initialData;

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      image: "",
      tags: "",
      githubUrl: "",
      liveUrl: "",
      featured: false,
    },
  });

  // Reset form when dialog opens
  React.useEffect(() => {
    if (open && initialData) {
      form.reset(initialData);
    } else if (open && !initialData) {
      form.reset({
        title: "",
        description: "",
        image: "",
        tags: "",
        githubUrl: "",
        liveUrl: "",
        featured: false,
      });
    }
  }, [open, initialData, form]);

  const handleSubmit: SubmitHandler<ProjectFormValues> = (data) => {
    if (onSubmitProp) {
      onSubmitProp(data);
    } else {
      console.log("Saving project:", data);
    }
    setOpen(false);
    if (!isEdit) {
      form.reset();
    }
  };

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
      New Project
    </Button>
  );

  return (
    <BaseDialog
      open={open}
      onOpenChange={setOpen}
      title={isEdit ? "Edit Project" : "Create New Project"}
      description={
        isEdit
          ? "Update the details of this portfolio project."
          : "Fill in the project details. These will be displayed on your portfolio."
      }
      trigger={trigger || defaultTrigger}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <InfoGrid cols={1} className="gap-6">
            <InfoSection title="Project Details">
              <InfoGrid cols={1} className="mb-4">
                <FormInput
                  name="title"
                  label="Title"
                  placeholder="Enter project title..."
                />
              </InfoGrid>
              <InfoGrid cols={1} className="mb-4">
                <FormTextarea
                  name="description"
                  label="Description"
                  placeholder="Describe your project..."
                  rows={4}
                />
              </InfoGrid>
              <InfoGrid cols={1}>
                <FormInput
                  name="tags"
                  label="Tags"
                  placeholder="React, Next.js, Tailwind..."
                  description="Separate with commas"
                />
              </InfoGrid>
            </InfoSection>

            <InfoSection title="Links & Media">
              <InfoGrid cols={1} className="mb-4">
                <FormInput
                  name="image"
                  label="Image URL"
                  placeholder="https://images.unsplash.com/..."
                />
              </InfoGrid>
              <InfoGrid cols={2}>
                <FormInput
                  name="githubUrl"
                  label="GitHub URL"
                  placeholder="https://github.com/..."
                />
                <FormInput
                  name="liveUrl"
                  label="Live Website URL"
                  placeholder="https://..."
                />
              </InfoGrid>
            </InfoSection>

            <InfoSection title="Settings">
              <FormSwitch
                name="featured"
                label="Featured Project"
                description="Featured projects are shown prominently on the home page."
              />
            </InfoSection>
          </InfoGrid>

          <InfoGrid cols={1} className="justify-items-end pt-2">
            <Button type="submit" className="w-full sm:w-auto px-8">
              {isEdit ? "Update Project" : "Create Project"}
            </Button>
          </InfoGrid>
        </form>
      </Form>
    </BaseDialog>
  );
}
