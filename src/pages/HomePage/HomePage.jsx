import { PageLayout } from '../../components';

import MenuButton from './components/ManuButton';

/*********** DUMMY ***********/
const USERINFO = {
    name: 'พักตร์ภูมิ ตาแพร่',
    role: 'Adminstrator',
    avatarUrl: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
};
const MENULIST = [
    {
        title: 'หน้าหลัก',
        url: '/home',
    },
    {
        title: 'เลือกสถานที่รับยา',
        url: '/',
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
        url: '/',
    },
    {
        title: 'จัดการกลุ่มผู้ใช้',
        url: '/',
    },
    {
        title: 'จัดการบัญชีร้านขายยา',
        url: '/',
    },
    {
        title: 'จัดการข้อมูลยา',
        url: '/',
    },
];
/*********** DUMMY ***********/

const HomePage = () => {
    return (
        <PageLayout userInfo={USERINFO} menuList={MENULIST} pageTitle="หน้าหลัก">
            <div className="grid grid-flow-row pt-20  grid-cols-4 gap-8">
                {MENULIST.map((value) => {
                    return <MenuButton title={value.title} url={value.url} />;
                })}
            </div>
        </PageLayout>
    );
};

export default HomePage;
