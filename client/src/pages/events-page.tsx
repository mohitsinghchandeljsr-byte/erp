import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Plus, MapPin, Clock, Users } from "lucide-react";

export default function EventsPage() {
  const events = [
    {
      id: 1,
      title: "Industry Guest Lecture - Digital Marketing",
      date: "2024-11-25",
      time: "02:00 PM - 04:00 PM",
      location: "Auditorium Hall",
      speaker: "Mr. Amit Shah, Google India",
      attendees: 120,
      status: "upcoming",
    },
    {
      id: 2,
      title: "MBA Sports Day 2024",
      date: "2024-12-05",
      time: "09:00 AM - 05:00 PM",
      location: "Sports Ground",
      speaker: "N/A",
      attendees: 200,
      status: "upcoming",
    },
    {
      id: 3,
      title: "Business Plan Competition Finals",
      date: "2024-11-18",
      time: "10:00 AM - 01:00 PM",
      location: "Seminar Hall",
      speaker: "Panel of Judges",
      attendees: 80,
      status: "upcoming",
    },
    {
      id: 4,
      title: "Alumni Meet & Networking Session",
      date: "2024-10-28",
      time: "06:00 PM - 09:00 PM",
      location: "Conference Room",
      speaker: "Alumni Association",
      attendees: 65,
      status: "completed",
    },
  ];

  return (
    <div className="space-y-6" data-testid="page-events">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <CalendarDays className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Events & Activities</h1>
            <p className="text-muted-foreground mt-1">
              Upcoming events, workshops, and college activities
            </p>
          </div>
        </div>
        <Button data-testid="button-create-event">
          <Plus className="mr-2 h-4 w-4" />
          Create Event
        </Button>
      </div>

      <div className="grid gap-4">
        {events.map(event => (
          <Card key={event.id} className="hover-elevate">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-semibold">{event.title}</h3>
                    <Badge variant={event.status === "upcoming" ? "default" : "outline"}>
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-muted-foreground">Date</div>
                        <div className="font-medium">{new Date(event.date).toLocaleDateString()}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-muted-foreground">Time</div>
                        <div className="font-medium">{event.time}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-muted-foreground">Venue</div>
                        <div className="font-medium">{event.location}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-muted-foreground">Expected</div>
                        <div className="font-medium">{event.attendees} attendees</div>
                      </div>
                    </div>
                  </div>

                  {event.speaker !== "N/A" && (
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Speaker:</span> {event.speaker}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <Button variant="outline" size="sm">View Details</Button>
                  {event.status === "upcoming" && (
                    <Button variant="outline" size="sm">RSVP</Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
