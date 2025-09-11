import React from "react";
import { Circle } from "lucide-react";
import { Card } from "../ui/card";

export const TaskEmptyState = ({ filter }) => {
  return (
    <Card className="p-8 text-center border-0 bg-gradient-card shadow-custom-md">
      <div className="space-y-3">
        <Circle className="mx-auto size-12 text-muted-foreground" />
        <div>
          <h3 className="font-medium text-foreground">
            {filter === "active"
              ? "No active tasks."
              : filter === "completed"
              ? "No completed tasks yet."
              : "No tasks available."}
          </h3>

          <p className="text-sm text-muted-foreground">
            {filter === "all"
              ? "Add your first task to get started!"
              : `Switch to "All" to see the tasks that are ${
                  filter === "active" ? "completed." : "still active."
                }`}
          </p>
        </div>
      </div>
    </Card>
  );
};
