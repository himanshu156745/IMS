export const studentProfile = {
  id: "STU-2024-001",
  name: "Rahul",
  fullName: "Rahul Sharma",
  email: "rahul.sharma@example.com",
  avatarInitials: "RS",
  profileCompletionPercent: 78,
  hasActiveInternship: true, // toggled by UI demo switch; API would provide this directly
};

export const profileChecklist = [
  { id: "personal-info", label: "Personal Info", completed: true },
  { id: "education", label: "Education", completed: true },
  { id: "skills", label: "Skills", completed: true },
  { id: "experience", label: "Work Experience", completed: false },
  { id: "projects", label: "Projects", completed: false },
  { id: "resume", label: "Resume Upload", completed: false },
];

export const notStartedStats = [
  { id: "profile", label: "Profile Completion", value: "78%", icon: "UserCheck", accent: "indigo" },
  { id: "applications", label: "Applications Sent", value: "5", icon: "Send", accent: "blue" },
  { id: "shortlisted", label: "Shortlisted", value: "2", icon: "Star", accent: "amber" },
  { id: "available", label: "Available Internships", value: "45", icon: "Briefcase", accent: "emerald" },
];

export const activeStats = [
  { id: "attendance", label: "Attendance", value: "92%", icon: "CalendarCheck", accent: "emerald" },
  { id: "reports", label: "Reports Submitted", value: "18", icon: "FileText", accent: "blue" },
  { id: "hours", label: "Total Hours Worked", value: "350", icon: "Clock", accent: "indigo" },
  { id: "daysLeft", label: "Days Left", value: "45", icon: "CalendarClock", accent: "amber" },
];

export const recommendedInternships = [
  {
    id: "int-1",
    company: "Google",
    role: "Software Developer Intern",
    location: "Bangalore",
    workMode: "Remote",
    stipend: "₹80,000/month",
    logoText: "G",
    logoColor: "bg-blue-500",
  },
  {
    id: "int-2",
    company: "Microsoft",
    role: "Cloud Developer",
    location: "Hyderabad",
    workMode: "Hybrid",
    stipend: "₹75,000/month",
    logoText: "M",
    logoColor: "bg-emerald-500",
  },
  {
    id: "int-3",
    company: "Amazon",
    role: "Backend Developer Intern",
    location: "Pune",
    workMode: "On-site",
    stipend: "₹70,000/month",
    logoText: "A",
    logoColor: "bg-orange-500",
  },
  {
    id: "int-4",
    company: "Adobe",
    role: "UI/UX Design Intern",
    location: "Noida",
    workMode: "Remote",
    stipend: "₹60,000/month",
    logoText: "Ad",
    logoColor: "bg-red-500",
  },
];

export const myApplications = [
  { id: "app-1", company: "Google", role: "Software Developer", status: "Under Review" },
  { id: "app-2", company: "Microsoft", role: "Cloud Developer", status: "Pending" },
  { id: "app-3", company: "Amazon", role: "Backend Developer", status: "Shortlisted" },
  { id: "app-4", company: "TCS", role: "Full Stack Developer", status: "Applied" },
  { id: "app-5", company: "Infosys", role: "Frontend Developer", status: "Applied" },
];

export const applicationStatusSummary = {
  pending: 2,
  underReview: 1,
  shortlisted: 2,
  rejected: 0,
};

export const upcomingDeadlines = [
  { id: "d-1", company: "Google", date: "May 25" },
  { id: "d-2", company: "Microsoft", date: "May 28" },
  { id: "d-3", company: "Amazon", date: "June 1" },
];

export const tipsAndResources = [
  { id: "tip-1", label: "How to write a good resume" },
  { id: "tip-2", label: "Interview preparation guide" },
  { id: "tip-3", label: "Top companies hiring" },
];

export const currentInternship = {
  company: "TCS",
  role: "Full Stack Developer",
  startDate: "Jan 15, 2024",
  endDate: "Jul 15, 2024",
  durationLabel: "6 months",
  progressPercent: 65,
};

export const totalReportsSubmitted = 18;

export const dailyReports = [
  {
    id: "rep-1",
    date: "May 18, 2024",
    status: "Approved",
    task: "Completed user authentication module",
    mentorComment: "Excellent work!",
  },
  {
    id: "rep-2",
    date: "May 17, 2024",
    status: "Approved",
    task: "Integrated payment gateway APIs",
    mentorComment: "Good progress, keep it up.",
  },
  {
    id: "rep-3",
    date: "May 16, 2024",
    status: "Pending",
    task: "Started work on admin dashboard UI",
    mentorComment: null,
  },
];

export const applicationTimeline = [
  { id: "t-1", label: "Applied", completed: true },
  { id: "t-2", label: "Under Review", completed: true },
  { id: "t-3", label: "Interview", completed: true },
  { id: "t-4", label: "Selected", completed: true },
  { id: "t-5", label: "Internship Started", completed: true },
];


