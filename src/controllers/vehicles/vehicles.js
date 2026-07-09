import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { requireRole } from '../../middleware/auth.js';
import { getListOfVehicles, 
        getByCategory, 
        getCategories, 
        getVehicleById, 
        getVehicleImages, 
        updateVehicleDetails
     } from "../../models/vehicles/list.js";

const router = Router();

const vehicleListPage = async (req, res, next) => {
    try {

        const categoryId = req.query.category;

        let vehicles;

        if (categoryId) {
            vehicles = await getByCategory(categoryId);
        } else {
            vehicles = await getListOfVehicles();
        }

        const categories = await getCategories();
        
        res.render('vehicles/vehicles', {
            title: 'Vehicle Inventory',
            vehicles,
            categories,
            currentCategory: categoryId || ''
        });

    } catch (error) {
        next(error);
    }
};

const displayVehicleDetails = async (req, res, next) => {

    const vehicleId = req.params.vehicleId;
    const vehicle = await getVehicleById(vehicleId);
    const images = await getVehicleImages(vehicleId)
    res.render('vehicles/vehicleDetails', {
        title: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
        vehicle,
        images
    });
};

// FEATURES FOR EMPLOYEES AND ADMINS 

const showEditVehicleForm = async (req, res) => {
    try {
        const vehicleId = req.params.id;

        const vehicle = await getVehicleById(vehicleId);

        if (!vehicle) {
            req.flash('error', 'Vehicle not found.');
            return res.redirect('/vehicles');
        }

        res.render('forms/vehicles/editVehicle', {
            title: 'Edit Vehicle',
            vehicle
        });

    } catch (error) {
        console.error('Error loading vehicle:', error);
        req.flash('error', 'Unable to load vehicle.');
        res.redirect('/vehicles');
    }
};

const handleEditVehicleSubmission = async (req, res) => {
    try {
        const vehicleId = req.params.id;

        const {
            price,
            description,
            availability
        } = req.body;

        await updateVehicleDetails(
            vehicleId,
            price,
            description,
            availability === 'true'
        );

        req.flash('success', 'Vehicle updated successfully.');
        res.redirect(`/vehicles/${vehicleId}`);

    } catch (error) {
        console.error('Error updating vehicle:', error);
        req.flash('error', 'Unable to update vehicle.');
        res.redirect(`/vehicles/${req.params.id}/edit`);
    }
};

export default router;

export { vehicleListPage, 
        displayVehicleDetails, 
        showEditVehicleForm, 
        handleEditVehicleSubmission,
    };