import { PageLayout } from '../../components';

/*MOCKDATA*/
import { USERINFO, MENULIST } from '../mock-data';

const ManageAccountPage = () => {
    return (
        <PageLayout pageTitle="จัดการบัญชีผู้ใช้" userInfo={USERINFO} menuList={MENULIST}>
            {/* <div className="grid grid-flow-row justify-items-center grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 ">
                {MENULIST.map((value) => {
                    return <MenuButton title={value.title} url={value.url} />;
                })}
            </div> */}
        </PageLayout>
    );
};

export default ManageAccountPage;
