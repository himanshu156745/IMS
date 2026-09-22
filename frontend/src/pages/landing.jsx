import { useState } from "react";
import {
  ArrowRight,
  ShieldCheck,
  Building2,
  Users,
  GraduationCap,
  Fingerprint,
  MapPin,
  ClipboardList,
  MessageSquare,
  QrCode,
  Bell,
  UserPlus,
  ClipboardCheck,
  MessagesSquare,
  ListChecks,
  FileSignature,
  LogIn,
  CalendarCheck,
  BarChart3,
  Award,
  CheckCircle2,
  Clock,
  TrendingUp,
  Linkedin,
  Twitter,
  Play,
  FileText,
} from "lucide-react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  Tooltip,
} from "recharts";

const NAV_LINKS = [
  { label: "Student", href: "#" },
  { label: "Faculty", href: "#" },
  { label: "Admin", href: "#" },
  { label: "Company", href: "#" },
];

const STATS = [
  { value: "500+", label: "Enterprise Deployments" },
  { value: "40%", label: "Reduced Hiring Cost" },
  { value: "99.4%", label: "Uptime SLA" },
  { value: "12k+", label: "Interns Managed" },
];

const VIEW_TABS = [
  { id: "hr", label: "HR Lead", icon: Building2 },
  { id: "mentor", label: "Mentor / Team Lead", icon: Users },
  { id: "intern", label: "Intern", icon: GraduationCap },
];

const LIFECYCLE = [
  { icon: UserPlus, title: "Registration", desc: "Candidate signs up and builds a profile.", meta: "Day 0" },
  { icon: ClipboardCheck, title: "HR Review", desc: "Automated screening against role fit.", meta: "98% match" },
  { icon: FileSignature, title: "Offer Letter", desc: "Digitally signed, tamper-proof offers.", meta: "e-Signed" },
  { icon: ClipboardList, title: "Daily Tasks", desc: "Assigned, tracked, and closed per sprint.", meta: "Live sync" },
  { icon: CalendarCheck, title: "Attendance", desc: "Biometric and geo-fenced check-ins.", meta: "99.4% accurate" },
  { icon: Award, title: "QR Certificate", desc: "Cryptographically verifiable on completion.", meta: "Tamper-proof" },
];

const MODULES = [
  {
    icon: Fingerprint,
    tag: "IDENTITY VERIFIED",
    title: "Biometric & Geo-fenced Attendance Tracking",
    desc: "Verify identity and presence across every deployment site with fingerprint or face check-ins and location-bound geofencing.",
  },
  {
    icon: MapPin,
    tag: "STRUCTURED REVIEWS",
    title: "Structured Weekly Reports",
    desc: "Interns submit against a fixed rubric every Friday, so mentors review consistent, comparable progress — not free-form updates.",
  },
  {
    icon: QrCode,
    tag: "BLOCKCHAIN-BACKED",
    title: "Cryptographic QR-Verified Certificates",
    desc: "Every certificate carries a signed QR code recruiters can verify instantly — no calls to HR, no forged credentials.",
  },
];

const CHART_DATA = [
  { week: "W1", velocity: 40, burndown: 30 },
  { week: "W2", velocity: 48, burndown: 40 },
  { week: "W3", velocity: 55, burndown: 46 },
  { week: "W4", velocity: 60, burndown: 55 },
  { week: "W5", velocity: 66, burndown: 60 },
  { week: "W6", velocity: 72, burndown: 68 },
  { week: "W7", velocity: 78, burndown: 74 },
  { week: "W8", velocity: 85, burndown: 80 },
];

const TESTIMONIALS = [
  {
    quote:
      "Before IMS, our lead team spent 30+ hours a week across spreadsheets. Attendance is now automatic, and reporting runs itself.",
    name: "Maya Rodriguez",
    role: "Head of Talent, Apex Dynamics",
  },
  {
    quote:
      "The cryptographic QR certificates transformed our university credibility. Recruiters trust that a signature is real, sight unseen.",
    name: "James Koenig",
    role: "Director of University Programs",
  },
];

const FOOTER_LINKS = {
  Product: ["Overview", "Modules", "Workflow", "Pricing"],
  Roles: ["Student", "Faculty", "Admin", "Company"],
  Enterprise: ["Security", "SOC2 Report", "Integrations", "Status"],
};

function Chip({ children }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-blue-600">
      {children}
    </span>
  );
}

