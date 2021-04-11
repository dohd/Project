import React from 'react'
import { Card } from 'antd';
import { Bar } from 'react-chartjs-2';

import { GraphFilter } from 'components';

export default function RegionGraph({ data, ...rest }) {
    return (
        <Card 
            size='small' 
            style={{ 
                borderWidth: 2,
                minWidth: 550, 
                width: '65%', 
                marginTop: 16 
            }}
        >
            <GraphFilter {...rest} />
            <div style={{ minWidth: 500 }}>
                <Bar
                    data={data} 
                    options={{
                        responsive: true,
                        title: { 
                            text: 'Participants per Region by Gender in January', 
                            display: true,
                            fontSize: 16,
                            fontColor: 'black'
                        },
                        legend: { position: 'right' },
                        scales: {
                            yAxes: [
                                {
                                    gridLines: {
                                        drawOnChartArea: false
                                    }
                                }
                            ],
                            xAxes: [
                                {
                                    gridLines: { 
                                        display: false
                                    }
                                }
                            ]
                        }
                    }}
                />
            </div>
        </Card>
    );
}