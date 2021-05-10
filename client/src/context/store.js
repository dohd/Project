import { useReducer } from 'react';
import { createContainer } from 'react-tracked';
import { reducer } from './reducer';

const initial_state = {
    pendingPlans: [],
    pendingParticipants: [],
    pendingReports: [],
    activitySchedule: [],
    activityCount: {},
    regionGraph: {},
    programmeGraph: {},
    participantAnalysis: [],
    gender: [],
    profileImage: {},
    eventImages: [],
    orgProfile: {},
    targetGroups: [],
    targetRegions: [],
    keyProgrammes: [],
    donors: [],
    donorContacts: [],
    participants: [],
    proposals: [],
    agenda: [],
    activityPlans: [],
    quiz: [],
    narratives: [],
    caseStudies: [],
    users: [],
    roles: [],
};

export const isValidType = payload => {
    const isObject = typeof payload === 'object';
    const isArray = Array.isArray(payload);
    return isObject || isArray;
};

export const { Provider, useTracked } = createContainer(
    () => useReducer(reducer, initial_state)
);
