import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { profile } from "@/config/profile";

const socialLinks = [
  { icon: Github, href: profile.socials.github, label: "GitHub" },
  { icon: Linkedin, href: profile.socials.linkedin, label: "LinkedIn" },
  { icon: Twitter, href: profile.socials.twitter, label: "Twitter" },
  { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
];

export function Footer() {
  return (
    <footer className="">
      <div className="mx-auto max-w-(--max-width) border-t border-border/40 px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          {/* Logo & tagline */}
          <div className="text-center md:text-left">
            <Link
              href="/"
              className="gradient-text text-lg font-bold tracking-tight"
            >
              &lt;{profile.logoText} /&gt;
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">
              {profile.tagline}
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

        <p className="text-center text-sm p-4 rounded-lg bg-muted/50">
          &copy; {new Date().getFullYear()} {profile.name}. Built by <Link target="_blank" className="text-yellow-500" href={"https://github.com/pankajkumar1947"}>Pankaj Kumar</Link>
        </p>
      </div>
    </footer>
  );
}
