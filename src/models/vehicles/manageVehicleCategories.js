import db from '../db.js';

// ======== Modules for Admins features only ======== //

const getAllCategories = async () => {
    const query = `
        SELECT *
        FROM categories
        ORDER BY name
    `;

    const result = await db.query(query);
    return result.rows;
};

const getCategoryById = async (categoryId) => {
    const query = `
        SELECT *
        FROM categories
        WHERE category_id = $1
    `;

    const result = await db.query(query, [categoryId]);
    return result.rows[0];
};

const createCategory = async (name) => {
    const query = `
        INSERT INTO categories (name)
        VALUES ($1)
        RETURNING *
    `;

    const result = await db.query(query, [name]);
    return result.rows[0];
};

const updateCategory = async (categoryId, name) => {
    const query = `
        UPDATE categories
        SET name = $2
        WHERE category_id = $1
        RETURNING *
    `;

    const result = await db.query(query, [categoryId, name]);
    return result.rows[0];
};

const deleteCategory = async (categoryId) => {
    const query = `
        DELETE FROM categories
        WHERE category_id = $1
        RETURNING *
    `;

    const result = await db.query(query, [categoryId]);
    return result.rows[0];
};

const countVehiclesByCategory = async (categoryId) => {
    const query = `
        SELECT COUNT(*) AS count
        FROM vehicles_details
        WHERE category_id = $1
    `;

    const result = await db.query(query, [categoryId]);
    return Number(result.rows[0].count);
};

export {  getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    countVehiclesByCategory
};