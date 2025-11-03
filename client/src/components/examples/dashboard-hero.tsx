import { DashboardHero } from "../dashboard-hero";

export default function DashboardHeroExample() {
  return (
    <div className="p-8 bg-background">
      <h2 className="text-2xl font-semibold mb-6">Dashboard Hero</h2>
      <DashboardHero
        name="Welcome back, Rajesh!"
        subtitle="MBA 2024-2026 • Student ID: MBA2024001"
        initials="RK"
      />
    </div>
  );
}
