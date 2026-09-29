import { PIPELINE_STEPS, pipelineIndex, isRejected } from "../utils/pipelineSteps";

// ── Reference pools ─────────────────────────────────────────────────
const FIRST_NAMES = [
  "Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Reyansh", "Ayaan",
  "Krishna", "Ishaan", "Ananya", "Diya", "Saanvi", "Aadhya", "Kiara", "Myra",
  "Anika", "Navya", "Pari", "Riya",
];
const LAST_NAMES = [
  "Sharma", "Verma", "Gupta", "Iyer", "Nair", "Reddy", "Rao", "Malhotra",
  "Singh", "Kapoor",
];
const COLLEGES = [
  "IIT Bombay", "NIT Trichy", "BITS Pilani", "VIT Vellore", "SRM Chennai",
  "Manipal Institute of Technology", "DTU Delhi", "IIIT Hyderabad",
];
const BRANCHES = [
  "Computer Science", "Information Technology", "Electronics",
  "Mechanical", "Civil", "Electrical",
];
const SKILLS_POOL = [
  "React", "Node.js", "MongoDB", "Python", "Java", "Docker", "AWS",
  "TypeScript", "SQL", "Git", "Kubernetes", "GraphQL",
];
const COMPANIES = [
  "TechNova Solutions", "InnovateX Labs", "CloudSphere Inc", "DataForge Analytics",
  "PixelCraft Studio", "NimbusCloud Technologies", "ByteWave Systems", "Quantum Softwares",
  "CircuitEdge Systems", "Innoventra Labs", "PixelForge Studio", "DataWave Analytics",
  "TorqueWorks Pvt Ltd", "QuantumByte Softwares", "GreenField Robotics", "SkyNet Solutions",
  "BluePeak Digital", "Zenith Cloud Corp", "Apex Innovations", "Vertex Systems",
];
const ROLES = [
  "Frontend Developer", "Backend Developer", "Full Stack Developer", "Data Analyst",
  "ML Engineer", "DevOps Engineer", "UI/UX Designer", "QA Engineer",
  "Mobile App Developer", "Cloud Engineer",
];

// ── Internships (30) ────────────────────────────────────────────────
export const INTERNSHIPS = Array.from({ length: 30 }, (_, i) => {
  const company = COMPANIES[i % COMPANIES.length];
  const role = ROLES[i % ROLES.length];
  const requiredSkills = [
    SKILLS_POOL[i % SKILLS_POOL.length],
    SKILLS_POOL[(i + 3) % SKILLS_POOL.length],
    SKILLS_POOL[(i + 6) % SKILLS_POOL.length],
    SKILLS_POOL[(i + 9) % SKILLS_POOL.length],
  ];
  return {
    id: `INT${String(i + 1).padStart(3, "0")}`,
    title: `${role} Intern`,
    company,
    requiredSkills,
  };
});

// ── Students (100) ──────────────────────────────────────────────────
export const STUDENTS = Array.from({ length: 100 }, (_, i) => {
  const first = FIRST_NAMES[i % FIRST_NAMES.length];
  const last = LAST_NAMES[(i + Math.floor(i / FIRST_NAMES.length)) % LAST_NAMES.length];
  const name = `${first} ${last}`;
  const skills = [
    SKILLS_POOL[i % SKILLS_POOL.length],
    SKILLS_POOL[(i + 2) % SKILLS_POOL.length],
    SKILLS_POOL[(i + 5) % SKILLS_POOL.length],
    SKILLS_POOL[(i + 7) % SKILLS_POOL.length],
  ];
  return {
    id: `STU${String(i + 1).padStart(3, "0")}`,
    name,
    photo: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
    email: `${first.toLowerCase()}.${last.toLowerCase()}${i}@college.edu`,
    phone: `+91 9${String(100000000 + i * 137).slice(0, 9)}`,
    college: COLLEGES[i % COLLEGES.length],
    branch: BRANCHES[i % BRANCHES.length],
    semester: (i % 4) + 5,
    cgpa: (6 + ((i * 37) % 40) / 10).toFixed(1),
    skills,
    github: i % 3 !== 0 ? `https://github.com/${first.toLowerCase()}${last.toLowerCase()}` : null,
    linkedin: i % 4 !== 0 ? `https://linkedin.com/in/${first.toLowerCase()}-${last.toLowerCase()}` : null,
    portfolio: i % 5 === 0 ? `https://${first.toLowerCase()}${last.toLowerCase()}.dev` : null,
  };
});

