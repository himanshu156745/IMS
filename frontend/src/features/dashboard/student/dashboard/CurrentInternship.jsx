import { Calendar, FileText, ArrowUpRight } from "lucide-react";
import Card from "./ui/Card.jsx";
import Button from "./ui/Button.jsx";
import SectionHeader from "./ui/SectionHeader.jsx";

export default function CurrentInternship({ internship, onViewDetails, onSubmitReport }) {
  const { company, role, startDate, endDate, durationLabel, progressPercent } = internship;
  return (
    <Card className="p-5 sm:p-6">
      <SectionHeader title="Current Internship" />

      <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-4 sm:p-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <p className="text-lg font-bold text-gray-900">
              {company} <span className="font-medium text-gray-500">— {role}</span>
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              {startDate} - {endDate} ({durationLabel})
            </p>
          </div>
        </div>

        <div className="mt-5">
          <div className="mb-1.5 flex items-center justify-between text-sm">
            <span className="font-medium text-gray-600">Overall Progress</span>
            <span className="font-semibold text-indigo-600">{progressPercent}%</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-white">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between text-xs text-gray-500">
            <span>Started: {startDate}</span>
            <span>Ends: {endDate}</span>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Button variant="secondary" icon={ArrowUpRight} className="flex-1 justify-center" onClick={onViewDetails}>
          View Details
        </Button>
        <Button variant="primary" icon={FileText} className="flex-1 justify-center" onClick={onSubmitReport}>
          Submit Report
        </Button>
      </div>
    </Card>
  );
}
