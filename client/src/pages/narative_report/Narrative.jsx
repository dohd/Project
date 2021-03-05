import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Select, Space, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { tabContent } from './Tabs';
import Api from 'api';
import { useAgendaContext }  from 'contexts';
import ViewModal from './ViewModal';

export default function Narrative({ match, history }) {
    const { activityId } = match.params;

    const [tab, setTab] = useState({ key: '1' });
    const onTabChange = value => setTab({ key: value });
    const nextTab = () => setTab(({key}) => ({ key: `${Number(key) + 1}`}));
    const prevTab = () => setTab(({key}) => ({ key: `${Number(key) - 1}`}));

    const initState = {
        formA: [], formB: [], formC: [], formD: [], 
        formE: [],formF: [], formG: [], formH: [], 
        formI: {}, formJ: [], formK: []
    };
    const [state, setState] = useState(initState);

    const { agenda } = useAgendaContext();
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const data = agenda.map(val => ({ 
            id: val.id, activity: val.task 
        }));
        setActivities(data);
    }, [agenda]);

    const activityList = activities.map(({id, activity}) => (
        <Select.Option key={id} value={id}>{ activity }</Select.Option>
    ));

    // View Modal logic
    const [visible, setVisible] = useState(false);
    const [record, setRecord] = useState([]);

    const showModal = form => {
        const record = [];
        state[form].forEach(({agendaId, response}) => {
            activities.forEach(({id, activity}) => {
                if (Number(agendaId) === id) {
                    record.push({ activity, response, key: id });
                }
            });
        });
        setRecord(record);
        setVisible(true);
    };

    const onSave = () => message.success('Data saved!');

    const onSubmit = () => {
        const response = [];
        const { formI, ...otherForms } = state;
        Object.values(otherForms).forEach(form => {
            if (form.length) {
                form.forEach(val => {
                    val.activityId = activityId;
                    response.push(val);
                });
            }
        });

        if (!response.length) return message.error('Response required!');

        const report  = { 
            activityId, response,
            caseStudy: formI.study,
        };
        
        Api.narrative.post(report)
        .then(res => {
            setState(initState);
            setTab({ key: '1' });
            message.success('Form submitted successfully');
        })
        .catch(err => {
            console.log(err);
            message.error('Unknown error!');
        });
    };

    const props = {
        state, setState, onSave,
        activityList, onSubmit,
        onNext: nextTab, 
        onBack: prevTab,
        view: showModal, 
    };
    
    return (
        <Card 
            bordered={false}
            title={
                <Space>
                    <ArrowLeftOutlined 
                      onClick={() => history.goBack()}
                      style={{fontSize: '18px'}}
                    /> Activity Narrative Report
                </Space>
            }
            activeTabKey={tab.key}
            onTabChange={onTabChange}
        >
            <Row>
                <Col span={23} offset={2}>
                    { tabContent(props)[tab.key] }
                </Col>
            </Row>

            <ViewModal
                visible={visible}
                setVisible={setVisible}
                record={record}
            />
        </Card>
    );
}