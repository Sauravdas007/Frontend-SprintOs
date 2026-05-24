import { DashboardTabs } from "@/components/dashboard/dashboard-tabs";

export default function DashboardPage() {
  return <DashboardTabs />;
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
