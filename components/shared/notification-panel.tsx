"use client";

import { useUIStore } from "@/store";
import { motion, AnimatePresence } from "framer-motion";
import { cn, formatRelativeDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  X,
  Bell,
  CheckCircle2,
  AlertTriangle,
  MessageSquare,
  GitPullRequest,
  Info,
} from "lucide-react";
import { useState } from "react";
import { Notification, NotificationType } from "@/types";

const notifications: Notification[] = [
  {
    id: "1",
    title: "Sprint 23 completed",
    message: "All 12 tasks have been completed successfully",
    type: "sprint",
    read: false,
    link: "/project/1/sprint/23",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "2",
    title: "New PR merged",
    message: "feat: OAuth authentication by @dev2",
    type: "github",
    read: false,
    link: "#",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "3",
    title: "High priority bug detected",
    message: "Memory leak in websocket connection",
    type: "task",
    read: true,
    link: "#",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: "4",
    title: "You were mentioned",
    message: "@admin check the API documentation",
    type: "mention",
    read: true,
    link: "#",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];

const typeConfig: Record<NotificationType, { icon: typeof Bell; color: string }> = {
  task: { icon: AlertTriangle, color: "text-amber-500" },
  sprint: { icon: CheckCircle2, color: "text-emerald-500" },
  mention: { icon: MessageSquare, color: "text-blue-500" },
  github: { icon: GitPullRequest, color: "text-purple-500" },
  system: { icon: Info, color: "text-slate-500" },
};

export function NotificationPanel() {
  const { notificationPanelOpen, setNotificationPanelOpen } = useUIStore();
  const [items, setItems] = useState(notifications);

  const unreadCount = items.filter((n) => !n.read).length;

  const markAllRead = () => {
    setItems(items.map((n) => ({ ...n, read: true })));
  };

  return (
    <AnimatePresence>
      {notificationPanelOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={() => setNotificationPanelOpen(false)}
          />
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-50 h-screen w-96 border-l bg-background shadow-2xl"
          >
            <div className="flex h-16 items-center justify-between border-b px-6">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                <h2 className="font-semibold">Notifications</h2>
                {unreadCount > 0 && (
                  <Badge variant="default" className="ml-2">{unreadCount}</Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={markAllRead}>
                  Mark all read
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setNotificationPanelOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="overflow-y-auto h-[calc(100vh-4rem)]">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                  <Bell className="h-12 w-12 mb-4 opacity-20" />
                  <p>No notifications yet</p>
                </div>
              ) : (
                <div className="divide-y">
                  {items.map((notification) => {
                    const config = typeConfig[notification.type];
                    return (
                      <div
                        key={notification.id}
                        className={cn(
                          "flex gap-4 p-4 hover:bg-muted/50 transition-colors cursor-pointer",
                          !notification.read && "bg-primary/5"
                        )}
                      >
                        <div className={cn("mt-0.5", config.color)}>
                          <config.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-start justify-between">
                            <p className={cn("text-sm font-medium", !notification.read && "text-foreground")}>
                              {notification.title}
                            </p>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              {formatRelativeDate(notification.createdAt)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{notification.message}</p>
                        </div>
                        {!notification.read && (
                          <div className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
