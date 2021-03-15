import { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const submitHandler = async (event) => {
        event.preventDefault();

        console.log({ username, password });
        /*
            Logic here!
        */
    };

    return (
        <div className="flex justify-center items-center w-full h-screen">
            <div className="flex flex-row w-9/12 h-5/6">
                <div className="hidden 2xl:block w-full h-full bg-blue-500 rounded-l-lg shadow-md"></div>
                <div className="flex flex-col justify-center items-center w-96 h-96 sm:w-full sm:h-full p-8 sm:p-0 bg-white rounded-lg shadow-md 2xl:rounded-l-none">
                    <p className="text-4xl">ยินดีต้อนรับเข้าสู่ PILLPLUS+</p>
                    <form className="flex flex-col mt-8 w-80" onSubmit={submitHandler} autoComplete="off">
                        <input
                            className="w-full p-2 pl-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                            name="username"
                            type="text"
                            value={username}
                            onChange={(event) => {
                                setUsername(event.target.value);
                            }}
                            placeholder="ชื่อผู้ใช้"
                            required
                        />
                        <input
                            className="w-full mt-4 p-2 pl-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                            placeholder="รหัสผ่าน"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full p-2 pl-4 mt-6 bg-blue-500 text-white rounded-lg focus:outline-none hover:bg-blue-800 active:bg-blue-500"
                        >
                            เข้าสู่ระบบ
                        </button>
                    </form>
                    <Link to="/forgot-password" className="flex justify-center items-center mt-2 text-gray-800 hover:underline active:text-gray-600">
                        ลืมรหัสผ่าน ?
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
