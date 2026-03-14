"use client";

import { CheckCircle2, Circle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ITodo } from "@/types/todo.types";
import { cn } from "@/lib/utils";
import { useUpdateTodo } from "@/hooks/mutation/use-todo";

interface TodoItemProps {
  todo: ITodo;
  variant?: "small" | "detail";
  onDelete?: () => void;
}

export function TodoItem({ todo, variant = "small", onDelete }: TodoItemProps) {
  const { mutate: updateTodo } = useUpdateTodo();

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateTodo({ _id: todo._id, completed: !todo.completed });
  };

  if (variant === "small") {
    return (
      <div
        className={cn(
          "group flex items-center gap-1.5 px-2 py-1 rounded text-[11px] font-medium truncate",
          todo.completed
            ? "bg-muted/50 text-muted-foreground/70"
            : "bg-primary/10 text-primary border-l-2 border-primary"
        )}
        onClick={handleToggle}
      >
        <div
          className={cn(
            "h-1.5 w-1.5 rounded-full shrink-0",
            todo.completed ? "bg-muted-foreground/30" : "bg-primary"
          )}
        />
        <span className="truncate">{todo.title}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between rounded-lg border border-border/50 bg-card p-2.5 transition-colors hover:bg-accent/50 group">
      <div className="flex items-center gap-3">
        <button
          onClick={handleToggle}
          className="transition-transform active:scale-95"
        >
          {todo.completed ? (
            <CheckCircle2 className="h-4 w-4 text-primary" />
          ) : (
            <Circle className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
        <span
          className={cn(
            "text-sm",
            todo.completed && "text-muted-foreground line-through opacity-70"
          )}
        >
          {todo.title}
        </span>
      </div>
      {onDelete && (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
