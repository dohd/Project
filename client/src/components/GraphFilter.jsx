import React from 'react';

import GraphFilterView from './GraphFilterView';
import Api from 'api';

export default function GraphFilter(props) {
    const { apiKey, dispatch, actionType } = props;

    const onFinish = values => {
        if (!values.filter) {
            Api[apiKey].get()
            .then(res => dispatch({
                type: actionType,
                payload: res
            }));
            return;
        }
        
        const dates = values.filter.map(v => v.format('YYYY-MM-DD'));

        const from_date = dates[0];
        const to_date = dates[1];
        const param = `from=${from_date}&to=${to_date}`;

        Api[apiKey].get(param)
        .then(res => dispatch({
            type: actionType,
            payload: res
        }));
    };
    const onFinishFailed = err => console.log('Error:', err);

    const params = { onFinish, onFinishFailed };
    return <GraphFilterView {...params} />;
}
