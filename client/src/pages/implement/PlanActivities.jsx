import React, { useState, useRef } from 'react';
import { 
    Card, Table, Button, Space, Menu, Dropdown, Input, Tag 
} from 'antd';
import { 
    ArrowLeftOutlined, PlusOutlined, SearchOutlined,
    FilePdfOutlined, DownOutlined
} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import AddActivity from './AddActivityModal';

export default function PlanActivities(props) {
    const {
        state, fetchProposals, visible, setVisible, history, showModal,
        createReport, participantList, createPlan, agendaList,
        objectiveId, tableView, onExport, onPageChange,
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
            bordered={false}
            title={
                <Space>
                    <ArrowLeftOutlined
                        onClick={() => history.goBack()}
                        style={{ fontSize: '18px' }} 
                    /> 
                    Implementation Plan  
                </Space>       
            }
            extra={
                <Space>
                    <Button type='primary' onClick={showModal}>
                        <PlusOutlined />Activity
                    </Button>
                    <Button type='primary' onClick={onExport}>
                        <FilePdfOutlined />Export
                    </Button>
                </Space>
            }
        >
            <AddActivity 
                objectiveId={objectiveId}
                visible={visible}
                setVisible={setVisible}
                fetchProposals={fetchProposals}
            />

            <div ref={tableView}>
                <Table 
                    dataSource={state.activities} 
                    pagination={{
                        pageSize: state.pageSize,
                        total: state.activities.length,
                        onChange: onPageChange
                    }}
                    columns={[
                        {
                            title: 'Activity',
                            dataIndex: 'activity',
                            key: 'activity',
                            ...getColumnSearchProps('activity')
                        },
                        {
                            title: 'Participant Status',
                            dataIndex: 'participantStatus',
                            key: 'participantStatus',
                            render: text => text? <Tag color='geekblue'>{ text }</Tag> : '_'
                        },
                        {
                            title: 'Reports',
                            dataIndex: 'reports',
                            key: 'reports',
                            render: text => text? text : '_'
                        },
                        {
                            title: 'Action',
                            dataIndex: 'action',
                            key: 'action',
                            render: (text, {key}) => {
                                return (
                                    <Dropdown
                                        overlay={
                                            <Menu>
                                                <Menu.Item onClick={() => createPlan(key)}>
                                                    <PlusOutlined />Plan
                                                </Menu.Item>
                                                
                                                <Menu.Item
                                                    onClick={() => participantList(key)}
                                                >
                                                    <PlusOutlined />Participants
                                                </Menu.Item>

                                                <Menu.Item onClick={() => agendaList(key)}>
                                                    <PlusOutlined />Agenda
                                                </Menu.Item>

                                                <Menu.Item onClick={() => createReport(key)}>
                                                    <PlusOutlined />Narrative Report
                                                </Menu.Item>
                                            </Menu>
                                        }
                                    >
                                        <Button type='link'>
                                            actions <DownOutlined />
                                        </Button>
                                    </Dropdown>
                                );
                            }
                        }
                    ]} 
                />
            </div>
        </Card>
    );    
}