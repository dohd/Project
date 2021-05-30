require('dotenv/config');
const express = require('express');
const httpLogger = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Initiate express app server
const app = express();

class Config {
    constructor() {
        // Log http server requests
        app.use(httpLogger('dev'));
        // Parse content-type - application/json
        app.use(express.json());
        // Parse content-type - application/x-www-form-urlencoded
        app.use(express.urlencoded({ extended: true }));
        // Parse cookies
        app.use(cookieParser());
        // Allow cross-origin resource sharing
        app.use(cors());
    }

    use(...args) { return app.use(...args); }
    listen(...args) { return app.listen(...args); }

    get port() { return process.env.PORT; }
}

module.exports = Config;