import {
  Eye,
  FileText,
  Download,
  ThumbsUp,
  CheckCircle2,
  XCircle,
  CalendarClock,
  UserPlus,
  StickyNote,
  Trash2,
} from "lucide-react";
import DropdownMenu from "../../../../../components/ui/DropdownMenu";

export default function ActionDropdown({ row, onAction }) {
  return (
    <DropdownMenu
      items={[
        { label: "View Profile", Icon: Eye, onClick: () => onAction("view", row) },
        { label: "View Resume", Icon: FileText, onClick: () => onAction("viewResume", row) },
        { label: "Download Resume", Icon: Download, onClick: () => onAction("downloadResume", row) },
        { label: "Shortlist", Icon: ThumbsUp, onClick: () => onAction("shortlist", row) },
        { label: "Accept", Icon: CheckCircle2, onClick: () => onAction("accept", row) },
        { label: "Reject", Icon: XCircle, onClick: () => onAction("reject", row), danger: true },
        { label: "Schedule Interview", Icon: CalendarClock, onClick: () => onAction("scheduleInterview", row) },
        { label: "Assign Internship", Icon: UserPlus, onClick: () => onAction("assign", row) },
        { label: "Add Note", Icon: StickyNote, onClick: () => onAction("addNote", row) },
        { label: "Delete", Icon: Trash2, onClick: () => onAction("delete", row), danger: true },
      ]}
    />
  );
}