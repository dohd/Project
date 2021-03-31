import React, { useEffect, useState } from 'react';
import { Form, message } from 'antd';

import Settings from './Settings';
import Api, { isAdmin } from 'api';
import { useTracked } from 'context';

const fetchOrgProfile = dispatch => {
    Api.orgProfile.get()
    .then(res => dispatch({
        type: 'addOrgProfile', 
        payload: res
    }));
};

export default function SettingsContainer() {
    const [store, dispatch] = useTracked();

    const [restrict, setRestrict] = useState(true);
    useEffect(() => isAdmin() ? setRestrict(false) : null, []);

    const onCreate = values => {
        Api.orgProfile.post(values)
        .then(res => {
            fetchOrgProfile(dispatch);
            message.success('Settings updated successfully');
        });
    };

    const [form] = Form.useForm();
    const onSave = () => {
        form.validateFields()
        .then(values => onCreate(values))
        .catch(err => console.log('Validate Failed',err));
    };

    useEffect(() => {
        const profile = store.orgProfile;
        if (profile.hasOwnProperty('detail')) {
            const { detail, contactPerson } = profile;
            form.setFieldsValue({
                orgName: detail.name,
                orgEmail: detail.email,
                orgTelephone: detail.telephone,
                cpTelephone: contactPerson.telephone,
                cpEmail: contactPerson.email,
                fName: contactPerson.fName,
                lName: contactPerson.lName
            });
        }
    }, [form, store.orgProfile]);

    const props = { form, restrict, onSave }
    return <Settings {...props} />;
}