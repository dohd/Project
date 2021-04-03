import React, { useState, useRef } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import { Card, Table, Button, Space,  Input } from 'antd';
import { 
    ArrowLeftOutlined, PlusOutlined, SearchOutlined,
    FilePdfOutlined
} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

import AddActivity from './AddActivityModal';
import { parseUrl } from 'utils';
import { Path } from 'routes';

export default function PlanActivities(props) {
    const {
        activities, visible, setVisible, 
        showModal, onExport, fetchProposals
    } = props;
    const history = useHistory();
    const params = useParams();

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
                visible={visible}
                setVisible={setVisible}
                fetchProposals={fetchProposals}
            />

            <Table 
                dataSource={activities} 
                columns={[
                    {
                        title: 'Activity',
                        dataIndex: 'activity',
                        key: 'activity',
                        ...getColumnSearchProps('activity')
                    },
                    {
                        title: 'Action',
                        dataIndex: 'action',
                        key: 'action',
                        render: (text, {key}) => {
                            const obj = {activityId: key, ...params};
                            const path = parseUrl(Path.activityPlans(), obj);
                            return <Link to={path}>Plans</Link>;
                        }
                    }
                ]} 
            />
        </Card>
    );    
}