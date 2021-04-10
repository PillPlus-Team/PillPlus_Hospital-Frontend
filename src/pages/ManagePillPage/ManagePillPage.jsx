import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { PageLayout, TableRowSlot } from '../../components';

import PillRowTitle from './components/PillRowTitle';
import PillRowEmpty from './components/PillRowEmpty';
import PillRow from './components/PillRow';
import PillRowAdder from './components/PillRowAdder';

import { pillsFetch, pillsAddToggle } from '../../actions/pillsAction';

const ManagePillPage = () => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    const menuList = useSelector((state) => state.menuList);
    const pills = useSelector((state) => state.pills);

    const isEmpty = pills.list.length === 0;

    useEffect(() => {
        dispatch(pillsFetch());
    }, []);

    return (
        <PageLayout pageTitle="จัดการข้อมูลยา" userInfo={user} menuList={menuList}>
            <TableRowSlot>
                <PillRowTitle />
                {isEmpty && !pills.adding && <PillRowEmpty />}

                {pills.list.map((pill, index) => {
                    return <PillRow index={index + 1} pill={pill} pills={pills.list} />;
                })}

                {pills.adding && <PillRowAdder pills={pills.list} />}
            </TableRowSlot>

            {!pills.adding && (
                <button
                    className="w-24 mt-4 p-2 bg-blue-500 text-white rounded-lg focus:outline-none hover:bg-blue-800"
                    type="button"
                    onClick={() => {
                        dispatch(pillsAddToggle());
                    }}
                >
                    เพิ่ม
                </button>
            )}
        </PageLayout>
    );
};

export default ManagePillPage;
