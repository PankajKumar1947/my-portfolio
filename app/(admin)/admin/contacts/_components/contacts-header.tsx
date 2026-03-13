"use client";

interface ContactsHeaderProps {
  title: string;
  description: string;
}

export function ContactsHeader({ title, description }: ContactsHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
