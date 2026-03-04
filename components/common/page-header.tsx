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
    <div className={cn("mb-10 pt-24 pb-8", className)}>
      <div className="mx-auto max-w-(--max-width) px-4 sm:px-6 lg:px-8">
        <h1
          className={cn(
            "text-3xl font-bold tracking-tight sm:text-4xl",
            gradient && "gradient-text"
          )}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}
