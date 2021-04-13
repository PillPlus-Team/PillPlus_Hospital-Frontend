import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { PageLayout } from '../../components';

const SelectPillStorePage = () => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    const menuList = useSelector((state) => state.menuList);

    useEffect(() => {}, []);

    return (
        <PageLayout userInfo={user} menuList={menuList}>
            <div className="flex flex-row justify-between w-full h-full bg-blue-200">
                <div className="w-96 bg-green-100"></div>
                <div className="flex flex-col w-96 bg-blue-100">
                    <div className="h-64 bg-green-100"></div>
                    <div className="h-96 bg-pink-100"></div>
                </div>
            </div>
        </PageLayout>
    );
};
export default SelectPillStorePage;
