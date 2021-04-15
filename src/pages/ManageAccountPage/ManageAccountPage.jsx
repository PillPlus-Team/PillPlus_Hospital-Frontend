import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import { PageLayout, TableRowSlot, RowEmpty, SearchBar } from '../../components';

import AccountRowTitle from './components/AccountRowTitle';
import AccountRow from './components/AccountRow';
import AccountRowAdder from './components/AccountRowAdder';

import { accountsFetch, accountAddToggle } from '../../actions/accountsAction';

const ManageAccountPage = () => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    const menuList = useSelector((state) => state.menuList);
    const roleList = useSelector((state) => state.roleList);
    const accounts = useSelector((state) => state.accounts);

    const [accountsFiltered, setAccountsFiltered] = useState(accounts.list);

    const isEmpty = accountsFiltered.length === 0;

    useEffect(() => {
        dispatch(accountsFetch());
    }, []);

    return (
        <PageLayout pageTitle="จัดการบัญชีผู้ใช้" userInfo={user} menuList={menuList}>
            <div className="relative">
                <div className="flex w-full justify-end absolute -top-14">
                    <SearchBar
                        onSearchClick={(keyword) => {
                            if (keyword) {
                                setAccountsFiltered(
                                    accounts.list.filter((element) => {
                                        const keys = Object.keys(element);
                                        for (let i = 0; i < keys.length; i++) {
                                            if (String(element[keys[i]]).includes(keyword)) {
                                                return true;
                                            }
                                        }
                                        return false;
                                    })
                                );
                            } else {
                                setAccountsFiltered(accounts.list);
                            }
                        }}
                    />
                </div>
                <TableRowSlot>
                    <AccountRowTitle />
                    {isEmpty && !accounts.adding && <RowEmpty colSpan="9" text="ไม่มีข้อมูล" />}

                    {accountsFiltered.map((account, index) => {
                        return <AccountRow index={index + 1} account={account} accounts={accounts.list} userInfo={user} roleList={roleList} />;
                    })}

                    {accounts.adding && <AccountRowAdder accounts={accounts.list} roleList={roleList} />}
                </TableRowSlot>

                {!accounts.adding && (
                    <button
                        className="w-24 mt-4 p-2 bg-blue-500 text-white rounded-lg focus:outline-none hover:bg-blue-800"
                        type="button"
                        onClick={() => {
                            dispatch(accountAddToggle());
                        }}
                    >
                        เพิ่ม
                    </button>
                )}
            </div>
        </PageLayout>
    );
};

export default ManageAccountPage;
