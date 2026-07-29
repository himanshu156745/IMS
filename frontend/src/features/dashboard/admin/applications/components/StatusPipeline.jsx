import { Check, X } from "lucide-react";
import { PIPELINE_STEPS, pipelineIndex, isRejected } from "../utils/pipelineSteps";

export default function StatusPipeline({ status }) {
  if (isRejected(status)) {
    return (
      <div className="flex items-center gap-2 rounded-xl bg-danger-bg px-4 py-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-danger text-white">
          <X className="w-4 h-4" strokeWidth={2.25} />
        </div>
        <div>
          <p className="text-sm font-semibold text-danger font-body">Application Rejected</p>
          <p className="text-xs text-slate-500 font-body">Applied → Under Review → Rejected</p>
        </div>
      </div>
    );
  }

  const currentIndex = pipelineIndex(status);

  return (
    <div className="flex flex-wrap items-center gap-y-3">
      {PIPELINE_STEPS.map((step, i) => {
        const done = i <= currentIndex;
        const isLast = i === PIPELINE_STEPS.length - 1;
        return (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5 min-w-[84px]">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                  done ? "bg-primary text-white" : "bg-line text-slate-400"
                }`}
              >
                {done ? <Check className="w-3.5 h-3.5" strokeWidth={2.5} /> : i + 1}
              </div>
              <span className={`text-[11px] text-center font-body ${done ? "text-heading font-medium" : "text-slate-400"}`}>
                {step}
              </span>
            </div>
            {!isLast && (
              <div className={`h-0.5 w-6 sm:w-10 mb-5 ${i < currentIndex ? "bg-primary" : "bg-line"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}