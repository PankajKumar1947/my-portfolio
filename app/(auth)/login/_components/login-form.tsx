"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, AlertCircle } from "lucide-react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form-field/form-input";
import { loginSchema, LoginValues } from "@/validations/auth.schema";
import { useLogin } from "@/hooks/mutation/use-auth";

export function LoginForm() {
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: login, isPending, error } = useLogin();

  function onSubmit(data: LoginValues) {
    login(data);
  }

  return (
    <div className="w-full md:w-1/2 p-8 md:p-12 bg-muted/20 flex flex-col justify-center items-center">
      <div className="w-full max-w-96 space-y-6 bg-card p-8 rounded-3xl shadow-sm border border-border">
        <div className="text-center space-y-2 pb-2">
          <h2 className="text-2xl font-bold text-foreground">Admin Login</h2>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to access the portfolio dashboard
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 rounded-xl border border-destructive/20 bg-destructive/10 p-4 text-xs text-destructive animate-in fade-in slide-in-from-top-1 duration-300">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <p className="font-medium">
              {(error as any).message || "Invalid credentials. Please try again."}
            </p>
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4">
              <FormInput
                name="email"
                label="Email"
                placeholder="admin@example.com"
                type="email"
                autoComplete="email"
                disabled={isPending}
                className="bg-background/80 dark:bg-muted/50"
              />
              <FormInput
                name="password"
                label="Password"
                placeholder="••••••••"
                type="password"
                autoComplete="current-password"
                disabled={isPending}
                className="bg-background/80 dark:bg-muted/50"
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl shadow-md transition-all active:scale-[0.98]"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
