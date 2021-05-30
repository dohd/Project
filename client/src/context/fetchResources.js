import Api from 'api';

// Api endpoint name mapping to action type
const actionTypeMap = {
    pendingReport: 'addPendingReports',
    pendingParticipant: 'addPendingParticipants',
    pendingPlan: 'addPendingPlans',
    activitySchedule: 'addActivitySchedule',
    activityCount: 'addActivityCount',
    regionGraph: 'addRegionGraph',
    programmeGraph: 'addProgrammeGraph',
    participantAnalysis: 'addParticipantAnalysis',
    profileImage: 'addProfileImage',
    eventImage: 'addEventImages',
    orgProfile: 'addOrgProfile',
    targetGroup: 'addTargetGroups',
    targetRegion: 'addTargetRegions',
    keyProgramme: 'addKeyProgrammes',
    donor: 'addDonors',
    donorContact: 'addDonorContacts',
    participant: 'addParticipants',
    proposal: 'addProposals',
    agenda: 'addAgenda',
    activityPlan: 'addActivityPlans',
    quiz: 'addQuiz',
    narrative: 'addNarratives',
    caseStudy: 'addCaseStudies',
    user: 'addUsers',
    role: 'addRoles',
};

export const fetchResources = dispatch => {
    for (const key in actionTypeMap) {
        Api[key].get()
        .then(res => dispatch({ 
            type: actionTypeMap[key], 
            payload: res
        }));
    }
};