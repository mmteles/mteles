import { motion } from "framer-motion";
import { useProfile } from "@/hooks/useProfile";

export default function BioSection() {
  const { data: profile } = useProfile();

  return (
    <section id="about" className="py-20 bg-background">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-2">
            About
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-8">
            Professional Background
          </h2>
          <div className="max-w-3xl">
            <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
              {profile?.bio ||
                "A seasoned technology professional with over 15 years of experience in consulting and project management. Passionate about developing people and processes while leveraging AI and full-stack development to deliver intelligent solutions for complex business challenges."}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
