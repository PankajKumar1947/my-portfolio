"use client";

import { useDataTable } from "@/hooks/use-data-table";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { DataTableSortList } from "@/components/data-table/data-table-sort-list";
import { boardColumns } from "./_components/board-columns";
import { BoardForm } from "./_components/board-form";
import { useBoards } from "@/hooks/query/use-board";
import { Loader } from "@/components/common/loader";

export default function AdminBoardPage() {
  const { data: boards, isLoading } = useBoards();

  const { table } = useDataTable({
    data: boards || [],
    columns: boardColumns,
    pageCount: Math.ceil((boards?.length || 0) / 10),
  });

  if (isLoading) {
    return (
      <div className="flex h-112.5 items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-6 rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Boards</h1>
          <p className="text-sm text-muted-foreground">
            Manage your project whiteboards and discussions.
          </p>
        </div>
        <BoardForm />
      </div>

      <DataTable table={table}>
        <DataTableToolbar table={table}>
          <DataTableSortList table={table} />
        </DataTableToolbar>
      </DataTable>
    </div>
  );
}
