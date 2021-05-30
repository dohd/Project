import React, { useState, useEffect } from 'react';

import ProgrammeGraph from './ProgrammeGraph';
import RegionGraph from './RegionGraph';
import { useTracked } from 'context';
import barchart from './barchart';

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
        programme: { male: [], female: [] },
        region: { male: [], female: [] }
    });

    useEffect(() => {
        const programme = store.programmeGraph;
        if (programme.hasOwnProperty('male')) {
            setData(prev => ({
                ...prev, programme: store.programmeGraph 
            }));
        }
        const region = store.programmeGraph;
        if (region.hasOwnProperty('male')) {
            setData(prev => ({
                ...prev, region: store.regionGraph 
            }));
        }
    }, [store.programmeGraph, store.regionGraph]);

    const [chartData, setchartData] = useState({
        programme: {}, region: {}
    });
    
    useEffect(() => {
        const chart = barchart(labels, data);
        setchartData(chart);
    }, [labels, data]);

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
