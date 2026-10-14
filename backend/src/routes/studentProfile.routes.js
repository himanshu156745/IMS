const express = require('express');
const { upsertStudentProfile, getMyProfile } = require('../controllers/studentProfile.controller');
const { verifyJWT, authorizeRoles } = require('../middlewares/auth.middleware');
const { upload, validateFileMagicBytes } = require('../middlewares/multer.middleware');
const validate = require('../utils/validate.middleware');
const { upsertStudentProfileSchema } = require('../validators/studentProfile.validator');

const router = express.Router();

// Get logged-in student's profile
router.get('/me', verifyJWT, authorizeRoles('student'), getMyProfile);

// Accept 'resume' and 'avatar' multipart files
router.post(
    '/',
    verifyJWT,
    authorizeRoles('student'),
    upload.fields([
        { name: 'resume', maxCount: 1 },
        { name: 'avatar', maxCount: 1 }
    ]),
    validateFileMagicBytes,
    validate(upsertStudentProfileSchema),
    upsertStudentProfile
);

module.exports = router;