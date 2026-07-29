// import { Briefcase, GraduationCap, UserCog, Building2, Award, FileBarChart } from "lucide-react";

// // const ACTIONS = [
// //   { label: "Add Internship", Icon: Briefcase, to: "student-report"},
// //   { label: "Add Student", Icon: GraduationCap, to: "student" },
// //   { label: "Add Faculty", Icon: UserCog,to: "student-report" },
// //   { label: "Add Company", Icon: Building2, to: "student-report" },
// //   { label: "Add Certificate", Icon: Award, to: "student-report" },
// //   { label: "View Reports", Icon: FileBarChart, to: "student-report" },
// // ];


// const ACTIONS = [
//   { label: "Add Internship", Icon: Briefcase, to: "internships" },
//   { label: "Add Student", Icon: GraduationCap, to: "students" },
//   { label: "Add Faculty", Icon: UserCog, to: "faculty" },
//   { label: "Add Company", Icon: Building2, to: "companies" },
//   { label: "Add Certificate", Icon: Award, to: "reports" },
//   { label: "View Reports", Icon: FileBarChart, to: "reports" },
// ];

// export default function QuickActions() {
//   return (
//     <div className="rounded-md bg-white shadow-sm p-4 h-full">
//       <h2 className="font-display text-base text-ink mb-3">Quick Actions</h2>
//       <div className="grid grid-cols-3 gap-2">
//         {ACTIONS.map((a) => (
//           <button
//             key={a.label}
//             type="button"
//             className="flex flex-col items-center gap-1.5 rounded-md border border-slate/10 px-2 py-3 text-center hover:bg-paper transition-colors"
//           >
//             <a.Icon className="w-4 h-4 text-signal" strokeWidth={1.75} />
//             <span className="text-[11px] leading-tight text-ink font-body">
//               {a.label}
//             </span>
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }


import { useNavigate } from "react-router-dom";
import { Briefcase, GraduationCap, UserCog, Building2, Award, FileBarChart } from "lucide-react";

const ACTIONS = [
  { label: "Add Internship", Icon: Briefcase, to: "internships" },
  { label: "Add Student", Icon: GraduationCap, to: "students" },
  { label: "Add Faculty", Icon: UserCog, to: "faculty" },
  { label: "Add Company", Icon: Building2, to: "companies" },
  { label: "Add Certificate", Icon: Award, to: "reports" },
  { label: "View Reports", Icon: FileBarChart, to: "reports" },
];

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="rounded-md bg-white shadow-sm p-4 h-full">
      <h2 className="font-display text-base text-ink mb-3">Quick Actions</h2>
      <div className="grid grid-cols-3 gap-2">
        {ACTIONS.map((a) => (
          <button
            key={a.label}
            type="button"
            onClick={() => navigate(a.to)}
            className="flex flex-col items-center gap-1.5 rounded-md border border-slate/10 px-2 py-3 text-center hover:bg-paper transition-colors"
          >
            <a.Icon className="w-4 h-4 text-signal" strokeWidth={1.75} />
            <span className="text-[11px] leading-tight text-ink font-body">
              {a.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}