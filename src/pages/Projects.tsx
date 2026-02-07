import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import Layout from "@/components/layout/Layout";
import ProjectCard from "@/components/projects/ProjectCard";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useProjects } from "@/hooks/useProjects";
import { cn } from "@/lib/utils";

export default function Projects() {
  const { data: projects = [] } = useProjects();
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach((p) => p.tags.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, [projects]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.short_description.toLowerCase().includes(search.toLowerCase());
      const matchTag = !activeTag || p.tags.includes(activeTag);
      return matchSearch && matchTag;
    });
  }, [projects, search, activeTag]);

  return (
    <Layout>
      <section className="py-20 bg-background">
        <div className="section-container">
          <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-2">
            Portfolio
          </p>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-8">
            Projects
          </h1>

          {/* Search & Filters */}
          <div className="mb-8 space-y-4">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={activeTag === null ? "default" : "secondary"}
                  className="cursor-pointer"
                  onClick={() => setActiveTag(null)}
                >
                  All
                </Badge>
                {allTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={activeTag === tag ? "default" : "secondary"}
                    className="cursor-pointer"
                    onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Projects grid */}
          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-16">
              {projects.length === 0
                ? "Projects will appear here once added via the admin panel."
                : "No projects match your search."}
            </p>
          )}
        </div>
      </section>
    </Layout>
  );
}
