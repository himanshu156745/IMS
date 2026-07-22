const MOCK_COMPANIES = [
  { id: 1, initial: "G", name: "Google", meta: "Bengaluru · Technology", open: 12, engaged: 32, rating: 4.9 },
  { id: 2, initial: "M", name: "Microsoft", meta: "Hyderabad · Technology", open: 8, engaged: 26, rating: 4.7 },
  { id: 3, initial: "A", name: "Amazon", meta: "Chennai · E-commerce", open: 15, engaged: 42, rating: 4.7 },
  { id: 4, initial: "S", name: "Stripe", meta: "Remote · Fintech", open: 4, engaged: 15, rating: 4.6 },
];

export default function TopHiringCompanies() {
  return (
    <div className="rounded-md bg-white shadow-sm p-5">
      <h2 className="font-display text-base text-ink mb-4">Top Hiring Companies</h2>
      <ul className="space-y-4">
        {MOCK_COMPANIES.map((c) => (
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
    </div>
  );
}