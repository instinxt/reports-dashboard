import moment from "moment";
import toast from "react-hot-toast"

export const validFilters = (reportOption, Frequency, startDate, endDate) => {

    if (!validReportOption(reportOption))
        return false

    if (!validFrequency(Frequency))
        return false

    return validDateRange(startDate, endDate);
}

const validDateRange = (start, end) => {
    if (moment(end).isBefore(start)) {
        toast.error("Invalid Date Range!")
        return false
    }
    return true;
}

const validReportOption = (reportOption) => {
    if (reportOption == "") {
        toast.error("Select a report option", { duration: 2000 });
        return false;
    } else if (reportOption == "Energy Consumption" || reportOption == "Cost Analysis") {
        toast.error("Energy Consumption/Cost Analysis data coming soon..", { duration: 3000 });
        return false;
    }
    return true;
}

const validFrequency = (Frequency) => {
    if (Frequency == "") {
        toast.error("Select a frequency", { duration: 3000 });
        return false;
    } else if (Frequency == "Weekly") {
        toast.success("Only 1 Week from start date is supported", { duration: 3000 });
    } else if (Frequency == "Monthly") {
        toast.success("Only 1 Month from start date is supported", { duration: 3000 });
    } else if (Frequency == "Yearly") {
        toast.success("Only 1 Year from start date is supported", { duration: 3000 });
    }
    return true;
}