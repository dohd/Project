import React, { useState } from 'react';
import { Form } from 'antd';

import DateModalView, { dateFormat } from './DateModalView';

export default function DateModal(props) {
    const { state, setState, regions } = props;
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    
    const onCreate = values => {
        setVisible(false);
        const date = values.date.format(dateFormat);
        const exists = state.events[0].includes(date);
        if (exists) return form.resetFields();

        setState(prev => ({
            events: [
                [...prev.events[0], date],
                [...prev.events[1], values.regions]
            ]
        }));
        form.resetFields();       
    };

    const onOk = () => {
        form.validateFields()
        .then(values => onCreate(values))
        .catch(err => console.log('validation Failed:', err));
    };

    const params = { visible, setVisible, onOk, form, regions };
    return <DateModalView {...params} />
}
