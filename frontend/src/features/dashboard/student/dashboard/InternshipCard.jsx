import { MapPin, Laptop, Wallet } from "lucide-react";
import Button from "./ui/Button.jsx";

export default function InternshipCard({ internship, onApply }) {
  const { company, role, location, workMode, stipend, logoText, logoColor } = internship;
  return (
    <div className="flex flex-col justify-between rounded-xl border border-gray-200 p-4 transition-shadow hover:shadow-md sm:p-5">
      <div className="flex items-start gap-3">
        <div
          className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white ${logoColor}`}
        >
          {logoText}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-gray-900">{company}</p>
          <p className="truncate text-sm text-gray-500">{role}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-gray-500">
        <span className="inline-flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" /> {location}
        </span>
        <span className="inline-flex items-center gap-1">
          <Laptop className="h-3.5 w-3.5" /> {workMode}
        </span>
        <span className="inline-flex items-center gap-1 font-medium text-gray-700">
          <Wallet className="h-3.5 w-3.5" /> {stipend}
        </span>
      </div>

      <Button
        variant="primary"
        className="mt-4 w-full justify-center"
        onClick={() => onApply?.(internship)}
      >
        Apply Now
      </Button>
    </div>
  );
}
