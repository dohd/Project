import React, { useState, useRef } from 'react';
import { Card, Table, Space, Button, Input, Popconfirm } from 'antd';
import { 
    SearchOutlined, FilePdfOutlined, ArrowLeftOutlined,
    EditTwoTone, DeleteOutlined
} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { useHistory } from 'react-router';

import StudyModal from './StudyModal';

export default function CaseStudy(props) {
    const { 
        caseStudies, onExport, record,
        visible, setVisible, showModal,
        onDelete, fetchNarrative
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
                        style={{fontSize: '18px'}} 
                    />                       
                    Case Studies
                </Space>       
            }  
            extra={
                <Button type='primary' onClick={onExport}>
                    <FilePdfOutlined />Export
                </Button>
            }
        >
            <StudyModal
                visible={visible} 
                setVisible={setVisible}
                record={record}
                fetchNarrative={fetchNarrative}
            />

            <Table 
                dataSource={caseStudies}
                columns={[
                    {
                        title: 'Report',
                        dataIndex: 'report',
                        key: 'report',
                        ...getColumnSearchProps('activity')
                    },
                    {
                        title: 'Case Study',
                        dataIndex: 'caseStudy',
                        key: 'caseStudy'
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        render: (txt, record) => {
                            return (
                                <Space>
                                    <Button 
                                        type='link' 
                                        onClick={() => showModal(record)}
                                        icon={
                                            <EditTwoTone style={{ fontSize: '20px' }} />
                                        }
                                    />
                                    
                                    <Popconfirm
                                        title='Are you sure to delete this study?'
                                        onConfirm={() => onDelete(record.key)}
                                        okText='Yes'
                                        cancelText='No'
                                    >
                                        <Button
                                            type='link'
                                            icon={
                                                <DeleteOutlined 
                                                    style={{ color: 'red', fontSize: '18px' }} 
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