import { AttendanceCalendar } from "../attendance-calendar";

export default function AttendanceCalendarExample() {
  const mockRecords = [
    { date: "2024-11-01", status: "present" as const },
    { date: "2024-11-02", status: "present" as const },
    { date: "2024-11-04", status: "absent" as const },
    { date: "2024-11-05", status: "present" as const },
    { date: "2024-11-06", status: "leave" as const },
    { date: "2024-11-07", status: "present" as const },
    { date: "2024-11-08", status: "present" as const },
  ];

  return (
    <div className="p-8 max-w-2xl">
      <AttendanceCalendar
        month={new Date(2024, 10, 1)}
        records={mockRecords}
        percentage={87}
      />
    </div>
  );
}
