import Table from "../../../../components/ui/Table";
import Badge from "../../../../components/ui/Badge";

const columns = [
  { key: "name", label: "Candidate" },
  { key: "role", label: "Applied for" },
  {
    key: "status",
    label: "Status",
    render: (row) => <Badge variant="attention">{row.status}</Badge>,
  },
  { key: "requestedBy", label: "Requested by" },
  {
    key: "action",
    label: "",
    render: () => (
      <div className="flex gap-2">
        <button className="text-xs font-medium text-signal hover:underline">
          Approve
        </button>
        <button className="text-xs font-medium text-coral hover:underline">
          Decline
        </button>
      </div>
    ),
  },
];

/** rows: [{ id, name, role, status, requestedBy }] */
export default function PendingApprovals({ rows = [] }) {
  return (
    <div>
      <h2 className="font-display text-lg text-ink mb-3">
        Awaiting your approval
      </h2>
      <Table columns={columns} rows={rows} emptyText="Nothing pending review." />
    </div>
  );
}