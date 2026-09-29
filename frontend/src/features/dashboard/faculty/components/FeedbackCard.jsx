import { MdOutlineStar } from "react-icons/md";

const statusStyles = {
  Pending: "bg-amber-50 text-amber-600",
  Reviewed: "bg-emerald-50 text-emerald-600",
};

export default function FeedbackCard({ feedback, rating }) {
  return (
    <div className="card flex gap-3 p-4">
      <img src={feedback.photo} alt={feedback.student} className="h-11 w-11 shrink-0 rounded-full object-cover" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="font-semibold text-slate-700">{feedback.student}</p>
          {feedback.status && (
            <span className={`badge shrink-0 ${statusStyles[feedback.status]}`}>{feedback.status}</span>
          )}
        </div>
        <p className="mt-1 text-sm text-slate-500">{feedback.message || feedback.comment}</p>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-xs text-slate-400">{feedback.date}</p>
          {rating && (
            <div className="flex items-center gap-0.5 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <MdOutlineStar key={i} size={16} className={i < rating ? "opacity-100" : "opacity-20"} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}