import { useState } from 'react';

const ProfileEditor = ({ userInfo, onCompleted }) => {
    const [name, setName] = useState(userInfo.name);
    const [surname, setSurname] = useState(userInfo.surname);
    const [email, setEmail] = useState(userInfo.email);
    const [avatarUrl, setAvatarUrl] = useState(userInfo.avatarUrl);

    const [mouseOnAvatar, setMouseOnAvatar] = useState(false);

    const changePasswordHandler = () => {
        //for Debug
        console.log('Change Password Click!');

        /*
            Logic here!
        */
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        //for Debug
        console.log({ name, email, avatarUrl });
        
        /*
            Logic here!
        */
        onCompleted();
    };

    return (
        <form className="flex flex-row min-w-max bg-white rounded-lg shadow-md" onSubmit={submitHandler}>
            <input
                className="hidden"
                type="file"
                accept="image/jpeg"
                id="image-input"
                onChange={(event) => {
                    setAvatarUrl(URL.createObjectURL(event.target.files[0]));
                    setMouseOnAvatar(false);
                }}
            />
            <img
                className="w-80 h-80 ml-24 mt-24 rounded-lg shadow-md opacity-60 cursor-pointer object-cover hover:bg-gray-200"
                src={!mouseOnAvatar ? avatarUrl : 'https://static.thenounproject.com/png/1156518-200.png'}
                alt="user-avatar"
                onMouseEnter={() => {
                    setMouseOnAvatar(true);
                }}
                onMouseOut={() => {
                    setMouseOnAvatar(false);
                }}
                onClick={() => {
                    document.getElementById('image-input').click();
                }}
            />
            <table className="table-fixed w-96 ml-32 mt-24 text-lg">
                <tr>
                    <td className="font-bold w-32 min-w-max py-4">ID</td>
                    <td className="w-96">{userInfo.ID}</td>
                </tr>
                <tr>
                    <td className="font-bold w-32 min-w-min py-4">ชื่อ</td>
                    <td>
                        <input
                            className="w-full p-2 pl-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                            name="name"
                            type="text"
                            value={name}
                            onChange={(event) => {
                                setName(event.target.value);
                            }}
                            placeholder="ชื่อ"
                            autoComplete="off"
                            required
                        />
                    </td>
                </tr>
                <tr>
                    <td className="font-bold w-32 min-w-min py-4">นามสกุล</td>
                    <td>
                        <input
                            className="w-full p-2 pl-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                            name="surname"
                            type="text"
                            value={surname}
                            onChange={(event) => {
                                setSurname(event.target.value);
                            }}
                            placeholder="นามสกุล"
                            autoComplete="off"
                            required
                        />
                    </td>
                </tr>
                <tr>
                    <td className="font-bold w-32 min-w-min py-4">Email</td>
                    <td>
                        <input
                            className="w-full p-2 pl-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                            placeholder="goodboy@mail.com"
                            autoComplete="off"
                            required
                        />
                    </td>
                </tr>
                <tr>
                    <td className="font-bold w-32 min-w-min py-4">กลุ่มผู้ใช้</td>
                    <td>{userInfo.role}</td>
                </tr>
                <tr>
                    <td className="font-bold w-32 min-w-min py-4">สร้างโดย</td>
                    <td>{userInfo.createdBy}</td>
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
            <div className="flex flex-col justify-end items-end w-full mt-64 h-96">
                <div className="flex flex-row">
                    <button
                        className="w-24 mb-2 mr-2 p-2 bg-gray-500 text-white rounded-lg focus:outline-none hover:bg-gray-400"
                        type="button"
                        onClick={onCompleted}
                    >
                        ยกเลิก
                    </button>
                    <button className="w-24 mb-2 mr-2 p-2 bg-blue-500 text-white rounded-lg focus:outline-none hover:bg-blue-800" type="submit">
                        ตกลง
                    </button>
                </div>
            </div>
        </form>
    );
};

export default ProfileEditor;
