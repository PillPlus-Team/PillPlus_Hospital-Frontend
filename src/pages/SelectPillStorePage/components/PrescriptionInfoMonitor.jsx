const PrescriptionInfoMonitor = ({ prescription }) => {
    return (
        <div className="flex w-full h-full p-4 bg-white shadow-md rounded-lg overflow-y-auto">
            <table className="table-fixed w-full min-w-full divide-y divide-gray-200">
                <tr>
                    <td className="font-bold w-36 py-2">รหัสใบสั่งยา</td>
                    <td className="w-96 py-2">{prescription._id}</td>
                </tr>
                <tr>
                    <td className="font-bold w-36 py-2">รหัส HN</td>
                    <td className="w-96 py-2">{prescription.hn}</td>
                </tr>
                <tr>
                    <td className="font-bold w-36 py-2">ชื่อ</td>
                    <td className="w-96 py-2">{prescription.name}</td>
                </tr>
                <tr>
                    <td className="font-bold w-36 py-2">แพทย์ผู้รับผิดชอบ</td>
                    <td className="w-96 py-2">{prescription.doctor}</td>
                </tr>
                <tr>
                    <td className="font-bold w-36 py-2">สถานที่รับยา</td>
                    <td className="w-96 py-2">
                        <div className="flex flex-col">
                            <p>{prescription.pillStorePharmacy}</p>
                            <p className="text-sm text-gray-400 break-words">{prescription.pillStoreLocation}</p>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className="font-bold w-36 py-2 align-top">รายการยาที่ได้รับ</td>
                    <td className="w-96 align-top space-y-2 divide-y divide-gray-200">
                        {prescription.pills.map((pill, index) => {
                            return (
                                <div className="flex flex-row py-2">
                                    <p className=" mr-1">{index + 1}. </p>
                                    <div className="flex flex-col w-full">
                                        <div className="flex flex-row space-x-4">
                                            <p className="w-80 mr-auto break-all ">{pill.name}</p>
                                            <p className="text-right">
                                                {pill.amount} {pill.unit}
                                            </p>
                                        </div>
                                        <p className="w-80 text-sm text-gray-400 break-all">
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
                                </div>
                            );
                        })}
                    </td>
                </tr>
            </table>
        </div>
    );
};

export default PrescriptionInfoMonitor;
