export default function Avatar({ id, size = 8, className = '' }) {
  return (
    <img
      src={`https://i.pravatar.cc/64?img=${id}`}
      alt=""
      className={`w-${size} h-${size} rounded-full object-cover shrink-0 ${className}`}
      style={{ width: size * 4, height: size * 4 }}
    />
  )
}
