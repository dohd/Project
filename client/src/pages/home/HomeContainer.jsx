import React, { useEffect, useState } from 'react';

import Home from './Home';
import { useTracked } from 'context';

export default function HomeContainer() {
    const store = useTracked()[0];
    
    const [schedule, setSchedule] = useState([]);
    useEffect(() => {
        const schedule = store.activitySchedule.map(v => ({
            key: v.id,
            activity: v.activity.action,
            date: v.planEvents.date,
            days: v.planEvents.daysLeft
        }));
        setSchedule(schedule);
    }, [store.activitySchedule]);

    const [proposals, setProposals] = useState({
        approved: 0, pending: 0
    });
    useEffect(() => {
        const proposals = store.proposals;
        let approved = 0;
        let pending = 0;
        proposals.forEach(v => {
            if (v.status === 1) approved++; 
            else pending++;
        });
        setProposals({ approved, pending });
    }, [store.proposals]);

    const [activity, setActivity] = useState(0);
    useEffect(() => {
        const activity = store.activityCount;
        if (activity.hasOwnProperty('count')) {
            setActivity(activity.count);
        }
    }, [store.activityCount]);

    const props = {
        proposals, activity, schedule,
        donors: store.donors.length,
        activities: store.activityCount.count
    };
    return <Home {...props} />;
}