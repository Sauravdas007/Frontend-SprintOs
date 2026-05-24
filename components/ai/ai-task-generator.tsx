"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn, priorityColors } from "@/lib/utils";
import {
  Sparkles,
  Wand2,
  Zap,
  Clock,
  Target,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Loader2,
} from "lucide-react";
import { AIResponse, Priority } from "@/types";

const mockAIResponse: AIResponse = {
  subtasks: [
    { title: "Research OAuth 2.0 providers", priority: "high", storyPoints: 3 },
    { title: "Design auth flow architecture", priority: "high", storyPoints: 5 },
    { title: "Implement Google OAuth integration", priority: "high", storyPoints: 8 },
    { title: "Implement GitHub OAuth integration", priority: "medium", storyPoints: 5 },
    { title: "Create JWT token management", priority: "high", storyPoints: 5 },
    { title: "Build login/signup UI components", priority: "medium", storyPoints: 5 },
    { title: "Add session persistence", priority: "medium", storyPoints: 3 },
    { title: "Write auth middleware & guards", priority: "high", storyPoints: 5 },
    { title: "Create user profile management", priority: "low", storyPoints: 3 },
    { title: "Add logout & token revocation", priority: "medium", storyPoints: 2 },
  ],
  storyPoints: 39,
  sprintEstimation: "2-3 sprints (3 weeks)",
  technicalBreakdown: [
    "Use NextAuth.js v5 for authentication framework",
    "Implement custom OAuth providers for Google & GitHub",
    "JWT strategy with refresh token rotation",
    "RBAC middleware for route protection",
    "Secure cookie configuration with httpOnly",
  ],
  risks: [
    "OAuth provider rate limits may affect testing",
    "Token refresh logic complexity",
    "Cross-domain cookie issues in production",
  ],
};

export function AITaskGenerator() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<AIResponse | null>(null);
  const [expandedRisks, setExpandedRisks] = useState(false);
  const [expandedTech, setExpandedTech] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 2000));
    setResponse(mockAIResponse);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-purple-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="h-5 w-5 text-violet-500" />
            AI Task Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <Input
              placeholder="Describe your feature: e.g. Build OAuth authentication system"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              className="flex-1 bg-background/50"
            />
            <Button
              onClick={handleGenerate}
              disabled={loading || !input.trim()}
              className="gap-2 bg-gradient-to-r from-violet-600 to-indigo-600"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
              Generate
            </Button>
          </div>
          <div className="flex gap-2 text-xs text-muted-foreground">
            <span className="px-2 py-1 rounded bg-muted cursor-pointer hover:bg-muted/80 transition-colors">Build OAuth system</span>
            <span className="px-2 py-1 rounded bg-muted cursor-pointer hover:bg-muted/80 transition-colors">Create payment gateway</span>
            <span className="px-2 py-1 rounded bg-muted cursor-pointer hover:bg-muted/80 transition-colors">Design notification service</span>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <AnimatePresence>
        {response && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 border-violet-500/20">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-violet-500" />
                    <span className="text-sm text-muted-foreground">Total Story Points</span>
                  </div>
                  <p className="text-3xl font-bold">{response.storyPoints}</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-muted-foreground">Sprint Estimation</span>
                  </div>
                  <p className="text-3xl font-bold">{response.sprintEstimation}</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/20">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    <span className="text-sm text-muted-foreground">Risk Factors</span>
                  </div>
                  <p className="text-3xl font-bold">{response.risks.length}</p>
                </CardContent>
              </Card>
            </div>

            {/* Subtasks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  Generated Subtasks ({response.subtasks.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {response.subtasks.map((subtask, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-mono text-muted-foreground w-6">{i + 1}</span>
                        <span className="text-sm font-medium">{subtask.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={cn("text-[10px]", priorityColors[subtask.priority])}>
                          {subtask.priority}
                        </Badge>
                        <span className="text-xs text-muted-foreground font-mono">{subtask.storyPoints}sp</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Technical Breakdown */}
            <Card>
              <CardHeader
                className="cursor-pointer"
                onClick={() => setExpandedTech(!expandedTech)}
              >
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-amber-500" />
                    Technical Breakdown
                  </div>
                  {expandedTech ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </CardTitle>
              </CardHeader>
              <AnimatePresence>
                {expandedTech && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <CardContent>
                      <ul className="space-y-2">
                          {response.technicalBreakdown.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>

              {/* Risks */}
              <Card>
                <CardHeader
                  className="cursor-pointer"
                  onClick={() => setExpandedRisks(!expandedRisks)}
                >
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      Risk Analysis
                    </div>
                    {expandedRisks ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </CardTitle>
                </CardHeader>
                <AnimatePresence>
                  {expandedRisks && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <CardContent>
                        <ul className="space-y-2">
                          {response.risks.map((risk, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-red-500/80">
                              <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                              {risk}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
