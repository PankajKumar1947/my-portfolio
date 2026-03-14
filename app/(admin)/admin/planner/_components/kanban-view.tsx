"use client";

import { useMemo, useState, useEffect } from "react";
import { ITodo } from "@/types/todo.types";
import { format } from "date-fns";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { KanbanColumn } from "./kanban-column";
import { KanbanCard } from "./kanban-card";
import { useUpdateTodo } from "@/hooks/mutation/use-todo";
import { usePlannerDay, useUpsertPlannerDay } from "@/hooks/query/use-planner-day";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { TodoDialog } from "./todo-dialog";
import { RemarkDialog } from "./remark-dialog";

interface KanbanViewProps {
  date: Date;
  todos: ITodo[];
}

const COLUMNS = [
  { id: "planned_today", title: "Planned Today", draggable: true },
  { id: "ongoing", title: "Ongoing", draggable: true },
  { id: "completed", title: "Completed", draggable: true },
  { id: "tomorrow_plan", title: "Tomorrow Plan", draggable: true },
  { id: "remarks", title: "Remarks", draggable: false },
];

export function KanbanView({ date, todos: monthTodos }: KanbanViewProps) {
  const dateStr = format(date, "yyyy-MM-dd");
  const { data: dayData } = usePlannerDay(dateStr);
  const { mutate: upsertRemarks } = useUpsertPlannerDay();
  const { mutate: updateTodo } = useUpdateTodo();

  const [activeTodo, setActiveTodo] = useState<ITodo | null>(null);
  const [localTodos, setLocalTodos] = useState<ITodo[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRemarkDialogOpen, setIsRemarkDialogOpen] = useState(false);
  const [dialogStatus, setDialogStatus] = useState<any>(undefined);

  // Sync local todos when dayData arrives
  useEffect(() => {
    if (dayData?.todos) {
      setLocalTodos(dayData.todos);
    }
  }, [dayData?.todos]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const groupedTodos = useMemo(() => {
    const groups: Record<string, ITodo[]> = {
      planned_today: [],
      ongoing: [],
      completed: [],
      tomorrow_plan: [],
    };

    localTodos.forEach((todo) => {
      // Only show todos for the current date
      if (todo.date !== dateStr) return;

      // Default to "planned_today" if status is missing
      const status = todo.status || "planned_today";
      
      if (groups[status]) {
        groups[status].push(todo);
      }
    });

    return groups;
  }, [localTodos, dateStr]);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const todo = localTodos.find((t) => t._id === active.id);
    if (todo) setActiveTodo(todo);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeTodo = localTodos.find((t) => t._id === activeId);
    if (!activeTodo) return;

    // Check if dropping over a column or another card
    const overColumnId = COLUMNS.find(c => c.id === overId)?.id;
    const overTodo = localTodos.find((t) => t._id === overId);
    const newStatus = overColumnId || overTodo?.status || "date";

    if (activeTodo.status !== newStatus) {
      setLocalTodos((prev) => {
        return prev.map((t) => 
          t._id === activeId ? { ...t, status: newStatus as any } : t
        );
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTodo(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeTodo = localTodos.find((t) => t._id === activeId);
    if (!activeTodo) return;

    const overColumnId = COLUMNS.find(c => c.id === overId)?.id;
    const overTodo = localTodos.find((t) => t._id === overId);
    const finalStatus = overColumnId || overTodo?.status || "date";

    // Update backend
    const updatedStatus = finalStatus === "date" ? undefined : finalStatus;
    updateTodo({ 
      _id: activeId, // Note: I need to ensure useUpdateTodo hook supports passing ID or I use a clever way
      status: updatedStatus as any,
      completed: updatedStatus === "completed"
    } as any);
  };

  const openAddTask = (status: string) => {
    if (status === "remarks") {
      setIsRemarkDialogOpen(true);
    } else {
      setDialogStatus(status);
      setIsDialogOpen(true);
    }
  };

  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex h-full w-full items-stretch gap-6 overflow-x-auto p-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted-foreground/10 hover:scrollbar-thumb-muted-foreground/20 transition-all">
          {COLUMNS.map((column) => {
            if (column.id === "remarks") {
              return (
                <KanbanColumn
                  key={column.id}
                  id={column.id}
                  title={column.title}
                  todos={[]}
                  isDraggable={false}
                  onAddTask={openAddTask}
                >
                  <div className="flex flex-1 flex-col overflow-hidden">
                    <div className="flex-1 space-y-3 overflow-y-auto p-1 scrollbar-thin">
                      {Array.isArray(dayData?.plannerDay?.remarks) ? (
                        dayData.plannerDay.remarks.map((rem: { _id?: string; text: string; createdAt: string }, i: number) => (
                          <div key={rem._id || i} className="rounded-lg bg-muted/30 p-2 border border-border/50">
                            <p className="text-[13px] leading-relaxed text-foreground/90 whitespace-pre-wrap">{rem.text}</p>
                            <span className="mt-1 block text-[9px] font-bold uppercase text-muted-foreground/60 italic">
                              {format(new Date(rem.createdAt), "MMM d, h:mm a")}
                            </span>
                          </div>
                        ))
                      ) : dayData?.plannerDay?.remarks ? (
                        <div className="rounded-lg bg-muted/30 p-2 border border-border/50">
                          <p className="text-[13px] leading-relaxed text-foreground/90 whitespace-pre-wrap">{dayData.plannerDay.remarks as unknown as string}</p>
                          <span className="mt-1 block text-[9px] font-bold uppercase text-muted-foreground/60 italic">
                            Legacy Remark
                          </span>
                        </div>
                      ) : null}
                      {(!dayData?.plannerDay?.remarks || (Array.isArray(dayData.plannerDay.remarks) && dayData.plannerDay.remarks.length === 0)) && (
                        <div className="flex flex-1 items-center justify-center py-12 text-center">
                          <p className="text-xs text-muted-foreground italic">No remarks yet</p>
                        </div>
                      )}
                    </div>
                  </div>
                </KanbanColumn>
              );
            }

            return (
              <KanbanColumn
                key={column.id}
                id={column.id}
                title={column.title}
                todos={groupedTodos[column.id] || []}
                isDraggable={column.draggable}
                onAddTask={openAddTask}
              />
            );
          })}
        </div>

        <DragOverlay dropAnimation={{
          sideEffects: defaultDropAnimationSideEffects({
            styles: {
              active: {
                opacity: '0.5',
              },
            },
          }),
        }}>
          {activeTodo ? (
            <KanbanCard todo={activeTodo} />
          ) : null}
        </DragOverlay>
      </DndContext>

      <TodoDialog 
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        selectedDay={date}
        todos={monthTodos}
        initialStatus={dialogStatus}
      />

      <RemarkDialog
        isOpen={isRemarkDialogOpen}
        onOpenChange={setIsRemarkDialogOpen}
        date={dateStr}
      />
    </div>
  );
}
