import React, { useState, useEffect } from 'react';

import ApprovedObjectives from './ApprovedObjectives';
import { Path } from 'routes';
import { useTracked } from 'context';
import { useParams } from 'react-router-dom';
import { parseUrl } from 'utils';

export default function ApprovedObjectivesContainer() {
    const store = useTracked()[0];
    const [objectives, setObjectives] = useState([]);

    const { proposalId } = useParams();
    useEffect(() => {
        let objectives = [];
        for (const proposal of store.proposals) {
            if (proposal.id === parseInt(proposalId)) {
                objectives = proposal.objectives.map(v => ({
                    key: v.id, 
                    objective: v.objective,
                    updatedAt: new Date(v.updatedAt)
                }))
                .sort((a,b) => b.updatedAt - a.updatedAt);
                break;
            }
        }
        setObjectives(objectives);
    }, [store.proposals, proposalId]);

    const approvedAct = key => {
        sessionStorage.setItem('activityState', 'approved');
        const params = { objectiveId: key, proposalId };
        return parseUrl(Path.activities, params);
    };

    const props = { objectives, approvedAct };
    return <ApprovedObjectives {...props} />;
}