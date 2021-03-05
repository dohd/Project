import React, { useState, useEffect, useRef } from 'react';
import { useProposalContext } from 'contexts';
import PlanObjectives from './PlanObjectives';
import UrlPattern from 'url-pattern';
import { Path } from 'routes';
import pdfExport from './objectivePdfExport';

export default function PlanObjectivesContainer({ match, history }) {
    const [state, setState] = useState({ 
        objectives: [], pageSize: 5,
        page: 1, pageCount: 1 
    });

    const { proposals } = useProposalContext();
    useEffect(() => {
        let objectives = [];
        const { proposalId } = match.params;
        for (const prop of proposals) {
            if (prop.id === Number(proposalId)) {
                objectives = prop.objectives.map(val => ({
                    key: val.id, objective: val.objective
                }));
                break;
            }
        }
        setState(prev => {
            const pageCount = Math.ceil(objectives.length/prev.pageSize);
            return {...prev, objectives, pageCount };
        });
    }, [proposals, match]);

    const setApprovedAct = key => {
        sessionStorage.act_state = 'approved';
        const params = new UrlPattern(Path.objectives()).match(match.url);
        const pattern = new UrlPattern(Path.activities());
        const path = pattern.stringify({ objectiveId: key, ...params });
        history.push(path);
    };

    const onPageChange = page => setState(prev => ({...prev, page}));

    const tableView = useRef();
    const onExport = () => pdfExport(tableView, state);

    const props = { 
        state, tableView, onExport,
        onPageChange, history,
        setApprovedAct
    };

    return <PlanObjectives {...props} />;
}