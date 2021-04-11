import React, { useState, useEffect } from 'react';

import ProgrammeGraph from './ProgrammeGraph';
import RegionGraph from './RegionGraph';
import { useTracked } from 'context';

export default function Bargraph() {
    const [store, dispatch] = useTracked();
    const [labels, setLabels] = useState({
        programme: [], region: []
    });

    useEffect(() => {
        const programme = store.keyProgrammes.map(v => v.programme);
        const region = store.targetRegions.map(v => v.area);
        setLabels({ programme, region });
    }, [store.keyProgrammes, store.targetRegions]);

    const [data, setData] = useState({
        programme: { male: [], female: [], transgender: [] },
        region: { male: [], female: [], transgender: [] }
    });

    useEffect(() => {
        const programme = store.programmeGraph
        if (programme.hasOwnProperty('male')) {
            setData(prev => ({
                ...prev, programme: store.programmeGraph 
            }));
        }
    }, [store.programmeGraph]);

    const [chartData, setchartData] = useState({
        programme: {}, region: {}
    });
    
    const barchart = () => {
        setchartData({
            programme: {
                labels: labels.programme,
                datasets: [
                    {
                        label: 'Male',
                        data: data.programme.male,
                        backgroundColor: 'rgba(57, 252, 3, 0.8)',
                    },
                    {
                        label: 'Female',
                        data: data.programme.female,
                        backgroundColor: 'rgba(252, 198, 3, 0.8)'
                    },
                    {
                        label: 'Transgender',
                        data: data.programme.transgender,
                        backgroundColor: 'rgba(252, 3, 3, 0.8)'
                    }
                ]
            },
            region: {
                labels: labels.region,
                datasets: [
                    {
                        label: 'Male',
                        data: [24, 48, 88, 10, 5],
                        backgroundColor: 'rgba(57, 252, 3, 0.8)',
                    },
                    {
                        label: 'Female',
                        data: [50, 23, 10, 70, 50],
                        backgroundColor: 'rgba(252, 198, 3, 0.8)'
                    },
                    {
                        label: 'Transgender',
                        data: [3, 5, 8, 5, 10],
                        backgroundColor: 'rgba(252, 3, 3, 0.8)'
                    }
                ]
            }
        });
    };

    useEffect(barchart, [labels, data]);

    const prog_graph_props = {
        data: chartData.programme,
        apiKey: 'programmeGraph',
        actionType: 'addProgrammeGraph',
        dispatch
    };
    const region_graph_props = {
        data: chartData.region,
        apiKey: 'regionGraph',
        actionType: 'addRegionGraph',
        dispatch
    };
    return (
        <div style={{ padding: 10 }}>
            <ProgrammeGraph {...prog_graph_props} />
            <RegionGraph {...region_graph_props} />
        </div>
    );
}