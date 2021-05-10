import React, { useRef, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { 
    Card, Table, Button, Tag, Menu, Dropdown, 
    Input, Space, Popconfirm 
} from 'antd';
import { 
    PlusOutlined, SearchOutlined, FilePdfOutlined,
    DownOutlined, DeleteOutlined
} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

import ApprovedProposal from './ApprovedProposalModal';
import { Path } from 'routes';
import { parseUrl } from 'utils';

export default function Proposal(props) {
    const {
        onDelete, visible, setVisible,
        showModal, onExport, state, setPendingObj, 
        setApprovedObj, fetchProposals
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
                        style={{ width: 188, marginBottom: 8, display: 'block' }}
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
            title='Grant Proposals' 
            bordered={false}
            extra={
                <Space>
                    <Button 
                        type='primary' 
                        icon={<PlusOutlined />} 
                        onClick={() => history.push(Path.createProposal)}
                    >
                        Create           
                    </Button>
                    <Button type='primary' onClick={onExport}>
                        <FilePdfOutlined />Export           
                    </Button>
                </Space>    
            } 
        >
            <ApprovedProposal 
                visible={visible}
                setVisible={setVisible}
                record={state.record}
                fetchProposals={fetchProposals}
            />

            <Table 
                dataSource={state.proposals} 
                columns={[
                    {
                        title: 'Project Title',
                        dataIndex: 'title',
                        key: 'title',
                        ...getColumnSearchProps('title')
                    },
                    {
                        title: 'Period (Start - End)',
                        dataIndex: 'period',
                        key: 'period',
                        render: (text, record) => {
                            const {startPeriod, endPeriod} = record;
                            return (
                                <span>
                                    <div style={{display: 'inline-block'}}>
                                        { startPeriod }
                                    </div> &nbsp;
                                    <div style={{display: 'inline-block'}}>
                                        { endPeriod }
                                    </div>
                                </span>
                            );
                        }
                    },
                    {
                        title: 'Budget (ksh.)',
                        dataIndex: 'budget',
                        key: 'budget',
                        render: text => text.toLocaleString()
                    },
                    {
                        title: 'Date Submitted',
                        dataIndex: 'dateSubmitted',
                        key: 'dateSubmitted'
                    },
                    {
                        title: 'Status',
                        dataIndex: 'status',
                        key: 'status',
                        filters: [
                            { text: 'Pending', value: 0 },
                            { text: 'Approved', value: 1 }
                        ],
                        onFilter: (value, record) => (record.status === value),
                        render: text => {
                            const color = text === 1 ? 'geekblue' : 'green';
                            return <Tag color={color}>{ text === 1 ? 'Approved' : 'Pending' }</Tag>                            
                        }
                    },
                    {
                        title: 'Donor',
                        dataIndex: 'donor',
                        key: 'donor',
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        width: 180,
                        render: (text, record) => {
                            const {key, status} = record;
                            if (status === 1) return (
                                <Dropdown
                                    overlay={
                                        <Menu>
                                            <Menu.Item onClick={() => showModal(record)}>
                                                Update
                                            </Menu.Item>
                                            <Menu.Item>
                                                <Link to={() => setApprovedObj(key)}>
                                                    Objectives
                                                </Link>
                                            </Menu.Item>
                                        </Menu>
                                    }
                                >   
                                    <Button type='link'>
                                        actions <DownOutlined />
                                    </Button>
                                </Dropdown>
                            );
                            
                            const params = {proposalId: key}
                            const path = parseUrl(Path.updateProposal, params);
                            return (
                                <div>
                                    <Dropdown
                                        overlay={
                                            <Menu>
                                                <Menu.Item>
                                                    <Link to={path}>Update</Link>
                                                </Menu.Item>
                                                <Menu.Item>
                                                    <Link to={() => setPendingObj(key)}>
                                                        Objectives
                                                    </Link>
                                                </Menu.Item>
                                            </Menu>
                                        }
                                    >   
                                        <Button type='link'>
                                            actions <DownOutlined />
                                        </Button>
                                    </Dropdown>
                                    <Popconfirm
                                        title='Are you sure to delete this proposal?'
                                        onConfirm={() => onDelete(key)}
                                        okText='Yes'
                                        cancelText='No'
                                    >
                                        <Button 
                                            type='link'
                                            icon={
                                                <DeleteOutlined style={{ color: 'red' }}/>
                                            }
                                        />
                                    </Popconfirm>
                                </div>
                            );
                        }
                    },
                ]}  
            />
        </Card>
    );
} 