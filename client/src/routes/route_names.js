import Path from './routes';

const RouteNameMap = {
    [Path.home()]: 'Dashboard',
    [Path.proposals()]: 'Proposals',
    [Path.createProposal()]: 'Create Proposal',
    [Path.updateProposal()]: 'Update Proposal',
    [Path.objectives()]: 'Objectives',
    [Path.activities()]: 'Activities',
    [Path.implement()]: 'Pending Implementation Action',
    [Path.agenda()]: 'Agenda',
    [Path.updatePendingAgenda()]: 'Agenda',
    [Path.participants()]: 'Participants',
    [Path.createParticipant()]: 'Create',
    [Path.planParticipant()]: 'Create Participant',
    [Path.implementParticipant()]: 'Create Participant',
    [Path.updateParticipant()]: 'Update Participant',
    [Path.narrativeReport()]: 'Create Narrative Report',
    [Path.updatePendingReport()]: 'Create Narrative Report',
    [Path.pendingReport()]: 'Pending Report Activities',
    [Path.donors()]: 'Donors',
    [Path.donorContacts()]: 'Donor Contacts',
    [Path.eventCalendar()]: 'Event Calendar',
    [Path.activityPlans()]: 'Activity Plans',
    [Path.participantAnalysis()]: 'Participant Analysis',
    [Path.regions()]: 'Target Regions',
    [Path.programmes()]: 'Key Programmes',
    [Path.groups()]: 'Target Groups',
    [Path.responses()]: 'Responses',
    [Path.eventPhotos()]: 'Event Activities',
    [Path.activityPhoto()]: 'Event Photos',
    [Path.users()]: 'Users',
    [Path.settings()]: 'Settings',
    [Path.graphs()]: 'Data Visualization',
    
    [Path.activityReport()]: 'Activity Report',
    [Path.caseStudies()]: 'Case Studies',
    [Path.reportView()]: 'Report View'
};

export default RouteNameMap;