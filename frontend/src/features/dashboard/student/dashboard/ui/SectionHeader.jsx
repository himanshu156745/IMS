export default function SectionHeader({ title, action }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="text-base font-semibold text-gray-900 sm:text-lg">{title}</h2>
      {action}
    </div>
  );
}
