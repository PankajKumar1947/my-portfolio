import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { profileInfo } from "@/lib/mock-data";

const socialLinks = [
  { icon: Github, href: profileInfo.socials.github, label: "GitHub" },
  { icon: Linkedin, href: profileInfo.socials.linkedin, label: "LinkedIn" },
  { icon: Twitter, href: profileInfo.socials.twitter, label: "Twitter" },
  { icon: Mail, href: `mailto:${profileInfo.email}`, label: "Email" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/50">
      <div className="mx-auto max-w-(--max-width) px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          {/* Logo & tagline */}
          <div className="text-center md:text-left">
            <Link
              href="/"
              className="gradient-text text-lg font-bold tracking-tight"
            >
              &lt;Pankaj /&gt;
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">
              {profileInfo.tagline}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label={social.label}
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <Separator className="my-6 opacity-50" />

        <p className="text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {profileInfo.name}. Built with
          Next.js & shadcn/ui.
        </p>
      </div>
    </footer>
  );
}
