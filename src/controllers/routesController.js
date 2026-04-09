const routesService = require('../services/routesService');

const getAllRoutes = (req, res) => {
    const { title } = req.query;
    const routes = routesService.findAll(title);
    res.json(routes);
};

const getRouteById = (req, res) => {
    const id = parseInt(req.params.id);
    const route = routesService.findOne(id);
    if (!route) {
        return res.status(404).json({ error: 'Маршрут не найден' });
    }
    res.json(route);
};

const createRoute = (req, res) => {
    const { title, subtitle, distance_km, rate_per_km, speed_limit, opened_year, text } = req.body;
    if (!title || !distance_km || !rate_per_km) {
        return res.status(400).json({ error: 'Обязательные поля: title, distance_km, rate_per_km' });
    }
    const newRoute = routesService.create({ title, subtitle, distance_km, rate_per_km, speed_limit, opened_year, text });
    res.status(201).json(newRoute);
};

const updateRoute = (req, res) => {
    const id = parseInt(req.params.id);
    const updated = routesService.update(id, req.body);
    if (!updated) {
        return res.status(404).json({ error: 'Маршрут не найден' });
    }
    res.json(updated);
};

const deleteRoute = (req, res) => {
    const id = parseInt(req.params.id);
    const success = routesService.remove(id);
    if (!success) {
        return res.status(404).json({ error: 'Маршрут не найден' });
    }
    res.status(204).send();
};

// Индивидуальный эндпоинт: GET /routes/:id/toll-cost?km=150
// Рассчитывает стоимость проезда (toll_roads_cost)
const getTollCost = (req, res) => {
    const id = parseInt(req.params.id);
    const km = req.query.km ? parseFloat(req.query.km) : undefined;

    if (req.query.km !== undefined && (isNaN(km) || km <= 0)) {
        return res.status(400).json({ error: 'Параметр km должен быть положительным числом' });
    }

    const result = routesService.calcTollCost(id, km);
    if (!result) {
        return res.status(404).json({ error: 'Маршрут не найден' });
    }
    res.json(result);
};

module.exports = { getAllRoutes, getRouteById, createRoute, updateRoute, deleteRoute, getTollCost };