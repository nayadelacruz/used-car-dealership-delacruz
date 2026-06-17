import { getFeaturedVehicles } from "../../models/vehicles/featuredVehicles.js";

const renderHome = async (req, res, next) => {
    try {
        const featuredVehicles = await getFeaturedVehicles();

        res.render('home', {
            title: 'Welcome Home',
            featuredVehicles
        });

        } catch (error) {
        next(error);
    }
};

export {renderHome};