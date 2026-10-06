const express = require('express');
const router = express.Router();
const { verifyJWT, authorizeRoles } = require('../middlewares/auth.middleware');
const { issueCertificate, getMyCertificates, verifyCertificate } = require('../controllers/certificate.controller');
const validate = require('../utils/validate.middleware');
const { issueCertificateSchema, verifyCertificateSchema } = require('../validators/certificate.validator');

// Public route for verification
router.get('/verify/:certificateId', validate(verifyCertificateSchema), verifyCertificate);

// Protected routes
router.use(verifyJWT);

// Student routes
router.get('/me', authorizeRoles('student'), getMyCertificates);

// Admin/Faculty/Company routes
router.post('/:internshipId/issue', authorizeRoles('admin', 'faculty', 'company'), validate(issueCertificateSchema), issueCertificate);

module.exports = router;
