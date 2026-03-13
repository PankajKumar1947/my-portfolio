"use client";

import { LoginInfoPanel } from "./_components/login-info-panel";
import { LoginForm } from "./_components/login-form";

export default function LoginPage() {
  return (
    <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-[2rem] bg-card text-card-foreground shadow-2xl flex flex-col md:flex-row shadow-primary/10">
      <LoginInfoPanel />
      <LoginForm />
    </div>
  );
}
