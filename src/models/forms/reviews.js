
import db from '../db.js';

// get the reviews from the user 
const createReview =async (userId, vehicleId, comment) => {
    const query = `
        INSERT INTO reviews (user_id, vehicle_id, comment)
        VALUES ($1, $2, $3)
        RETURNING *
    `;
    const result = await db.query(query, [userId, vehicleId, comment]);
    return result.rows[0];
};

// get reviews by user id
const getReviewsByUserId = async (userId) => {
    const query = `
        SELECT 
            reviews.review_id,
            reviews.user_id,
            reviews.vehicle_id,
            reviews.comment,
            reviews.created_at,
            reviews.updated_at,
            vehicles_details.make,
            vehicles_details.model,
            vehicles_details.year
        FROM reviews
        JOIN vehicles_details
            ON reviews.vehicle_id = vehicles_details.vehicle_id
        WHERE reviews.user_id = $1
        ORDER BY reviews.created_at DESC
    `;

    const result = await db.query(query, [userId]);
    return result.rows;
};

// get one Review by Id
const getReviewById = async (reviewId, userID) => {
    const query = `
        SELECT
            review_id,
            user_id,
            vehicle_id,
            comment,
            created_at,
            updated_at
        FROM reviews
        WHERE review_id = $1
        AND user_id = $2
    `;

    const result = await db.query(query, [reviewId, userID]);
    return result.rows[0];
};

// get reviews edit from the user
const editReview = async (reviewId, comment) => {
    const query = `
        UPDATE reviews
        SET comment = $2,
            updated_at = CURRENT_TIMESTAMP
        WHERE review_id = $1
        RETURNING *
    `;
    const result = await db.query(query, [reviewId, comment]);
    return result.rows[0];
};

// delet reiews from de user
const deleteReview = async (reviewId, userId) => {
    const query = `
        DELETE FROM reviews
        WHERE review_id = $1
        AND user_id = $2
        RETURNING *
    `;
    const result = await db.query(query, [reviewId, userId]);
    return result.rows[0];
};

// retireve reviews to the employees and admin
const getAllReviews = async () => {
    const query = `
        SELECT 
            reviews.review_id,
            reviews.user_id,
            reviews.vehicle_id,
            reviews.comment,
            reviews.created_at,
            users.name AS user_name,
            vehicles_details.make,
            vehicles_details.model
        FROM reviews
        JOIN users
            ON reviews.user_id = users.id
        JOIN vehicles_details
            ON reviews.vehicle_id = vehicles_details.vehicle_id
        ORDER BY reviews.created_at DESC
    `;
    const result = await db.query(query);
    return result.rows;
};

// Delete reviews by moderators
const deleteReviewByAdmin = async (reviewId) => {
    const query = `
        DELETE FROM reviews
        WHERE review_id = $1
        RETURNING *
    `;

    const result = await db.query(query, [reviewId]);
    return result.rows[0];
};

export {
    createReview,
    getReviewById,
    getReviewsByUserId,
    editReview,
    deleteReview,
    getAllReviews,
    deleteReviewByAdmin
};