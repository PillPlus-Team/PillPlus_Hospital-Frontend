import { Link } from 'react-router-dom';

const AccountCard = ({ name, surname, role, avatarUrl }) => {
    return (
        <div className="flex flex-row items-center h-24 mx-10">
            <div className="flex flex-col justify-center items-end h-full mr-4">
                <div className="flex flex-row space-x-2">
                    <p className="whitespace-nowrap text-xl font-bold">{name}</p>
                    <p className="whitespace-nowrap text-xl font-bold">{surname}</p>
                </div>
                <p className="text-md italic">{role}</p>
            </div>
            <Link to="/profile">
                <div className="w-20 h-20">
                    <img
                        className="w-full h-full rounded-full bg-blue-400 border-2 border-white shadow-md object-cover duration-500 ease-out transform hover:scale-110"
                        src={avatarUrl}
                        alt="user-avatar"
                    />
                </div>
            </Link>
        </div>
    );
};

export default AccountCard;
