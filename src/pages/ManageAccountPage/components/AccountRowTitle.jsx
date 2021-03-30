const AccountRowTitle = () => {
    return (
        <thead class="bg-gray-100">
            <tr>
                <th scope="col" class="px-6 py-3 text-left font-medium text-gray-500 tracking-wider">
                    ลำดับ
                </th>
                <th scope="col" class="px-6 py-3 text-left font-medium text-gray-500 tracking-wider">
                    ID
                </th>
                <th scope="col" class="px-6 py-3 text-left font-medium text-gray-500 tracking-wider">
                    ชื่อ
                </th>
                <th scope="col" class="px-6 py-3 text-left font-medium text-gray-500 tracking-wider">
                    นามสกุล
                </th>
                <th scope="col" class="px-6 py-3 text-left font-medium text-gray-500 tracking-wider">
                    Email
                </th>
                <th scope="col" class="px-6 py-3 text-left font-medium text-gray-500 tracking-wider">
                    กลุ่มผู้ใช้
                </th>
                <th scope="col" class="px-6 py-3 text-left font-medium text-gray-500 tracking-wider">
                    สร้างโดย
                </th>
                <th scope="col" class="relative px-6 py-3">
                    <span class="sr-only">แก้ไข</span>
                </th>
                <th scope="col" class="relative px-6 py-3">
                    <span class="sr-only">ยกเลิก</span>
                </th>
            </tr>
        </thead>
    );
};

export default AccountRowTitle;
