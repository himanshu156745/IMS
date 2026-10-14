const express = require('express');
const { verifyJWT, authorizeRoles, requireVerifiedEmail } = require('../middlewares/auth.middleware');
const { USER_ROLES } = require('../constants/roles');
const {
    scheduleInterview,
    getMyInterviews,
    updateInterview,
    cancelInterview
} = require('../controllers/interview.controller');

const validate = require('../utils/validate.middleware');
const { scheduleInterviewSchema, updateInterviewSchema } = require('../validators/interview.validator');

const router = express.Router();

router.use(verifyJWT, requireVerifiedEmail);

router.get('/me', getMyInterviews);
router.post('/', authorizeRoles(USER_ROLES.COMPANY), validate(scheduleInterviewSchema), scheduleInterview);
router.patch('/:id', authorizeRoles(USER_ROLES.COMPANY), validate(updateInterviewSchema), updateInterview);
router.delete('/:id', authorizeRoles(USER_ROLES.COMPANY), cancelInterview);

module.exports = router;

