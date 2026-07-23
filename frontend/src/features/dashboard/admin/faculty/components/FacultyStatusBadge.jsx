import Badge from "../../../../../components/ui/Badge";
import { facultyStatusVariant } from "../utils/statusVariants";

export default function FacultyStatusBadge({ status }) {
  return <Badge variant={facultyStatusVariant(status)}>{status}</Badge>;
}