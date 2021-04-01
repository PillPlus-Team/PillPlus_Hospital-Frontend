import { useState } from 'react';

import { PageLayout } from '../../components';

import ProfileDisplay from './components/ProfileDisplay';
import ProfileEditor from './components/ProfileEditor';

/*MOCKDATA*/
import { USERINFO, MENULIST, ACCOUNTS } from '../mock-data';

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
