import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  Building2,
  Users,
  GraduationCap,
  Fingerprint,
  MapPin,
  ClipboardList,
  QrCode,
  Bell,
  UserPlus,
  ClipboardCheck,
  FileSignature,
  CalendarCheck,
  Award,
  CheckCircle2,
  Clock,
  TrendingUp,
  Mail,
  Phone,
  Play,
  FileText,
  Menu,
  X,
} from "lucide-react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  Tooltip,
} from "recharts";

const NAV_LINKS = [
  { label: "Student", href: "#student" },
  { label: "Faculty", href: "#faculty" },
  { label: "Admin", href: "#admin" },
  { label: "Company", href: "#company" },
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
  {
    icon: UserPlus,
    title: "Registration",
    desc: "Candidate signs up and builds a profile.",
    meta: "Day 0",
  },
  {
    icon: ClipboardCheck,
    title: "HR Review",
    desc: "Automated screening against role fit.",
    meta: "98% match",
  },
  {
    icon: FileSignature,
    title: "Offer Letter",
    desc: "Digitally signed, tamper-proof offers.",
    meta: "e-Signed",
  },
  {
    icon: ClipboardList,
    title: "Daily Tasks",
    desc: "Assigned, tracked, and closed per sprint.",
    meta: "Live sync",
  },
  {
    icon: CalendarCheck,
    title: "Attendance",
    desc: "Biometric and geo-fenced check-ins.",
    meta: "99.4% accurate",
  },
  {
    icon: Award,
    title: "QR Certificate",
    desc: "Cryptographically verifiable on completion.",
    meta: "Tamper-proof",
  },
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

const CONTACT_INFO = {
  company: "RID TECH PRIVATE LIMITED",
  tagline: "Research to Reality",
  email: "ridorg.in@gmail.com",
  phone: "+91-9202707903",
};

const CERTIFICATION =
  "ISO:9001:2015 Certified  |  RRID  |  Reg.No: 083632  |  ESTD:2025";

const FOOTER_LINKS = {
  Product: [
    { label: "Overview", href: "#overview" },
    { label: "Modules", href: "#modules" },
    { label: "Workflow", href: "#workflow" },
    { label: "Pricing", href: "#pricing" },
  ],
  Roles: [
    { label: "Student", href: "#student" },
    { label: "Faculty", href: "#faculty" },
    { label: "Admin", href: "#admin" },
    { label: "Company", href: "#company" },
  ],
  Enterprise: [
    { label: "Security", href: "#security" },
    { label: "SOC2 Report", href: "#soc2" },
    { label: "Integrations", href: "#integrations" },
    { label: "Status", href: "#status" },
  ],
};

function Chip({ children }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-center text-[11px] font-extrabold uppercase tracking-wide text-blue-600 sm:px-4 sm:text-xs">
      {children}
    </span>
  );
}

