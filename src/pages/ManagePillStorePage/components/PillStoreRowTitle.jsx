const PillStoreRowTitle = () => {
    return (
        <thead className="text-md border-b-2 shadow-sm ">
            <tr>
                <th className="w-10 px-6 py-3 text-left font-medium text-gray-700 tracking-wider" scope="col">
                    ลำดับ
                </th>
                <th className="w-24 px-6 py-3 text-left font-medium text-gray-700 tracking-wider" scope="col">
                    ID
                </th>
                <th className="w-36 px-6 py-3 text-left font-medium text-gray-700 tracking-wider" scope="col">
                    ชื่อ-นามสกุล
                </th>
                <th className="w-36 px-6 py-3 text-left font-medium text-gray-700 tracking-wider" scope="col">
                    ชื่อร้าน
                </th>
                <th className="w-48 px-6 py-3 text-left font-medium text-gray-700 tracking-wider" scope="col">
                    ที่อยู่
                </th>
                <th className="w-48 px-6 py-3 text-left font-medium text-gray-700 tracking-wider" scope="col">
                    Email
                </th>
                <th className="w-32 px-6 py-3 text-left font-medium text-gray-700 tracking-wider" scope="col">
                    เบอร์ติดต่อ
                </th>
                <th className="w-20 relative px-6 py-3" scope="col">
                    <span class="sr-only">แก้ไข</span>
                </th>
                <th className="w-20 relative px-6 py-3" scope="col">
                    <span class="sr-only">ยกเลิก</span>
                </th>
            </tr>
        </thead>
    );
};

export default PillStoreRowTitle;
