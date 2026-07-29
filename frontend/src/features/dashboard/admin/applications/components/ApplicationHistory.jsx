export default function ApplicationHistory({ history }) {
  return (
    <div className="space-y-0">
      {history.map((h, i) => (
        <div key={h.step} className="flex gap-3">
          <div className="flex flex-col items-center">
            <span className="h-3 w-3 rounded-full bg-primary" />
            {i !== history.length - 1 && <span className="h-10 w-0.5 bg-line" />}
          </div>
          <div className="-mt-1 pb-2">
            <p className="text-sm font-semibold text-heading font-body">{h.step}</p>
            <p className="text-xs text-slate-400 font-body">{h.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
}