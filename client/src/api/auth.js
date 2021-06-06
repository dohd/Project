import Api, { setToken, isAuth, fetchAud, eraseToken } from 'api';

export const Auth = {
    login: async values => {
        try {
            const res = await Api.login.post(values);
            setToken(res.accessToken);
            return Promise.resolve(isAuth());
        } catch (error) {
            return Promise.reject(error);
        }
    },
    register: async values => {
        try {
            const res = await Api.register.post(values);
            setToken(res.accessToken);
            return Promise.resolve(isAuth());
        } catch (error) {
            return Promise.reject(error);
        }
    },
    logout: () => {
        const aud = fetchAud();
        Api.logout.delete(aud);
        eraseToken();
    }
};
