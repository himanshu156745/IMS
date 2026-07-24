// src/features/dashboard/admin/companies/data/companiesData.js
//
// 100% frontend dummy data. No API calls. Deterministic (seeded) so the
// numbers you see in stats/charts stay consistent across reloads.
//
// Exposes:
//   companies          -> 25 companies
//   internships         -> 60 internships (linked via companyId)
//   applications        -> ~180 applications (linked via companyId / internshipId)
//   assignedStudents    -> 150 assigned students (linked via companyId)
//   notifications       -> recent notification feed
//   activities          -> recent activity timeline
//   getCompanyStats()   -> aggregate numbers for the StatCard row
//   getCompanyById(id)  -> convenience lookup

// ---------------------------------------------------------------------------
// Tiny seeded PRNG so "random" data is stable between renders/reloads.
// ---------------------------------------------------------------------------
let seed = 42;
function rand() {
  seed = (seed * 9301 + 49297) % 233280;
  return seed / 233280;
}
function pick(arr) {
  return arr[Math.floor(rand() * arr.length)];
}
function randInt(min, max) {
  return Math.floor(rand() * (max - min + 1)) + min;
}
function randFloat(min, max, decimals = 1) {
  return Number((rand() * (max - min) + min).toFixed(decimals));
}

// ---------------------------------------------------------------------------
// Reference lists
// ---------------------------------------------------------------------------
const COMPANY_NAMES = [
  "Nimbus Cloud Systems", "Verdant Analytics", "Orbitel Technologies", "Pixelforge Studios",
  "Quantara Robotics", "Brightlane Fintech", "Solace Health Tech", "Vertex Commerce",
  "Northwind Logistics", "Cobalt Data Labs", "Lumen Renewable Energy", "Fablehouse Media",
  "Ironclad Cybersecurity", "Meridian Biotech", "Crestwave Software", "Amberline Retail Tech",
  "Skyloom AI", "Granite Infrastructure", "Wavecrest Mobility", "Halcyon Edtech",
  "Copperfield Consulting", "Driftwood Studios", "Zenith Aerospace", "Bluepeak Networks",
  "Terracore Materials",
];

const INDUSTRIES = [
  "Information Technology", "Fintech", "Healthcare", "E-commerce", "Logistics",
  "Artificial Intelligence", "Renewable Energy", "Media & Entertainment", "Cybersecurity",
  "Biotechnology", "EdTech", "Manufacturing",
];

const LOCATIONS = [
  "Bengaluru, IN", "Pune, IN", "Hyderabad, IN", "Gurugram, IN", "Mumbai, IN",
  "Chennai, IN", "Noida, IN", "Ahmedabad, IN", "Indore, IN", "Kolkata, IN",
];

const FIRST_NAMES = [
  "Aarav", "Vivaan", "Aditi", "Ishaan", "Meera", "Kabir", "Ananya", "Rohan",
  "Sanya", "Aryan", "Diya", "Karan", "Priya", "Yash", "Neha", "Arjun",
  "Tanvi", "Devansh", "Riya", "Siddharth",
];

const LAST_NAMES = [
  "Sharma", "Verma", "Iyer", "Nair", "Kapoor", "Mehta", "Chopra", "Reddy",
  "Gupta", "Malhotra", "Bose", "Rao", "Joshi", "Bhatt", "Kulkarni",
];

const COLLEGES = [
  "IIT Bombay", "NIT Trichy", "BITS Pilani", "VIT Vellore", "IIIT Hyderabad",
  "Delhi Technological University", "SRM Institute", "Manipal Institute of Technology",
  "PSG College of Technology", "Anna University",
];

const COURSES = ["B.Tech CSE", "B.Tech IT", "B.Tech ECE", "MCA", "BCA", "B.Sc CS", "M.Tech CSE"];

const ROLES = [
  "Frontend Developer Intern", "Backend Developer Intern", "Full Stack Intern",
  "Data Analyst Intern", "UI/UX Design Intern", "DevOps Intern", "ML Engineer Intern",
  "QA/Testing Intern", "Product Management Intern", "Cloud Engineering Intern",
  "Mobile App Developer Intern", "Cybersecurity Intern",
];

const DEPARTMENTS = ["Engineering", "Product", "Design", "Data Science", "IT Operations", "Quality Assurance"];

const DURATIONS = ["6 Weeks", "8 Weeks", "3 Months", "6 Months"];

