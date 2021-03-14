import React from 'react';
import ActivityPlans from './ActivityPlans';
import UrlPattern from 'url-pattern';
import { Path } from 'routes';

export default function ActivityPlansContainer({ match, history }) {
    const addPlanPage = key => {
        const params = new UrlPattern(Path.activityPlans()).match(match.url);
        const pattern = new UrlPattern(Path.createPlan());
        const path = pattern.stringify({ activityId: key, ...params });
        history.push(path);
    };
    
    const props = { addPlanPage };
    return <ActivityPlans {...props} />
}