const express = require('express');
require('dotenv/config');
const httpLogger = require('morgan');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { verifyAccessToken } = require('./utils/JWT');
const privateApiRoute = require('./routes');
const authRoute = require('./routes/auth');

// Initiate express app server
const app = express();
const port = process.env.PORT;

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


// Routes
app.use('/api/auth', authRoute);
app.use('/api', verifyAccessToken, privateApiRoute);

// Catch-all Route
app.use((req, res, next) => {
    next(new createError.NotFound());
});
// Route error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({ 
        error: {
            status: err.status || 500,
            message: err.message
        } 
    });
});


// Server instance
const server = app.listen(port, () => {
    console.log('Server running on port:', port);
});

process.on('SIGINT', () => {
    console.log(' Server connection terminated ');
    server.close();
});