import { Linkedin, Github, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function Footer() {
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await supabase.from("profiles").select("*").limit(1).maybeSingle();
      return data;
    },
  });

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="section-container py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-serif text-lg font-semibold">
              {profile?.full_name || "Mauricio Marcon Teles"}
            </p>
            <p className="text-sm opacity-80 mt-1">
              {profile?.title || "Technical Project Manager | Solutions Architect | AI Developer"}
            </p>
          </div>
          <div className="flex items-center gap-4">
            {profile?.linkedin_url && (
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-80 hover:opacity-100 transition-opacity"
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
                className="opacity-80 hover:opacity-100 transition-opacity"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            )}
            <Link
              to="/contact"
              className="opacity-80 hover:opacity-100 transition-opacity"
              aria-label="Contact"
            >
              <Mail className="h-5 w-5" />
            </Link>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-primary-foreground/20 text-center">
          <p className="text-sm opacity-60">
            © {new Date().getFullYear()} {profile?.full_name || "Mauricio Marcon Teles"}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
