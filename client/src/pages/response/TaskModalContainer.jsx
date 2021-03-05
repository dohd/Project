import React, { useState, useEffect, useRef } from 'react';
import { useNarrativeContext, useActivityPlanContext } from 'contexts';
import Task from './TaskModal'
import pdfExport from './pdfExport';

export default function TaskModalContainer(props) {
    const { record, visible, setVisible } = props;

    const { narratives } = useNarrativeContext();
    const { activityPlans } = useActivityPlanContext();
    const [state, setState] = useState({
        responses: [], pageSize: 5,
        page: 1, pageCount: 1
    });

    useEffect(() => {
        const narrative_responses = [];
        for (const narrative of narratives) {
            for (const plan of activityPlans) {
                if (narrative.activity.id === plan.activity.id) {
                    for (const response of narrative.responses) {
                        if (response.narrativeQuizId === record.key) {
                            const data = {
                                key: response.id,
                                task: response.agenda.task,
                                response: response.response,
                                activity: narrative.activity.action,
                                programme: plan.planProgramme.keyProgramme.programme
                            };

                            const regions = new Set();
                            plan.planEvents.forEach(({planRegions}) => {
                                planRegions.forEach(({region}) => {
                                    regions.add(region.area);
                                });
                            });
                    
                            const groups = new Set();
                            plan.planGroups.forEach(({targetGroup}) => {
                                groups.add(targetGroup.group);
                            });

                            // Converting array into string for visual render 
                            data.regions = [...regions].join(', ');
                            data.groups = [...groups].join(', ');

                            narrative_responses.push(data);
                        }
                    }
                }
            }
        }
        setState(prev => {
            const pageCount = Math.ceil(narrative_responses.length/prev.pageSize);
            return {...prev, responses: narrative_responses, pageCount};
        });
    }, [narratives, record, activityPlans]);

    const onPageChange = page => setState(prev => ({...prev, page}));

    const tableView = useRef();
    const onExport = () => pdfExport(tableView, state);

    const params = {
        visible, setVisible, state, 
        tableView, onExport, onPageChange
    };

    return <Task {...params} />; 
}