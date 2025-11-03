import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const eventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  day: z.string().min(1, "Please select a day"),
  timeSlot: z.string().min(1, "Please select a time slot"),
  type: z.string().min(1, "Please select event type"),
  location: z.string().optional(),
});

type EventFormData = z.infer<typeof eventSchema>;

export function TimetableEventDialog() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      day: "",
      timeSlot: "",
      type: "",
      location: "",
    },
  });

  const onSubmit = (data: EventFormData) => {
    toast({
      title: "Event Created",
      description: `${data.title} has been added to the timetable.`,
    });
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button data-testid="button-create-event">
          <Plus className="mr-2 h-4 w-4" />
          Create Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]" data-testid="dialog-create-event">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Create Timetable Event
          </DialogTitle>
          <DialogDescription>
            Add a special event, guest lecture, or activity to your timetable.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Guest Lecture: Digital Marketing"
                      {...field}
                      data-testid="input-event-title"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-event-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="guest-lecture">Guest Lecture</SelectItem>
                      <SelectItem value="workshop">Workshop</SelectItem>
                      <SelectItem value="seminar">Seminar</SelectItem>
                      <SelectItem value="special-class">Special Class</SelectItem>
                      <SelectItem value="exam">Exam</SelectItem>
                      <SelectItem value="activity">Activity</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="day"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Day</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-event-day">
                          <SelectValue placeholder="Select day" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Monday">Monday</SelectItem>
                        <SelectItem value="Tuesday">Tuesday</SelectItem>
                        <SelectItem value="Wednesday">Wednesday</SelectItem>
                        <SelectItem value="Thursday">Thursday</SelectItem>
                        <SelectItem value="Friday">Friday</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="timeSlot"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time Slot</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-event-time">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="09:00 - 10:30">09:00 - 10:30</SelectItem>
                        <SelectItem value="10:45 - 12:15">10:45 - 12:15</SelectItem>
                        <SelectItem value="13:00 - 14:30">13:00 - 14:30</SelectItem>
                        <SelectItem value="14:45 - 16:15">14:45 - 16:15</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Auditorium, Room 101"
                      {...field}
                      data-testid="input-event-location"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add any additional details..."
                      {...field}
                      data-testid="textarea-event-description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                data-testid="button-cancel-event"
              >
                Cancel
              </Button>
              <Button type="submit" data-testid="button-submit-event">
                Create Event
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
