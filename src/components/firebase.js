import { initializeApp } from "firebase/app";
import {
	getFirestore,
	collection,
	getDocs,
	addDoc,
	deleteDoc,
	serverTimestamp,
	doc,
	orderBy,
	limit,
	onSnapshot,
	query,
} from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyCTVKcgj7XQBrgZ_zUkIu54DFILgDoX9QU",
	authDomain: "reports-dashboard-d341f.firebaseapp.com",
	projectId: "reports-dashboard-d341f",
	storageBucket: "reports-dashboard-d341f.appspot.com",
	messagingSenderId: "867656354622",
	appId: "1:867656354622:web:85fdc8d323885dbb6bba6f",
	measurementId: "G-NG0VPDR9CC",
};

// init firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

export {
	db,
	collection,
	getDocs,
	addDoc,
	deleteDoc,
	serverTimestamp,
	doc,
	orderBy,
	limit,
	onSnapshot,
	query,
};
