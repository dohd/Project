import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import Participants from './Participants';
import Api from 'api';
import { useTracked } from 'context';

const fetchParticipants = dispatch => {
    Api.participant.get()
    .then(res => dispatch({
        type: 'addParticipants',
        payload: res
    }));
};

export default function ParticipantsContainer({ match, history }) {
    const [store, dispatch] = useTracked();
    const { activityPlanId } = useParams();

    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        const participants = [];
        store.participants.forEach(v => {
            if (v.activityPlanId === parseInt(activityPlanId)) {
                const obj = {...v.detail};
                obj.key = v.id;
                obj.activityDate = v.activityDate;
                obj.name =  `${v.fName} ${v.lName}`;
                obj.gender = v.gender;
                obj.region = v.region.area;
                obj.programme = v.keyProgramme.programme;                
                participants.push(obj);
            }
            return v;
        });
        setParticipants(participants);
    }, [store.participants, activityPlanId]);

    const onDelete = key => {
        Api.participant.delete(key)
        .then(res => fetchParticipants(dispatch));
    };

    const props = { participants, onDelete };
    return <Participants {...props} />;
}
