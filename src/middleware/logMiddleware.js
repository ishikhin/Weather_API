
const requestLogger = (req, res, next) => {
    const timestamp = new Date().toISOString();

    console.log(`\n=== [${timestamp}] ===`);
    console.log(`${req.method} ${req.originalUrl}`);
    console.log(`Headers:`, req.headers['content-type'] || 'none');

    if (req.query && Object.keys(req.query).length > 0) {
        console.log(`Query params:`, req.query);
    }

    if (req.params && Object.keys(req.params).length > 0) {
        console.log(`Route params:`, req.params);
    }

    if (req.body && typeof req.body === 'object' && Object.keys(req.body).length > 0) {
        console.log(`Request Body:`, JSON.stringify(req.body, null, 2));
    } else if (req.body) {
        console.log(`Request Body (non-object):`, req.body);
    }

    console.log(`=== End Request ===\n`);

    next();
};

module.exports = requestLogger;