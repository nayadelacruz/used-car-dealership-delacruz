import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { requireLogin, requireRole } from '../../middleware/auth.js';
import {
    createServiceRequest,
    getServiceRequestsByUser,
    getAllServiceRequests,
    getServiceRequestById,
    getAllStatuses,
    updateServiceRequestStatus,
    addServiceRequestNote,
    getServiceRequestNotes
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

/**
 * Display all service requests.
 * Employees and admins only.
 */
const showAllServiceRequests = async (req, res) => {
    try {

        const serviceRequests = await getAllServiceRequests();

        res.render('forms/serviceRequest/allServiceRequests', {
            title: 'Service Requests',
            serviceRequests
        });

    } catch (error) {
        console.error('Error retrieving service requests:', error);

        req.flash('error', 'Unable to retrieve service requests.');
        res.redirect('/dashboard');
    }
};

router.get(
    '/allHistory',
    requireRole('employee', 'admin'),
    showAllServiceRequests
);

const showManageServiceRequest = async (req, res) => {
    try {
        const requestId = req.params.id;

        const serviceRequest = await getServiceRequestById(requestId);
        const statuses = await getAllStatuses();
        const notes = await getServiceRequestNotes(requestId);

        if (!serviceRequest) {
            req.flash('error', 'Service request not found.');
            return res.redirect('/serviceRequest/list');
        }

        res.render('forms/serviceRequest/manage', {
            title: 'Manage Service Request',
            serviceRequest,
            statuses,
            notes
        });

    } catch (error) {
        console.error('Error loading service request:', error);
        req.flash('error', 'Unable to load service request.');
        res.redirect('/serviceRequest/list');
    }
};

const handleStatusUpdate = async (req, res) => {
    try {
        const requestId = req.params.id;
        const { statusId } = req.body;

        await updateServiceRequestStatus(requestId, statusId);

        req.flash('success', 'Service request status updated.');
        res.redirect(`/serviceRequest/${requestId}/manage`);

    } catch (error) {
        console.error('Error updating service request status:', error);
        req.flash('error', 'Unable to update status.');
        res.redirect('/serviceRequest/list');
    }
};

const handleAddServiceRequestNote = async (req, res) => {
    try {
        const requestId = req.params.id;
        const employeeId = req.session.user.id;
        const { note } = req.body;

        await addServiceRequestNote(requestId, employeeId, note);

        req.flash('success', 'Note added successfully.');
        res.redirect(`/serviceRequest/${requestId}/manage`);

    } catch (error) {
        console.error('Error adding service request note:', error);
        req.flash('error', 'Unable to add note.');
        res.redirect('/serviceRequest/list');
    }
};

router.get(
    '/:id/manage',
    requireRole('employee', 'admin'),
    showManageServiceRequest
);

router.post(
    '/:id/status',
    requireRole('employee', 'admin'),
    handleStatusUpdate
);

router.post(
    '/:id/notes',
    requireRole('employee', 'admin'),
    handleAddServiceRequestNote
);

export default router;