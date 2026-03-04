"use client";

import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface FormTextareaProps extends Omit<React.ComponentProps<typeof Textarea>, "name"> {
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  className?: string;
}

export function FormTextarea({
  name,
  label,
  placeholder,
  description,
  className,
  ...props
}: FormTextareaProps) {
  const { control } = useFormContext() || {};

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              className={cn("min-h-20 resize-none", className)}
              {...field}
              {...props}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}