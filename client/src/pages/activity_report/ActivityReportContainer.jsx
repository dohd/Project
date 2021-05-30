import React, { useEffect, useState } from 'react';

import ActivityReport from './ActivityReport';
import { useTracked } from 'context';

export default function ActivityReportContainer() {
    const store = useTracked()[0];
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const activities = store.narratives.map(v => ({
            key: v.id, activity: v.action
        }));
        setActivities(activities);
    }, [store.narratives]);

    // modal logic
    const [record, setRecord] = useState([]);
    const [visible, setVisible] = useState({
        response: false, image: false
    });
    const showResponseModal = key => {
        setVisible(prev => ({...prev, response: true}));
        for (const v of store.narratives) {
            if (v.id === key) {
                const reports = v.narratives.map(v => ({
                    key: v.id, report: v.title
                }));
                setRecord(reports);
                break;
            }
        }
    };
    const showImageModal = key => {
        setVisible(prev => ({...prev, image: true}));
        for (const v of store.narratives) {
            if (v.id === key) {
                const reports = v.narratives.map(v => ({
                    key: v.id, report: v.title
                }));
                setRecord(reports);
                break;
            }
        }
    };

    const props = {
        visible, setVisible, record, 
        activities, showResponseModal,
        showImageModal
    };
    return <ActivityReport {...props} />;
}