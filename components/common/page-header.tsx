import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  gradient?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  gradient = false,
  className,
  children,
}: PageHeaderProps) {
  return (
    <div className={cn("mb-10 pt-24", className)}>
      <div className="mx-auto max-w-(--max-width) px-4 sm:px-6 lg:px-8">
        <h1
          className={cn(
            "text-xl font-bold tracking-tight sm:text-2xl",
            gradient && "gradient-text"
          )}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 text-sm text-muted-foreground">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}
