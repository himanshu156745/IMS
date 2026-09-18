// validator 
import { z } from "zod";

/* =========================================================
   AUTH
========================================================= */

// Signup
export const validateSignup = z.object({
    name: z.string().trim().min(3, "Name must be at least 3 characters").max(35, "Name cannot exceed 35 characters"),
    email: z.string().trim().toLowerCase().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters").max(15, "Password cannot exceed 15 characters"),
    phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid phone number"),
    role: z.enum(["student", "company", "faculty",]),
})


// Login
export const validateLogin = z.object({
    email: z.string().trim().toLowerCase().email("Invalid email address"),
    password: z.string().min(8, "Password is required"),
});


// Change Password
export const validateChangePassword = z.object({
    currentPassword: z.string().min(8, "Current password is required"),
    newPassword: z.string().min(8, "New password must be at least 8 characters").max(15, "New password cannot exceed 15 characters"),
})



/* =========================================================
   STUDENT
========================================================= */

// Student Profile
export const validateStudentProfile = z.object({
    name: z.string().trim().min(3, "Name must be at least 3 characters").max(25).optional(),
    phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid phone number").optional(),
    branch: z.string().trim().max(40).optional(),
    year: z.enum(["1st", "2nd", "3rd", "4th"]).optional(),
    batch: z.string().trim().max(20).optional(),
    skills: z.array(z.string().trim().max(100)).optional(),
    resume: z.string().url("Invalid resume URL").optional(),
});


// Apply Internship
export const validateApplication = z.object({
    internshipId: z.string().min(3, "Internship ID is required"),
    resume: z.string().url("Invalid resume URL").optional(),
    coverLetter: z.string().trim().max(2000, "Cover letter cannot exceed 2000 characters").optional(),
});


// Daily Report
export const validateDailyReport = z.object({
    date: z.string().min(2, "Date is required"),
    workDescription: z.string().trim().min(10, "Work description must be at least 10 characters").max(2000),
    tasks: z.string().trim().max(2000).optional(),
    hours: z.number().min(0).max(24),
    learnings: z.string().trim().max(2000).optional(),
});


/* =========================================================
   COMPANY
========================================================= */

// Company Profile
export const validateCompanyProfile = z.object({
    companyName: z.string().trim().min(2).max(100).optional(),
    email: z.string().trim().toLowerCase().email("Invalid email address").optional(),
    phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid phone number").optional(),
    website: z.string().url("Invalid website URL").optional(),
    description: z.string().trim().max(2000).optional(),
    location: z.string().trim().max(200).optional(),
    industry: z.string().trim().max(100).optional(),
});


// Create Internship
export const validateCreateInternship = z.object({
    title: z.string().trim().min(3).max(150),
    description: z.string().trim().min(20).max(5000),
    skills: z.array(z.string().trim().max(50)).min(1),
    duration: z.string().trim().min(1),
    location: z.string().trim().max(200),
    stipend: z.number().min(0),
    deadline: z.string().min(1, "Deadline is required"),
    eligibility: z.string().trim().max(2000).optional(),
});


// Update Internship
export const validateUpdateInternship = z.object({
    title: z.string().trim().min(3).max(150).optional(),
    description: z.string().trim().min(20).max(5000).optional(),
    skills: z.array(z.string().trim().max(50)).min(1).optional(),
    duration: z.string().trim().optional(),
    location: z.string().trim().max(200).optional(),
    stipend: z.number().min(0).optional(),
    deadline: z.string().optional(),
    eligibility: z.string().trim().max(2000).optional(),
});


// Application Status
export const validateApplicationStatus = z.object({
    status: z.enum(["applied", "shortlisted", "rejected", "selected"]),
});


/* =========================================================
   FACULTY
========================================================= */

// Attendance
export const validateAttendance = z.object({
    studentId: z.string().min(3, "Student ID is required"),
    date: z.string().min(2, "Date is required"),
    status: z.enum(["present", "absent", "leave"]),
    checkIn: z.string().optional(),
    checkOut: z.string().optional(),
});


/* =========================================================
   ADMIN
========================================================= */

// Create User
export const validateCreateUser = z.object({
    name: z.string().trim().min(3).max(50),
    email: z.string().trim().toLowerCase().email("Invalid email address"),
    password: z.string().min(8).max(15),
    phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid phone number"),
    role: z.enum(["student", "company", "faculty"]),
});


// Update User
export const validateUpdateUser = z.object({
    name: z.string().trim().min(3).max(30).optional(),
    email: z.string().trim().toLowerCase().email("Invalid email address").optional(),
    phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid phone number").optional(),
    role: z.enum(["student", "company", "faculty"]).optional(),
    status: z.enum(["active", "inactive", "blocked"]).optional(),
});


/* =========================================================
   LANDING PAGE
========================================================= */

// Contact Form
export const validateContactForm = z.object({
    name: z.string().trim().min(3).max(30),
    email: z.string().trim().toLowerCase().email("Invalid email address"),
    subject: z.string().trim().min(3).max(150),
    message: z.string().trim().min(10).max(2000),
});