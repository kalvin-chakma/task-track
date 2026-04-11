export default function Loading() {
  const columns = Array.from({ length: 3 });

  return (
    <div className="mt-5">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {columns.map((_, colIndex) => (
          <div
            key={colIndex}
            className="rounded-lg border border-gray-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
          >
            {/* Column Header Skeleton */}
            <div className="mb-4 flex items-center justify-between">
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-zinc-800" />
              <div className="h-5 w-8 animate-pulse rounded-full bg-gray-200 dark:bg-zinc-800" />
            </div>

            {/* Task Cards Skeleton */}
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-zinc-800 dark:bg-zinc-900"
                >
                  {/* Title */}
                  <div className="mb-3 h-3 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-zinc-800" />

                  {/* Bottom row */}
                  <div className="flex items-center justify-between">
                    <div className="h-3 w-16 animate-pulse rounded bg-gray-200 dark:bg-zinc-800" />

                    <div className="flex gap-2">
                      <div className="h-4 w-4 animate-pulse rounded bg-gray-200 dark:bg-zinc-800" />
                      <div className="h-4 w-4 animate-pulse rounded bg-gray-200 dark:bg-zinc-800" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
