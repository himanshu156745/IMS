const express = require('express');
const { registerCompany, getMyCompany, getAllCompanies } = require('../controllers/company.controller');
const { verifyJWT } = require('../middlewares/auth.middleware');
const { authorizeRoles } = require('../middlewares/role.middleware');
const validate = require('../utils/validate.middleware');
const { registerCompanySchema } = require('../validators/company.validator');

const router = express.Router();

router.get('/', getAllCompanies);
router.post('/', verifyJWT, authorizeRoles('company'), validate(registerCompanySchema), registerCompany);
router.get('/me', verifyJWT, authorizeRoles('company'), getMyCompany);

module.exports = router;
