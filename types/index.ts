export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: Role;
  createdAt: string;
}

export type Role = "ADMIN" | "MANAGER" | "DEVELOPER";

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  description?: string;
  ownerId: string;
  members: WorkspaceMember[];
  projects: Project[];
  createdAt: string;
  updatedAt: string;
}

export interface WorkspaceMember {
  id: string;
  userId: string;
  workspaceId: string;
  role: Role;
  user: User;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  workspaceId: string;
  status: ProjectStatus;
  sprints: Sprint[];
  githubRepo?: string;
  createdAt: string;
  updatedAt: string;
}

export type ProjectStatus = "active" | "archived" | "paused";

export interface Sprint {
  id: string;
  name: string;
  goal?: string;
  projectId: string;
  status: SprintStatus;
  startDate: string;
  endDate: string;
  tasks: Task[];
  velocity?: number;
  createdAt: string;
  updatedAt: string;
}

export type SprintStatus = "planning" | "active" | "completed" | "cancelled";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: Priority;
  storyPoints?: number;
  assigneeId?: string;
  assignee?: User;
  sprintId?: string;
  projectId: string;
  labels: Label[];
  dueDate?: string;
  githubIssueId?: string;
  githubPRId?: string;
  createdAt: string;
  updatedAt: string;
}

export type TaskStatus = "backlog" | "todo" | "in_progress" | "review" | "done";

export type Priority = "low" | "medium" | "high" | "critical";

export interface Label {
  id: string;
  name: string;
  color: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  link?: string;
  createdAt: string;
}

export type NotificationType = "task" | "sprint" | "mention" | "github" | "system";

export interface AIResponse {
  subtasks: AISubtask[];
  storyPoints: number;
  sprintEstimation: string;
  technicalBreakdown: string[];
  risks: string[];
}

export interface AISubtask {
  title: string;
  priority: Priority;
  storyPoints: number;
}

export interface BugReport {
  id: string;
  title: string;
  stackTrace: string;
  consoleLogs: string;
  severity: Severity;
  rootCause: string;
  suggestedFixes: string[];
  checklist: string[];
  status: "open" | "investigating" | "fixed" | "closed";
  createdAt: string;
}

export type Severity = "low" | "medium" | "high" | "critical";

export interface GitHubIntegration {
  id: string;
  repoName: string;
  repoUrl: string;
  syncEnabled: boolean;
  lastSync?: string;
}

export interface AnalyticsData {
  sprintVelocity: VelocityData[];
  completedTasks: number;
  bugFrequency: BugData[];
  aiUsage: AIUsageData[];
  teamProductivity: ProductivityData[];
}

export interface VelocityData {
  sprint: string;
  planned: number;
  completed: number;
}

export interface BugData {
  date: string;
  count: number;
  severity: Severity;
}

export interface AIUsageData {
  date: string;
  requests: number;
  tokensUsed: number;
}

export interface ProductivityData {
  user: string;
  tasksCompleted: number;
  storyPoints: number;
  prsMerged: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
}
