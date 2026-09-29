export default function Loader({ label = "Loading..." }) {
  return (
    <div className="flex h-64 w-full flex-col items-center justify-center gap-3">
      <div className="h-9 w-9 animate-spin rounded-full border-4 border-brand-100 border-t-brand-500" />
      <p className="text-sm font-medium text-slate-400">{label}</p>
    </div>
  );
}