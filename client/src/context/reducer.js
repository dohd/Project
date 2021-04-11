import { isValidType } from './store';

export const reducer = (state, action) => {
    if (!isValidType(action.payload)) return state;

    switch (action.type) {
        case 'addActivityCount':
            return {...state, activityCount: action.payload}

        case 'addRegionGraph':
            return {...state, regionGraph: action.payload}

        case 'addProgrammeGraph':
            return {...state, programmeGraph: action.payload}

        case 'addParticipantAnalysis':
            return {...state, participantAnalysis: action.payload}
            
        case 'addGender':
            return {...state, gender: action.payload}

        case 'addAvatarImage':
            return {...state, avatarImage: action.payload};

        case 'addEventImages':
            return {...state, eventImages: action.payload};

        case 'addOrgProfile':
            return {...state, orgProfile: action.payload};

        case 'addTargetGroups':
            return {...state, targetGroups: action.payload};

        case 'addTargetRegions':
            return {...state, targetRegions: action.payload};

        case 'addKeyProgrammes':
            return {...state, keyProgrammes: action.payload};

        case 'addDonors':
            return {...state, donors: action.payload};

        case 'addDonorContacts':
            return {...state, donorContacts: action.payload};

        case 'addParticipants':
            return {...state, participants: action.payload};

        case 'addProposals':
            return {...state, proposals: action.payload};

        case 'addAgenda':
            return {...state, agenda: action.payload};

        case 'addActivityPlans':
            return {...state, activityPlans: action.payload}

        case 'addQuiz': 
            return {...state, quiz: action.payload};

        case 'addNarratives':
            return {...state, narratives: action.payload};

        case 'addCaseStudies':
            return {...state, caseStudies: action.payload};

        case 'addUsers':
            return {...state, users: action.payload};

        case 'addRoles':
            return {...state, roles: action.payload}

        default:
            throw new Error("Invalid action type: " + action.type);
    }
};