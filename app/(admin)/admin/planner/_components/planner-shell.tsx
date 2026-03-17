"use client";

import { useState, useMemo } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addMonths,
  subMonths,
  addDays,
  subDays,
} from "date-fns";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTodosByMonth } from "@/hooks/query/use-todo";
import { CalendarHeader } from "./calendar-header";
import { CalendarGrid } from "./calendar-grid";
import { TodoDialog } from "./todo-dialog";
import { KanbanView } from "./kanban-view";

export function PlannerShell() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Get state from URL
  const view = (searchParams.get("view") as "month" | "day") || "month";
  const dateParam = searchParams.get("date");
  const currentDate = useMemo(() => {
    if (!dateParam) return new Date();
    const parsed = new Date(dateParam);
    return isNaN(parsed.getTime()) ? new Date() : parsed;
  }, [dateParam]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const updateURL = (params: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      newParams.set(key, value);
    });
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const setView = (newView: "month" | "day") => {
    updateURL({ view: newView });
  };

  const setCurrentDate = (newDate: Date) => {
    updateURL({ date: format(newDate, "yyyy-MM-dd") });
  };

  const monthStr = useMemo(() => format(currentDate, "yyyy-MM"), [currentDate]);
  const { data: todos = [] } = useTodosByMonth(monthStr);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const handlePrev = () => {
    if (view === "month") setCurrentDate(subMonths(currentDate, 1));
    else setCurrentDate(subDays(currentDate, 1));
  };

  const handleNext = () => {
    if (view === "month") setCurrentDate(addMonths(currentDate, 1));
    else setCurrentDate(addDays(currentDate, 1));
  };

  const handleToday = () => setCurrentDate(new Date());

  const handleAddTask = () => {
    setSelectedDay(currentDate);
    setIsDialogOpen(true);
  };

  const handleDayClick = (day: Date) => {
    setSelectedDay(day);
    setIsDialogOpen(true);
  };

  return (
    <div className="flex h-[calc(100vh-10rem)] flex-col space-y-6 overflow-hidden">
      <div className="shrink-0 bg-background/80 backdrop-blur-md pb-2 px-1 dark:bg-background/50">
        <CalendarHeader
          currentDate={currentDate}
          view={view}
          onViewChange={setView}
          onPrevMonth={handlePrev}
          onNextMonth={handleNext}
          onToday={handleToday}
          onAddTask={handleAddTask}
        />
      </div>

      <div className="flex-1 overflow-hidden rounded-xl border border-border/50 bg-background shadow-2xl relative dark:bg-card/5">
        {view === "month" ? (
          <CalendarGrid
            calendarDays={calendarDays}
            monthStart={monthStart}
            todos={todos}
            onDayClick={handleDayClick}
          />
        ) : (
          <KanbanView date={currentDate} todos={todos} />
        )}
      </div>

      <TodoDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        selectedDay={selectedDay}
        todos={todos}
      />
    </div>
  );
}
