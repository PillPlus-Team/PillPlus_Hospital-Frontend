import { useSelector } from 'react-redux';
import { useState } from 'react';

import { PageLayout, TableRowSlot } from '../../components';

import AccountRowTitle from './components/AccountRowTitle';
import AccountRow from './components/AccountRow';
import AccountRowInsert from './components/AccountRowInsert';

/*MOCKDATA*/
import { ACCOUNTS, ROLES } from '../mock-data';

const ManageAccountPage = () => {
    const user = useSelector((state) => state.user);
    const menuList = useSelector((state) => state.menuList);

    const [isInsert, setIsInsert] = useState(false);

    return (
        <PageLayout pageTitle="จัดการบัญชีผู้ใช้" userInfo={user} menuList={menuList}>
            <TableRowSlot>
                <AccountRowTitle />

                {ACCOUNTS.map((account, index) => {
                    return <AccountRow index={index + 1} account={account} accounts={ACCOUNTS} roles={ROLES} />;
                })}

                {isInsert && (
                    <AccountRowInsert
                        accounts={ACCOUNTS}
                        roles={ROLES}
                        onCompleted={() => {
                            setIsInsert(false);
                        }}
                    />
                )}
            </TableRowSlot>
            {!isInsert && (
                <button
                    className="w-24 mt-4 p-2 bg-blue-500 text-white rounded-lg focus:outline-none hover:bg-blue-800"
                    onClick={() => {
                        setIsInsert(true);
                    }}
                >
                    เพิ่ม
                </button>
            )}
        </PageLayout>
    );
};

export default ManageAccountPage;
