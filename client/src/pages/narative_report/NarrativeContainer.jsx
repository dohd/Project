import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { message } from 'antd';

import Narrative from './Narrative';
import Api from 'api';
import { useTracked } from 'context';

const fetchNarratives = dispatch => {
    Api.narrative.get()
    .then(res => dispatch({
        type: 'addNarratives',
        payload: res
    }));
};

export default function NarrativeContainer() {
    const [tab, setTab] = useState({ key: '1' });
    const onTabChange = value => setTab({ key: value });
    const nextTab = () => setTab(({key}) => ({ key: `${parseInt(key) + 1}`}));
    const prevTab = () => setTab(({key}) => ({ key: `${parseInt(key) - 1}`}));

    const [store, dispatch] = useTracked();
    const [agendaActivities, setAgendaActivities] = useState([]);

    useEffect(() => {
        const list = store.agenda.map(v => ({ 
            id: v.id, activity: v.task 
        }));
        setAgendaActivities(list);
    }, [store.agenda]);

    const initialState = {
        formA: [], formB: [], formC: [], formD: [], 
        formE: [],formF: [], formG: [], formH: [], 
        formI: {}, formJ: [], formK: []
    };
    const [state, setState] = useState(initialState);
    const { activityId } = useParams();

    const onSubmit = values => {
        const responses = [];
        for (const key in state) {
            let form = state[key];
            if (!Array.isArray(form) || !form.length) continue;
            form.forEach(v => {
                v.activityId = activityId;
                responses.push(v);
            });
        }

        if (!responses.length) {
            return message.error('Response required!');
        }

        const report  = { 
            activityId, responses,
            title: values.title,
            caseStudy: state.formI.study,
        };
        
        Api.narrative.post(report)
        .then(res => {
            setState(initialState);
            setTab({ key: '1' });
            message.success('Form submitted successfully');
            fetchNarratives(dispatch);
        });
    };

    // View Modal logic
    const [visible, setVisible] = useState(false);
    const [record, setRecord] = useState([]);

    const showModal = key => {
        const record = [];
        const form = state[key];
        form.forEach(({agendaId, response}) => {
            agendaActivities.forEach(({id, activity}) => {
                if (parseInt(agendaId) === id) {
                    record.push({ activity, response, key: id });
                }
            });
        });
        setRecord(record);
        setVisible(true);
    };

    const props = {
        state, setState, onSubmit, 
        nextTab, prevTab, showModal, 
        agendaActivities, visible,
        record, tab, onTabChange
    };
    return <Narrative {...props} />;
}