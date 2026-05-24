"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  CheckCircle2,
  Bug,
  Sparkles,
  Users,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { motion } from "framer-motion";

const velocityData = [
  { sprint: "Sprint 19", planned: 45, completed: 42 },
  { sprint: "Sprint 20", planned: 50, completed: 48 },
  { sprint: "Sprint 21", planned: 48, completed: 45 },
  { sprint: "Sprint 22", planned: 55, completed: 52 },
  { sprint: "Sprint 23", planned: 50, completed: 50 },
  { sprint: "Sprint 24", planned: 60, completed: 58 },
];

const bugData = [
  { date: "Mon", count: 3, severity: "medium" },
  { date: "Tue", count: 5, severity: "high" },
  { date: "Wed", count: 2, severity: "low" },
  { date: "Thu", count: 4, severity: "medium" },
  { date: "Fri", count: 1, severity: "low" },
  { date: "Sat", count: 0, severity: "low" },
  { date: "Sun", count: 0, severity: "low" },
];

const aiUsageData = [
  { date: "Mon", requests: 120, tokensUsed: 45000 },
  { date: "Tue", requests: 145, tokensUsed: 52000 },
  { date: "Wed", requests: 98, tokensUsed: 38000 },
  { date: "Thu", requests: 167, tokensUsed: 61000 },
  { date: "Fri", requests: 134, tokensUsed: 49000 },
  { date: "Sat", requests: 45, tokensUsed: 15000 },
  { date: "Sun", requests: 38, tokensUsed: 12000 },
];

const productivityData = [
  { user: "Alice", tasksCompleted: 12, storyPoints: 89, prsMerged: 8 },
  { user: "Bob", tasksCompleted: 9, storyPoints: 67, prsMerged: 6 },
  { user: "Charlie", tasksCompleted: 15, storyPoints: 102, prsMerged: 11 },
  { user: "Diana", tasksCompleted: 7, storyPoints: 45, prsMerged: 4 },
  { user: "Eve", tasksCompleted: 11, storyPoints: 78, prsMerged: 7 },
];

const taskDistribution = [
  { name: "Done", value: 45, color: "#10b981" },
  { name: "In Progress", value: 23, color: "#f59e0b" },
  { name: "Review", value: 12, color: "#8b5cf6" },
  { name: "Todo", value: 18, color: "#3b82f6" },
  { name: "Backlog", value: 8, color: "#64748b" },
];

const stats = [
  {
    title: "Sprint Velocity",
    value: "58 pts",
    change: "+12%",
    trend: "up",
    icon: TrendingUp,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Completed Tasks",
    value: "142",
    change: "+8%",
    trend: "up",
    icon: CheckCircle2,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Bug Frequency",
    value: "15",
    change: "-23%",
    trend: "down",
    icon: Bug,
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
  {
    title: "AI Usage",
    value: "847",
    change: "+45%",
    trend: "up",
    icon: Sparkles,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
];

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className={cn("p-2 rounded-lg", stat.bg)}>
                    <stat.icon className={cn("h-5 w-5", stat.color)} />
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 text-emerald-500" />
                    )}
                    <span className={stat.trend === "up" ? "text-emerald-500" : "text-emerald-500"}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sprint Velocity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
              Sprint Velocity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={velocityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="sprint" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="planned"
                  stroke="#64748b"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#10b981" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bug Frequency */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Bug className="h-4 w-4 text-red-500" />
              Bug Frequency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={bugData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="count" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Usage */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="h-4 w-4 text-violet-500" />
              AI Usage Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={aiUsageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="requests"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="tokensUsed"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Task Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CheckCircle2 className="h-4 w-4 text-blue-500" />
              Task Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={taskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {taskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-2 justify-center mt-2">
              {taskDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-1 text-xs">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Productivity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Users className="h-4 w-4 text-blue-500" />
            Team Productivity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={productivityData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis dataKey="user" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={60} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="tasksCompleted" fill="#3b82f6" radius={[0, 4, 4, 0]} name="Tasks" />
              <Bar dataKey="storyPoints" fill="#8b5cf6" radius={[0, 4, 4, 0]} name="Story Points" />
              <Bar dataKey="prsMerged" fill="#10b981" radius={[0, 4, 4, 0]} name="PRs Merged" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
