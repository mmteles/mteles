import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/hooks/useProjects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={`/projects/${project.id}`}
        className="group block bg-card rounded-lg border shadow-sm overflow-hidden hover:shadow-md transition-shadow"
      >
        {project.thumbnail_url ? (
          <div className="aspect-video overflow-hidden bg-muted">
            <img
              src={project.thumbnail_url}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="aspect-video bg-muted flex items-center justify-center">
            <span className="text-4xl font-serif text-muted-foreground/30">
              {project.title[0]}
            </span>
          </div>
        )}
        <div className="p-5">
          <h3 className="font-sans text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {project.short_description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
