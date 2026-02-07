import { motion } from "framer-motion";
import { ArrowRight, Linkedin, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/useProfile";
import { supabase } from "@/integrations/supabase/client";

export default function HeroSection() {
  const { data: profile } = useProfile();

  return (
    <section className="relative bg-primary text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-navy-light opacity-90" />
      <div className="section-container relative z-10 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm font-medium tracking-widest uppercase opacity-80 mb-4">
              Welcome
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-4">
              {profile?.full_name || "Mauricio Marcon Teles"}
            </h1>
            <p className="text-lg md:text-xl font-light opacity-90 mb-3">
              {profile?.title || "Technical Project Manager | Solutions Architect | AI Developer"}
            </p>
            <p className="text-base opacity-75 mb-8 max-w-lg">
              {profile?.tagline || "Building intelligent solutions at the intersection of technology and business strategy."}
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="gap-2 font-medium"
              >
                <Link to="/projects">
                  View My Work <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="flex items-center gap-4">
              {profile?.linkedin_url && (
                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-70 hover:opacity-100 transition-opacity"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {profile?.github_url && (
                <a
                  href={profile.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-70 hover:opacity-100 transition-opacity"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden md:flex justify-center"
          >
            {profile?.photo_url ? (
              <img
                src={profile.photo_url}
                alt={profile.full_name}
                className="w-72 h-72 rounded-full object-cover border-4 border-primary-foreground/20 shadow-2xl"
              />
            ) : (
              <div className="w-72 h-72 rounded-full bg-primary-foreground/10 border-4 border-primary-foreground/20 flex items-center justify-center">
                <span className="text-6xl font-serif opacity-40">
                  {(profile?.full_name || "M")[0]}
                </span>
              </div>
            )}
          </motion.div>
        </div>

        {/* Stats cards */}
        {profile?.hero_stats && profile.hero_stats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {profile.hero_stats.map((stat, i) => (
              <div
                key={i}
                className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-4 text-center border border-primary-foreground/10"
              >
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm opacity-70 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
