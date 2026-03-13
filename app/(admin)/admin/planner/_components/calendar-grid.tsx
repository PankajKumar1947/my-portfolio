"use client";

import { CalendarDay } from "./calendar-day";
import { ITodo } from "@/types/todo.types";

interface CalendarGridProps {
  calendarDays: Date[];
  monthStart: Date;
  todos: ITodo[];
  onDayClick: (day: Date) => void;
}

export function CalendarGrid({
  calendarDays,
  monthStart,
  todos,
  onDayClick,
}: CalendarGridProps) {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="flex-1 overflow-hidden rounded-xl border border-border/50 bg-card shadow-sm">
      {/* Weekday Headers */}
      <div className="grid grid-cols-7 border-b border-border/50 divide-x divide-border/50">
        {weekDays.map((day) => (
          <div
            key={day}
            className="py-2 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 h-full divide-x divide-y divide-border/50 border-b border-r border-border/50">
        {calendarDays.map((day) => (
          <CalendarDay
            key={day.toString()}
            day={day}
            monthStart={monthStart}
            todos={todos}
            onClick={() => onDayClick(day)}
          />
        ))}
      </div>
    </div>
  );
}
