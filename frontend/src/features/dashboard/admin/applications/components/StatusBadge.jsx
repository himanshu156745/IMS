import Badge from "../../../../../components/ui/Badge";
import { statusVariant } from "../utils/statusVariants";

export default function StatusBadge({ status }) {
  return <Badge variant={statusVariant(status)}>{status}</Badge>;
}