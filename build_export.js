const fs = require('fs');
const path = require('path');

const ROOT_DIR = process.cwd();
const OUTPUT_FILE = path.join(ROOT_DIR, 'PROJECT_FULL_CODE.txt');

const EXCLUDED_DIRS = [
  'node_modules', '.git', 'dist', 'build', '.next', 'coverage', 'logs', 'tmp', 'cache'
];

const EXCLUDED_FILES = [
  'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml',
  'PROJECT_FULL_CODE.txt', 'builder.js', 'export_code.js', 'batch_fix.js', 'build_export.js', 'export.py'
];

const BINARY_EXTS = [
  '.png', '.jpg', '.jpeg', '.gif', '.ico', '.svg', '.ttf', '.woff', '.woff2', '.eot', '.pdf', '.zip', '.sqlite', '.db', '.mp4', '.pyc', '.exe', '.dll', '.webp'
];

const SECTIONS = {
  DATABASE: { files: [], match: (p) => /backend[\\/].*[\\/](models|schema|migrations|seeders|config[\\/]db)/i.test(p) || p.toLowerCase().endsWith('.sql') },
  CONFIG: { files: [], match: (p) => /^(package\.json|tsconfig.*\.json|vite\.config.*|tailwind\.config.*|postcss\.config.*|eslint.*|webpack\.config.*|docker-compose\.yml|Dockerfile|README\.md|\.prettierrc|\.eslintrc.*|backend[\\/]package\.json|frontend[\\/]package\.json|\.gitignore|backend[\\/]\.gitignore|frontend[\\/]\.gitignore|docs[\\/].*)$/i.test(p) },
  FRONTEND: { files: [], match: (p) => /^frontend[\\/]/i.test(p) && !/^(frontend[\\/]package\.json)$/i.test(p) && !/^(frontend[\\/]\.gitignore)$/i.test(p) },
  BACKEND: { files: [], match: (p) => /^backend[\\/]/i.test(p) && !(/backend[\\/].*[\\/](models|schema|migrations|seeders|config[\\/]db)/i.test(p) || p.toLowerCase().endsWith('.sql')) && !/^(backend[\\/]package\.json)$/i.test(p) && !/^(backend[\\/]\.gitignore)$/i.test(p) }
};

let redactedFiles = [];
let unreadableFiles = [];

function scanDir(dir) {
  let results = [];
  let list;
  try {
    list = fs.readdirSync(dir);
  } catch (err) {
    return results;
  }
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const relPath = path.relative(ROOT_DIR, fullPath).replace(/\\/g, '/');
    
    if (file.includes('.env') || file.endsWith('.env')) continue;
    
    let stat;
    try {
        stat = fs.statSync(fullPath);
    } catch(err) {
        continue;
    }
    
    if (stat.isDirectory()) {
      if (EXCLUDED_DIRS.includes(file)) continue;
      results = results.concat(scanDir(fullPath));
    } else {
      if (EXCLUDED_FILES.includes(file)) continue;
      const ext = path.extname(file).toLowerCase();
      if (BINARY_EXTS.includes(ext)) continue;
      
      results.push(relPath);
    }
  }
  return results;
}

const allFiles = scanDir(ROOT_DIR);
const unassigned = [];

for (const file of allFiles) {
  if (SECTIONS.CONFIG.match(file)) {
    SECTIONS.CONFIG.files.push(file);
  } else if (SECTIONS.DATABASE.match(file)) {
    SECTIONS.DATABASE.files.push(file);
  } else if (SECTIONS.FRONTEND.match(file)) {
    SECTIONS.FRONTEND.files.push(file);
  } else if (SECTIONS.BACKEND.match(file)) {
    SECTIONS.BACKEND.files.push(file);
  } else {
    unassigned.push(file);
  }
}

function generateTree(paths) {
    let tree = [];
    paths.sort();
    for (let p of paths) {
        let parts = p.split('/');
        let indent = '  '.repeat(parts.length - 1);
        tree.push(indent + '- ' + parts[parts.length - 1]);
    }
    return tree.join('\n');
}

