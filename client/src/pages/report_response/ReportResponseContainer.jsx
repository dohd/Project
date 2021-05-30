import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import ReportResponse from './ReportResponse';
import { useTracked } from 'context';
import Api from 'api';

const fetchNarrative = dispatch => {
    Api.narrative.get()
    .then(res => dispatch({
        type: 'addNarratives',
        payload: res
    }));
};

export default function ReportResponseContainer() {
    const { narrativeReportId } = useParams();

    const [store, dispatch] = useTracked();
    const [state, setState] = useState({
        quiz: [], responses: []
    });

    useEffect(() => {
        const report = {};
        for (const v of store.narratives) {
            for (const n of v.narratives) {
                if (n.id === parseInt(narrativeReportId)) {
                    const quizMap = n.responses.reduce((r,c) => {
                        const key = c.narrativeQuiz.id;
                        const quiz = c.narrativeQuiz.query;
                        if (!r[key]) r[key] = { key, quiz };
                        return r;    
                    }, {});
    
                    report.quiz = Object.values(quizMap);
                    report.responses = n.responses.map(v => ({ 
                        key: v.id,  
                        task: v.agenda.task, 
                        response: v.response,
                        quizId: v.narrativeQuiz.id
                    }));
                    break;
                }
            }
        }
        setState(report);
    }, [store.narratives, narrativeReportId]);

    const onDelete = key => {
        Api.narrativeResponse.delete(key)
        .then(res => fetchNarrative(dispatch));
    };

    // modal logic
    const [record, setRecord] = useState({});
    const [visible, setVisible] = useState(false);
    const showModal = record => {
        setRecord(record);
        setVisible(true);
    };

    const props = {
        visible, setVisible, record, 
        state, onDelete, showModal, 
        fetchNarrative: () => fetchNarrative(dispatch)
    }
    return <ReportResponse {...props} />
}
