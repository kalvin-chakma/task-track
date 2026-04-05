export function TechStackSection() {
  const technologies = [
    { name: "Next.js", description: "React Framework" },
    { name: "Prisma", description: "Type-safe ORM" },
    { name: "NeonDB", description: "Serverless PostgreSQL" },
    // { name: "Tailwind CSS", description: "Utility-first CSS" },
    { name: "Zustand", description: "State Management" },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <p className="mb-8 text-center text-sm text-muted-foreground">
          Built with modern technologies
        </p>
        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-8 md:grid-cols-4">
          {technologies.map((tech) => (
            <div key={tech.name} className="text-center">
              <p className="font-semibold text-foreground">{tech.name}</p>
              <p className="text-sm text-muted-foreground">
                {tech.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
