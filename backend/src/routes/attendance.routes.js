const express = require('express');
const { markAttendance, getMyAttendance, getInternshipAttendance } = require('../controllers/attendance.controller');
const { verifyJWT } = require('../middlewares/auth.middleware');
const { authorizeRoles } = require('../middlewares/role.middleware');
const validate = require('../utils/validate.middleware');
const { markAttendanceSchema } = require('../validators/attendance.validator');

const router = express.Router();

router.post('/:internshipId', verifyJWT, authorizeRoles('student'), validate(markAttendanceSchema), markAttendance);
router.get('/me/:internshipId', verifyJWT, authorizeRoles('student'), getMyAttendance);
router.get('/internship/:internshipId', verifyJWT, authorizeRoles('faculty', 'admin', 'company'), getInternshipAttendance);

module.exports = router;
