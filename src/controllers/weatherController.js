const weatherStorage = require('../data/weatherData');

const weatherController = {
    getAllWeather: (req, res) => {
        const allData = weatherStorage.getAll();
        res.json({
            success: true,
            data: Object.values(allData)
        });
    },

    getWeatherByCity: (req, res) => {
        const cityName = req.params.city.toLowerCase();
        const cityData = weatherStorage.getByCity(cityName);

        if (cityData) {
            res.json({
                success: true,
                data: cityData
            });
        } else {
            res.status(404).json({
                success: false,
                message: `Weather data for city '${req.params.city}' not found.`
            });
        }
    },

    getWeatherByQuery: (req, res) => {
        const cityName = req.query.city?.toLowerCase();

        if (!cityName) {
            return res.status(400).json({
                success: false,
                message: 'Query parameter "city" is required.'
            });
        }

        const cityData = weatherStorage.getByCity(cityName);
        if (cityData) {
            res.json({
                success: true,
                data: cityData
            });
        } else {
            res.status(404).json({
                success: false,
                message: `Weather data for city '${cityName}' not found.`
            });
        }
    },

    addCityWeather: (req, res) => {
        const { city, temperature, condition, humidity, windSpeed, icon } = req.body;

        if (!city) {
            return res.status(400).json({
                success: false,
                message: 'Field "city" is required.'
            });
        }

        const cityKey = city.toLowerCase();
        const existingCity = weatherStorage.getByCity(cityKey);

        if (existingCity) {
            return res.status(409).json({
                success: false,
                message: `City '${city}' already exists.`
            });
        }

        const newCityData = {
            city,
            temperature: temperature || 'N/A',
            condition: condition || 'N/A',
            humidity: humidity || 'N/A',
            windSpeed: windSpeed || 'N/A'
        };

        const success = weatherStorage.addCity(cityKey, newCityData);

        if (success) {
            res.status(201).json({
                success: true,
                message: `Weather data for '${city}' added successfully.`,
                data: newCityData
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Failed to save data.'
            });
        }
    },

    updateCityWeather: (req, res) => {
        const cityName = req.params.city.toLowerCase();
        const existingCity = weatherStorage.getByCity(cityName);

        if (!existingCity) {
            return res.status(404).json({
                success: false,
                message: `City '${req.params.city}' not found.`
            });
        }

        const { temperature, condition, humidity, windSpeed, icon } = req.body;
        const updates = {};

        if (temperature !== undefined) updates.temperature = temperature;
        if (condition !== undefined) updates.condition = condition;
        if (humidity !== undefined) updates.humidity = humidity;
        if (windSpeed !== undefined) updates.windSpeed = windSpeed;
        if (icon !== undefined) updates.icon = icon;

        const success = weatherStorage.updateCity(cityName, updates);

        if (success) {
            const updatedCity = weatherStorage.getByCity(cityName);
            res.json({
                success: true,
                message: `Weather data for '${existingCity.city}' updated successfully.`,
                data: updatedCity
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Failed to update data.'
            });
        }
    },

    deleteCityWeather: (req, res) => {
        const cityName = req.params.city.toLowerCase();
        const existingCity = weatherStorage.getByCity(cityName);

        if (!existingCity) {
            return res.status(404).json({
                success: false,
                message: `City '${req.params.city}' not found.`
            });
        }

        const success = weatherStorage.deleteCity(cityName);

        if (success) {
            res.json({
                success: true,
                message: `Weather data for '${existingCity.city}' deleted successfully.`
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Failed to delete data.'
            });
        }
    }
};

module.exports = weatherController;