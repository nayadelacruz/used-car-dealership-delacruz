import db from '../db.js';

const getFeaturedVehicles = async () => {
    const result = await db.query(`
        SELECT *
        FROM vehicles_details
        WHERE featured = TRUE
        AND availability = TRUE
        LIMIT 3
    `);

    return result.rows;
};