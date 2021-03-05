import React, { useEffect } from 'react';
import { Modal, Form, DatePicker, message } from 'antd';
import moment from 'moment';
import Api from 'api';

export const dateFormat = 'YYYY-MM-DD';

export default function ApprovedProposal(props) {
    const {record, visible, setVisible, fetchProposals} = props;

    const onCreate = values => {
        const periods = values.period.map(date => date.format(dateFormat));
        values.startPeriod = periods[0];
        values.endPeriod = periods[1];
        delete values.period;

        Api.proposal.patch(record.key, values)
        .then(res => fetchProposals())
        .catch(err => {
            console.log(err);
            message.error('Unknown error!');
        });
    };

    const [form] = Form.useForm();
    const onOk = () => {
        form.validateFields()
        .then(values => {
            setVisible(false);
            onCreate(values);
        })
        .catch(err => console.log('validation Failed:', err));
    };
    const onCancel = () => setVisible(false);

    // Initial from values
    useEffect(() => {
        if (Object.keys(record).length) {
            const { startPeriod, endPeriod } = record;
            const period = [startPeriod, endPeriod];
            form.setFieldsValue({
                period: period.map(date => moment(date, dateFormat)),
            });
        }
    }, [record, form]);

    return (
        <Modal
            title='Update Proposal'
            visible={visible}
            onOk={onOk}           
            onCancel={onCancel}
        >
            <Form
                form={form}
                initialValues={{ remember: true }}
            >
                <Form.Item
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    label='Period'
                    name='period'
                    rules={[{ required: true }]}
                >
                    <DatePicker.RangePicker format={dateFormat} />
                </Form.Item>
            </Form>
        </Modal>
    );
}