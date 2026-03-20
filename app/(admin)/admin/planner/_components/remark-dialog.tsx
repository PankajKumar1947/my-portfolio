"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { useUpsertPlannerDay } from "@/hooks/mutation/use-planner-day";
import { BaseDialog } from "@/components/layout/base-dialog";
import { Form } from "@/components/ui/form";
import { FormTextarea } from "@/components/form-field/form-textarea";

const remarkSchema = z.object({
  remark: z.string().min(1, "Remark is required"),
});

type RemarkFormValues = z.infer<typeof remarkSchema>;

interface RemarkDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  date: string;
}

export function RemarkDialog({ isOpen, onOpenChange, date }: RemarkDialogProps) {
  const { mutate: upsertRemark, isPending } = useUpsertPlannerDay();

  const form = useForm<RemarkFormValues>({
    resolver: zodResolver(remarkSchema),
    defaultValues: {
      remark: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      form.reset({
        remark: "",
      });
    }
  }, [isOpen, form]);

  const handleSave = (data: RemarkFormValues) => {
    upsertRemark(
      { date, remark: data.remark.trim() },
      {
        onSuccess: () => {
          form.reset();
          onOpenChange(false);
        },
      }
    );
  };

  return (
    <BaseDialog
      open={isOpen}
      onOpenChange={onOpenChange}
      trigger={null}
      title="Add Daily Remark"
      className="sm:max-w-md"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4 pt-4">
          <FormTextarea
            name="remark"
            label="Remark"
            placeholder="What's on your mind for today?"
            className="h-32"
          />
          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Posting..." : "Post Remark"}
            </Button>
          </div>
        </form>
      </Form>
    </BaseDialog>
  );
}
