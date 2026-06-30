import express from 'express';
import { renderHome } from './featuredVehicles/featuredVehicles.js';
import { vehicleListPage, displayVehicleDetails } from './vehicles/vehicles.js';
import contactRoutes from './forms/contactForm.js';
import registrationRoutes from './forms/registration.js';


const router = express.Router();

router.use('/contactForm', (req, res, next) => {
    res.addStyle('<link rel="stylesheet" href="/css/contactForm.css">');
    next();
});

// Add registration-specific styles to all registration routes
router.use('/register', (req, res, next) => {
    res.addStyle('<link rel="stylesheet" href="/css/registration.css">');
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

export default router;