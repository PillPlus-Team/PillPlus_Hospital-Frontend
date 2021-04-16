import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import ReactPaginate from 'react-paginate';

import { PageLayout, TableRowSlot, RowEmpty, SearchBar } from '../../components';

import PillStoreRowTitle from './components/PillStoreRowTitle';
import PillStoreRow from './components/PillStoreRow';
import PillStoreRowAdder from './components/PillStoreRowAdder';

import { pillStoresFetch, pillStoresFilter, pillStoresAddToggle } from '../../actions/pillStoresAction';

const ManagePillStorePage = () => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    const menuList = useSelector((state) => state.menuList);
    const pillStores = useSelector((state) => state.pillStores);

    const [currentPage, setCurrentPage] = useState(0);

    const itemPerPage = 6;

    let pillStoresFilteredID = pillStores.list.map((pillStore) => {
        if (pillStore.show) {
            return pillStore.ID;
        }
    });
    pillStoresFilteredID = pillStoresFilteredID.filter((ID) => ID != null);

    const isEmpty = pillStoresFilteredID.length === 0;

    useEffect(() => {
        dispatch(pillStoresFetch());
    }, []);

    useEffect(() => {
        if (pillStoresFilteredID.length / itemPerPage <= currentPage) {
            setCurrentPage(Math.floor(pillStoresFilteredID.length / (itemPerPage + 1)));
        }
    }, [pillStoresFilteredID]);

    return (
        <PageLayout pageTitle="จัดการบัญชีร้านขายยา" userInfo={user} menuList={menuList}>
            <div className="relative">
                <div className="flex w-full justify-end absolute -top-14">
                    <p className="flex justify-center items-center mr-6 text-white text-lg">
                        ทั้งหมด {pillStoresFilteredID.length.toLocaleString('th-TH')} รายการ
                    </p>
                    <SearchBar
                        onSearchClick={(keyword) => {
                            dispatch(pillStoresFilter({ keyword: keyword }));
                        }}
                    />
                </div>
                <TableRowSlot>
                    <PillStoreRowTitle />
                    {isEmpty && !pillStores.adding && <RowEmpty colSpan="9" text="ไม่มีข้อมูล" />}

                    {pillStores.list.map((pillStore) => {
                        const isInShowRange =
                            currentPage * itemPerPage <= pillStoresFilteredID.indexOf(pillStore.ID) &&
                            pillStoresFilteredID.indexOf(pillStore.ID) < currentPage * itemPerPage + itemPerPage;
                        return (
                            <>
                                {pillStore.show && isInShowRange && (
                                    <PillStoreRow
                                        index={pillStoresFilteredID.indexOf(pillStore.ID) + 1}
                                        pillStore={pillStore}
                                        pillStores={pillStores.list}
                                    />
                                )}
                            </>
                        );
                    })}

                    {pillStores.adding && <PillStoreRowAdder pillStores={pillStores.list} />}
                </TableRowSlot>

                <div className="flex flex-row items-center mt-4">
                    {!pillStores.adding && (
                        <button
                            className="w-24 p-2 bg-blue-500 text-white rounded-lg focus:outline-none hover:bg-blue-800"
                            type="button"
                            onClick={() => {
                                dispatch(pillStoresAddToggle());
                            }}
                        >
                            เพิ่ม
                        </button>
                    )}
                    <ReactPaginate
                        pageCount={pillStoresFilteredID.length / itemPerPage}
                        initialPage={currentPage}
                        forcePage={currentPage}
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

export default ManagePillStorePage;
