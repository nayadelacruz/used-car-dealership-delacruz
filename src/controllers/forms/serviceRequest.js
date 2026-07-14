import { Router } from 'express';
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
import {
    serviceRequestValidation,
    serviceRequestIdValidation,
    statusUpdateValidation,
    serviceRequestNoteValidation
} from '../../middleware/validation/serviceRequestValidation.js';

import validationErrorHandler
    from '../../middleware/validation/validationErrorHandler.js';

const router = Router();

const showServiceRequestForm = (req, res) => {
    res.render('forms/serviceRequest/form', {
        title: 'Service Request'
    });
};

const handleServiceRequestSubmission = async (req, res) => {
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

        return res.render('forms/serviceRequest/history', {
            title: 'My Service Requests',
            serviceRequests
        });
    } catch (error) {
        console.error('Error retrieving service requests:', error);
        req.flash('error', 'Unable to retrieve your service requests.');

        return res.redirect('/dashboard');
    }

};

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

const showManageServiceRequest = async (req, res) => {
    try {
        const requestId = req.params.id;

        const serviceRequest = await getServiceRequestById(requestId);
        const statuses = await getAllStatuses();
        const notes = await getServiceRequestNotes(requestId);

        if (!serviceRequest) {
            req.flash('error', 'Service request not found.');
            return res.redirect('/serviceRequest/allHistory');
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
        res.redirect('/serviceRequest/allHistory');
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
        res.redirect('/serviceRequest/allHistory');
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
        return res.redirect(`/serviceRequest/${requestId}/manage`);
    }
};

router.get('/', requireLogin, showServiceRequestForm);

router.post(
    '/',
    requireLogin,
    serviceRequestValidation,
    validationErrorHandler('/serviceRequest'),
    handleServiceRequestSubmission
);
    

router.get('/history', requireLogin, showServiceRequestHistory);

router.get(
    '/allHistory',
    requireRole('employee', 'admin'),
    showAllServiceRequests
);

router.get(
    '/:id/manage',
    requireRole('employee', 'admin'),
    serviceRequestIdValidation,
    validationErrorHandler('/serviceRequest/allHistory'),
    showManageServiceRequest
);

router.post(
    '/:id/status',
    requireRole('employee', 'admin'),
    statusUpdateValidation,
    validationErrorHandler(
        req => `/serviceRequest/${req.params.id}/manage`
    ),
    handleStatusUpdate
);

router.post(
    '/:id/notes',
    requireRole('employee', 'admin'),
    serviceRequestNoteValidation,
    validationErrorHandler(
        req => `/serviceRequest/${req.params.id}/manage`
    ),
    handleAddServiceRequestNote
);

export default router;