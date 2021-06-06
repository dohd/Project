import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import ReportImage from './ReportImage';
import uploadTask from 'utils/firebaseConfig';
import { useTracked } from 'context';
import Api, { fetchAud } from 'api';
import { clientSocket } from 'utils';

const fetchNarratives = dispatch => {
    Api.narrative.get()
    .then(res => {
        dispatch({
            type: 'addNarratives',
            payload: res
        });
        clientSocket.emit('narratives', res);
    });
};

export default function ReportImageContainer() {
    const [store, dispatch] = useTracked();
    const { narrativeReportId } = useParams();
    const [eventImages, setEventImages] = useState([]);

    useEffect(() => {
        activityLoop:
        for (const v of store.narratives) {
            for (const r of v.narratives) {
                if (r.id === parseInt(narrativeReportId)) {
                    setEventImages(r.eventImages);
                    break activityLoop;
                }
            }            
        }
    }, [store.narratives, narrativeReportId]);

    const [loading, setLoading] = useState(false);

    const upload = async file => {
        try {
            const url = await uploadTask(`/events/${file.name}`, file);
            const values = { narrativeReportId, url };
            const res = await Api.eventImage.post(values);
            if (res) fetchNarratives(dispatch);
            setLoading(false);    
        } catch (error) {
            console.log(error);
        }
    };

    const handleBeforeUpload = file => {
        const name = `${fetchAud()}-${narrativeReportId}-${file.name}`;
        const renamedFile = new File([file], name, {type: file.type});

        setLoading(true);
        upload(renamedFile);
        return false;
    };

    const props = { handleBeforeUpload, loading, eventImages };
    return <ReportImage {...props} />
}