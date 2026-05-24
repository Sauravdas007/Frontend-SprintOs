"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, formatRelativeDate } from "@/lib/utils";
import {
  Github,
  GitPullRequest,
  GitCommit,
  GitBranch,
  Link2,
  RefreshCw,
  CheckCircle2,
  Clock,
  MessageSquare,
  Loader2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const repos = [
  { id: "1", name: "ai-sprintos/frontend", url: "https://github.com/ai-sprintos/frontend", synced: true, lastSync: "2 min ago" },
  { id: "2", name: "ai-sprintos/backend", url: "https://github.com/ai-sprintos/backend", synced: true, lastSync: "5 min ago" },
  { id: "3", name: "ai-sprintos/ml-models", url: "https://github.com/ai-sprintos/ml-models", synced: false, lastSync: null },
];

const recentPRs = [
  { id: 101, title: "feat: Implement OAuth authentication", author: "Alice", status: "merged", number: 234, comments: 5, createdAt: "2 hours ago" },
  { id: 102, title: "fix: Resolve memory leak in websocket", author: "Bob", status: "open", number: 235, comments: 2, createdAt: "4 hours ago" },
  { id: 103, title: "docs: Update API documentation", author: "Charlie", status: "merged", number: 236, comments: 1, createdAt: "1 day ago" },
];

const recentCommits = [
  { id: "c1", message: "feat: Add JWT token rotation", author: "Alice", sha: "a1b2c3d", time: "10 min ago" },
  { id: "c2", message: "fix: Handle edge case in auth middleware", author: "Bob", sha: "e4f5g6h", time: "25 min ago" },
  { id: "c3", message: "refactor: Extract auth utilities", author: "Charlie", sha: "i7j8k9l", time: "1 hour ago" },
  { id: "c4", message: "test: Add auth integration tests", author: "Alice", sha: "m0n1o2p", time: "2 hours ago" },
];

export function GitHubIntegration() {
  const [connected, setConnected] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState(repos[0]);
  const [showCommits, setShowCommits] = useState(true);

  const handleSync = async () => {
    setSyncing(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSyncing(false);
  };

  if (!connected) {
    return (
      <Card className="border-dashed border-2">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Github className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="font-semibold mb-2">Connect GitHub</h3>
          <p className="text-sm text-muted-foreground text-center max-w-sm mb-6">
            Sync issues, pull requests, and commits to keep your sprint board up to date.
          </p>
          <Button onClick={() => setConnected(true)} className="gap-2">
            <Github className="h-4 w-4" />
            Connect GitHub
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
            <Github className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold">GitHub Integration</h3>
            <p className="text-xs text-muted-foreground">3 repositories connected</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleSync} disabled={syncing} className="gap-2">
            <RefreshCw className={cn("h-3 w-3", syncing && "animate-spin")} />
            {syncing ? "Syncing..." : "Sync Now"}
          </Button>
          <Button variant="ghost" size="sm" className="gap-2 text-red-500" onClick={() => setConnected(false)}>
            <Link2 className="h-3 w-3" />
            Disconnect
          </Button>
        </div>
      </div>

      {/* Repo Selector */}
      <div className="flex gap-2">
        {repos.map((repo) => (
          <button
            key={repo.id}
            onClick={() => setSelectedRepo(repo)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
              selectedRepo.id === repo.id
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            <GitBranch className="h-3 w-3" />
            {repo.name}
            {repo.synced && (
              <CheckCircle2 className="h-3 w-3 text-emerald-400" />
            )}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <GitPullRequest className="h-4 w-4 text-purple-500" />
              <span className="text-xs text-muted-foreground">Open PRs</span>
            </div>
            <p className="text-2xl font-bold">{recentPRs.filter((pr) => pr.status === "open").length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <GitCommit className="h-4 w-4 text-blue-500" />
              <span className="text-xs text-muted-foreground">Commits Today</span>
            </div>
            <p className="text-2xl font-bold">{recentCommits.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="h-4 w-4 text-amber-500" />
              <span className="text-xs text-muted-foreground">Issue Comments</span>
            </div>
            <p className="text-2xl font-bold">{recentPRs.reduce((acc, pr) => acc + pr.comments, 0)}</p>
          </CardContent>
        </Card>
      </div>

      {/* PRs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <GitPullRequest className="h-4 w-4 text-purple-500" />
            Recent Pull Requests
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentPRs.map((pr) => (
            <div
              key={pr.id}
              className="flex items-start justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className={cn(
                  "mt-0.5 h-4 w-4 rounded-full",
                  pr.status === "merged" ? "bg-purple-500" : "bg-green-500"
                )} />
                <div>
                  <p className="text-sm font-medium">{pr.title}</p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <span>#{pr.number}</span>
                    <span>by {pr.author}</span>
                    <span>{pr.createdAt}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={pr.status === "merged" ? "secondary" : "default"} className="text-[10px]">
                  {pr.status}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MessageSquare className="h-3 w-3" />
                  {pr.comments}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Commits */}
      <Card>
        <CardHeader
          className="cursor-pointer"
          onClick={() => setShowCommits(!showCommits)}
        >
          <CardTitle className="flex items-center justify-between text-base">
            <div className="flex items-center gap-2">
              <GitCommit className="h-4 w-4 text-blue-500" />
              Recent Commits
            </div>
            {showCommits ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </CardTitle>
        </CardHeader>
        <AnimatePresence>
          {showCommits && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              <CardContent className="space-y-3">
                {recentCommits.map((commit, i) => (
                  <motion.div
                    key={commit.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-[10px]">{commit.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{commit.message}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <code className="text-[10px] bg-muted px-1 rounded">{commit.sha}</code>
                        <span>{commit.author}</span>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{commit.time}</span>
                  </motion.div>
                ))}
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  );
}
