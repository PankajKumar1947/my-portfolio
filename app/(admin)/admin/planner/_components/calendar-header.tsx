"use client";

import { format } from "date-fns";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CalendarHeaderProps {
  currentDate: Date;
  view: "month" | "day";
  onViewChange: (view: "month" | "day") => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  onAddTask: () => void;
}

export function CalendarHeader({
  currentDate,
  view,
  onViewChange,
  onPrevMonth,
  onNextMonth,
  onToday,
  onAddTask,
} : CalendarHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold tracking-tight bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent capitalize">
          {format(currentDate, view === "month" ? "MMMM yyyy" : "MMMM d, yyyy")}
        </h1>
        <div className="flex items-center gap-1 rounded-lg border border-border bg-muted p-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-accent/10 transition-colors" onClick={onPrevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 px-3 text-xs font-semibold hover:bg-accent/10 transition-colors" onClick={onToday}>
            Today
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-accent/10 transition-colors" onClick={onNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Tabs value={view} onValueChange={(v) => onViewChange(v as "month" | "day")} className="w-50">
          <TabsList className="grid w-full grid-cols-2 bg-muted border border-border">
            <TabsTrigger value="month" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Month</TabsTrigger>
            <TabsTrigger value="day" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Day</TabsTrigger>
          </TabsList>
        </Tabs>

        <Button size="sm" onClick={onAddTask} className="shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
          <Plus className="mr-2 h-4 w-4" /> Add Task
        </Button>
      </div>
    </div>
  );
}
