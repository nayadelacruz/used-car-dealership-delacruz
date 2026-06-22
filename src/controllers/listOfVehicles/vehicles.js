import { getListOfVehicles, getByCategory, getCategories } from "../../models/vehicles/list.js";

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

        res.render('vehicles', {
            title: 'Vehicle Inventory',
            vehicles,
            categories,
            currentCategory: categoryId || ''
        });

    } catch (error) {
        next(error);
    }
};

/*const vehicleDetails = async (req, res, next) => {
    const vehicleId = req.param.facultyID;
    const vehicle = await getByCategory(vehicleId);

    if {

    } else {
        res.render('vehicles/list', {
            title: `${vehicle.make} ${vehicle.model}`
            vehicle: vehicle

        })
    }

    };*/

export { vehicleListPage};