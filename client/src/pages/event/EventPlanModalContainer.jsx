import React, { useState, useEffect } from 'react';

import EventPlanModal from './EventPlanModal';

export default function EventPlanModalContainer(props) {
    const { activityPlans, setVisible, store } = props;

    const onCancel = () => setVisible(false);
    const onOk = () => setVisible(false);

    const [plans, setPlans] = useState([]);
    useEffect(() => {
        const list = activityPlans.map(obj => {
            const plan = { 
                key: obj.id,
                activityId: obj.activity.id,
                activity: obj.activity.action,
                materials: obj.planMaterial.material,
                programme: obj.planProgramme.keyProgramme.programme
            };

            for (const p of store.participants) {
                if (p.activityId === plan.activityId) {
                    plan.status = 'Executed';
                    break;
                }
            }

            const regions = new Set();
            obj.planEvents.forEach(({planRegions}) => {
                planRegions.forEach(({region}) => {
                    regions.add(region.area);
                });
            });

            const groups = new Set();
            obj.planGroups.forEach(({targetGroup}) => {
                groups.add(targetGroup.group);
            });

            plan.regions = [...regions];
            plan.groups = [...groups];
            return plan;
        });
        setPlans(list);
    }, [activityPlans, store.participants]);
    
    const params = { plans, onOk, onCancel, ...props };
    return <EventPlanModal {...params} />;
}