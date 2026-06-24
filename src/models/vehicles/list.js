import db from '../db.js';

const getListOfVehicles = async () => {
    const result = await db.query(`
        SELECT 
            vehicles_details.*,
            categories.name AS category_name
        FROM vehicles_details
        JOIN categories
            ON vehicles_details.category_id = categories.category_id
        WHERE vehicles_details.availability = TRUE
        ORDER BY vehicles_details.year DESC
    `);

    return result.rows;
};

const getByCategory = async (categoryId) => {
    const result = await db.query(`
        SELECT
            vehicles_details.*,
            categories.name AS category_name
        FROM vehicles_details
        JOIN categories
            ON vehicles_details.category_id = categories.category_id
        WHERE vehicles_details.availability = TRUE
        AND vehicles_details.category_id =$1
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

const getVehicleById= async (vehicleId) => {
    const result =await db.query(`
        SELECT 
            vehicles_details.*,
            categories.name AS category_name
        FROM vehicles_details
        JOIN categories
            ON vehicles_details.category_id = categories.category_id
        WHERE vehicle_details.vehicle_id = $1
        `, [vehicleId]);

    return result.rows[0];    
}

export { getListOfVehicles, getByCategory, getCategories, getVehicleById };