function initials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function randomDateWithinDays(daysBack) {
  const d = new Date();
  d.setDate(d.getDate() - randInt(0, daysBack));
  return d.toISOString().slice(0, 10);
}

function futureDateWithinDays(daysForward) {
  const d = new Date();
  d.setDate(d.getDate() + randInt(-10, daysForward));
  return d.toISOString().slice(0, 10);
}

// ---------------------------------------------------------------------------
// Companies (25)
// ---------------------------------------------------------------------------
export const companies = COMPANY_NAMES.map((name, idx) => {
  const id = `CMP-${String(idx + 1).padStart(3, "0")}`;
  const hrFirst = pick(FIRST_NAMES);
  const hrLast = pick(LAST_NAMES);
  const verificationStatus = pick(["Verified", "Verified", "Verified", "Pending", "Suspended"]);
  const status = verificationStatus === "Suspended" ? "Inactive" : "Active";
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "");

  return {
    id,
    logo: initials(name),
    logoColor: pick(["bg-blue-600", "bg-indigo-600", "bg-sky-600", "bg-cyan-600", "bg-blue-500"]),
    name,
    industry: pick(INDUSTRIES),
    location: pick(LOCATIONS),
    website: `https://www.${slug}.com`,
    email: `contact@${slug}.com`,
    phone: `+91 ${randInt(70000, 99999)}${randInt(10000, 99999)}`,
    description: `${name} is a growing ${pick(INDUSTRIES).toLowerCase()} company partnering with top colleges to offer hands-on internship experience to students across India.`,
    hrName: `${hrFirst} ${hrLast}`,
    hrEmail: `${hrFirst.toLowerCase()}.${hrLast.toLowerCase()}@${slug}.com`,
    hrPhone: `+91 ${randInt(70000, 99999)}${randInt(10000, 99999)}`,
    registrationDate: randomDateWithinDays(500),
    verificationStatus,
    status,
    rating: randFloat(3.4, 5.0, 1),
    activeInternships: 0, // filled in below once internships are generated
    studentsAssigned: 0, // filled in below once assignedStudents are generated
    totalApplications: 0, // filled in below once applications are generated
  };
});

export function getCompanyById(id) {
  return companies.find((c) => c.id === id);
}

// ---------------------------------------------------------------------------
// Internships (60, spread across the 25 companies)
// ---------------------------------------------------------------------------
export const internships = Array.from({ length: 60 }).map((_, idx) => {
  const company = companies[idx % companies.length];
  const applications = randInt(4, 60);
  const assignedStudents = randInt(0, Math.min(6, applications));
  const status = pick(["Open", "Open", "Open", "Closed", "Draft"]);

  return {
    id: `INT-${String(idx + 1).padStart(3, "0")}`,
    companyId: company.id,
    role: pick(ROLES),
    department: pick(DEPARTMENTS),
    duration: pick(DURATIONS),
    applications,
    assignedStudents,
    status,
    deadline: futureDateWithinDays(45),
  };
});

// ---------------------------------------------------------------------------
// Applications (derived from internships so totals line up)
// ---------------------------------------------------------------------------
export const applications = [];
let appCounter = 1;
internships.forEach((internship) => {
  const count = Math.min(internship.applications, randInt(2, 8)); // sample a subset for the table
  for (let i = 0; i < count; i++) {
    const studentName = `${pick(FIRST_NAMES)} ${pick(LAST_NAMES)}`;
    applications.push({
      id: `APP-${String(appCounter).padStart(4, "0")}`,
      companyId: internship.companyId,
      internshipId: internship.id,
      internshipRole: internship.role,
      studentName,
      college: pick(COLLEGES),
      course: pick(COURSES),
      resume: `${studentName.replace(/\s+/g, "_")}_Resume.pdf`,
      appliedDate: randomDateWithinDays(90),
      status: pick(["Applied", "Shortlisted", "Interviewing", "Selected", "Rejected"]),
    });
    appCounter += 1;
  }
});

// ---------------------------------------------------------------------------
// Assigned Students (150 total, spread across companies)
// ---------------------------------------------------------------------------
export const assignedStudents = Array.from({ length: 150 }).map((_, idx) => {
  const company = companies[idx % companies.length];
  const companyInternships = internships.filter((i) => i.companyId === company.id);
  const internship = companyInternships.length ? pick(companyInternships) : pick(internships);

  return {
    id: `STU-${String(idx + 1).padStart(3, "0")}`,
    companyId: company.id,
    studentName: `${pick(FIRST_NAMES)} ${pick(LAST_NAMES)}`,
    internship: internship.role,
    facultyMentor: `Dr. ${pick(LAST_NAMES)}`,
    assignedDate: randomDateWithinDays(200),
    attendance: randInt(60, 100),
    performance: randFloat(2.5, 5.0, 1),
    status: pick(["Ongoing", "Ongoing", "Completed", "Terminated"]),
  };
});

