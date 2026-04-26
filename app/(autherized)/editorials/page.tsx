import { db } from "@/lib/db"

export default async function EditorialsPage() {
  const contests = await db.contest.findMany({
    include: { editorial: true },
    orderBy: { heldAt: "desc" },
  })

  const withEditorial = contests.filter((c) => c.editorial !== null)
  const withoutEditorial = contests.filter((c) => c.editorial === null)

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Editorials</h1>
      <p className="text-muted-foreground mb-8">
        Browse editorials for all contests.
      </p>

      {contests.length === 0 && (
        <p className="text-muted-foreground">No contests found.</p>
      )}

      <div className="flex flex-col gap-4">
        {withEditorial.map((contest) => (
          
            key={contest.id}
            href={contest.editorial?.pdfUrl ?? "#"}
            download
            className="border rounded-lg p-5 hover:bg-muted transition-colors flex items-center justify-between"
          >
            <div>
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold">{contest.name}</h2>
                <span className="text-xs text-muted-foreground">
                  {contest.heldAt
                    ? new Date(contest.heldAt).toLocaleDateString()
                    : "Date TBD"}
                </span>
              </div>
              {contest.description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {contest.description}
                </p>
              )}
              <span className="inline-block mt-3 text-xs font-medium text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded-full">
                Editorial available
              </span>
            </div>
            <span className="ml-6 text-2xl text-muted-foreground">↓</span>
          </a>
        ))}

        {withoutEditorial.map((contest) => (
          <div
            key={contest.id}
            className="border rounded-lg p-5 opacity-50 cursor-not-allowed"
          >
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold">{contest.name}</h2>
              <span className="text-xs text-muted-foreground">
                {contest.heldAt
                  ? new Date(contest.heldAt).toLocaleDateString()
                  : "Date TBD"}
              </span>
            </div>
            <span className="inline-block mt-3 text-xs font-medium text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400 px-2 py-0.5 rounded-full">
              Editorial coming soon
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
