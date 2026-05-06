const express = require('express');
const cors = require('cors');
const path = require('path');
const routesRouter = require('./routes/routes');
const routesService = require('./services/routesService');

const app = express();
const PORT = 3000;

const DATA_FILE_PATH = path.join(__dirname, 'data/routes.json');
routesService.init(DATA_FILE_PATH);

// Middleware: CORS
app.use(cors());

// Middleware: парсинг JSON
app.use(express.json());

// Middleware: логирование запросов
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Маршруты
app.use('/routes', routesRouter);

// 404
app.use((req, res) => {
    res.status(404).json({ error: 'Маршрут не найден' });
});

// Обработка ошибок
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
    console.log(`Примеры запросов:`);
    console.log(`  GET  http://localhost:${PORT}/routes`);
    console.log(`  GET  http://localhost:${PORT}/routes/1`);
    console.log(`  GET  http://localhost:${PORT}/routes/1/toll-cost?km=150`);
    console.log(`  POST http://localhost:${PORT}/routes`);
});