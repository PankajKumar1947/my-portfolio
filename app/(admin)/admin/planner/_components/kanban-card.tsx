"use client";

import { ITodo } from "@/types/todo.types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { GripVertical, Info } from "lucide-react";
import { motion } from "motion/react";

interface KanbanCardProps {
  todo: ITodo;
  isDraggable?: boolean;
}

export function KanbanCard({ todo, isDraggable = true }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: todo._id,
    disabled: !isDraggable,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const priorityColors = {
    low: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    medium: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    high: "bg-destructive/10 text-destructive border-destructive/20",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative",
        isDragging && "z-50 opacity-50"
      )}
    >
      <Card className="overflow-hidden border-border bg-card shadow-card transition-all duration-normal ease-smooth hover:shadow-card-hover dark:bg-card/40 dark:backdrop-blur-md">
        <CardContent className="p-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 space-y-1">
              <h4 className="text-sm font-semibold leading-none tracking-tight">
                {todo.title}
              </h4>
              {todo.description && (
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {todo.description}
                </p>
              )}
            </div>
            {isDraggable && (
              <div
                {...attributes}
                {...listeners}
                className="cursor-grab active:cursor-grabbing text-muted-foreground/30 hover:text-muted-foreground transition-colors p-1 rounded hover:bg-muted/50"
              >
                <GripVertical className="h-4 w-4" />
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <Badge
              variant="outline"
              className={cn("text-[10px] px-1.5 py-0 uppercase font-black tracking-wider", priorityColors[todo.priority])}
            >
              {todo.priority}
            </Badge>
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-semibold uppercase tracking-tight">
               <Info className="h-3 w-3" />
               {todo.completed ? "Done" : "Pending"}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
