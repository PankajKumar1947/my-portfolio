import { Key, Mail, Lock } from "lucide-react";

export function LoginInfoPanel() {
  return (
    <div className="w-full md:w-1/2 p-12 flex flex-col justify-center items-center text-center space-y-8 border-b md:border-b-0 md:border-r border-border">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Welcome to <br />
          <span className="text-primary dark:text-[#0096ff]">Portfolio Admin</span>
        </h1>
        <p className="text-muted-foreground font-medium italic">
          "Your professional presence, managed simply"
        </p>
        <div className="h-1 w-20 bg-primary dark:bg-[#0096ff] mx-auto rounded-full mt-4" />
      </div>

      <div className="bg-muted/50 p-6 rounded-2xl border border-border w-full max-w-sm space-y-3">
        <div className="flex items-center gap-2 justify-center text-primary font-semibold text-sm">
          <Key className="h-4 w-4" />
          Environment Setup
        </div>
        <p className="text-[13px] text-muted-foreground leading-relaxed">
          This panel uses credentials stored in your{" "}
          <code className="px-1.5 py-0.5 rounded bg-muted dark:bg-accent/20 border border-border font-mono text-primary dark:text-[#0096ff] text-xs">
            .env
          </code>{" "}
          file:
        </p>
        <div className="flex flex-col gap-2 font-mono text-[12px] pt-1">
          <div className="flex items-center gap-2 text-muted-foreground justify-center">
            <Mail className="h-3.5 w-3.5 text-primary dark:text-[#0096ff]" />
            <span>ADMIN_EMAIL</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground justify-center">
            <Lock className="h-3.5 w-3.5 text-primary dark:text-[#0096ff]" />
            <span>ADMIN_PASSWORD</span>
          </div>
        </div>
      </div>
    </div>
  );
}
