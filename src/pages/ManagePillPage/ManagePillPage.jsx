import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import ReactPaginate from 'react-paginate';

import { PageLayout, TableRowSlot, RowEmpty, SearchBar } from '../../components';

import PillRowTitle from './components/PillRowTitle';
import PillRow from './components/PillRow';
import PillRowAdder from './components/PillRowAdder';

import { pillsFetch, pillsFilter, pillsAddToggle } from '../../actions/pillsAction';

const ManagePillPage = () => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    const menuList = useSelector((state) => state.menuList);
    const pills = useSelector((state) => state.pills);

    const [currentPage, setCurrentPage] = useState(0);

    const itemPerPage = 6;

    let pillsFilteredID = pills.list.map((pill) => {
        if (pill.show) {
            return pill.ID;
        }
    });
    pillsFilteredID = pillsFilteredID.filter((ID) => ID != null);

    const isEmpty = pillsFilteredID.length === 0;

    useEffect(() => {
        dispatch(pillsFetch());
    }, []);

    useEffect(() => {
        if (pillsFilteredID.length / itemPerPage <= currentPage) {
            setCurrentPage(currentPage - 1);
        }
    }, [pillsFilteredID]);

    return (
        <PageLayout pageTitle="จัดการข้อมูลยา" userInfo={user} menuList={menuList}>
            <div className="relative">
                <div className="flex w-full justify-end absolute -top-14">
                    <p className="flex justify-center items-center mr-6 text-white text-lg">
                        ทั้งหมด {pillsFilteredID.length.toLocaleString('th-TH')} รายการ
                    </p>
                    <SearchBar
                        onSearchClick={(keyword) => {
                            dispatch(pillsFilter({ keyword: keyword }));
                        }}
                    />
                </div>
                <TableRowSlot>
                    <PillRowTitle />
                    {isEmpty && !pills.adding && <RowEmpty colSpan="9" text="ไม่มีข้อมูล" />}

                    {pills.list.map((pill) => {
                        const isInShowRange =
                            currentPage * itemPerPage <= pillsFilteredID.indexOf(pill.ID) &&
                            pillsFilteredID.indexOf(pill.ID) < currentPage * itemPerPage + itemPerPage;
                        return (
                            <>
                                {pill.show && isInShowRange && (
                                    <PillRow index={pillsFilteredID.indexOf(pill.ID) + 1} pill={pill} pills={pills.list} />
                                )}
                            </>
                        );
                    })}

                    {pills.adding && <PillRowAdder pills={pills.list} />}
                </TableRowSlot>
                <div className="flex flex-row items-center mt-4">
                    {!pills.adding && (
                        <button
                            className="w-24 p-2 bg-blue-500 text-white rounded-lg focus:outline-none hover:bg-blue-800"
                            type="button"
                            onClick={() => {
                                dispatch(pillsAddToggle());
                            }}
                        >
                            เพิ่ม
                        </button>
                    )}
                    <ReactPaginate
                        pageCount={pillsFilteredID.length / itemPerPage}
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

export default ManagePillPage;
