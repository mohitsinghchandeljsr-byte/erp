import {
  BookOpen,
  Calendar,
  ClipboardList,
  Database,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LibraryBig,
  StickyNote,
  Users,
  CreditCard,
  CalendarDays,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "wouter";

const teacherMenuItems = [
  {
    title: "Dashboard",
    url: "/teacher",
    icon: LayoutDashboard,
    group: "Overview",
  },
  {
    title: "Students",
    url: "/teacher/students",
    icon: Users,
    group: "Management",
  },
  {
    title: "Attendance",
    url: "/teacher/attendance",
    icon: ClipboardList,
    group: "Management",
  },
  {
    title: "Timetable",
    url: "/teacher/timetable",
    icon: Calendar,
    group: "Management",
  },
  {
    title: "Exams",
    url: "/teacher/exams",
    icon: FileText,
    group: "Academics",
  },
  {
    title: "Marks",
    url: "/teacher/marks",
    icon: GraduationCap,
    group: "Academics",
  },
  {
    title: "E-Books",
    url: "/teacher/ebooks",
    icon: LibraryBig,
    group: "Resources",
  },
  {
    title: "Syllabus",
    url: "/teacher/syllabus",
    icon: BookOpen,
    group: "Resources",
  },
  {
    title: "Events",
    url: "/teacher/events",
    icon: CalendarDays,
    group: "Resources",
  },
  {
    title: "Database",
    url: "/teacher/database",
    icon: Database,
    group: "System",
  },
];

const studentMenuItems = [
  {
    title: "Dashboard",
    url: "/student",
    icon: LayoutDashboard,
  },
  {
    title: "My Attendance",
    url: "/student/attendance",
    icon: ClipboardList,
  },
  {
    title: "Timetable",
    url: "/student/timetable",
    icon: Calendar,
  },
  {
    title: "Exams",
    url: "/student/exams",
    icon: FileText,
  },
  {
    title: "My Marks",
    url: "/student/marks",
    icon: GraduationCap,
  },
  {
    title: "E-Books",
    url: "/student/ebooks",
    icon: LibraryBig,
  },
  {
    title: "Notes",
    url: "/student/notes",
    icon: StickyNote,
  },
  {
    title: "ID Card",
    url: "/student/idcard",
    icon: CreditCard,
  },
];

interface AppSidebarProps {
  role: "teacher" | "student";
}

export function AppSidebar({ role }: AppSidebarProps) {
  const [location] = useLocation();

  if (role === "teacher") {
    const groupedItems = teacherMenuItems.reduce((acc, item) => {
      if (!acc[item.group]) {
        acc[item.group] = [];
      }
      acc[item.group].push(item);
      return acc;
    }, {} as Record<string, typeof teacherMenuItems>);

    return (
      <Sidebar data-testid="sidebar-teacher">
        <SidebarHeader className="p-6">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Gaya College</h2>
              <p className="text-xs text-muted-foreground">MBA Department</p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          {Object.entries(groupedItems).map(([group, items]) => (
            <SidebarGroup key={group}>
              <SidebarGroupLabel>{group}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={location === item.url}>
                        <Link href={item.url} data-testid={`link-${item.title.toLowerCase().replace(/\s+/g, '-')}`}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
      </Sidebar>
    );
  }

  return (
    <Sidebar data-testid="sidebar-student">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Gaya College</h2>
            <p className="text-xs text-muted-foreground">Student Portal</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {studentMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location === item.url}>
                    <Link href={item.url} data-testid={`link-${item.title.toLowerCase().replace(/\s+/g, '-')}`}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
