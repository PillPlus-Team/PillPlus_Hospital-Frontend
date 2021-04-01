import { PageLayout } from '../../components';

import MenuButton from './components/ManuButton';

/*MOCKDATA*/
import { USERINFO, MENULIST } from '../mock-data';

const HomePage = () => {
    return (
        <PageLayout pageTitle="หน้าหลัก" userInfo={USERINFO} menuList={MENULIST}>
            <div className="grid grid-flow-row justify-items-center grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 ">
                {MENULIST.map((menu) => {
                    return <MenuButton title={menu.title} url={menu.url} />;
                })}
            </div>
        </PageLayout>
    );
};

export default HomePage;
