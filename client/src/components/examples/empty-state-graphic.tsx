import { EmptyStateGraphic } from "../empty-state-graphic";

export default function EmptyStateGraphicExample() {
  return (
    <div className="p-8 bg-background">
      <h2 className="text-2xl font-semibold mb-6">Empty State Graphics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Calendar</h3>
          <div className="h-48">
            <EmptyStateGraphic type="calendar" />
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Books</h3>
          <div className="h-48">
            <EmptyStateGraphic type="books" />
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Notes</h3>
          <div className="h-48">
            <EmptyStateGraphic type="notes" />
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Exams</h3>
          <div className="h-48">
            <EmptyStateGraphic type="exams" />
          </div>
        </div>
      </div>
    </div>
  );
}
