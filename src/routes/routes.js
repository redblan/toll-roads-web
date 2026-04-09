const express = require('express');
const router = express.Router();
const routesController = require('../controllers/routesController');

router.get('/', routesController.getAllRoutes);
router.get('/:id/toll-cost', routesController.getTollCost);  // индивидуальный эндпоинт
router.get('/:id', routesController.getRouteById);
router.post('/', routesController.createRoute);
router.patch('/:id', routesController.updateRoute);
router.delete('/:id', routesController.deleteRoute);

module.exports = router;