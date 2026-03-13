"use client";

import { format, isSameDay, isSameMonth, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { ITodo } from "@/types/todo.types";
import { TodoItem } from "./todo-item";

interface CalendarDayProps {
  day: Date;
  monthStart: Date;
  todos: ITodo[];
  onClick: () => void;
}

export function CalendarDay({ day, monthStart, todos, onClick }: CalendarDayProps) {
  const dayTodos = todos.filter((t) => isSameDay(parseISO(t.date), day));
  const isCurrentMonth = isSameMonth(day, monthStart);
  const isToday = isSameDay(day, new Date());

  return (
    <div
      className={cn(
        "relative flex flex-col p-2 transition-colors hover:bg-accent/5 cursor-pointer min-h-25",
        !isCurrentMonth && "bg-muted/30 text-muted-foreground/50"
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-1">
        <span
          className={cn(
            "text-sm font-medium h-7 w-7 flex items-center justify-center rounded-full",
            isToday && "bg-primary text-primary-foreground font-bold shadow-sm"
          )}
        >
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
          <TodoItem key={todo._id} todo={todo} variant="small" />
        ))}
        {dayTodos.length > 3 && (
          <div className="text-[10px] text-muted-foreground px-2">
            +{dayTodos.length - 3} more
          </div>
        )}
      </div>
    </div>
  );
}
