import { useState } from 'react';

import { PageLayout, TableRowSlot } from '../../components';

import AccountRowTitle from './components/AccountRowTitle';
import AccountRowDisplay from './components/AccountRowDisplay';
import AccountRowInsert from './components/AccountRowInsert';

/*MOCKDATA*/
import { USERINFO, MENULIST, ACCOUNTS } from '../mock-data';

const ManageAccountPage = () => {
    const [isInsert, setIsInsert] = useState(false);

    return (
        <PageLayout pageTitle="จัดการบัญชีผู้ใช้" userInfo={USERINFO} menuList={MENULIST}>
            <TableRowSlot>
                <AccountRowTitle />

                {ACCOUNTS.map((account, index) => {
                    return <AccountRowDisplay index={index + 1} account={account} />;
                })}

                {isInsert && (
                    <AccountRowInsert
                        accounts={ACCOUNTS}
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
