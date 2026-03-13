import { Badge } from "@/components/ui/badge";
import type { SkillCategory } from "@/config/resume";
import { cn } from "@/lib/utils";

interface SkillBadgeProps {
  name: string;
  className?: string;
}

export function SkillBadge({ name, className }: SkillBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "px-3 py-1.5 text-sm font-medium transition-all duration-200 hover:bg-primary/10 hover:text-primary",
        className
      )}
    >
      {name}
    </Badge>
  );
}

interface TechStackGridProps {
  categories: SkillCategory[];
}

export function TechStackGrid({ categories }: TechStackGridProps) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {categories.map((category) => (
        <div key={category.category} className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {category.category}
            <span className="ml-2 inline-block h-px w-6 bg-primary align-middle" />
          </h3>
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill) => (
              <SkillBadge key={skill.name} name={skill.name} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
