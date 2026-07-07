import db from '../db.js';

const getListOfVehicles = async () => {
    const result = await db.query(`
        SELECT 
            vehicles_details.*,
            categories.name AS category_name,
            vehicle_images.image_url AS vehicle_image_url,
            vehicle_images.alt_text AS vehicle_image_alt
        FROM vehicles_details
        JOIN categories
            ON vehicles_details.category_id = categories.category_id
        JOIN vehicle_images
            ON vehicles_details.vehicle_id = vehicle_images.vehicle_id    
        WHERE vehicles_details.availability = TRUE
        AND vehicle_images.is_primary = TRUE
        ORDER BY vehicles_details.year DESC
    `);

    return result.rows;
};

const getByCategory = async (categoryId) => {
    const result = await db.query(`
        SELECT
            vehicles_details.*,
            categories.name AS category_name,
            vehicle_images.image_url AS vehicle_image_url,
            vehicle_images.alt_text AS vehicle_image_alt
        FROM vehicles_details
        JOIN categories
            ON vehicles_details.category_id = categories.category_id
        JOIN vehicle_images
            ON vehicles_details.vehicle_id = vehicle_images.vehicle_id    
        WHERE vehicles_details.availability = TRUE
        AND vehicles_details.category_id =$1
        AND vehicle_images.is_primary = TRUE
        ORDER BY vehicles_details.year DESC
    `,   [categoryId]);
    return result.rows;    
};

const getCategories = async () => {
    const result =await db.query(`
        SELECT *
        FROM categories
        ORDER BY name   
        `);
    return result.rows;    
};

const getVehicleById = async (vehicleId) => {
    const result = await db.query(`
        SELECT
            vehicles_details.*,
            categories.name AS category_name
        FROM vehicles_details
        JOIN categories
            ON vehicles_details.category_id = categories.category_id
        WHERE vehicles_details.vehicle_id = $1
    `, [vehicleId]);

    return result.rows[0];
};

const getVehicleImages = async (vehicleId) => {
    const result = await db.query(`
        SELECT *
        FROM vehicle_images
        WHERE vehicle_id = $1
        ORDER BY is_primary DESC, image_id
    `, [vehicleId]);

    return result.rows;
};

// MODELS FOR EMPLOYEES AND ADMINS FEATURES

const updateVehicleDetails = async (
    vehicleId,
    price,
    description,
    availability
) => {
    const query = `
        UPDATE vehicles_details
        SET
            price = $2,
            description = $3,
            availability = $4
        WHERE vehicle_id = $1
        RETURNING *
    `;

    const result = await db.query(query, [
        vehicleId,
        price,
        description,
        availability
    ]);

    return result.rows[0];
};

export { getListOfVehicles, getByCategory, getCategories, getVehicleById, getVehicleImages, updateVehicleDetails };