"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Loader2, Lock } from "lucide-react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FormInput } from "@/components/form-field/form-input";
import { loginSchema, LoginValues } from "@/validations/auth.schema";
import { AlertCircle } from "lucide-react";
import { useLogin } from "@/hooks/mutation/use-auth";

export default function LoginPage() {
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
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-100">
        <div className="flex flex-col space-y-2 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-2">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome Back</h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>

        <Card className="glass border-border/40 shadow-xl overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

          <CardHeader className="relative pb-0">
            <CardTitle className="gradient-text text-xl text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Provide your information below to continue
            </CardDescription>

            {error && (
              <div className="mt-4 flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-xs text-destructive animate-in fade-in slide-in-from-top-1 duration-300">
                <AlertCircle className="h-4 w-4" />
                <p>{(error as any).message || "An error occurred"}</p>
              </div>
            )}
          </CardHeader>

          <CardContent className="relative">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormInput
                  name="email"
                  label="Email"
                  placeholder="name@example.com"
                  type="email"
                  autoComplete="email"
                  disabled={isPending}
                />
                <FormInput
                  name="password"
                  label="Password"
                  placeholder="••••••••"
                  type="password"
                  autoComplete="current-password"
                  disabled={isPending}
                />
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter className="relative border-t border-border/40 bg-muted/30 pt-4 flex flex-col space-y-2">
            <div className="flex items-center justify-between w-full text-xs">
              <span className="text-muted-foreground">Don&apos;t have an account?</span>
              <Link href="#" className="text-primary hover:underline font-medium">
                Contact Admin
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
