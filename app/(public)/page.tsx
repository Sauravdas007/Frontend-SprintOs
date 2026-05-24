"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  Zap,
  Shield,
  BarChart3,
  ArrowRight,
  Github,
  Timer,
  BrainCircuit,
  Menu,
  X,
  Check,
  Users,
  Workflow,
  ChevronRight,
  Target,
  GitPullRequest,
  MessageSquare,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

/* ─── Types ─── */
interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  initials: string;
}

/* ─── Data ─── */
const features: Feature[] = [
  {
    icon: BrainCircuit,
    title: "AI-Powered Planning",
    description:
      "Generate subtasks, story points, and sprint estimations automatically from feature descriptions.",
  },
  {
    icon: Zap,
    title: "Smart Bug Triage",
    description:
      "AI analyzes stack traces and logs to identify root causes and suggest fixes instantly.",
  },
  {
    icon: Timer,
    title: "Sprint Velocity Tracking",
    description:
      "Real-time analytics on team velocity, completion rates, and performance trends.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "SOC 2 compliant with role-based access control, JWT authentication, and secure sessions.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Interactive dashboards for sprint metrics, bug frequency, and AI usage analytics.",
  },
  {
    icon: Github,
    title: "GitHub Sync",
    description:
      "Two-way sync with GitHub issues, PRs, and commits for seamless workflow integration.",
  },
];

const testimonials: Testimonial[] = [
  {
    quote:
      "AI SprintOS cut our sprint planning time by 70%. The AI task generator is incredibly accurate.",
    author: "Sarah Chen",
    role: "Engineering Manager, TechCorp",
    initials: "SC",
  },
  {
    quote:
      "The bug triage feature saved us hours of debugging. Root cause analysis in seconds, not days.",
    author: "Marcus Johnson",
    role: "Senior Developer, StartupX",
    initials: "MJ",
  },
  {
    quote:
      "Finally, a tool that understands engineering workflows. The GitHub integration is seamless.",
    author: "Elena Rodriguez",
    role: "CTO, ScaleUp Inc",
    initials: "ER",
  },
];

const steps = [
  {
    icon: Target,
    title: "Connect Your Stack",
    desc: "One-click integration with GitHub, Jira, or Linear. Import existing projects in seconds.",
  },
  {
    icon: BrainCircuit,
    title: "Let AI Plan",
    desc: "AI generates tasks, estimates story points, and triages bugs based on your team's patterns.",
  },
  {
    icon: GitPullRequest,
    title: "Ship Faster",
    desc: "Track velocity, monitor blockers, and deploy with confidence using real-time insights.",
  },
];

const navLinks = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
];

