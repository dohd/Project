import React, { useEffect, useState } from 'react';

import ParticipantAnalysis from './ParticipantAnalysis';
import { useTracked } from 'context';

export default function ParticipantAnalysisContainer() {
    const store = useTracked()[0];
    const [analysis, setAnalysis] = useState([]);

    useEffect(() => {
        const analysis = store.participantAnalysis;
        const list = [];
        analysis.forEach(v => {
            const obj = {};
            obj.key = v.id;
            obj.title = v.activity.action;
            obj.male = v.participants.male;
            obj.female = v.participants.female;
            obj.total = obj.male + obj.female;
            obj.date = v.planEvents.join(', ');
            obj.groups = v.planGroups.join(', ');
            obj.programme = v.planProgramme[0];
            obj.regions = v.planRegions.join(', ');
            list.push(obj);
        });
        setAnalysis(list);
    }, [store.participantAnalysis])

    return <ParticipantAnalysis analysis={analysis} />;
}