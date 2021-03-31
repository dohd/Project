import jwt_decode from 'jwt-decode';

export const setToken = token => sessionStorage.setItem('token', token);
export const fetchToken = () => sessionStorage.getItem('token');
export const removeToken = () => sessionStorage.clear();

export const isAuth = fetchToken() ? true : false;

export const isAdmin = () => {
    const token = fetchToken();
    const payload = token ? jwt_decode(token) : null;
    return payload ? payload.roleId === 1 : false;
}