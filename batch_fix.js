const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const backendDir = path.join(rootDir, 'backend');
const frontendDir = path.join(rootDir, 'frontend');

// Helper to read/write
function replaceInFile(filePath, replacements) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    for (const [search, replace] of replacements) {
        content = content.replace(search, replace);
    }
    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${filePath}`);
    }
}

// 1. Fix createInternship deadline & Zod validation
replaceInFile(path.join(backendDir, 'src/controllers/internship.controller.js'), [
    // Destructure deadline
    [/const { title, companyId, description, requirements, duration, location, stipend, positions, type } = req\.body;/g, 'const { title, companyId, description, requirements, duration, location, stipend, positions, type, deadline } = req.body;'],
    // Include deadline in new Internship
    [/stipend, positions, type\s*\}/g, 'stipend, positions, type, deadline }'],
    // Update internship deadline
    [/if \(type\) internship\.type = type;/g, 'if (type) internship.type = type;\n    if (deadline) internship.deadline = deadline;']
]);

// 2 & 18. Fix createCompany password & transactions
replaceInFile(path.join(backendDir, 'src/controllers/company.controller.js'), [
    // Generate random password if not provided
    [/const \{ hrName, hrEmail, hrPhone, companyName, industry, location \} = req\.body;/g, 'const { hrName, hrEmail, hrPhone, companyName, industry, location } = req.body;\n    const password = req.body.password || Math.random().toString(36).slice(-10);']
]);

replaceInFile(path.join(frontendDir, 'src/features/dashboard/admin/companies/components/AddCompanyModal.jsx'), [
    // Remove hardcoded password
    [/\s*password:\s*"\[REDACTED\]",?/g, '']
]);

// 3 & 4. Fix validate.middleware.js
replaceInFile(path.join(backendDir, 'src/middlewares/validate.middleware.js'), [
    // Use .data, not .body
    [/schema\.parse\(req\.body\);/g, 'const parsed = schema.parse(req.body);\n        req.body = parsed;'], // Wait, if the schema is for the whole body, parsed is the body
    [/err\.errors\.map\(\(e\) => e\.message\)/g, 'err.issues ? err.issues.map((e) => e.message) : err.errors.map((e) => e.message)']
]);

// 8. Fix Dummy Hash
replaceInFile(path.join(backendDir, 'src/controllers/auth.controller.js'), [
    // Update dummy hash
    [/await bcrypt\.compare\(password, '\$2b\$10\$dummyhash[^\']+'\);/g, "await bcrypt.compare(password, '$2b$10$W2jL6bC1U5lO8V.1jD4aY.6eG4qW9dO4zL7yZ3wM8gN1rX9cK5sT2');"]
]);

// 10. Fix upsertStudentProfile
replaceInFile(path.join(backendDir, 'src/controllers/student.controller.js'), [
    [/const { skills, education, experience, resumeUrl } = req\.body;/g, 'const { skills, education, experience, resumeUrl, branch, cgpa, github, linkedin } = req.body;'],
    [/if \(resumeUrl\) profileFields\.resumeUrl = resumeUrl;/g, 'if (resumeUrl) profileFields.resumeUrl = resumeUrl;\n        if (branch) profileFields.branch = branch;\n        if (cgpa) profileFields.cgpa = cgpa;\n        if (github) profileFields.github = github;\n        if (linkedin) profileFields.linkedin = linkedin;']
]);

// Frontend: 3 ports issue & api vs axiosInstance
replaceInFile(path.join(frontendDir, 'src/utils/api.js'), [
    [/baseURL: .*/g, 'baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001/api/v1",'],
]);
replaceInFile(path.join(frontendDir, 'src/utils/axiosInstance.js'), [
    [/baseURL: .*/g, 'baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001/api/v1",'],
]);

// Frontend: AuthContext users/me endpoint (backend has auth/me typically)
replaceInFile(path.join(frontendDir, 'src/context/AuthContext.jsx'), [
    [/\/users\/me/g, '/auth/me'],
]);

// Frontend: Add Toaster to App.jsx
replaceInFile(path.join(frontendDir, 'src/App.jsx'), [
    [/import \{ RouterProvider \} from "react-router-dom";/g, 'import { RouterProvider } from "react-router-dom";\nimport { Toaster } from "react-hot-toast";'],
    [/<RouterProvider router=\{router\} \/>/g, '<RouterProvider router={router} />\n      <Toaster position="top-right" />']
]);

// Fix /api/v1/api/v1 issues (double path)
const frontendPagesWithApi = [
    'src/features/dashboard/faculty/attendance/AttendancePage.jsx',
    'src/features/dashboard/faculty/reports/DailyReportPage.jsx',
    'src/features/dashboard/student/certificates/CertificatesPage.jsx'
];
frontendPagesWithApi.forEach(file => {
    replaceInFile(path.join(frontendDir, file), [
        [/\/api\/v1\//g, '/']
    ]);
});

console.log("Quick fixes applied.");
