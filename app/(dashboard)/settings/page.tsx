"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, getInitials } from "@/lib/utils";
import {
  User,
  Bell,
  Shield,
  Palette,
  Github,
  Key,
  Mail,
  Save,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "integrations", label: "Integrations", icon: Github },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Settings saved");
    setSaving(false);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account and preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64 shrink-0">
          <div className="flex lg:flex-col gap-1 p-1 bg-muted rounded-lg overflow-x-auto lg:overflow-visible">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-all whitespace-nowrap",
                  activeTab === tab.id
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "profile" && <ProfileSettings onSave={handleSave} saving={saving} />}
            {activeTab === "notifications" && <NotificationSettings onSave={handleSave} saving={saving} />}
            {activeTab === "security" && <SecuritySettings onSave={handleSave} saving={saving} />}
            {activeTab === "appearance" && <AppearanceSettings onSave={handleSave} saving={saving} />}
            {activeTab === "integrations" && <IntegrationSettings />}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ProfileSettings({ onSave, saving }: { onSave: () => void; saving: boolean }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Update your personal information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src="https://avatars.githubusercontent.com/u/1" />
            <AvatarFallback className="text-lg">AU</AvatarFallback>
          </Avatar>
          <div>
            <Button variant="outline" size="sm">Change Avatar</Button>
            <p className="text-xs text-muted-foreground mt-1">JPG, PNG or GIF. Max 2MB.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <Input defaultValue="Admin User" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input defaultValue="admin@aisprintos.dev" type="email" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Role</label>
            <Input defaultValue="ADMIN" disabled />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Timezone</label>
            <Input defaultValue="UTC-5 (Eastern Time)" />
          </div>
        </div>
        <Button onClick={onSave} disabled={saving} className="gap-2">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save Changes
        </Button>
      </CardContent>
    </Card>
  );
}

function NotificationSettings({ onSave, saving }: { onSave: () => void; saving: boolean }) {
  const settings = [
    { label: "Task assignments", desc: "When you are assigned to a task", enabled: true },
    { label: "Sprint updates", desc: "When sprint status changes", enabled: true },
    { label: "Mentions", desc: "When someone mentions you", enabled: true },
    { label: "GitHub sync", desc: "PR and issue updates", enabled: false },
    { label: "Weekly digest", desc: "Summary of weekly activity", enabled: true },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Choose what you want to be notified about</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {settings.map((setting) => (
          <div key={setting.label} className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium text-sm">{setting.label}</p>
              <p className="text-xs text-muted-foreground">{setting.desc}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked={setting.enabled} className="sr-only peer" />
              <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
            </label>
          </div>
        ))}
        <Button onClick={onSave} disabled={saving} className="gap-2 mt-4">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save Preferences
        </Button>
      </CardContent>
    </Card>
  );
}

function SecuritySettings({ onSave, saving }: { onSave: () => void; saving: boolean }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>Update your password</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Current Password</label>
            <Input type="password" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">New Password</label>
            <Input type="password" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Confirm Password</label>
            <Input type="password" />
          </div>
          <Button onClick={onSave} disabled={saving} className="gap-2">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Key className="h-4 w-4" />}
            Update Password
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>Add an extra layer of security</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="font-medium text-sm">Authenticator App</p>
                <p className="text-xs text-muted-foreground">Google Authenticator or Authy</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Enable</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-500/20">
        <CardHeader>
          <CardTitle className="text-red-500">Danger Zone</CardTitle>
          <CardDescription>Irreversible actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Delete Account</p>
              <p className="text-xs text-muted-foreground">This will permanently delete your account and all data</p>
            </div>
            <Button variant="destructive" size="sm">Delete</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function AppearanceSettings({ onSave, saving }: { onSave: () => void; saving: boolean }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>Customize your interface</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Theme</label>
          <div className="grid grid-cols-3 gap-3">
            {["light", "dark", "system"].map((theme) => (
              <button
                key={theme}
                className={cn(
                  "p-4 rounded-lg border text-center transition-all hover:border-primary",
                  theme === "dark" && "bg-slate-950 text-white border-slate-800"
                )}
              >
                <div className={cn(
                  "h-8 w-8 mx-auto rounded-full mb-2",
                  theme === "light" ? "bg-white border-2" :
                  theme === "dark" ? "bg-slate-800 border border-slate-700" :
                  "bg-gradient-to-br from-white to-slate-900 border"
                )} />
                <span className="text-sm capitalize">{theme}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Sidebar Behavior</label>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="sidebar" defaultChecked className="text-primary" />
              <span className="text-sm">Always visible</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="sidebar" className="text-primary" />
              <span className="text-sm">Auto-collapse</span>
            </label>
          </div>
        </div>
        <Button onClick={onSave} disabled={saving} className="gap-2">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save Preferences
        </Button>
      </CardContent>
    </Card>
  );
}

function IntegrationSettings() {
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-slate-900 flex items-center justify-center">
                <Github className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-sm">GitHub</p>
                <p className="text-xs text-muted-foreground">3 repositories connected</p>
              </div>
            </div>
            <Badge variant="outline" className="gap-1 text-emerald-500">
              <CheckCircle2 className="h-3 w-3" />
              Connected
            </Badge>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Mail className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="font-medium text-sm">Slack</p>
                <p className="text-xs text-muted-foreground">Notifications and alerts</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Connect</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


