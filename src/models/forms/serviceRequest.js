import db from '../db.js';

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
//view statues of service request that belong to the user

// employee and admin View and manage service request

// Update service request status (Submitted, In Progress, Completed) employee and admin

// add notes to service requests employee and admin
export { createServiceRequest, getServiceRequestsByUser };