/* ─── Animation Wrapper ─── */
function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Main Page ─── */
export default function LandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-violet-500/15">
      {/* ═══ Navbar ═══ */}
      <header className="fixed top-0 w-full z-50 border-b border-border/30 bg-background/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4" aria-label="SprintOS Home">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-md shadow-violet-500/20">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">SprintOS</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted/40"
              >
                {link.label}
              </Link>
            ))}
            <div className="h-4 w-px bg-border mx-2" />
            <Link
              href="/login"
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign In
            </Link>
            <Link href="/register" className="ml-2">
              <Button
                size="sm"
                className="rounded-lg px-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-sm"
              >
                Get Started
              </Button>
            </Link>
          </nav>

          <button
            className="md:hidden p-2 rounded-md hover:bg-muted/50"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-border/30 bg-background/95 px-5 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 rounded-md"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <Link href="/login" onClick={() => setMobileOpen(false)}>
                <Button variant="outline" className="w-full rounded-lg">Sign In</Button>
              </Link>
              <Link href="/register" onClick={() => setMobileOpen(false)}>
                <Button className="w-full rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>
      
      {/* Spacer to offset header height */}
      <div className="h-16"></div>
      
      {/* ═══ Hero ═══ */}
      <section className="pt-48 pb-20 lg:pt-56 lg:pb-28 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-1 gap-12 lg:gap-16 items-center justify-items-center">
            {/* Left: Text */}
            <FadeIn>
              <div className="max-w-xl mx-auto text-center">
                <Link
                  href="/features"
                  className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/5 px-3 py-1 text-xs font-medium text-violet-400 hover:bg-violet-500/10 transition-colors mb-6"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  AI-powered sprint planning is here
                  <ChevronRight className="h-3 w-3" />
                </Link>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.2] mb-6">
                  Sprint management,
                  <span className="block mt-2 font-extrabold bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">
                    supercharged by AI
                  </span>
                </h1>


                <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-md mx-auto text-center">
                  Plan sprints, triage bugs, and track velocity with intelligent
                  automation. Built for high-performing engineering teams.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mb-6 justify-center">
                  <Link href="/register">
                    <Button
                      size="lg"
                      className="h-11 px-6 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-lg shadow-violet-500/20"
                    >
                      Start Free Trial
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/features">
                    <Button
                      variant="outline"
                      size="lg"
                      className="h-11 px-6 rounded-lg border-border/60"
                    >
                      See Features
                    </Button>
                  </Link>
                </div>

                <div className="flex justify-center items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-emerald-500" /> No credit card
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-emerald-500" /> 14-day trial
                  </span>
                </div>
              </div>
            </FadeIn>

            {/* Right: Abstract Visual (NO empty boxes) */}
            <FadeIn delay={0.15} className="hidden lg:block">
              <div className="relative">
                {/* Glow */}
                <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/10 to-indigo-500/10 rounded-3xl blur-2xl" />

                {/* Card Stack */}
                <div className="relative space-y-4">
                  {/* Card 1 */}
                  <div className="bg-card border border-border/50 rounded-xl p-5 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span className="text-sm font-medium">Sprint 24</span>
                      </div>
                      <span className="text-xs text-muted-foreground">12 days left</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/40 border border-border/30">
                        <BrainCircuit className="h-4 w-4 text-violet-500 shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">AI-generated task breakdown</p>
                          <p className="text-xs text-muted-foreground">8 subtasks created</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/40 border border-border/30">
                        <Zap className="h-4 w-4 text-amber-500 shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">Smart bug triage complete</p>
                          <p className="text-xs text-muted-foreground">3 issues auto-assigned</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-card border border-border/50 rounded-xl p-5 shadow-lg ml-8">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-8 w-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
                        <BarChart3 className="h-4 w-4 text-violet-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Velocity Trend</p>
                        <p className="text-xs text-muted-foreground">+23% this sprint</p>
                      </div>
                    </div>
                    <div className="flex items-end gap-1 h-16">
                      {[40, 55, 45, 70, 60, 85, 75].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-sm bg-gradient-to-t from-violet-500 to-indigo-400 opacity-80"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Floating Badge */}
                  <div className="absolute -bottom-2 -left-4 bg-background border border-border/50 rounded-lg px-3 py-2 shadow-lg flex items-center gap-2">
                    <Github className="h-4 w-4" />
                    <span className="text-xs font-medium">Synced with GitHub</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ Social Proof ═══ */}
      <section className="border-y border-border/30 bg-muted/20 py-10 px-5">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { v: "10,000+", l: "Teams onboarded" },
                { v: "2.5M", l: "Tasks automated" },
                { v: "99.9%", l: "Uptime SLA" },
                { v: "4.9/5", l: "User rating" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-2xl md:text-3xl font-bold tracking-tight">{s.v}</div>
                  <div className="text-sm text-muted-foreground mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ Features ═══ */}
      <section className="py-24 lg:py-32 px-5" id="features">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-16 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-border/40 bg-muted/30 px-3 py-1 text-xs font-medium text-muted-foreground mb-5">
              <Workflow className="h-3 w-3" />
              Features
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Everything you need to ship faster
            </h2>
            <p className="text-muted-foreground">
              From AI automation to enterprise security — a complete toolkit for modern teams.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {features.map((f, i) => (
              <FadeIn key={f.title} delay={i * 0.06}>
                <div className="group h-full p-6 rounded-xl border border-border/30 bg-card/40 hover:bg-card/80 hover:border-violet-500/20 transition-all duration-300">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-violet-500/10 to-indigo-500/10 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <f.icon className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                  </div>
                  <h3 className="text-base font-semibold mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {f.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ How It Works ═══ */}
      <section className="py-24 lg:py-32 px-5 bg-muted/20 border-y border-border/30">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Three steps to smarter sprints
            </h2>
            <p className="text-muted-foreground">
              Get up and running in minutes. Our AI handles the heavy lifting.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
            {/* Connector line for desktop */}
            <div className="hidden md:block absolute top-16 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            {steps.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.12}>
                <div className="text-center md:text-left">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/10 to-indigo-500/10 border border-violet-500/20 mb-5">
                    <s.icon className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                  </div>
                  <div className="text-xs font-semibold text-violet-500 mb-2 uppercase tracking-wider">
                    Step {i + 1}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Testimonials ═══ */}
      <section className="py-24 lg:py-32 px-5">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-16 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-border/40 bg-muted/30 px-3 py-1 text-xs font-medium text-muted-foreground mb-5">
              <Users className="h-3 w-3" />
              Testimonials
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Loved by engineering teams
            </h2>
            <p className="text-muted-foreground">
              Teams ship faster with SprintOS. Here's what they say.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="h-full flex flex-col p-6 rounded-xl border border-border/30 bg-card/40 hover:bg-card/70 transition-colors">
                  <div className="flex gap-0.5 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Sparkles
                        key={star}
                        className="h-3.5 w-3.5 text-amber-500 fill-amber-500"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-border/20">
                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{t.author}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-24 lg:py-32 px-5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/[0.03] to-indigo-500/[0.03]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-[100px]" />

        <div className="max-w-2xl mx-auto text-center relative">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
              Ready to sprint{" "}
              <span className="bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">
                smarter?
              </span>
            </h2>
            <p className="text-muted-foreground mb-10 max-w-lg mx-auto">
              Join thousands of teams shipping better software, faster. Start your free trial today — no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/register">
                <Button
                  size="lg"
                  className="h-11 px-7 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-lg shadow-violet-500/20"
                >
                  Get Started Free
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="h-11 px-7 rounded-lg border-border/60">
                  Talk to Sales
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ Footer ═══ */}
      <footer className="border-t border-border/30 bg-muted/20 py-12 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-2.5 mb-3">
                <div className="h-7 w-7 rounded-md bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
                  <Sparkles className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="font-semibold">SprintOS</span>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                AI-powered sprint management for high-performing engineering teams.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/features" className="hover:text-foreground transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
                <li><Link href="/integrations" className="hover:text-foreground transition-colors">Integrations</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/docs" className="hover:text-foreground transition-colors">Documentation</Link></li>
                <li><Link href="/api" className="hover:text-foreground transition-colors">API</Link></li>
                <li><Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-foreground transition-colors">About</Link></li>
                <li><Link href="/careers" className="hover:text-foreground transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border/20 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} AI SprintOS. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
              <Link href="/security" className="hover:text-foreground transition-colors">Security</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
function Badge({ children, variant = "default", className }: { children: React.ReactNode; variant?: string; className?: string }) {
  return (
    <span className={cn(
      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
      variant === "outline" && "border-transparent bg-primary/10 text-primary",
      className
    )}>
      {children}
    </span>
  );
}

