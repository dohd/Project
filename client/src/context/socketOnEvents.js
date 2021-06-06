import { clientSocket } from 'utils';

// Socket events mapping to actionType
const socketEventsMap = {
    pendingReports: 'addPendingReports',
    pendingParticipants: 'addPendingParticipants',
    pendingPlans: 'addPendingPlans',
    activitySchedule: 'addActivitySchedule',
    activityCount: 'addActivityCount',
    regionGraph: 'addRegionGraph',
    programmeGraph: 'addProgrammeGraph',
    participantAnalysis: 'addParticipantAnalysis',
    profileImage: 'addProfileImage',
    eventImages: 'addEventImages',
    orgProfile: 'addOrgProfile',
    targetGroups: 'addTargetGroups',
    targetRegions: 'addTargetRegions',
    keyProgrammes: 'addKeyProgrammes',
    donors: 'addDonors',
    donorContacts: 'addDonorContacts',
    participants: 'addParticipants',
    proposals: 'addProposals',
    agenda: 'addAgenda',
    activityPlans: 'addActivityPlans',
    quiz: 'addQuiz',
    narratives: 'addNarratives',
    caseStudies: 'addCaseStudies',
    users: 'addUsers',
    roles: 'addRoles',
};

export const socketUpdateResources = dispatch => {
    for (const key in socketEventsMap) {
        clientSocket.on(key, dispatch, socketEventsMap[key]);
    }
};