export default function Landing() {
  const [activeTab, setActiveTab] = useState("hr");

  return (
    <div className="bg-white font-sans text-slate-900">
      {/* Navbar — sits directly over the hero photo, dark translucent, bold links */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-base font-black text-white shadow-lg shadow-blue-900/40">
              IMS
            </span>
            <span className="text-xl font-black tracking-tight text-white">Engine</span>
          </div>

          <nav className="hidden items-center gap-1 rounded-full border border-white/15 bg-white/5 p-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-full px-5 py-2.5 text-base font-extrabold text-white/80 transition-colors duration-150 hover:bg-white/15 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="#" className="hidden rounded-lg px-4 py-2.5 text-base font-extrabold text-white/80 transition-colors duration-150 hover:bg-white/10 hover:text-white sm:inline">
              Login
            </a>
            <a
              href="#"
              className="rounded-full bg-blue-600 px-6 py-3 text-base font-extrabold text-white shadow-lg shadow-blue-900/30 transition-all duration-150 hover:-translate-y-0.5 hover:bg-blue-500"
            >
              Sign Up
            </a>
          </div>
        </div>
      </header>

      {/* Hero — full-size photo, bigger type */}
      <section className="relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=2400&q=90"
          alt="A student and mentor collaborating over a laptop"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/60 to-black/85" />
        <div className="relative mx-auto max-w-5xl px-8 pt-32 pb-32 text-center">
          <h1 className="mt-6 text-5xl font-extrabold leading-[1.08] text-white sm:text-6xl">
            Run your internship program like a{" "}
            <span className="text-orange-400">product, not a spreadsheet.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-slate-300">
            Automate the complete internship lifecycle — from candidate sourcing and
            HR review to daily sprint tasks, automated mentor feedback, and
            tamper-proof QR certificates.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-7 py-4 text-base font-extrabold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-lg"
            >
              Request Demo <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="rounded-lg border-2 border-white/40 px-7 py-4 text-base font-extrabold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white/70"
            >
              See how it works
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-slate-100 bg-white py-14">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-8 text-center sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="text-4xl font-extrabold text-slate-900">{s.value}</p>
              <p className="mt-2 text-sm font-bold text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* One OS. Four operating views */}
      <section className="bg-slate-50 py-28">
        <div className="mx-auto max-w-6xl px-8">
          <div className="text-center">
            <Chip>Architected for Every Stakeholder</Chip>
            <h2 className="mx-auto mt-5 max-w-2xl text-4xl font-extrabold text-slate-900 sm:text-5xl">
              One OS. Four Tailored Operating Views.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-slate-500">
              Same underlying data, entirely different views. Each stakeholder
              opens exactly what their role needs — nothing more.
            </p>
          </div>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-2">
            {VIEW_TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-base font-extrabold transition-colors duration-150 ${
                  activeTab === t.id
                    ? "bg-blue-600 text-white"
                    : "border border-slate-200 bg-white text-slate-500 hover:text-slate-800"
                }`}
              >
                <t.icon className="h-4 w-4" />
                {t.label}
              </button>
            ))}
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl bg-slate-900 p-9 text-white">
              <ShieldCheck className="h-9 w-9 text-blue-400" />
              <h3 className="mt-6 text-2xl font-extrabold">Multi-Tenant Oversight & SOC2 Auditing</h3>
              <p className="mt-4 text-base leading-relaxed text-slate-400">
                Maintain complete structural sovereignty over departments,
                access levels, system exit trails, and audit trails with
                immutable event logs.
              </p>
              <div className="mt-7 space-y-3">
                <div className="flex items-start gap-3 rounded-lg bg-white/5 p-4">
                  <Users className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-400" />
                  <div>
                    <p className="text-base font-bold">Multi-Tenant Isolation</p>
                    <p className="text-sm text-slate-400">Fully isolated department workspaces</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg bg-white/5 p-4">
                  <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-400" />
                  <div>
                    <p className="text-base font-bold">SOC2 Immutable Event Ledger</p>
                    <p className="text-sm text-slate-400">Every action logged and exportable</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg bg-white/5 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-400" />
                  <div>
                    <p className="text-base font-bold">Tenant Telemetry & Node Health</p>
                    <p className="text-sm text-slate-400">Live health checks across every tenant</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-950 p-7">
              <div className="flex items-center justify-between text-sm text-slate-400">
                <span>Enterprise Cluster Node</span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> All Systems Nominal
                </span>
              </div>
              <div className="mt-7 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-4xl font-extrabold text-white">24</p>
                  <p className="text-sm text-slate-500">Tenant Hubs</p>
                </div>
                <div>
                  <p className="text-4xl font-extrabold text-white">4.2M</p>
                  <p className="text-sm text-slate-500">Events / mo</p>
                </div>
              </div>
              <div className="mt-7 h-36 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={CHART_DATA}>
                    <defs>
                      <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="burndown" stroke="#60a5fa" fill="url(#glow)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                <span>Node Uptime 99.97%</span>
                <span>Regenerated 20 Sept, 2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10-stage lifecycle */}
      <section className="py-28">
        <div className="mx-auto max-w-6xl px-8">
          <div className="text-center">
            <Chip>Automated Cognitive Onboarding</Chip>
            <h2 className="mx-auto mt-5 max-w-2xl text-4xl font-extrabold text-slate-900 sm:text-5xl">
              The Complete 6-Stage Internship Lifecycle
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-slate-500">
              A continuous linear pipeline from day one to alumni credential —
              no dead ends, zero paper trails.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {LIFECYCLE.map((stage, i) => (
              <div
                key={stage.title}
                className="group rounded-xl border border-slate-100 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-blue-100 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-transform duration-200 group-hover:scale-110">
                    <stage.icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-extrabold text-slate-300">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <p className="mt-3.5 text-base font-extrabold text-slate-800">{stage.title}</p>
                <p className="mt-1.5 text-base leading-relaxed text-slate-500">{stage.desc}</p>
                <p className="mt-2.5 text-xs font-extrabold text-blue-600">{stage.meta}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Purpose-built modules */}
      <section className="bg-slate-50 py-28">
        <div className="mx-auto max-w-6xl px-8">
          <div className="text-center">
            <Chip>Engineered for Outcomes</Chip>
            <h2 className="mx-auto mt-5 max-w-2xl text-4xl font-extrabold text-slate-900 sm:text-5xl">
              Purpose-Built Modules. Zero Fluff.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-slate-500">
              5 orchestrated systems designed to eliminate manual admin and
              disconnected forms updates.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-3">
            {MODULES.map((m) => (
              <div
                key={m.title}
                className="rounded-2xl border border-slate-100 bg-white p-8 transition-shadow duration-200 hover:shadow-lg"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <m.icon className="h-6 w-6" />
                </span>
                <p className="mt-5 text-xs font-extrabold uppercase tracking-wide text-blue-600">{m.tag}</p>
                <h3 className="mt-2.5 text-xl font-extrabold text-slate-900">{m.title}</h3>
                <p className="mt-3 text-lg leading-relaxed text-slate-500">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Culture — split panel */}
      <section className="px-8 py-28">
        <div className="mx-auto flex max-w-6xl flex-col overflow-hidden rounded-2xl border border-slate-100 shadow-lg shadow-slate-100 sm:flex-row">
          <div className="relative min-h-[420px] flex-1 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80"
              alt="Team celebrating a milestone with a high five"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div className="flex flex-1 flex-col justify-center bg-slate-50 p-10 sm:p-14">
            <p className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Our Culture</p>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl">
              Cultivating collaboration <span className="block">beyond work</span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-500">
              Our connect with our students goes beyond the platform to create
              a holistic lifestyle that promotes a culture of continuous
              learning and growth.
            </p>
            <a href="#" className="group mt-8 inline-flex items-center gap-3 text-base font-extrabold text-slate-900">
              Get a glimpse
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white transition-transform duration-200 group-hover:translate-x-1">
                <ArrowRight className="h-4 w-4" />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* IMS in action — dark card row */}
      <section className="bg-slate-950 py-28">
        <div className="mx-auto max-w-6xl px-8">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
            IMS <span className="italic font-semibold">in action</span>
          </h2>
          <div className="mt-2 h-1 w-14 bg-blue-600" />

          <div className="mt-12 grid gap-7 sm:grid-cols-3">
            <div className="group relative h-[480px] overflow-hidden rounded-3xl">
              <img
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80"
                alt="A student pointing at a laptop screen"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
              <span className="absolute left-6 top-6 rounded-full bg-white/15 px-4 py-1.5 text-sm font-extrabold text-white backdrop-blur">
                AI SCAN
              </span>
              <div className="absolute bottom-7 left-7 right-7">
                <p className="text-2xl font-extrabold leading-snug text-white">
                  Aman and IMS: Building a 30-Day Mastery Roadmap
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-base font-extrabold text-white">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-slate-900">
                    <Play className="h-3.5 w-3.5 fill-current" />
                  </span>
                  WATCH THE VIDEO
                </span>
              </div>
            </div>

            <div className="group relative h-[480px] overflow-hidden rounded-3xl">
              <img
                src="https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&w=900&q=80"
                alt="A student arranging sticky notes on a wall"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent" />
              <span className="absolute left-6 top-6 rounded-full bg-white/15 px-4 py-1.5 text-sm font-extrabold text-white backdrop-blur">
                CASE STUDY
              </span>
              <div className="absolute bottom-7 left-7 right-7">
                <p className="text-2xl font-extrabold leading-snug text-sky-400">
                  Bridging the Skill Gap: From Student to Senior Dev in 6 Months
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-base font-extrabold text-white">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600">
                    <FileText className="h-3.5 w-3.5" />
                  </span>
                  READ MORE
                </span>
              </div>
            </div>

            <div className="group relative h-[480px] overflow-hidden rounded-3xl">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80"
                alt="A laptop showing analytics dashboards on a wooden desk"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
              <span className="absolute left-6 top-6 rounded-full bg-white/15 px-4 py-1.5 text-sm font-extrabold text-white backdrop-blur">
                ANALYSIS
              </span>
              <div className="absolute bottom-7 left-7 right-7">
                <p className="text-2xl font-extrabold leading-snug text-white">
                  Orchestrating Success: The Symphony of AI Career Planning
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-base font-extrabold text-white">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
                    <FileText className="h-3.5 w-3.5" />
                  </span>
                  READ MORE
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics section */}
      <section className="py-28">
        <div className="mx-auto grid max-w-6xl gap-14 px-8 lg:grid-cols-2 lg:items-center">
          <div>
            <Chip>Live Data Dashboard</Chip>
            <h2 className="mt-5 text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl">
              Precision telemetry into intern velocity and hiring conversions.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-500">
              Eliminate manual telemetry gathering: automate engineer, mentor,
              and HR quantitative reporting consistency without wasting
              additional governance cycles.
            </p>
            <div className="mt-8 space-y-5">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <TrendingUp className="h-5 w-5" />
                </span>
                <p className="text-base text-slate-600">
                  <span className="font-extrabold text-slate-900">On-Bench Attendance</span> tracked automatically across every cohort
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Clock className="h-5 w-5" />
                </span>
                <p className="text-base text-slate-600">
                  <span className="font-extrabold text-slate-900">Peak Task Completion</span> windows flagged for capacity planning
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Bell className="h-5 w-5" />
                </span>
                <p className="text-base text-slate-600">
                  <span className="font-extrabold text-slate-900">Automatic Early Alerts</span> before an intern falls behind
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-7 shadow-lg shadow-slate-100">
            <p className="text-base font-extrabold text-slate-800">Cohort Sprint Velocity & Task Burndown</p>
            <div className="mt-5 h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={CHART_DATA}>
                  <defs>
                    <linearGradient id="velocityFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563eb" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="velocity" stroke="#2563eb" fill="url(#velocityFill)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-slate-100 pt-6 text-center">
              <div>
                <p className="text-2xl font-extrabold text-slate-900">72.4%</p>
                <p className="text-xs font-bold text-slate-400">Velocity</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-slate-900">2.4 hrs</p>
                <p className="text-xs font-bold text-slate-400">Avg Resolution</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-slate-900">99.3%</p>
                <p className="text-xs font-bold text-slate-400">SLA Met</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-50 py-28">
        <div className="mx-auto max-w-6xl px-8 text-center">
          <div className="grid gap-8 sm:grid-cols-2">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="rounded-3xl border border-slate-100 bg-white p-11 text-left shadow-md">
                <p className="text-xl leading-relaxed text-slate-600">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-9 flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-lg font-extrabold text-blue-600">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                  <div>
                    <p className="text-lg font-extrabold text-slate-900">{t.name}</p>
                    <p className="text-base text-slate-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-28">
        <div className="mx-auto max-w-5xl rounded-3xl bg-slate-900 p-16 text-center">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
            Ready to modernize your internship ecosystem?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-400">
            Join leading technology enterprises replacing chaotic spreadsheets
            with autonomous pipeline orchestration.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a href="#" className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-7 py-4 text-base font-extrabold text-white transition-colors duration-150 hover:bg-blue-500">
              Request Enterprise Demo <ArrowRight className="h-5 w-5" />
            </a>
            <a href="#" className="rounded-lg border-2 border-slate-700 px-7 py-4 text-base font-extrabold text-white transition-colors duration-150 hover:bg-slate-800">
              Talk to Solutions Architect
            </a>
          </div>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-8 text-sm font-semibold text-slate-500">
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4" /> SOC2 Compliant</span>
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> 24 hr Onboarding</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl px-8 py-16">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-sm font-extrabold text-white">
                  IMS
                </span>
                <span className="text-lg font-extrabold text-white">Engine</span>
              </div>
              <p className="mt-5 max-w-xs text-base leading-relaxed text-slate-400">
                Enterprise-grade orchestration for internship pipelines, replacing spreadsheets with one auditable system.
              </p>
              <div className="mt-7 flex items-center gap-3">
                <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white">
                  <Twitter className="h-4 w-4" />
                </a>
              </div>
            </div>

            {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
              <div key={heading}>
                <p className="text-base font-extrabold text-white">{heading}</p>
                <ul className="mt-5 space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-base text-slate-400 hover:text-white">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-slate-800 pt-7 text-sm text-slate-500 sm:flex-row sm:items-center">
            <p>© {new Date().getFullYear()} IMS Engine. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-slate-300">Privacy</a>
              <a href="#" className="hover:text-slate-300">Terms</a>
              <a href="#" className="hover:text-slate-300">SOC2 Report</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}