export default function Landing() {
  const [activeTab, setActiveTab] = useState("hr");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="overflow-x-clip bg-white font-sans text-slate-900">
      {/* Navbar */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:h-20 sm:px-6 lg:h-24 lg:px-8">
          {/* Logo + IMS */}
          <div className="flex min-w-0 items-center">
            <img
              src="/rid-tech-logo.jpeg"
              alt="RID Tech Pvt Ltd"
              className="h-10 w-auto max-w-[7.5rem] object-contain sm:h-14 sm:max-w-[10rem] lg:h-20 lg:max-w-[13rem]"
            />

            <div className="ml-3 h-8 w-px bg-slate-200 sm:ml-4 sm:h-10 lg:h-12" />

            <span className="ml-3 text-2xl font-extrabold tracking-wide text-slate-800 sm:ml-4 sm:text-3xl lg:ml-5 lg:text-4xl">
              IMS
            </span>
          </div>

          {/* Desktop links */}
          <nav className="hidden items-center gap-8 lg:flex xl:gap-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-base font-extrabold text-slate-800 hover:text-blue-800"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Buttons + hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/login"
              className="hidden rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 sm:inline-block lg:px-6 lg:py-3 lg:text-base"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="hidden rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-500 sm:inline-block lg:px-7 lg:py-3 lg:text-base"
            >
              Sign Up
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 lg:hidden"
            >
              {menuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile / tablet menu */}
        {menuOpen && (
          <div className="border-t border-slate-100 bg-white px-4 pb-5 pt-2 shadow-md sm:px-6 lg:hidden">
            <nav className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-slate-100 py-3.5 text-base font-extrabold text-slate-800 hover:text-blue-800"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:hidden">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg border border-slate-200 px-4 py-3 text-center text-base font-bold text-slate-700 hover:bg-slate-50"
              >
                Login
              </Link>

              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg bg-blue-600 px-4 py-3 text-center text-base font-bold text-white hover:bg-blue-500"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=2400&q=90"
          alt="A student and mentor collaborating over a laptop"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/60 to-black/85" />

        <div className="relative mx-auto max-w-5xl px-4 py-16 text-center sm:px-8 sm:py-24 lg:py-32">
          <h1 className="mt-2 text-3xl font-extrabold leading-tight text-white sm:mt-6 sm:text-5xl sm:leading-[1.08] lg:text-6xl">
            Run your internship program like a{" "}
            <span className="text-orange-400">
              product, not a spreadsheet.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:mt-6 sm:text-xl">
            Automate the complete internship lifecycle — from candidate
            sourcing and HR review to daily sprint tasks, automated mentor
            feedback, and tamper-proof QR certificates.
          </p>

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-9 sm:flex-row sm:items-center">
            <a
              href="#demo"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-7 py-3.5 text-base font-extrabold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-lg sm:py-4"
            >
              Request Demo
              <ArrowRight className="h-5 w-5" />
            </a>

            <a
              href="#workflow"
              className="rounded-lg border-2 border-white/40 px-7 py-3.5 text-center text-base font-extrabold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white/70 sm:py-4"
            >
              See how it works
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-slate-100 bg-white py-10 sm:py-14">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-x-4 gap-y-8 px-4 text-center sm:grid-cols-4 sm:gap-8 sm:px-8">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                {s.value}
              </p>

              <p className="mt-2 text-xs font-bold text-slate-500 sm:text-sm">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* One OS. Four operating views */}
      <section className="bg-slate-50 py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-8">
          <div className="text-center">
            <Chip>Architected for Every Stakeholder</Chip>

            <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-extrabold text-slate-900 sm:text-4xl lg:text-5xl">
              One OS. Four Tailored Operating Views.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-base text-slate-500 sm:text-lg">
              Same underlying data, entirely different views. Each stakeholder
              opens exactly what their role needs — nothing more.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:mt-9">
            {VIEW_TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-extrabold transition-colors duration-150 sm:px-5 sm:py-2.5 sm:text-base ${
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

          <div className="mt-10 grid gap-5 sm:mt-12 lg:grid-cols-2">
            <div className="min-w-0 rounded-2xl bg-slate-900 p-6 text-white sm:p-9">
              <ShieldCheck className="h-8 w-8 text-blue-400 sm:h-9 sm:w-9" />

              <h3 className="mt-5 text-xl font-extrabold sm:mt-6 sm:text-2xl">
                Multi-Tenant Oversight & SOC2 Auditing
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">
                Maintain complete structural sovereignty over departments,
                access levels, system exit trails, and audit trails with
                immutable event logs.
              </p>

              <div className="mt-6 space-y-3 sm:mt-7">
                <div className="flex items-start gap-3 rounded-lg bg-white/5 p-3.5 sm:p-4">
                  <Users className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-400" />

                  <div>
                    <p className="text-sm font-bold sm:text-base">
                      Multi-Tenant Isolation
                    </p>

                    <p className="text-sm text-slate-400">
                      Fully isolated department workspaces
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg bg-white/5 p-3.5 sm:p-4">
                  <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-400" />

                  <div>
                    <p className="text-sm font-bold sm:text-base">
                      SOC2 Immutable Event Ledger
                    </p>

                    <p className="text-sm text-slate-400">
                      Every action logged and exportable
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg bg-white/5 p-3.5 sm:p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-400" />

                  <div>
                    <p className="text-sm font-bold sm:text-base">
                      Tenant Telemetry & Node Health
                    </p>

                    <p className="text-sm text-slate-400">
                      Live health checks across every tenant
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="min-w-0 rounded-2xl bg-slate-950 p-5 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 sm:text-sm">
                <span>Enterprise Cluster Node</span>

                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  All Systems Nominal
                </span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 sm:mt-7">
                <div>
                  <p className="text-3xl font-extrabold text-white sm:text-4xl">
                    24
                  </p>

                  <p className="text-sm text-slate-500">Tenant Hubs</p>
                </div>

                <div>
                  <p className="text-3xl font-extrabold text-white sm:text-4xl">
                    4.2M
                  </p>

                  <p className="text-sm text-slate-500">Events / mo</p>
                </div>
              </div>

              <div className="mt-6 h-32 w-full sm:mt-7 sm:h-36">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={CHART_DATA}>
                    <defs>
                      <linearGradient
                        id="glow"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#3b82f6"
                          stopOpacity={0.5}
                        />

                        <stop
                          offset="100%"
                          stopColor="#3b82f6"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>

                    <Area
                      type="monotone"
                      dataKey="burndown"
                      stroke="#60a5fa"
                      fill="url(#glow)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-xs text-slate-500">
                <span>Node Uptime 99.97%</span>
                <span>Regenerated 20 Sept, 2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6-stage lifecycle */}
      <section className="py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-8">
          <div className="text-center">
            <Chip>Automated Cognitive Onboarding</Chip>

            <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-extrabold text-slate-900 sm:text-4xl lg:text-5xl">
              The Complete 6-Stage Internship Lifecycle
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-base text-slate-500 sm:text-lg">
              A continuous linear pipeline from day one to alumni credential —
              no dead ends, zero paper trails.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 sm:mt-14">
            {LIFECYCLE.map((stage, i) => (
              <div
                key={stage.title}
                className="group rounded-xl border border-slate-100 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-blue-100 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-transform duration-200 group-hover:scale-110">
                    <stage.icon className="h-5 w-5" />
                  </span>

                  <span className="text-sm font-extrabold text-slate-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <p className="mt-3.5 text-base font-extrabold text-slate-800">
                  {stage.title}
                </p>

                <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                  {stage.desc}
                </p>

                <p className="mt-2.5 text-xs font-extrabold text-blue-600">
                  {stage.meta}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Purpose-built modules */}
      <section className="bg-slate-50 py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-8">
          <div className="text-center">
            <Chip>Engineered for Outcomes</Chip>

            <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-extrabold text-slate-900 sm:text-4xl lg:text-5xl">
              Purpose-Built Modules. Zero Fluff.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-base text-slate-500 sm:text-lg">
              5 orchestrated systems designed to eliminate manual admin and
              disconnected forms updates.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:mt-14 lg:grid-cols-3">
            {MODULES.map((m) => (
              <div
                key={m.title}
                className="rounded-2xl border border-slate-100 bg-white p-6 transition-shadow duration-200 hover:shadow-lg sm:p-8"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <m.icon className="h-6 w-6" />
                </span>

                <p className="mt-5 text-xs font-extrabold uppercase tracking-wide text-blue-600">
                  {m.tag}
                </p>

                <h3 className="mt-2.5 text-lg font-extrabold text-slate-900 sm:text-xl">
                  {m.title}
                </h3>

                <p className="mt-3 text-base leading-relaxed text-slate-500 sm:text-lg">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Culture — split panel */}
      <section className="px-4 py-16 sm:px-8 sm:py-20 lg:py-28">
        <div className="mx-auto flex max-w-6xl flex-col overflow-hidden rounded-2xl border border-slate-100 shadow-lg shadow-slate-100 md:flex-row">
          <div className="relative min-h-[240px] flex-1 overflow-hidden sm:min-h-[320px] md:min-h-[420px]">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80"
              alt="Team celebrating a milestone with a high five"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          <div className="flex flex-1 flex-col justify-center bg-slate-50 p-6 sm:p-10 lg:p-14">
            <p className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
              Our Culture
            </p>

            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Cultivating collaboration{" "}
              <span className="block">beyond work</span>
            </h2>

            <p className="mt-5 max-w-md text-base leading-relaxed text-slate-500 sm:mt-6 sm:text-lg">
              Our connect with our students goes beyond the platform to create
              a holistic lifestyle that promotes a culture of continuous
              learning and growth.
            </p>

            <a
              href="#culture"
              className="group mt-7 inline-flex items-center gap-3 text-base font-extrabold text-slate-900 sm:mt-8"
            >
              Get a glimpse

              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white transition-transform duration-200 group-hover:translate-x-1">
                <ArrowRight className="h-4 w-4" />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* IMS in action — dark card row */}
      <section className="bg-slate-950 py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Internship Management System{" "}
            <span className="italic font-semibold">in action</span>
          </h2>

          <div className="mt-2 h-1 w-14 bg-blue-600" />

          <div className="mt-10 grid gap-5 sm:mt-12 sm:gap-7 md:grid-cols-2 lg:grid-cols-3">
            <div className="group relative h-[380px] overflow-hidden rounded-3xl sm:h-[440px] lg:h-[480px]">
              <img
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80"
                alt="A student pointing at a laptop screen"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

              <span className="absolute left-5 top-5 rounded-full bg-white/15 px-4 py-1.5 text-xs font-extrabold text-white backdrop-blur sm:left-6 sm:top-6 sm:text-sm">
                AI SCAN
              </span>

              <div className="absolute bottom-6 left-6 right-6 sm:bottom-7 sm:left-7 sm:right-7">
                <p className="text-xl font-extrabold leading-snug text-white lg:text-2xl">
                  Aman and IMS: Building a 30-Day Mastery Roadmap
                </p>

                <span className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-white sm:mt-5 sm:text-base">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-slate-900">
                    <Play className="h-3.5 w-3.5 fill-current" />
                  </span>

                  WATCH THE VIDEO
                </span>
              </div>
            </div>

            <div className="group relative h-[380px] overflow-hidden rounded-3xl sm:h-[440px] lg:h-[480px]">
              <img
                src="https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&w=900&q=80"
                alt="A student arranging sticky notes on a wall"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent" />

              <span className="absolute left-5 top-5 rounded-full bg-white/15 px-4 py-1.5 text-xs font-extrabold text-white backdrop-blur sm:left-6 sm:top-6 sm:text-sm">
                CASE STUDY
              </span>

              <div className="absolute bottom-6 left-6 right-6 sm:bottom-7 sm:left-7 sm:right-7">
                <p className="text-xl font-extrabold leading-snug text-sky-400 lg:text-2xl">
                  Bridging the Skill Gap: From Student to Senior Dev in 6
                  Months
                </p>

                <span className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-white sm:mt-5 sm:text-base">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600">
                    <FileText className="h-3.5 w-3.5" />
                  </span>

                  READ MORE
                </span>
              </div>
            </div>

            <div className="group relative h-[380px] overflow-hidden rounded-3xl sm:h-[440px] md:col-span-2 lg:col-span-1 lg:h-[480px]">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80"
                alt="A laptop showing analytics dashboards on a wooden desk"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

              <span className="absolute left-5 top-5 rounded-full bg-white/15 px-4 py-1.5 text-xs font-extrabold text-white backdrop-blur sm:left-6 sm:top-6 sm:text-sm">
                ANALYSIS
              </span>

              <div className="absolute bottom-6 left-6 right-6 sm:bottom-7 sm:left-7 sm:right-7">
                <p className="text-xl font-extrabold leading-snug text-white lg:text-2xl">
                  Orchestrating Success: The Symphony of AI Career Planning
                </p>

                <span className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-white sm:mt-5 sm:text-base">
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
      <section className="py-16 sm:py-20 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div className="min-w-0">
            <Chip>Live Data Dashboard</Chip>

            <h2 className="mt-5 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Precision telemetry into intern velocity and hiring conversions.
            </h2>

            <p className="mt-5 text-base leading-relaxed text-slate-500 sm:text-lg">
              Eliminate manual telemetry gathering: automate engineer, mentor,
              and HR quantitative reporting consistency without wasting
              additional governance cycles.
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <TrendingUp className="h-5 w-5" />
                </span>

                <p className="text-base text-slate-600">
                  <span className="font-extrabold text-slate-900">
                    On-Bench Attendance
                  </span>{" "}
                  tracked automatically across every cohort
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Clock className="h-5 w-5" />
                </span>

                <p className="text-base text-slate-600">
                  <span className="font-extrabold text-slate-900">
                    Peak Task Completion
                  </span>{" "}
                  windows flagged for capacity planning
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Bell className="h-5 w-5" />
                </span>

                <p className="text-base text-slate-600">
                  <span className="font-extrabold text-slate-900">
                    Automatic Early Alerts
                  </span>{" "}
                  before an intern falls behind
                </p>
              </div>
            </div>
          </div>

          <div className="min-w-0 rounded-2xl border border-slate-100 bg-white p-5 shadow-lg shadow-slate-100 sm:p-7">
            <p className="text-base font-extrabold text-slate-800">
              Cohort Sprint Velocity & Task Burndown
            </p>

            <div className="mt-5 h-48 w-full sm:h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={CHART_DATA}>
                  <defs>
                    <linearGradient
                      id="velocityFill"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#2563eb"
                        stopOpacity={0.35}
                      />

                      <stop
                        offset="100%"
                        stopColor="#2563eb"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>

                  <XAxis
                    dataKey="week"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#94a3b8" }}
                  />

                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="velocity"
                    stroke="#2563eb"
                    fill="url(#velocityFill)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-2 border-t border-slate-100 pt-6 text-center sm:gap-3">
              <div>
                <p className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                  72.4%
                </p>
                <p className="text-xs font-bold text-slate-400">Velocity</p>
              </div>

              <div>
                <p className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                  2.4 hrs
                </p>
                <p className="text-xs font-bold text-slate-400">
                  Avg Resolution
                </p>
              </div>

              <div>
                <p className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                  99.3%
                </p>
                <p className="text-xs font-bold text-slate-400">SLA Met</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-50 py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-8">
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="rounded-3xl border border-slate-100 bg-white p-6 text-left shadow-md sm:p-11"
              >
                <p className="text-base leading-relaxed text-slate-600 sm:text-xl">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="mt-7 flex items-center gap-4 sm:mt-9">
                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-base font-extrabold text-blue-600 sm:h-14 sm:w-14 sm:text-lg">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>

                  <div className="min-w-0">
                    <p className="text-base font-extrabold text-slate-900 sm:text-lg">
                      {t.name}
                    </p>

                    <p className="text-sm text-slate-400 sm:text-base">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 sm:px-8 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-5xl rounded-3xl bg-slate-900 p-6 text-center sm:p-12 lg:p-16">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Ready to modernize your internship ecosystem?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base text-slate-400 sm:text-lg">
            Join leading technology enterprises replacing chaotic spreadsheets
            with autonomous pipeline orchestration.
          </p>

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-9 sm:flex-row sm:items-center">
            <a
              href="#demo"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 text-base font-extrabold text-white transition-colors duration-150 hover:bg-blue-500 sm:px-7 sm:py-4"
            >
              Request Enterprise Demo
              <ArrowRight className="h-5 w-5" />
            </a>

            <a
              href="#contact"
              className="rounded-lg border-2 border-slate-700 px-6 py-3.5 text-center text-base font-extrabold text-white transition-colors duration-150 hover:bg-slate-800 sm:px-7 sm:py-4"
            >
              Talk to Solutions Architect
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-semibold text-slate-500 sm:mt-9">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4" />
              SOC2 Compliant
            </span>

            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              24 hr Onboarding
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-800">
        {/* Certification strip */}
        <div className="border-b border-slate-700 bg-slate-900/60 px-4 py-3">
          <p className="text-center text-[11px] font-bold uppercase leading-relaxed tracking-wider text-slate-400 sm:text-xs sm:tracking-widest">
            {CERTIFICATION}
          </p>
        </div>

        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-8 sm:py-16">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
            <div className="sm:col-span-2">
              <img
                src="/rid-tech-logo.jpeg"
                alt="RID Tech Pvt Ltd"
                className="h-12 w-auto object-contain"
              />

              <p className="mt-4 text-lg font-extrabold text-white">
                {CONTACT_INFO.company}
              </p>

              <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
                {CONTACT_INFO.tagline}
              </p>

              <p className="mt-5 max-w-xs text-base leading-relaxed text-slate-400">
                Enterprise-grade orchestration for internship pipelines,
                replacing spreadsheets with one auditable system.
              </p>

              <ul className="mt-6 space-y-3 text-base text-slate-300">
                <li className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                  <Phone className="h-4 w-4 flex-shrink-0 text-blue-400" />

                  <span className="font-semibold text-slate-400">
                    Helpline:
                  </span>

                  <a
                    href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
                    className="font-semibold hover:text-white"
                  >
                    {CONTACT_INFO.phone}
                  </a>
                </li>

                <li className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                  <Mail className="h-4 w-4 flex-shrink-0 text-blue-400" />

                  <span className="font-semibold text-slate-400">
                    Email:
                  </span>

                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="break-all font-semibold hover:text-white"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </li>
              </ul>

              <div className="mt-7 flex items-center gap-3">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-700 text-slate-300 transition-colors duration-150 hover:bg-blue-600 hover:text-white"
                >
                  <span className="text-sm font-extrabold">in</span>
                </a>

                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-700 text-slate-300 transition-colors duration-150 hover:bg-blue-600 hover:text-white"
                >
                  <span className="text-sm font-extrabold">𝕏</span>
                </a>
              </div>
            </div>

            {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
              <div key={heading}>
                <p className="text-base font-extrabold text-white">
                  {heading}
                </p>

                <ul className="mt-4 space-y-3 sm:mt-5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-base text-slate-400 transition-colors duration-150 hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-slate-700 pt-7 text-sm text-slate-400 sm:mt-14 sm:flex-row sm:items-center">
            <p>© {new Date().getFullYear()} IMS Engine. All rights reserved.</p>

            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <a href="#privacy" className="hover:text-slate-300">
                Privacy
              </a>

              <a href="#terms" className="hover:text-slate-300">
                Terms
              </a>

              <a href="#soc2" className="hover:text-slate-300">
                SOC2 Report
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}