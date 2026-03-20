import { useEffect } from "react";
import { format, isSameDay, parseISO } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ITodo } from "@/types/todo.types";
import { TodoItem } from "./todo-item";
import { useCreateTodo, useDeleteTodo } from "@/hooks/mutation/use-todo";
import { BaseDialog } from "@/components/layout/base-dialog";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/form-field/form-input";
import { FormTextarea } from "@/components/form-field/form-textarea";
import { FormSelect } from "@/components/form-field/form-select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const todoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]),
  status: z.enum(["planned_today", "completed", "tomorrow_plan"]),
});

type TodoFormValues = z.infer<typeof todoSchema>;

interface TodoDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDay: Date | null;
  todos: ITodo[];
  initialStatus?: "planned_today" | "completed" | "tomorrow_plan";
}

export function TodoDialog({
  isOpen,
  onOpenChange,
  selectedDay,
  todos,
  initialStatus = "planned_today",
}: TodoDialogProps) {
  const { mutate: createTodo, isPending: isCreating } = useCreateTodo();
  const { mutate: deleteTodo } = useDeleteTodo();

  const form = useForm<TodoFormValues>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
      status: initialStatus,
    },
  });

  useEffect(() => {
    if (isOpen) {
      form.reset({
        title: "",
        description: "",
        priority: "medium",
        status: initialStatus,
      });
    }
  }, [isOpen, initialStatus, form]);

  const handleCreateTodo = (data: TodoFormValues) => {
    if (!selectedDay) return;

    createTodo(
      {
        ...data,
        date: format(selectedDay, "yyyy-MM-dd"),
        completed: false,
      },
      {
        onSuccess: () => {
          form.reset();
          onOpenChange(false);
        },
      }
    );
  };

  const dayTodos = selectedDay
    ? todos.filter((t) => isSameDay(parseISO(t.date), selectedDay))
    : [];

  return (
    <BaseDialog
      open={isOpen}
      onOpenChange={onOpenChange}
      trigger={null}
      title={selectedDay ? format(selectedDay, "MMMM d, yyyy") : "Add Todo"}
      className="sm:max-w-md"
    >
      <div className="space-y-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateTodo)}
            className="space-y-4"
          >
            <FormInput
              name="title"
              label="Title"
              placeholder="What needs to be done?"
            />
            <FormTextarea
              name="description"
              label="Description"
              placeholder="Add more details..."
            />
            <div className="grid grid-cols-2 gap-4">
              <FormSelect
                name="priority"
                label="Priority"
                options={[
                  { label: "Low", value: "low" },
                  { label: "Medium", value: "medium" },
                  { label: "High", value: "high" },
                ]}
              />
              <FormSelect
                name="status"
                label="Status"
                options={[
                  { label: "Planned Today", value: "planned_today" },
                  { label: "Completed", value: "completed" },
                  { label: "Tomorrow Plan", value: "tomorrow_plan" },
                ]}
              />
            </div>
            <Button className="w-full" type="submit" disabled={isCreating}>
              {isCreating ? "Creating..." : "Create Task"}
            </Button>
          </form>
        </Form>

        <div className="pt-4 border-t border-border/50">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-3 block font-semibold">
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
                No tasks yet for this day.
              </p>
            )}
          </div>
        </div>
      </div>
    </BaseDialog>
  );
}
