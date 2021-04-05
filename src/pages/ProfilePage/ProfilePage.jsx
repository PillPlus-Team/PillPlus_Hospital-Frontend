import { useSelector } from 'react-redux';
import { useState } from 'react';

import { PageLayout } from '../../components';

import ProfileDisplay from './components/ProfileDisplay';
import ProfileEditor from './components/ProfileEditor';

/*MOCKDATA*/
import { MENULIST, ACCOUNTS } from '../mock-data';

const ProfilePage = () => {
    const user = useSelector((state) => state.user);

    const [isEdit, setIsEdit] = useState(false);

    return (
        <PageLayout pageTitle="บัญชีผู้ใช้" userInfo={user} menuList={MENULIST}>
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
