import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { requireRole } from '../../middleware/auth.js';
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
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        errors.array().forEach(error => {
            req.flash('error', error.msg);
        });

        return res.redirect('/vehicles/new');
    }

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

const vehicleValidation = [
    body('make')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Make must be between 2 and 50 characters'),

    body('model')
        .trim()
        .isLength({ min: 1, max: 50 })
        .withMessage('Model must be between 1 and 50 characters'),

    body('year')
        .isInt({ min: 1900, max: 2100 })
        .withMessage('Please enter a valid model year'),

    body('price')
        .isFloat({ min: 0 })
        .withMessage('Price must be a positive number'),

    body('mileage')
        .isInt({ min: 0 })
        .withMessage('Mileage must be a positive whole number'),

    body('categoryId')
        .notEmpty()
        .withMessage('Please select a category'),

    body('transmission')
        .trim()
        .isLength({ min: 2, max: 30 })
        .withMessage('Transmission is required'),

    body('drivetrain')
        .trim()
        .isLength({ min: 2, max: 20 })
        .withMessage('Drivetrain is required'),

    body('fuelType')
        .trim()
        .isLength({ min: 2, max: 20 })
        .withMessage('Fuel type is required'),

    body('engine')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Engine is required'),

    body('horsepower')
        .optional({ checkFalsy: true })
        .isInt({ min: 1 })
        .withMessage('Horsepower must be a positive number'),

    body('exteriorColor')
        .trim()
        .isLength({ min: 2, max: 30 })
        .withMessage('Exterior color is required'),

    body('interiorColor')
        .trim()
        .isLength({ min: 2, max: 30 })
        .withMessage('Interior color is required'),

    body('vin')
        .trim()
        .isLength({ min: 11, max: 20 })
        .withMessage('VIN must be between 11 and 20 characters'),

    body('stockNumber')
        .trim()
        .isLength({ min: 1, max: 20 })
        .withMessage('Stock number is required'),

    body('description')
        .trim()
        .isLength({ min: 20, max: 5000 })
        .withMessage('Description must be between 20 and 5000 characters'),

    body('availability')
        .isIn(['true', 'false'])
        .withMessage('Please select the availability'),

    body('featured')
        .isIn(['true', 'false'])
        .withMessage('Please select whether the vehicle is featured'),

    body('frontImageUrl')
        .trim()
        .isURL()
        .withMessage('Front image must be a valid URL'),

    body('sideImageUrl')
        .trim()
        .isURL()
        .withMessage('Side image must be a valid URL'),

    body('interiorImageUrl')
        .trim()
        .isURL()
        .withMessage('Interior image must be a valid URL')
];

router.get('/new', requireRole('admin'), showAddVehicleForm);

router.post(
    '/new',
    requireRole('admin'),
    vehicleValidation,
    handleAddVehicleSubmission
);

export default router;