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
        const list = store.participants.filter(v => {
            if (v.activityPlanId === parseInt(activityPlanId)) {
                v.key = v.id;
                v.name =  `${v.fName} ${v.lName}`;
                v.genderType = v.gender.type;
                v.region = v.region.area;
                v.programme = v.keyProgramme.programme;
                return true;
            }
            return false;
        });
        setParticipants(list);
    }, [store.participants, activityPlanId]);

    const onDelete = key => {
        Api.participant.delete(key)
        .then(res => fetchParticipants(dispatch));
    };

    const props = { participants, onDelete };
    return <Participants {...props} />;
}
