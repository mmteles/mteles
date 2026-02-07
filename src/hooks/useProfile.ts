import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Profile {
  id: string;
  full_name: string;
  title: string;
  tagline: string;
  bio: string;
  photo_url: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  email: string | null;
  hero_stats: Array<{ label: string; value: string }>;
}

export function useProfile() {
  return useQuery<Profile | null>({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      if (!data) return null;
      return {
        ...data,
        hero_stats: (data.hero_stats as Array<{ label: string; value: string }>) || [],
      };
    },
  });
}
