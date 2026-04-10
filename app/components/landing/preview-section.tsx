"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Calendar, GripVertical } from "lucide-react";
import Header from "./header";

const initialTasks = {
  todo: [
    {
      id: "1",
      title: "Design new landing page",
      dueDate: "Mar 28",
      priority: "High",
    },
    {
      id: "2",
      title: "Review API documentation",
      dueDate: "Mar 30",
      priority: "Medium",
    },
  ],
  inProgress: [
    {
      id: "3",
      title: "Implement user authentication",
      dueDate: "Mar 27",
      priority: "High",
    },
  ],
  completed: [
    {
      id: "4",
      title: "Setup project repository",
      dueDate: "Mar 25",
      priority: "Low",
    },
    {
      id: "5",
      title: "Configure database schema",
      dueDate: "Mar 26",
      priority: "Medium",
    },
  ],
};

const priorityColors: Record<string, string> = {
  High: "bg-red-500/20 text-red-400 border-red-500/30",
  Medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Low: "bg-green-500/20 text-green-400 border-green-500/30",
};

const columnColors: Record<string, string> = {
  todo: "border-t-blue-500",
  inProgress: "border-t-yellow-500",
  completed: "border-t-green-500",
};

const columnTitles: Record<string, string> = {
  todo: "To Do",
  inProgress: "In Progress",
  completed: "Completed",
};

export function PreviewSection({ className }: { className?: string }) {
  const [tasks] = useState(initialTasks);

  return (
    <section className={`py-20${className || ""}`}>
      <div className="container mx-auto px-4">
        {/* Section header */}
        <Header
          className="mx-auto mb-12 max-w-2xl text-center"
          variant="section"
          title={
            <span className="text-3xl font-bold tracking-tight text-balance md:text-4xl">
              A beautiful Kanban experience
            </span>
          }
          subtitle="See your tasks at a glance and move them through your workflow with ease."
          subtitleClass="mx-auto"
        />

        {/* Kanban preview */}
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-4 md:grid-cols-3">
            {(Object.keys(tasks) as Array<keyof typeof tasks>).map((column) => (
              <div key={column} className="flex flex-col">
                <Card
                  className={`border-t-4 ${columnColors[column]} bg-card/50`}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between text-base">
                      <span>{columnTitles[column]}</span>
                      <Badge variant="secondary" className="font-normal">
                        {tasks[column].length}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {tasks[column].map((task) => (
                      <div
                        key={task.id}
                        className="group border-border bg-background hover:border-primary/50 hover:shadow-primary/5 rounded-lg border p-3 transition-all hover:shadow-lg active:cursor-grabbing"
                      >
                        <div className="flex items-start gap-2">
                          <GripVertical className="text-muted-foreground mt-0.5 h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                          <div className="flex-1 space-y-2">
                            <p className="text-sm leading-tight font-medium">
                              {task.title}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="text-muted-foreground flex items-center gap-1 text-xs">
                                <Calendar className="h-3 w-3" />
                                <span>{task.dueDate}</span>
                              </div>
                              <Badge
                                variant="outline"
                                className={`text-xs ${priorityColors[task.priority]}`}
                              >
                                {task.priority}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
