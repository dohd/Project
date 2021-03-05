import React, { useState, useEffect, useRef } from 'react';
import { message } from 'antd';
import UrlPattern from 'url-pattern';
import { 
    useProposalContext, useAgendaContext, useActivityPlanContext,
    useParticipantContext, useNarrativeContext
} from 'contexts';
import PlanActivities from './PlanActivities';
import { Path } from 'routes';
import pdfExport from './activityPdfExport';

export default function PlanActivitiesContainer({ match, history }) {
    const [state, setState] = useState({ 
        activities: [], pageSize: 5,
        page: 1, pageCount: 1
    });
    const { objectiveId } = match.params;
    const { proposals, fetchProposals } = useProposalContext();
    const { participants } = useParticipantContext()
    const { narratives } = useNarrativeContext();
    useEffect(() => {
        let activities = [];
        proposal_loop: 
        for(const proposal of proposals) {
            for (const obj of proposal.objectives) {
                if (obj.id === Number(objectiveId)) {
                    activities = obj.activities.map(val => {
                        let counter = 0; 
                        for (const n of narratives) {
                            if (n.activity.id === val.id) {
                                counter++;
                            }
                        }

                        val.key = val.id; 
                        val.activity = val.action;
                        val.reports = counter; 
                        for (const p of participants) {
                            if (p.activityId === val.id) {
                                val.participantStatus = 'Exist';
                                break;
                            }
                        }
                        return val;
                    });
                    break proposal_loop;
                }
            }
        }
        setState(prev => {
            const pageCount = Math.ceil(activities.length/prev.pageSize);
            return {...prev, activities, pageCount};
        });
    }, [objectiveId, proposals, participants, narratives]);

    const createPlan = key => {
        const params = new UrlPattern(Path.activities()).match(match.url);
        const pattern = new UrlPattern(Path.createPlan());
        const path = pattern.stringify({ activityId: key, ...params });
        history.push(path);
    };

    const agendaList = key => {
        const params = new UrlPattern(Path.activities()).match(match.url);
        const pattern = new UrlPattern(Path.agenda());
        const path = pattern.stringify({ activityId: key, ...params });
        history.push(path);
    };

    const { activityPlans } = useActivityPlanContext();
    const participantList = key => {
        let exists;
        for (const plan of activityPlans) {
            if (plan.activity.id === key) {
                exists = true;
                break;
            }
        }
        if (!exists) return message.error('Add plan!');
        const params = new UrlPattern(Path.activities()).match(match.url);
        const pattern = new UrlPattern(Path.participants());
        const path = pattern.stringify({ activityId: key, ...params });
        history.push(path);
    };

    const { agenda } = useAgendaContext();
    const createReport = key => {
        let exists;
        for (const obj of agenda) {
            if (obj.activityId === key) {
                exists = true;
                break;
            }
        }
        if (!exists) return message.error('Add agenda!');
        const params = new UrlPattern(Path.activities()).match(match.url);
        const pattern = new UrlPattern(Path.narrativeReport());
        const path = pattern.stringify({ activityId: key, ...params });
        history.push(path);
    };

    // Modal logic
    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true); 

    const onPageChange = page => setState(prev => ({...prev, page}));
    
    const tableView = useRef();
    const onExport = () => pdfExport(tableView, state);
    
    const props = {
        state, fetchProposals, visible, setVisible, history, 
        showModal, participantList, createReport, createPlan,
        agendaList, objectiveId, tableView, onExport, onPageChange
    };

    return <PlanActivities {...props} />
}