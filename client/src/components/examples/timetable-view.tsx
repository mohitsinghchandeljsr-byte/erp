import { TimetableView } from "../timetable-view";

export default function TimetableViewExample() {
  const mockSlots = [
    {
      id: "1",
      day: "Monday",
      startTime: "9:00",
      endTime: "10:30",
      subject: "Financial Management",
      teacher: "Dr. Sharma",
      room: "101",
    },
    {
      id: "2",
      day: "Monday",
      startTime: "11:00",
      endTime: "12:30",
      subject: "Marketing Strategy",
      teacher: "Prof. Kumar",
      room: "203",
    },
    {
      id: "3",
      day: "Tuesday",
      startTime: "9:00",
      endTime: "10:30",
      subject: "Operations Management",
      teacher: "Dr. Patel",
      room: "105",
    },
    {
      id: "4",
      day: "Wednesday",
      startTime: "14:00",
      endTime: "15:30",
      subject: "Business Analytics",
      teacher: "Prof. Singh",
      room: "Lab 1",
    },
  ];

  return (
    <div className="p-8 max-w-6xl">
      <TimetableView slots={mockSlots} batch="2024-2026" />
    </div>
  );
}
