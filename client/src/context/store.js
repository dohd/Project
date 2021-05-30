import { useReducer } from 'react';
import { createContainer } from 'react-tracked';
import { reducer } from './reducer';

const initialState = {
    pendingPlans: [],
    pendingParticipants: [],
    pendingReports: [],
    activitySchedule: [],
    activityCount: {},
    regionGraph: {},
    programmeGraph: {},
    participantAnalysis: [],
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
    const isArray = Array.isArray(payload);
    const isObject = typeof payload === 'object';
    return isArray || isObject;
};

export const { Provider, useTracked } = createContainer(
    () => useReducer(reducer, initialState)
);
