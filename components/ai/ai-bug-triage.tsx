"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn, severityColors } from "@/lib/utils";
import {
  Bug,
  ScanLine,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  Loader2,
  Stethoscope,
  FileCode,
  ListChecks,
} from "lucide-react";
import { BugReport } from "@/types";

const mockBugReport: BugReport = {
  id: "bug-1",
  title: "Memory leak in WebSocket connection handler",
  stackTrace: `Error: WebSocket connection failed
    at Socket.onError (ws/lib/websocket.js:234:15)
    at emitErrorNT (internal/streams/destroy.js:92:8)
    at processTicksAndRejections (internal/process/task_queues.js:80:21)
  TypeError: Cannot read property 'send' of undefined`,
  consoleLogs: `[ERROR] 2024-11-20T10:23:45Z - Connection timeout after 30000ms
[WARN] 2024-11-20T10:23:46Z - Retrying connection (attempt 3/3)
[ERROR] 2024-11-20T10:23:47Z - Max retries exceeded. Connection failed.
[INFO] 2024-11-20T10:23:48Z - Cleaning up resources...
[ERROR] 2024-11-20T10:23:49Z - Failed to cleanup: socket is not defined`,
  severity: "high",
  rootCause: "The WebSocket connection handler does not properly clean up event listeners when a connection fails. The 'socket' variable is referenced in the cleanup function but is undefined because the connection was never established, causing a secondary error that masks the original issue.",
  suggestedFixes: [
    "Add null check before accessing socket properties in cleanup",
    "Implement proper event listener cleanup in finally block",
    "Add connection timeout with exponential backoff",
    "Use WeakRef for socket references to allow GC",
  ],
  checklist: [
    "Reproduce the issue in staging environment",
    "Verify fix with load testing (1000+ concurrent connections)",
    "Check for memory leaks using heap snapshots",
    "Update error handling documentation",
    "Add monitoring alerts for connection failures",
  ],
  status: "open",
  createdAt: new Date().toISOString(),
};

export function AIBugTriage() {
  const [stackTrace, setStackTrace] = useState("");
  const [logs, setLogs] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<BugReport | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    rootCause: true,
    fixes: true,
    checklist: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleAnalyze = async () => {
    if (!stackTrace.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2500));
    setReport(mockBugReport);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Input Panel */}
      <Card className="border-red-500/20 bg-gradient-to-br from-red-500/5 to-orange-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Stethoscope className="h-5 w-5 text-red-500" />
            AI Bug Triage
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <FileCode className="h-4 w-4" />
              Stack Trace
            </label>
            <textarea
              value={stackTrace}
              onChange={(e) => setStackTrace(e.target.value)}
              placeholder="Paste your stack trace here..."
              className="w-full min-h-[120px] rounded-lg border bg-background/50 p-3 text-xs font-mono resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <ScanLine className="h-4 w-4" />
              Console Logs
            </label>
            <textarea
              value={logs}
              onChange={(e) => setLogs(e.target.value)}
              placeholder="Paste console logs here (optional)..."
              className="w-full min-h-[80px] rounded-lg border bg-background/50 p-3 text-xs font-mono resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <Button
            onClick={handleAnalyze}
            disabled={loading || !stackTrace.trim()}
            className="gap-2 bg-gradient-to-r from-red-600 to-orange-600"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Bug className="h-4 w-4" />}
            Analyze Bug
          </Button>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      <AnimatePresence>
        {report && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge className={cn("text-xs px-3 py-1", severityColors[report.severity])}>
                  {report.severity.toUpperCase()} SEVERITY
                </Badge>
                <h3 className="font-semibold">{report.title}</h3>
              </div>
              <Badge variant={report.status === "open" ? "destructive" : "default"}>
                {report.status}
              </Badge>
            </div>

            {/* Root Cause */}
            <Card className="border-l-4 border-l-red-500">
              <CardHeader
                className="cursor-pointer py-4"
                onClick={() => toggleSection("rootCause")}
              >
                <CardTitle className="flex items-center justify-between text-base">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    Root Cause Analysis
                  </div>
                  {expandedSections.rootCause ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </CardTitle>
              </CardHeader>
              <AnimatePresence>
                {expandedSections.rootCause && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <CardContent>
                      <p className="text-sm leading-relaxed text-muted-foreground">{report.rootCause}</p>
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>

            {/* Suggested Fixes */}
            <Card className="border-l-4 border-l-amber-500">
              <CardHeader
                className="cursor-pointer py-4"
                onClick={() => toggleSection("fixes")}
              >
                <CardTitle className="flex items-center justify-between text-base">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-amber-500" />
                    Suggested Fixes
                  </div>
                  {expandedSections.fixes ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </CardTitle>
              </CardHeader>
              <AnimatePresence>
                {expandedSections.fixes && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <CardContent>
                      <div className="space-y-3">
                        {report.suggestedFixes.map((fix, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-3 p-3 rounded-lg bg-amber-500/5 border border-amber-500/10"
                          >
                            <div className="mt-0.5 h-5 w-5 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                              <span className="text-xs font-bold text-amber-600">{i + 1}</span>
                            </div>
                            <p className="text-sm">{fix}</p>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>

            {/* Checklist */}
            <Card className="border-l-4 border-l-emerald-500">
              <CardHeader
                className="cursor-pointer py-4"
                onClick={() => toggleSection("checklist")}
              >
                <CardTitle className="flex items-center justify-between text-base">
                  <div className="flex items-center gap-2">
                    <ListChecks className="h-5 w-5 text-emerald-500" />
                    Debugging Checklist
                  </div>
                  {expandedSections.checklist ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </CardTitle>
              </CardHeader>
              <AnimatePresence>
                {expandedSections.checklist && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <CardContent>
                      <div className="space-y-2">
                        {report.checklist.map((item, i) => (
                          <label
                            key={i}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                          >
                            <input type="checkbox" className="h-4 w-4 rounded border-primary" />
                            <span className="text-sm">{item}</span>
                          </label>
                        ))}
                      </div>
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
