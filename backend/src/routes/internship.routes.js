const express = require('express');
const { createInternship, getAllInternships, getMyInternships, getInternshipById, updateInternship, deleteInternship } = require('../controllers/internship.controller');
const { verifyJWT, authorizeRoles } = require('../middlewares/auth.middleware');
const validate = require('../utils/validate.middleware');
const { createInternshipSchema, updateInternshipSchema } = require('../validators/internship.validator');

const router = express.Router();

router.get('/', getAllInternships);
router.get('/me', verifyJWT, authorizeRoles('company'), getMyInternships);
router.get('/:id', getInternshipById);
router.post('/', verifyJWT, authorizeRoles('company'), validate(createInternshipSchema), createInternship);
router.patch('/:id', verifyJWT, authorizeRoles('company', 'admin'), validate(updateInternshipSchema), updateInternship);
router.delete('/:id', verifyJWT, authorizeRoles('company', 'admin'), deleteInternship);

module.exports = router;

