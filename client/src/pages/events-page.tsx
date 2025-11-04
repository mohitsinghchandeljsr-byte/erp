import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Plus, MapPin, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

type Event = {
  id: string;
  title: string;
  description: string | null;
  startDate: string;
  endDate: string | null;
  location: string | null;
  requiresRsvp: boolean;
  createdBy: string;
  createdAt: string;
};

export default function EventsPage() {
  const { data: events = [], isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

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

      {isLoading ? (
        <div className="text-center py-8 text-muted-foreground">Loading events...</div>
      ) : events.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            No events found. Create your first event to get started!
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {events.map(event => {
            const startDate = new Date(event.startDate);
            const endDate = event.endDate ? new Date(event.endDate) : null;
            const isUpcoming = startDate > new Date();

            return (
              <Card key={event.id} className="hover-elevate">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-xl font-semibold">{event.title}</h3>
                        <Badge variant={isUpcoming ? "default" : "outline"}>
                          {isUpcoming ? "Upcoming" : "Past"}
                        </Badge>
                        {event.requiresRsvp && (
                          <Badge variant="secondary">RSVP Required</Badge>
                        )}
                      </div>
                      
                      {event.description && (
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="text-muted-foreground">Start Date</div>
                            <div className="font-medium">{format(startDate, "MMM dd, yyyy")}</div>
                          </div>
                        </div>
                        
                        {endDate && (
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <div className="text-muted-foreground">End Date</div>
                              <div className="font-medium">{format(endDate, "MMM dd, yyyy")}</div>
                            </div>
                          </div>
                        )}
                        
                        {event.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <div className="text-muted-foreground">Venue</div>
                              <div className="font-medium">{event.location}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button variant="outline" size="sm">View Details</Button>
                      {isUpcoming && event.requiresRsvp && (
                        <Button variant="outline" size="sm">RSVP</Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
