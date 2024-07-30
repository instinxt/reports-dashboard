import { Table } from "flowbite-react";

export const ReportTable = ({ data }) => {
    return (
        <Table.Body className="text-white bg-black">
            {Object.keys(data).map(licensePlate => {
                const licensePlateData = Object.keys(data[licensePlate]);
                let isFirstLicensePlate = true;

                return licensePlateData.map((date) => {
                    const row = (
                        <Table.Row key={`${licensePlate}-${date}`} className="border-b-1">
                            {isFirstLicensePlate &&
                                <Table.Cell rowSpan={licensePlateData.length}>{licensePlate}</Table.Cell>
                            }
                            <Table.Cell>{date}</Table.Cell>
                            <Table.Cell>{data[licensePlate][date]}</Table.Cell>
                        </Table.Row>
                    );

                    if (isFirstLicensePlate) {
                        isFirstLicensePlate = false; // Set isFirstLicensePlate to false after the first entry
                    }

                    return row;
                });
            })}
        </Table.Body>
    );
}

