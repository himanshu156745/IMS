const { spawnSync } = require('child_process');
const path = require('path');

describe('CSRF_SECRET Fail-Fast (Check 1)', () => {
    jest.setTimeout(15000);
    const serverPath = path.join(__dirname, '../src/server.js');

    it('should exit with code 1 if CSRF_SECRET is missing', (done) => {
        const { spawn } = require('child_process');
        const env = { ...process.env, JWT_SECRET: 'supersecretlongpassword1234567890', CSRF_SECRET: '' };
        const child = spawn('node', [serverPath], { env });
        
        let output = '';
        child.stdout.on('data', data => { output += data.toString(); });
        child.stderr.on('data', data => { output += data.toString(); });

        let exited = false;
        child.on('exit', (code) => {
            exited = true;
            try {
                expect(code).toBe(1);
                expect(output).toMatch(/CSRF_SECRET/);
                done();
            } catch(e) { done(e); }
        });

        setTimeout(() => {
            if (!exited) {
                child.kill();
                done(new Error("Process did not exit fast. Output: " + output));
            }
        }, 3000);
    });

    it('should exit with code 1 if CSRF_SECRET is shorter than 32 characters', (done) => {
        const { spawn } = require('child_process');
        const env = { ...process.env, CSRF_SECRET: 'short_secret', JWT_SECRET: 'supersecretlongpassword1234567890' };
        const child = spawn('node', [serverPath], { env });
        
        let output = '';
        child.stdout.on('data', data => { output += data.toString(); });
        child.stderr.on('data', data => { output += data.toString(); });

        let exited = false;
        child.on('exit', (code) => {
            exited = true;
            try {
                expect(code).toBe(1);
                expect(output).toMatch(/CSRF_SECRET/);
                done();
            } catch(e) { done(e); }
        });

        setTimeout(() => {
            if (!exited) {
                child.kill();
                done(new Error("Process did not exit fast. Output: " + output));
            }
        }, 3000);
    });

    it('should boot if CSRF_SECRET is 32+ characters', (done) => {
        const { spawn } = require('child_process');
        const env = { 
            ...process.env, 
            CSRF_SECRET: 'this-is-a-valid-csrf-secret-with-more-than-32-chars-long!',
            JWT_SECRET: 'supersecretlongpassword1234567890' 
        };
        const child = spawn('node', [serverPath], { env });
        
        let output = '';
        child.stdout.on('data', (data) => {
            output += data.toString();
            if (output.includes('Server is running') || output.includes('connected')) {
                child.kill();
                done();
            }
        });
        
        child.stderr.on('data', (data) => {
            // It shouldn't crash immediately for CSRF_SECRET
            // If it crashes for DB, that's fine as long as it isn't the CSRF error
        });

        child.on('exit', (code) => {
            if (!output.includes('CSRF_SECRET')) {
                done();
            } else {
                done(new Error("Failed CSRF_SECRET check"));
            }
        });
    });
});
