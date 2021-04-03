const today = new Date();
export const currentMonth = today.getMonth();
export const currentYear = today.getFullYear();

export const months = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
];

export const days = ['sun','mon','tue','wed','thur','fri','sat'];

export default function setCalendar (month, year) {
    const monthTitle = { month: months[month], year };

    const startDay = new Date(year, month).getDay();
    const daysInMonth = 32 - new Date(year, month, 32).getDate();
    const dates = Array(daysInMonth).fill(1).map((val, i) => val + i);

    const monthData = [];
    let dateIndx = 0;
    // looping through weeks
    for (let i = 0; i < 5; i++) {
        const singleWeek = { key: i };
        let dayIndx = startDay;
        // looping through days
        for (let j = 0; j < 7; j++) {
            // first week loop from startDay
            if (i === 0 && j >= startDay) {
                singleWeek[days[dayIndx]] = dates[dateIndx];
                dayIndx++;
                dateIndx++;
            } 
            // rest of the weeks
            if (i > 0 ) {
                singleWeek[days[j]] = dates[dateIndx];
                dateIndx++;
                if (dateIndx === daysInMonth) break; 
            }
        }
        monthData.push(singleWeek);
    }
    return { monthTitle, monthData };
}

export const years = (
    Array(currentYear - 2019)
    .fill(0).map((v,i) => currentYear - i)
);
