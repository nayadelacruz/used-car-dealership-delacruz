import express from 'express';
import { renderHome } from './featuredVehicles/featuredVehicles.js';
import { vehicleListPage, displayVehicleDetails } from './vehicles/vehicles.js';
import contactRoutes from './forms/contactForm.js';
import registrationRoutes from './forms/registration.js';
import loginRoutes from './forms/login.js';
import { processLogout, showDashboard } from './forms/login.js';
import { requireLogin, requireRole } from '../middleware/auth.js';
import { Router } from 'express';
import { body } from 'express-validator';
import { reviewValidation, showReviewForm, handleReviewSubmission, showUserReviews,
        showEditReviewForm, handleReviewEdit, handleDeleteReview, showAllReviews,
        handleAdminDeleteReview
        } from './forms/reviews.js';
import serviceRequestRoutes from './forms/serviceRequest.js';        
import { editReview } from '../models/forms/reviews.js';

const router = Router();

router.use('/vehicles', (req, res, next) => {
    res.addStyle('<link rel="stylesheet" href="/css/vehicles.css">');
    next();
});
router.use('/contactForm', (req, res, next) => {
    res.addStyle('<link rel="stylesheet" href="/css/contactForm.css">');
    next();
});

// Add registration-specific styles to all registration routes
router.use('/register', (req, res, next) => {
    res.addStyle('<link rel="stylesheet" href="/css/registration.css">');
    next();
});

// Add login-specific styles to all login routes
router.use('/login', (req, res, next) => {
    res.addStyle('<link rel="stylesheet" href="/css/login.css">');
    next();
});
// Add login-specific styles to all reviews routes
router.use('/reviews', (req, res, next) => {
    res.addStyle('<link rel="stylesheet" href="/css/reviews.css">');
    next();
});

// Add specific styles to al service requests routes
router.use('/serviceRequest', (req, res, next) => {
    res.addStyle('<link rel="stylesheet" href="/css/serviceRequest.css">');
    next();
});

//Add specific styles to dashboard
router.use('/dashboard', (req, res, next) => {
    res.addStyle('<link rel="stylesheet" href="/css/dashboard.css">');
    next();
});

//router to home
router.get('/', renderHome);

router.get('/vehicles', vehicleListPage);
router.get('/vehicles/:vehicleId', displayVehicleDetails);

// Contact form routes
router.use('/contactForm', contactRoutes);

// Registration routes
router.use('/register', registrationRoutes);

// Login routes (form and submission)
router.use('/login', loginRoutes);

// Authentication-related routes at root level
router.get('/logout', processLogout);
router.get('/dashboard', requireLogin, showDashboard);

//Reviews routs
router.get('/reviews/new/:vehicleId', requireLogin, showReviewForm);
router.post(
    '/reviews',
    requireLogin,
    reviewValidation,
    handleReviewSubmission
);
router.get('/reviews/myReviews', requireLogin, showUserReviews);
router.get('/reviews/edit/:reviewId', requireLogin, showEditReviewForm);
router.post(
    '/reviews/edit/:reviewId',
    requireLogin,
    reviewValidation,
    handleReviewEdit
);
router.post('/reviews/delete/:reviewId', requireLogin, handleDeleteReview);
router.get('/reviews/all', requireRole('employee', 'admin'), showAllReviews);
router.post('/reviews/admin-delete/:reviewId', requireRole('admin'), handleAdminDeleteReview);
router.post(
    '/reviews/admin-delete/:reviewId',
    requireRole('employee', 'admin'),
    handleAdminDeleteReview
);

// routes for Service Request
router.use('/serviceRequest', serviceRequestRoutes);

export default router;