import { Datepicker, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import {
    db,
    collection,
    serverTimestamp,
    addDoc,
    orderBy,
    onSnapshot,
    query,
    getDocs,
} from './firebase';
import "../App.css"

export const ComponentBody = () => {
    const [generateReport, setGenerateReport] = useState(false);
    const [fetchData, setFetchData] = useState(false);
    const [downloadButton, enableDownloadButton] = useState(false);
    const [vehicleData, setVehicleData] = useState([])

    const colRef = collection(db, 'VehicleData');
    const q = query(colRef);

    useEffect(() => {
        onSnapshot(q, (snapshot) => {
            console.log(snapshot.docs);
            setVehicleData(
                snapshot.docs.map((doc) => ({
                    data: doc.data()
                }))
            );
        });
    }, []);

    function handleReportClick() {
        setGenerateReport(true);
        enableDownloadButton(true);
        // Temporary Fetch simulation
        setTimeout(() => {
            setFetchData(true);
        }, 1000);
    }

    return (
        <div id="componentBody" className="flex flex-col h-screen bg-gray-200 p-4 xl:ml-64">
            <div id="componentHeader" className="flex flex-row bg-gray-300 p-4 mb-4 justify-between">
                <div id="componentName" className=" p-2 mb-2 text-3xl">
                    Reports
                </div>
                <div id="profileSection" className="flex object-contain  p-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    <span>Username</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
            </div>

            <div id="filter" className="flex flex-row bg-gray-300 p-4 mb-4 justify-between">
                <div id="reportsFilter" className="flex flex-row  p-2 mb-2">

                    <button id="dropdownDefaultButton" data-dropdown-toggle="reportsDropdown" className="mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Reports
                        <svg className="w-2.5 h-2.5 ms-3 ml-10" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                        </svg>
                    </button>

                    {/* <!-- Dropdown menu --> */}
                    <div id="reportsDropdown" className="mr-4 z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Total Miles Driven</a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Energy consumption</a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Cost analysis</a>
                            </li>
                        </ul>
                    </div>

                    <button id="dropdownDefaultButton" data-dropdown-toggle="frequencyDropdown" className="mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Frequency
                        <svg className="w-2.5 h-2.5 ms-3 ml-10" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                        </svg>
                    </button>

                    {/* <!-- Dropdown menu --> */}
                    <div id="frequencyDropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Daily</a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Weekly</a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Monthly</a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Yearly</a>
                            </li>
                        </ul>
                    </div>

                    {/* Date Picker */}
                    <div className="flex flex-row items-center">
                        <Datepicker className="mr-2" />
                        <span>to</span>
                        <Datepicker className="ml-2" />
                    </div>

                </div>
                {
                    downloadButton ?
                        (
                            <div className="flex flex-row">
                                <div id="downloadCSV" className="p-2 flex flex-row">
                                    <button type="button" className="flex flex-row items-center text-white bg-black hover:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2">
                                        Download CSV
                                    </button>
                                </div>
                                <div id="downloadPDF" className="p-2 flex flex-row">
                                    <button type="button" className="flex flex-row items-center text-white bg-blue-700 hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">
                                        Download PDF
                                    </button>
                                </div>
                            </div>
                        ) :
                        (
                            <div id="generateReports" className="p-2 flex flex-row">
                                <button type="button" onClick={handleReportClick} className="flex flex-row items-center text-white bg-blue-500 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">
                                    <svg className="w-6 h-6 text-gray-800 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" d="M9 7V2.221a2 2 0 0 0-.5.365L4.586 6.5a2 2 0 0 0-.365.5H9Zm2 0V2h7a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9h5a2 2 0 0 0 2-2Zm-1 9a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2Zm2-5a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1Zm4 4a1 1 0 1 0-2 0v3a1 1 0 1 0 2 0v-3Z" clip-rule="evenodd" />
                                    </svg>
                                    Generate Reports
                                </button>
                            </div>
                        )
                }

            </div>

            <div className="flex flex-col bg-gray-300 p-4">
                <div className="p-2 mb-2">
                    <Table>
                        {generateReport &&
                            <Table.Head>
                                <Table.HeadCell>License Plate</Table.HeadCell>
                                <Table.HeadCell>Make</Table.HeadCell>
                                <Table.HeadCell>VIN</Table.HeadCell>
                                <Table.HeadCell>Model</Table.HeadCell>
                                <Table.HeadCell>Type</Table.HeadCell>
                                <Table.HeadCell>Date</Table.HeadCell>
                                <Table.HeadCell>Miles Driven</Table.HeadCell>
                            </Table.Head>
                        }
                        {fetchData &&
                            vehicleData.map(({ data: { licensePlate, make, VIN, model, type, date, milesDriven } }) => (
                                <Table.Body className="text-black bg-slate-400">
                                    <Table.Row>
                                        <Table.Cell>{licensePlate}</Table.Cell>
                                        <Table.Cell>{make}</Table.Cell>
                                        <Table.Cell>{VIN}</Table.Cell>
                                        <Table.Cell>{model}</Table.Cell>
                                        <Table.Cell>{type}</Table.Cell>
                                        <Table.Cell>{date}</Table.Cell>
                                        <Table.Cell>{milesDriven}</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            ))
                        }
                    </Table>
                </div>
            </div>
        </div >
    )
};
