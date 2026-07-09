import db from '../db.js';

const createVehicle = async (
    make,
    model,
    year,
    price,
    mileage,
    categoryId,
    transmission,
    drivetrain,
    fuelType,
    engine,
    horsepower,
    exteriorColor,
    interiorColor,
    vin,
    stockNumber,
    description,
    availability,
    featured
) => {
    const query = `
        INSERT INTO vehicles_details (
            make, model, year, price, mileage, category_id,
            transmission, drivetrain, fuel_type, engine, horsepower,
            exterior_color, interior_color, vin, stock_number,
            description, availability, featured
        )
        VALUES (
            $1, $2, $3, $4, $5, $6,
            $7, $8, $9, $10, $11,
            $12, $13, $14, $15,
            $16, $17, $18
        )
        RETURNING *
    `;

    const result = await db.query(query, [
        make,
        model,
        year,
        price,
        mileage,
        categoryId,
        transmission,
        drivetrain,
        fuelType,
        engine,
        horsepower,
        exteriorColor,
        interiorColor,
        vin,
        stockNumber,
        description,
        availability,
        featured
    ]);

    return result.rows[0];
};

const updateVehicleInventory = async (
    vehicleId,
    make,
    model,
    year,
    price,
    mileage,
    categoryId,
    transmission,
    drivetrain,
    fuelType,
    engine,
    horsepower,
    exteriorColor,
    interiorColor,
    vin,
    stockNumber,
    description,
    availability,
    featured
) => {
    const query = `
        UPDATE vehicles_details
        SET
            make = $2,
            model = $3,
            year = $4,
            price = $5,
            mileage = $6,
            category_id = $7,
            transmission = $8,
            drivetrain = $9,
            fuel_type = $10,
            engine = $11,
            horsepower = $12,
            exterior_color = $13,
            interior_color = $14,
            vin = $15,
            stock_number = $16,
            description = $17,
            availability = $18,
            featured = $19
        WHERE vehicle_id = $1
        RETURNING *
    `;

    const result = await db.query(query, [
        vehicleId,
        make,
        model,
        year,
        price,
        mileage,
        categoryId,
        transmission,
        drivetrain,
        fuelType,
        engine,
        horsepower,
        exteriorColor,
        interiorColor,
        vin,
        stockNumber,
        description,
        availability,
        featured
    ]);

    return result.rows[0];
};

const addVehicleImage = async (vehicleId, imageUrl, altText, isPrimary = false) => {
    const query = `
        INSERT INTO vehicle_images (
            vehicle_id, image_url, alt_text, is_primary
        )
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `;

    const result = await db.query(query, [
        vehicleId,
        imageUrl,
        altText,
        isPrimary
    ]);

    return result.rows[0];
};

const deleteVehicleImages = async (vehicleId) => {
    const query = `
        DELETE FROM vehicle_images
        WHERE vehicle_id = $1
        RETURNING *
    `;

    const result = await db.query(query, [vehicleId]);
    return result.rows;
};

const deleteVehicle = async (vehicleId) => {
    await deleteVehicleImages(vehicleId);

    const query = `
        DELETE FROM vehicles_details
        WHERE vehicle_id = $1
        RETURNING *
    `;

    const result = await db.query(query, [vehicleId]);
    return result.rows[0];
};

export {
    createVehicle,
    updateVehicleInventory,
    addVehicleImage,
    deleteVehicleImages,
    deleteVehicle
};