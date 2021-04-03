import React, { useState, useRef } from 'react';
import { Card, Table, Button, Space, Input, Popconfirm } from 'antd';
import { 
    PlusOutlined, EditTwoTone, DeleteOutlined,
    SearchOutlined, FilePdfOutlined
} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

import AddProgramme from './AddProgrammeModal';
import EditProgramme from './EditProgrammeModal';

export default function KeyProgrammes(props) {
    const {
        state, visible, setVisible, onExport, 
        showModal, showUpdateModal, onDelete,
        fetchKeyProgrammes
    } = props;

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
                        style={{ width: 400, marginBottom: 8, display: 'block' }}
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
            title='Key Programmes'
            bordered={false}
            extra={
                <Space>
                    <Button type='primary' onClick={showModal}>
                        <PlusOutlined />Create
                    </Button>
                    <Button type='primary' onClick={onExport}>
                        <FilePdfOutlined />Export
                    </Button>
                </Space>
            }
        >
            <AddProgramme
                visible={visible.create}
                setVisible={setVisible}
                fetchKeyProgrammes={fetchKeyProgrammes}
            />
            <EditProgramme
                record={state.record} 
                visible={visible.update}
                setVisible={setVisible}
                fetchKeyProgrammes={fetchKeyProgrammes}
            />   

            <Table 
                dataSource={state.programmes}
                columns={[
                    {
                        title: 'Programme',
                        dataIndex: 'programme',
                        key: 'programme',
                        ...getColumnSearchProps('programme')
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        render: (text, record) => {
                            return (
                                <div>
                                    <Button 
                                        type='link' 
                                        onClick={() => showUpdateModal(record)}
                                    >
                                        <EditTwoTone style={{ fontSize: '20px' }} />
                                    </Button>
                                    <Popconfirm
                                        title='Are you sure to delete this programme?'
                                        onConfirm={() => onDelete(record.key)}
                                        okText='Yes'
                                        cancelText='No'
                                    >
                                        <Button
                                            type='link'
                                            icon={
                                                <DeleteOutlined 
                                                    style={{ color: 'red', fontSize: '18px'}} 
                                                />
                                            }
                                        />
                                    </Popconfirm>
                                </div>
                            );
                        }
                    }

                ]}
            />
        </Card>
    );
}