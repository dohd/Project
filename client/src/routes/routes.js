export const Path = {
    root: function() { return '/'; },
    register: function() { return '/register'; },
    login: function() { return '/login'; },
    passwordRecover: function() { return '/recover-password'; },

    home: function() { return '/home'; },
    users: function() { return `${this.home()}/users`; },
    settings: function() { return `${this.home()}/settings`; },
    donors: function() { return `${this.home()}/donors`; },
    donorContacts: function() { return `${this.home()}/donor-contact-person`; },
    responses: function() { return `${this.home()}/responses`; },
    caseStudies: function() { return `${this.home()}/case-studies`; },
    groups: function() { return `${this.home()}/target-groups`; },
    programmes: function() { return `${this.home()}/key-programmes`; },
    regions: function() { return `${this.home()}/target-regions`; },
    eventPlans: function() { return `${this.home()}/activity-plans`; },
    participantAnalysis: function() { return `${this.home()}/participant-analysis`; },
    proposals: function() { return `${this.home()}/proposals`; },
    eventPhotos: function() { return `${this.home()}/event-activities`; },
    implement: function() { return `${this.home()}/pending-action-implementation`; },
    pendingReport: function() { return `${this.home()}/activities-pending-narrative-report`; },
    graphs: function() { return `${this.home()}/data-visualization`; },
    reportActivity: function() { return `${this.home()}/report-activity`; },

    reportView: function() { return `${this.reportActivity()}/:activityId/report`; },


    updatePendingAgenda: function() { return `${this.pendingReport()}/:activityId/agenda`; },
    updatePendingReport: function() { 
        return `${this.pendingReport()}/:activityId/create-narrative-report`; 
    },
    implementParticipant: function() { 
        return `${this.implement()}/:activityId/create-participant`; 
    },

    activityPhoto: function() { return `${this.eventPhotos()}/:activityId/photos`; },

    createProposal: function() { return `${this.proposals()}/create`; },
    updateProposal: function() { return `${this.proposals()}/:proposalId/update`; },
    objectives: function() { return `${this.proposals()}/:proposalId/objectives`; },

    activities: function() { return `${this.objectives()}/:objectiveId/activities`; },
    activityPlans: function() { return `${this.activities()}/:activityId/activity-plans`; },
    participants: function() { return `${this.activityPlans()}/:activityPlanId/participants`; },
    agenda: function() { return `${this.participants()}/agenda`; },
    narrativeReport: function() {
        return `${this.activities()}/:activityId/create-narrative-report`;
    },

    planParticipant: function () { return`${this.eventPlans()}/:planId/create-participant`; },

    createParticipant: function() { return `${this.participants()}/create`; },
    updateParticipant: function() { return `${this.participants()}/:participantId/update`; },
};