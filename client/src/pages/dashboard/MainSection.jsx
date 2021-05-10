import React from "react";
import { Route, Switch } from 'react-router-dom';

import { Path } from 'routes';

import { CreateProposal, Proposals } from '../grant_proposal';
import { EditPendingProposal } from '../pending_proposal';
import { 
    CreateParticipant, 
    Participants, 
    UpdateParticipant, 
} from '../participant';
import { ParticipantAnalysis } from '../participant_analysis';
import { TargetGroups } from '../target_group';
import { KeyProgrammes } from '../key_programme';
import { Regions } from '../target_region';
import { EventPlan } from '../event';
import { ActivityPlans  } from '../plan';
import { Narrative } from '../narative_report';
import { Agenda } from '../agenda';
import { Users } from '../user';
import { Donors } from '../donor';
import { DonorContact } from '../donor_contact';
import { Settings } from '../setting';
import { Home } from '../home';
import { Objectives, Activities } from './ObjActWrapper';
import { Bargraph } from '../graphs';
import { ActivityReport } from '../activity_report';
import { CaseStudy } from '../case_study';
import {  ReportImage } from '../report_image';
import { ReportResponse } from '../report_response';
import { 
    PendingActivity, 
    PlanParticipant, 
    PendingReport 
} from '../pending_action';

export default function MainSection() {
    // reset scrollbar position
    window.scrollTo(0,0);

    return (
        <>
            <Switch>
                <Route exact path={Path.pendingActivityReport} component={PendingReport} />

                <Route exact path={Path.pendingPlans} component={PlanParticipant} />

                <Route exact path={Path.pendingActivities} component={PendingActivity} />

                <Route exact path={Path.reportResponses} component={ReportResponse} />

                <Route exact path={Path.reportImages} component={ReportImage} />

                <Route exact path={Path.settings} component={Settings} />
                <Route exact path={Path.graphs} component={Bargraph} />
                
                <Route exact path={Path.home} component={Home} />

                <Route exact path={Path.caseStudies} component={CaseStudy} />
                <Route exact path={Path.users} component={Users} />

                <Route exact path={Path.objectives} component={Objectives} />
                <Route exact path={Path.proposals} component={Proposals} />
                <Route exact path={Path.createProposal} component={CreateProposal} />
                <Route exact path={Path.updateProposal} component={EditPendingProposal} />
                <Route exact path={Path.donors} component={Donors} />

                <Route exact path={Path.donorContacts} component={DonorContact} />
                <Route exact path={Path.participants} component={Participants} />

                <Route exact path={Path.createParticipant} component={CreateParticipant} />
                <Route exact path={Path.planParticipant} component={CreateParticipant} />
                <Route exact path={Path.implementParticipant} component={CreateParticipant} />

                <Route exact path={Path.updateParticipant} component={UpdateParticipant} />

                <Route exact path={Path.eventCalendar} component={EventPlan} />
                <Route exact path={Path.participantAnalysis} component={ParticipantAnalysis} />

                <Route exact path={Path.programmes} component={KeyProgrammes} />
                <Route exact path={Path.groups} component={TargetGroups} />

                <Route exact path={Path.regions} component={Regions} />
                <Route exact path={Path.activityPlans} component={ActivityPlans} />

                
                <Route exact path={Path.activityReport} component={ActivityReport} />

                <Route exact path={Path.activities} component={Activities} />

                <Route exact path={Path.agenda} component={Agenda} />
                <Route exact path={Path.updatePendingAgenda} component={Agenda} />
                <Route exact path={Path.narrativeReport} component={Narrative} />
                <Route exact path={Path.updatePendingReport} component={Narrative} />
            </Switch>
        </>
    );
}