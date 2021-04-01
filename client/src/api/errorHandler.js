import { message } from 'antd';

let renderCount = 0;
const errorHandler = data => {
    console.log(data);
    if (renderCount === 1 && data.error) {
        message.error(data.error.message);
    }
    renderCount++;
    return Promise.resolve();
};

export default errorHandler;