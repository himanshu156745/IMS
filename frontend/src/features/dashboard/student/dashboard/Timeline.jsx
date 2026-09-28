import { Check } from "lucide-react";
import Card from "./ui/Card.jsx";
import SectionHeader from "./ui/SectionHeader.jsx";

export default function Timeline({ steps }) {
  return (
    <Card className="p-5 sm:p-6">
      <SectionHeader title="Application Timeline" />
      <ol>
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          return (
            <li key={step.id} className="relative flex gap-4 pb-8 last:pb-0">
              {!isLast && (
                <span
                  className={`absolute left-[15px] top-8 h-full w-0.5 ${
                    step.completed ? "bg-indigo-500" : "bg-gray-200"
                  }`}
                />
              )}
              <span
                className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 ${
                  step.completed
                    ? "border-indigo-500 bg-indigo-500 text-white"
                    : "border-gray-300 bg-white text-gray-400"
                }`}
              >
                {step.completed && <Check className="h-4 w-4" />}
              </span>
              <div className="pt-1">
                <p
                  className={`text-sm font-semibold ${
                    step.completed ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  {step.label}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </Card>
  );
}
