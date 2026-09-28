const VARIANTS = {
  primary:
    "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-200 focus-visible:outline-indigo-600",
  secondary:
    "bg-white text-indigo-700 border border-indigo-200 hover:bg-indigo-50 focus-visible:outline-indigo-600",
  ghost:
    "bg-transparent text-gray-600 hover:bg-gray-100 focus-visible:outline-gray-400",
  white:
    "bg-white/15 text-white border border-white/30 hover:bg-white/25 backdrop-blur-sm focus-visible:outline-white",
  whiteSolid:
    "bg-white text-indigo-700 hover:bg-indigo-50 focus-visible:outline-white",
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  icon: Icon,
  ...props
}) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 whitespace-nowrap ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {Icon ? <Icon className="h-4 w-4" /> : null}
      {children}
    </button>
  );
}
