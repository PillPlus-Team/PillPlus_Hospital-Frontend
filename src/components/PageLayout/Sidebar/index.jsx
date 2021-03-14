import { NavLink, Link } from 'react-router-dom';

const SideBar = ({ menuList }) => {
    const logoutHandler = () => {
        console.log('logout');
        /*
            Logic here!
        */
    };

    return (
        <div className="flex flex-col items-center w-80 pt-8 bg-blue-500">
            <div className="text-white text-5xl font-bold">PILLPLUS+</div>
            <div className="flex flex-col justify-between w-full h-full mt-8 text-md text-white ">
                <div className="flex flex-col">
                    {menuList.map((value) => {
                        return (
                            <NavLink
                                exact
                                to={value.url}
                                className="flex justify-start items-center w-full h-16 pl-4 hover:bg-blue-400"
                                activeClassName="bg-blue-400 border-l-4"
                            >
                                <p className="pl-4">{value.title}</p>
                            </NavLink>
                        );
                    })}
                </div>
                <div className="flex flex-col">
                    <Link
                        to="/profile"
                        className="flex justify-center items-center w-full h-16 bg-blue-600 hover:bg-blue-400"
                        activeClassName="bg-blue-400 border-l-4"
                    >
                        บัญชีผู้ใช้
                    </Link>
                    <button className="w-full h-16 bg-gray-500 text-white hover:bg-gray-400 focus:outline-none" onClick={logoutHandler}>
                        ออกจากระบบ
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
