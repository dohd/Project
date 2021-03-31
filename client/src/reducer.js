export const reducer = (state, action) => {
    switch (action.type) {
        case 'addAvatar':
            return {...state, avatar: action.payload};

        case 'addEventPhoto':
            return {...state, eventPhoto: action.payload};

        case 'addOrgProfile':
            return {...state, orgProfile: action.payload};

        case 'addTargetGroup':
            return {...state, targetGroups: action.payload};

        case 'addTargetRegion':
            return {...state, regions: action.payload};

        case 'addKeyProgramme':
            return {...state, programmes: action.payload};

        case 'addDonor':
            return {...state, donors: action.payload};

        case 'addDonorContact':
            return {...state, donorContacts: action.payload};

        case 'addParticipant':
            return {...state, participants: action.payload};

        case 'addProposals':
            return {...state, proposals: action.payload};

        case 'addAgenda':
            return {...state, agenda: action.payload};

        case 'addActivityPlan':
            return {...state, activityPlans: action.payload}

        case 'addQuiz': 
            return {...state, quiz: action.payload};

        case 'addNarrative':
            return {...state, narratives: action.payload};

        case 'addCaseStudy':
            return {...state, caseStudies: action.payload};

        case 'addUser':
            return {...state, users: action.payload};

        case 'addRole':
            return {...state, roles: action.payload}

        default:
            throw new Error("Invalid action type");
    }
};