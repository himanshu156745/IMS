const express = require('express');
const { 
    getDashboardStats, 
    getAllUsers, 
    getAllApplications,
    getAllInternships,
    getAllFaculty,
    toggleUserStatus, 
    getAllCompanies, 
    updateCompanyVerification, 
    deleteCompany, 
    createCompany, 
    updateCompany 
} = require('../controllers/admin.controller');
const { verifyJWT, authorizeRoles } = require('../middlewares/auth.middleware');
const validate = require('../utils/validate.middleware');
const { deleteApplication } = require('../controllers/application.controller');
const { toggleUserStatusSchema, updateCompanyVerificationSchema, createCompanySchema, updateCompanySchema } = require('../validators/admin.validator');

const router = express.Router();

router.use(verifyJWT, authorizeRoles('admin')); // Apply to all admin routes

router.get('/stats', getDashboardStats);
router.get('/users', getAllUsers);
router.get('/applications', getAllApplications);
router.delete('/applications/:id', deleteApplication);
router.get('/internships', getAllInternships);
router.get('/faculty', getAllFaculty);
router.patch('/users/:id/status', validate(toggleUserStatusSchema), toggleUserStatus);

router.get('/companies', getAllCompanies);
router.post('/companies', validate(createCompanySchema), createCompany);
router.put('/companies/:id', validate(updateCompanySchema), updateCompany);
router.patch('/companies/:id/verification', validate(updateCompanyVerificationSchema), updateCompanyVerification);
router.delete('/companies/:id', deleteCompany);

module.exports = router;
