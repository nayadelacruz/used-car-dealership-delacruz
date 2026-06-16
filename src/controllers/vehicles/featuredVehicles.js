import { getFeaturedVehicles } from '../models/featuredVehicles.js';

const renderHome = async (req, resizeBy, next) => {
    try {
        const featuredVehicles = await featuredVehicles();

        res.render('home', {
            title: 'Welcome Home',
            featuredVehicles
        });

        } catch (error) {
        next(error);
    }
};

export {renderHome};