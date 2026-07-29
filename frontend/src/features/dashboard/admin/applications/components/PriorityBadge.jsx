import Badge from "../../../../../components/ui/Badge";
import { priorityVariant } from "../utils/priorityVariants";

export default function PriorityBadge({ priority }) {
  return <Badge variant={priorityVariant(priority)}>{priority}</Badge>;
}