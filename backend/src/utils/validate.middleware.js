const { z } = require('zod');
const ApiError = require('./ApiError');

const validate = (schema) => (req, res, next) => {
    try {
        const parsed = schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        if (parsed.body) req.body = parsed.body;
        if (parsed.query) req.query = parsed.query;
        if (parsed.params) req.params = parsed.params;
        next();
    } catch (err) {
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
