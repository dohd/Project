import React, { useEffect, useState, useRef } from 'react';
import { Card, Table, Button, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
// import UrlPattern from 'url-pattern';

// import { Path } from 'routes';
import { useTracked } from 'context';

export default function EventActivity({ match, history }) {
    const store = useTracked()[0];
    const [activities, setActivities] = useState([]);
    useEffect(() => {
        const list = store.eventImages.map(({id, activity}) => ({
            key: activity.id, 
            action: activity.action,
            reportId: id
        }));
        setActivities(list);
    }, [store.eventImages]);

    // const accessPhoto = (key, reportId) => {
    //     const pattern = new UrlPattern(Path.activityPhoto());
    //     const path = pattern.stringify({ activityId: key });
    //     history.push({ pathname: path, state: { reportId } });
    // };

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
            title='Event Activities'
            bordered={false}
        >
            <Table 
                dataSource={activities}
                columns={[
                    {
                        title: 'Activity',
                        dataIndex: 'action',
                        key: 'action',
                        ...getColumnSearchProps('action')
                    },
                    {
                        title: 'Action',
                        render: (text, record) => {
                            // const {key, reportId} = record;
                            return (
                                <Button
                                    // onClick={() => accessPhoto(key, reportId)}
                                    type='link'
                                >
                                    Event photos
                                </Button>
                            );
                        }
                    }
                ]}
            />
        </Card>
    );
}