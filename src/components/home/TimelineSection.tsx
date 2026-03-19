import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, GraduationCap, Plus, Minus } from "lucide-react";
import { useTimeline } from "@/hooks/useTimeline";

export default function TimelineSection() {
  const { data: entries = [] } = useTimeline();
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

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
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          <div className="space-y-12">
            {entries.map((entry, index) => {
              const isLeft = index % 2 === 0;
              const Icon =
                entry.entry_type === "education" ? GraduationCap : Briefcase;
              const isExpanded = expandedIds.has(entry.id);

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
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary flex items-center justify-center z-10 shadow-md">
                    <Icon className="h-5 w-5 text-primary-foreground" />
                  </div>

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
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="text-lg font-semibold font-sans text-foreground">
                            {entry.title}
                          </h3>
                          <p className="text-sm font-medium text-slate-blue">
                            {entry.organization}
                          </p>
                        </div>
                        <button
                          onClick={() => toggleExpand(entry.id)}
                          className="shrink-0 mt-1 w-7 h-7 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                          aria-label={isExpanded ? "Collapse details" : "Expand details"}
                        >
                          {isExpanded ? (
                            <Minus className="h-4 w-4 text-primary" />
                          ) : (
                            <Plus className="h-4 w-4 text-primary" />
                          )}
                        </button>
                      </div>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <p className="text-sm text-muted-foreground leading-relaxed mt-3 pt-3 border-t border-border">
                              {entry.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

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
