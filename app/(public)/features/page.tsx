"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  BrainCircuit,
  Zap,
  Shield,
  BarChart3,
  Github,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const featureSections = [
  {
    icon: BrainCircuit,
    title: "AI Task Generator",
    description: "Transform feature descriptions into structured sprint tasks with AI. Get story points, priorities, and technical breakdowns instantly.",
    highlights: [
      "Automatic subtask generation",
      "Story point estimation",
      "Risk analysis & mitigation",
      "Technical implementation guide",
    ],
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: Zap,
    title: "AI Bug Triage",
    description: "Paste stack traces and logs to get instant root cause analysis, severity classification, and suggested fixes.",
    highlights: [
      "Stack trace analysis",
      "Severity auto-classification",
      "Root cause identification",
      "Debugging checklist generation",
    ],
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: BarChart3,
    title: "Sprint Analytics",
    description: "Comprehensive dashboards tracking velocity, completion rates, bug frequency, and team productivity metrics.",
    highlights: [
      "Velocity trend analysis",
      "Burn-down charts",
      "Team productivity scores",
      "AI usage metrics",
    ],
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Github,
    title: "GitHub Integration",
    description: "Seamless two-way sync with GitHub. Link issues to tasks, track PRs, and view commit summaries directly in your sprint board.",
    highlights: [
      "Issue sync & linking",
      "PR status tracking",
      "Commit summaries",
      "Auto-status updates",
    ],
    color: "from-slate-500 to-gray-500",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade security with role-based access control, JWT authentication, and audit logging.",
    highlights: [
      "RBAC with 3 roles",
      "JWT session management",
      "Protected API routes",
      "Activity audit logs",
    ],
    color: "from-emerald-500 to-green-500",
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <nav className="fixed top-0 w-full z-50 border-b bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-lg">SprintOS</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground">Pricing</Link>
            <Link href="/login">
              <Button size="sm" variant="outline">Sign In</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Powerful features for modern teams</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to plan, execute, and analyze sprints with AI assistance.
          </p>
        </div>

        <div className="space-y-20">
          {featureSections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={cn(
                "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center",
                i % 2 === 1 && "lg:flex-row-reverse"
              )}
            >
              <div className={cn(i % 2 === 1 && "lg:order-2")}>
                <div className={cn("h-12 w-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-6", section.color)}>
                  <section.icon className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
                <p className="text-lg text-muted-foreground mb-6">{section.description}</p>
                <ul className="space-y-3">
                  {section.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                      <span className="text-sm">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={cn(
                "rounded-2xl border bg-card p-8 shadow-lg",
                i % 2 === 1 && "lg:order-1"
              )}>
                <div className="space-y-4">
                  <div className="h-4 w-32 rounded bg-muted" />
                  <div className="space-y-3">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="h-16 rounded-lg border bg-background p-3 space-y-2">
                        <div className="h-2 w-24 rounded bg-muted" />
                        <div className="h-2 w-full rounded bg-muted" />
                        <div className="flex gap-2">
                          <div className="h-2 w-12 rounded bg-muted" />
                          <div className="h-2 w-8 rounded bg-muted" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-20">
          <Link href="/register">
            <Button size="lg" className="gap-2 bg-gradient-to-r from-violet-600 to-indigo-600">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
