const setToken = token => sessionStorage.setItem('token', token);
const fetchToken = () => sessionStorage.getItem('token');
const removeToken = () => sessionStorage.clear();

const isAuth = fetchToken() ? true : false;

export { setToken, fetchToken, removeToken, isAuth };