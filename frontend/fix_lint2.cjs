const fs = require('fs');
const path = require('path');

const replaceInFile = (file, replacements) => {
  const fullPath = path.join(__dirname, 'src', file);
  if (!fs.existsSync(fullPath)) return;
  let content = fs.readFileSync(fullPath, 'utf8');
  replacements.forEach(r => {
    content = content.replace(r.search, r.replace);
  });
  fs.writeFileSync(fullPath, content);
};

// 1. ManageCompanies.jsx
replaceInFile('features/dashboard/admin/companies/ManageCompanies.jsx', [
  { search: /import CompanyStats from '\.\/components\/CompanyStats';\n?/, replace: '' },
  { search: /const initialCompanies = \[[\s\S]*?\];\n?/, replace: '' },
  { search: /const stats = \{\n\s*total: [^}]+\n\s*\};\n?/, replace: '' }
]);

// 2. AnalyticsSection.jsx
replaceInFile('features/dashboard/admin/companies/components/AnalyticsSection.jsx', [
  { search: /const \{ applications = \[\], assignedStudents = \[\] \} = company;/, replace: 'const { applications = [] } = company;' }
]);

// 3. CompanyProfileDrawer.jsx
replaceInFile('features/dashboard/admin/companies/components/CompanyProfileDrawer.jsx', [
  { search: /\/\* eslint-disable react-hooks\/set-state-in-effect \*\/\n?/, replace: '' }
]);

// 4. EditCompanyModal.jsx
replaceInFile('features/dashboard/admin/companies/components/EditCompanyModal.jsx', [
  { search: /\/\* eslint-disable react-hooks\/set-state-in-effect \*\/\n?/, replace: '' }
]);

// 5. AdminDashboard.jsx
replaceInFile('features/dashboard/admin/dashboard/AdminDashboard.jsx', [
  { search: /import \{ StatCard, StatCardSkeleton \} from '\.\/components\/StatCard';/, replace: "import { StatCard } from './components/StatCard';" }
]);

// 6. MyStudents.jsx
replaceInFile('features/dashboard/faculty/students/MyStudents.jsx', [
  { search: /\} catch \(error\) \{/, replace: '} catch {' }
]);

// 7. Certificates.jsx
replaceInFile('features/dashboard/student/dashboard/Certificates.jsx', [
  { search: /\} catch \(error\) \{/, replace: '} catch {' }
]);

console.log('Fixed');
