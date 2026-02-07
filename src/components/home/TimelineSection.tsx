import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { useTimeline } from "@/hooks/useTimeline";

export default function TimelineSection() {
  const { data: entries = [] } = useTimeline();

  return (
    <section id="experience" className="py-20 bg-muted/50">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-2">
            Career
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-12">
            Experience & Education
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          <div className="space-y-12">
            {entries.map((entry, index) => {
              const isLeft = index % 2 === 0;
              const Icon =
                entry.entry_type === "education" ? GraduationCap : Briefcase;

              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-start gap-4 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Icon dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary flex items-center justify-center z-10 shadow-md">
                    <Icon className="h-5 w-5 text-primary-foreground" />
                  </div>

                  {/* Content card */}
                  <div
                    className={`ml-16 md:ml-0 md:w-[calc(50%-3rem)] ${
                      isLeft ? "md:pr-8 md:text-right" : "md:pl-8"
                    }`}
                  >
                    <div className="bg-card rounded-lg p-6 shadow-sm border">
                      <div className="flex items-center gap-2 mb-1 text-sm text-muted-foreground">
                        <span>{entry.start_date}</span>
                        <span>—</span>
                        <span>{entry.end_date || "Present"}</span>
                      </div>
                      <h3 className="text-lg font-semibold font-sans text-foreground">
                        {entry.title}
                      </h3>
                      <p className="text-sm font-medium text-slate-blue mb-2">
                        {entry.organization}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {entry.description}
                      </p>
                    </div>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden md:block md:w-[calc(50%-3rem)]" />
                </motion.div>
              );
            })}
          </div>

          {entries.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              Experience and education entries will appear here once added via the admin panel.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
