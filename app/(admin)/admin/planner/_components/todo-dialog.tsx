"use client";

import { useState } from "react";
import { format, isSameDay, parseISO } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ITodo } from "@/types/todo.types";
import { TodoItem } from "./todo-item";
import { useCreateTodo, useDeleteTodo } from "@/hooks/mutation/use-todo";

interface TodoDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDay: Date | null;
  todos: ITodo[];
}

export function TodoDialog({
  isOpen,
  onOpenChange,
  selectedDay,
  todos,
}: TodoDialogProps) {
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const { mutate: createTodo, isPending: isCreating } = useCreateTodo();
  const { mutate: deleteTodo } = useDeleteTodo();

  const handleCreateTodo = () => {
    if (!newTodoTitle.trim() || !selectedDay) return;

    createTodo(
      {
        title: newTodoTitle,
        date: format(selectedDay, "yyyy-MM-dd"),
        completed: false,
        priority: "medium",
      },
      {
        onSuccess: () => {
          setNewTodoTitle("");
          onOpenChange(false);
        },
      }
    );
  };

  const dayTodos = selectedDay
    ? todos.filter((t) => isSameDay(parseISO(t.date), selectedDay))
    : [];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>
              {selectedDay ? format(selectedDay, "MMMM d, yyyy") : "Add Todo"}
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="title"
                className="text-xs uppercase tracking-wider text-muted-foreground"
              >
                Title
              </Label>
              <Input
                id="title"
                placeholder="What needs to be done?"
                value={newTodoTitle}
                onChange={(e) => setNewTodoTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreateTodo()}
                className="bg-muted/50 border-0 focus-visible:ring-1"
              />
            </div>
            <Button
              className="w-full"
              onClick={handleCreateTodo}
              disabled={isCreating}
            >
              {isCreating ? "Creating..." : "Create Task"}
            </Button>
          </div>

          <div className="pt-4 border-t border-border/50">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-3 block">
              Tasks for this day
            </Label>
            <div className="space-y-2 max-h-[30vh] overflow-y-auto pr-1">
              {dayTodos.map((todo) => (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  variant="detail"
                  onDelete={() => deleteTodo(todo._id)}
                />
              ))}
              {dayTodos.length === 0 && (
                <p className="text-xs text-center text-muted-foreground py-4 italic">
                  No tasks yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
