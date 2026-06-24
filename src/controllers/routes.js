import express from 'express';
import { renderHome } from './featuredVehicles/featuredVehicles.js';
import { vehicleListPage } from './vehicles/vehicles.js';

const router = express.Router();
//router to home
router.get('/', renderHome);

router.get('/vehicles', vehicleListPage);


router.get('/details', (req, res) => {
    res.render('details', { title: 'Details'});
});


export default router;