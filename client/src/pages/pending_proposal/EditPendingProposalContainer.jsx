import React, { useEffect,  useState } from 'react';
import { Form, message } from 'antd';
import moment from 'moment';
import { useProposalContext, useDonorContext } from 'contexts';
import Api from 'api';
import EditPendingProposal, { dateFormat } from './EditPendingProposal';
import { useParams } from 'react-router-dom';

export default function EditPendingProposalContainer({ history, match}) {
    const { proposalId } = useParams();
    const { proposals, fetchProposals } = useProposalContext();

    const onFinish = values => {
        const { dateSubmitted } = values;
        values.dateSubmitted = dateSubmitted.format(dateFormat);

        const periods = values.period.map(date => date.format(dateFormat));
        values.startDate = periods[0];
        values.endDate = periods[1];
        
        Api.proposal.patch(proposalId, values)
        .then(res => { 
            fetchProposals();
            message.success('Proposal updated successfully');
            history.goBack();
        })
        .catch(err => {
            console.log(err);
            message.error('Unknown error!')
        });
    };
    const onFinishFailed = err => console.log('Error:', err);

    const { donors }  = useDonorContext();

    const [state, setState] = useState({ donors: [] });
    useEffect(() => {
        const list = donors.map(val => ({
            id: val.id, name: val.name
        }));
        setState({ donors: list });
    }, [donors]);

    // Initial form values
    const [form] = Form.useForm();
    useEffect(() => {
        for (const proposal of proposals) {
            if (proposal.id === parseInt(proposalId)) {
                const { startPeriod, endPeriod } = proposal;
                const periods = [startPeriod, endPeriod];
                form.setFieldsValue({
                    title: proposal.title, 
                    budget: proposal.budget,
                    donorId: proposal.donor.id, 
                    statusId: proposal.status.id,
                    period: periods.map(date => moment(date, dateFormat)),
                    dateSubmitted: moment(proposal.dateSubmitted, dateFormat)
                });
                break;
            }
        }
    }, [proposals, form, proposalId]);

    const props = { 
        form, onFinish, onFinishFailed, history,
        donors: state.donors
    };

    return <EditPendingProposal {...props} />;
}