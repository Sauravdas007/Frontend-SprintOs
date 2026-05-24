"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Check, Zap, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    description: "Perfect for individuals and small projects",
    icon: Zap,
    features: [
      "Up to 3 projects",
      "Basic Kanban board",
      "5 AI requests/month",
      "Community support",
      "GitHub integration",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "/user/month",
    description: "For growing teams that need more power",
    icon: Sparkles,
    features: [
      "Unlimited projects",
      "Advanced Kanban + filters",
      "Unlimited AI requests",
      "Priority support",
      "Analytics dashboard",
      "Custom workflows",
      "Team velocity tracking",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For organizations with advanced needs",
    icon: Building2,
    features: [
      "Everything in Pro",
      "SSO & SAML",
      "Audit logs",
      "Dedicated support",
      "Custom integrations",
      "SLA guarantees",
      "On-premise option",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 w-full z-50 border-b bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-lg">SprintOS</span>
          </Link>
          <Link href="/login">
            <Button size="sm" variant="outline">Sign In</Button>
          </Link>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Simple, transparent pricing</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start free, scale as you grow. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className={cn(
                "relative h-full",
                plan.popular && "border-primary shadow-xl shadow-primary/10 scale-105"
              )}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <div className={cn(
                    "mx-auto h-12 w-12 rounded-xl flex items-center justify-center mb-4",
                    plan.popular ? "bg-primary/10" : "bg-muted"
                  )}>
                    <plan.icon className={cn("h-6 w-6", plan.popular ? "text-primary" : "text-muted-foreground")} />
                  </div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm">
                        <Check className={cn("h-4 w-4 shrink-0", plan.popular ? "text-primary" : "text-emerald-500")} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="/register" className="block">
                    <Button
                      className={cn("w-full", plan.popular && "bg-gradient-to-r from-violet-600 to-indigo-600")}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
