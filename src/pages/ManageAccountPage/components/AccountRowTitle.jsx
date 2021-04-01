const AccountRowTitle = () => {
    return (
        <thead className="text-md border-b-2 shadow-sm ">
            <tr>
                <th className="px-6 py-3 text-left font-medium text-gray-500 tracking-wider" scope="col" >
                    ลำดับ
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 tracking-wider" scope="col" >
                    ID
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 tracking-wider" scope="col" >
                    ชื่อ
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 tracking-wider" scope="col" >
                    นามสกุล
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 tracking-wider" scope="col" >
                    Email
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 tracking-wider" scope="col" >
                    ชื่อผู้ใช้
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 tracking-wider" scope="col" >
                    กลุ่มผู้ใช้
                </th>
                <th className="relative px-6 py-3" scope="col" >
                    <span class="sr-only">แก้ไข</span>
                </th>
                <th className="relative px-6 py-3" scope="col" >
                    <span class="sr-only">ยกเลิก</span>
                </th>
            </tr>
        </thead>
    );
};

export default AccountRowTitle;
