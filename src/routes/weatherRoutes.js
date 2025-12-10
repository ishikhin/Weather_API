const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');


router.get('/', weatherController.getAllWeather);

router.get('/:city', weatherController.getWeatherByCity);

router.post('/', weatherController.addCityWeather);

router.put('/:city', weatherController.updateCityWeather);

router.delete('/:city', weatherController.deleteCityWeather);

module.exports = router;