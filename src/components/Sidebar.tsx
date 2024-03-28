import overview from '../assets/overview.svg';
import car from "../assets/Car.svg";
import reportIcon from "../assets/Report.svg";
import chargers from "../assets/Charger.svg";
import driver from "../assets/Drivers.svg";
import schedules from "../assets/Schedules.svg";
import admin from "../assets/admin.svg";
import Logo from "../assets/logo.png"

export const Sidebar = () => {
    return (
        <div className="SideBar">
            {/* Add logo here from the upscaled image */}

            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg xl:hidden hover:bg-gray-300 ">
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full xl:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-500 dark:bg-gray-800">
                    <a href="https://electrifyitnow.com/" className="flex items-center ps-2.5 mb-5">
                        <img src={Logo} className="w-[600px]" alt="Flowbite Logo" />
                    </a>
                    <ul className="space-y-2 font-medium">
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <img width={'20px'} className="text-white" src={overview} alt="overview" />
                                <span className="ms-3">Overview</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <img width={'20px'} src={car} alt="Vehicles" />{' '}
                                <span className="ms-3">Vehicles</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <img width={'20px'} src={chargers} alt="Chargers" />{' '}
                                <span className="ms-3">Chargers</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <img width={'20px'} src={driver} alt="Drivers" />
                                <span className="ms-3">Drivers</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <img width={'20px'} src={schedules} alt="Schedules" />{' '}
                                <span className="ms-3">Schedules</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white bg-gray-100 dark:hover:bg-gray-700 group">
                                <img width={'20px'} src={reportIcon} alt="Reports" />
                                <span className="ms-3">Reports</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <img width={'20px'} src={admin} alt="Admin Panel" />{' '}
                                <span className="ms-3">Admin Panel</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    )
}
