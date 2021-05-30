import { message } from 'antd';

const errorHandler = data => {
    console.log(data);
    if (data.error) message.error(data.error.message);
    return Promise.reject();
};

export default errorHandler;