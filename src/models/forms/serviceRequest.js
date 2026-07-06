import db from '../db.js'

//Get service request from the users

const createServiceRequest = async (userId, vehicleMake, vehicleModel, vehicleYear, serviceDescription) => {
    const query = `
        INSERT INTO service_requests (user_id, vehicle_make, vehicle_model, vehicle_year, service_description)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
    `;
    const result = await db.query(query, [
        userId,
        vehicleMake,
        vehicleModel,
        vehicleYear,
        serviceDescription
    ]);

    return result.rows[0];

};

//view histery of service request  that belong to the user
const getServiceRequestsByUser = async (userId) => {
    const query = `
        SELECT 
            service_requests.*,
            service_request_status.status_name
        FROM service_requests
        JOIN service_request_status
            ON service_requests.status_id = service_request_status.id
        WHERE service_requests.user_id = $1
        ORDER BY service_requests.created_at DESC
    `;

    const result = await db.query(query, [userId]);
    return result.rows;
};

const getAllServiceRequests = async () => {
    const query = `
        SELECT
            service_requests.id,
            service_requests.user_id,
            users.name AS user_name,
            users.email AS user_email,
            service_requests.vehicle_make,
            service_requests.vehicle_model,
            service_requests.vehicle_year,
            service_requests.service_description,
            service_request_status.status_name,
            service_requests.created_at,
            service_requests.updated_at
        FROM service_requests
        JOIN users
            ON service_requests.user_id = users.id
        JOIN service_request_status
            ON service_requests.status_id = service_request_status.id
        ORDER BY service_requests.created_at DESC
    `;

    const result = await db.query(query);
    return result.rows;
};

// Update service request status (Submitted, In Progress, Completed) employee and admin
const getServiceRequestById = async (requestId) => {
    const query = `
        SELECT
            service_requests.*,
            service_request_status.status_name,
            users.name AS user_name,
            users.email AS user_email
        FROM service_requests
        JOIN service_request_status
            ON service_requests.status_id = service_request_status.id
        JOIN users
            ON service_requests.user_id = users.id
        WHERE service_requests.id = $1
    `;

    const result = await db.query(query, [requestId]);
    return result.rows[0];
};

const getAllStatuses = async () => {
    const query = `
        SELECT *
        FROM service_request_status
        ORDER BY id
    `;

    const result = await db.query(query);
    return result.rows;
};

const updateServiceRequestStatus = async (requestId, statusId) => {
    const query = `
        UPDATE service_requests
        SET status_id = $2,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
        RETURNING *
    `;

    const result = await db.query(query, [requestId, statusId]);
    return result.rows[0];
};

const addServiceRequestNote = async (requestId, employeeId, note) => {
    const query = `
        INSERT INTO service_request_notes
            (service_request_id, employee_id, note)
        VALUES
            ($1, $2, $3)
        RETURNING *
    `;

    const result = await db.query(query, [requestId, employeeId, note]);
    return result.rows[0];
};

const getServiceRequestNotes = async (requestId) => {
    const query = `
        SELECT
            service_request_notes.*,
            users.name AS employee_name
        FROM service_request_notes
        LEFT JOIN users
            ON service_request_notes.employee_id = users.id
        WHERE service_request_notes.service_request_id = $1
        ORDER BY service_request_notes.created_at DESC
    `;

    const result = await db.query(query, [requestId]);
    return result.rows;
};

// add notes to service requests employee and admin
export {
    createServiceRequest,
    getServiceRequestsByUser,
    getAllServiceRequests,
    getServiceRequestById,
    getAllStatuses,
    updateServiceRequestStatus,
    addServiceRequestNote,
    getServiceRequestNotes
};