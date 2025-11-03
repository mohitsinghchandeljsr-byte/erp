import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { AppSidebar } from "@/components/app-sidebar";
import { ChatBot } from "@/components/chat-bot";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import LoginPage from "@/pages/login";
import TeacherDashboard from "@/pages/teacher-dashboard";
import StudentsPage from "@/pages/students-page";
import AttendancePage from "@/pages/attendance-page";
import TimetablePage from "@/pages/timetable-page";
import ExamsPage from "@/pages/exams-page";
import MarksPage from "@/pages/marks-page";
import EBooksPage from "@/pages/ebooks-page";
import EventsPage from "@/pages/events-page";
import StudentDashboard from "@/pages/student-dashboard";
import NotFound from "@/pages/not-found";
import { Bell, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function TeacherLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const style = {
    "--sidebar-width": "20rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar role="teacher" />
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between gap-4 p-4 border-b bg-background sticky top-0 z-40">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <div className="flex items-center gap-2">
              <ChatBot />
              <Button variant="ghost" size="icon" data-testid="button-notifications">
                <Bell className="h-5 w-5" />
              </Button>
              <ThemeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>{user?.name.split(" ").map(n => n[0]).join("").toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} data-testid="button-logout">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function StudentLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const style = {
    "--sidebar-width": "20rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar role="student" />
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between gap-4 p-4 border-b bg-background sticky top-0 z-40">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <div className="flex items-center gap-2">
              <ChatBot />
              <Button variant="ghost" size="icon" data-testid="button-notifications">
                <Bell className="h-5 w-5" />
              </Button>
              <ThemeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>{user?.name.split(" ").map(n => n[0]).join("").toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} data-testid="button-logout">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function ProtectedRoute({ children, requireRole }: { children: React.ReactNode; requireRole: "teacher" | "student" }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!user) {
    return <Redirect to="/" />;
  }

  if (user.role !== requireRole) {
    return <Redirect to={user.role === "teacher" ? "/teacher" : "/student"} />;
  }

  return <>{children}</>;
}

function Router() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <Switch>
      <Route path="/">
        {() => {
          if (user) {
            return <Redirect to={user.role === "teacher" ? "/teacher" : "/student"} />;
          }
          return <LoginPage />;
        }}
      </Route>
      <Route path="/teacher">
        {() => (
          <ProtectedRoute requireRole="teacher">
            <TeacherLayout>
              <TeacherDashboard />
            </TeacherLayout>
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/teacher/students">
        {() => (
          <ProtectedRoute requireRole="teacher">
            <TeacherLayout>
              <StudentsPage />
            </TeacherLayout>
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/teacher/attendance">
        {() => (
          <ProtectedRoute requireRole="teacher">
            <TeacherLayout>
              <AttendancePage />
            </TeacherLayout>
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/teacher/timetable">
        {() => (
          <ProtectedRoute requireRole="teacher">
            <TeacherLayout>
              <TimetablePage />
            </TeacherLayout>
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/teacher/exams">
        {() => (
          <ProtectedRoute requireRole="teacher">
            <TeacherLayout>
              <ExamsPage />
            </TeacherLayout>
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/teacher/marks">
        {() => (
          <ProtectedRoute requireRole="teacher">
            <TeacherLayout>
              <MarksPage />
            </TeacherLayout>
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/teacher/ebooks">
        {() => (
          <ProtectedRoute requireRole="teacher">
            <TeacherLayout>
              <EBooksPage />
            </TeacherLayout>
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/teacher/events">
        {() => (
          <ProtectedRoute requireRole="teacher">
            <TeacherLayout>
              <EventsPage />
            </TeacherLayout>
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/student">
        {() => (
          <ProtectedRoute requireRole="student">
            <StudentLayout>
              <StudentDashboard />
            </StudentLayout>
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/student/attendance">
        {() => (
          <ProtectedRoute requireRole="student">
            <StudentLayout>
              <AttendancePage />
            </StudentLayout>
          </ProtectedRoute>
        )}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider defaultTheme="light">
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
