import { useState } from "react";
import { MdOutlineStar, MdOutlineStarBorder } from "react-icons/md";
import FeedbackCard from "../components/FeedbackCard";
import { studentFeedback, feedbackHistory } from "../data/feedback.service";
import { students } from "../data/students.service";

export default function Feedback() {
  const [selectedStudent, setSelectedStudent] = useState(students[0].id);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!rating || !comment.trim()) return;
    setSubmitted(true);
    setRating(0);
    setComment("");
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="card p-5 lg:col-span-2">
          <h3 className="mb-4 font-bold text-slate-800">Student Feedback</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {studentFeedback.map((f) => (
              <FeedbackCard key={f.id} feedback={f} />
            ))}
          </div>
        </div>

        <div className="card p-5">
          <h3 className="mb-4 font-bold text-slate-800">Give Feedback</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-500">Select Student</label>
              <select
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="input-field py-2.5"
              >
                {students.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-500">Rating</label>
              <div className="flex gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => {
                  const filled = (hoverRating || rating) > i;
                  return (
                    <button
                      type="button"
                      key={i}
                      onClick={() => setRating(i + 1)}
                      onMouseEnter={() => setHoverRating(i + 1)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transition-transform duration-150 hover:scale-110"
                    >
                      {filled ? <MdOutlineStar size={26} /> : <MdOutlineStarBorder size={26} />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-500">Comments</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                placeholder="Share your feedback on the student's progress..."
                className="input-field resize-none"
              />
            </div>

            <button type="submit" className="btn-primary w-full">
              Submit Feedback
            </button>

            {submitted && (
              <p className="rounded-xl bg-emerald-50 px-3 py-2 text-center text-sm font-medium text-emerald-600">
                Feedback submitted successfully!
              </p>
            )}
          </form>
        </div>
      </div>

      <div className="card p-5">
        <h3 className="mb-4 font-bold text-slate-800">Feedback History</h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {feedbackHistory.map((f) => (
            <FeedbackCard key={f.id} feedback={f} rating={f.rating} />
          ))}
        </div>
      </div>
    </div>
  );
}