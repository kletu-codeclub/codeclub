const editorials = [
  {
    contest: "AlgoBlitz 3.0",
    pdfUrl: "/AlgoBlitz3.0_Editorial.pdf",
    available: true,
  },
  {
    contest: "Laughtale",
    pdfUrl: "/LAUGHTALE_EDITORIAL.pdf",
    available: true,
  },
];

export default function EditorialsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Editorials</h1>
      <p className="text-muted-foreground mb-8">
        Browse editorials for all contests.
      </p>
      <div className="flex flex-col gap-4">
        {editorials.map((e) => (
          <div
            key={e.contest}
            className="border rounded-lg p-5 flex items-center justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold">{e.contest}</h2>
              {e.available ? (
                <span className="inline-block mt-3 text-xs font-medium text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded-full">
                  Editorial available
                </span>
              ) : (
                <span className="inline-block mt-3 text-xs font-medium text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400 px-2 py-0.5 rounded-full">
                  Editorial coming soon
                </span>
              )}
            </div>
            {e.available && (
              <a
                href={e.pdfUrl}
                download
                className="border rounded-lg px-4 py-2 text-sm hover:bg-muted transition-colors"
              >
                ↓ Download
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
