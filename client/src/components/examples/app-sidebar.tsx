import { AppSidebar } from "../app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AppSidebarExample() {
  const style = {
    "--sidebar-width": "20rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar role="teacher" />
        <div className="flex-1 p-8">
          <h1 className="text-2xl font-semibold">Teacher Sidebar Demo</h1>
          <p className="text-muted-foreground mt-2">
            Click the menu items to see active states
          </p>
        </div>
      </div>
    </SidebarProvider>
  );
}
