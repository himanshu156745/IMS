const fs = require('fs');
const path = require('path');

const IGNORE_DIRS = ['node_modules', '.git', 'dist', 'build', '.next', 'coverage', 'logs', 'tmp', 'cache', 'temp', '.gemini'];
const IGNORE_FILES_EXT = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.pdf', '.zip', '.sqlite', '.db', '.ttf', '.woff', '.woff2'];
const IGNORE_FILES = ['package-lock.json', 'yarn.lock', 'pnpm-lock.yaml', 'PROJECT_FULL_CODE.txt', 'export_code.js'];

const classify = (filePath) => {
    const normalized = filePath.replace(/\\/g, '/');
    if (normalized.includes('/models/') || normalized.includes('/db/')) return 'DATABASE';
    if (normalized.startsWith('backend/') || normalized.startsWith('/backend/')) return 'BACKEND';
    if (normalized.startsWith('frontend/') || normalized.startsWith('/frontend/')) return 'FRONTEND';
    if (['package.json', 'vite.config.js', 'tsconfig.json', '.gitignore', 'README.md', 'tailwind.config.js', 'postcss.config.js', 'eslint.config.js'].includes(path.basename(normalized))) return 'CONFIG';
    
    // Default fallback
    if (normalized.includes('frontend')) return 'FRONTEND';
    if (normalized.includes('backend')) return 'BACKEND';
    return 'CONFIG';
};

const redactSecrets = (content, filePath) => {
    let redacted = false;
    const rules = [
        /(password\s*:\s*['"`])([^'"`]+)(['"`])/gi,
        /(secret\s*:\s*['"`])([^'"`]+)(['"`])/gi,
        /(api_?key\s*:\s*['"`])([^'"`]+)(['"`])/gi,
        /(token\s*:\s*['"`])([^'"`]+)(['"`])/gi,
    ];
    let newContent = content;
    rules.forEach(rule => {
        newContent = newContent.replace(rule, (match, p1, p2, p3) => {
            // Ignore if it looks like an environment variable reference (e.g. process.env.XYZ)
            if (p2.includes('process.env') || p2.includes('$')) {
                return match;
            }
            // Skip common non-secrets that might match (e.g., standard strings)
            if (p2.toLowerCase() === 'password' || p2.toLowerCase() === 'secret') {
                 return match;
            }
            redacted = true;
            return `${p1}[REDACTED]${p3}`;
        });
    });
    return { content: newContent, redacted };
};

const walk = (dir, rootDir, filesList = []) => {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const relPath = path.relative(rootDir, filePath);
        
        if (IGNORE_DIRS.includes(file) || file.startsWith('.env')) {
            continue;
        }

        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            walk(filePath, rootDir, filesList);
        } else {
            if (IGNORE_FILES.includes(file) || IGNORE_FILES_EXT.includes(path.extname(file).toLowerCase()) || file.startsWith('.env')) {
                continue;
            }
            filesList.push(relPath);
        }
    }
    return filesList;
};

const generateTree = (files) => {
    return files.sort().map(f => '│   ' + f.replace(/\\/g, '/')).join('\n');
};

const main = () => {
    const rootDir = __dirname;
    const allFiles = walk(rootDir, rootDir);
    
    const sections = {
        DATABASE: [],
        BACKEND: [],
        FRONTEND: [],
        CONFIG: []
    };

    let redactedFiles = [];
    let fileContents = {};

    allFiles.forEach(f => {
        const section = classify(f);
        sections[section].push(f);
        
        const content = fs.readFileSync(path.join(rootDir, f), 'utf-8');
        const { content: safeContent, redacted } = redactSecrets(content, f);
        fileContents[f] = safeContent;
        if (redacted) {
            redactedFiles.push(f);
        }
    });

    const outPath = path.join(rootDir, 'PROJECT_FULL_CODE.txt');
    const outStream = fs.createWriteStream(outPath, { encoding: 'utf-8' });

    outStream.write('Project Title: Internship Management System\n');
    outStream.write('Tech Stack: MongoDB, Express, React, Node.js (MERN), TailwindCSS\n\n');
    outStream.write('--- FOLDER TREE ---\n');
    outStream.write(generateTree(allFiles) + '\n\n');

    outStream.write('--- TABLE OF CONTENTS ---\n');
    ['DATABASE', 'BACKEND', 'FRONTEND', 'CONFIG'].forEach(sec => {
        outStream.write(`\n[${sec}]\n`);
        sections[sec].forEach(f => outStream.write(` - ${f.replace(/\\/g, '/')}\n`));
    });
    outStream.write('\n\n');

    ['DATABASE', 'BACKEND', 'FRONTEND', 'CONFIG'].forEach(sec => {
        sections[sec].forEach(f => {
            outStream.write('================================================================\n');
            outStream.write(`FILE: ${f.replace(/\\/g, '/')}\n`);
            outStream.write(`SECTION: ${sec}\n`);
            outStream.write('================================================================\n');
            outStream.write(fileContents[f] + '\n');
            outStream.write('---------------------------- END OF FILE ----------------------------\n\n');
        });
    });

    outStream.end(() => {
        const stats = fs.statSync(outPath);
        console.log(JSON.stringify({
            outPath,
            size: (stats.size / 1024).toFixed(2) + ' KB',
            counts: {
                DATABASE: sections.DATABASE.length,
                BACKEND: sections.BACKEND.length,
                FRONTEND: sections.FRONTEND.length,
                CONFIG: sections.CONFIG.length
            },
            redactedFiles
        }));
    });
};

main();
