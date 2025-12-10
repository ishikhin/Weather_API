const express = require('express');
const path = require('path');
const weatherRoutes = require('./src/routes/weatherRoutes');
const requestLogger = require('./src/middleware/logMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.use('/api/weather', weatherRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
});

app.use((err, req, res, next) => {
    console.error('Server Error:', err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

app.listen(PORT, () => {
    console.log(`Weather Widget API server is running on http://localhost:${PORT}`);
    console.log(`Static files served from: ${path.join(__dirname, 'public')}`);
});