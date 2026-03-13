"use client";

import { useState, useMemo } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  parseISO,
} from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { ITodo } from "@/types/todo.types";
import { cn } from "@/lib/utils";
import { useTodosByMonth } from "@/hooks/query/use-todo";
import { useCreateTodo, useUpdateTodo, useDeleteTodo } from "@/hooks/mutation/use-todo";

export default function PlannerPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [newTodoTitle, setNewTodoTitle] = useState("");

  const monthStr = useMemo(() => format(currentDate, "yyyy-MM"), [currentDate]);
  
  const { data: todos = [], isLoading } = useGetTodosByMonth(monthStr);
  const { mutate: createTodo, isPending: isCreating } = useCreateTodo();
  const { mutate: deleteTodo } = useDeleteTodo();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const handleToday = () => setCurrentDate(new Date());

  const handleAddTodo = () => {
    if (!newTodoTitle.trim() || !selectedDay) return;

    createTodo({
      title: newTodoTitle,
      date: format(selectedDay, "yyyy-MM-dd"),
      completed: false,
      priority: "medium",
    }, {
      onSuccess: () => {
        setNewTodoTitle("");
        setIsDialogOpen(false);
      }
    });
  };

  const toggleTodoStatus = (todo: ITodo) => {
    // We need to use updateTodo hook inside the component correctly
    // Since useUpdateTodo takes id, we can't call it here.
    // I will refactor the Todo list items to be a sub-component or use a workaround.
    // Actually, I can use a generic update todo hook if needed, but let's stick to the pattern.
  };

  const handleDeleteTodo = (id: string) => {
    deleteTodo(id);
  };

  return (
    <div className="flex h-[calc(100vh-12rem)] flex-col space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold tracking-tight">
            {format(currentDate, "MMMM yyyy")}
          </h1>
          <div className="flex items-center gap-1 rounded-md border border-border/50 p-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handlePrevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 px-3 text-xs" onClick={handleToday}>
              Today
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Button size="sm" onClick={() => {
          setSelectedDay(new Date());
          setIsDialogOpen(true);
        }}>
          <Plus className="mr-2 h-4 w-4" /> Add Task
        </Button>
      </div>

      <div className="flex-1 overflow-hidden rounded-xl border border-border/50 bg-card shadow-sm">
        {/* Calendar Header */}
        <div className="grid grid-cols-7 border-b border-border/50 divide-x divide-border/50">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="py-2 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 h-full divide-x divide-y divide-border/50 border-b border-r border-border/50">
          {calendarDays.map((day) => {
            const dayTodos = todos.filter((t) => isSameDay(parseISO(t.date), day));
            const isCurrentMonth = isSameMonth(day, monthStart);
            const isToday = isSameDay(day, new Date());

            return (
              <div
                key={day.toString()}
                className={cn(
                  "relative flex flex-col p-2 transition-colors hover:bg-accent/5 cursor-pointer min-h-25",
                  !isCurrentMonth && "bg-muted/30 text-muted-foreground/50"
                )}
                onClick={() => {
                  setSelectedDay(day);
                  setIsDialogOpen(true);
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={cn(
                    "text-sm font-medium h-7 w-7 flex items-center justify-center rounded-full",
                    isToday && "bg-primary text-primary-foreground font-bold shadow-sm"
                  )}>
                    {format(day, "d")}
                  </span>
                  {dayTodos.length > 0 && (
                    <span className="text-[10px] text-muted-foreground bg-muted px-1.5 rounded-full">
                      {dayTodos.length}
                    </span>
                  )}
                </div>
                
                <div className="flex flex-col gap-1 overflow-hidden">
                  {dayTodos.slice(0, 3).map((todo) => (
                    <TodoListItemSmall key={todo._id} todo={todo} />
                  ))}
                  {dayTodos.length > 3 && (
                    <div className="text-[10px] text-muted-foreground px-2">
                      +{dayTodos.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{selectedDay ? format(selectedDay, "MMMM d, yyyy") : "Add Todo"}</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-xs uppercase tracking-wider text-muted-foreground">Title</Label>
                <Input
                  id="title"
                  placeholder="What needs to be done?"
                  value={newTodoTitle}
                  onChange={(e) => setNewTodoTitle(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
                  className="bg-muted/50 border-0 focus-visible:ring-1"
                />
              </div>
              <Button className="w-full" onClick={handleAddTodo} disabled={isCreating}>
                {isCreating ? "Creating..." : "Create Task"}
              </Button>
            </div>

            <div className="pt-4 border-t border-border/50">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-3 block">Tasks for this day</Label>
              <div className="space-y-2 max-h-[30vh] overflow-y-auto pr-1">
                {selectedDay && todos
                  .filter((t) => isSameDay(parseISO(t.date), selectedDay))
                  .map((todo) => (
                    <TodoListItemDetail 
                      key={todo._id} 
                      todo={todo} 
                      onDelete={() => handleDeleteTodo(todo._id)} 
                    />
                  ))}
                {selectedDay && todos.filter((t) => isSameDay(parseISO(t.date), selectedDay)).length === 0 && (
                  <p className="text-xs text-center text-muted-foreground py-4 italic">No tasks yet.</p>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Sub-components to handle hooks correctly

function TodoListItemSmall({ todo }: { todo: ITodo }) {
  const { mutate: updateTodo } = useUpdateTodo(todo._id);
  
  return (
    <div
      className={cn(
        "group flex items-center gap-1.5 px-2 py-1 rounded text-[11px] font-medium truncate",
        todo.completed
          ? "bg-muted/50 text-muted-foreground/70"
          : "bg-primary/10 text-primary border-l-2 border-primary"
      )}
      onClick={(e) => {
        e.stopPropagation();
        updateTodo({ completed: !todo.completed });
      }}
    >
      <div className={cn(
        "h-1.5 w-1.5 rounded-full shrink-0",
        todo.completed ? "bg-muted-foreground/30" : "bg-primary"
      )} />
      <span className="truncate">{todo.title}</span>
    </div>
  );
}

function TodoListItemDetail({ todo, onDelete }: { todo: ITodo, onDelete: () => void }) {
  const { mutate: updateTodo } = useUpdateTodo(todo._id);

  return (
    <div className="flex items-center justify-between rounded-lg border border-border/50 bg-card p-2.5 transition-colors hover:bg-accent/50 group">
      <div className="flex items-center gap-3">
        <button
          onClick={() => updateTodo({ completed: !todo.completed })}
          className="transition-transform active:scale-95"
        >
          {todo.completed ? (
            <CheckCircle2 className="h-4 w-4 text-primary" />
          ) : (
            <Circle className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
        <span className={cn(
          "text-sm",
          todo.completed && "text-muted-foreground line-through opacity-70"
        )}>
          {todo.title}
        </span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
        onClick={onDelete}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}

// Utility for fetching todos by month
function useGetTodosByMonth(month: string) {
  return useTodosByMonth(month);
}
