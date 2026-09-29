/**
 * Generic table shell.
 * columns: [{ key, label, render?(row) }]
 * rows: array of data objects
 */
export default function Table({ columns, rows, emptyText = "Nothing here yet." }) {
  return (
    <div className="overflow-x-auto rounded-md bg-white shadow-sm">
      <table className="w-full text-sm font-body">
        <thead>
          <tr className="border-b border-slate/10 text-left">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-xs uppercase tracking-wider text-slate font-medium"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-8 text-center text-slate/70"
              >
                {emptyText}
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr
                key={row.id ?? i}
                className="border-b border-slate/5 last:border-none hover:bg-paper/60 transition-colors"
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-ink">
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}