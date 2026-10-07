export const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: 'dashboard', path: '/' },
  { key: 'students', label: 'Assigned Students', icon: 'students', path: '/students' },
  { key: 'profile', label: 'Company Profile', icon: 'profile', path: '/profile' },
  { key: 'manage', label: 'Manage Internships', icon: 'manage', path: '/manage' },
  { key: 'post', label: 'Post Internship', icon: 'post', path: '/post' },
  { key: 'applications', label: 'View Applications', icon: 'applications', path: '/applications' },
]

export const navSections = [
  {
    label: 'Overview',
    items: [
      { key: 'dashboard', label: 'Dashboard', icon: 'dashboard', path: '/' },
      { key: 'profile', label: 'Company Profile', icon: 'profile', path: '/profile' },
    ],
  },
  {
    label: 'Internships',
    items: [
      { key: 'post', label: 'Post Internship', icon: 'post', path: '/post' },
      { key: 'manage', label: 'Manage Internships', icon: 'manage', path: '/manage' },
    ],
  },
  {
    label: 'Talent',
    items: [
      { key: 'applications', label: 'View Applications', icon: 'applications', path: '/applications' },
      { key: 'students', label: 'Assigned Students', icon: 'students', path: '/students' },
    ],
  },
]

export const pageMeta = {
  '/': ['Dashboard', "Welcome back, here's what's happening today."],
  '/profile': ['Company Profile', 'Manage your organization details and public presence.'],
  '/post': ['Post Internship', 'Create a new internship listing for students.'],
  '/manage': ['Manage Internships', 'View, edit and track all your posted internships.'],
  '/applications': ['View Applications', 'Review and act on incoming student applications.'],
  '/students': ['Assigned Students', 'Track progress of students placed at your company.'],
}
