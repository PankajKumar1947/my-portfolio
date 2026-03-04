"use client";

import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface FormSwitchProps {
  name: string;
  label: string;
  description?: string;
  className?: string;
}

export function FormSwitch({
  name,
  label,
  description,
  className,
}: FormSwitchProps) {
  const { control } = useFormContext() || {};

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex flex-row items-center justify-between rounded-lg border border-border/50 p-4 shadow-xs bg-muted/20", className)}>
          <div className="space-y-0.5">
            <FormLabel className="text-sm font-medium">{label}</FormLabel>
            {description && <FormDescription className="text-xs">{description}</FormDescription>}
          </div>
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
