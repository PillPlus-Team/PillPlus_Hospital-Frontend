const PatientInfoMonitor = ({ patient }) => {
    return (
        <div className="flex w-full h-full p-4 bg-white shadow-md rounded-lg overflow-y-auto">
            <table className="table-fixed w-full min-w-full divide-y divide-gray-200">
                <tr>
                    <td className="font-bold w-36 py-2">รหัส HN</td>
                    <td className="w-96 py-2">{patient.HN}</td>
                </tr>
                <tr>
                    <td className="font-bold w-36 py-2">ชื่อ</td>
                    <td className="w-96 py-2">{patient.name}</td>
                </tr>
                <tr>
                    <td className="font-bold w-36 py-2">สถานที่รับยา</td>
                    <td className="w-96 py-2">{patient.pillStorePhamacy}</td>
                </tr>
                <tr>
                    <td className="font-bold w-36 py-2 align-top">รายการยาที่ได้รับ</td>
                    <td className="w-96 py-2 align-top space-y-4">
                        {patient.pills.map((pill, index) => {
                            return (
                                <div className="flex flex-col">
                                    <div className="flex flex-row space-x-4">
                                        <p className="mr-auto">
                                            {index + 1}. {pill.name}
                                        </p>
                                        <p className="w-36 text-right">
                                            {pill.amount} {pill.unit}
                                        </p>
                                    </div>
                                    <p className="pl-3 text-sm text-gray-400 break-words">
                                        {pill.description.split('\n').map((subString) => {
                                            return (
                                                <>
                                                    {subString}
                                                    <br />
                                                </>
                                            );
                                        })}
                                    </p>
                                </div>
                            );
                        })}
                    </td>
                </tr>
            </table>
        </div>
    );
};

export default PatientInfoMonitor;
