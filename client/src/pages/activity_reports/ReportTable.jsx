import React from 'react';
import { Table, Card } from 'antd';

export default function ReportTable() {

    const nestedObj = {
        task: 'sample task',
        resp: 'sample response'
    }

    const nestedData = Array(10).fill(nestedObj).map((v,i) => ({
        key: i+1,
        task: `${v.task} ${i+1}`,
        response: `${v.resp} ${i+1}`
    }));

    const expandedRowRender = () => {
        return (
            <Table 
                pagination={false}
                dataSource={nestedData}
                columns={[
                    {
                        title: 'Task',
                        dataIndex: 'task',
                        key: 'task'
                    },
                    {
                        title: 'Response',
                        dataIndex: 'response',
                        key: 'response'
                    }
                ]}
            />
        );
    }

    const data = Array(10).fill({ quiz: 'sample question' })
    .map((v,i) => ({ key: i+1, quiz: `${v.quiz} ${i+1}`}));

    return (
        <Card
            title='Report'
            bordered={false}
        >
            <Table
                expandable={{ expandedRowRender }}
                dataSource={data}
                columns={[
                    {
                        title: 'Question',
                        dataIndex: 'quiz',
                        key: 'quiz'
                    }
                ]}
            />
        </Card>
    );
}
