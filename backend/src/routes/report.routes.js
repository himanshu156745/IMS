const express = require('express');
const { submitReport, getMyReports, getInternshipReportsForEvaluation, evaluateReport } = require('../controllers/report.controller');
const { verifyJWT } = require('../middlewares/auth.middleware');
const { authorizeRoles } = require('../middlewares/role.middleware');
const validate = require('../utils/validate.middleware');
const { submitReportSchema, evaluateReportSchema } = require('../validators/report.validator');

const router = express.Router();

router.post('/:internshipId', verifyJWT, authorizeRoles('student'), validate(submitReportSchema), submitReport);
router.get('/me/:internshipId', verifyJWT, authorizeRoles('student'), getMyReports);
router.get('/internship/:internshipId', verifyJWT, authorizeRoles('faculty', 'admin'), getInternshipReportsForEvaluation);
router.patch('/:id/evaluate', verifyJWT, authorizeRoles('faculty'), validate(evaluateReportSchema), evaluateReport);

module.exports = router;
