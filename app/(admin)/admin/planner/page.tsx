import { Metadata } from "next";
import { Suspense } from "react";
import { PlannerShell } from "./_components/planner-shell";

export const metadata: Metadata = {
  title: "Planner | Admin",
  description: "Manage your daily tasks and schedule.",
};

export default function PlannerPage() {
  return (
    <Suspense fallback={<div className="flex h-full items-center justify-center">Loading planner...</div>}>
      <PlannerShell />
    </Suspense>
  );
}
