import { useSelector } from 'react-redux';
import { useState } from 'react';

import { PageLayout } from '../../components';

import ProfileDisplay from './components/ProfileDisplay';
import ProfileEditor from './components/ProfileEditor';

/*MOCKDATA*/
import { ACCOUNTS } from '../mock-data';

const ProfilePage = () => {
    const user = useSelector((state) => state.user);
    const menuList = useSelector((state) => state.menuList);

    const [isEdit, setIsEdit] = useState(false);

    return (
        <PageLayout pageTitle="บัญชีผู้ใช้" userInfo={user} menuList={menuList}>
            {!isEdit && (
                <ProfileDisplay
                    userInfo={user}
                    onEdit={() => {
                        setIsEdit(true);
                    }}
                />
            )}
            {isEdit && (
                <ProfileEditor
                    userInfo={user}
                    accounts={ACCOUNTS}
                    onCompleted={() => {
                        setIsEdit(false);
                    }}
                />
            )}
        </PageLayout>
    );
};
export default ProfilePage;
