import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import ReportImage from './ReportImage';
import uploadTask from 'utils/firebaseConfig';
import { useTracked } from 'context';
import Api, { fetchAud } from 'api';

const fetchNarratives = dispatch => {
    Api.narrative.get()
    .then(res => dispatch({
        type: 'addNarratives',
        payload: res
    }));
};

export default function ReportImageContainer() {
    const { narrativeReportId } = useParams();

    const [store, dispatch] = useTracked();
    const [eventImages, setEventImages] = useState([]);

    useEffect(() => {
        for (const v of store.narratives) {
            if (v.id === parseInt(narrativeReportId)) {
                setEventImages(v.eventImages);
                break;
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
        const ren_file = new File([file], name, {type: file.type});

        setLoading(true);
        upload(ren_file);
        return false;
    };

    const props = { handleBeforeUpload, loading, eventImages };
    return <ReportImage {...props} />
}