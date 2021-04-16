import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import ReactPaginate from 'react-paginate';

import { PageLayout, TableRowSlot, RowEmpty, SearchBar } from '../../components';

import AccountRowTitle from './components/AccountRowTitle';
import AccountRow from './components/AccountRow';
import AccountRowAdder from './components/AccountRowAdder';

import { accountsFetch, accountsFilter, accountAddToggle } from '../../actions/accountsAction';

const ManageAccountPage = () => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    const menuList = useSelector((state) => state.menuList);
    const roleList = useSelector((state) => state.roleList);
    const accounts = useSelector((state) => state.accounts);

    const [currentPage, setCurrentPage] = useState(0);

    const itemPerPage = 6;

    let accountsFilteredID = accounts.list.map((account) => {
        if (account.show) {
            return account.ID;
        }
    });
    accountsFilteredID = accountsFilteredID.filter((ID) => ID != null);

    const isEmpty = accountsFilteredID.length === 0;

    useEffect(() => {
        dispatch(accountsFetch());
    }, []);

    useEffect(() => {
        if (accountsFilteredID.length / itemPerPage <= currentPage) {
            setCurrentPage(accountsFilteredID.length / itemPerPage);
        }
    }, [accountsFilteredID]);

    return (
        <PageLayout pageTitle="จัดการบัญชีผู้ใช้" userInfo={user} menuList={menuList}>
            <div className="relative">
                <div className="flex w-full justify-end absolute -top-14">
                    <p className="flex justify-center items-center mr-6 text-white text-lg">
                        ทั้งหมด {accountsFilteredID.length.toLocaleString('th-TH')} รายการ
                    </p>
                    <SearchBar
                        onSearchClick={(keyword) => {
                            dispatch(accountsFilter({ keyword: keyword }));
                        }}
                    />
                </div>
                <TableRowSlot>
                    <AccountRowTitle />
                    {isEmpty && !accounts.adding && <RowEmpty colSpan="9" text="ไม่มีข้อมูล" />}

                    {accounts.list.map((account) => {
                        const isInShowRange =
                            currentPage * itemPerPage <= accountsFilteredID.indexOf(account.ID) &&
                            accountsFilteredID.indexOf(account.ID) < currentPage * itemPerPage + itemPerPage;
                        return (
                            <>
                                {account.show && isInShowRange && (
                                    <AccountRow
                                        index={accountsFilteredID.indexOf(account.ID) + 1}
                                        account={account}
                                        accounts={accounts.list}
                                        userInfo={user}
                                        roleList={roleList}
                                    />
                                )}
                            </>
                        );
                    })}

                    {accounts.adding && <AccountRowAdder accounts={accounts.list} roleList={roleList} />}
                </TableRowSlot>

                <div className="flex flex-row items-center mt-4">
                    {!accounts.adding && (
                        <button
                            className="w-24 p-2 bg-blue-500 text-white rounded-lg focus:outline-none hover:bg-blue-800"
                            type="button"
                            onClick={() => {
                                dispatch(accountAddToggle());
                            }}
                        >
                            เพิ่ม
                        </button>
                    )}
                    <ReactPaginate
                        pageCount={accountsFilteredID.length / itemPerPage}
                        initialPage={currentPage}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        containerClassName="flex flex-row max-w-min text-gray-500 rounded-lg shadow-md ml-auto"
                        pageClassName="flex justify-center items-center w-10 h-12 bg-white hover:bg-gray-200 cursor-pointer"
                        pageLinkClassName="flex justify-center items-center w-full h-full "
                        previousClassName="flex justify-center items-center w-10 h-12 bg-white rounded-l-lg hover:bg-gray-200 cursor-pointer"
                        previousLinkClassName="flex justify-center items-center w-full h-full "
                        nextClassName="flex justify-center items-center w-10 h-12 bg-white rounded-r-lg hover:bg-gray-200 cursor-pointer"
                        nextLinkClassName="flex justify-center items-center w-full h-full "
                        breakClassName="flex justify-center items-center w-10 h-12 bg-white hover:bg-gray-200 cursor-pointer"
                        breakLinkClassName="flex justify-center items-center w-full h-full "
                        activeClassName="flex justify-center items-center w-10 h-12 bg-gray-200 hover:bg-gray-200 cursor-pointer"
                        previousLabel={<span aria-hidden="true">&laquo;</span>}
                        nextLabel={<span aria-hidden="true">&raquo;</span>}
                        breakLabel="..."
                        onPageChange={(page) => {
                            setCurrentPage(page.selected);
                        }}
                    />
                </div>
            </div>
        </PageLayout>
    );
};

export default ManageAccountPage;
