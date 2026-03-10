import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoaderProps {
  className?: string;
  size?: number;
  fullPage?: boolean;
}

export function Loader({ className, size = 32, fullPage = false }: LoaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center",
        fullPage ? "h-[calc(100vh-200px)] w-full" : "h-64",
        className
      )}
    >
      <Loader2
        className="animate-spin text-primary"
        size={size}
      />
    </div>
  );
}
