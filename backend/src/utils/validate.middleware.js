const fs = require('fs');
const { z } = require('zod');

const cleanupUploadedFiles = (req) => {
    try {
        if (!req) return;
        const fileList = [];
        if (req.file) {
            fileList.push(req.file);
        }
        if (req.files) {
            if (Array.isArray(req.files)) {
                fileList.push(...req.files);
            } else if (typeof req.files === 'object') {
                Object.values(req.files).forEach((val) => {
                    if (Array.isArray(val)) {
                        fileList.push(...val);
                    } else if (val && typeof val === 'object') {
                        fileList.push(val);
                    }
                });
            }
        }

        fileList.forEach((f) => {
            if (f && f.path) {
                try {
                    if (fs.existsSync(f.path)) {
                        fs.unlinkSync(f.path);
                    }
                } catch (e) {
                    // Ignore unlink error
                }
            }
        });
    } catch (e) {
        // Ignore general cleanup error
    }
};

const validate = (schema) => (req, res, next) => {
    try {
        const parsed = schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        if (parsed.body) req.body = parsed.body;
        if (parsed.query) Object.defineProperty(req, 'query', { value: parsed.query, writable: true, configurable: true });
        if (parsed.params) Object.defineProperty(req, 'params', { value: parsed.params, writable: true, configurable: true });
        next();
    } catch (err) {
        // Cleanup orphaned multipart files on validation rejection
        cleanupUploadedFiles(req);

        if (err instanceof z.ZodError) {
            const issues = err.issues || err.errors || [];
            const formattedErrors = issues.map((e) => ({
                path: e.path.join('.'),
                message: e.message,
            }));
            return res.status(400).json({
                success: false,
                message: 'Validation Error',
                errors: formattedErrors
            });
        }
        next(err);
    }
};

module.exports = validate;
