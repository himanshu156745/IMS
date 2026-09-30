const express = require('express');
const { markAttendance, getMyAttendance, getInternshipAttendance, updateMyAttendance, overrideAttendance } = require('../controllers/attendance.controller');
const { verifyJWT } = require('../middlewares/auth.middleware');
const { authorizeRoles } = require('../middlewares/role.middleware');
const validate = require('../utils/validate.middleware');
const { markAttendanceSchema } = require('../validators/attendance.validator');

const router = express.Router();

router.post('/:internshipId', verifyJWT, authorizeRoles('student'), validate(markAttendanceSchema), markAttendance);
router.get('/me/:internshipId', verifyJWT, authorizeRoles('student'), getMyAttendance);
router.patch('/:id', verifyJWT, authorizeRoles('student'), updateMyAttendance);

router.get('/internship/:internshipId', verifyJWT, authorizeRoles('faculty', 'admin', 'company'), getInternshipAttendance);
router.patch('/:internshipId/override', verifyJWT, authorizeRoles('faculty', 'admin', 'company'), overrideAttendance);

module.exports = router;
