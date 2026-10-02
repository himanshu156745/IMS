const fs = require('fs');

const filesToFix = [
  'frontend/src/features/dashboard/student/viewInternship/ViewInternship.jsx',
  'frontend/src/features/dashboard/student/dashboard/MyApplications.jsx',
  'frontend/src/features/dashboard/student/dashboard/DailyReports.jsx',
  'frontend/src/features/dashboard/student/dashboard/Certificates.jsx',
  'frontend/src/features/dashboard/student/attendance/AttendancePage.jsx',
  'frontend/src/features/dashboard/company/dashboard/CompanyDashboard.jsx',
  'frontend/src/features/dashboard/company/internships/CompanyInternships.jsx',
  'frontend/src/features/dashboard/company/applications/CompanyApplications.jsx',
  'frontend/src/features/dashboard/admin/companies/ManageCompanies.jsx',
  'frontend/src/features/dashboard/faculty/services/faculty.service.js'
];

filesToFix.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  if (!content.includes('unwrapList')) {
    const srcIndex = filePath.split('/').indexOf('src');
    const folderDepth = filePath.split('/').length - srcIndex - 2;
    let relativePath = '';
    for (let i = 0; i < folderDepth; i++) relativePath += '../';
    relativePath += 'utils/api';
    
    const lines = content.split('\n');
    const lastImportIndex = lines.map(l => l.startsWith('import')).lastIndexOf(true);
    if (lastImportIndex !== -1) {
      lines.splice(lastImportIndex + 1, 0, `import { unwrapList } from '${relativePath}';`);
      content = lines.join('\n');
      changed = true;
    }
  }

  const replacements = [
    ["setInternships(data.data);", "setInternships(unwrapList(res));"],
    ["const { data } = await axiosInstance.get('/internships');", "const res = await axiosInstance.get('/internships');"],
    ["setApplications(data.data);", "setApplications(unwrapList(res));"],
    ["const { data } = await axiosInstance.get('/applications/me');", "const res = await axiosInstance.get('/applications/me');"],
    ["res.data.data.filter", "unwrapList(res).filter"],
    ["setReports(res.data.data)", "setReports(unwrapList(res))"],
    ["setCertificates(res.data.data)", "setCertificates(unwrapList(res))"],
    ["setAttendanceRecords(res.data.data)", "setAttendanceRecords(unwrapList(res))"],
    ["setInternships(res.data.data);", "setInternships(unwrapList(res));"],
    ["setApplications(res.data.data || []);", "setApplications(unwrapList(res));"],
    ["setCompanies(response.data.data);", "setCompanies(unwrapList(response));"],
    ['const response = await api.get("/faculty/students");\n    return response.data;', 'const response = await api.get("/faculty/students");\n    return unwrapList(response);']
  ];

  for (let [find, replace] of replacements) {
    if (content.includes(find)) {
      content = content.replaceAll(find, replace);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content);
  }
});
