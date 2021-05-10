const Path = {
    get root() { return '/'; },
    get register() { return '/register'; },
    get login() { return '/login'; },
    get passwordRecover() { return '/recover-password'; },

    get home() { return '/home'; },
    get users() { return `${this.home}/users`; },
    get settings() { return `${this.home}/settings`; },
    get donors() { return `${this.home}/donors`; },
    get donorContacts() { return `${this.home}/donor-contact-person`; },
    get responses() { return `${this.home}/responses`; },
    get groups() { return `${this.home}/target-groups`; },
    get programmes() { return `${this.home}/key-programmes`; },
    get regions() { return `${this.home}/target-regions`; },
    get eventCalendar() { return `${this.home}/event-calendar`; },
    get participantAnalysis() { return `${this.home}/participant-analysis`; },
    get proposals() { return `${this.home}/proposals`; },
    get implement() { return `${this.home}/pending-action-implementation`; },
    get pendingReport() { return `${this.home}/activities-pending-narrative-report`; },
    get graphs() { return `${this.home}/data-visualization`; },
    get activityReport() { return `${this.home}/activity-report`; },
    get eventImages() { return `${this.home}/event-images`; },
    get pendingActivities() { return `${this.home}/pending-activities`; },
    get pendingPlans() { return `${this.home}/plan-participants`; },
    get pendingActivityReport() { return `${this.home}/pending-activity-reports`; },

    get reportView() { return `${this.activityReport}/:activityId/report`; },
    get reportImages() { return `${this.activityReport}/:narrativeReportId/images`; },
    get reportResponses() { return `${this.activityReport}/:narrativeReportId/responses`; },

    get updatePendingAgenda() { return `${this.pendingReport}/:activityId/agenda`; },
    get updatePendingReport() { 
        return `${this.pendingReport}/:activityId/create-narrative-report`; 
    },
    get implementParticipant() { 
        return `${this.implement}/:activityId/create-participant`; 
    },

    get caseStudies() { return `${this.activityReport}/:activityId/case-studies`; },
    get activityPhoto() { return `${this.eventImages}/:activityId/photos`; },

    get createProposal() { return `${this.proposals}/create`; },
    get updateProposal() { return `${this.proposals}/:proposalId/update`; },
    get objectives() { return `${this.proposals}/:proposalId/objectives`; },

    get activities() { return `${this.objectives}/:objectiveId/activities`; },
    get activityPlans() { return `${this.activities}/:activityId/activity-plans`; },
    get participants() { return `${this.activityPlans}/:activityPlanId/participants`; },
    get agenda() { return `${this.participants}/agenda`; },
    get narrativeReport() { return `${this.agenda}/create-narrative-report`; },

    get planParticipant()  { return`${this.eventCalendar}/:planId/create-participant`; },

    get createParticipant() { return `${this.participants}/create`; },
    get updateParticipant() { return `${this.participants}/:participantId/update`; },
};

export default Path;