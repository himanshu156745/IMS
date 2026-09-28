import { Star, ArrowRight, Building2 } from "lucide-react";
import Card from "./ui/Card.jsx";
import SectionHeader from "./ui/SectionHeader.jsx";
import Button from "./ui/Button.jsx";

const STATUS_STYLES = {
  "Under Review": "bg-blue-50 text-blue-700",
  Pending: "bg-amber-50 text-amber-700",
  Shortlisted: "bg-emerald-50 text-emerald-700",
  Applied: "bg-gray-100 text-gray-600",
  Rejected: "bg-rose-50 text-rose-700",
};

export default function ApplicationList({ applications, onViewAll }) {
  return (
    <Card className="p-5 sm:p-6">
      <SectionHeader title={`My Applications (${applications.length})`} />
      <ul className="divide-y divide-gray-100">
        {applications.map((app) => (
          <li key={app.id} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                <Building2 className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-gray-900">{app.company}</p>
                <p className="truncate text-xs text-gray-500">{app.role}</p>
              </div>
            </div>
            <span
              className={`inline-flex flex-shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                STATUS_STYLES[app.status] || "bg-gray-100 text-gray-600"
              }`}
            >
              {app.status}
              {app.status === "Shortlisted" && <Star className="h-3 w-3 fill-current" />}
            </span>
          </li>
        ))}
      </ul>
      <Button
        variant="ghost"
        className="mt-4 w-full justify-center border border-gray-200"
        icon={ArrowRight}
        onClick={onViewAll}
      >
        View All Applications
      </Button>
    </Card>
  );
}
