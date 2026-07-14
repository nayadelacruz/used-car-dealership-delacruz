import { Router } from 'express';
import { requireRole } from '../../middleware/auth.js';
import { editVehicleValidation } from '../../middleware/validation/vehiclesValidation.js';
import validationErrorHandler from '../../middleware/validation/validationErrorHandler.js';
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
    const vehicleId = req.params.id;

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

router.get(
    '/:id/adminEdit',
    requireRole('admin'),
    showEditVehicleForm
);

router.post(
    '/:id/adminEdit',
    requireRole('admin'),
    editVehicleValidation,
    validationErrorHandler(req => `/vehicles/${req.params.id}/adminEdit`),
    handleEditVehicleSubmission
);

router.post(
    '/:id/delete',
    requireRole('admin'),
    handleDeleteVehicle
);

export default router;