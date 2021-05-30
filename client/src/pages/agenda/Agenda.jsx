import React, { useState, useRef } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Card, Button, Space, Table, Input, Popconfirm } from 'antd';
import { 
    PlusOutlined, ArrowLeftOutlined, EditTwoTone, 
    DeleteOutlined, SearchOutlined
} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

import CreateAgenda from './AddAgendaModal';
import UpdateAgenda from './EditAgendaModal';
import { Path } from 'routes';
import { parseUrl } from 'utils';

export default function Agenda(props) {
    const {
        state, visible, setVisible, showCreateModal, 
        showUpdateModal, onDelete, fetchAgenda
    } = props;
    const history = useHistory();

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
                        style={{ width: 300, marginBottom: 8, display: 'block' }}
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

    const params = useParams();
    const reportPath = parseUrl(Path.narrativeReport, params);
    
    return (
        <Card 
            bordered={false}
            title={
                <Space>
                    <ArrowLeftOutlined 
                        onClick={() => history.goBack()}
                        style={{fontSize: '18px'}} 
                    />                       
                    Activity Agenda
                </Space>       
            }       
            extra={
                <Space>
                    <Button type='primary' onClick={showCreateModal}>
                        <PlusOutlined /> Agenda
                    </Button>
                    <Link to={reportPath}>
                        <Button 
                            type='primary'
                            disabled={!state.agenda.length}
                        >
                            Narrative Report
                        </Button>
                    </Link>
                </Space>
            } 
        >   
            <CreateAgenda  
                visible={visible.create}
                setVisible={setVisible}
                fetchAgenda={fetchAgenda} 
            />
            <UpdateAgenda
                visible={visible.update}
                setVisible={setVisible}
                record={state.record}
                fetchAgenda={fetchAgenda}
            />

            <Table 
                dataSource={state.agenda}
                columns={[
                    {
                        title: 'Time',
                        dataIndex: 'time',
                        key: 'time',
                    },
                    {
                        title: 'Task',
                        dataIndex: 'task',
                        key: 'task',
                        ...getColumnSearchProps('task')
                    },
                    {
                        title: 'Responsible Person(s)',
                        dataIndex: 'assignee',
                        key: 'assignee',
                        ...getColumnSearchProps('assignee')
                    },
                    {
                        title: 'Designation',
                        dataIndex: 'designation',
                        key: 'designation'
                    },
                    {
                        title: 'Action',
                        dataIndex: 'action',
                        key: 'action',
                        render: (text, record) => {
                            return (
                                <Space>  
                                    <Button 
                                        type='link' 
                                        onClick={() => showUpdateModal(record)}
                                        icon={<EditTwoTone style={{ fontSize: '20px' }} />}
                                    />                                                                      
                                    <Popconfirm
                                        title='Are you sure to delete this agenda?'
                                        onConfirm={() => onDelete(record.key)}
                                        okText='Yes'
                                        cancelText='No'
                                    >
                                        <Button
                                            type='link'
                                            icon={
                                                <DeleteOutlined 
                                                    style={{color: 'red', fontSize: '18px'}} 
                                                />
                                            }
                                        />
                                    </Popconfirm>      
                                </Space>
                            );
                        }
                    }
                ]}
            />
            
        </Card>
    );
}