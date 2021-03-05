const JWT = require('jsonwebtoken');
const createError = require('http-errors');
const client = require('./redis');

module.exports = {
    signAccessToken: user => {
        return new Promise((resolve, reject) => {
            const payload = { userId: user.id, roleId: user.roleId };
            const secret = process.env.ACCESS_TOKEN_SECRET;
            const options = {
                expiresIn: '30d',
                issuer: 'myapp.com',
                audience: String(user.accountId)
            };

            JWT.sign(payload, secret, options, (err,token) => {
                if (err) {
                    console.log(err.message);
                    reject(new createError.InternalServerError());
                }
                resolve(token);
            });
        });
    },

    verifyAccessToken: (req, res, next) => {           
        const authHeader = req.headers.authorization;
        if (!authHeader) throw new createError.Unauthorized();

        const bearerToken = authHeader.split(' ');
        const token = bearerToken[1];

        JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if (err) {
                console.log(err.message);
                const message = ( 
                    err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
                );
                return next(new createError.Unauthorized(message));
            }
            req.payload = payload;
            next();
        });
    },

    signRefreshToken: user => {
        return new Promise((resolve, reject) => {
            const payload = { userId: user.id, roleId: user.roleId };
            const secret = process.env.REFRESH_TOKEN_SECRET;
            const options = {
                expiresIn: '1y',
                issuer: 'myapp.com',
                audience: String(user.accountId)
            };

            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err.message);
                    reject(new createError.InternalServerError());
                }
                // Redis cache
                client.set(user.accountId, token, 'EX', 365*24*60*60, (err,reply) => {
                    if (err) {
                        console.log(err.message);
                        reject(new createError.InternalServerError());
                    }
                    resolve(token);    
                });  
            });
        });
    },

    verifyRefreshToken: refreshToken => {
        return new Promise((resolve,reject) => {
            JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
                if (err) reject(new createError.Unauthorized());
                const accountId = payload.aud;
                // Redis cache
                client.get(accountId, (err,result) => {
                    if (err) {
                        console.log(err.message);
                        reject(new createError.InternalServerError());
                    }
                    if (refreshToken === result) resolve(accountId);
                    reject(new createError.Unauthorized());
                });
            });
        });
    }
};