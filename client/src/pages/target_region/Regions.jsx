import React, { useState, useRef } from 'react';
import { Card, Table, Button, Input, Space } from 'antd';
import {
    PlusOutlined, EditTwoTone, DeleteOutlined,
    SearchOutlined, FilePdfOutlined
} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import CreateRegion from './AddRegionModal';
import UpdateRegion from './EditRegionModal';

export default function Regions(props) {
    const { 
        state, visible, setVisible, showModal, 
        showUpdateModal, onDelete, fetchRegions,
        tableView, onExport, onPageChange
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
        <Card
            title='Region of Implementation'
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
            <CreateRegion
                visible={visible.create}
                setVisible={setVisible}
                fetchRegions={fetchRegions}
            />
            <UpdateRegion
                record={state.record} 
                visible={visible.update}
                setVisible={setVisible}
                fetchRegions={fetchRegions}
            />
            <div ref={tableView}>
                <Table 
                    dataSource={state.regions}
                    pagination={{
                        pageSize: state.pageSize,
                        total: state.regions.length,
                        onChange: onPageChange
                    }}
                    columns={[
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
                            render: (text, record) => {
                                return (
                                    <div>
                                        <Button 
                                            type='link' 
                                            onClick={() => showUpdateModal(record)}
                                        >
                                            <EditTwoTone style={{ fontSize: '20px' }} />
                                        </Button>
                                        <Button 
                                            type='link' 
                                            onClick={() => onDelete(record.key)}
                                        >
                                            <DeleteOutlined 
                                                style={{color: 'red', fontSize: '18px'}} 
                                            />
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