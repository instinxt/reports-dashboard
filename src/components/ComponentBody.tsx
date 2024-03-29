import { Datepicker, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import {
    db,
    collection,
    onSnapshot,
    query,
} from './firebase';

export const ComponentBody = () => {
    const [generateReport, setGenerateReport] = useState(false);
    const [fetchData, setFetchData] = useState(false);
    const [downloadButton, enableDownloadButton] = useState(false);
    const [vehicleData, setVehicleData] = useState([])
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [reportOption, setReportOption] = useState("");
    const [Frequency, setFrequency] = useState("");


    const handleStartDateChange = (date) => {
        setStartDate(date);
        console.log('Selected start date:', date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        console.log('Selected end date:', date);
    };

    const handleReportSelect = (option) => {
        setReportOption(option)
        console.log('Selected Option for Report', option);
    }

    const handleFrequencySelect = (option) => {
        setFrequency(option)
        console.log('Selected Option for Frequency', option);
    }

    const colRef = collection(db, 'VehicleData');
    const q = query(colRef);

    useEffect(() => {
        onSnapshot(q, (snapshot) => {
            setVehicleData(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data()
                }))
            );
        });
    }, []);

    function handleReportClick() {
        setGenerateReport(true);
        enableDownloadButton(true);
        setFetchData(true);
    }

    return (
        < div id="componentBody" className={generateReport ? "h-full flex flex-col bg-black p-4 xl:ml-60" : "h-screen flex flex-col bg-black p-4 xl:ml-60"} >
            <div id="componentHeader" className="flex flex-row text-white p-4 mb-4 justify-between">
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

            <div id="filter" className="flex flex-row text-white p-2 border-b-1 border-t-1 mb-4 justify-between items-center">
                <div id="reportsFilter" className="flex flex-row p-2 mb-2">

                    {/* Reports Dropdown */}
                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                variant="bordered"
                                className="text-white w-48 mr-5 items-center font-bold text-md"
                            >
                                Report
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            onAction={handleReportSelect}
                            aria-label="Action event example"
                        >
                            <DropdownItem key="Total Miles Driven">Total Miles Driven</DropdownItem>
                            <DropdownItem key="Energy Consumption">Energy Consumption</DropdownItem>
                            <DropdownItem key="Cost Analysis">Cost Analysis</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>

                    {/* Frequency Dropdown */}
                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                variant="bordered"
                                className="text-white w-48 mr-5 items-center font-bold text-md"
                            >
                                Frequency
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Action event example"
                            onAction={handleFrequencySelect}
                        >
                            <DropdownItem key="Daily">Daily</DropdownItem>
                            <DropdownItem key="Weekly">Weekly</DropdownItem>
                            <DropdownItem key="Monthly">Monthly</DropdownItem>
                            <DropdownItem key="Yearly">Yearly</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>


                    {/* Date Range Picker */}
                    <div className="flex flex-row items-center w-96">
                        <Datepicker className="mr-2" onSelectedDateChanged={handleStartDateChange} />
                        <span>to</span>
                        <Datepicker className="ml-2" onSelectedDateChanged={handleEndDateChange} />
                    </div>

                </div>
                {
                    downloadButton ?
                        (
                            <div className="flex flex-row">
                                <div id="downloadCSV" className="p-2 flex flex-row">
                                    <button type="button" className="flex flex-row border-2 items-center text-white bg-black hover:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2">
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

            <div className="flex flex-col p-4 text-white">
                <div className="p-2 mb-2">
                    <Table>
                        {generateReport &&
                            <Table.Head className="text-white">
                                <Table.HeadCell className="bg-[#1C1C26]">License Plate</Table.HeadCell>
                                <Table.HeadCell className="bg-[#1C1C26]">Make</Table.HeadCell>
                                <Table.HeadCell className="bg-[#1C1C26]">VIN</Table.HeadCell>
                                <Table.HeadCell className="bg-[#1C1C26]">Model</Table.HeadCell>
                                <Table.HeadCell className="bg-[#1C1C26]">Type</Table.HeadCell>
                                <Table.HeadCell className="bg-[#1C1C26]">Date</Table.HeadCell>
                                <Table.HeadCell className="bg-[#1C1C26]">Miles Driven</Table.HeadCell>
                            </Table.Head>
                        }
                        {fetchData &&
                            vehicleData.map(({ data: { licensePlate, make, VIN, model, type, date, milesDriven } }) => (
                                <Table.Body className="text-white bg-black">
                                    <Table.Row>
                                        <Table.Cell className="border-b-1">{licensePlate}</Table.Cell>
                                        <Table.Cell className="border-b-1">{make}</Table.Cell>
                                        <Table.Cell className="border-b-1">{VIN}</Table.Cell>
                                        <Table.Cell className="border-b-1">{model}</Table.Cell>
                                        <Table.Cell className="border-b-1">{type}</Table.Cell>
                                        <Table.Cell className="border-b-1">{date}</Table.Cell>
                                        <Table.Cell className="border-b-1">{milesDriven}</Table.Cell>
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
