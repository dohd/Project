import { useReducer } from 'react';
import { createContainer } from 'react-tracked';
import { reducer } from './reducer';

const initial_state = {
    avatar: '',
    eventPhoto: [],
    orgProfile: {},
    targetGroups: [],
    regions: [],
    programmes: [],
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
