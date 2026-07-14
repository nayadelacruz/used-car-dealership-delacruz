import { Router } from 'express';
import { requireRole } from '../../middleware/auth.js';
import { addVehicleValidation } from '../../middleware/validation/vehiclesValidation.js';
import validationErrorHandler from '../../middleware/validation/validationErrorHandler.js';
import {
    createVehicle,
    addVehicleImage
} from '../../models/vehicles/manageVehicles.js';

import { getAllCategories } from '../../models/vehicles/manageVehicleCategories.js';

const router = Router();

const showAddVehicleForm = async (req, res) => {
    try {
        const categories = await getAllCategories();

        res.render('vehicles/addVehicle', {
            title: 'Add Vehicle',
            categories
        });

    } catch (error) {
        console.error('Error loading add vehicle form:', error);
        req.flash('error', 'Unable to load add vehicle form.');
        res.redirect('/vehicles');
    }
};

const handleAddVehicleSubmission = async (req, res) => {
    try {
        const {
            make,
            model,
            year,
            price,
            mileage,
            categoryId,
            transmission,
            drivetrain,
            fuelType,
            engine,
            horsepower,
            exteriorColor,
            interiorColor,
            vin,
            stockNumber,
            description,
            availability,
            featured,

            frontImageUrl,

            sideImageUrl,

            interiorImageUrl,

        } = req.body;

        // Create the vehicle first
        const vehicle = await createVehicle(
            make,
            model,
            year,
            price,
            mileage,
            categoryId,
            transmission,
            drivetrain,
            fuelType,
            engine,
            horsepower || null,
            exteriorColor,
            interiorColor,
            vin,
            stockNumber,
            description,
            availability === 'true',
            featured === 'true'
        );

        await addVehicleImage(
            vehicle.vehicle_id,
            frontImageUrl,
            `${make} ${model} front view`,
            true
        );

        await addVehicleImage(
            vehicle.vehicle_id,
            sideImageUrl,
            `${make} ${model} side view`,
            false
        );

        await addVehicleImage(
            vehicle.vehicle_id,
            interiorImageUrl,
            `${make} ${model} interior`,
            false
        );

        req.flash('success', 'Vehicle added successfully.');
        res.redirect('/vehicles');

    } catch (error) {
        console.error('Error adding vehicle:', error);
        req.flash('error', 'Unable to add vehicle.');
        res.redirect('/vehicles/new');
    }
};

router.get('/new', requireRole('admin'), showAddVehicleForm);

router.post(
    '/new',
    requireRole('admin'),
    addVehicleValidation,
    validationErrorHandler('/vehicles/new'),
    handleAddVehicleSubmission
);

export default router;