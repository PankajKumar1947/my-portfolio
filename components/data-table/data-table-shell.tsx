"use client";

import * as React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { useDataTable } from "@/hooks/use-data-table";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { DataTableSortList } from "@/components/data-table/data-table-sort-list";
import { Loader } from "@/components/common/loader";
import { UseQueryResult } from "@tanstack/react-query";

interface DataTableShellProps<TData> {
  columns: ColumnDef<TData>[];
  queryHook: () => UseQueryResult<TData[]>;
  title?: string;
  description?: string;
  ActionComponent?: React.ReactNode;
}

export function DataTableShell<TData>({
  columns,
  queryHook,
  title,
  description,
  ActionComponent,
}: DataTableShellProps<TData>) {
  const { data, isLoading } = queryHook();

  const { table } = useDataTable({
    data: data || [],
    columns,
    pageCount: Math.ceil((data?.length || 0) / 10),
  });

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-6 rounded-2xl border border-border bg-card p-6">
      {(title || description || ActionComponent) && (
        <div className="flex items-center justify-between">
          <div>
            {title && <h1 className="text-2xl font-bold tracking-tight">{title}</h1>}
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          {ActionComponent}
        </div>
      )}

      <DataTable table={table}>
        <DataTableToolbar table={table}>
          <DataTableSortList table={table} />
        </DataTableToolbar>
      </DataTable>
    </div>
  );
}
