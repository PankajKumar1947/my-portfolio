"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BaseDialog } from "@/components/layout/base-dialog";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/form-field/form-input";
import { FormTextarea } from "@/components/form-field/form-textarea";
import { useCreateBoard } from "@/hooks/query/use-board";

const boardSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

type BoardFormValues = z.infer<typeof boardSchema>;

export function BoardForm() {
  const [open, setOpen] = useState(false);
  const { mutate: createBoard, isPending } = useCreateBoard();

  const form = useForm<BoardFormValues>({
    resolver: zodResolver(boardSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function onSubmit(data: BoardFormValues) {
    createBoard(data, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
      },
    });
  }

  return (
    <BaseDialog
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          New Board
        </Button>
      }
      title="Create Board"
      description="Add a new whiteboarding board to your projects."
      className="sm:max-w-md"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
          <FormInput
            name="title"
            label="Title"
            placeholder="Project Brainstorming"
          />
          <FormTextarea
            name="description"
            label="Description"
            placeholder="Discussing architecture and flow..."
            className="h-32"
          />
          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Board"}
            </Button>
          </div>
        </form>
      </Form>
    </BaseDialog>
  );
}