// ── Applications (200) ──────────────────────────────────────────────
// Weighted status pool so the pipeline looks realistic (more Applied/Under
// Review than Completed).
const STATUS_POOL = [
  "Applied", "Applied", "Applied",
  "Under Review", "Under Review", "Under Review",
  "Shortlisted", "Shortlisted",
  "Interview Scheduled", "Interview Scheduled",
  "Accepted",
  "Rejected", "Rejected",
  "Assigned",
  "Completed",
];
const PRIORITIES = ["High", "Medium", "Low"];

function buildHistory(status, appliedDate) {
  if (isRejected(status)) {
    return [
      { step: "Applied", date: appliedDate },
      { step: "Under Review", date: appliedDate },
      { step: "Rejected", date: appliedDate },
    ];
  }
  const idx = pipelineIndex(status);
  return PIPELINE_STEPS.slice(0, idx + 1).map((step) => ({ step, date: appliedDate }));
}

export const APPLICATIONS = Array.from({ length: 200 }, (_, i) => {
  const student = STUDENTS[i % STUDENTS.length];
  const internship = INTERNSHIPS[i % INTERNSHIPS.length];
  const status = STATUS_POOL[i % STATUS_POOL.length];
  const priority = PRIORITIES[i % PRIORITIES.length];

  const dayOffset = i % 90;
  const applied = new Date(2026, 6, 24);
  applied.setDate(applied.getDate() - dayOffset);
  const appliedDate = applied.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  const matched = internship.requiredSkills.filter((s) => student.skills.includes(s));
  const missing = internship.requiredSkills.filter((s) => !student.skills.includes(s));
  const percentage = Math.round((matched.length / internship.requiredSkills.length) * 100);

  const needsInterview = ["Interview Scheduled", "Accepted", "Assigned", "Completed"].includes(status);
  const interview = needsInterview
    ? {
        date: appliedDate,
        time: `${10 + (i % 6)}:00 AM`,
        mode: i % 2 === 0 ? "Online" : "In-Person",
        link: i % 2 === 0 ? "https://meet.google.com/demo-link" : null,
        notes: "Initial technical screening round.",
      }
    : null;

  return {
    id: `APP${String(i + 1).padStart(4, "0")}`,
    student,
    internship: { title: internship.title, company: internship.company, requiredSkills: internship.requiredSkills },
    resume: `${student.name.replace(/\s+/g, "_")}_Resume.pdf`,
    appliedDate,
    priority,
    skillMatch: { percentage, matched, missing },
    status,
    documents: {
      resume: `${student.name.replace(/\s+/g, "_")}_Resume.pdf`,
      certificates: i % 3 === 0 ? [`Certificate_${i}.pdf`] : [],
      coverLetter: i % 4 === 0 ? `${student.name.replace(/\s+/g, "_")}_CoverLetter.pdf` : null,
      idProof: `${student.name.replace(/\s+/g, "_")}_ID.pdf`,
      portfolio: student.portfolio,
    },
    interview,
    adminNotes:
      i % 5 === 0
        ? ["Strong technical fundamentals.", "Recommended for next round."]
        : i % 5 === 1
        ? ["Good communication skills."]
        : [],
    history: buildHistory(status, appliedDate),
  };
});

export const APPLICATION_DEPARTMENTS = BRANCHES;
export { COLLEGES, BRANCHES, SKILLS_POOL };