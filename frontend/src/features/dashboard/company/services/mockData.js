// Mock data layer. Swap these functions for real API calls (e.g. fetch/axios)
// when the backend is ready — the page components only depend on this shape.

export const stats = [
  {
    label: 'Active Internships',
    value: 18,
    delta: '+12%',
    deltaTone: 'up',
    icon: 'manage',
    bars: [40, 65, 50, 80, 60, 95],
    barTone: 'brand',
  },
  {
    label: 'Total Applications',
    value: 246,
    delta: '+8%',
    deltaTone: 'up',
    icon: 'applications',
    bars: [55, 35, 70, 45, 85, 65],
    barTone: 'brand',
  },
  {
    label: 'Assigned Students',
    value: 42,
    delta: '+4%',
    deltaTone: 'up',
    icon: 'students',
    bars: [30, 50, 40, 60, 55, 75],
    barTone: 'brand',
  },
  {
    label: 'Pending Reviews',
    value: 27,
    delta: '-3%',
    deltaTone: 'down',
    icon: 'pending',
    bars: [60, 45, 70, 55, 80, 50],
    barTone: 'amber',
  },
]

export const recentApplications = [
  { name: 'Aarav Mehta', avatar: 32, internship: 'UI/UX Design Intern', applied: '21 Jul 2026', status: 'Pending' },
  { name: 'Priya Sharma', avatar: 47, internship: 'Data Analyst Intern', applied: '20 Jul 2026', status: 'Accepted' },
  { name: 'Rohan Kulkarni', avatar: 15, internship: 'Backend Developer Intern', applied: '19 Jul 2026', status: 'Shortlisted' },
  { name: 'Sneha Iyer', avatar: 26, internship: 'Marketing Intern', applied: '18 Jul 2026', status: 'Rejected' },
]

export const upcomingDeadlines = [
  { month: 'JUL', day: '23', title: 'Backend Developer Intern', note: 'Applications close tomorrow · 6 slots open', tone: 'rose' },
  { month: 'JUL', day: '28', title: 'UI/UX Design Intern', note: 'Applications close in 6 days · 3 slots open', tone: 'brand' },
  { month: 'AUG', day: '02', title: 'Data Analyst Intern', note: 'Applications close in 11 days · 2 slots open', tone: 'brand' },
]

export const notifications = [
  {
    icon: 'applications',
    tone: 'brand',
    text: 'New application from **Aarav Mehta** for UI/UX Design Intern',
    time: '5 minutes ago',
  },
  {
    icon: 'pending',
    tone: 'amber',
    text: 'Application deadline for Backend Intern closes tomorrow',
    time: '2 hours ago',
  },
  {
    icon: 'check',
    tone: 'emerald',
    text: 'Priya Sharma accepted the offer for Data Analyst Intern',
    time: 'Yesterday',
  },
]

export const company = {
  initials: 'RT',
  name: 'RID Tech Private Limited',
  tagline: 'Research to Reality',
  logo: '/rid-logo.jpg',
  banner: '/rid-banner.jpg',
  industry: 'Software & EdTech Services',
  internshipsPosted: 18,
  studentsHosted: 126,
  email: 'admin@ridtech.in',
  phone: '+91 98765 43210',
  website: 'www.ridtech.in',
  location: 'Bhopal, Madhya Pradesh',
  teamSize: '50–100 employees',
  address: 'MP Nagar, Zone II, Bhopal, Madhya Pradesh, India',
  about:
    'RID Tech Private Limited builds EdTech products and library management platforms, and offers hands-on internships across development, design, and data roles.',
}

export const internships = [
  { title: 'Frontend Developer Intern', dept: 'Engineering', type: 'Remote', openings: 4, applications: 38, status: 'Active' },
  { title: 'Backend Developer Intern', dept: 'Engineering', type: 'Hybrid', openings: 6, applications: 52, status: 'Active' },
  { title: 'UI/UX Design Intern', dept: 'Design', type: 'Remote', openings: 3, applications: 29, status: 'Active' },
  { title: 'Data Analyst Intern', dept: 'Data & Analytics', type: 'On-site', openings: 2, applications: 17, status: 'Draft' },
  { title: 'Marketing Intern', dept: 'Marketing', type: 'Remote', openings: 3, applications: 23, status: 'Closed' },
]

export const applications = [
  { name: 'Aarav Mehta', avatar: 32, subtitle: 'B.Tech CSE, 3rd Year', internship: 'UI/UX Design Intern', applied: '21 Jul 2026', status: 'Pending' },
  { name: 'Priya Sharma', avatar: 47, subtitle: 'B.Sc Data Science, Final Year', internship: 'Data Analyst Intern', applied: '20 Jul 2026', status: 'Accepted' },
  { name: 'Rohan Kulkarni', avatar: 15, subtitle: 'B.Tech IT, 3rd Year', internship: 'Backend Developer Intern', applied: '19 Jul 2026', status: 'Shortlisted' },
  { name: 'Sneha Iyer', avatar: 26, subtitle: 'BBA Marketing, 2nd Year', internship: 'Marketing Intern', applied: '18 Jul 2026', status: 'Rejected' },
]

export const assignedStudents = [
  {
    name: 'Priya Sharma',
    avatar: 47,
    role: 'Data Analyst Intern',
    status: 'Ongoing',
    mentor: 'Anjali Verma',
    startDate: '01 Jul 2026',
    progress: 64,
    action: 'Message Student',
  },
  {
    name: 'Rohan Kulkarni',
    avatar: 15,
    role: 'Backend Developer Intern',
    status: 'Ongoing',
    mentor: 'Karan Bedi',
    startDate: '15 Jun 2026',
    progress: 80,
    action: 'Message Student',
  },
  {
    name: 'Fatima Sheikh',
    avatar: 5,
    role: 'Frontend Developer Intern',
    status: 'Completed',
    mentor: 'Anjali Verma',
    startDate: '01 Apr 2026',
    progress: 100,
    action: 'View Certificate',
  },
]
