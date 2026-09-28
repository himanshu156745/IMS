import * as Icons from "lucide-react";

const ACCENTS = {
  indigo: "bg-indigo-50 text-indigo-600",
  blue: "bg-blue-50 text-blue-600",
  amber: "bg-amber-50 text-amber-600",
  emerald: "bg-emerald-50 text-emerald-600",
  rose: "bg-rose-50 text-rose-600",
};

export default function StatsCard({ label, value, icon, accent = "indigo" }) {
  const Icon = Icons[icon] || Icons.Activity;
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">{label}</p>
          <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${ACCENTS[accent] || ACCENTS.indigo}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
