import { Path } from './routes';

const RouteNameMap = {
    [Path.home()]: 'Dashboard',
    [Path.proposals()]: 'Project Proposals',
    [Path.createProposal()]: 'Create Proposal',
    [Path.updateProposal()]: 'Update Proposal',
    [Path.objectives()]: 'Objectives',
    [Path.activities()]: 'Activities',
    [Path.implement()]: 'Pending Implementation Action',
    [Path.agenda()]: 'Agenda',
    [Path.updatePendingAgenda()]: 'Agenda',
    [Path.createPlan()]: 'Create Plan',
    [Path.participants()]: 'Participants',
    [Path.createParticipant()]: 'Create',
    [Path.planParticipant()]: 'Create Participant',
    [Path.implementParticipant()]: 'Create Participant',
    [Path.updateParticipant()]: 'Update Participant',
    [Path.narrativeReport()]: 'Create Narrative Report',
    [Path.updatePendingReport()]: 'Create Narrative Report',
    [Path.pendingReport()]: 'Pending Report Activities',
    [Path.donors()]: 'Project Donors',
    [Path.donorContacts()]: 'Project -> Donor-Info -> Contact',
    [Path.activityPlans()]: 'Activity Plan',
    [Path.participantAnalysis()]: 'Participant Analysis',
    [Path.regions()]: 'Organisation Target Regions',
    [Path.programmes()]: 'Organisation Key Programmes',
    [Path.groups()]: 'Organisation Target Groups',
    [Path.responses()]: 'Narrative Report Responses',
    [Path.caseStudies()]: 'Narrative Report Case Studies',
    [Path.eventPhotos()]: 'Narrative Report Event Activities',
    [Path.activityPhoto()]: 'Event Photos',
    [Path.users()]: 'Account Users',
    [Path.settings()]: 'Account Settings',
    [Path.graphs()]: 'Data Visualization',
    
    [Path.reportActivity()]: 'Report Activity',
    [Path.reportView()]: 'Report View'
};

export default RouteNameMap;