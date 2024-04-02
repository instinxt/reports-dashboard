import { getDocs, where } from "firebase/firestore";
import {  db,
    collection,
    query, } from "./firebase";
import moment from "moment";

	export const dbquery = async (Frequency, startDate, endDate) => {
	
		let resultData = [];

		endDate = setEndDate(Frequency, startDate, endDate);
		
		//Setting up db format for date
		startDate = moment(startDate).format('YYYY/MM/DD');
		endDate = moment(endDate).format('YYYY/MM/DD');

		//Db query
		const colRef = collection(db, "VehicleData");
		const q = query(colRef,
						where("date",">=",startDate),
						where("date", "<=", endDate)
			);
	
		const snapshot = await getDocs(q);
	
		resultData = snapshot.docs.map((doc) => ({
			id: doc.id,
			data: doc.data()
		}));
	
		return resultData;
	};

const setEndDate = (Frequency, startDate, endDate) => {
	const resultDate = new Date(startDate);

	if(Frequency == "Daily") {
		return endDate;
	} else if(Frequency == "Weekly") {
		resultDate.setDate(resultDate.getDate() + 7);
	} else if(Frequency == "Monthly") {
		resultDate.setDate(resultDate.getDate() + 31);
	} else if(Frequency == "Yearly") {
		resultDate.setDate(resultDate.getDate() + 365);
	}
	return resultDate;
};
