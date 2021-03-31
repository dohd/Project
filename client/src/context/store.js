import { useReducer } from 'react';
import { createContainer } from 'react-tracked';
import { reducer } from './reducer';

const initial_state = {
    avatar: '',
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

export const { Provider, useTracked } = createContainer(
    () => useReducer(reducer, initial_state)
);
