// export default function ActivityTimeline({ activities }) {
//   return (
//     <div className="rounded-2xl border border-line bg-white p-5">
//       <h3 className="font-display text-base text-heading mb-4">Recent Activities</h3>
//       <div className="space-y-4">
//         {activities.map((a, i) => (
//           <div key={i} className="flex gap-3">
//             <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
//             <div>
//               <p className="text-sm text-heading font-body">{a.text}</p>
//               <p className="text-xs text-slate-400 font-body">{a.time}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

export default function ActivityTimeline({ activities }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg text-heading">
          Recent Activities
        </h3>

        <button className="text-xs text-primary hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-5 max-h-[420px] overflow-y-auto pr-2">
        {activities.map((a, i) => (
          <div key={i} className="flex gap-3">
            <div className="mt-1.5 h-2.5 w-2.5 rounded-full bg-primary shrink-0" />

            <div>
              <p className="text-sm font-medium text-heading">
                {a.text}
              </p>

              <p className="text-xs text-slate-500 mt-1">
                {a.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}