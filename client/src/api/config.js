import instance  from './xhr';
import endpoints  from './endpoints';

const Api = {};
for (const key in endpoints) {
    const url = endpoints[key];
    const methods = {
        get: param => param ? instance.get(`${url}?${param}`) : instance.get(url),
        post: data => instance.post(url, data),
        patch: (id, data) => instance.patch(`${url}/${id}`, data),
        delete: id => instance.delete(`${url}/${id}`),
    };
    // Assign getter for the Api methods
    Object.defineProperty(Api, key, { 
        get: function() { return methods; } 
    });
}

export default Api;