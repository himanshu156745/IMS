// ================= Dashboard Stats =================

export const dashboardStats = [
  {
    id: 1,
    title: "Total Projects",
    value: 24,
    change: "+12%",
    trend: "up",
    color: "blue",
  },
  {
    id: 2,
    title: "Active Projects",
    value: 18,
    change: "+5%",
    trend: "up",
    color: "green",
  },
  {
    id: 3,
    title: "Completed Projects",
    value: 6,
    change: "+18%",
    trend: "up",
    color: "emerald",
  },
  {
    id: 4,
    title: "Delayed Projects",
    value: 2,
    change: "-2%",
    trend: "down",
    color: "red",
  },
  {
    id: 5,
    title: "Total Teams",
    value: 8,
    change: "+2",
    trend: "up",
    color: "purple",
  },
  {
    id: 6,
    title: "Total Interns",
    value: 46,
    change: "+7",
    trend: "up",
    color: "orange",
  },
  {
    id: 7,
    title: "Average Progress",
    value: "74%",
    change: "+6%",
    trend: "up",
    color: "cyan",
  },
  {
    id: 8,
    title: "Completion Rate",
    value: "91%",
    change: "+4%",
    trend: "up",
    color: "teal",
  },
];

// ================= Domain Stats =================

export const domainStats = [
  {
    id: 1,
    domain: "MERN Stack",
    projects: 7,
    active: 5,
    completed: 2,
    progress: 82,
  },
  {
    id: 2,
    domain: "Python (Django)",
    projects: 4,
    active: 3,
    completed: 1,
    progress: 72,
  },
  {
    id: 3,
    domain: "Java",
    projects: 4,
    active: 3,
    completed: 1,
    progress: 68,
  },
  {
    id: 4,
    domain: "React.js",
    projects: 3,
    active: 2,
    completed: 1,
    progress: 81,
  },
  {
    id: 5,
    domain: "Node.js",
    projects: 3,
    active: 2,
    completed: 1,
    progress: 76,
  },
  {
    id: 6,
    domain: "Flutter",
    projects: 3,
    active: 3,
    completed: 0,
    progress: 64,
  },
];

// ================= Projects =================

export const projects = [
  {
    id: "P001",
    projectName: "Internship Management System",
    domain: "MERN Stack",
    teamLeader: "Rahul Sharma",
    teamSize: 6,
    progress: 82,
    deadline: "15 Aug 2026",
    status: "On Track",
  },
  {
    id: "P002",
    projectName: "Employee Portal",
    domain: "React.js",
    teamLeader: "Karan Verma",
    teamSize: 5,
    progress: 88,
    deadline: "10 Aug 2026",
    status: "On Track",
  },
  {
    id: "P003",
    projectName: "Hospital Management",
    domain: "Java",
    teamLeader: "Priya Singh",
    teamSize: 5,
    progress: 91,
    deadline: "28 Jul 2026",
    status: "Completed",
  },
];

// ================= Weekly Reports =================

export const weeklyReports = [
  {
    id: 1,
    project: "Internship Management System",
    week: "Week 4",
    submittedBy: "Rahul Sharma",
    date: "22 Jul 2026",
    progress: 82,
    completedWork: [
      "Dashboard Completed",
      "Authentication Module",
    ],
    currentWork: [
      "Analytics Module",
    ],
    upcomingWork: [
      "Deployment",
      "Testing",
    ],
    blockers: [
      "Backend API Pending",
    ],
    remarks: "Project is progressing well.",
  },
];

// ================= Team Contribution =================

export const teamContribution = [
  {
    id: 1,
    member: "Himanshu Sharma",
    role: "Backend Developer",
    project: "IMS",
    module: "Authentication",
    assignedTasks: 16,
    completedTasks: 14,
    progress: 87,
  },
  {
    id: 2,
    member: "Nidhi Tiwari",
    role: "Frontend Developer",
    project: "IMS",
    module: "Company Dashboard",
    assignedTasks: 18,
    completedTasks: 17,
    progress: 94,
  },
  {
    id: 3,
    member: "Bhoomi Kesharwani",
    role: "Frontend Developer",
    project: "IMS",
    module: "Faculty Dashboard",
    assignedTasks: 15,
    completedTasks: 14,
    progress: 91,
  },
  {
    id: 4,
    member: "Shivam Jaiswal",
    role: "Frontend Developer",
    project: "IMS",
    module: "Admin Dashboard",
    assignedTasks: 20,
    completedTasks: 17,
    progress: 85,
  },
  {
    id: 5,
    member: "Abhiram Giri",
    role: "Frontend Developer",
    project: "IMS",
    module: "Admin Dashboard",
    assignedTasks: 20,
    completedTasks: 17,
    progress: 85,
  },
  {
    id: 6,
    member: "Lakshmi Niwash Patel",
    role: "Frontend Developer",
    project: "IMS",
    module: "Student Dashboard",
    assignedTasks: 16,
    completedTasks: 13,
    progress: 83,
  },
];

// ================= Recent Activity =================

export const recentActivities = [
  {
    id: 1,
    activity: "Rahul Sharma submitted Week 4 report.",
    time: "2 hours ago",
  },
  {
    id: 2,
    activity: "Hospital Management reached 91% completion.",
    time: "Yesterday",
  },
];

// ================= Chart Data =================

export const weeklyProgressData = [
  { week: "W1", progress: 20 },
  { week: "W2", progress: 35 },
  { week: "W3", progress: 55 },
  { week: "W4", progress: 72 },
  { week: "W5", progress: 82 },
];

export const projectStatusData = [
  { name: "Completed", value: 6 },
  { name: "Active", value: 18 },
  { name: "Delayed", value: 2 },
];

export const domainChartData = [
  { name: "MERN", value: 7 },
  { name: "React", value: 3 },
  { name: "Node", value: 3 },
  { name: "Java", value: 4 },
  { name: "Django", value: 4 },
  { name: "Flutter", value: 3 },
];

export const teamPerformanceData = [
  { team: "Alpha", progress: 92 },
  { team: "Beta", progress: 84 },
  { team: "Gamma", progress: 76 },
  { team: "Delta", progress: 69 },
];