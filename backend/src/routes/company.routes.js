const express = require('express');
const { registerCompany, getMyCompany, updateMyCompany, getAllCompanies } = require('../controllers/company.controller');
const { verifyJWT, authorizeRoles } = require('../middlewares/auth.middleware');
const validate = require('../utils/validate.middleware');
const { registerCompanySchema, updateCompanySchema } = require('../validators/company.validator');

const router = express.Router();

router.get('/', getAllCompanies);
router.post('/', verifyJWT, authorizeRoles('company'), validate(registerCompanySchema), registerCompany);
router.get('/me', verifyJWT, authorizeRoles('company'), getMyCompany);
router.patch('/me', verifyJWT, authorizeRoles('company'), validate(updateCompanySchema), updateMyCompany);

module.exports = router;
