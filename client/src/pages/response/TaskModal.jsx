import React, { useState, useRef } from 'react';
import { Table, Modal, Space, Button, Input, Card } from 'antd';
import { SearchOutlined, FilePdfOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

export default function Task(props) {
    const { 
        visible, setVisible, state, 
        tableView, onExport, onPageChange
    } = props;
    
    const onCancel = () => setVisible(false);
    const onOk = () => setVisible(false);

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
                        style={{ width: 250, marginBottom: 8, display: 'block' }}
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
        <Modal
            visible={visible}
            onOk={onOk}
            okText='Done'
            onCancel={onCancel}
            cancelButtonProps={{ disabled: true }}
            closable={false}
            width={900}
        >
            <Card
                title='Response Report'
                extra={
                    <Button type='primary' onClick={onExport}>
                        <FilePdfOutlined />Export
                    </Button>
                }
                bordered={false}
            >
                <div ref={tableView}>
                    <Table 
                        dataSource={state.responses}
                        pagination={{
                            pageSize: state.pageSize,
                            total: state.responses.length,
                            onChange: onPageChange
                        }}
                        columns={[
                            {
                                title: 'Response',
                                dataIndex: 'response',
                                key: 'response'
                            },
                            {
                                title: 'Agenda task',
                                dataIndex: 'task',
                                key: 'task',
                            },
                            {
                                title: 'Activity',
                                dataIndex: 'activity',
                                key: 'activity',
                                ...getColumnSearchProps('activity')
                            },
                            {
                                title: 'Programme',
                                dataIndex: 'programme',
                                key: 'programme',
                                ...getColumnSearchProps('programme')
                            },
                            {
                                title: 'Regions',
                                dataIndex: 'regions',
                                key: 'regions',
                                ...getColumnSearchProps('regions'),
                            },
                            {
                                title: 'Groups',
                                dataIndex: 'groups',
                                key: 'groups',
                                ...getColumnSearchProps('groups'),
                            },
                        ]}
                    />
                </div>
            </Card>
        </Modal>
    );
};