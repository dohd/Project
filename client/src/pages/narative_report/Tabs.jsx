import React from 'react';
import { Tab1, Tab2, Tab3, Tab4, Tab5, Tab6 } from './tabs';
import './tabs.css';

export const tabList = [
    { key: '1', tab: '1' }, 
    { key: '2', tab: '2' },
    { key: '3', tab: '3' }, 
    { key: '4', tab: '4' },
    { key: '5', tab: '5' }, 
    { key: '6', tab: '6' },
];

export const tabContent = props => ({
    1: <Tab1 {...props} />,
    2: <Tab2 {...props} />,
    3: <Tab3 {...props} />,
    4: <Tab4 {...props} />,
    5: <Tab5 {...props} />,
    6: <Tab6 {...props} />,
});
