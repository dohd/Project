import React, { useRef, useState } from 'react';
import { Card, Table, Button, Space, Input } from 'antd';
import { 
    PlusOutlined, EditTwoTone, DeleteOutlined, 
    ArrowLeftOutlined, SearchOutlined, FilePdfOutlined
} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

export default function Participants(props) {
    const { 
        state, onDelete, history,
        onExport, tableView, onPageChange,
        createParticipant, updateParticipant
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
                    <Button type='primary' onClick={createParticipant}>
                        <PlusOutlined />Create
                    </Button>
                    <Button type='primary' onClick={onExport}>
                        <FilePdfOutlined />Export
                    </Button>
                </Space>
            }
        >
            <div ref={tableView}>
                <Table 
                    className='part-table'
                    dataSource={state.participants}
                    pagination={{
                        pageSize: state.pageSize,
                        total: state.participants.length,
                        onChange: onPageChange
                    }}
                    scroll={{ x: 1500 }}
                    columns={[
                        {
                            title: 'Activity Date',
                            dataIndex: 'activityDate',
                            key: 'activityDate',
                            ...getColumnSearchProps('activityDate')
                        },
                        {
                            title: 'Programme',
                            dataIndex: 'programme',
                            key: 'programme',
                            ...getColumnSearchProps('programme')
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
                                { text: 'Male', value: 'Male' },
                                { text: 'Female', value: 'Female' },
                                { text: 'Transgender', value: 'Transgender' }
                            ],
                            onFilter: (value, {gender}) => (gender.indexOf(value) === 0),
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
                                return (
                                    <div>
                                        <Button type='link' onClick={() => updateParticipant(key)}>
                                           <EditTwoTone style={{ fontSize: '20px' }} />
                                        </Button>
                                        <Button type='link' onClick={() => onDelete(key)}>
                                            <DeleteOutlined style={{ color: 'red', fontSize: '18px' }} />
                                        </Button>
                                    </div>
                                );
                            }
                        }
                    ]}
                />
            </div>
        </Card>
    );
}