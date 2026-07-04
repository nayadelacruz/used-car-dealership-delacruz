import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { requireLogin } from '../../middleware/auth.js';
import {
    createServiceRequest,
    getServiceRequestsByUser
} from '../../models/forms/serviceRequest.js';

const router = Router();

const showServiceRequestForm = (req, res) => {
    res.render('forms/serviceRequest/form', {
        title: 'Service Request'
    });
};

const handleServiceRequestSubmission = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        errors.array().forEach(error => {
            req.flash('error', error.msg);
        });
        return res.redirect('/serviceRequest');
    }

    try {
        const userId = req.session.user.id;

        const {
            vehicleMake,
            vehicleModel,
            vehicleYear,
            serviceDescription
        } = req.body;

        await createServiceRequest(
            userId,
            vehicleMake,
            vehicleModel,
            vehicleYear,
            serviceDescription
        );

        req.flash('success', 'Service request submitted successfully.');
        res.redirect('/serviceRequest/history');

    } catch (error) {
        console.error('Error saving service request:', error);
        req.flash('error', 'Unable to submit your service request.');
        res.redirect('/serviceRequest');
    }
};

const showServiceRequestHistory = async (req, res) => {
    let serviceRequests = [];

    try {
        const userId = req.session.user.id;
        serviceRequests = await getServiceRequestsByUser(userId);
    } catch (error) {
        console.error('Error retrieving service requests:', error);
    }

    res.render('forms/serviceRequest/history', {
        title: 'My Service Requests',
        serviceRequests
    });
};

router.get('/', requireLogin, showServiceRequestForm);

router.post(
    '/',
    requireLogin,
    [
        body('vehicleMake')
            .trim()
            .isLength({ min: 2, max: 50 })
            .withMessage('Vehicle make must be between 2 and 50 characters'),

        body('vehicleModel')
            .trim()
            .isLength({ min: 1, max: 50 })
            .withMessage('Vehicle model must be between 1 and 50 characters'),

        body('vehicleYear')
            .trim()
            .isLength({ min: 4, max: 4 })
            .withMessage('Vehicle year must be 4 digits'),

        body('serviceDescription')
            .trim()
            .isLength({ min: 10, max: 2000 })
            .withMessage('Service description must be between 10 and 2000 characters')
    ],
    handleServiceRequestSubmission
);

router.get('/history', requireLogin, showServiceRequestHistory);

export default router;