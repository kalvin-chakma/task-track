import {
  Layout,
  Shield,
  Zap,
  Database,
  GripVertical,
  Calendar,
} from "lucide-react";

const features = [
  {
    icon: Layout,
    title: "Kanban Board",
    description:
      "Visualize your workflow with intuitive columns: To Do, In Progress, and Completed.",
  },
  {
    icon: GripVertical,
    title: "Drag & Drop",
    description:
      "Effortlessly move tasks between columns with smooth drag and drop functionality.",
  },
  {
    icon: Shield,
    title: "Secure Auth",
    description:
      "Industry-standard password hashing with bcrypt and secure session management.",
  },
  {
    icon: Database,
    title: "PostgreSQL + Prisma",
    description:
      "Reliable data persistence with NeonDB serverless PostgreSQL and Prisma ORM.",
  },
  {
    icon: Calendar,
    title: "Due Dates",
    description:
      "Set due dates for tasks and never miss a deadline with visual reminders.",
  },
  {
    icon: Zap,
    title: "Fast & Responsive",
    description:
      "Built with Next.js for blazing fast performance on any device.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Everything you need to stay organized
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Task-Tracker provides all the tools you need to manage your tasks
            efficiently, from a beautiful interface to secure data storage.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50 hover:bg-card/80"
            >
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
