import { useDispatch } from 'react-redux';

import { userEditProfileToggle } from '../../../actions/userActions';

const ProfileDisplay = ({ userInfo }) => {
    const dispatch = useDispatch();

    const changePasswordHandler = () => {
        //for Debug
        console.log('Change Password Click!');

        /*
            Logic here!
        */
    };

    return (
        <div className="flex flex-row min-w-max bg-white rounded-lg shadow-md ">
            <img className="w-80 h-80 ml-24 mt-24 rounded-lg shadow-md object-cover" src={userInfo.avatarUrl} alt="user-avatar" />
            <div className="flex flex-row w-full">
                <table className="table-fixed w-96 ml-32 mt-24 text-lg">
                    <tr>
                        <td className="font-bold w-32 min-w-max py-4">ID</td>
                        <td className="w-96">{userInfo.ID}</td>
                    </tr>
                    <tr>
                        <td className="font-bold w-32 min-w-min py-4">ชื่อ</td>
                        <td>{userInfo.name}</td>
                    </tr>
                    <tr>
                        <td className="font-bold w-32 min-w-min py-4">นามสกุล</td>
                        <td>{userInfo.surname}</td>
                    </tr>
                    <tr>
                        <td className="font-bold w-32 min-w-min py-4">Email</td>
                        <td>{userInfo.email}</td>
                    </tr>
                    <tr>
                        <td className="font-bold w-32 min-w-min py-4">เบอร์ติดต่อ</td>
                        <td>{userInfo.phone}</td>
                    </tr>
                    <tr>
                        <td className="font-bold w-32 min-w-min py-4">กลุ่มผู้ใช้</td>
                        <td>{userInfo.role}</td>
                    </tr>
                    <tr>
                        <td className="font-bold w-32 min-w-min py-4">รหัสผ่าน</td>
                        <td>
                            <button
                                className="w-52 p-2 bg-blue-500 text-white rounded-lg focus:outline-none hover:bg-blue-800"
                                type="button"
                                onClick={changePasswordHandler}
                            >
                                เปลี่ยนรหัสผ่าน
                            </button>
                        </td>
                    </tr>
                </table>
                <div className="flex flex-col items-end w-full mb-64 h-96">
                    <button
                        className="w-24 mt-2 mr-2 p-2 bg-blue-500 text-white rounded-lg focus:outline-none hover:bg-blue-800"
                        type="button"
                        onClick={() => {
                            dispatch(userEditProfileToggle());
                        }}
                    >
                        เเก้ไข
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileDisplay;
