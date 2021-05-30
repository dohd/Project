import React, { useRef, useState } from 'react';
import { Card, Table, Button, Space, Input, Popconfirm } from 'antd';
import { Link, useHistory, useParams } from 'react-router-dom';
import { 
    PlusOutlined, EditTwoTone, DeleteOutlined, 
    ArrowLeftOutlined, SearchOutlined
} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

import { parseUrl } from 'utils';
import { Path } from 'routes';

export default function Participants(props) {
    const { participants, onDelete } = props;
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

    const params = useParams();
    const agendaPath = parseUrl(Path.agenda, params);
    const addParticipantPath = parseUrl(Path.createParticipant, params);
        
    return (
        <Card
            bordered={false}
            title={
                <Space>
                    <ArrowLeftOutlined 
                        onClick={() => history.goBack()}
                        style={{ fontSize: '18px' }}
                    /> Activity Participants
                </Space>
            }
            extra={
                <Space>
                    <Link to={addParticipantPath}>
                        <Button type='primary'>
                            <PlusOutlined />Participant
                        </Button>
                    </Link>
                    <Link to={agendaPath}>
                        <Button 
                            type='primary'
                            disabled={!participants.length}
                        >
                            Agenda
                        </Button>
                    </Link>
                </Space>
            }
        >
            <Table 
                className='part-table'
                dataSource={participants}
                scroll={{ x: 1500 }}
                columns={[
                    {
                        title: 'Activity Date',
                        dataIndex: 'activityDate',
                        key: 'activityDate',
                        ...getColumnSearchProps('activityDate')
                    },
                    {
                        title: 'Name',
                        dataIndex: 'name',
                        key: 'name',
                    },
                    {
                        title: 'Gender',
                        dataIndex: 'gender',
                        key: 'gender',
                        filters: [
                            { text: 'Male', value: 'M' },
                            { text: 'Female', value: 'F' },
                        ],
                        onFilter: (value, record) => record.gender === value
                    },
                    {
                        title: 'Disability',
                        dataIndex: 'disability',
                        key: 'disability'
                    },
                    {
                        title: 'Designation',
                        dataIndex: 'designation',
                        key: 'designation'
                    },
                    {
                        title: 'Phone',
                        dataIndex: 'phone',
                        key: 'phone'
                    },
                    {
                        title: 'Email',
                        dataIndex: 'email',
                        key: 'email'
                    },
                    {
                        title: 'Programme',
                        dataIndex: 'programme',
                        key: 'programme',
                        ...getColumnSearchProps('programme')
                    },
                    {
                        title: 'Region',
                        dataIndex: 'region',
                        key: 'region',
                        ...getColumnSearchProps('region')
                    },
                    {
                        title: 'Action',
                        dataIndex: 'action',
                        key: 'action',
                        fixed: 'right',
                        render: (text, {key}) => {
                            const obj = { participantId: key, ...params };
                            const editPath = parseUrl(Path.updateParticipant, obj);
                            return (
                                <div>
                                    <Link to={editPath}>
                                        <Button
                                            type='link'
                                            icon={
                                                <EditTwoTone 
                                                    style={{ fontSize: '20px' }} 
                                                />
                                            }
                                        />
                                    </Link>
                                    <Popconfirm
                                        title='Are you sure to delete this participant?'
                                        onConfirm={() => onDelete(key)}
                                        okText='Yes'
                                        cancelText='No'
                                    >
                                        <Button type='link'
                                            icon={
                                                <DeleteOutlined 
                                                    style={{ 
                                                        color: 'red', 
                                                        fontSize: '18px' 
                                                    }} 
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
