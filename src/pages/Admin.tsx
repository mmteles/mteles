import { useState } from "react";
import { LogOut, User, FolderOpen, Clock, FileText, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import ProfileManager from "@/components/admin/ProfileManager";
import ProjectsManager from "@/components/admin/ProjectsManager";
import TimelineManager from "@/components/admin/TimelineManager";
import ResumeManager from "@/components/admin/ResumeManager";
import MessagesManager from "@/components/admin/MessagesManager";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "timeline", label: "Timeline", icon: Clock },
  { id: "resume", label: "Resume", icon: FileText },
  { id: "messages", label: "Messages", icon: MessageSquare },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function Admin() {
  const { signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<TabId>("profile");

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Top bar */}
      <header className="bg-primary text-primary-foreground">
        <div className="section-container flex items-center justify-between h-14">
          <h1 className="font-serif text-lg font-semibold">Admin Dashboard</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={signOut}
            className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <div className="section-container py-8">
        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto mb-8 bg-muted rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors",
                activeTab === tab.id
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === "profile" && <ProfileManager />}
        {activeTab === "projects" && <ProjectsManager />}
        {activeTab === "timeline" && <TimelineManager />}
        {activeTab === "resume" && <ResumeManager />}
        {activeTab === "messages" && <MessagesManager />}
      </div>
    </div>
  );
}
