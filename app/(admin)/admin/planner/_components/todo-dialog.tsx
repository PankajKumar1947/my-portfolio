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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TodoDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDay: Date | null;
  todos: ITodo[];
  initialStatus?: "planned_today" | "ongoing" | "completed" | "tomorrow_plan";
}

export function TodoDialog({
  isOpen,
  onOpenChange,
  selectedDay,
  todos,
  initialStatus,
}: TodoDialogProps) {
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [status, setStatus] = useState<"planned_today" | "ongoing" | "completed" | "tomorrow_plan" | undefined>(initialStatus);

  const { mutate: createTodo, isPending: isCreating } = useCreateTodo();
  const { mutate: deleteTodo } = useDeleteTodo();

  const handleCreateTodo = () => {
    if (!newTodoTitle.trim() || !selectedDay) return;

    createTodo(
      {
        title: newTodoTitle,
        description,
        date: format(selectedDay, "yyyy-MM-dd"),
        completed: false,
        priority,
        status,
      },
      {
        onSuccess: () => {
          setNewTodoTitle("");
          setDescription("");
          setPriority("medium");
          setStatus(initialStatus);
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

            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="text-xs uppercase tracking-wider text-muted-foreground"
              >
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Add more details..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-muted/50 border-0 focus-visible:ring-1 min-h-20"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                  Priority
                </Label>
                <Select
                  value={priority}
                  onValueChange={(value: ITodo["priority"]) => setPriority(value)}
                >
                  <SelectTrigger className="bg-muted/50 border-0 focus:ring-1">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                  Status
                </Label>
                <Select
                  value={status || "planned_today"}
                  onValueChange={(value: NonNullable<ITodo["status"]>) => setStatus(value)}
                >
                  <SelectTrigger className="bg-muted/50 border-0 focus:ring-1">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planned_today">Planned Today</SelectItem>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="tomorrow_plan">Tomorrow Plan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
