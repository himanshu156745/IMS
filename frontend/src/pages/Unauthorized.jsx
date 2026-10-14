import { Link } from "react-router-dom";
import { MdOutlineLock } from "react-icons/md";

export default function Unauthorized() {
  return (
    <div className="flex h-[70vh] flex-col items-center justify-center gap-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
        <MdOutlineLock size={32} />
      </div>
      <h1 className="text-2xl font-extrabold text-slate-800">Access Restricted</h1>
      <p className="max-w-sm text-sm text-slate-500">
        You do not have permission to access this resource with your current role.
      </p>
      <Link to="/" className="btn-primary mt-2">
        Back to Dashboard
      </Link>
    </div>
  );
}
