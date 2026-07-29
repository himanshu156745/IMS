import { Link } from "react-router-dom";
import { MdOutlineErrorOutline } from "react-icons/md";

export default function NotFound() {
  return (
    <div className="flex h-[70vh] flex-col items-center justify-center gap-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-500">
        <MdOutlineErrorOutline size={32} />
      </div>
      <h1 className="text-2xl font-extrabold text-slate-800">Page not found</h1>
      <p className="max-w-sm text-sm text-slate-500">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Link to="/" className="btn-primary mt-2">
        Back to Dashboard
      </Link>
    </div>
  );
}