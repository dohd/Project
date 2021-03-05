import React, { createContext, useState, useEffect, useContext } from 'react';
import Api from 'api';

const ActivityPlanContext = createContext(null);

export default function ActivityPlanProvider({ children }) {
    const [activityPlans, setActivityPlans] = useState([]);
    
    const fetchAcitivityPlans = () => {
        Api.activityPlan.get()
        .then(res => setActivityPlans(res))
        .catch(err => console.log(err));
    };

    useEffect(fetchAcitivityPlans, []);
    
    return (
        <ActivityPlanContext.Provider 
            value={{ activityPlans, fetchAcitivityPlans }}
        >
            { children }
        </ActivityPlanContext.Provider>
    );    
}

export const useActivityPlanContext = () => useContext(ActivityPlanContext);
