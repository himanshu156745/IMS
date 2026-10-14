const express = require('express');
const { 
    applyForInternship, 
    getInternshipApplications, 
    getAllCompanyApplications, 
    updateApplicationStatus, 
    deleteApplication,
    getMyApplications 
} = require('../controllers/application.controller');
const { verifyJWT, authorizeRoles } = require('../middlewares/auth.middleware');
const validate = require('../utils/validate.middleware');
const { applyInternshipSchema, updateApplicationStatusSchema } = require('../validators/application.validator');

const router = express.Router();

router.get('/me', verifyJWT, authorizeRoles('student'), getMyApplications);
router.get('/company', verifyJWT, authorizeRoles('company'), getAllCompanyApplications);
router.post('/:internshipId', verifyJWT, authorizeRoles('student'), validate(applyInternshipSchema), applyForInternship);
router.get('/internship/:internshipId', verifyJWT, authorizeRoles('company'), getInternshipApplications);
router.patch('/:id/status', verifyJWT, authorizeRoles('company', 'admin'), validate(updateApplicationStatusSchema), updateApplicationStatus);
router.delete('/:id', verifyJWT, authorizeRoles('company', 'admin', 'student'), deleteApplication);

module.exports = router;
