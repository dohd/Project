import React, { useState, useEffect } from 'react';
import { Card, Table } from 'antd';
import { useQuizContext } from 'contexts';
import TaskModalContainer from "./TaskModalContainer";
import './response.css';

export default function Responses() {
    const [state, setState] = useState({ record: {}, quiz: [] });
    const { quiz } = useQuizContext();
    useEffect(() => {
        const list = quiz.map(val => ({ 
            key: val.id, quiz: val.query 
        }));
        setState(prev => ({...prev, quiz: list}));
    }, [quiz]);

    // modal logic
    const [visible, setVisible] = useState(false);
    const showModal = record => {
        setState(prev => ({...prev, record }));
        setVisible(true);
    };

    return (
        <Card
            bordered={false}
            title='Responses'
        >
            <TaskModalContainer 
                record={state.record}
                visible={visible} 
                setVisible={setVisible}
            />

            <Table 
                dataSource={state.quiz}
                pagination={{
                    pageSize: 5,
                    total: state.quiz.length
                }}
                onRow={(record, i) => ({ 
                    onClick: () => showModal(record) 
                })}
                columns={[
                    {
                        title: 'Questions',
                        dataIndex: 'quiz',
                        key: 'quiz',
                        render: text => <span className='cell'>{text}</span>
                    }
                ]}
            />
        </Card>
    );
}