function generateFile() {
  const ws = fs.createWriteStream(OUTPUT_FILE, 'utf8');
  
  ws.write(`PROJECT TITLE: Internship Management System\n`);
  ws.write(`DETECTED TECH STACK: Frontend: React/Vite, Tailwind CSS; Backend: Express/Node.js; Database: MongoDB/Mongoose\n\n`);
  
  ws.write(`--- FOLDER TREE ---\n`);
  ws.write(generateTree(allFiles) + '\n');
  ws.write(`\n--- TABLE OF CONTENTS ---\n`);
  
  const writeToc = (sectionName, sectionKey) => {
    ws.write(`\n## SECTION: ${sectionName}\n`);
    for (const file of SECTIONS[sectionKey].files) {
      ws.write(`- ${file}\n`);
    }
  }
  
  writeToc('DATABASE', 'DATABASE');
  writeToc('BACKEND', 'BACKEND');
  writeToc('FRONTEND', 'FRONTEND');
  writeToc('CONFIG', 'CONFIG');
  
  ws.write(`\n\n`);
  
  const writeFiles = (sectionName, sectionKey) => {
    const files = SECTIONS[sectionKey].files;
    files.sort((a, b) => {
      const aIsEntry = a.endsWith('server.js') || a.endsWith('index.js') || a.endsWith('main.jsx') || a.endsWith('app.js') || a.endsWith('App.jsx');
      const bIsEntry = b.endsWith('server.js') || b.endsWith('index.js') || b.endsWith('main.jsx') || b.endsWith('app.js') || b.endsWith('App.jsx');
      if (aIsEntry && !bIsEntry) return -1;
      if (!aIsEntry && bIsEntry) return 1;
      return a.localeCompare(b);
    });
    
    for (const file of files) {
      ws.write(`================================================================\n`);
      ws.write(`FILE: ${file}\n`);
      ws.write(`SECTION: ${sectionName}\n`);
      ws.write(`================================================================\n`);
      
      try {
        let content = fs.readFileSync(path.join(ROOT_DIR, file), 'utf8');
        
        let redacted = false;
        
        // Redact Mongo URI if hardcoded
        content = content.replace(/(mongodb(?:\+srv)?:\/\/[^:]+:)([^@]+)(@.*)/gi, (match, p1, p2, p3) => {
            if (p2.includes('process.env')) return match;
            redacted = true;
            return `${p1}[REDACTED]${p3}`;
        });
        
        // Redact generic passwords/secrets/API keys
        content = content.replace(/(password|secret|api_key|token|private_key|JWT_SECRET)(['"]?\s*[:=]\s*['"])([^'"]+)(['"])/gi, (match, p1, p2, p3, p4) => {
            if (p3.includes('process.env') || p3.includes('${') || p3.toLowerCase() === 'true' || p3.toLowerCase() === 'false' || p3.toLowerCase() === 'null' || p3.toLowerCase() === 'undefined') {
              return match; 
            }
            if (p3.length < 2) return match;
            if (p3 === 'testpassword' || p3 === 'testsecret') return match;
            
            // Exclude matching semantic versioning strings in package.json
            if (p3.startsWith('^') || p3.startsWith('~') || /^\d+\.\d+\.\d+/.test(p3)) return match;
            
            redacted = true;
            return `${p1}${p2}[REDACTED]${p4}`;
        });
        
        if (redacted && !redactedFiles.includes(file)) {
          redactedFiles.push(file);
        }
        
        ws.write(content);
        if (!content.endsWith('\n')) {
            ws.write('\n');
        }
      } catch (err) {
        ws.write(`Error reading file: ${err.message}\n`);
        unreadableFiles.push({ file, reason: err.message });
      }
      ws.write(`---------------------------- END OF FILE ----------------------------\n\n`);
    }
  }
  
  writeFiles('DATABASE', 'DATABASE');
  writeFiles('BACKEND', 'BACKEND');
  writeFiles('FRONTEND', 'FRONTEND');
  writeFiles('CONFIG', 'CONFIG');
  
  ws.end();
  ws.on('finish', () => {
    console.log(JSON.stringify({
      path: OUTPUT_FILE,
      size: fs.statSync(OUTPUT_FILE).size,
      totalFiles: allFiles.length,
      sections: {
        DATABASE: SECTIONS.DATABASE.files.length,
        BACKEND: SECTIONS.BACKEND.files.length,
        FRONTEND: SECTIONS.FRONTEND.files.length,
        CONFIG: SECTIONS.CONFIG.files.length
      },
      redactedFiles,
      unreadableFiles,
      unassigned
    }));
  });
}

generateFile();
