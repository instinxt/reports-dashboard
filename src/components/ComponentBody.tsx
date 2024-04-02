import { Datepicker, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { validFilters } from "../utils/utility";
import { dbquery } from "../firebaseConfig/dbqueries";
import toast from "react-hot-toast";

export const ComponentBody = () => {
    const [generateReport, setGenerateReport] = useState(false);
    const [fetchData, setFetchData] = useState(false);
    const [downloadButton, enableDownloadButton] = useState(false);
    const [vehicleData, setVehicleData] = useState([])
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [reportOption, setReportOption] = useState("");
    const [Frequency, setFrequency] = useState("");
    const [reportOptions, setReportOptions]: [Set<string>, React.Dispatch<React.SetStateAction<any>>] = React.useState(new Set(["Report"]));
    const [frequencyOption, setFrequencyOption]: [Set<string>, React.Dispatch<React.SetStateAction<any>>] = React.useState(new Set(["Frequency"]));

    const refreshUI = () => {
        setGenerateReport(false);
        setFetchData(false);
        enableDownloadButton(false);
        setReportOptions(new Set(["Report"]));
        setReportOption("");
        setFrequencyOption(new Set(["Frequency"]));
    }

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const handleReportSelect = (option) => {
        setReportOption(option)
    }

    const selectedReportOption = React.useMemo(
        () => Array.from(reportOptions).join(", ").replace("_", " "), [reportOptions]
    );

    const selectedFrequencyOption = React.useMemo(
        () => Array.from(frequencyOption).join(", ").replace("_", " "), [frequencyOption]
    );

    const handleFrequencySelect = (option) => {
        setFrequency(option)
    }

    useEffect(() => {
        const fetchData = async () => {
            const data = await dbquery(Frequency, startDate, endDate);
            setVehicleData(data);
        };

        fetchData();
    }, [startDate]);

    function handleReportClick() {
        if (!validFilters(reportOption, Frequency, startDate, endDate)) {
            refreshUI();
            return;
        }

        if (vehicleData.length === 0) {
            toast.error("No Data found for the filters", { duration: 3000 });
            refreshUI();
            return;
        }

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
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 mr-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>

                    <span>Username</span>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 ml-2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
            </div>

            <div id="filter" className="flex flex-row text-white p-2 border-b-1 border-t-1 mb-4 justify-between items-center">
                <div id="reportsFilter" className="flex flex-row p-2 mb-2">

                    {/* Report Dropdown */}
                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                variant="bordered"
                                className="text-white w-48 mr-5 items-center font-bold text-md"
                            >
                                {selectedReportOption}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Single selection example"
                            variant="flat"
                            disallowEmptySelection
                            selectionMode="single"
                            selectedKeys={reportOptions}
                            onSelectionChange={setReportOptions}
                            onAction={handleReportSelect}
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
                                {selectedFrequencyOption}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Single selection example"
                            variant="flat"
                            disallowEmptySelection
                            selectionMode="single"
                            selectedKeys={selectedFrequencyOption}
                            onSelectionChange={setFrequencyOption}
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
                        <Datepicker
                            className="mr-2"
                            onSelectedDateChanged={handleStartDateChange}
                            title="Start Date"
                        />
                        <span>to</span>
                        <Datepicker
                            className="ml-2"
                            onSelectedDateChanged={handleEndDateChange}
                            title="End Date"
                            maxDate={new Date()}
                        />
                    </div>

                </div>
                {
                    downloadButton ?
                        (
                            <div id="postReportSection" className="flex flex-row items-center">
                                <div id="refreshUI" className="mr-3">
                                    <button type="button" onClick={refreshUI} className="flex flex-row border-2 items-center text-white bg-black hover:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-full p-2 text-center mb-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                        </svg>
                                    </button>
                                </div>
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
                            vehicleData.flat().map(({ data: { licensePlate, make, vin, model, type, date, milesDriven } }) => (
                                <Table.Body className="text-white bg-black">
                                    <Table.Row className="border-b-1">
                                        <Table.Cell>{licensePlate}</Table.Cell>
                                        <Table.Cell>{make}</Table.Cell>
                                        <Table.Cell>{vin}</Table.Cell>
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
