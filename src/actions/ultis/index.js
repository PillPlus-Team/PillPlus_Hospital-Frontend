/*Priority Left to Right*/
export const roles = [
    { role: ['Super Adminstrator'], roleLevel: 0 },
    { role: ['Adminstrator'], roleLevel: 1 },
    { role: ['Staff', 'Cashier'], roleLevel: 2 },
];

export const menuList = [
    {
        title: 'หน้าหลัก',
        url: '/home',
    },
    {
        title: 'เลือกสถานที่รับยา',
        url: '/select-pillstore',
    },
    {
        title: 'ผู้ป่วยรอคิวชำระเงิน',
        url: '/',
    },
    {
        title: 'Dashboard ร้านขายยา',
        url: '/',
    },
    {
        title: 'จัดการบัญชีผู้ใช้',
        url: '/manage-account',
    },
    {
        title: 'จัดการบัญชีร้านขายยา',
        url: '/manage-pillstore',
    },
    {
        title: 'จัดการข้อมูลยา',
        url: '/manage-pill',
    },
];
