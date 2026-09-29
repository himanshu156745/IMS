const VARIANTS = {
  onTrack: "bg-signal-light text-signal",
  attention: "bg-amber-light text-amber",
  overdue: "bg-coral-light text-coral",
  neutral: "bg-slate/10 text-slate",
};

export default function Badge({ children, variant = "neutral" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium font-body ${VARIANTS[variant]}`}
    >
      {children}
    </span>
  );
}