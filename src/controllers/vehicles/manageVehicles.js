import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { requireRole } from '../../middleware/auth.js';
import {
    updateVehicleInventory,
    deleteVehicle
} from '../../models/vehicles/manageVehicles.js';
import { getAllCategories } from '../../models/vehicles/manageVehicleCategories.js';
import { getVehicleById } from '../../models/vehicles/list.js';

const router = Router();

const showEditVehicleForm = async (req, res) => {
    try {
        const vehicleId = req.params.id;

        const vehicle = await getVehicleById(vehicleId);
        const categories = await getAllCategories();

        if (!vehicle) {
            req.flash('error', 'Vehicle not found.');
            return res.redirect('/vehicles');
        }

        res.render('vehicles/editVehicle', {
            title: 'Edit Vehicle',
            vehicle,
            categories
        });

    } catch (error) {
        console.error('Error loading vehicle edit form:', error);
        req.flash('error', 'Unable to load vehicle edit form.');
        res.redirect('/vehicles');
    }
};

const handleEditVehicleSubmission = async (req, res) => {
    const errors = validationResult(req);
    const vehicleId = req.params.id;

    if (!errors.isEmpty()) {
        errors.array().forEach(error => {
            req.flash('error', error.msg);
        });

        return res.redirect(`/vehicles/${vehicleId}/adminEdit`);
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
            featured
        } = req.body;

        await updateVehicleInventory(
            vehicleId,
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

        req.flash('success', 'Vehicle updated successfully.');
        res.redirect('/vehicles');

    } catch (error) {
        console.error('Error updating vehicle:', error);
        req.flash('error', 'Unable to update vehicle.');
        res.redirect(`/vehicles/${vehicleId}/adminEdit`);
    }
};

const handleDeleteVehicle = async (req, res) => {
    try {
        const vehicleId = req.params.id;

        await deleteVehicle(vehicleId);

        req.flash('success', 'Vehicle deleted successfully.');
        res.redirect('/vehicles');

    } catch (error) {
        console.error('Error deleting vehicle:', error);
        req.flash('error', 'Unable to delete vehicle.');
        res.redirect('/vehicles');
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
        .withMessage('Year must be valid'),

    body('price')
        .isFloat({ min: 0 })
        .withMessage('Price must be a positive number'),

    body('mileage')
        .isInt({ min: 0 })
        .withMessage('Mileage must be a positive number'),

    body('categoryId')
        .notEmpty()
        .withMessage('Category is required'),

    body('description')
        .trim()
        .isLength({ min: 10 })
        .withMessage('Description must be at least 10 characters')
];

router.get(
    '/:id/adminEdit',
    requireRole('admin'),
    showEditVehicleForm
);

router.post(
    '/:id/adminEdit',
    requireRole('admin'),
    vehicleValidation,
    handleEditVehicleSubmission
);

router.post(
    '/:id/delete',
    requireRole('admin'),
    handleDeleteVehicle
);

export default router;