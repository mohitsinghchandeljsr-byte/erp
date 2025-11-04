import { Switch, Route, Redirect } from "wouter";
import { lazy, Suspense } from "react";
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

// Lazy load pages for better performance
const TeacherDashboard = lazy(() => import("@/pages/teacher-dashboard"));
const StudentsPage = lazy(() => import("@/pages/students-page"));
const AttendancePage = lazy(() => import("@/pages/attendance-page"));
const TimetablePage = lazy(() => import("@/pages/timetable-page"));
const ExamsPage = lazy(() => import("@/pages/exams-page"));
const MarksPage = lazy(() => import("@/pages/marks-page"));
const EBooksPage = lazy(() => import("@/pages/ebooks-page"));
const SyllabusPage = lazy(() => import("@/pages/syllabus-page"));
const EventsPage = lazy(() => import("@/pages/events-page"));
const StudentDashboard = lazy(() => import("@/pages/student-dashboard"));
const StudentIDCardPage = lazy(() => import("@/pages/student-idcard-page"));
const StudentNotesPage = lazy(() => import("@/pages/student-notes-page"));
const SettingsPage = lazy(() => import("@/pages/settings-page"));
const NotFound = lazy(() => import("@/pages/not-found"));
import { Bell, LogOut, Search, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    "--sidebar-width": "14rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar role="teacher" />
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between gap-3 px-6 py-3 border-b bg-background sticky top-0 z-40">
            <div className="flex items-center gap-3 flex-1">
              <SidebarTrigger data-testid="button-sidebar-toggle" />
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search or type a command (Ctrl + @)" 
                  className="pl-9 bg-muted/50"
                  data-testid="input-search"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" data-testid="button-notifications">
                <Bell className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" data-testid="button-help">
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Documentation</DropdownMenuItem>
                  <DropdownMenuItem>Keyboard Shortcuts</DropdownMenuItem>
                  <DropdownMenuItem>Contact Support</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full" data-testid="button-user-menu">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">{user?.name.split(" ").map(n => n[0]).join("").toUpperCase()}</AvatarFallback>
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
                  <DropdownMenuItem>Profile Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} data-testid="button-logout">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-6" style={{ backgroundColor: '#D9DDDC' }}>
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
    "--sidebar-width": "14rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar role="student" />
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between gap-3 px-6 py-3 border-b bg-background sticky top-0 z-40">
            <div className="flex items-center gap-3 flex-1">
              <SidebarTrigger data-testid="button-sidebar-toggle" />
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search or type a command (Ctrl + @)" 
                  className="pl-9 bg-muted/50"
                  data-testid="input-search"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" data-testid="button-notifications">
                <Bell className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" data-testid="button-help">
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Documentation</DropdownMenuItem>
                  <DropdownMenuItem>Keyboard Shortcuts</DropdownMenuItem>
                  <DropdownMenuItem>Contact Support</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full" data-testid="button-user-menu">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">{user?.name.split(" ").map(n => n[0]).join("").toUpperCase()}</AvatarFallback>
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
                  <DropdownMenuItem>Profile Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} data-testid="button-logout">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-6" style={{ backgroundColor: '#D9DDDC' }}>
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

const PageLoader = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="text-center">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
      <p className="mt-2 text-sm text-muted-foreground">Loading...</p>
    </div>
  </div>
);

function Router() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Suspense fallback={<PageLoader />}>
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
      <Route path="/teacher/syllabus">
        {() => (
          <ProtectedRoute requireRole="teacher">
            <TeacherLayout>
              <SyllabusPage />
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
      <Route path="/teacher/settings">
        {() => (
          <ProtectedRoute requireRole="teacher">
            <TeacherLayout>
              <SettingsPage />
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
      <Route path="/student/timetable">
        {() => (
          <ProtectedRoute requireRole="student">
            <StudentLayout>
              <TimetablePage />
            </StudentLayout>
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/student/exams">
        {() => (
          <ProtectedRoute requireRole="student">
            <StudentLayout>
              <ExamsPage />
            </StudentLayout>
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/student/marks">
        {() => (
          <ProtectedRoute requireRole="student">
            <StudentLayout>
              <MarksPage />
            </StudentLayout>
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/student/ebooks">
        {() => (
          <ProtectedRoute requireRole="student">
            <StudentLayout>
              <EBooksPage />
            </StudentLayout>
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/student/notes">
        {() => (
          <ProtectedRoute requireRole="student">
            <StudentLayout>
              <StudentNotesPage />
            </StudentLayout>
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/student/idcard">
        {() => (
          <ProtectedRoute requireRole="student">
            <StudentLayout>
              <StudentIDCardPage />
            </StudentLayout>
          </ProtectedRoute>
        )}
      </Route>
      <Route component={NotFound} />
      </Switch>
    </Suspense>
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
