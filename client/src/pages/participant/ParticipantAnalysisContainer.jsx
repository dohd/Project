import React, { useEffect, useState, useRef } from 'react';
import { useActivityPlanContext, useParticipantContext } from 'contexts';
import ParticipantAnalysis from './ParticipantAnalysis';
import pdfExport from './analysisPdfExport';

export default function ParticipantAnalysisContainer() {
    const { activityPlans } = useActivityPlanContext();
    const { participants } = useParticipantContext();
    const [state, setState] = useState({
        analysis: [], pageSize: 5,
        page: 1, pageCount: 1
    });

    useEffect(() => {
        const analysis_report = [];
        for (const plan of activityPlans) {
            const data = { key: plan.id };
            const dates = new Set();
            let males = 0;
            let females = 0;
            let trans = 0;

            for (const participant of participants) {
                if (plan.activity.id === participant.activityId) {
                    const { planProgramme } = plan;
                    const { keyProgrammeId } = participant;

                    if (planProgramme.keyProgramme.id === keyProgrammeId) {
                        const { gender } = participant;
                        if (gender.type === 'Male') males++;
                        if (gender.type === 'Female') females++;
                        if (gender.type === 'Other') trans++;

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

                        data.regions = [...regions];
                        data.groups = [...groups];
                        data.title = plan.activity.action;
                        data.programme = plan.planProgramme.keyProgramme.programme;

                        dates.add(participant.activityDate);
                    }
                }
            }

            data.activityDate = [...dates];
            data.male = males;
            data.female = females;
            data.trans = trans;
            data.total = males + females + trans;
            analysis_report.push(data);
        }
        setState(prev => {
            const pageCount = Math.ceil(analysis_report.length/prev.pageSize);
            return {...prev, analysis: analysis_report, pageCount};
        });
    }, [participants, activityPlans]);

    const onPageChange = page => setState(prev => ({...prev, page}));

    const tableView = useRef();
    const onExport = () => pdfExport(tableView, state);

    const props = { state, onExport, tableView, onPageChange };

    return <ParticipantAnalysis {...props} />;
}