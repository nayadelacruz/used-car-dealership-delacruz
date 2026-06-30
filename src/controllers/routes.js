// Create a new router instance
const router = Router();

import express from 'express';
import { renderHome } from './featuredVehicles/featuredVehicles.js';
import { vehicleListPage, displayVehicleDetails } from './vehicles/vehicles.js';
import contactRoutes from './forms/contactForm.js';
import registrationRoutes from './forms/registration.js';
import loginRoutes from './forms/login.js';
import { processLogout, showDashboard } from './forms/login.js';
import { requireLogin } from '../middleware/auth.js';
import { Router } from 'express';

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

export default router;