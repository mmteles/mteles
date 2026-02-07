import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProject, useProjectMedia } from "@/hooks/useProjects";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: project, isLoading } = useProject(id || "");
  const { data: media = [] } = useProjectMedia(id || "");

  if (isLoading) {
    return (
      <Layout>
        <div className="section-container py-32 text-center text-muted-foreground">
          Loading...
        </div>
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout>
        <div className="section-container py-32 text-center">
          <p className="text-muted-foreground mb-4">Project not found.</p>
          <Button asChild variant="outline">
            <Link to="/projects">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="py-20 bg-background">
        <div className="section-container max-w-4xl">
          <Button asChild variant="ghost" className="mb-8 -ml-2">
            <Link to="/projects">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Link>
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
              {project.title}
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex gap-3 mb-8">
              {project.demo_url && (
                <Button asChild variant="default" size="sm">
                  <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Live Demo
                  </a>
                </Button>
              )}
              {project.github_url && (
                <Button asChild variant="outline" size="sm">
                  <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    Source Code
                  </a>
                </Button>
              )}
            </div>

            {/* Description */}
            <div className="prose prose-slate max-w-none mb-10">
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {project.description}
              </p>
            </div>

            {/* Features */}
            {project.features.length > 0 && (
              <div className="mb-10">
                <h2 className="text-xl font-serif font-semibold text-foreground mb-4">
                  Key Features
                </h2>
                <ul className="space-y-2">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Media gallery */}
            {media.length > 0 && (
              <div>
                <h2 className="text-xl font-serif font-semibold text-foreground mb-4">
                  Gallery
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {media.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-lg overflow-hidden border bg-muted"
                    >
                      {item.file_type === "video" ? (
                        <video
                          src={item.file_url}
                          controls
                          className="w-full"
                        />
                      ) : (
                        <img
                          src={item.file_url}
                          alt=""
                          className="w-full h-auto"
                          loading="lazy"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </article>
    </Layout>
  );
}
