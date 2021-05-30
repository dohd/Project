export default function barchart(labels, data) {
    return {
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
                }
            ]
        },
        region: {
            labels: labels.region,
            datasets: [
                {
                    label: 'Male',
                    data: data.region.male,
                    backgroundColor: 'rgba(57, 252, 3, 0.8)',
                },
                {
                    label: 'Female',
                    data: data.region.female,
                    backgroundColor: 'rgba(252, 198, 3, 0.8)'
                }
            ]
        }
    }
}
