import { getListOfVehicles, getByCategory, getCategories, getVehicleById } from "../../models/vehicles/list.js";

const vehicleListPage = async (req, res, next) => {
    try {

        const categoryId = req.query.category;

        let vehicles;

        if (categoryId) {
            vehicles = await getByCategory(categoryId);
        } else {
            vehicles = await getListOfVehicles();
        }

        const categories = await getCategories();

        res.render('vehicles/vehicles', {
            title: 'Vehicle Inventory',
            vehicles,
            categories,
            currentCategory: categoryId || ''
        });

    } catch (error) {
        next(error);
    }
};

const displayVehicleDetails = async (req,res, next) => {

    res.render('vehicles/vehicleDetails', {
        title: 'Details',
    });
}

export { vehicleListPage, displayVehicleDetails};