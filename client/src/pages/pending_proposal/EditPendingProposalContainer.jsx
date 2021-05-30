import React, { useEffect,  useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, message } from 'antd';
import moment from 'moment';

import EditPendingProposal, { dateFormat } from './EditPendingProposal';
import Api from 'api';
import { useTracked } from 'context';

const fetchProposals = dispatch => {
    Api.proposal.get()
    .then(res => dispatch({
        type: 'addProposals',
        payload: res
    }));
};

export default function EditPendingProposalContainer({history}) {
    const [store, dispatch] = useTracked();
    const [donors, setDonors] = useState([]);

    useEffect(() => {
        const donors = store.donors.map(v => ({
            id: v.id, name: v.name
        }));
        setDonors(donors);
    }, [store.donors]);

    const { proposalId } = useParams();
    const onFinish = values => {
        const { dateSubmitted } = values;
        values.dateSubmitted = dateSubmitted.format(dateFormat);
        const periods = values.period.map(date => date.format(dateFormat));
        values.startDate = periods[0];
        values.endDate = periods[1];
        
        Api.proposal.patch(proposalId, values)
        .then(res => { 
            message.success('Proposal updated successfully');
            fetchProposals(dispatch);
            history.goBack();
        });
    };
    const onFinishFailed = err => console.log('Error:', err);

    // Initial form values
    const [form] = Form.useForm();
    useEffect(() => {
        for (const proposal of store.proposals) {
            if (proposal.id === parseInt(proposalId)) {
                const { startPeriod, endPeriod } = proposal;
                const periods = [startPeriod, endPeriod];
                form.setFieldsValue({
                    title: proposal.title, 
                    budget: proposal.budget,
                    donorId: proposal.donor.id, 
                    status: proposal.status,
                    period: periods.map(date => moment(date, dateFormat)),
                    dateSubmitted: moment(proposal.dateSubmitted, dateFormat)
                });
                break;
            }
        }
    }, [store.proposals, form, proposalId]);

    const props = { form, onFinish, onFinishFailed, donors };
    return <EditPendingProposal {...props} />;
}