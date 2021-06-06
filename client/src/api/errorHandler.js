import { message } from 'antd';

const errorHandler = data => {
    if (data.error) message.error(data.error.message);
    return Promise.reject(data).catch(console.log);
};

export default errorHandler;