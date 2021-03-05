import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Card } from 'antd';

export default function Bargraph() {
    const [chartData, setchartData] = useState({
        programme: {}, region: {}
    });

    const barchart = () => {
        setchartData({
            programme: {
                labels: [
                    'Youth programme',
                    'Women empowerment',
                    'Access to justice',
                    'Inclusive Education',
                    'Inclusive Health',
                    'Youth empowerment'
                ],
                datasets: [
                    {
                        label: 'Male',
                        data: [10, 40, 23, 90, 50, 10],
                        backgroundColor: 'rgba(57, 252, 3, 0.8)',
                    },
                    {
                        label: 'Female',
                        data: [23, 50, 10, 40, 70, 3],
                        backgroundColor: 'rgba(252, 198, 3, 0.8)'
                    },
                    {
                        label: 'Transgender',
                        data: [5, 10, 5, 12, 8, 5],
                        backgroundColor: 'rgba(252, 3, 3, 0.8)'
                    }
                ]
            },
            region: {
                labels: ['Nairobi', 'Nakuru', 'Narok', 'Mombasa', 'Moyale'],
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

    useEffect(() => {
        barchart();
    }, []);

    return (
        <div style={{ padding: 10 }}>
            <Card size='small' style={{ borderWidth: 2, minWidth: 550, width: '65%' }}>
                <div style={{ minWidth: 500 }}>
                    <Bar
                        data={chartData.programme} 
                        options={{
                            responsive: true,
                            title: { 
                                text: 'Participants per Programme by Gender in January', 
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

            <Card size='small' style={{ borderWidth: 2, minWidth: 550, width: '65%', marginTop: 16 }}>
                <div style={{ minWidth: 500 }}>
                    <Bar
                        data={chartData.region} 
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
        </div>
    );
}