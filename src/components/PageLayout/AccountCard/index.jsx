import { Link } from 'react-router-dom';

const AccountCard = ({ name, surname, role, avatarUrl }) => {
    return (
        <div className="flex flex-row justify-around items-center w-96 h-24 mr-4">
            <div className="flex flex-col justify-center items-end w-72 h-full pr-4">
                <div className="flex flex-row space-x-2">
                    <p className="text-xl font-bold">{name}</p>
                    <p className="text-xl font-bold">{surname}</p>
                </div>
                <p className="text-md italic">{role}</p>
            </div>
            <Link to="/profile">
                <img
                    className="w-20 h-20 rounded-full bg-blue-400 border-2 border-white shadow-md duration-500 ease-out transform hover:scale-110"
                    src={avatarUrl}
                    alt="user-avatar"
                />
            </Link>
        </div>
    );
};

export default AccountCard;
