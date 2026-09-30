const { USER_ROLES } = require('../constants/roles');
const express = require('express');
const router = express.Router();
const { verifyJWT, authorizeRoles, requireVerifiedEmail } = require('../middlewares/auth.middleware');
const { issueCertificate, getMyCertificates, verifyCertificate, revokeCertificate } = require('../controllers/certificate.controller');
const validate = require('../utils/validate.middleware');
const { issueCertificateSchema, verifyCertificateSchema } = require('../validators/certificate.validator');

// Public route for verification
router.get('/verify/:certificateId', validate(verifyCertificateSchema), verifyCertificate);

// Protected routes
router.use(verifyJWT, requireVerifiedEmail);

// Student routes
router.get('/me', authorizeRoles(USER_ROLES.STUDENT), getMyCertificates);

// Admin/Faculty/Company routes
router.post('/:internshipId/issue', authorizeRoles(USER_ROLES.ADMIN, USER_ROLES.FACULTY, USER_ROLES.COMPANY), validate(issueCertificateSchema), issueCertificate);


// Revoke certificate
router.post('/:id/revoke', authorizeRoles(USER_ROLES.ADMIN, USER_ROLES.FACULTY, USER_ROLES.COMPANY), revokeCertificate);

module.exports = router;

