import React from 'react';
import { PlanActivities } from '../implementation_plan';
import { ApprovedObjectives } from '../approved_objective';
import { PendingObjectives } from '../pending_objective';
import { PendingActivities } from '../pending_activity';

export function Objectives(props) {
    const state = sessionStorage.getItem('obj_state');
    return (
        state === 'approved' ? 
        <ApprovedObjectives {...props} /> : 
        <PendingObjectives {...props} />
    );
}

export function Activities(props) {
    const state = sessionStorage.getItem('act_state');
    return (
        state === 'approved' ?
        <PlanActivities {...props} /> :
        <PendingActivities {...props} />
    );
}