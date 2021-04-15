import { useEffect, useState } from 'react';

import InputText from '../InputText';

const SearchBar = ({ onSearchClick = () => {} }) => {
    const [keyword, setKeyword] = useState('');

    const searchHandler = () => {
        onSearchClick(keyword);
    };

    return (
        <div className="flex flex-row justify-center items-center h-12">
            <div className="mr-2">
                <InputText
                    id="InputText-search"
                    name="search"
                    type="text"
                    placeholder="ค้นหา"
                    autoComplete="off"
                    onValueChange={(state) => {
                        setKeyword(state);
                    }}
                />
            </div>
            <button className="w-24 p-2 bg-blue-500 text-white rounded-lg focus:outline-none hover:bg-blue-800" type="button" onClick={searchHandler}>
                ค้นหา
            </button>
        </div>
    );
};

export default SearchBar;
