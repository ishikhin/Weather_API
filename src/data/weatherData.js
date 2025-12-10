const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'weatherStorage.json');

function readData() {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading data file:', error);
        return {};
    }
}

function writeData(data) {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
        console.log('Данные успешно записаны в файл:', DATA_FILE);
        return true;
    } catch (error) {
        console.error('Ошибка записи в файл:', error);
        return false;
    }
}

function getAll() {
    return readData();
}

function getByCity(city) {
    const data = readData();
    return data[city.toLowerCase()];
}

function addCity(cityKey, cityData) {
    const data = readData();
    data[cityKey.toLowerCase()] = cityData;
    return writeData(data);
}

function updateCity(cityKey, updates) {
    const data = readData();
    const lowerCityKey = cityKey.toLowerCase();

    console.log(`Попытка обновить город: ${cityKey} (ключ: ${lowerCityKey})`);
    console.log('Текущие данные:', data[lowerCityKey]);
    console.log('Обновления:', updates);

    if (!data[lowerCityKey]) {
        console.log(`Город не найден: ${lowerCityKey}`);
        return false;
    }

    data[lowerCityKey] = { ...data[lowerCityKey], ...updates };
    console.log('Данные обновлены в памяти:', data[lowerCityKey]);

    const result = writeData(data);
    console.log('Результат записи в файл:', result ? 'Успешно' : 'Ошибка');

    return result;
}

function deleteCity(cityKey) {
    const data = readData();
    const lowerCityKey = cityKey.toLowerCase();

    if (!data[lowerCityKey]) return false;

    delete data[lowerCityKey];
    return writeData(data);
}

module.exports = {
    getAll,
    getByCity,
    addCity,
    updateCity,
    deleteCity,
    readData,
    writeData
};