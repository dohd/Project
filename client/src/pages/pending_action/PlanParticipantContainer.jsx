import React, { useEffect, useState } from 'react';

import ActivityPlans from './PlanParticipant';
import { useTracked } from 'context';

export default function PlanParticipantContainer() {
    const store = useTracked()[0];

    const [activityPlans, setActivityPlans] = useState([]);
    useEffect(() => {
        const plans = store.pendingParticipants.map(v => ({
            ...v, key: v.id, plan: v.title
        }));
        setActivityPlans(plans);
    }, [store.pendingParticipants]);
    
    const props = { activityPlans };
    return <ActivityPlans {...props} />; 
}
