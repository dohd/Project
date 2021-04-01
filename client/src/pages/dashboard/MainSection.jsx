import React from "react";
import { Route, Switch } from 'react-router-dom';
import { Path } from 'routes';
import { 
    AgendaProvider, ProposalProvider, ParticipantProvider, 
    DonorProvider, GroupProvider, ProgrammeProvider, RegionProvider,
    ActivityPlanProvider, QuizProvider,
    NarrativeProvider, EventPhotoProvider,
    DonorContactProvider
} from 'contexts';

import { CreateProposal, Proposals, PendingProposal } from '../proposal';
import { 
    CreateParticipant, Participants, UpdateParticipant, 
} from "../participant";
import { ParticipantAnalysis } from '../participant_analysis';
import { Implement, PendingReport } from '../pending_action';
import { ActivityPhoto, EventActivity } from '../event_photo';
import { CaseStudy } from '../case_study';
import { TargetGroups } from '../target_group';
import { KeyProgrammes } from '../key_programme';
import { Regions } from '../target_region';
import { EventPlans } from '../event';
import { ActivityPlans  } from '../plan';
import { Narrative } from '../narative_report';
import { Agenda } from '../agenda';
import { Users } from '../user';
import { Donors } from '../donor';
import { DonorContact } from '../donor_contact';
import { Responses } from '../response';
import { Settings } from '../setting';
import { Home } from '../home';
import { Objectives, Activities } from './ObjActWrapper';
import { Bargraph } from '../graphs';
import { ReportActivity, ReportTable } from '../activity_reports';

export default function MainSection({ location, history }) {
    // reset scrollbar position
    window.scrollTo(0,0);

    // const isMatch = () => {
    //     const paths = Object.keys(RouteNameMap);
    //     return paths.includes(location.pathname);
    // };

    return (
        <div>
            <Switch>
                <Route exact path={Path.settings()} component={Settings} />
                <Route exact path={Path.graphs()} component={Bargraph} />
                
                <Route exact path={Path.reportView()} component={ReportTable} />
                <Route exact path={Path.home()} component={Home} />

                <Route exact path={Path.caseStudies()} component={CaseStudy} />
                <Route exact path={Path.users()} component={Users} />

                {/* { !isMatch() && history.push(Path.home()) } */}
            </Switch>

            

            <EventPhotoProvider>
                <Switch>
                    <Route exact path={Path.eventPhotos()} component={EventActivity} />
                    <Route exact path={Path.activityPhoto()} component={ActivityPhoto} />
                </Switch>
            </EventPhotoProvider>

                    
            <ProposalProvider>
                <Switch>
                    <Route exact path={Path.objectives()} component={Objectives} />
                </Switch>

                <DonorProvider>
                    <Switch>
                        <Route exact path={Path.proposals()} component={Proposals} />
                        <Route exact path={Path.createProposal()} component={CreateProposal} />
                        <Route exact path={Path.updateProposal()} component={PendingProposal} />
                        <Route exact path={Path.donors()} component={Donors} />
                    </Switch>
                    <DonorContactProvider>
                        <Switch>
                            <Route exact path={Path.donorContacts()} component={DonorContact} />
                        </Switch>
                    </DonorContactProvider>
                </DonorProvider>

                <ParticipantProvider>
                    <Switch>
                        <Route exact path={Path.participants()} component={Participants} />
                    </Switch>

                    <ActivityPlanProvider>
                        <Switch>
                            <Route exact path={Path.createParticipant()} component={CreateParticipant} />
                            <Route exact path={Path.planParticipant()} component={CreateParticipant} />
                            <Route exact path={Path.implementParticipant()} component={CreateParticipant} />

                            <Route exact path={Path.updateParticipant()} component={UpdateParticipant} />

                            <Route exact path={Path.eventPlans()} component={EventPlans} />
                            <Route exact path={Path.participantAnalysis()} component={ParticipantAnalysis} />
                        </Switch>

                        <ProgrammeProvider>
                            <Switch>
                                <Route exact path={Path.programmes()} component={KeyProgrammes} />
                            </Switch>

                            <GroupProvider>
                                <Switch>
                                    <Route exact path={Path.groups()} component={TargetGroups} />
                                </Switch>

                                <RegionProvider>
                                    <Switch>
                                        <Route exact path={Path.regions()} component={Regions} />
                                        <Route exact path={Path.activityPlans()} component={ActivityPlans} />
                                    </Switch>
                                </RegionProvider>
                            </GroupProvider>
                        </ProgrammeProvider>

                        <QuizProvider>
                            <NarrativeProvider>
                                <Switch>
                                    <Route exact path={Path.responses()} component={Responses} />
                                    <Route exact path={Path.reportActivity()} component={ReportActivity} />
                                </Switch>

                                <AgendaProvider>
                                    <Switch>
                                        <Route exact path={Path.activities()} component={Activities} />
                                        <Route exact path={Path.implement()} component={Implement} />
                                        <Route exact path={Path.pendingReport()} component={PendingReport} />

                                        <Route exact path={Path.agenda()} component={Agenda} />
                                        <Route exact path={Path.updatePendingAgenda()} component={Agenda} />
                                        <Route exact path={Path.narrativeReport()} component={Narrative} />
                                        <Route exact path={Path.updatePendingReport()} component={Narrative} />
                                    </Switch>
                                </AgendaProvider>
                            </NarrativeProvider>
                        </QuizProvider>
                    </ActivityPlanProvider>
                </ParticipantProvider>
            </ProposalProvider>
        </div>
    );
}