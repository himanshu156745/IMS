const express = require('express');
const { verifyJWT, authorizeRoles } = require('../middlewares/auth.middleware');
const {
    getMyProfile,
    updateMyProfile,
    getDashboardStats,
    getMyStudents
} = require('../controllers/faculty.controller');
const validate = require('../utils/validate.middleware');
const { updateFacultyProfileSchema } = require('../validators/faculty.validator');

const router = express.Router();

// All routes require faculty role
router.use(verifyJWT);
router.use(authorizeRoles('faculty'));

router.route('/me')
    .get(getMyProfile)
    .patch(validate(updateFacultyProfileSchema), updateMyProfile);

router.get('/dashboard-stats', getDashboardStats);
router.get('/students', getMyStudents);

module.exports = router;
