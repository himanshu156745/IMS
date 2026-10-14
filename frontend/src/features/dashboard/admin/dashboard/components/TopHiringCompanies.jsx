export default function TopHiringCompanies({ companies = [] }) {
  const list = companies.map((c) => {
    const name = c.name || "Company";
    return {
      id: c._id || c.id,
      initial: name[0]?.toUpperCase() || "C",
      name,
      meta: `${c.location || "Remote"} · ${c.industry || "Technology"}`,
      open: c.openPositions || 0,
      engaged: c.engaged || 0,
      rating: 4.8,
    };
  });

  return (
    <div className="rounded-md bg-white shadow-sm p-5">
      <h2 className="font-display text-base text-ink mb-4">Top Hiring Companies</h2>
      {list.length === 0 ? (
        <p className="text-xs text-slate font-body py-4 text-center">No companies registered yet.</p>
      ) : (
        <ul className="space-y-4">
          {list.map((c) => (
            <li key={c.id} className="flex items-center gap-3">
              <span className="w-9 h-9 shrink-0 rounded-md bg-amber/10 text-amber text-sm font-medium flex items-center justify-center">
                {c.initial}
              </span>
              <div className="flex-1 min-w-0">
                <span className="text-sm text-ink font-body">{c.name}</span>
                <p className="text-[11px] text-slate/70 font-body truncate">{c.meta}</p>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-body shrink-0">
                <span className="text-slate">{c.open} open</span>
                <span className="text-slate">{c.engaged} engaged</span>
                <span className="text-amber font-medium">★ {c.rating}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
