import { message } from 'antd';

let renderCount = 0;
const errorHandler = data => {
    renderCount++;
    console.log(data);
    if (renderCount === 2 && data.error) {
        message.error(data.error.message);
    }
    return Promise.resolve();
};

export default errorHandler;