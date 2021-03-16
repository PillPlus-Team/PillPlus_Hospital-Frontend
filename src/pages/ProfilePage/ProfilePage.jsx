import { useState } from 'react';

import { PageLayout } from '../../components';

import ProfileDisplay from './components/ProfileDisplay';
import ProfileEditor from './components/ProfileEditor';

/*********** DUMMY ***********/
const USERINFO = {
    ID: 1234567890,
    name: 'พักตร์ภูมิ ตาแพร่',
    email: 'phoom0529@gmail.com',
    role: 'Adminstrator',
    createdBy: '-',
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

const ProfilePage = () => {
    const [isEdit, setIsEdit] = useState(false);

    return (
        <PageLayout pageTitle="บัญชีผู้ใช้" userInfo={USERINFO} menuList={MENULIST}>
            {!isEdit && (
                <ProfileDisplay
                    userInfo={USERINFO}
                    onEdit={() => {
                        setIsEdit(true);
                    }}
                />
            )}
            {isEdit && (
                <ProfileEditor
                    userInfo={USERINFO}
                    onCompleted={() => {
                        setIsEdit(false);
                    }}
                />
            )}
        </PageLayout>
    );
};
export default ProfilePage;
