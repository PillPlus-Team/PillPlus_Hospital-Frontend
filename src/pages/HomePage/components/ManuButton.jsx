import { Link } from 'react-router-dom';
const MenuButton = ({ title, url }) => {
    return (
        <Link to={url} className="flex justify-center items-center w-80 h-52 bg-gray-100 rounded-lg text-2xl shadow-md hover:bg-gray-300 ">
            {title}
        </Link>
    );
};

export default MenuButton;
