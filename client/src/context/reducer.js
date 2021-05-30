import { isValidType } from './store';

export const reducer = (state, action) => {
    const { type, payload } = action;
    if (!isValidType(payload)) return state;

    switch (type) {
        case 'addPendingReports':
            return {...state, pendingReports: payload}

        case 'addPendingParticipants':
            return {...state, pendingParticipants: payload}

        case 'addPendingPlans':
            return {...state, pendingPlans: payload}

        case 'addActivitySchedule':
            return {...state, activitySchedule: payload}

        case 'addActivityCount':
            return {...state, activityCount: payload}

        case 'addRegionGraph':
            return {...state, regionGraph: payload}

        case 'addProgrammeGraph':
            return {...state, programmeGraph: payload}

        case 'addParticipantAnalysis':
            return {...state, participantAnalysis: payload}
            
        case 'addProfileImage':
            return {...state, profileImage: payload};

        case 'addEventImages':
            return {...state, eventImages: payload};

        case 'addOrgProfile':
            return {...state, orgProfile: payload};

        case 'addTargetGroups':
            return {...state, targetGroups: payload};

        case 'addTargetRegions':
            return {...state, targetRegions: payload};

        case 'addKeyProgrammes':
            return {...state, keyProgrammes: payload};

        case 'addDonors':
            return {...state, donors: payload};

        case 'addDonorContacts':
            return {...state, donorContacts: payload};

        case 'addParticipants':
            return {...state, participants: payload};

        case 'addProposals':
            return {...state, proposals: payload};

        case 'addAgenda':
            return {...state, agenda: payload};

        case 'addActivityPlans':
            return {...state, activityPlans: payload}

        case 'addQuiz': 
            return {...state, quiz: payload};

        case 'addNarratives':
            return {...state, narratives: payload};

        case 'addCaseStudies':
            return {...state, caseStudies: payload};

        case 'addUsers':
            return {...state, users: payload};

        case 'addRoles':
            return {...state, roles: payload}

        default:
            throw new Error("Invalid action type: " + type);
    }
};