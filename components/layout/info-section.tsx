import { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const infoSectionVariants = cva("space-y-4", {
  variants: {
    variant: {
      default: "",
      clean: "space-y-2",
      ghost: "space-y-2",
      bordered: "",
      filled: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const contentVariants = cva("", {
  variants: {
    variant: {
      default: "rounded-xl border border-border bg-card p-5 shadow-sm",
      clean: "px-6 bg-transparent border-none shadow-none",
      ghost: "px-6 bg-transparent border-none shadow-none",
      bordered: "rounded-xl border border-border bg-transparent p-5",
      filled: "rounded-xl bg-muted/40 p-5 border-none shadow-none",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const titleVariants = cva("font-bold transition-all flex items-center", {
  variants: {
    variant: {
      default: "text-primary/90 px-1",
      clean: "text-primary bg-primary/5 py-2 px-4 rounded-lg border-l-4 border-primary mb-6",
      ghost: "text-primary/70 px-1 border-l-2 border-primary/30 pl-3",
      bordered: "text-primary px-1",
      filled: "text-primary/90 px-1",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface InfoSectionProps extends VariantProps<typeof infoSectionVariants> {
  title?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

export function InfoSection({
  title,
  children,
  className,
  contentClassName,
  variant
}: InfoSectionProps) {
  return (
    <div className={cn(infoSectionVariants({ variant, className }))}>
      {title && (
        <h3 className={cn(titleVariants({ variant }))}>
          {title}
        </h3>
      )}
      <div className={cn(contentVariants({ variant }), contentClassName)}>
        {children}
      </div>
    </div>
  );
}