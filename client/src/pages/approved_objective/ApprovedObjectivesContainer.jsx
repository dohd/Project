import React, { useState, useEffect, useRef } from 'react';

import ApprovedObjectives from './ApprovedObjectives';
import pdfExport from './objectivePdfExport';
import { Path } from 'routes';
import { useTracked } from 'context';
import { useParams } from 'react-router-dom';
import { parseUrl } from 'utils';

export default function ApprovedObjectivesContainer({ match, history }) {
    const store = useTracked()[0];
    const [objectives, setObjectives] = useState([]);

    const { proposalId } = useParams();
    useEffect(() => {
        let objectives = [];
        for (const proposal of store.proposals) {
            if (proposal.id === parseInt(proposalId)) {
                objectives = proposal.objectives.map(v => ({
                    key: v.id, objective: v.objective
                }));
                break;
            }
        }
        setObjectives(objectives);
    }, [store.proposals, proposalId]);

    const approvedAct = key => {
        sessionStorage.act_state = 'approved';
        const params = { objectiveId: key, proposalId };
        return parseUrl(Path.activities(), params);
    };

    const tableView = useRef();
    const onExport = () => pdfExport(tableView, objectives);

    const props = { objectives, onExport, approvedAct };
    return <ApprovedObjectives {...props} />;
}