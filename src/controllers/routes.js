import express from 'express';
import { renderHome } from './featuredVehicles/featuredVehicles.js';
import { vehicleListPage, displayVehicleDetails } from './vehicles/vehicles.js';
import contactRoutes from './forms/contactForm.js';


const router = express.Router();

//router to home
router.get('/', renderHome);

router.get('/vehicles', vehicleListPage);
router.get('/vehicles/:vehicleId', displayVehicleDetails);

// Contact form routes
router.use('/contactForm', contactRoutes);




export default router;