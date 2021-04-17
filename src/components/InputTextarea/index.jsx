import { useState, useEffect } from 'react';

const InputTextarea = ({ id, name, initValue = '', placeholder, required, maxLength = 200, onValidChange = () => {}, onValueChange = () => {} }) => {
    const [value, setValue] = useState(initValue);
    const [isValid, setIsValid] = useState(true);
    const [errorMessage, setErrorMessege] = useState('');

    const validation = () => {
        if (required && value.length === 0) {
            setErrorMessege('โปรดกรอก');
            setIsValid(false);
        } else {
            setErrorMessege('');
            setIsValid(true);
        }
    };

    useEffect(() => {
        onValueChange(value);
        validation();
        console.log(value);
    }, [value]);

    useEffect(() => {
        onValidChange(isValid);
    }, [isValid]);

    return (
        <>
            <p className="text-red-400 italic text-sm">{errorMessage}</p>
            <textarea
                className={`w-full h-28 p-2 pl-4 rounded-lg border-2 focus:outline-none ${
                    isValid ? 'border-gray-200  focus:border-blue-500 ' : 'border-red-300 focus:border-red-500'
                }`}
                id={id}
                name={name}
                value={value}
                maxlength={maxLength}
                placeholder={placeholder}
                onChange={(event) => {
                    setValue(event.target.value);
                }}
                style={{ resize: 'none' }}
            />
        </>
    );
};

export default InputTextarea;
