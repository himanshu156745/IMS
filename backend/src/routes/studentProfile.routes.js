const express = require('express');
const { upsertStudentProfile, getMyProfile } = require('../controllers/studentProfile.controller');
const { verifyJWT } = require('../middlewares/auth.middleware');
const { authorizeRoles } = require('../middlewares/role.middleware');
const { upload } = require('../middlewares/multer.middleware');
const validate = require('../utils/validate.middleware');
const { upsertStudentProfileSchema } = require('../validators/studentProfile.validator');

const router = express.Router();

router.get('/me', verifyJWT, authorizeRoles('student'), getMyProfile);

// Accept 'resume' and 'avatar' files
router.post(
    '/', 
    verifyJWT, 
    authorizeRoles('student'), 
    upload.fields([
        { name: 'resume', maxCount: 1 }, 
        { name: 'avatar', maxCount: 1 }
    ]), 
    validate(upsertStudentProfileSchema),
    upsertStudentProfile
);

module.exports = router;
