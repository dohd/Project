import React, { useState } from 'react';
import { Card, Pagination } from 'antd';
import './report-view.css';

export default function ReportView(params) {
    const [state, setState] = useState({
        lowerLimit: 0,
        upperLimit: 5,
        page: 1,
        pageSize: 5,
        total: 10
    });

    const dataObj = {
        quiz: 'sample question',
        task: [
            'sample task 1', 
            'sample task 2', 
            'sample task 3', 
            'sample task 4',
            'sample task 5',
            'sample task 6',
            'sample task 7',
            'sample task 8',
            'sample task 9',
            'sample task 10'
        ],
        response: [
            'sample response 1', 
            'sample reponse 2', 
            'sample response 3', 
            'sample response 4',
            'sample response 5',
            'sample response 6',
            'sample response 7',
            'sample response 8',
            'sample response 9',
            'sample response 10'
        ]
    };

    dataObj.taskResp = dataObj.task.reduce((acc, task, i) => {
        acc.push([task, dataObj.response[i]])
        return acc;
    },[]);

    const data = Array(state.total).fill(dataObj).map((v,i) => ({
        key: i+1,
        quiz: `${v.quiz} ${i+1}`,
        taskResp: v.taskResp,
        span: v.taskResp.length,
    }));

    const tableBody = data.map(val => {
        return (
            <tbody key={val.key}>
                {
                    val.taskResp.map((arr, i) => {
                        return (
                            <tr key={i}>
                                { i === 0 && <td rowSpan={val.span}>{ val.quiz }</td> }
                                { arr.map((val, i) => <td key={i}>{val}</td>) }
                            </tr>
                        );
                    })
                }
            </tbody>
        );
    }).slice(state.lowerLimit, state.upperLimit);

    // console.log(data);

    const handleChange = page => {
        setState(prev => ({
            ...prev, page,
            lowerLimit: prev.pageSize*(page - 1),
            upperLimit: prev.pageSize*page
        }));
        console.log(page);
    };

    return (
        <Card>
            <table className='report-table'>
                <thead className='ant-table-thead'>
                    <tr>
                        <th>Question</th>
                        <th>Task</th>
                        <th>Response</th>
                    </tr>
                </thead>
                
                { tableBody }

            </table>
            &nbsp;
            <Pagination 
                current={state.page}  
                onChange={handleChange} 
                total={state.total} 
                defaultPageSize={state.pageSize}
                style={{ marginLeft: 'calc(100% - 240px)' }}
            />
        </Card>
    );
}