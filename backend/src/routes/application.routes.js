const express = require('express');
const { applyForInternship, getInternshipApplications, updateApplicationStatus, getMyApplications } = require('../controllers/application.controller');
const { verifyJWT } = require('../middlewares/auth.middleware');
const { authorizeRoles } = require('../middlewares/role.middleware');
const validate = require('../utils/validate.middleware');
const { applyInternshipSchema, updateApplicationStatusSchema } = require('../validators/application.validator');

const router = express.Router();

router.get('/me', verifyJWT, authorizeRoles('student'), getMyApplications);
router.post('/:internshipId', verifyJWT, authorizeRoles('student'), validate(applyInternshipSchema), applyForInternship);
router.get('/internship/:internshipId', verifyJWT, authorizeRoles('company'), getInternshipApplications);
router.patch('/:id/status', verifyJWT, authorizeRoles('company'), validate(updateApplicationStatusSchema), updateApplicationStatus);

module.exports = router;
