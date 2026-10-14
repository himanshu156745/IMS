const express = require('express');
const { verifyInvite, acceptInvite } = require('../controllers/invite.controller');
const { authIpLimiter } = require('../middlewares/rateLimit.middleware');
const validate = require('../utils/validate.middleware');
const { verifyInviteSchema, acceptInviteSchema } = require('../validators/invite.validator');

const router = express.Router();

router.use(authIpLimiter);

router.get('/:token', validate(verifyInviteSchema), verifyInvite);
router.post('/:token/accept', validate(acceptInviteSchema), acceptInvite);

module.exports = router;

