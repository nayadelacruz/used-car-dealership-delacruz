import express from 'express';
import { renderHome } from '../controllers/vehicles/featuredVehicles.js';

const router = express.Router();
//router to home
router.get('/', renderHome);

router.get('/vehicles', (req, res) => {
    res.render('vehicles', { title: 'Vehicles' });
});

router.get('/details', (req, res) => {
    res.render('details', { title: 'Details'});
});

export default router;