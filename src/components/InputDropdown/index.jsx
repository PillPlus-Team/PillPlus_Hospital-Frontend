import { useEffect, useState } from 'react';

const InputDropdown = ({ id, name, label, optionList = [''], selectedIndex = 0, onValueChange = () => {} }) => {
    const [value, setValue] = useState(optionList[selectedIndex]);
    const [indexSelected, setIndexSelected] = useState(selectedIndex);
    const [showOption, setShowOption] = useState(false);

    window.addEventListener('click', (event) => {
        if (document.getElementById(id) !== null) {
            if (!document.getElementById(id).contains(event.target)) {
                setShowOption(false);
            }
        }
    });

    useEffect(() => {
        onValueChange(value);
    }, []);

    useEffect(() => {
        onValueChange(value);
    }, [value]);

    return (
        <div className="w-48">
            <label className="block mb-1 text-sm font-medium text-gray-700" id="listbox-label">
                {label}
            </label>
            <div className="relative" id={id} name={name}>
                <button
                    class="relative w-full bg-white border-2 border-gray-300 rounded-md shadow-sm pl-2 pr-10 py-2 text-left focus:outline-none focus:border-blue-500 "
                    type="button"
                    onClick={() => {
                        setShowOption(!showOption);
                    }}
                >
                    <span class="flex items-center">
                        <span class="ml-3 block truncate">{value}</span>
                    </span>
                    <span class="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg
                            class="h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </span>
                </button>
                {showOption && (
                    <ul
                        class="z-50 absolute mt-1 w-full bg-white shadow-lg max-h-28 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                        role="listbox"
                        aria-labelledby="listbox-label"
                        aria-activedescendant="listbox-option-3"
                    >
                        {optionList.map((option, index) => {
                            return (
                                <li
                                    className="text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-200"
                                    id={`listbox-option-${index}`}
                                    role="option"
                                    onClick={() => {
                                        setValue(option);

                                        setIndexSelected(index);
                                        setShowOption(false);
                                    }}
                                >
                                    <div class="flex items-center">
                                        <span class="font-normal ml-3 block truncate">{option}</span>
                                    </div>
                                    {index == indexSelected && (
                                        <span class="text-green-600 absolute inset-y-0 right-0 flex items-center pr-4">
                                            <svg
                                                class="h-5 w-5"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clip-rule="evenodd"
                                                />
                                            </svg>
                                        </span>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default InputDropdown;
