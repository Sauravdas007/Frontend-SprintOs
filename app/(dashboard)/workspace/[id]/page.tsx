"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, getInitials } from "@/lib/utils";
import {
  FolderKanban,
  Users,
  Settings,
  Plus,
  ArrowRight,
  Clock,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

const projects = [
  { id: "1", name: "AI SprintOS Platform", description: "Main product development", status: "active", tasks: 45, completed: 32, members: 5 },
  { id: "2", name: "Mobile App", description: "iOS and Android clients", status: "active", tasks: 28, completed: 12, members: 3 },
  { id: "3", name: "Design System", description: "Component library and tokens", status: "paused", tasks: 15, completed: 15, members: 2 },
  { id: "4", name: "API Gateway", description: "Microservices orchestration", status: "active", tasks: 38, completed: 25, members: 4 },
];

const members = [
  { id: "1", name: "Alice", role: "ADMIN", avatar: "" },
  { id: "2", name: "Bob", role: "MANAGER", avatar: "" },
  { id: "3", name: "Charlie", role: "DEVELOPER", avatar: "" },
  { id: "4", name: "Diana", role: "DEVELOPER", avatar: "" },
  { id: "5", name: "Eve", role: "DEVELOPER", avatar: "" },
];

export default function WorkspacePage({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold">Engineering Workspace</h1>
            <Badge variant="outline">PRO</Badge>
          </div>
          <p className="text-sm text-muted-foreground">4 projects · 5 members · Created Nov 2024</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Users className="h-4 w-4" />
            Invite
          </Button>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Tasks", value: "126", icon: FolderKanban, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: "Completed", value: "84", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10" },
          { label: "Active Sprints", value: "3", icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10" },
          { label: "Velocity", value: "58 pts", icon: TrendingUp, color: "text-violet-500", bg: "bg-violet-500/10" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className={cn("p-1.5 rounded", stat.bg)}>
                    <stat.icon className={cn("h-4 w-4", stat.color)} />
                  </div>
                  <span className="text-xs text-muted-foreground">{stat.label}</span>
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Projects */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Projects</h2>
            <Button variant="ghost" size="sm" className="gap-1">
              View All <ArrowRight className="h-3 w-3" />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/project/${project.id}`}>
                  <Card className="hover:shadow-md transition-all cursor-pointer group">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold group-hover:text-primary transition-colors">{project.name}</h3>
                            <Badge variant={project.status === "active" ? "default" : "secondary"} className="text-[10px]">
                              {project.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{project.description}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                        <span>{project.tasks} tasks</span>
                        <span>{project.completed} done</span>
                        <span>{project.members} members</span>
                        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${(project.completed / project.tasks) * 100}%` }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Members */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="h-4 w-4" />
              Team Members
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {members.map((member) => (
              <div key={member.id} className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback className="text-xs">{getInitials(member.name)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
                <Badge variant="outline" className="text-[10px]">{member.role}</Badge>
              </div>
            ))}
            <Button variant="outline" className="w-full gap-2 mt-2">
              <Plus className="h-3 w-3" />
              Invite Member
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


