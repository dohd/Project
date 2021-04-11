import { useReducer } from 'react';
import { createContainer } from 'react-tracked';
import { reducer } from './reducer';

const initial_state = {
    programmeGraph: {},
    participantAnalysis: [],
    gender: [],
    avatarImage: '',
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
    const string = typeof payload === 'string';
    const isArray = Array.isArray(payload);
    return isObject || isArray || string;
};

export const { Provider, useTracked } = createContainer(
    () => useReducer(reducer, initial_state)
);
