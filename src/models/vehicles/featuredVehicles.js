import db from '../db.js';

const getFeaturedVehicles = async () => {
    const result = await db.query(`
        SELECT 
            vehicles_details.*,
            vehicle_images.image_url AS vehicle_image_url
            vehicle_images.alt_text AS vehicle_image_alt
        FROM vehicles_details
        JOIN vehicle_images
            ON vehicles_details.vehicle_id = vehicle_images.vehicle_id
        WHERE vehicles_details.featured = TRUE
        AND vehicles_details.availability = TRUE
        AND vehicle_images.is_primary = TRUE
        LIMIT 3
    `);

    return result.rows;
};

export { getFeaturedVehicles};