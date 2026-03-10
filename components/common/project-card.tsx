import { ExternalLink, Github } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IProject } from "@/types/project.types";

interface ProjectCardProps {
  project: IProject;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="card-glow group flex flex-col overflow-hidden border-border bg-card transition-all duration-300 hover:-translate-y-1">
      {/* Image placeholder */}
      <div className="relative h-48 overflow-hidden bg-linear-to-br from-primary/20 to-primary/5">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold text-primary/20">
            {project.title.charAt(0)}
          </span>
        </div>
        {project.featured && (
          <Badge className="absolute top-3 right-3 bg-primary/90 text-primary-foreground">
            Featured
          </Badge>
        )}
      </div>

      <CardHeader className="pb-3">
        <h3 className="line-clamp-1 text-lg font-semibold">{project.title}</h3>
      </CardHeader>

      <CardContent className="flex-1 pb-3">
        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {(project.tags || "")
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
            .map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs font-normal"
              >
                {tag}
              </Badge>
            ))}
        </div>
      </CardContent>

      <CardFooter className="gap-2 pt-0">
        <Button variant="outline" size="sm" asChild className="flex-1">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="mr-1.5 h-3.5 w-3.5" />
            Code
          </a>
        </Button>
        {project.liveUrl && (
          <Button size="sm" asChild className="flex-1">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
              Live
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
