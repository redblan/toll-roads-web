const { readData, writeData } = require('./fileService');

let dataFilePath = null;

function init(filePath) {
    dataFilePath = filePath;
}

function findAll(titleFilter) {
    const routes = readData(dataFilePath);
    if (titleFilter) {
        return routes.filter(r =>
            r.title.toLowerCase().includes(titleFilter.toLowerCase())
        );
    }
    return routes;
}

function findOne(id) {
    const routes = readData(dataFilePath);
    return routes.find(r => r.id === id) || null;
}

function create({ title, subtitle, distance_km, rate_per_km, speed_limit, opened_year, text }) {
    const routes = readData(dataFilePath);
    const newRoute = {
        id: routes.length > 0 ? Math.max(...routes.map(r => r.id)) + 1 : 1,
        title,
        subtitle,
        distance_km,
        rate_per_km,
        speed_limit,
        opened_year,
        text
    };
    routes.push(newRoute);
    writeData(dataFilePath, routes);
    return newRoute;
}

function update(id, fields) {
    const routes = readData(dataFilePath);
    const idx = routes.findIndex(r => r.id === id);
    if (idx === -1) return null;
    routes[idx] = { ...routes[idx], ...fields, id };
    writeData(dataFilePath, routes);
    return routes[idx];
}

function remove(id) {
    const routes = readData(dataFilePath);
    const idx = routes.findIndex(r => r.id === id);
    if (idx === -1) return false;
    routes.splice(idx, 1);
    writeData(dataFilePath, routes);
    return true;
}

// Индивидуальная бизнес-логика: расчёт стоимости проезда (toll_roads_cost)
// toll_roads_cost = distance_km * rate_per_km
function calcTollCost(id, km) {
    const route = findOne(id);
    if (!route) return null;
    const distance = km !== undefined ? km : route.distance_km;
    return {
        route: route.title,
        distance_km: distance,
        rate_per_km: route.rate_per_km,
        toll_roads_cost: +(distance * route.rate_per_km).toFixed(2)
    };
}

module.exports = { init, findAll, findOne, create, update, remove, calcTollCost };