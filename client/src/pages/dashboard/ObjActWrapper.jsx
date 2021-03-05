import React from 'react';
import { PlanObjectives, PlanActivities } from '../implement';
import { PendingObjectives } from '../pending_objective';
import { PendingActivities } from '../pending_activity';

export function Objectives(props) {
    const state = sessionStorage.getItem('obj_state');
    return (
        state === 'approved' ? 
        <PlanObjectives {...props} /> : 
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