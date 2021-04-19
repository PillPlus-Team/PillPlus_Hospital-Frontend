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
        url: '/payment',
    },
    {
        title: 'เช็คยอดร้านขายยา',
        url: '/statement',
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

export const stringGenerate = (length) => {
    let result = [];
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() * characters.length)));
    }
    return result.join('');
};
