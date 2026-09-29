export default function WelcomeBanner({ name = "Admin" }) {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="rounded-md bg-gradient-to-r from-signal to-[#1F4D42] text-white px-6 py-5 mb-6">
      <h2 className="font-display text-xl">Welcome Back, {name} 👋</h2>
      <p className="text-sm text-white/80 font-body mt-1">
        Here's what's happening with your internship management system today.
      </p>
      <p className="text-xs text-white/60 font-body mt-2">{today}</p>
    </div>
  );
}