const express = require('express');
const { verifyInvite, acceptInvite } = require('../controllers/invite.controller');
const router = express.Router();
router.get('/:token', verifyInvite);
router.post('/:token/accept', acceptInvite);
module.exports = router;
