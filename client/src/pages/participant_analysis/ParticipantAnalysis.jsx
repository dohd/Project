import React, { useState, useRef } from 'react';
import { Card, Table, Button, Space, Input } from 'antd';
import { SearchOutlined, FilePdfOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

export default function ParticipantAnalysis(props) {
    const { analysis } = props;

    // custom search filter 
    const [search, setSearch] = useState({ text: '', column: ''});
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearch({ text: selectedKeys[0], column: dataIndex });
    };
    const handleReset = clearFilters => {
        clearFilters();
        setSearch(prev => ({...prev, text: ''}));
    };

    const searchInput = useRef();

    const getColumnSearchProps = dataIndex => ({
        filterDropdown: props => {
            const { 
                setSelectedKeys, selectedKeys, confirm, clearFilters 
            } = props;

            return (
                <div style={{padding: 8}}>
                    <Input
                        ref={searchInput}
                        placeholder={`Search ${dataIndex}`}
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        style={{ width: 200, marginBottom: 8, display: 'block' }}
                    />
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                            icon={<SearchOutlined />}
                            size="small"
                            style={{ width: 90 }}
                        >
                            Search
                        </Button>
                        <Button 
                            onClick={() => handleReset(clearFilters)} 
                            size="small" 
                            style={{ width: 90 }}
                        >
                            Reset
                        </Button>
                    </Space>
                </div>
            );
        },
        filterIcon: filtered => (
            <SearchOutlined style={{ color: filtered && '#1890ff' }} />
        ),
        onFilter: (value, record) => {
            const text = record[dataIndex];
            if (!text) return;
            return text.toString().toLowerCase().includes(value.toLowerCase());
        },
        onFilterDropdownVisibleChange: visible => {
            const input = searchInput.current;
            if (visible && input) {
                setTimeout(() => input.select(), 100);
            }
        },
        render: text => {
            if (search.column === dataIndex) {
                return (
                    <Highlighter
                        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                        searchWords={[search.text]}
                        autoEscape
                        textToHighlight={text && text.toString()}
                    />
                );
            }
            return text;
        }
    });

    return (
        <Card
            bordered={false}
            title='Participant Analysis'
            extra={
                <Button type='primary'>
                    <FilePdfOutlined />
                    Export
                </Button>
            }
        >
            <Table
                bordered 
                dataSource={analysis}
                columns={[
                    {
                        title: 'Activity',
                        children: [
                            {
                                title: 'Title',
                                dataIndex:'title',
                                key: 'title',
                                ...getColumnSearchProps('title')
                            },
                            {
                                title: 'Date',
                                dataIndex: 'date',
                                key: 'date',
                            },
                        ],
                        
                    },
                    {
                        title: 'Plan',
                        children: [
                            {
                                title: 'Programme',
                                dataIndex:'programme',
                                key: 'programme',
                                ...getColumnSearchProps('programme')
                            },
                            {
                                title: 'Regions',
                                dataIndex:'regions',
                                key: 'regions',
                            },
                            {
                                title: 'Groups',
                                dataIndex:'groups',
                                key: 'groups',
                            },
                        ]
                    },
                    {
                        title: 'Gender',
                        children: [
                            {
                                title: 'Male',
                                dataIndex:'male',
                                key: 'male'
                            },
                            {
                                title: 'Female',
                                dataIndex:'female',
                                key: 'female'
                            },
                            {
                                title: 'Total',
                                dataIndex:'total',
                                key: 'total'
                            }
                        ]
                    }
                ]}
            />
        </Card>
    );
}