import { getDocs, where } from "firebase/firestore";
import {  db,
    collection,
    query, } from "./firebase";
import moment from "moment";

export const dbquery = async (Frequency, startDate, endDate) => {		
		
	let resultData = [];
		
		//Setting up db format for date
		const dbStartDate = moment(startDate).format('YYYY/MM/DD');
		const dbEndDate = moment(endDate).format('YYYY/MM/DD');

		//Db query
		const colRef = collection(db, "VehicleData");
		const q = query(colRef,
						where("date",">=", dbStartDate),
						where("date", "<=", dbEndDate)
			);
	
		const snapshot = await getDocs(q);
	
		resultData = snapshot.docs.map((doc) => ({
			id: doc.id,
			data: doc.data()
		}));
		
		//process Data client side
		const processedData = generateReport(Frequency, resultData, startDate, endDate);
		
		return processedData;
	};


const generateReport = (Frequency, resultData, startDate, endDate) => {
	if(Frequency === "Daily")
		return generateDailyReport(resultData, startDate, endDate);
	else if(Frequency === "Weekly")
		return generateWeeklyReport(resultData, startDate, endDate);
	else if(Frequency === "Monthly")
		return generateMonthlyReport(resultData, startDate, endDate);
	else if(Frequency === "Yearly")
		return generateYearlyReport(resultData, startDate, endDate);
	else
		return true;
}

const generateDailyReport = (resultData, startDate, endDate) => {
    const dailyReport = {};

    // Create a map to store the daily report for each license plate
    const reportMap = new Map();

    //Range init
    let startDateObj = moment.utc(startDate, 'YYYY/MM/DD');
    let endDateObj = moment.utc(endDate, 'YYYY/MM/DD').add(1, 'day');

    // Iterate over the resultData only once
    for (const entry of resultData) {
        const { data: { licensePlate, date, milesDriven } } = entry;

		let dateStr = moment.utc(date, 'YYYY/MM/DD');

        // Check if the date is within the specified range
        if (moment(dateStr).isBetween(startDateObj, endDateObj, 'day', '[]')) {
            const key = licensePlate + date; // Create a unique key for each license plate and date

            // Update the reportMap with miles driven for each license plate and date
            reportMap.set(key, (reportMap.get(key) || 0) + milesDriven);
        }
    }

    // Convert the reportMap to the dailyReport object
    reportMap.forEach((value, key) => {
        const licensePlate = key.substring(0, key.length - 10); // Extract license plate from the key
        const date = key.substring(key.length - 10); // Extract date from the key

        dailyReport[licensePlate] = dailyReport[licensePlate] || {};
        dailyReport[licensePlate][date] = value;
    });

    return dailyReport;
}

function generateWeeklyReport(resultData, startDate, endDate) {
    const weeklyReport = {};

    const currentDate = moment.utc(startDate, 'YYYY/MM/DD');
    const endDateObj = moment.utc(endDate, 'YYYY/MM/DD').add(1, 'day');

    const transformedData = resultData.map(({ data }) => data);
    console.log(transformedData);

    while (currentDate.isSameOrBefore(endDateObj, 'week')) {
        console.log(currentDate, "This is current date value")
        const weekStart = currentDate.startOf('week').format('YYYY/MM/DD');

        //Handling edge case
        let weekEnd = currentDate.endOf('week').add(1, 'day').format('YYYY/MM/DD');

        const week = `${weekStart} - ${weekEnd}`;

        const filteredData = transformedData.filter(entry => {
            const dateStr = moment.utc(entry.date, 'YYYY/MM/DD');
            return moment(dateStr).isBetween(weekStart, weekEnd, null, '[]');
        });

        filteredData.forEach(entry => {
            weeklyReport[entry.licensePlate] = weeklyReport[entry.licensePlate] || {};
            weeklyReport[entry.licensePlate][week] = (weeklyReport[entry.licensePlate][week] || 0) + entry.milesDriven;
        });

        moment(currentDate).add(1, 'week');
    }

    return weeklyReport;
}


function generateMonthlyReport(resultData, startDate, endDate) {
    const monthlyReport = {};
    const currentDate = moment(startDate);
    const endDateObj = moment(endDate);

    const transformedData = resultData.map(({ data }) => data);

    while (currentDate.isSameOrBefore(endDateObj, 'month')) {
        const monthStart = currentDate.startOf('month').format('YYYY/MM/DD');
        const monthEnd = currentDate.endOf('month').format('YYYY/MM/DD');
        const month = currentDate.format('MMMM YYYY');

        const filteredData = transformedData.filter(entry => {
            const dateStr = moment.utc(entry.date, 'YYYY/MM/DD');
            return dateStr.isBetween(monthStart, monthEnd, null, '[]');
        });

        filteredData.forEach(entry => {
            monthlyReport[entry.licensePlate] = monthlyReport[entry.licensePlate] || {};
            monthlyReport[entry.licensePlate][month] = (monthlyReport[entry.licensePlate][month] || 0) + entry.milesDriven;
        });

        currentDate.add(1, 'month');
    }

    return monthlyReport;
}


function generateYearlyReport(data, startDate, endDate) {
    const yearlyReport = {};
    const currentDate = moment(startDate);
    const endDateObj = moment(endDate);

    const transformedData = data.map(({ data }) => data);

    while (currentDate.isSameOrBefore(endDateObj, 'year')) {
        const yearStart = currentDate.startOf('year').format('YYYY/MM/DD');
        const yearEnd = currentDate.endOf('year').format('YYYY/MM/DD');
        const year = currentDate.format('YYYY');

        const filteredData = transformedData.filter(entry => {
            const dateStr = moment.utc(entry.date, 'YYYY/MM/DD');
            return dateStr.isBetween(yearStart, yearEnd, null, '[]');
        });

        filteredData.forEach(entry => {
            yearlyReport[entry.licensePlate] = yearlyReport[entry.licensePlate] || {};
            yearlyReport[entry.licensePlate][year] = (yearlyReport[entry.licensePlate][year] || 0) + entry.milesDriven;
        });

        currentDate.add(1, 'year');
    }

    return yearlyReport;
}
