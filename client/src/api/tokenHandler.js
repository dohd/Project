import jwt_decode from 'jwt-decode';

export const setToken = token => sessionStorage.setItem('token', token);
export const fetchToken = () => sessionStorage.getItem('token');
export const eraseToken = () => sessionStorage.clear();

export const isAuth = () => fetchToken() && true;

const loadPayload = () => {
    const token = fetchToken();
    return token ? jwt_decode(token) : null;
};

export const isAdmin = () => {
    const payload = loadPayload();
    return payload ? payload.roleId === 1 : false;
};

// fetch audience logged in
export const fetchAud = () => {
    const payload = loadPayload();
    return payload && payload.aud;
};