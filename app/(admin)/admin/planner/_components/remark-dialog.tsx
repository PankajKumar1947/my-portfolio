"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useUpsertPlannerDay } from "@/hooks/mutation/use-planner-day";

interface RemarkDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  date: string;
}

export function RemarkDialog({ isOpen, onOpenChange, date }: RemarkDialogProps) {
  const [remark, setRemark] = useState("");
  const { mutate: appendRemark, isPending } = useUpsertPlannerDay();

  const handleSave = () => {
    if (!remark.trim()) return;

    appendRemark(
      { date, remark: remark.trim() },
      {
        onSuccess: () => {
          setRemark("");
          onOpenChange(false);
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Add Daily Remark</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="remark" className="text-right">
              Remark
            </Label>
            <Textarea
              id="remark"
              placeholder="What's on your mind for today?"
              className="min-h-30 resize-none"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleSave}
            disabled={!remark.trim() || isPending}
          >
            {isPending ? "Posting..." : "Post Remark"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
