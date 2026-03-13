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
} from "date-fns";
import { useTodosByMonth } from "@/hooks/query/use-todo";
import { CalendarHeader } from "./_components/calendar-header";
import { CalendarGrid } from "./_components/calendar-grid";
import { TodoDialog } from "./_components/todo-dialog";

export default function PlannerPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

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

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const handleToday = () => setCurrentDate(new Date());

  const handleAddTask = () => {
    setSelectedDay(new Date());
    setIsDialogOpen(true);
  };

  const handleDayClick = (day: Date) => {
    setSelectedDay(day);
    setIsDialogOpen(true);
  };

  return (
    <div className="flex h-[calc(100vh-12rem)] flex-col space-y-4">
      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onToday={handleToday}
        onAddTask={handleAddTask}
      />

      <CalendarGrid
        calendarDays={calendarDays}
        monthStart={monthStart}
        todos={todos}
        onDayClick={handleDayClick}
      />

      <TodoDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        selectedDay={selectedDay}
        todos={todos}
      />
    </div>
  );
}
