import React, { useState } from "react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/axios";

export const AddTask = ({ handleNewTaskAdded }) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const addTask = async () => {
    if (!newTaskTitle.trim()) {
      toast.error("Please enter a task title.");
      return;
    }

    try {
      setLoading(true);
      await api.post("/tasks", { title: newTaskTitle });
      toast.success(`Task "${newTaskTitle}" has been added.`);
      handleNewTaskAdded();
      setNewTaskTitle("");
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Failed to add task.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  return (
    <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          type="text"
          placeholder="What needs to be done?"
          className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
          value={newTaskTitle}
          onChange={(event) => setNewTaskTitle(event.target.value)}
          onKeyPress={handleKeyPress}
        />

        <Button
          variant="gradient"
          size="xl"
          className="px-6"
          onClick={addTask}
          disabled={!newTaskTitle.trim() || loading}
        >
          <Plus className="size-5" />
          {loading ? "Adding..." : "Add"}
        </Button>
      </div>
    </Card>
  );
};
