import AccountCard from './AccountCard';
import PageTitle from './PageTitle';
import Sidebar from './Sidebar';

const PageLayout = ({ userInfo, menuList, pageTitle, children }) => {
    return (
        <div className="flex flex-row w-full h-screen">
            <div className="flex justify-center w-96 shadow-md">
                <Sidebar menuList={menuList} />
            </div>
            <div className="flex flex-col w-full">
                <div className="flex flex-row justify-end items-center h-24">
                    <AccountCard name={userInfo.name} role={userInfo.role} avatarUrl={userInfo.avatarUrl} />
                </div>
                <div className="flex h-full pt-8 pl-24">
                    <div className="flex flex-col">
                        <PageTitle title={pageTitle} />
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageLayout;
