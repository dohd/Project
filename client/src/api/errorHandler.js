import { message } from 'antd';

const errorHandler = data => {
    if (data.error) {
        console.log(data.error);
        message.error(data.error.message);
    }
    return Promise.reject();
};

export default errorHandler;