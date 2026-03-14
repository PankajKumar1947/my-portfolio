"use client";

import { ITodo } from "@/types/todo.types";
import { KanbanCard } from "./kanban-card";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface KanbanColumnProps {
  id: string;
  title: string;
  todos: ITodo[];
  isDraggable?: boolean;
  onAddTask?: (status: any) => void;
  children?: React.ReactNode;
}

export function KanbanColumn({
  id,
  title,
  todos,
  isDraggable = true,
  onAddTask,
  children,
}: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div className="flex w-72 shrink-0 flex-col gap-3">
      <div className="flex h-10 items-center justify-between px-2">
        <div className="flex items-center gap-2.5">
          <h3 className="font-bold">
            {title}
          </h3>
          <span className="flex h-4 w-4 items-center justify-center rounded-md bg-muted/50 text-[9px] font-black text-muted-foreground/80">
            {todos.length}
          </span>
        </div>
        {onAddTask && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-muted-foreground hover:bg-muted/50"
            onClick={() => onAddTask(id)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div
        ref={setNodeRef}
        className={cn(
          "flex flex-1 flex-col gap-3 rounded-xl border border-border bg-muted/40 p-3 min-h-100 transition-all duration-normal dark:bg-muted/10",
          "hover:bg-muted/60 dark:hover:bg-muted/20"
        )}
      >
        {children || (
          <SortableContext items={todos.map((t) => t._id)} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col gap-3">
              {todos.map((todo) => (
                <KanbanCard key={todo._id} todo={todo} isDraggable={isDraggable} />
              ))}
              {todos.length === 0 && (
                <div className="flex flex-1 flex-col items-center justify-center py-12 text-center">
                  <p className="text-xs text-muted-foreground italic">No tasks here</p>
                </div>
              )}
            </div>
          </SortableContext>
        )}
      </div>
    </div>
  );
}