// ---------------------------------------------------------------------------
// Roll aggregate counts back up onto each company
// ---------------------------------------------------------------------------
companies.forEach((company) => {
  company.activeInternships = internships.filter(
    (i) => i.companyId === company.id && i.status === "Open"
  ).length;
  company.studentsAssigned = assignedStudents.filter((s) => s.companyId === company.id).length;
  company.totalApplications = applications.filter((a) => a.companyId === company.id).length;
});

// ---------------------------------------------------------------------------
// Notifications
// ---------------------------------------------------------------------------
export const notifications = [
  {
    id: "NOTE-001",
    type: "New Company Registered",
    message: `${companies[0].name} just completed registration and is awaiting verification.`,
    time: "10 minutes ago",
  },
  {
    id: "NOTE-002",
    type: "Verification Pending",
    message: `${companies.find((c) => c.verificationStatus === "Pending")?.name || companies[1].name} has documents pending review.`,
    time: "1 hour ago",
  },
  {
    id: "NOTE-003",
    type: "Company Updated Profile",
    message: `${companies[2].name} updated their HR contact details.`,
    time: "3 hours ago",
  },
  {
    id: "NOTE-004",
    type: "Internship Closed",
    message: `${internships[5].role} at ${getCompanyById(internships[5].companyId)?.name} was marked as closed.`,
    time: "Yesterday",
  },
];

// ---------------------------------------------------------------------------
// Activity Timeline
// ---------------------------------------------------------------------------
export const activities = [
  { id: "ACT-001", type: "Company Registered", message: `${companies[3].name} registered on the platform.`, time: "2 hours ago" },
  { id: "ACT-002", type: "Company Verified", message: `${companies[4].name} was verified by admin.`, time: "5 hours ago" },
  { id: "ACT-003", type: "Internship Posted", message: `${companies[5].name} posted a new role: ${internships[10].role}.`, time: "1 day ago" },
  { id: "ACT-004", type: "Student Assigned", message: `${assignedStudents[0].studentName} was assigned to ${getCompanyById(assignedStudents[0].companyId)?.name}.`, time: "1 day ago" },
  { id: "ACT-005", type: "Internship Closed", message: `${internships[20].role} at ${getCompanyById(internships[20].companyId)?.name} was closed.`, time: "2 days ago" },
  { id: "ACT-006", type: "Company Verified", message: `${companies[6].name} was verified by admin.`, time: "3 days ago" },
];

// ---------------------------------------------------------------------------
// Aggregate stats for the StatCard row
// ---------------------------------------------------------------------------
export function getCompanyStats(companyList = companies) {
  const totalCompanies = companyList.length;
  const verifiedCompanies = companyList.filter((c) => c.verificationStatus === "Verified").length;
  const pendingVerification = companyList.filter((c) => c.verificationStatus === "Pending").length;
  const activeInternshipsCount = internships.filter((i) => i.status === "Open").length;
  const totalApplicationsCount = applications.length;
  const assignedStudentsCount = assignedStudents.length;

  return [
    { key: "total", title: "Total Companies", value: totalCompanies, growth: 8 },
    { key: "verified", title: "Verified Companies", value: verifiedCompanies, growth: 5 },
    { key: "pending", title: "Pending Verification", value: pendingVerification, growth: -3 },
    { key: "internships", title: "Active Internships", value: activeInternshipsCount, growth: 12 },
    { key: "applications", title: "Total Applications", value: totalApplicationsCount, growth: 16 },
    { key: "students", title: "Assigned Students", value: assignedStudentsCount, growth: 9 },
  ];
}

export const industryOptions = ["All Industries", ...INDUSTRIES];
export const locationOptions = ["All Locations", ...LOCATIONS];
export const statusOptions = ["All Status", "Active", "Inactive"];
export const verificationOptions = ["All Verification", "Verified", "Pending", "Suspended"];
export const sortOptions = [
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
  { value: "rating-desc", label: "Rating (High-Low)" },
  { value: "students-desc", label: "Students Assigned (High-Low)" },
  { value: "date-desc", label: "Newest First" },
];
